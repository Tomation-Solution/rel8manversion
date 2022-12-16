import {Grid, Button, Typography} from '@mui/material';
import styles from '../styles/Home.module.css'
import GreenButton from './Buttonn';
import Image from "next/image";
import { MemberEventType, registerForFreeEvent, registerForPaidEvent } from '../redux/memeberEvents/memeberEventsApi';
import axios from '../helpers/axios';
import useToast from '../hooks/useToast';
import { useState } from 'react';
import Spinner from './Spinner';
import { useRouter } from "next/router";


type Prop = {
    title:string;
    body:string;
    img?:string;
    data?:MemberEventType
}

export default function EventCard (props:Prop){
    const {notify} = useToast()
    const route = useRouter()
    const [isLoading,setisLoading]= useState(false)
    
    

    return(
        <Grid md={4} >
            {isLoading==true?<Spinner/>:''}
            
            <Grid md={11} marginY={1} padding={2}  className='rounded-corners white-bg'>
                <img alt={props.title} src={props.img} style={{'width':'100%','height':'150px','objectFit':'cover'}} className='rounded-corners' />
                <Typography fontWeight='bold' variant='body2'>{props.title}</Typography>
                <Grid className='light-text'>{props.body}</Grid>
                <Grid md={9} style={{float:'right'}}>
                    {/* <Button  variant='contained'  size='small' className={[styles.button, 'button-lower rounded-button'] }>
                        
                    </Button> */}
                    {
                        props.data?.event_access.has_paid?
                        <GreenButton text='Attend' radius='10px'
                        click={()=>{
                            console.log('Click')
                            localStorage.setItem('event_detail',JSON.stringify(props.data))
                            route.push('/members/event_detail/')
                        }}
textColor='white' paddingY={1} paddingX={2} bg='#04a9fb'/>
                        :
                        <GreenButton text='Register to Attend' radius='10px'
                        click={(e)=>{
                            if(props.data.is_paid_event){
                                registerForPaidEvent({
                                    'id':props.data.id,
                                    'notify':notify,
                                    setisLoading
                                })
                            }   
                            else{

                                registerForFreeEvent({
                                    'id':props.data.id,
                                    'notify':notify,
                                    setisLoading
                                
                                })
                            } 
                        
                        }}
                    textColor='white' paddingY={1} paddingX={2} bg='#04a9fb'/>
                   
                   }
                </Grid>
            </Grid>
        </Grid>
    )
}