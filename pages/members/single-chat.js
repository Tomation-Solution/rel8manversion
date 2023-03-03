import { useRef, useState } from "react";
import SendRounded from '@mui/icons-material/SendRounded'
import AddToPhotos from '@mui/icons-material/AddToPhotos'
import { Grid, Typography, IconButton, TextField, InputAdornment, Icon } from "@mui/material";
import GreenButton from "../../components/Buttonn";
import ChatImage from '../../images/logo.svg'
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
export default function SingleChat (){
        const date = new Date();
    // console.log(text)
    const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


    const isLaptop = useMediaQuery({
        query: '(min-width:1200px)'
      })
    const dispatch = useAppDispatch()
    const {status,members,chat} = useAppSelector(selectChat) 
    const [text, setText] = useState('')
    const [user, setUser] = useState('')
    const [logged_in_user,setLoggedInUser] = useState(null)
    const [messages, setMessages]=useState([])
    const [web_socket,setWeb_socket] = useState(null)

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const getLoggedInUser =async ()=>{

        try{
            const resp = await axios.get('/tenant/user/memberlist-info/my_profile/')
            console.log({resp})
            let resp_data = resp.data.data
            setLoggedInUser(resp_data[0])
        }
        catch(err){
            // notify
        }
    }
    const sendMessage=()=>{
        // web_socket
        const data ={
            'message':text,
            'send_user_id':logged_in_user.user,
            'is_group':false
        }
        
        try{
            web_socket.send(JSON.stringify(data))
           }
           catch(e){
             console.log('catch',e)
           }

           web_socket.onmessage = (e) => {

            // a message was received
            const response = JSON.parse(e.data)
            console.log({response})
            dispatch(addChat({
                'user__id':response.send_user_id,
                'message':response.message
            }))
            // setAllmessages(prevState => [...prevState, response])
            // inputRef.current.clear()
          };

    }

    useEffect(()=>{
        getLoggedInUser()
        dispatch(get_list_members({}))
    },[])
    

    useEffect(()=>{
        if(user){
            //get users message
            const room_name = logged_in_user.user>user.more.user?`${logged_in_user.user}and${user.more.user}`:`${user.more.user}and${logged_in_user.user}`
            
            dispatch(get_old_chats(`?room_name=${room_name}`))

            var ws = new WebSocket(`wss://${sitename}/ws/chat/${tenantName}/${room_name}/`)
            setWeb_socket(ws)
            ws.onopen = (e) => {
                // connection opened
                console.log('connecting',e)
              };
        
             
        
              ws.onclose = (e) => {
                console.log('err',e)
              }
        }
    },[user])


    
    return(
        <DashboardLayout>
            { !logged_in_user&&<Spinner/>}
            
        <Grid mx={1}>
            <Grid container justifyContent='space-between' paddingY={2}>
                <Typography marginBottom={2} className='text' style={{'textAlign':'center'}}>Private Chatroom</Typography>
                {/* <GreenButton text='General Chat' click={()=>Router.back()} radius='10px'
                textColor='white' paddingY={1} paddingX={2} bg='#2e3715'
                /> */}
            </Grid>

            <Grid container>
                
                <Grid item lg={3} marginRight={2} sx={{height:'75vh'}} className='rounded-corners ' paddingY={2}>
                    <Grid className='light-grey-bg rounded-corners' paddingX={2} marginBottom={1} paddingY={1} >
                        <TextField 
                            variant='standard' 
                            size='small' 
                            fullWidth
                            InputProps={{disableUnderline:'true'}}
                            // style={{width:'100%'}}
                            placeholder='Search'
                            // inputProps={InputAdornment:(<Icon name='hey'/>)}
                        />
                    </Grid>
                    {
                    //  [
                    //     {id:1 , 'time':'10:40 am', date:'Feb.2, 2022', image:ChatImage, name:'Ola James', message:'Hello, how are you'},
                    //     {id:2 ,'time':'10:51 am', date:'Feb.2, 2022', image:ChatImage, name:'Abubakar Yusuf', message:'How have you been'},
                    //     {id:3 ,'time':'09:30 pm', date:'Feb.2, 2022', image:ChatImage, name:'Chukwu Mike', message:'Are you still up for nominations?'},
                    //     {id:4 ,'time':'10:51 am', date:'Feb.2, 2022', image:ChatImage, name:'Justice Jane', message:'How about the exxcuive meeting'}
                    // ]
                    logged_in_user?
                    members.filter((value)=>logged_in_user.user !=value.user).map(data=>{
                        return {
                            more:data,
                            message:'',
                            id:data.id,
                            'time':'..',
                            date:'',
                            image:'',
                            name:data.full_name
                        }
                    }).map((e,index)=><Grid onClick={()=>{
                        dispatch(clearChat({}))
                        setOpen(true)
                        setUser(e)

                    }} key={index}>
                        <ChatCard bg={e.id == user.id ?'light-green-bg':'light-grey-bg'} time={e.time} date={e.date} image={e.image} name={e.name} message={e.message} />
                    </Grid>):''
                    // <ChatCard time='10:43 am' date='Feb.2, 2022' image={ChatImage} name='Abubakar Yusuf' message='How have you been' />
                    // <ChatCard time='09:30 pm' date='Feb.2, 2022' image={ChatImage} name='Chukwu Mie' message='Are ou still up for nominations?' />
                    // <ChatCard time='05:30 am' date='Feb.3, 2022' image={ChatImage} name='Justice Jane' message='How about the exxcuive meeting' />
                    }
                    
                </Grid>
                    {
                        isLaptop?
                        <ChatPane
                        logged_in_user={logged_in_user}
                        status={status}
                                user={user}
                                chat={chat}
                                setText={setText}
                                sendMessage={sendMessage}
                        />:
                        <BasicModal
                        open={open}
                        handleClose={handleClose}
                        body={
                            <ChatPane
                            logged_in_user={logged_in_user}
                                status={status}
                                user={user}
                                chat={chat}
                                setText={setText}
                                sendMessage={sendMessage}
                            />
                        }
                        >
                        </BasicModal>
                    }
            </Grid>
            
        </Grid>
        </DashboardLayout>
    )
    
} 




