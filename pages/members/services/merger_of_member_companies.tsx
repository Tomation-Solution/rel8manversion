
import { NextPage } from "next";
import { DashboardLayout } from "../../../components/Dashboard/Member/Sidebar/dashboard-layout";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { TextField } from "@material-ui/core";
import CustomBtn from "../../../components/CustomBtn/Button";
import axios from "../../../helpers/axios";
import { useState } from "react";
import Spinner from "../../../components/Spinner";
import useToast from "../../../hooks/useToast";
import { useRouter } from "next/router";
import GreenButton from "../../../components/Buttonn";
import InputWithLabel from "../../../components/InputWithLabel/InputWithLabel";
import { useMutation, useQuery } from "react-query";

type IForm = {
    letter_requesting_merge:any,
    most_recent_finicial_statement:any,
}
const schema = yup.object().shape({
    most_recent_finicial_statement:yup.mixed().required(),
    letter_requesting_merge:yup.mixed().required(),
})

const updateMergerOfCompaniesApi = async (data:IForm)=>{
    const form = new FormData()
    form.append('most_recent_finicial_statement',data.most_recent_finicial_statement[0])
    form.append('letter_requesting_merge',data.letter_requesting_merge[0])
    const resp = await axios.put('/tenant/membershipservice/merger-of-company/1/',form)
    return resp.data.data 
}
const getupdateMergerOfCompaniesApi = async ()=>{
    const resp = await axios.get('/tenant/membershipservice/merger-of-company/1/')
    return resp.data.data 
}
const MergerOfMemberCompanies: NextPage  =()=>{

    const {
        watch, register,handleSubmit, formState: { errors },setValue,
    } = useForm<IForm>({resolver:yupResolver(schema)})

    const {notify} = useToast()
    const route = useRouter();

    const {data}= useQuery('getupdateMergerOfCompaniesApi',getupdateMergerOfCompaniesApi)
    const { isLoading,mutate} = useMutation(updateMergerOfCompaniesApi,{
        'onSuccess':(data)=>{
            notify('Uploaded Admin will get back to you soon','success')
        },  
        'onError':(error:any)=>{
            notify('Please Check Your Network Error')
        }
    })



    const submitData:SubmitHandler<IForm>=async (data)=>{
        console.log(data)
    mutate(data)     
    }
        return (
            <div>

<DashboardLayout
            title='Merger Of Member Companies'
            >
                
 {
                isLoading?
                <Spinner />:''
            }


            

<div   style={{'margin':'0 auto','maxWidth':'700px'}}>
<div>
            <p style={{'border':'5px solid green','display':'inline-block','padding':'.4rem','borderRadius':'10px'}}>
            <strong>
            {data?.status}
            </strong>
            </p>
                <br /><br />
            <h1>Please find below the requirements for the Merger of member companies:</h1>
            <ul>
                <li>
                Submit a letter requesting for the merger of the companies under the membership of the Association.
                </li>
                <li>
                submission of most recent Audited Financial Statement.
                </li>
                <li>
                payment of all outstanding subscriptions/levies of concerned companies and return of all
membership certificates of the concerned companies.
                </li>
            </ul>
            </div>
     
     
            <div>
                <InputWithLabel
                label="Submit a letter requesting for the merger of the companies under
                the membership of the Association"
                isShowLabel={true}
                register={register('letter_requesting_merge')}
                type="file"
                />
<br />
<InputWithLabel
                label="Submission of most recent Audited Financial Statement,"
                isShowLabel={true}
                register={register('most_recent_finicial_statement')}
                type="file"
                />
<br />
                </div>
     <br /><br /><br />
                <form    onSubmit={handleSubmit(submitData)}>
     


            <CustomBtn style={{'width':'40%','margin':'0 auto'}}>
                Submit
            </CustomBtn>
                    </form>
              </div>
            </DashboardLayout>
            </div>
        )
}


export default MergerOfMemberCompanies