import { MemberEventType, registerForPaidEvent, registerForPaidEventApi } from "../../redux/memeberEvents/memeberEventsApi"
import { EventMeetDisplayContainer } from "../EventMeetDisplay/EventMeetDisplay.style"
import ClipImage from '../../images/clip.png'
import {GoCalendar} from 'react-icons/go'
import {TiLocation} from 'react-icons/ti'
import CustomBtn from "../CustomBtn/Button"
import { useState } from "react"
// import { Box } from "@mui/system"
import Box from '@mui/material/Box';
import BasicModal from "../Modals"
import MeetingRegistration from "../Meeting/MeetingRegistration/MeetingRegistration"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { RequestRescheduleForm } from "../../pages/members/event_detail"
import { registerForEventApi } from "../../redux/events/eventsApi"
import { useMutation } from "react-query"
import useToast from "../../hooks/useToast"
import { selectMemberEvent } from "../../redux/memeberEvents/memeberEventsSlice"
import Spinner from "../Spinner"


type Prop = {
    event: MemberEventType
}
const MeetDisplay = ({event}:Prop)=>{
    const {attendies,status,errorMessage} = useAppSelector(selectMemberEvent)

    const [gateWayLoading,setGateWayLoading] = useState(false)

    const [open,setOpenLogout] = useState(false)
    const [acceptMeeting,setOpenAcceptMeeting] = useState(false)
    const [askQuetion,setAskQuetion] = useState(false)
    const [openReSchedule,setOpenReSchedule] = useState(false)
    const {notify} = useToast();


  const {mutate,isLoading} = useMutation(registerForPaidEventApi,{
    onError:(d)=>{
      notify('You Have Paid For This Event','error')
    },
  })
    const dispatch = useAppDispatch()
    return (
        <div>
            {
                (status==='pending'||gateWayLoading)?
                <Spinner/>:''
            }
<BasicModal 
        handleClose={setOpenReSchedule}
        open={openReSchedule}
        body={
          <>
          {event?
        <RequestRescheduleForm event_id={event.id }/>
        :''  
        }
          </>
        }
        />
<BasicModal 
        handleClose={setOpenAcceptMeeting}
        open={acceptMeeting}
        body={<MeetingRegistration
        heading="Participant Registration"
        detail="Kindly input the names and email address of every participant  that you want to invite"
          Submit={(value)=>{
            console.log(value)
            // const  meeting = JSON.parse(localStorage.getItem('meeting_detail'))

            // dispatch(registerForMeeting({'meetingID':meeting.id,'proxy_participants':value.participant}))
            dispatch(registerForEventApi({
                'event_id':event.id,
                'proxy_participants':value.participant
            }))  
        }}
        />}
        />
<BasicModal
        open={askQuetion}
        handleClose={setAskQuetion}
        body={<Box style={{'textAlign':'center','padding':'.8rem'}}>
        
          <h2>Register for Event</h2>
          <br />
          <p>do you want to invite other to this event or you want to register your self only</p>
          <br />
          <br />
         
          <div style={{'display':'flex'}}>
            <CustomBtn style={{'marginRight':'10px'}}
            onClick={()=>{
            const event  = JSON.parse(localStorage.getItem('event_detail'))
            dispatch(registerForEventApi({
                'event_id':event.id,
                // 'proxy_participants'
            }))
            // dispatch(registerForMeeting({'meetingID':meeting.id}))
            
            }}
            >Register Only</CustomBtn>
            <CustomBtn styleType="sec"
            onClick={e=>{
              setAskQuetion(false)
              setOpenAcceptMeeting(true)}}
            >Register and invite other individuals</CustomBtn>
          </div>
        </Box>}
        />


        <EventMeetDisplayContainer>
            <div className="">
            {/* Eventimg */}
                <img className="image_preview" src={event.image} alt="" />
                <h3>{event.name}</h3>
                <div className="sub_header__container">
                    <p><strong>Details</strong></p>
                <div style={{'display':'flex','justifyContent':'center','alignItems':'center'}}>
                {   
                // @ts-ignore
                            (event?.event_docs||event?.meeting_docs)?
                        <>
                            <img src={ClipImage.src} alt="" />
            <a href={
                // @ts-ignore 
                 event?.event_docs||event.meeting_docs} 
                    target="_blank"
            style={{'margin':'0 10px','color':'rgb(46, 55, 21)'}} rel="noreferrer"><strong>Get Event Document</strong></a>
                        </>
                            :''
                        }
                </div>
                
                </div>

                <p>
                    {/* {event.} */}

                    {/* @ts-ingore */}
                    <p>{event?.event_extra_details}</p>

                </p>
            </div>

            <div className="EventMeetactionContainer">
                    <div className="event_location_info">
                        <GoCalendar/>
                        <p>{event.startDate}
                        </p>
                    </div>
                    <div className="event_location_info">
                        <TiLocation/>
                        {/* {
                            event.event_access.has_paid? */}
                            <p>
                                {event.event_access.link.includes('https')?
                                <CustomBtn style={{'padding':'.3rem'}} onClick={e=>location.href=event.event_access.link}>Join Now</CustomBtn>
                                :event.event_access.link}
                            </p>
                            {/* : */}
                            {/* <p>You need to pay to access the event info</p>
                        } */}
                        <p>   </p>
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
                {
                    event.event_access.has_paid?
                    <CustomBtn
                    styleType="sec"
                    onClick={e=>{
                    }}
                    style={{'borderRadius':'30px'}}>
                        You are registered
                    </CustomBtn>:
                    <CustomBtn
                    onClick={e=>{
                        if(event.is_paid_event){
                            registerForPaidEvent({'id':event.id,'notify':notify,'setisLoading':setGateWayLoading})
    
                          return
                          }
                        setAskQuetion(true)
                    }}
                    
                    style={{'borderRadius':'30px'}}>
                        
                        {
                            event.is_paid_event?
                            `Pay ${parseInt(event?.amount).toFixed(2)} ₦`:
                            'Register'
                        }
                    </CustomBtn>
                    
                }
            </div>
        </EventMeetDisplayContainer>
        </div>
    )
}

export default MeetDisplay