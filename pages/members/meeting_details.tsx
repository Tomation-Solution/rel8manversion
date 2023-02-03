import { NextPage } from "next";
import { useEffect } from "react";
import { DashboardLayout } from "../../components/Dashboard/Member/Sidebar/dashboard-layout";
import Spinner from "../../components/Spinner";
import { useMediaQuery } from 'react-responsive'
import Table from '../../components/Table/Table'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectMeetings } from "../../redux/memberMeeting/memberMeetingSlice";
import { getregisteredmembers_forMeeting } from "../../redux/memberMeeting/memberMeetingApi";
import Line from "../../components/Line";
import {HiCalendar} from 'react-icons/hi'
import moment from "moment";

const MeetingDetails:NextPage = ()=>{
    const isLaptop = useMediaQuery({
        query: '(min-width: 524px)'
      })
      const {status,attendees} = useAppSelector(selectMeetings)
      const dispatch = useAppDispatch();
      
    useEffect(()=>{
        if(typeof window != 'undefined'){
            const  meeting = JSON.parse(localStorage.getItem('meeting_detail'))
            dispatch(getregisteredmembers_forMeeting(meeting.id))
        }
      },[])
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
    return (
        <DashboardLayout>
            {
                status=='pending'&&<Spinner/>
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
              {data.addresse}
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

        {/* attendees */}
        <Table prop_columns={prop_columns} custom_data={attendees}/>

        </div>
        </DashboardLayout>
    )
}

export default MeetingDetails