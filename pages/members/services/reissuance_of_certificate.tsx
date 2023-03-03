import { NextPage } from "next";
import { DashboardLayout } from "../../../components/Dashboard/Member/Sidebar/dashboard-layout";

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import {Grid,} from "@mui/material";
import { TextField } from "@material-ui/core";
import CustomBtn from "../../../components/CustomBtn/Button";
import axios from "../../../helpers/axios";
import { useState } from "react";
import Spinner from "../../../components/Spinner";
import useToast from "../../../hooks/useToast";
import { useRouter } from "next/router";

type IForm = {
    attach_membership_receipt:any,
    note:string
}
const schema = yup.object().shape({
    attach_membership_receipt:yup.mixed().required(),
    note:yup.string().required()
})

const ReissuanceOfCertificate:NextPage = ()=>{
    const [isLoading,setIsLoading] = useState(false)
    const {notify} = useToast()
    const route = useRouter()
    const {
        watch, register,handleSubmit, formState: { errors },setValue,
    } = useForm<IForm>({resolver:yupResolver(schema)})
    const submitData:SubmitHandler<IForm>=async (data)=>{
        let user:any= localStorage.getItem('token')
        console.log({user})
        if(!user) return 
        user = JSON.parse(localStorage.getItem('token'))
        const form = new FormData()
        console.log(data.attach_membership_receipt[0])
        form.append('attach_membership_receipt',data.attach_membership_receipt[0])
        form.append('note',data.note)
        form.append('member',user.member_id)
        try{
            setIsLoading(true)
            
            const resp = await axios.post('/tenant/services_request/reissuance_of_certificate/',form)
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
        <DashboardLayout title={'Reissuance Of Certificate'}>
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
<label htmlFor="">Attach Membership Receipt</label>
<TextField
                variant='standard'
                label=""
                fullWidth
                type={'file'}
                InputLabelProps={{className:'light-text'}}
                {...register("attach_membership_receipt")}
            />
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

export default ReissuanceOfCertificate