const ChatPane = (props)=>{
    
    const ref = useRef()
    
    return (
    <Grid item lg={8} >
    {props.user ?
    <ChatCard image={props.user.image} name={props.user.name} message='sddsdsds' header={true}/>
    :''
    }
    <Grid item lg={12} sx={{height:'75vh'}} className='rounded-corners light-green-bg' style={{'padding':'0px'}}>
    { props.status=='pending'&&<Spinner/>}

        { props.user ?
        <Grid className='chat-bg' sx={{height:'60vh', overflow:'scroll', overflowX:'hidden'}} >
            {props.chat.map((e)=>
            (e.user__id==props.logged_in_user.user ?
                <Grid container marginX={3} marginY={1} sx={{maxWidth:'60%', minWidth:'10%', borderRadius:'10px', float:'right'}} paddingX={1} paddingBottom={1} className='dark-green-bg'>
                    <Grid container >
                        <Typography textAlign='right' variant='caption' sx={{size:'7px', width:'100%'}}  fontWeight='300' className='white-text' > </Typography>
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
                            <Typography textAlign='right' variant='caption' sx={{size:'7px', width:'100%'}}  fontWeight='300' className='text' > </Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Typography variant='body2' fontWeight='300' className='text' > {e.message} </Typography>
                    </Grid>
                </Grid>)
            )}
        </Grid> : 
        <Typography textAlign='center' >Select a user to chat with</Typography>}
        <Grid md={6} paddingX={1} container justifyContent='space-between'   marginTop={5} position='fixed' bottom='10px' className='rounded-corners light-grey-bg'>
            <Grid item paddingY={1}  >
                <IconButton >
                    <AddToPhotos/>
                </IconButton>
            </Grid>
            <Grid item paddingTop={1}  md={10}>
                <TextField
                    variant='standard'
                    fullwidth
                    placeholder='Type Message'
                    size='large'
                    ref={ref}
                    sx={{width:'100%', borderBottom:'none'}}
                    onChange={(event)=>props.setText(event.target.value)}
                    InputProps={{ disableUnderline:true }}
                />
            </Grid>
            <Grid item paddingY={1}>
                <IconButton onClick={()=>{
                    props.sendMessage()
                }}>
                <SendRounded/>
                </IconButton>
            </Grid>
        
        </Grid>
    </Grid>
    
</Grid>
)}