import { NextPage } from "next";
import { useRef, useState } from "react";
import SendRounded from '@mui/icons-material/SendRounded'
import AddToPhotos from '@mui/icons-material/AddToPhotos'
import { Grid, Typography, IconButton, TextField, InputAdornment, Icon, Box } from "@mui/material";
import GreenButton from "../../components/Buttonn";
import ChatImage from '../../images/logo.png'
import ChatCard from "../../components/ChatCard";
import { DashboardLayout } from "../../components/Dashboard/Member/Sidebar/dashboard-layout";
import Router from "next/router";
import { useAppSelector,useAppDispatch} from '../../redux/hooks'
import { addChat, selectChat,clearChat } from "../../redux/Chat/ChatSlice";
import { useEffect } from "react";
import { get_list_members, get_old_chats } from "../../redux/Chat/ChatApi";
import axios, { sitename, tenantName } from "../../helpers/axios";
import Spinner from '../../components/Spinner'
import { useMediaQuery } from 'react-responsive'
import BasicModal from '../../components/Modals'
import { getUserOrNull, UserType } from "../../utils/extraFunction";

type ChatRoomType ={
    'type':'general'|'commitee'|'exco',
    'value':number |string,
    'display':string,
}

const GroupChat:NextPage = ()=>{
    const [open, setOpen] = useState(false);

    const isLaptop = useMediaQuery({
        query: '(min-width:1200px)'
      })
    const dispatch = useAppDispatch()
    const {status,members,chat} = useAppSelector(selectChat) 
    const [text, setText] = useState('')
    const [user, setUser] = useState('')
    const [chatroom,setChatRoom] = useState<null|ChatRoomType>(null)
    const [web_socket,setWeb_socket] = useState(null)
    const [connecting,setConnecting] = useState(false)
    const [logged_in_user,setLoggedInUser] =useState<null|UserType>()

    const handleClose = () => {
        setOpen(false);
      };

      const sendMessage=()=>{
       let logged_in_user =  getUserOrNull()
       if(!logged_in_user) return 
        const data ={
            'message':text,
            'send_user_id':logged_in_user.user_id,
            'is_group':true
        }
        
        try{
            web_socket.send(JSON.stringify(data))
           }
           catch(e){
             console.log('catch',e)
           }

           

    }

    useEffect(()=>{
        setLoggedInUser(getUserOrNull())

    },[])
    useEffect(()=>{
        if(web_socket){
            //to avoid duplicate connection
            web_socket.close()}

        if(chatroom){
            let url =''
            if(chatroom.type=='general'){
                dispatch(get_old_chats(`?room_name=general`))
                url = `wss://${sitename}/ws/chat/${tenantName}/general/`
            }
            if(chatroom.type==='commitee'){
                dispatch(get_old_chats(`?room_name=${chatroom.value}`))
                url = `wss://${sitename}/ws/commitee_chat/${tenantName}/${chatroom.value}/`
            }
            if(chatroom.type==='exco'){
                dispatch(get_old_chats(`?room_name=${chatroom.value}`))
            }

            const ws = new WebSocket(url)
            setWeb_socket(ws)
            ws.onopen = (e) => {
                console.log('connected',e)
                setConnecting(false)
              }
              ws.onclose = (e) => {
                console.log('err',e)
              }

        }
    },[chatroom])

    if(web_socket){
        web_socket.onmessage = (e) => {
            // a message was received
            const response = JSON.parse(e.data)
            dispatch(addChat({
                'user__id':response.send_user_id,
                'message':response.message
            }))
          };
    }
    console.log({logged_in_user})
    return (
        <DashboardLayout title='Group Chat'>
            <Grid item   style={{'width':'100%'}}>
            {/* { !logged_in_user&&<Spinner/>} */}
            {connecting?<Spinner/>:''}

<Box  style={{'display':'flex'}}> 

            <Grid item lg={3} marginRight={2} sx={{height:'75vh','width':'20%'}} className='rounded-corners ' paddingY={2}>
                   
            <Grid onClick={()=>{
                        dispatch(clearChat({}))
                        setChatRoom({
                            'type':'general',
                            'display':'General',
                            'value':-1// here we dont needd the value at all the word  general is enough
                        })
                        // setOpen(true)
                        // setUser(e)
                        // setConnecting(true)
                    }} >
                        <ChatCard 
                        // bg={e.id == user.id ?'light-green-bg':'light-grey-bg'} 
                        bg={chatroom?.value===-1?'light-green-bg':'light-grey-bg'} 
                        time={''} date={''} 
                        // image={e.image} 
                        name={'General Chat'} message={'welcome to...'} />
                    </Grid>

                    {
                        logged_in_user?.commitee.map((d,index)=>(
                            <Grid 
                            key={index}
                            onClick={()=>{
                                dispatch(clearChat({}))
                                setChatRoom({
                                    'type':'commitee',
                                    'display':d.name,
                                    'value':d.id// here we dont needd the value at all the word  general is enough
                                })
                                // setOpen(true)
                                // setUser(e)
                                // setConnecting(true)
                            }} >
                                <ChatCard 
                                // bg={e.id == user.id ?'light-green-bg':'light-grey-bg'} 
                                bg={chatroom?.value===`${d.id}comittee`?'light-green-bg':'light-grey-bg'} 
                                time={''} date={''} 
                                // image={e.image} 
                                name={d?.name} message={'welcome to...'} />
                            </Grid>
                        ))
                    }
                 
                </Grid>
                <Box style={{'width':'80%'}}>
                    <GroupChatPane
                    status={status}
                    chatroom={chatroom}
                    chat={chat}
                    setText={setText}
                    sendMessage={sendMessage}
                    />
                </Box>
            </Box > 

            </Grid>
        </DashboardLayout>
    )
}

