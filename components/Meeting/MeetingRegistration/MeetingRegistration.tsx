import TextField from "@mui/material/TextField"
import CustomBtn from "../../CustomBtn/Button"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useState } from "react";
import React, { useEffect } from 'react'
import { useForm, useFieldArray, useWatch, Control } from "react-hook-form";
import {AiFillCloseCircle} from 'react-icons/ai'



type Iform = {
    participant:{
        full_name:string;
        email:string;
    }[]
}
const schema = yup.object({
    'participant':yup.array().of(yup.object({
        'full_name':yup.string().required(),
        'email':yup.string().required(),
    }))
})
type Prop = {
    Submit:(data:Iform)=>void;
    heading?:string;
    detail?:string;
}
const MeetingRegistration =({Submit,heading='Proxy Registration',detail='Kindly input the names and email address of every participant that you want to invite'}:Prop):React.ReactElement=>{
    const {register,control, handleSubmit, setValue,formState: { errors } }  =  useForm<Iform>({resolver: yupResolver(schema),})
    const {fields,append,remove} = useFieldArray({
        name:'participant',control
    })
    const onSubmit = (data:Iform)=>{
        Submit(data)
    }
    return (
        <form style={{'padding':'1rem'}}
        onSubmit={handleSubmit(onSubmit)}
        >
            <div style={{'textAlign':'center'}}>
                <h2>{heading}</h2>
                <p>{detail}</p>
            </div>
            <br />
            {
                fields.map((data,index)=>(
                <div key={index} style={{'width':'80%','margin':'0 auto',}}>
                <p style={{'margin':'.7rem 0'}}><strong>Participant {index+1}</strong></p>
                <div  style={{'display':'flex','justifyContent':'space-between','position':'relative'}}>
                    <TextField 
                    placeholder='Full Name'
                    // label='Password'
                    size='small'
                    style={{width:'45%',}} 
                    {...register(`participant.${index}.full_name`)}
                    />
                                <TextField 
                    placeholder='Email Address'
                    // label='Password'
                    size='small'
                    {...register(`participant.${index}.email`)}
                    style={{width:'45%'}} />
                     <AiFillCloseCircle style={{'color':'crimson','cursor':'pointer'}} onClick={(e:any)=>remove(index)}/>
                </div>
                </div>
                ))
            }
            <br />
            <p style={{'color':'#2B3513','fontSize':'1rem','textAlign':'center'}}
             onClick={(e) =>{
                e.preventDefault()
                append({'email':'','full_name':''})
              }}
            ><small>Click to add more info</small></p>
            <br />
            <br />
            <CustomBtn style={{'margin':'0 auto','width':'300px'}}>
                Register
            </CustomBtn>
        </form>
    )
}
export default MeetingRegistration