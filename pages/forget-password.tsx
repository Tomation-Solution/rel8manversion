import React from 'react'

import { Card,Box,IconButton, InputAdornment, Typography,TextField, Button,Grid, Checkbox } from "@mui/material"
import { style } from "@mui/system"
import  Person from '@mui/icons-material/Person'
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from '../styles/Home.module.css'
import Logo from '../images/logo.svg'

import { useRouter } from "next/router"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SubmitButton from "../components/MarkoBtn"
import {useAppDispatch,useAppSelector} from "../redux/hooks";
import {selectSignIn} from "../redux/auth/signin/signinSlice"
import {requestForgotPasswordApi, signinApi} from "../redux/auth/signin/signinApi"
import useToast from "../hooks/useToast"
import { useMutation } from 'react-query'
interface LoginType{
    email:string;
}


const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Email is invalid'),
  });
  



const Login =  () =>{

    const router = useRouter()
    const {notify} = useToast()
    const {
        register,handleSubmit, formState: { errors },
    } = useForm<LoginType>({resolver:yupResolver(schema)})
    
    const { isLoading,mutate} = useMutation(requestForgotPasswordApi,{
        'onSuccess':()=>{
            notify('Please Check Your mail or spam box','success')
        },
        'onError':(error:any)=>{
            if(error?.response?.data?.message?.error){
                notify(error?.response?.data?.message?.error)
            }else{
                notify('Please Check your internet or contact us if it persist')

            }
        }
    })
    
    const submitData:SubmitHandler<LoginType>= (data)=>{
        console.log(data)
        mutate(data)
    }   



    return(
      <Grid className={styles.loginBg}  style={{'height':'100vh','display':'flex','alignItems':'center','justifyContent':'center'}}  >
   
      <br/>
      
      <Grid item md={12} className={styles.card} sm={10}  style={{margin:'0 auto','maxWidth':'450px'}} >
      <div style={{'width':'80px','margin':'0 auto'}}>
         <img src={Logo.src} style={{'width':'100%','height':'100%'}}/>
     </div>
          <Typography className='text' textAlign='center' marginBottom={2} fontWeight='bolder' >Forgot Password</Typography>
         <Typography className='text' fontWeight='normal' textAlign='center' marginBottom={2} variant='subtitle2' style={{'color':'GrayText'}}>
        Please Enter Your Registered Mail
         </Typography>
         <br/>
                  <form onSubmit={handleSubmit(submitData)} >
          <Grid>
              <>
              <TextField 
              placeholder=' Email' 
              // label='Username'  
              style={{width:'100%'}} size='small'
              InputProps={{
              
                  startAdornment:(
                      <Person color='disabled'  fontSize={'medium'}/>
                  )
              }}
              {...register("email")}
              />
              <Typography >{errors.email?.message}</Typography>
              </>
              
          </Grid>
       
          <br/>
          <Grid container alignItems='center' justifyContent='space-between' paddingY={1}>
              <Grid item><Typography className='text' variant='subtitle2' fontWeight='normal' color='grey'
              onClick={e=>{
                router.push('/')
              }}
              ></Typography></Grid>
              <Grid item >
                  <Typography className='text' variant='subtitle2' fontWeight='normal' color='grey' style={{'cursor':'pointer'}}
                  onClick={e=>{
                    router.push('/forget-password')
                  }}
                  >
                  {/* <Checkbox/> */}
                  Register</Typography>
              </Grid>
          </Grid>
          <SubmitButton  text={isLoading?"Loading":'Send mail'} radius='10px'
         textColor='white' paddingY={1} paddingX={2} bg='rgb(46, 55, 21)'
         
         />
         </form>
      </Grid>
      <br/>
      </Grid>
    )
}


export default Login