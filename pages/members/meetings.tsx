import { NextPage } from "next";
import { DashboardLayout } from "../../components/Dashboard/Member/Sidebar/dashboard-layout";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectMeetings } from "../../redux/memberMeeting/memberMeetingSlice";
import {useEffect} from 'react'
import { getMeetings } from "../../redux/memberMeeting/memberMeetingApi";
import Spinner from "../../components/Spinner";
import { EventV2 } from "../../styles/MembersHome.style";
import { useRouter } from "next/router";





const Meetings:NextPage = ()=>{
    const { status,meetings, } =useAppSelector(selectMeetings);
    const dispatch  = useAppDispatch()
    const route = useRouter()
    useEffect(()=>{
      dispatch(getMeetings({}))
    },[])
    return (
        <DashboardLayout>
            {
            status==='pending'?
            <Spinner/>:''
          }

{
  meetings.slice(0,3).map((data,index)=>(
    <EventV2 key={index}>
    <img
      src='https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fG1lZXRpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
    />
    <h4><small>{data.name}</small></h4>
    <p>{data.details.slice(0,30)}..</p>
    <div className="btn_container">
      {/* <button className="main" onClick={()=>{
        localStorage.setItem('meeting_detail',JSON.stringify(data))
        dispatch(registerForMeeting(data.id))
        route.push('/members/meeting_details/')
      }}>Accept</button> */}

      <button className="not_main" onClick={()=>{
        localStorage.setItem('meeting_detail',JSON.stringify(data))
        route.push('/members/meeting_details/')
      }}>
        View
      </button>
    </div>
  </EventV2>
  ))
}
        </DashboardLayout>
    )
}

export default Meetings