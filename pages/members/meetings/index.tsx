import {NextPage} from 'next'
import LatestUpdateAndGallery from '../../../layout/LatestUpdateAndGallery/LatestUpdateAndGallery'
import MeetingPreviewCard from '../../../components/MeetingPreviewCard/MeetingPreviewCard'
import { useQuery } from 'react-query'
import { getMemberMeetingAPi,MeetingType, regsiterMeetingApi, sendMeetApplolgyApi } from '../../../redux/memberMeeting/memberMeetingApi'
import Spinner from '../../../components/Spinner'
import moment from 'moment'
import { useState } from 'react'
import BasicModal from '../../../components/Modals'
import MeetingRegistration from '../../../components/Meeting/MeetingRegistration/MeetingRegistration'
import CustomBtn from '../../../components/CustomBtn/Button'
import { Box } from '@mui/system'
import { TextField } from '@mui/material'
import { useMutation } from 'react-query'
import useToast from '../../../hooks/useToast'
import { useRouter } from 'next/router'

const MeetingsPage:NextPage  = () =>{
    const {data,isLoading} = useQuery('meetings',getMemberMeetingAPi,{refetchOnWindowFocus:false})
    const [currentMeeting,setCurrentMeeting]= useState<MeetingType|null>()
    const {notify} = useToast()
    const route = useRouter()
    const [note,setNote]=useState<string>()
    const {mutate:registerMeeting,isLoading:registrationLoader} = useMutation(regsiterMeetingApi,{
        onSuccess:(data)=>{
            console.log({data})
            notify('Registration Success','success')
        },
        'onError':(err:any)=>{
            console.log({err})
            notify('You must have registered already','error')


        }
    })

    const {isLoading:loading,mutate:submitAppology} = useMutation(sendMeetApplolgyApi,{
        'onSuccess':(data)=>{
            notify('Sent','success')
        },
        'onError':()=>{
            notify('you have already submitted an apology','error')
        }
    })
    const [openApology,setOpenApology] = useState(false)
    const [acceptProxyMeeting,setAcceptProxyMeeting] = useState(false)
    const [askQuetion,setAskQuetion] = useState(false)
    return (
        <LatestUpdateAndGallery>


<BasicModal
        handleClose={setAcceptProxyMeeting}
        open={acceptProxyMeeting}
        body={<MeetingRegistration
          Submit={(value)=>{
            console.log({'proxy':value})
            if(currentMeeting){
                registerMeeting({'meetingID':currentMeeting.id,'proxy_participants':value.participant })
            }
          }}
        />}
        />

<BasicModal 
        open={askQuetion}
        handleClose={setAskQuetion}
        body={<Box style={{'textAlign':'center','padding':'.8rem'}}>
         
          <h2>Register for meeting</h2>
          <br />
          <p>do you want to invite other to this meeting or you want to register your self only</p>
          <br />
          <br />
         
          <div style={{'display':'flex'}}>
            <CustomBtn style={{'marginRight':'10px'}}
            onClick={()=>{
                if(currentMeeting){
                    registerMeeting({'meetingID':currentMeeting.id})
                }
            // const  meeting = JSON.parse(localStorage.getItem('meeting_detail'))
            // dispatch(registerForMeeting({'meetingID':meeting.id}))
            }}
            >Register Only</CustomBtn>
            <CustomBtn styleType="sec"
            onClick={e=>{
              setAskQuetion(false)
              setAcceptProxyMeeting(true)}}
            >Register and invite proxy</CustomBtn>
          </div>
        </Box>}
        />

<BasicModal 
        handleClose={()=>setOpenApology(false)} 
        open={openApology} 
        body={<form style={{'padding':'1rem 1.3rem'}}>
          <h3 style={{'textAlign':'center'}}>Appology Remark</h3>
          <br />
 <TextField
         onChange={(e)=>{
          setNote(e.target.value)
         }}
         required
          id="outlined-required"
          label="Appology Note"
          style={{'width':'100%'}}
        />
        <br />
          <CustomBtn 
          onClick={e=>{
            e.preventDefault()
            if(currentMeeting){
                submitAppology({'meeting':currentMeeting.id,note})
            }
          }}
          style={{'width':'40%','margin':'10px auto'}}>
            Submit 
          </CustomBtn>

          {/* data */}
        </form>}
        />

            {
                (isLoading||registrationLoader||loading)?
                <Spinner />
            :''
            }
            <h1>Meetings</h1>
            <br />
            <div>
                {
                    data?.map((value,index)=>(
                        <MeetingPreviewCard 
                        title={value.name+'-'+ moment(value.event_date).format('LLL')}
                        details={value.details.slice(0,50)+'...'}
                        onClickAccept={()=>{
                            setCurrentMeeting(value)
                            setAskQuetion(true)

                        }}
                        onClickApolgy={()=>{
                            setCurrentMeeting(value)
                            setOpenApology(true)
                        }}
                        onClickJoin={()=>{
                            setCurrentMeeting(null)
                            route.push(`meetings/${value.id}/`)
                            window.localStorage.setItem('meeting_detail',JSON.stringify(value))
                            // take you to the detail page
                        }}
                        key={index}/>
                    ))
                }
            </div>
        </LatestUpdateAndGallery>
    )
}

export default MeetingsPage