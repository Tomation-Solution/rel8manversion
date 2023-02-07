import { useState } from "react";
import { Divider, Grid, Typography } from "@mui/material";
import BannerImage from '../../images/Vectorlanding.png'
import EventPageCard from "../../components/EventPageCard";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { DashboardLayout } from "../../components/Dashboard/Member/Sidebar/dashboard-layout";
import useToast from "../../hooks/useToast";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectMemberEvent } from "../../redux/memeberEvents/memeberEventsSlice";
import EventCard from "../../components/EventCard";
import Spinner from "../../components/Spinner";
import { useEffect } from "react";
import { getMembersEvent } from "../../redux/memeberEvents/memeberEventsApi";


export default function Events(){
    const [value, onChange] = useState(new Date());
    console.log("wowo fuc")
    const { status,events} = useAppSelector(selectMemberEvent)
    const {notify} = useToast()
  const dispatch = useAppDispatch()
    useEffect(()=>{
      dispatch(getMembersEvent({}))
    },[])
    console.log(events)
    return(
        <DashboardLayout>
          {status=='pending'&&<Spinner/>}

          {
            status==='success'&&events.length == 0?
            <h3 style={{'textAlign':'center'}}>No Event</h3>:''
          }

<Grid container spacing={2} style={{'padding':'1rem'}}>
{
            events.map((data,index)=>(
              <EventCard 
              key={index}
              title={data.name}
              body={data.startDate +"  "+data.startTime}
              data={data}
              img={data.image}
              />
            ))
          }

</Grid>
        </DashboardLayout>
    )
}