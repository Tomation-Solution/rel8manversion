import styles from '../../styles/Home.module.css'
import { Card,Box,IconButton, InputAdornment, Typography,TextField, Button,Grid, Checkbox, } from "@mui/material"
import Logo from '../../images/logo.svg'
import Lock from '@mui/icons-material/Lock'
import Person from '@mui/icons-material/Person'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import CustomBtn from '../../components/CustomBtn/Button'
import axios from '../../helpers/axios'
import {useState} from 'react'
import useToast from '../../hooks/useToast'
import Spinner from '../../components/Spinner'
import { getTokenorEmptyString } from '../../helpers/auth.helper'
import { useRouter } from 'next/dist/client/router'


const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;



const CreateNewMember= ()=>{

    const [loading,setLoading] = useState(false)
    const [email,setEmail] = useState<string>()
    const [password,setPassword] = useState<string>()
    const [isLoading,setIsLoading]= useState(false)
    const {notify} = useToast()
    const route  = useRouter()
    const handleSubmit = async (e:React.MouseEvent)=>{
        if(!window.confirm('Are you sure about your password')) return
        let get_profile:any =  localStorage.getItem('validatedUser');
        let email:any =  localStorage.getItem('validatedEmail');
        if((!get_profile)||(!email)){
            notify('Something Went wrong please revalidate your acct')
            route.back()
            return 
        }
       
        get_profile = JSON.parse(get_profile)
        email = JSON.stringify(email)
        // ...get_profile
        const clean_data:any={'MEMBERSHIP_NO':get_profile.MEMBERSHIP_NO, password,'email':JSON.parse(email)}
        setIsLoading(true)
        
        try{
            const resp = await axios.post('/tenant/auth/ManageMemberValidation/create_member/',clean_data)
        if(resp.data.status_code == 201){
            notify('Please check your email for confirmation','success')
            notify('Please wait','success')
            localStorage.removeItem('validatedUser');
            localStorage.removeItem('validatedEmail');
            setIsLoading(false)
    
            route.push('/')
        }else{
            notify('An error occured. if it happens again please reach out to us','error')
        }
        setIsLoading(false)
        }
        catch(err:any){
            setIsLoading(false)
            notify(err.response.data.message.error as string,'error')
        }

    }

    return (
        <Grid className={styles.loginBg}  style={{'height':'100vh'}}  >
        {
            (loading||isLoading)?
            <Spinner/>:''
        }
  <br/>
  
  <Grid item md={12} className={styles.card} sm={10}  style={{margin:'0 auto','maxWidth':'450px'}} >
  <div style={{'width':'80px','margin':'0 auto'}}>
     <img src={Logo.src} style={{'width':'100%','height':'100%'}}/>
 </div>
      <Typography className='text' textAlign='center' marginBottom={2} fontWeight='bolder' >Set Account Credential</Typography>
     <Typography className='text' fontWeight='normal' textAlign='center' marginBottom={2} variant='subtitle2' color='InactiveCaption'>
    Please enter your email and password
     </Typography>
     <br/>
              
      <Grid>
      
          <>
          <TextField 
          placeholder='Password' 
          onChange={e=>setPassword(e.target.value)}
          style={{width:'100%'}} size='small'
          InputProps={{startAdornment:( <Person color='disabled'  fontSize={'medium'}/>)}}
          />
          </>
          
      </Grid>
    <CustomBtn
     onClick={handleSubmit} 
    style={{'width':'200px','margin':'10px auto'}}>
    Validate
    </CustomBtn>
      {/* <GreenButton text='Login' /> */}
      {/* <Button variant='contained' size='large' className={styles.button}>Login</Button> */}
  </Grid>
  <br/>
  </Grid>
    )
}

export default CreateNewMember