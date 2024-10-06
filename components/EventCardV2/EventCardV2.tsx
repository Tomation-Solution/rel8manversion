// import { Box } from '@mui/system'
import Box from '@mui/material/Box';
import {useState} from 'react'
import useToast from '../../hooks/useToast'
import { registerForEventApi } from '../../redux/events/eventsApi'
import { useAppDispatch } from "../../redux/hooks"
import { MemberEventType, registerForPaidEvent } from "../../redux/memberEvents/memeberEventsApi"
import CustomBtn from "../CustomBtn/Button"
import MeetingRegistration from "../Meeting/MeetingRegistration/MeetingRegistration"
import BasicModal from "../Modals"
import Spinner from '../Spinner'
import {EventCardV2Container} from './EventCardV2.style'
import {useRouter} from 'next/router'
type Prop  ={
    data:MemberEventType
}
const EventCardV2 = ({ data}:Prop)=>{
    const btnstyle ={
        'width':'40%',
        'padding':'.5rem'
    }
    const dispatch = useAppDispatch();
    const [acceptMeeting,setOpenAcceptMeeting] = useState(false)
    const [askQuetion,setAskQuetion] = useState(false)
    const [openReSchedule,setOpenReSchedule] = useState(false)
    const [gateWayLoading,setGateWayLoading] = useState(false)
    const {notify} = useToast()
    const route = useRouter()
    return (
        <EventCardV2Container>
            {
                gateWayLoading?
                <Spinner/>:''
            }
<BasicModal
        handleClose={setOpenAcceptMeeting}
        open={acceptMeeting}
        body={<MeetingRegistration
        detail='Kindly input the names and email address of every participant  that you want to invite'
        heading="Participant Registration"
          Submit={(value)=>{
            console.log(value)
            // const  meeting = JSON.parse(localStorage.getItem('meeting_detail'))

            // dispatch(registerForMeeting({'meetingID':meeting.id,'proxy_participants':value.participant}))
            dispatch(registerForEventApi({
                'event_id':data.id,
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
                'event_id':data.id,
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



            <img src={data.image} alt="" />
            
            <p className="event_v2_date">{data.startDate} {data.startTime} </p>
            <p className="event_v2_title">{data.name}</p>
            <br />
            <div style={{'display':'flex','justifyContent':'space-between'}}>
                <CustomBtn
                onClick={e=>{
                    if(data.is_paid_event){
                        registerForPaidEvent({'id':data.id,'notify':notify,'setisLoading':setGateWayLoading})

                      return
                      }
    
                    setAskQuetion(true)
                }}
                style={btnstyle}>
                       Accept
                </CustomBtn>
                <CustomBtn 
                onClick={e=>{
                    localStorage.setItem('event_detail',JSON.stringify(data))
                    route.push('event_detail/')
                }}
                styleType="sec" style={btnstyle}>
                    View
                </CustomBtn>
            </div>
        </EventCardV2Container>
    )
}

export default EventCardV2