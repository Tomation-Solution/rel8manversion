import { NextPage } from "next";
import { useEffect } from "react";
import { DashboardLayout } from "../../components/Dashboard/Member/Sidebar/dashboard-layout";
import Spinner from "../../components/Spinner";
import { useMediaQuery } from 'react-responsive'
import Table from '../../components/Table/Table'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectMemberEvent } from "../../redux/memeberEvents/memeberEventsSlice";
import {getEventAttendies} from '../../redux/memeberEvents/memeberEventsApi'


const EventDetail:NextPage = ()=>{
    const isLaptop = useMediaQuery({
        query: '(min-width: 524px)'
      })
      const {attendies,status} = useAppSelector(selectMemberEvent)
      const dispatch = useAppDispatch();
      
    useEffect(()=>{
        if(typeof window != 'undefined'){
            const  event = JSON.parse(localStorage.getItem('event_detail'))
            dispatch(getEventAttendies({'event_id':event.id}))
        }
      },[])
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
        <DashboardLayout>

            <div
                style={{
                    'maxWidth':'800px','margin':'0 auto'
                }}
            >

<img src={data?.image} alt=""  style={{'width':'100%',
            'height':isLaptop?'400px':'300px','objectFit':'cover'}}/>

            <br />
            <br />
            <h2 style={{'textAlign':'center','padding':'1rem'}}>{data?.name }</h2>
            <p>
                Event Status: <strong>{data.is_paid_event?'Paid':'Free'}</strong>
            </p>
            <p>
                Event {data.is_paid_event?'Addresse':'link'}: {data.event_access.link}
            </p>
            <br />
            <Table prop_columns={prop_columns} custom_data={attendies}/>
            </div>



        </DashboardLayout>
    )
} 

export default EventDetail