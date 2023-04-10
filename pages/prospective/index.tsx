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




const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Email is invalid'),
    password: yup.string().required('Password is required').min(2, 'Password must be at least 2 characters'),
  });
// type PropectiveLogin = yup.InferType<typeof schema>;
type PropectiveLogin = {
    email:string;
    password:string;
}
const Page:NextPage =()=>{
    const router = useRouter()
    const form = useRef(null);
    const {notify} = useToast()
    const dispatch = useAppDispatch();
    const  { error,status} = useAppSelector(selectSignIn)

    const {
        register,handleSubmit, formState: { errors },
    } = useForm<PropectiveLogin>({resolver:yupResolver(schema)})


    const submitData:SubmitHandler<PropectiveLogin>=(data)=>{
        console.log('submmited',data)
        dispatch(signinApi(data))
        

    }


    useEffect(()=>{
        if(status ==="failed"){
            notify(error?.data?.error[0])
        }
        if(status ==="succeeded"){
            notify("Login Successful",'success')
            router.push('/prospective/home')
        }
      },[status])
    
      
  useEffect(()=>{
    localStorage.setItem('url_status',JSON.stringify({
        'status':'general_status',
        'id':0
    }))
  },[])
    return (
        <Grid className={styles.loginBg}>
            {status=='loading'?
            <Spinner/>
        :''    
        }
            <ReUseAbleTranspParentCard
            title="Prospective Member Login"
            intro="login as a propspective member"
            >
                <form  onSubmit={handleSubmit(submitData)}>
                    <InputWithLabel 
                    label="Email"
                    Icon={<Person color='disabled'  fontSize={'medium'}/>}
                    register={register('email')}
                    type="text"
                    errorMessage={errors.email?.message}
                    />
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
                    <Typography  className='text' variant='subtitle2'>
                       Dont have an account?<span style={{'color':'#045696','cursor':'pointer'}} onClick={e=>{
                        router.push('prospective/create/')
                       }}>{' '}create</span>
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