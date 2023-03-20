import { NextPage } from "next";
import { useEffect,useState } from "react";
import { DashboardLayout } from "../../components/Dashboard/Member/Sidebar/dashboard-layout";
import Spinner from "../../components/Spinner";
import { useMediaQuery } from 'react-responsive'
import Table from '../../components/Table/Table'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectMeetings } from "../../redux/memberMeeting/memberMeetingSlice";
import { getregisteredmembers_forMeeting, registerForMeeting, sendMeetingAppology } from "../../redux/memberMeeting/memberMeetingApi";
import Line from "../../components/Line";
import {HiCalendar} from 'react-icons/hi'
import moment from "moment";
import CustomBtn from "../../components/CustomBtn/Button";
import BasicModal from "../../components/Modals";
import useToast from "../../hooks/useToast";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MeetingRegistration from "../../components/Meeting/MeetingRegistration/MeetingRegistration";

const MeetingDetails:NextPage = ()=>{
    const isLaptop = useMediaQuery({
        query: '(min-width: 524px)'
      })
      const {status,attendees,message} = useAppSelector(selectMeetings)
      const dispatch = useAppDispatch();
      const [open,setOpenLogout] = useState(false)
      const [acceptMeeting,setOpenAcceptMeeting] = useState(false)
      const [askQuetion,setAskQuetion] = useState(false)
      const handleClose =()=> setOpenLogout(false);
      const {notify} = useToast()
    const [note,setNote ] = useState('')
    const submit =(e:any)=>{
      e.preventDefault()

      if(!note){
        notify('Please a note is required','error')
        return 
      }
      const  meeting = JSON.parse(localStorage.getItem('meeting_detail'))

      dispatch(sendMeetingAppology({'meeting':parseInt(meeting.id),note}))
    }
    useEffect(()=>{
        if(typeof window != 'undefined'){
            const  meeting = JSON.parse(localStorage.getItem('meeting_detail'))
            dispatch(getregisteredmembers_forMeeting(meeting.id))
        }
      },[])

    useEffect(()=>{
      if(status==='apology_failed'){
        notify(message,'error')
      }
      if(status==='apology_success'){
        notify(message,'success')
      }
      if(status=='error'){
        notify(message,'error')
      }
      if(status ==='registration_success'){
        notify('Registration done','success')
      }
    },[status])
    if(typeof window == 'undefined'){
        return <Spinner/>
      }

      let data:any = null
      if( localStorage.getItem('meeting_detail')){
        data  = JSON.parse(localStorage.getItem('meeting_detail'))
      }


      const prop_columns = [ {
        Header:'Email',
        accessor:'members__user__email',
        id:1,},
      
      ]
      console.log({data})
    return (
        <DashboardLayout>
            {
                status=='pending'?<Spinner/>:''
            }
        <div
         style={{
            'maxWidth':'800px','margin':'0 auto'
        }}
        >
                <img 
      src='https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fG1lZXRpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
                alt=""  style={{'width':'100%',
            'height':isLaptop?'400px':'300px','objectFit':'cover','borderRadius':'10px'}}/>
            <br />
            <br />
            <h2 style={{'textAlign':'center','padding':'1rem'}}>{data?.name }</h2>
            {/* <p>
              Info: <strong>{data.details}</strong>
            </p> */}
        <Line/>
        <br />
          <div style={{'display':'flex','alignItems':'center','maxWidth':'200px','justifyContent':'space-between'}}>
              <HiCalendar style={{'fontSize':'1.4rem'}}/>
            <p>
              {
                moment(data.event_date).format('LLL')
              }
            </p>
          </div>

          <div style={{'display':'flex','alignItems':'center',}}>
              <HiCalendar style={{'fontSize':'1.4rem'}}/>
              
            <p style={{'padding':'0 .7rem'}}>
              {
                data.addresse.includes('https')?
                <a href={data.addresse} style={{'color':'green','textDecoration':'underline','cursor':'pointer'}}>Vist meeting link</a>
                :
                data.addresse
              }
            </p>
          </div>
        <Line/>
        <br />
        <h4>Organiser</h4>
        <br />
        <div style={{'display':'flex','justifyContent':'space-between','width':'330px','margin':'10px 0'}}>
          <img
          style={{'display':'block','width':'50px','height':'50px','borderRadius':'50%'}}
           src="https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fG1lZXRpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="" />
          <div>
            <p><strong>{data.organiserName}</strong></p>
            <p>{data.organiserDetails}</p>
          </div>
        </div>
        <BasicModal 
        handleClose={setOpenAcceptMeeting}
        open={acceptMeeting}
        body={<MeetingRegistration
          Submit={(value)=>{
            const  meeting = JSON.parse(localStorage.getItem('meeting_detail'))

            dispatch(registerForMeeting({'meetingID':meeting.id,'proxy_participants':value.participant}))
          }}
        />}
        />
        <BasicModal 
        open={askQuetion}
        handleClose={setAskQuetion}
        body={<Box style={{'textAlign':'center','padding':'.8rem'}}>
          {
                status=='pending'?<Spinner/>:''
            }
          <h2>Register for meeting</h2>
          <br />
          <p>do you want to invite other to this meeting or you want to register your self only</p>
          <br />
          <br />
         
          <div style={{'display':'flex'}}>
            <CustomBtn style={{'marginRight':'10px'}}
            onClick={()=>{
            const  meeting = JSON.parse(localStorage.getItem('meeting_detail'))
            dispatch(registerForMeeting({'meetingID':meeting.id}))
            }}
            >Register Only</CustomBtn>
            <CustomBtn styleType="sec"
            onClick={e=>{
              setAskQuetion(false)
              setOpenAcceptMeeting(true)}}
            >Register and invite proxy</CustomBtn>
          </div>
        </Box>}
        />

        {/* attendees */}
        <Table prop_columns={prop_columns} custom_data={attendees}/>
              <br /><br />
              <br /><br />
              <div style={{'display':'flex','maxWidth':'600px','margin':'0 auto','justifyContent':'space-between'}}>
                <CustomBtn 
                onClick={e=>{
                  setAskQuetion(true)
                }}
                style={{'width':'25%'}}>
                  Join
                </CustomBtn>

                <CustomBtn styleType='sec' 
                onClick={(e)=>setOpenLogout(true)}
                style={{'width':'25%'}}>
                 Apology Remark
                </CustomBtn>

      {
        data.meeting_docs?
          <CustomBtn style={{'width':'25%',}}
          onClick={(e)=>{
            window.open(data.meeting_docs,'_blank')
          }}
          >
            Attachment doc
          </CustomBtn>:''
      }          
              </div>
              <br /><br />

        </div>
        <BasicModal 
        handleClose={handleClose} open={open} 
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
          <CustomBtn style={{'width':'40%','margin':'10px auto'}}
          onClick={submit}
          
          >
            Submit 
          </CustomBtn>

          {/* data */}
        </form>}
        />
        </DashboardLayout>
    )
}

export default MeetingDetails