import { useState } from "react";
import { Divider, Grid, Typography } from "@mui/material";
import BannerImage from '../../images/Vectorlanding.png'
import EventPageCard from "../../components/EventPageCard";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { DashboardLayout } from "../../components/Dashboard/Member/Sidebar/dashboard-layout";
import useToast from "../../hooks/useToast";
import { useAppSelector } from "../../redux/hooks";
import { selectMemberEvent } from "../../redux/memeberEvents/memeberEventsSlice";
import EventCard from "../../components/EventCard";
import Spinner from "../../components/Spinner";


export default function Events(){
    const [value, onChange] = useState(new Date());
    console.log("wowo fuc")
    const { status,events} = useAppSelector(selectMemberEvent)
    const {notify} = useToast()


    return(
        <DashboardLayout>
          {status=='pending'&&<Spinner/>}

<Grid container spacing={2} style={{'padding':'1rem'}}>
{
            events.map((data,index)=>(
              <EventCard 
              key={index}
              title={data.name}
              body={data.startDate +"  "+data.startTime}
              data={data}
              img={'https://images.unsplash.com/photo-1670000037516-62045745b67d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'}
              />
            ))
          }

</Grid>
        </DashboardLayout>
    )
}