import { NextPage } from "next";
import { useEffect,useState } from "react";
import { DashboardLayout } from "../../components/Dashboard/Member/Sidebar/dashboard-layout";
import Spinner from "../../components/Spinner";
import { useMediaQuery } from 'react-responsive'
import Table from '../../components/Table/Table'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectMemberEvent } from "../../redux/memeberEvents/memeberEventsSlice";
import {getEventAttendies, registerForPaidEventApi} from '../../redux/memeberEvents/memeberEventsApi'
import CustomBtn from "../../components/CustomBtn/Button";
import BasicModal from "../../components/Modals";
import { Box, TextField } from "@material-ui/core";
import { registerForEventApi } from "../../redux/events/eventsApi";
import useToast from "../../hooks/useToast";
import MeetingRegistration from "../../components/Meeting/MeetingRegistration/MeetingRegistration";
import axios from "../../helpers/axios";
import { useMutation } from "react-query";
import LatestUpdateAndGallery from "../../layout/LatestUpdateAndGallery/LatestUpdateAndGallery";
import { useRouter } from "next/router";
import MeetDisplay from "../../components/MeetDisplay/MeetDisplay";
export const RequestRescheduleForm = (event_id:any):React.ReactElement=>{
  const [date,setDate] = useState<any>();
  const [time,setTime] = useState<any>();
  const {notify} = useToast()
  console.log({'eventid':event_id})
  const onSubmit = async ()=>{
    

    const data = {
      "event":event_id,
      "startDate":date,
      "startTime":time
  }
  console.log({data})
  try{
    const resp =await axios.post('/tenant/event/request-reschedule/',data)
      console.log(resp)
  }catch(e:any){
    console.log({e})
  }

  }
  return (
    <form style={{'textAlign':'center','padding':'1rem'}}>
          <h2>Request for Reschedule</h2>
          <br />
        <p>The even date does not work for you? request reschedule</p>
<br /><br /><br />
            
            <TextField 
                    placeholder='Date'
                    // label='Password'
                    required
                    size='small'
                    style={{width:'100%',}}
                    type={'time'}
                    onChange={e=>{
                      setDate(e.target.value)
                    }}
                    />
<br /><br /><br />

                     <TextField 
                    placeholder='Date'
                    // label='Password'
                    required

                    size='small'
                    style={{width:'100%',}}
                    type={'date'}
                    onChange={e=>{
                      setDate(e.target.value)
                    }}
                    />
                    <br />
                    <br />
                    <CustomBtn 
                    onClick={e=>{
                      e.preventDefault()
                      onSubmit()}}
                    style={{'width':'200px','margin':'0 auto'}}>
                      Submit
                    </CustomBtn>
    </form>
  )
}

const EventDetail:NextPage = ()=>{
    const isLaptop = useMediaQuery({
        query: '(min-width: 524px)'
      })
    const route = useRouter()

      const {notify} = useToast()
      const {attendies,status,errorMessage} = useAppSelector(selectMemberEvent)
      const dispatch = useAppDispatch();

      useEffect(()=>{
        if(typeof window != 'undefined'){
            const  event = JSON.parse(localStorage.getItem('event_detail'))
            dispatch(getEventAttendies({'event_id':event.id}))
        }
      },[])
      useEffect(()=>{
        if(status=='created'){
            notify("Registration Success",'success')
            route.push('/members/events/')
        }
        if(status==='error'){
            notify(errorMessage,'error')
        }
      },[status])
      if(typeof window == 'undefined'){
        return <Spinner/>
      }

      let data:any = null
      if( localStorage.getItem('event_detail')){
        data  = JSON.parse(localStorage.getItem('event_detail'))
      }


      const prop_columns = [ {
        Header:'Email',
        accessor:'email',
        id:1,},
        {
            Header:'Full Name',
            accessor:'full_name',
        //     Cell:(tableProps:any)=>(
        //         <p>
        //         {
        //             tableProps.row.original.member_info.find(d=>{
        //                 return d.name.toLocaleLowerCase() == 'name' ||  d.name.toLocaleLowerCase() == 'first' ||d.name.toLocaleLowerCase() == 'first name' || d.name.toLocaleLowerCase() == 'surname'
        //             })['value']}</p>)
        }
      ]
    return (
      <LatestUpdateAndGallery>
        <p style={{'cursor':'pointer',}} onClick={e=>{
                route.push('/members/meetings/')
            }}>Back  to Events</p>
              {
                data?
                <MeetDisplay event={data} />
              :''
              }
      </LatestUpdateAndGallery>
    )
} 

