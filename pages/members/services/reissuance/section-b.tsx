import GreenButton from "../../../../components/Buttonn"
import CustomBtn from "../../../../components/CustomBtn/Button"
import { DashboardLayout } from "../../../../components/Dashboard/Member/Sidebar/dashboard-layout"
import InputWithLabel from "../../../../components/InputWithLabel/InputWithLabel"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SubmitHandler, useForm,useFieldArray } from 'react-hook-form';
import {useRouter} from 'next/router'
import useToast from "../../../../hooks/useToast"
import axios from "../../../../helpers/axios";
import { useMutation, useQuery } from "react-query";
import Spinner from "../../../../components/Spinner";

type FormType ={
    bank_teller_of_payment:any;
    affidavit_from_court:any;
    certificate_which_expired_on_thirtyone:any;
    copy_of_certificate_incoporation:any;
    audited_finicial_statement_one:any;
    audited_finicial_statement_two:any;
    status?:string;
}
const schema = yup.object().shape({
    affidavit_from_court: yup.mixed(),
    bank_teller_of_payment: yup.mixed(),
    certificate_which_expired_on_thirtyone: yup.mixed(),
    copy_of_certificate_incoporation: yup.mixed(),
    audited_finicial_statement_one: yup.mixed(),
    audited_finicial_statement_two: yup.mixed(),
})

const updateForm = async (data:FormType)=>{
    //  
    const form = new FormData()

    form.append('affidavit_from_court',data.affidavit_from_court[0])
    form.append('bank_teller_of_payment',data.bank_teller_of_payment[0])
    form.append('copy_of_certificate_incoporation',data.copy_of_certificate_incoporation[0])
    form.append('audited_finicial_statement_one',data.audited_finicial_statement_one[0])
    form.append('audited_finicial_statement_two',data.audited_finicial_statement_two[0])
    const resp = await axios.put('/tenant/membershipservice/loss-of-cert/2/',form)
    return  resp.data.data
}

const getFormData = async():Promise<FormType>=>{
    const resp = await axios.get('/tenant/membershipservice/loss-of-cert/1/')
    return resp.data.data
}
const SecondBatchCert= ()=>{
    const route = useRouter()
    const {notify} = useToast()

    const { register, handleSubmit,control, setValue,formState: { errors } } = useForm<FormType>({
        resolver: yupResolver(schema)
      });
      const {data} =useQuery('getFormData',getFormData)

      const {mutate,isLoading} =useMutation(updateForm,{
        'onSuccess':(data)=>{
            notify('Success','success')
        },
        'onError':(error:any)=>{
            notify('Please check your network','error')
        }
      })
      const onSubmit = (data:FormType)=>{
        mutate(data)
      }
    return (
        <DashboardLayout title={'Companies that lost their MAN Membership Certificates are required to do the following in '}>
        <div  style={{'margin':'0 auto','maxWidth':'900px'}}>
        <p style={{'border':'5px solid green','display':'inline-block','padding':'.4rem','borderRadius':'10px'}}>
            {data?.status}
            </p>
     <br />

     {
        isLoading&&<Spinner />
     }
                <form
         onSubmit={handleSubmit(onSubmit)}
                >
                <InputWithLabel 
                label=" An affidavit from a Court of competence jurisdiction supporting the loss of the Certificate"
                isShowLabel={true}
                type="file"
                register={register('affidavit_from_court')}
                />
<br />

                <InputWithLabel 
                label=" Return of MAN Membership Certificate which expired on the 31st December."
                isShowLabel={true}
                type="file"
                register={register('certificate_which_expired_on_thirtyone')}
                />
    <br />
<InputWithLabel 
                label=" Bank Payment Teller in the sum of Fifty Thousand Naira (N50,000) in favour of Manufacturers Association of Nigeria for re-issuance of Membership Certificate"
                isShowLabel={true}
                register={register('bank_teller_of_payment')}
                type="file"
                />
                <br />




                
          

<InputWithLabel 
                label=" Return of MAN Membership Certificate which expired on the 31st December."
                isShowLabel={true}
                type="file"
                register={register('certificate_which_expired_on_thirtyone')}
                />
<br />
<InputWithLabel 
                label="Certificate Incoporation"
                isShowLabel={true}
                type="file"
                register={register('copy_of_certificate_incoporation')}
                />
<br />
<InputWithLabel 
                label="Audited Finicial Statement (One)"
                isShowLabel={true}
                register={register('audited_finicial_statement_one')}
                type="file"
                />
<br />

<InputWithLabel 
                label="Audited Finicial Statement (Two)"
                register={register('audited_finicial_statement_two')}
                isShowLabel={true}
                type="file"
                />
<br />
                <CustomBtn

                >
                    Submit
                </CustomBtn>
                </form>
        </div>
        </DashboardLayout>
    )
}

export default SecondBatchCert