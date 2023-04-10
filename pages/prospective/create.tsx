import { NextPage } from "next";
import ReUseAbleTranspParentCard from "../../components/ReUseAbleTranspParentCard/ReUseAbleTranspParentCard";
import styles from '../../styles/Home.module.css'
import { Grid } from "@mui/material"
import InputWithLabel from "../../components/InputWithLabel/InputWithLabel";
import { Lock, Person } from "@mui/icons-material";
import CustomBtn from "../../components/CustomBtn/Button";
import { Typography } from "@material-ui/core";
import { useRouter } from "next/router"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectSignIn } from "../../redux/auth/signin/signinSlice";
import useToast from "../../hooks/useToast";
import { useEffect, useRef } from "react";
import { signinApi } from "../../redux/auth/signin/signinApi";
import Spinner from "../../components/Spinner";
import { useMutation } from "react-query";
import { signUpApi } from "../../redux/auth/signup/signupApi";
import { route } from "next/dist/server/router";



const InputFlexstyle ={'display':'flex','gap':'20px'}
const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Email is invalid'),
    full_name:yup.string().required('Full name is required'),
    telephone_number:yup.string().required('Telephone name is required').min(11,'must be up to 11 digits').max(11,'must be up to 11 digits'),
    addresse:yup.string().required('Addresse is required'),
    password: yup.string().required('Password is required').min(2, 'Password must be at least 2 characters'),
  });
export type PropectiveCreate ={
    "password":string,
    "full_name":string,
    "telephone_number":string,
    "email":string,
    "addresse":string
}
const Page:NextPage =()=>{
    const router = useRouter()
    const form = useRef(null);
    const {notify} = useToast()

    const {
        register,handleSubmit, formState: { errors },
    } = useForm<PropectiveCreate>({resolver:yupResolver(schema)})


    const {mutate,status,isLoading} =  useMutation(signUpApi,{
        'onSuccess':()=>{
            notify('Registration Success please check your email for activation','success')
            router.push('/prospective/')
        },
        'onError':(err)=>{
            notify('This email exists already try another','error')
        }
    })
    const submitData:SubmitHandler<PropectiveCreate>=(data)=>{
        console.log('submmited',data)
        mutate(data)
    }


      

    return (
        <Grid className={styles.loginBg}>
            {
                isLoading?
                <Spinner/>:''
            }
            <ReUseAbleTranspParentCard
            title="Prospective Member Login"
            intro="login as a propspective member"
            >
                <form  onSubmit={handleSubmit(submitData)}>

                <div style={InputFlexstyle}>
                <InputWithLabel 
                    label="Full Name"
                    Icon={<Person color='disabled'  fontSize={'medium'}/>}
                    register={register('full_name')}
                    type="text"
                    errorMessage={errors.full_name?.message}
                    />
                    {/* <br /> */}
                    <InputWithLabel 
                    label="Email"
                    Icon={<Person color='disabled'  fontSize={'medium'}/>}
                    register={register('email')}
                    type="text"
                    errorMessage={errors.email?.message}
                    />
                </div>
                    <br />
                    <div style={InputFlexstyle}>

                <InputWithLabel 
                label="Phone Number"
                Icon={<Person color='disabled'  fontSize={'medium'}/>}
                register={register('telephone_number')}
                type="text"
                errorMessage={errors.telephone_number?.message}
                />
                                <InputWithLabel 
                label="Addresse"
                Icon={<Person color='disabled'  fontSize={'medium'}/>}
                register={register('addresse')}
                type="text"
                errorMessage={errors.addresse?.message}
                />
                    </div>
                        <br />
                    <InputWithLabel 
                    label="Password"
                    register={register('password')}
                    type='password'
                    errorMessage={errors.password?.message}
                    Icon={ <Lock color='disabled'  fontSize={'medium'} /> }
                    />
                              <br/>
                    <div>
                    <Typography className='text' variant='subtitle2' fontWeight='normal' color='grey'>
                      Already have an account?<span style={{'color':'#045696','cursor':'pointer'}} onClick={e=>{
                        router.push('/prospective/')
                      }}>{' '}Login</span>
                    </Typography>
                    </div>
          
                     <br />
                    <CustomBtn>Login</CustomBtn>
                </form>
            </ReUseAbleTranspParentCard>
        </Grid>
    )
}

export default Page