
import { Grid, Typography, Button } from "@mui/material"
import { AccountBalanceWalletRounded } from "@mui/icons-material";
// import Image from "next/image";
// import NewsImage from '../../images/Vectorlanding.png'
import NewsImage from '../../images/Vectorlanding.png'
import EventCard from "../../components/EventCard";
import Newscard from "../../components/NewsCard";
import GreenButton from "../../components/Buttonn";
import moment from "moment";
// import { Box } from "@mui/system";
import { DashboardLayout } from "../../components/Dashboard/Member/Sidebar/dashboard-layout";
import Link from "next/link";
import {useAppDispatch,useAppSelector} from '../../redux/hooks'
import { useEffect } from "react";
import { getMembersEvent, registerForFreeEvent, registerForPaidEvent } from "../../redux/memeberEvents/memeberEventsApi";
import { selectMemberEvent } from "../../redux/memeberEvents/memeberEventsSlice";
import { getMemberNews } from "../../redux/memberNews/memberNewsApi";
import { selectMemberNews } from "../../redux/memberNews/memberNewsSlice";
import useToast from "../../hooks/useToast";
import { useState } from "react";
import Spinner from '../../components/Spinner'
import axios from "../../helpers/axios";
import {EventContainerV2, EventV2, GalleryEventGrid, HomeLayout, MainPane, MeetingHeader, PublicationContainerv2, Publicationv2, SidePane } from '../../styles/MembersHome.style'
import { getPublication } from "../../redux/publication/publicationApi";
import { getMemberPublication } from "../../redux/memberPublication/memberPublicationAPi";
import { selectmemberPublication } from "../../redux/memberPublication/memberPublicationSlice";
import { useRouter } from "next/router";
import { selectMeetings } from "../../redux/memberMeeting/memberMeetingSlice";
import { getMeetings, registerForMeeting } from "../../redux/memberMeeting/memberMeetingApi";


export default function Home(props){
  const route = useRouter()
    const dispatch = useAppDispatch()
    const { status,events} = useAppSelector(selectMemberEvent)
    const {news,status:news_status} = useAppSelector(selectMemberNews)
    const { status:meeting_status,meetings } =useAppSelector(selectMeetings) 
    const [images,setImages] = useState([])
    const {status:pub_status,publication} = useAppSelector(selectmemberPublication)
    const {notify} = useToast()
    const [isLoading,setisLoading]= useState(false)

    const getmage =async () =>{

      const resp  = await axios.get('/tenant/extras/gallery_version2/')
      setImages(resp.data.data.data)

  }


    useEffect(()=>{
      dispatch(getMembersEvent({}))
      dispatch(getMeetings({}))
      getmage()
      dispatch(getMemberNews({}))
      dispatch(getMemberPublication({}))
    },[])
    useEffect(()=>{

      if(meeting_status==='registration_success'){
        notify('Registered For Meeting Successfully','success')
        notify('Please we loading the Meeting Details','success')
        // setTimeout(()=>{
        //   window.location.reload()
        // },4000)
      }
      if(meeting_status=='error'){
        notify('Some Error Occured','error')
      }
    },[meeting_status])

   
 
    return(
        <DashboardLayout>
          {
            isLoading?
            <Spinner/>:''
          }
          <HomeLayout>
            <MainPane>
              {
                meetings.length!==0?
                <MeetingHeader>
              
                  <div>
                    <h1>{meetings[0].name}</h1>
                    <p>
                    {meetings[0].details.slice(0,30)}...
                    </p>
                  </div>

                  <h3>
                  {
                moment(meetings[0].event_date).format('LLL')
              }
                  </h3>
                </MeetingHeader>
                :
                <MeetingHeader>
                  
                  <div>
                    <h1>No Meeting</h1>
                    <p>Nill</p>
                  </div>

                  <h3>
                      0<br/>Days
                  </h3>
                </MeetingHeader>

              }
      <br/>
      <br/>
                    <div style={{'padding':'0 1.2rem'}}>
                      {
                        meetings.length==0?'':
                    <h2>Meeting</h2>
                      }
                    </div>
              
   <EventContainerV2>

{
  meetings.slice(0,3).map((data,index)=>(
    <EventV2 key={index}>
    <img
      src='https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fG1lZXRpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
    />
    <h4><small>{data.name}</small></h4>
    <p>{data.details.slice(0,30)}..</p>
    <div className="btn_container">
      <button className="main" onClick={()=>{
        localStorage.setItem('meeting_detail',JSON.stringify(data))
        dispatch(registerForMeeting(data.id))
        route.push('/members/meeting_details/')
        // notify('You have successfully registed for this meeting','success')
      }}>Accept</button>

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



</EventContainerV2>
                <br/>
                <div style={{'padding':'0 1.2rem'}}>
                  {
                    events.length == 0?'':
                    <h2>Event</h2>
                  }
                    </div>
      <EventContainerV2>

{
events.slice(0,3).map((data,index)=>(
<EventV2 key={index}>
<img
src={data.image}
/>
<h4><small>{data.name}</small></h4>
<p>
{
data.is_paid_event?
`Amount:${data.amount}`:''
}
</p>
<div className="btn_container">
  {
    data?.event_access.has_paid?
 
 <button className='not_main'
 onClick={()=>{
localStorage.setItem('event_detail',JSON.stringify(data))
route.push('/members/event_detail/')
 }}
 >Attend</button>
 
 :
 <button className="main" onClick={()=>{
  if(data.is_paid_event){
    // paid_event()
    registerForPaidEvent({
      'id':data.id,
      'notify':notify,
      setisLoading
  })
}   
else{

    registerForFreeEvent({
        'id':data.id,
        'notify':notify,
        setisLoading
    })
} 
}}>Register</button>
  }

</div>
</EventV2>
))
}




</EventContainerV2>
                <br/>

        <h2> Publication</h2>
                <PublicationContainerv2>
               
{
  publication.map((pub,index)=>(
    <Publicationv2 key={index}>
    <img src={pub.image}/>
    <h3>
      {pub.name}
    </h3>
    <p>
      {pub.paragraphs.length!=0?pub.paragraphs[0].paragragh.slice(0,50):''}..
    </p>
    <a href="#"style={{'color':'#075a94'}}
      onClick={()=>{
        localStorage.setItem('publication_detail',JSON.stringify(pub))
        route.push('/members/publicationDetail')
      }}
    >Read More</a>
  </Publicationv2>
  ))
}

                </PublicationContainerv2>

                <br/>

<h2>News</h2>
<Grid container spacing={2} style={{'padding':'1rem'}}>
{
  news.slice(0,3).map((data,index)=>(
    <Newscard
      key={index}
      title={data.name}
      image={data.image}
      body={data.paragraphs.length==0?'....':data.paragraphs[0].paragragh.slice(0,50)}
      data={data}
      />
  ))
}

</Grid>
            </MainPane>

            <SidePane>
              <h2>Latest Updates</h2>
          {
          images.map((img,index)=>(
            <img className="sideImages" key={index} 
            src={  img.images.length!=0?img.images[0].image:''}/>

          ))
          }
            <p
            
            onClick={()=>{
              route.push('/members/gallery')
          }}>See More</p>
            </SidePane>
          </HomeLayout>
        </DashboardLayout>
    )
}