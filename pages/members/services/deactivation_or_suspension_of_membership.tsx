

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

type IForm = {
    deactivation_request:any,
    submit_most_recent_financial_statement:any,
    upload_all_levy_recipt:any,
    note:string
}
const schema = yup.object().shape({
    deactivation_request:yup.mixed().required(),
    submit_most_recent_financial_statement:yup.mixed().required(),
    upload_all_levy_recipt:yup.mixed().required(),
    note:yup.string().required()
})

const Deactivation_or_suspension_of_membership:NextPage = ()=>{
    const [isLoading,setIsLoading] = useState(false)
    const {notify} = useToast()
    const route = useRouter();
    const {
        watch, register,handleSubmit, formState: { errors },setValue,
    } = useForm<IForm>({resolver:yupResolver(schema)})

    const submitData:SubmitHandler<IForm>=async (data)=>{
        let user:any= localStorage.getItem('token')
        console.log({user})
        if(!user) return 
        user = JSON.parse(localStorage.getItem('token'))
        const form = new FormData()
        form.append('deactivation_request',data.deactivation_request[0])
        form.append('submit_most_recent_financial_statement',data.submit_most_recent_financial_statement[0])
        form.append('upload_all_levy_recipt',data.upload_all_levy_recipt[0])
        form.append('note',data.note)
        form.append('member',user.member_id)
        try{
            setIsLoading(true)
            
            const resp = await axios.post('/tenant/services_request/deactivation_of_membership/',form)
            setIsLoading(false)

            console.log({resp})
            if(typeof resp.data.id == 'number'){
                notify('Submitted successfully','success')
                notify('Your request is being processed','success')
                setTimeout(()=>{
                    route.back()
                },3000)
            }else{
                notify('please upload pdf files','error')
            }
        }
        catch(err:any){
            setIsLoading(false)
            console.log({err})
            notify('please upload pdf files','error')

        }
    }
    return (
        <DashboardLayout
        title='Deactivation or Suspension Of Membership'
        >
                       {
                isLoading?
                <Spinner />:''
            }

<div   style={{'margin':'0 auto','maxWidth':'500px'}}>
                <form    onSubmit={handleSubmit(submitData)}>
                <br />
<br />
                <label htmlFor="">Note</label>
                <TextField
                variant='standard'
                label=""
                // accept=''
                fullWidth
                InputLabelProps={{className:'light-text'}}
                {...register("note")}
            />
<br />
<br />
<label htmlFor="">Deactivation Request</label>
<TextField
                variant='standard'
                label=""
                fullWidth
                type={'file'}
                InputLabelProps={{className:'light-text'}}
                {...register("deactivation_request")}
            />
<br />
<br />

<label htmlFor="">Submit Most Recent Financial Statement</label>
<TextField
                variant='standard'
                label=""
                fullWidth
                type={'file'}
                InputLabelProps={{className:'light-text'}}
                {...register("submit_most_recent_financial_statement")}
            />
<br />
<br />

<label htmlFor="">Upload All Levy Receipt</label>
<TextField
                variant='standard'
                label=""
                fullWidth
                type={'file'}
                InputLabelProps={{className:'light-text'}}
                {...register("upload_all_levy_recipt")}
            />
<br />
<br />
<br />
<br />



            <CustomBtn style={{'width':'40%','margin':'0 auto'}}>
                Submit
            </CustomBtn>
                    </form>
              </div>

        </DashboardLayout>
    )
}
export default Deactivation_or_suspension_of_membership