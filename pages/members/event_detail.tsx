import { NextPage } from "next";
import { useEffect } from "react";
import { DashboardLayout } from "../../components/Dashboard/Member/Sidebar/dashboard-layout";
import Spinner from "../../components/Spinner";
import { useMediaQuery } from 'react-responsive'
import Table from '../../components/Table/Table'



const EventDetail:NextPage = ()=>{
    const isLaptop = useMediaQuery({
        query: '(min-width: 524px)'
      })
      
    useEffect(()=>{
        //
        console.log({localStorage})
        if(typeof window == 'undefined'){
            console.log(localStorage.getItem('event_detail'))
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
        Header:'Tracking Number',
        accessor:'paystack',
        id:13}
      ]
    return (
        <DashboardLayout>
             <img src={data?.image} alt=""  style={{'width':'100%',
            'height':isLaptop?'400px':'300px','objectFit':'cover'}}/>

            <br />
            <br />
            <h2 style={{'textAlign':'center','padding':'1rem'}}>{data?.name }</h2>
            <p>
                Event Status: <strong>{data.is_paid_event?'Paid':'Free'}</strong>
            </p>
            <br />
            <Table prop_columns={prop_columns} custom_data={[]}/>



        </DashboardLayout>
    )
} 

export default EventDetail