import { NextPage } from "next";
import { useEffect } from "react";
import { DashboardLayout } from "../../components/Dashboard/Member/Sidebar/dashboard-layout";
import Spinner from "../../components/Spinner";
import { useMediaQuery } from 'react-responsive'
import Table from '../../components/Table/Table'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectMeetings } from "../../redux/memberMeeting/memberMeetingSlice";
import { getregisteredmembers_forMeeting } from "../../redux/memberMeeting/memberMeetingApi";


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
            <p>
              Info: <strong>{data.details}</strong>
            </p>
        
        <br />
        {/* attendees */}
        <Table prop_columns={prop_columns} custom_data={attendees}/>

        </div>
        </DashboardLayout>
    )
}

export default MeetingDetails