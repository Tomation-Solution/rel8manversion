import { AddToPhotos, SendRounded } from "@mui/icons-material"
import { Typography, Grid, TextField, IconButton } from "@mui/material"
import { useState } from "react"
import GreenButton from "../Buttonn";
// import { makeStyles } from "@material-ui/core/styles";


export default function Chat (props){

    const date = new Date();
    console.log(text)
    const [text, setText] = useState('')
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const sendMessage=()=>{
        setMessages([...messages, {
            'sender':'Funmi',
            'message' : text,
            'time': date.getHours() +':' + date.getMinutes() + ' pm',
            'date' : monthNames[date.getMonth()]+'.'  + ' ' + date.getDay() + ', '+ date.getFullYear()
        }])
        console.log(messages)
    }
    const [messages, setMessages]=useState([
        {
        'sender':'me',
        'message': 'Whats up man',
        'time' : '10:00 am',
        'date' : 'Feb. 2, 2020'
         },
         {
            'sender':'me',
            'message': 'Hope you are doing good?',
            'time' : '10:00 am',
            'date' : 'Feb. 2, 2020'
             },
             {
                'sender':'Shola James',
                'message': 'Am good',
                'time' : '10:18 am',
                'date' : 'Feb. 2, 2020'
                 },

])
    return(
        <Grid>
            <Grid container justifyContent='space-between' paddingY={2}>
                <Typography marginBottom={2} className='text'>General Chatroom</Typography>
                <GreenButton text='Private Chat' click={()=>props.setSelected(9)} radius='10px'
                textColor='white' paddingY={1} paddingX={2} bg='#436937'
                />
            </Grid>

            <Grid  sx={{height:'75vh'}} className='rounded-corners light-green-bg' paddingY={2}>
                <Grid className='chat-bg' sx={{height:'70vh', overflow:'scroll', overflowX:'hidden'}} >
                    {messages.map((e)=>
                    (e.sender=='me' ?
                        <Grid container marginX={3} marginY={1} sx={{maxWidth:'60%', minWidth:'10%', borderRadius:'10px', float:'right'}} paddingX={1} paddingBottom={1} className='dark-green-bg'>
                            <Grid container >
                                <Typography textAlign='right' variant='caption' sx={{size:'7px', width:'100%'}}  fontWeight='300' className='white-text' > {e.date + ' - ' + e.time} </Typography>
                            </Grid>
                            <Grid container>
                                <Typography variant='body2' fontWeight='300' className='white-text' > {e.message} </Typography>
                            </Grid>
                        </Grid>:
                        <Grid container marginX={3} marginY={1} sx={{maxWidth:'60%', minWidth:'10%', borderRadius:'10px'}} paddingX={1} paddingBottom={1} className='white-bg'>
                            <Grid container justifyContent='space-between'>
                                <Grid item>
                                    <Typography textAlign='right' variant='caption' sx={{size:'7px', width:'100%'}}  fontWeight='300' className='light-text' > {e.sender} </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography textAlign='right' variant='caption' sx={{size:'7px', width:'100%'}}  fontWeight='300' className='text' > {e.date + ' - ' + e.time} </Typography>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Typography variant='body2' fontWeight='300' className='text' > {e.message} </Typography>
                            </Grid>
                        </Grid>)
                    )}
                </Grid>
            </Grid>
            <Grid md={10} paddingX={1} container justifyContent='space-between'   marginTop={5} position='fixed' bottom='10px' className='rounded-corners light-grey-bg'>
                <Grid item paddingY={1}  >
                    <IconButton >
                        <AddToPhotos/>
                    </IconButton>
                </Grid>
                <Grid item paddingTop={1}  md={11}>
                    <TextField
                        variant='standard'
                        size='large'
                        sx={{width:'100%', borderBottom:'none'}}
                        onChange={()=>setText(event.target.value)}
                        // InputProps={{ classes }}
                    />
                </Grid>
                <Grid item paddingY={1}>
                    <IconButton onClick={sendMessage}>
                    <SendRounded/>
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    )
}