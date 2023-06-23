import GreenButton from "../../../../components/Buttonn"
import CustomBtn from "../../../../components/CustomBtn/Button"
import { DashboardLayout } from "../../../../components/Dashboard/Member/Sidebar/dashboard-layout"
import InputWithLabel from "../../../../components/InputWithLabel/InputWithLabel"

import {useRouter} from 'next/router'
import useToast from "../../../../hooks/useToast"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SubmitHandler, useForm,useFieldArray } from 'react-hook-form';
import axios from "../../../../helpers/axios"
import { useMutation, useQuery } from "react-query"
import Spinner from "../../../../components/Spinner"



const schema = yup.object().shape({
    submit_change_of_name_cert: yup.mixed(),
    bank_teller_of_payment: yup.mixed(),
    certificate_which_expired_on_thirtyone: yup.mixed(),
    copy_of_certificate_incoporation: yup.mixed(),
    audited_finicial_statement_one: yup.mixed(),
    audited_finicial_statement_two: yup.mixed(),
})
type FormType ={
    submit_change_of_name_cert: any,
    bank_teller_of_payment: any,
    certificate_which_expired_on_thirtyone: any,
    copy_of_certificate_incoporation: any,
    audited_finicial_statement_one: any,
    audited_finicial_statement_two: any,
    status?:string;
}

const updateChangeOfName =async (data:FormType)=>{
    const form = new FormData()
    form.append('submit_change_of_name_cert',data.submit_change_of_name_cert[0])
    form.append('bank_teller_of_payment',data.bank_teller_of_payment[0])
    form.append('copy_of_certificate_incoporation',data.copy_of_certificate_incoporation[0])
    form.append('audited_finicial_statement_one',data.audited_finicial_statement_one[0])
    form.append('audited_finicial_statement_two',data.audited_finicial_statement_two[0])
    const resp = await axios.put('/tenant/membershipservice/change-of-name/1/',form)
    return resp.data.data
}

const getChageOfName = async ():Promise<FormType>=>{
    const resp = await axios.get('/tenant/membershipservice/change-of-name/1/')
    return resp.data.data
}
const SecondBatchCert= ()=>{
    const route = useRouter()
    const {notify} = useToast()

    const { register, handleSubmit,control, setValue,formState: { errors } } = useForm<FormType>({
        resolver: yupResolver(schema)
      });
    const {mutate,isLoading} = useMutation(updateChangeOfName,{
        'onSuccess':(data)=>{
            notify('Updated','success')
        },
        'onError':(error:any)=>{
            notify('Please Check Your Internet','success')
        }
    })
    const {data} =useQuery('getChageOfName',getChageOfName)

    const onSubmit = (data:FormType)=>{
        mutate(data)
        console.log(data)
    }
    return (
        <DashboardLayout title={`Companies that changed the names on their original Certificates are required to do the 
        following in addition to the above A(1-5)`}>
        <div  style={{'margin':'0 auto','maxWidth':'900px'}}>
            <p style={{'border':'5px solid green','display':'inline-block','padding':'.4rem','borderRadius':'10px'}}>
            <strong>
            {data?.status}
            </strong>
            </p>
            {/* <p></p> */}
        <form 
         onSubmit={handleSubmit(onSubmit)}
        >
            {
                isLoading?
                <Spinner />:''
            }
                <br />
                <InputWithLabel 
                label="Change of name Certificate as issued by Corporate Affairs Commission (CAC)."
                isShowLabel={true}
                type="file"
                register={register('submit_change_of_name_cert')}
                />
<br />
<InputWithLabel 
                label="Bank Payment Teller in the sum of Fifty Thousand Naira Only (N50,000) in favour of "
                isShowLabel={true}
                type="file"
                register={register('bank_teller_of_payment')}
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
                // onClick={e=>{
                //     e.preventDefault()
                //     notify("Uploaded Successfully",'success')
                // }}
                >
                    Submit
                </CustomBtn>

        </form>
        </div>
        </DashboardLayout>
    )
}

export default SecondBatchCert