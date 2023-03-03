
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
    upload_request_letter:any,
    submit_most_recent_financial_statement:any,
    upload_dues_reciept:any,
    upload_membership_cert_for_both_companies:any,
    note:string
}
const schema = yup.object().shape({
    upload_request_letter:yup.mixed().required(),
    submit_most_recent_financial_statement:yup.mixed().required(),
    upload_dues_reciept:yup.mixed().required(),
    upload_membership_cert_for_both_companies:yup.mixed().required(),
    note:yup.string().required()
})
const MergerOfMemberCompanies: NextPage  =()=>{

    const {
        watch, register,handleSubmit, formState: { errors },setValue,
    } = useForm<IForm>({resolver:yupResolver(schema)})


    const [isLoading,setIsLoading] = useState(false)
    const {notify} = useToast()
    const route = useRouter();


    const submitData:SubmitHandler<IForm>=async (data)=>{
        //
        let user:any= localStorage.getItem('token')
        console.log({user})
        if(!user) return 
        user = JSON.parse(localStorage.getItem('token'))
        const form = new FormData()
        form.append('upload_request_letter',data.upload_request_letter[0])
        form.append('submit_most_recent_financial_statement',data.submit_most_recent_financial_statement[0])
        form.append('upload_dues_reciept',data.upload_dues_reciept[0])
        form.append('upload_membership_cert_for_both_companies',data.upload_membership_cert_for_both_companies[0])
        form.append('note',data.note)
        form.append('member',user.member_id)
        try{
            setIsLoading(true)
            
            const resp = await axios.post('/tenant/services_request/merger_of_companies/',form)
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
            title='Merger Of Member Companies'
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
<label htmlFor="">Upload Request Letter Membership Receipt</label>
<TextField
                variant='standard'
                label=""
                fullWidth
                type={'file'}
                InputLabelProps={{className:'light-text'}}
                {...register("upload_request_letter")}
            />
<br />
<br />

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

<br />
<br />
<label htmlFor="">Upload Dues Reciept</label>
<TextField
                variant='standard'
                label=""
                fullWidth
                type={'file'}
                InputLabelProps={{className:'light-text'}}
                {...register("upload_dues_reciept")}
            />
<br />
<br />

<br />
<br />
<label htmlFor="">Upload Membership Cert For Both Companies</label>
<TextField
                variant='standard'
                fullWidth
                type={'file'}
                InputLabelProps={{className:'light-text'}}
                {...register("upload_membership_cert_for_both_companies")}
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


export default MergerOfMemberCompanies