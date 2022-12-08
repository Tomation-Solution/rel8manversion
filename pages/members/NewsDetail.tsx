import { NextPage } from "next";

import { DashboardLayout } from "../../components/Dashboard/Member/Sidebar/dashboard-layout";
import { useMediaQuery } from 'react-responsive'
import Spinner from "../../components/Spinner";
import {Grid, Button, Typography} from '@mui/material';
import {MemberPublicationType} from '../../redux/memberPublication/memberPublicationAPi'


const NewsDetail:NextPage=()=>{
    const isLaptop = useMediaQuery({
        query: '(min-width: 524px)'
      })
      
      if(typeof window == 'undefined'){
        return <Spinner/>
      }
      let data:any|MemberPublicationType = null
      if( localStorage.getItem('news')){
        data  = JSON.parse(localStorage.getItem('publication_detail'))
      }
    return (
        <DashboardLayout>
             <img src={data?.image} alt=""  style={{'width':'100%',
            'height':isLaptop?'500px':'300px',}}/>



            <div style={{'padding':'0  1rem','margin':'0 auto','maxWidth':'900px',}}>
                            <h2 style={{'textAlign':'center'}}>{data?.name}</h2>

                {
                    data?.paragraphs?.map((p,index)=>(
                        <div key={index}>
                            <Grid  style={{'color':'#000000c4'}} >
                            {p.paragragh}
                        </Grid>
                        <br />
                        </div>

                    ))
                }
                
            </div>

        </DashboardLayout>
    )
}

export default NewsDetail