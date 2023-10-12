import React,{useMemo} from 'react'

import { useState,useRef,useEffect } from "react"
import { Card,Box,IconButton, InputAdornment, Typography,TextField, Button,Grid, Checkbox } from "@mui/material"
import  Lock from '@mui/icons-material/Lock'
import  Person from '@mui/icons-material/Person'
import  Visibility from '@mui/icons-material/Visibility'
import  VisibilityOff from '@mui/icons-material/VisibilityOff'
import HeroSection from "../components/HeroSection"
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from '../styles/Home.module.css'
import Navbar from "../components/Navbar"
import Logo from '../images/logo.svg'

import Footer from "../components/Footer"
import GreenButton from "../components/Buttonn"
import { useRouter } from "next/router"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SubmitButton from "../components/MarkoBtn"
import {useAppDispatch,useAppSelector} from "../redux/hooks";
import {selectSignIn} from "../redux/auth/signin/signinSlice"
import {signinApi} from "../redux/auth/signin/signinApi"
import useToast from "../hooks/useToast"
import Select from 'react-select';
import listOfCompanys from '../utils/list-of-companys'
interface LoginType{
  matric_number:string;
    password:string;
    company_name:string;
}


const schema = yup.object().shape({
  matric_number: yup.string().required('Matric number is required'),
    password: yup.string().required('Password is required').min(2, 'Password must be at least 2 characters'),
    company_name:yup.string().required()
  });
  



const Login =  () =>{
    const  listOfCompanysState = useMemo(() => listOfCompanys.map((data,index)=>(
      { value: data, label:data }
    )), [])
    const [showPassword, setShowPassword]= useState(true);
    const router = useRouter()
    const form = useRef(null);
    const {notify} = useToast()
    const dispatch = useAppDispatch();
    const  { error,status} = useAppSelector(selectSignIn)
    const {
        register,handleSubmit,setValue ,formState: { errors },
    } = useForm<LoginType>({resolver:yupResolver(schema)})
    
    
    const submitData:SubmitHandler<LoginType>= (data)=>{

        dispatch(signinApi(data))
    }

    const  handleChange = (selectedOption) => {
      setValue('company_name',selectedOption.value)
    }
  useEffect(()=>{
    if(status ==="failed"){
        notify(error?.data?.error[0])
    }
    if(status ==="succeeded"){
        notify("Login Successful",'success')
        router.push('/members/home')
    }
  },[status])

  useEffect(()=>{
    localStorage.setItem('url_status',JSON.stringify({
        'status':'general_status',
        'id':0
    }))
  },[])





    return(
      <Grid 
      className={styles.loginBg}
      >
      
   <div 
   className={styles.card}
   >
      <div style={{'width':'80px','margin':'0 auto'}}>
         <img src={Logo.src} style={{'width':'100%','height':'100%'}}/>
     </div>
          <Typography className='text' textAlign='center' marginBottom={2} fontWeight='bolder' >USER LOGIN</Typography>
         <Typography className='text'
         style={{'color':'rgb(46, 55, 21)'}}
          fontWeight='normal' textAlign='center' marginBottom={2} variant='subtitle2' color='InactiveCaption'>
         Click here to login into your Dashboard </Typography>
         <br/>
                  <form onSubmit={handleSubmit(submitData)} >
                 <Select
            // value={selectedOption}
            onChange={handleChange}
         
            options={listOfCompanysState}
            className="basic-single"
            classNamePrefix="select"
            />
           <br />
          <Grid>
              <>
              <TextField 
              placeholder='MAN Membership Number' 
              // label='Username'  
              style={{width:'100%'}} size='small'
              InputProps={{
              
                  startAdornment:(
                    <>
                      <Person color='disabled'  fontSize={'medium'}/>
                    </>
                  )
              }}
              {...register("matric_number")}
              />
              <Typography >{errors.matric_number?.message?'MAN Membership Number is required':''}</Typography>
              </>
              
          </Grid>
           
          {/* <br/> */}
          <Grid container marginY={2}>
              <>
              <TextField 
              placeholder=' Password'
              // label='Password'
              size='small'
              type= {showPassword ? 'password' : 'text'}
              style={{width:'100%'}}
              InputLabelProps={{ shrink: true,  }}
              InputProps={{
                  endAdornment: (
                  <IconButton
                      aria-label="toggle password visibility"
                      onClick={()=>setShowPassword(!showPassword)}
                      // onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  ),
                  startAdornment: (
                       <Lock color='disabled'  fontSize={'medium'} /> 
                        )
                  
                  
              }}
              {...register("password")}
              />
              <Typography >{errors.password?.message}</Typography>
              </>

          </Grid>
          <br/>
          <Grid container alignItems='center' justifyContent='space-between' paddingY={1}>
              <Grid item><Typography className='text' variant='subtitle2' fontWeight='normal' color='grey'>Forgot Password?</Typography></Grid>
              <Grid item >
                  <Typography className='text' variant='subtitle2' fontWeight='normal' color='grey' style={{'cursor':'pointer'}}
                  onClick={e=>{
                    router.push('/validate/')
                  }}
                  >
                  {/* <Checkbox/> */}
                  Activate Account</Typography>
              </Grid>
          </Grid>
          <SubmitButton  text={status==="loading"?"Loading":'Login'} radius='10px'
         textColor='white' paddingY={1} paddingX={2} bg='#2e3715'
         
         />
         </form>
          {/* <GreenButton text='Login' /> */}
          {/* <Button variant='contained' size='large' className={styles.button}>Login</Button> */}
      </div>
     
      </Grid>
    )
}


export default Login