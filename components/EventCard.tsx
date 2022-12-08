import {Grid, Button, Typography} from '@mui/material';
import styles from '../styles/Home.module.css'
import GreenButton from './Buttonn';
import Image from "next/image";
import { MemberEventType } from '../redux/memeberEvents/memeberEventsApi';
import axios from '../helpers/axios';
import useToast from '../hooks/useToast';
import { useState } from 'react';
import Spinner from './Spinner';

type Prop = {
    title:string;
    body:string;
    img?:string;
    data?:MemberEventType
}

export default function EventCard (props:Prop){
    const {notify} = useToast()
    const [isLoading,setisLoading]= useState(false)
    const register_for_event = async()=>{
        if(!props.data.id) return 
        setisLoading(true)
        const form = new FormData()
        form.append('event_id',JSON.stringify(props.data.id))
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
                        props.data?.is_virtual?
                <Grid className='light-text'>{props.data?.event_access.link}</Grid>
:<GreenButton text='Attend' radius='10px'
textColor='white' paddingY={1} paddingX={2} bg='#04a9fb'/>
                        :
                        <GreenButton text='Register to Attend' radius='10px'
                        click={(e)=>register_for_event()}
                    textColor='white' paddingY={1} paddingX={2} bg='#04a9fb'/>
                   
                   }
                </Grid>
            </Grid>
        </Grid>
    )
}