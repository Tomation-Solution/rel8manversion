

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
    submit_original_membership_cert:any,
    letter_request_for_activation_or_deactivation:any,
    status?:string
}
const schema = yup.object().shape({
    letter_request_for_activation_or_deactivation:yup.mixed().required(),
    submit_original_membership_cert:yup.mixed().required(),
})


const updateSuspensionApi = async(data:IForm)=>{
    const form = new FormData()
    form.append('letter_request_for_activation_or_deactivation',data.letter_request_for_activation_or_deactivation[0])
    form.append('submit_original_membership_cert',data.submit_original_membership_cert[0])
    const resp = await axios.put('/tenant/membershipservice/deactivation-activation-service/1/',form)
    return resp.data.data
}
const getSuspensionApi = async()=>{
    const resp = await axios.get('/tenant/membershipservice/deactivation-activation-service/1/',)
    return resp.data.data
}
const Deactivation_or_suspension_of_membership:NextPage = ()=>{
    const {notify} = useToast()
    const route = useRouter();
    const {
        watch, register,handleSubmit, formState: { errors },setValue,
    } = useForm<IForm>({resolver:yupResolver(schema)})
    const {isLoading,mutate} = useMutation(updateSuspensionApi,{
        'onSuccess':(d)=>{
            notify('Success','success')
        },
        'onError':(err:any)=>{
            notify('Please check your internet','error')
        }
    })
    const {data,isLoading:loading} = useQuery('getSuspensionApi',getSuspensionApi)
    const submitData:SubmitHandler<IForm>=async (data)=>{
        mutate(data)
    }
    return (
        <DashboardLayout
        title='Deactivation or Suspension Of Membership'
        >
                       {
                (isLoading||loading)?
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
            <h1>Please find below the requirements for the Deactivation/Suspension:</h1>
            <ul>
                <li>
                Submit a letter requesting for
                deactivation/suspension of membership
                </li>
                <li>
                payment of all outstanding subscriptions/levies
                </li>
                <li>
                submission of original membership certificate.
                </li>
            </ul>
            </div>
                <form    onSubmit={handleSubmit(submitData)}>


                <InputWithLabel
                label="Submit a letter requesting for
                deactivation/suspension of membership"
                isShowLabel={true}
                type="file"
                register={register('letter_request_for_activation_or_deactivation')}
                />
                <br />

                <InputWithLabel
                label="Submission of original membership certificate."
                isShowLabel={true}
                type="file"
                register={register('submit_original_membership_cert')}
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
export default Deactivation_or_suspension_of_membership