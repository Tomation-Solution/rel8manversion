import React from 'react'

import { Card,Box,IconButton, InputAdornment, Typography,TextField, Button,Grid, Checkbox } from "@mui/material"
import { style } from "@mui/system"
import  Person from '@mui/icons-material/Person'
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from '../../../../styles/Home.module.css'
import Logo from '../../../../images/logo.svg'

import { useRouter } from "next/router"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SubmitButton from '../../../../components/MarkoBtn'


import { useMutation } from 'react-query'
import { restPasswordApi } from '../../../../redux/auth/signin/signinApi';
import useToast from '../../../../hooks/useToast';




interface LoginType{
    password:string;
    new_password:string;
}


const schema = yup.object().shape({
    password: yup.string().required('Password is required'),
    new_password: yup.string().oneOf([yup.ref('password')],'Passwords must match'),
  });

      




const RestPassword =()=>{
    const route = useRouter()
    const {uidb64, token} = route.query
    const {notify} = useToast()

    const {
        register,handleSubmit, formState: { errors },
    } = useForm<LoginType>({resolver:yupResolver(schema)})

    const {isLoading, mutate} = useMutation(restPasswordApi,{
        'onSuccess':()=>{
            notify('Password Successfully Reset','success')
            route.push('/')
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
        if(typeof token==='string'&&typeof uidb64==='string'){
            mutate({
                'new_password':data.new_password,
                token,uidb64
            })
        }
    }   
    return (
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
                placeholder='Password' 
                // label='Username'  
                style={{width:'100%'}} size='small'
                InputProps={{
                    startAdornment:(
                        <Person color='disabled'  fontSize={'medium'}/>
                    )
                }}
                {...register("password")}
                />
                <Typography >{errors.password?.message}</Typography>
                </>
                <br />
                <>  
                <TextField 
                placeholder='Confirm Password' 
                // label='Username'  
                style={{width:'100%'}} size='small'
                InputProps={{
                    startAdornment:(
                        <Person color='disabled'  fontSize={'medium'}/>
                    )
                }}
                {...register('new_password')}
                />
                <Typography >{errors.new_password?.message}</Typography>
                </>
                
            </Grid>
         
            <br/>

            <SubmitButton 
             text={
                // isLoading?"Loading":
             'Send mail'} radius='10px'
           textColor='white' paddingY={1} paddingX={2} 
           bg='#2e3715'
           />
           </form>
        </Grid>
        <br/>
        </Grid>
    )
}

export default RestPassword