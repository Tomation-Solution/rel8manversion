import { EventMeetDisplayContainer } from "./EventMeetDisplay.style"

import Eventimg from '../../images/eventimg.png'
import ClipImage from '../../images/clip.png'
import {GoCalendar} from 'react-icons/go'
import {TiLocation} from 'react-icons/ti'
import CustomBtn from "../CustomBtn/Button"
import { MeetingType, regsiterMeetingApi } from "../../redux/memberMeeting/memberMeetingApi"
import moment from 'moment'
import { useMutation } from "react-query"
import useToast from "../../hooks/useToast"
import { useState } from "react"
import BasicModal from "../Modals"
import MeetingRegistration from "../Meeting/MeetingRegistration/MeetingRegistration"
import { Box } from "@material-ui/core"
import Spinner from "../Spinner"


type Prop = {
    meeting: MeetingType
}
const EventMeetDisplay = ({meeting}:Prop)=>{
    const {notify} = useToast()
    const [openApology,setOpenApology] = useState(false)
    const [acceptProxyMeeting,setAcceptProxyMeeting] = useState(false)
    const [askQuetion,setAskQuetion] = useState(false)
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
    return (
        <div>
            {
                (registrationLoader)?
                <Spinner />
            :''
            }
                <BasicModal
            handleClose={setAcceptProxyMeeting}
            open={acceptProxyMeeting}
            body={<MeetingRegistration
            Submit={(value)=>{
                if(meeting){
                    registerMeeting({'meetingID':meeting.id,'proxy_participants':value.participant })
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
                    if(meeting){
                        registerMeeting({'meetingID':meeting.id})
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
            <EventMeetDisplayContainer>


                <div className="">
                {/* Eventimg */}
                    <img src={Eventimg.src} alt="" />
                    <h3>{meeting.name}</h3>
                    <div className="sub_header__container">
                        <p><strong>Details</strong></p>
                    <div style={{'display':'flex','justifyContent':'center','alignItems':'center'}}>
                        <img src={ClipImage.src} alt="" />
                        
                        <a href={''} style={{'margin':'0 10px'}}><strong>Get Event Document</strong></a>
                    </div>
                    </div>

                    <p>
                        {meeting.details}
                    </p>
                </div>

                <div className="EventMeetactionContainer">
                        <div className="event_location_info">
                            <GoCalendar/>
                            <p>{moment(meeting.event_date).format('LLL')}
                            </p>
                        </div>
                        <div className="event_location_info">
                            <TiLocation/>
                            <p> {meeting.addresse.includes('https')?'Remote':'On Site'}: {
                                    meeting.addresse.includes('https')?
                                    <CustomBtn style={{'padding':'.3rem'}}>Join</CustomBtn>:
                                    <>{ meeting.addresse}</>
                                } </p>
                        </div>
                        <br />
                        <div className="host_container">
                            <p><strong>Host</strong></p>
                            <div style={{'display':'flex','alignItems':'center'}}>
                                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />
                            <p style={{'margin':'0 5px'}}>Admin</p>
                            </div>
                        </div>
                    <br />
                    <br />
                        <CustomBtn 
                        onClick={e=>{
                            setAskQuetion(true)
                        }}
                        style={{'borderRadius':'30px'}}>
                            Register
                        </CustomBtn>
                </div>
            </EventMeetDisplayContainer>
        </div>
    
    )
}

export default EventMeetDisplay