export default GroupChat


type GroupChatPaneProp = {
    chat:{
        message: string
        user__id: number,
        full_name?:string
    }[],
    status:string;
    chatroom:ChatRoomType;
    sendMessage:any,
    setText:any,
}

const GroupChatPane = ({status,
    chatroom,chat,
    sendMessage,setText
}:GroupChatPaneProp):React.ReactElement =>{
    const ref = useRef()
    const [logged_in_user,setLoggedInUser] =useState<null|UserType>()
    
    useEffect(()=>{
        setLoggedInUser(getUserOrNull())
        
    },[])
    return (
        <Grid item   style={{'width':'100%'}}>
    { status=='pending'&&<Spinner/>}







    { chatroom ?
        <Grid className='chat-bg' sx={{height:'60vh', overflow:'scroll', overflowX:'hidden'}} >
            {chat.map((e)=>
            (e.user__id==logged_in_user.user_id ?
                <Grid container marginX={3} marginY={1} sx={{maxWidth:'60%', minWidth:'10%', borderRadius:'10px', float:'right'}} paddingX={1} paddingBottom={1} className='dark-green-bg'>
                    <Grid container >
                        <Typography textAlign='right' variant='caption' sx={{size:'7px', width:'100%'}}  fontWeight='300' className='white-text' > </Typography>
                    </Grid>
                    <Grid container>
                        <Typography variant='body2' fontWeight='300' className='white-text' > {e.message} </Typography>
                    </Grid>
                </Grid>:
                <Grid container marginX={3} marginY={1} sx={{maxWidth:'60%', minWidth:'10%', borderRadius:'10px'}} paddingX={1} paddingBottom={1} style={{'backgroundColor':'#ececec65'}}>
                    <Grid container justifyContent='space-between'>
                        {/* <Grid item>
                            <Typography textAlign='right' variant='caption' sx={{size:'7px', width:'100%'}}  fontWeight='300' className='light-text' > {sender} </Typography>
                        </Grid> */}
                        <Grid item>
                            <Typography textAlign='right' variant='caption' sx={{size:'7px', width:'100%'}}  fontWeight='300' className='text' > </Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Typography variant='body2' fontWeight='300' className='text' > {e.message} </Typography>
                    </Grid>
                </Grid>)
            )}
        </Grid> : 
        <Typography textAlign='center' >Select a Group to chat in</Typography>}
        <Grid md={6} paddingX={1} container justifyContent='space-between'   marginTop={5} position='fixed' bottom='10px' className='rounded-corners light-grey-bg'>
            <Grid item paddingY={1}  >
                <IconButton >
                    <AddToPhotos/>
                </IconButton>
            </Grid>
            <Grid item paddingTop={1}  md={10}>
                <TextField
                    variant='standard'
                    // fullwidth={true}
                    placeholder='Type Message'
                    // size='large'
                    ref={ref}
                    sx={{width:'100%', borderBottom:'none'}}
                    onChange={(event)=>setText(event.target.value)}
                    InputProps={{ disableUnderline:true }}
                />
            </Grid>
            <Grid item paddingY={1}>
                <IconButton onClick={()=>{
                   sendMessage()
                }}>
                <SendRounded/>
                </IconButton>
            </Grid>
        
        </Grid>







        </Grid>

    )
}