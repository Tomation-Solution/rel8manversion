
import { Grid, Typography, Button } from "@mui/material"
import { AccountBalanceWalletRounded } from "@mui/icons-material";
// import Image from "next/image";
// import NewsImage from '../../images/Vectorlanding.png'
import NewsImage from '../../images/Vectorlanding.png'
import EventCard from "../../components/EventCard";
import Newscard from "../../components/NewsCard";
import GreenButton from "../../components/Buttonn";
// import { Box } from "@mui/system";
import { DashboardLayout } from "../../components/Dashboard/Member/Sidebar/dashboard-layout";
import Link from "next/link";
import {useAppDispatch,useAppSelector} from '../../redux/hooks'
import { useEffect } from "react";
import { getMembersEvent } from "../../redux/memeberEvents/memeberEventsApi";
import { selectMemberEvent } from "../../redux/memeberEvents/memeberEventsSlice";
import Spinner from '../../components/spinner'
import { getMemberNews } from "../../redux/memberNews/memberNewsApi";
import { selectMemberNews } from "../../redux/memberNews/memberNewsSlice";
import useToast from "../../hooks/useToast";
import { useState } from "react";
import axios from "../../helpers/axios";
export default function Home(props){

    const dispatch = useAppDispatch()
    const { status,events} = useAppSelector(selectMemberEvent)
    const {news,status:news_status} = useAppSelector(selectMemberNews)

    const {notify} = useToast()
    const [isLoading,setisLoading]= useState(false)
    const register_for_event = async(data)=>{
        if(!data.id) return 
        setisLoading(true)
        const form = new FormData()
        form.append('event_id',JSON.stringify(data.id))
        const resp = await axios.post('/tenant/event/eventview/register_for_free_event/',form)
        console.log(resp)
        setisLoading(false)
        if(resp.status ==200){
            notify('Registered for Successfully','success')
            setTimeout(()=>{
                window.location.reload()
            },2000)
        }
        if(resp.status==400){
            notify('It a paid event you need to pay','success')

        }
    }
    useEffect(()=>{
      dispatch(getMembersEvent({}))
      dispatch(getMemberNews({}))
    },[])

    return(
        <DashboardLayout>
        <Grid>
          {status=='pending'&&<Spinner/>}
          {news_status=='pending'&&<Spinner/>}
          
          <br/>
          
          <Grid container md={12} justifyContent='space-around'>
              <Grid item md={8} sm={12} sx={12} marginY={2} paddingBottom={2} className='rounded-corners' style={{'color':'#04a9fb','backgroundColor':'rgba(4, 169, 251, 0.11)'}}>
                <Grid container md={12}  justifyContent='space-between' marginX={3} marginY={2}>
                  <Grid item>
                    <Typography fontWeight='500'  className='text '>
                      Events Dashboard
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography fontWeight='400' className='text light-text'>
                      {/* Aug 23, 2022 */}
                    </Typography>
                  </Grid>
                </Grid>
                {/* // Alumni Thanksgiving Day 2022   -    Feb., 2 2022 */}

                <Grid>
                  <Typography variant='body2' fontWeight='300' marginX={3} className='text '>
                    {
                      events.slice(0).map((data,index)=>(
                        <>
                        {data.name} 
                        </>
                      )
                    )}
                  </Typography>
                </Grid>

                <Grid md={4} marginRight={2} marginTop={2} style={{float:'right'}}>
                <GreenButton text='Register to Attend' radius='10px'
                click={(e)=>register_for_event(events.slice(0)[0])}
               textColor='white' paddingY={1} paddingX={2} bg='#04a9fb'/>
                  {/* <Button variant='contained' size='small' className={[styles.button, 'button-lower'] }>Register to Attend</Button>    */}
                </Grid>

              </Grid>
              {/* light-green-bg  */}
              <Grid item md={3} sm={12} xs={12} className='rounded-corners' style={{'color':'#04a9fb','backgroundColor':'rgba(4, 169, 251, 0.11)'}} paddingY={3} >
                  <Grid container justifyContent='space-evenly'>
                  <Grid item>
                    <AccountBalanceWalletRounded/>
                  </Grid>
                  <Grid item>
                    <Typography fontWeight='bold' className='text'  >0.00</Typography>
                  </Grid>
                  <Grid container justifyContent='space-around'>
                    <Grid item md={8}>
                      <Typography fontWeight='normal' textAlign='center' className='text' >Oustanding</Typography>
                    </Grid>
                    <Grid item md={8}>
                    <br/>
                    <GreenButton text='Pay' radius='10px'
                      textColor='white' paddingY={1} paddingX={1} marginX={2} bg='#04a9fb'/>
                      {/* <Button variant='contained' size='small' className={[styles.button, 'button-lower'] }>
                        Pay
                      </Button> */}
                    </Grid>
                  </Grid>
                  </Grid>
              </Grid>
          </Grid>


          {/* News */}

          <Grid container justifyContent='space-between'  md={11} style={{'margin':'10px auto'}} >
            <Grid item>
              <Typography className='text' fontWeight='500'>Latest AANI News</Typography>
            </Grid>
            <Grid item>
              <Typography className='text' fontWeight='500'>..</Typography>
            </Grid>

            {/* New Details */}
            <Grid container  justifyContent='space-between' >
              {
                news.slice(0,3).map((data,index)=>(
                  <Newscard 
                  key={index}
                  title={data.name}
                  image={data.image}
                  body={data.paragraphs.length==0?'....':data.paragraphs[0].paragragh.slice(0,100)}
                  data={data}
                  />
                ))
              }
              
                
            </Grid>

            {/* Exco Members */}

            
          </Grid>
          
          {/* <Grid item md={3}  >
                  <br/>
              <Typography marginLeft={2} fontWeight='bold' marginBottom={1}>EXCO MEMBERS</Typography>
              <Grid container justifyContent='space-around'  className='light-grey-bg rounded-corners' padding={3}>
              <Typography variant='body2'  className='text' fontWeight='400'  marginY={1}>Hon. Babalola John</Typography>
              <Typography variant='body2'  className='text' fontWeight='400'  marginY={1}>Hon. Babalola John</Typography>
              <Typography variant='body2'  className='text' fontWeight='400'  marginY={1}>Hon. Babalola John</Typography>
              <Typography variant='body2'  className='text' fontWeight='400'  marginY={1}>Hon. Babalola John</Typography>
              <Typography variant='body2'  className='text' fontWeight='400'  marginY={1}>Hon. Babalola John</Typography>
              <Typography variant='body2'  className='text' fontWeight='400'  marginY={1}>Hon. Babalola John</Typography>
                 
                  <Grid container justifyContent='center'>
                        <Link href='/excos'>
                           <Typography textAlign='center' className='nav-link text'>
                               See All
                           </Typography>    
                        </Link> 
                </Grid>
              </Grid>
              
          </Grid> */}
        <br/>
        <Typography marginLeft={2} className='text' >Upcoming Members Events</Typography>

        <Grid container justifyContent='space-between' padding={2} className='rounded-corners light-grey-bg'>
          {/* <br/> */}
          {
            events.slice(0,3).map((data,index)=>(
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

        </Grid>
        </DashboardLayout>
    )
}