export default EventDetail






























































// <DashboardLayout>
          
// {
//   (  status==='pending'||isLoading)?
//     <Spinner/>:''
// }
// {/* RequestRescheduleForm */}
// <BasicModal 
// handleClose={setOpenReSchedule}
// open={openReSchedule}
// body={
//   <>
//   {data?
// <RequestRescheduleForm event_id={data.id }/>
// :''  
// }
//   </>
// }
// />
// <BasicModal 
// handleClose={setOpenAcceptMeeting}
// open={acceptMeeting}
// body={<MeetingRegistration
// heading="Participant Registration"
//   Submit={(value)=>{
//     console.log(value)
//     // const  meeting = JSON.parse(localStorage.getItem('meeting_detail'))

//     // dispatch(registerForMeeting({'meetingID':meeting.id,'proxy_participants':value.participant}))
//     dispatch(registerForEventApi({
//         'event_id':data.id,
//         'proxy_participants':value.participant
//     }))  
// }}
// />}
// />
// <BasicModal
// open={askQuetion}
// handleClose={setAskQuetion}
// body={<Box style={{'textAlign':'center','padding':'.8rem'}}>

//   <h2>Register for Event</h2>
//   <br />
//   <p>do you want to invite other to this event or you want to register your self only</p>
//   <br />
//   <br />
 
//   <div style={{'display':'flex'}}>
//     <CustomBtn style={{'marginRight':'10px'}}
//     onClick={()=>{
//     const event  = JSON.parse(localStorage.getItem('event_detail'))
//     dispatch(registerForEventApi({
//         'event_id':data.id,
//         // 'proxy_participants'
//     }))
//     // dispatch(registerForMeeting({'meetingID':meeting.id}))
    
//     }}
//     >Register Only</CustomBtn>
//     <CustomBtn styleType="sec"
//     onClick={e=>{
//       setAskQuetion(false)
//       setOpenAcceptMeeting(true)}}
//     >Register and invite proxy</CustomBtn>
//   </div>
// </Box>}
// />

//     <div
//         style={{
//             'maxWidth':'800px','margin':'0 auto'
//         }}
//     >

// <img src={data?.image} alt=""  style={{'width':'100%',
//     'height':isLaptop?'400px':'300px','objectFit':'cover'}}/>

//     <br />
//     <br />
//     <h2 style={{'textAlign':'center','padding':'1rem'}}>{data?.name }</h2>
//     <p>
//         Event Status: <strong>{data.is_paid_event?'Paid':'Free'}</strong>
//     </p>
//     <p>
//         Event {
//             data.event_access.link.includes('https')?
//         'link'
//         :
//         'Addresse'
//       }:  
//       {
//          data.event_access.link.includes('https')?
//            <a onClick={e=>{
//             e.preventDefault()
//             window.open(data.event_access.link,'_blank')
//            }} style={{'color':'green','textDecoration':'underline','cursor':'pointer'}} target='_blank' rel="noreferrer">Vist event link</a>
//       :
//       data.event_access.link
//         }
//     </p>
//     <br />
//     {
//         data.event_docs?
//     <CustomBtn 
//     onClick={e=>{
//         window.open(data.event_docs,'_blank')
//     }}
//     style={{'width':'200px'}}>
//     Download Event File
//     </CustomBtn>:''
//     }
//     {/* event_docs */}
//     <br />
//     <Table prop_columns={prop_columns} custom_data={attendies}/>
//     </div>
//     <br /><br />
//       <br /><br />


//     <div  style={{'display':'flex','maxWidth':'600px','margin':'0 auto','justifyContent':'space-between'}}>
//             <CustomBtn 
//                 onClick={e=>{
//                   if(data.is_paid_event){
//                     notify('please hold on we proccessing the payment portal')
//                     mutate({'id':data.id})
//                   return
//                   }

//                 setAskQuetion(true)
//                 }}
//                 style={{'width':'25%'}}>
//                 Join
//                 </CustomBtn>

//                 {/* <CustomBtn styleType='sec' 
//                 onClick={(e)=>setOpenReSchedule(true)}
//                 style={{'width':'25%'}}>
//                 Request reSchedule
//                 </CustomBtn> */}

//     {
//         data.meeting_docs?
//         <CustomBtn style={{'width':'25%',}}
//         onClick={(e)=>{
//             window.open(data.meeting_docs,'_blank')
//         }}
//         >
//                         Attachment doc

//         </CustomBtn>:''
//     }   

//     </div>



// </DashboardLayout>