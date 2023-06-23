


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
    most_recent_finicial_statement:any,
    product_report_for_branch_inspection:any,
    status?:string
}
const schema = yup.object().shape({
    most_recent_finicial_statement:yup.mixed().required(),
    product_report_for_branch_inspection:yup.mixed().required(),
})

const updateOnProductApi = async (data:IForm)=>{
    const form  = new FormData()
    form.append('most_recent_finicial_statement',data.most_recent_finicial_statement[0])
    form.append('product_report_for_branch_inspection',data.product_report_for_branch_inspection[0])
    const resp = await axios.put('/tenant/membershipservice/update-product-manufactured/1/',form )
    return resp.data.data
}


const getOnProductApi = async ()=>{
    const resp = await axios.get('/tenant/membershipservice/update-product-manufactured/1/',)
    return resp.data.data
}
const Update_on_product_manufactured :NextPage = ()=>{
    const {notify} = useToast()
    const route = useRouter();
    const {
        watch, register,handleSubmit, formState: { errors },setValue,
    } = useForm<IForm>({resolver:yupResolver(schema)})

    const {data} =useQuery('getOnProductApi',getOnProductApi)
    const {isLoading,mutate} = useMutation(updateOnProductApi,{
        'onSuccess':(da)=>{
            notify('Success','success')
        },
        'onError':(data)=>{
            notify('Please check your network','error')
        }
    })
    const submitData:SubmitHandler<IForm>=async (data)=>{
            mutate(data)
    }
    return(
        <DashboardLayout
        title='Update On Product Manufactured'
        > {
                isLoading?
                <Spinner />:''
            }


<div   style={{'margin':'0 auto','maxWidth':'900px'}}>
            <div>
            <p style={{'border':'5px solid green','display':'inline-block','padding':'.4rem','borderRadius':'10px'}}>
            <strong>
            {data?.status}
            </strong>
            </p>
                <br /><br />
            <h1>Please find below the requirements for the Update On Product Manufactured:</h1>
            <ul>
                <li>
                Updated the factories location profile on the portal State &amp;
Local Government Area
                </li>
                <li>
                submit most recent Audited Financial Statements
                </li>
                <li>
                payment of all
outstanding subscriptions/levies
                </li>
                <li>
                submitted Factory inspection report from the Branch Executive Secretary
                </li>
            </ul>
            </div>
                <form    onSubmit={handleSubmit(submitData)}>


                <InputWithLabel
                label="Submit most recent Audited Financial Statements"
                isShowLabel={true}
                type="file"
                register={register('most_recent_finicial_statement')}
                />
                <br />

                <InputWithLabel
                label="Submitted Factory inspection report from the Branch Executive Secretary"
                isShowLabel={true}
                type="file"
                register={register('product_report_for_branch_inspection')}
                />
                <br />
            <CustomBtn>
                Submit
            </CustomBtn>
                    </form>
              </div>


        </DashboardLayout>
    )
}

export default Update_on_product_manufactured