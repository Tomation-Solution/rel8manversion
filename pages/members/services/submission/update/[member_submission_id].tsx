import { DashboardLayout } from "../../../../../components/Dashboard/Member/Sidebar/dashboard-layout"

import { useForm,useFieldArray } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useMutation, useQuery } from "react-query";
import CustomBtn from "../../../../../components/CustomBtn/Button";
import InputWithLabel from "../../../../../components/InputWithLabel/InputWithLabel";
import {useRouter} from 'next/router'
import {  MemberServiceSubmissionType, ServiceType, getMemberServiceSubmission, getServiceDetail, memberServiceSubmission } from "../../../../../redux/customServiceRequestApi";
import Spinner from "../../../../../components/Spinner";
import useToast from "../../../../../hooks/useToast";
 
const schema = yup.object({
    'custom_service':yup.string().required(),
    'fields_subbission':yup.array().of(yup.object({
        'name':yup.string().required(),
        'value':yup.string().required(),
        id:yup.number()
    })),
    file_submission:yup.array().of(yup.object({
        'name_of_file':yup.string().required(),
        'file':yup.mixed(),
        'file_link':yup.string()

    }))
})
type FormI =  yup.InferType<typeof schema>

const UpdateSubmmissionPage = ()=>{
    const { 
        register,setValue, 
        handleSubmit,control,
        formState: { errors },
      } = useForm<FormI>({ resolver: yupResolver(schema) });

      const { fields:fields_subbission, append:fields_subbissionAppend, remove:fields_subbissionRemove } = useFieldArray({
        name: "fields_subbission",
        control,
      });
      const { fields:file_submission, append:file_submissionAppend, remove:file_submissionRemove } = useFieldArray({
        name: "file_submission",
        control,
      });
    const  route = useRouter()
    const {member_submission_id,} = route.query
 
      const {notify} = useToast()
    const {isLoading,data} = useQuery(['getMemberServiceSubmission',member_submission_id],()=>getMemberServiceSubmission({member_submission_id:typeof member_submission_id==='string'?member_submission_id:'-1'}),{
        'enabled':typeof member_submission_id==='string'?true:false,
        refetchOnWindowFocus:false,
        'onSuccess':(data:MemberServiceSubmissionType)=>{
                        setValue('custom_service',data.custom_service.toString())
            setValue('fields_subbission',data.fields_subbission.map((d,index)=>({
                'name':d.name,
                'value':d.value,
                'id':d.id
            })))

            setValue('file_submission',data.files.map((d,index)=>({
                'file':null,
                'name_of_file':d.name,
                'file_link':d.value
            })))
        }
    })
    const {isLoading:submitting, mutate} = useMutation(memberServiceSubmission,{
        'onSuccess':(d)=>{
                notify('Our Staff would reach out to you soon','success')
                route.push(`/members/services/${data.custom_service}/`)
        }
    })
      const onSubmit=(data:FormI)=>{
        console.log(data)
        const form= new FormData()
        //we get all the files and rename it
        data.file_submission.map((file,index)=>{
            if(file.file){
                form.append('files',file.file[0],file.name_of_file)  
            }
        })
    form.append('fields_subbission',JSON.stringify(data.fields_subbission))
    form.append('custom_service',data.custom_service)
        

    mutate(form)
      }

      
    return (
        <DashboardLayout
        title={'Submission Form For '+data?.service_name??''}
        >   
        {(isLoading||submitting)&&<Spinner />}
            <form
            onSubmit={handleSubmit(onSubmit)}
            style={{'margin':'5px auto','maxWidth':'700px',
            // 'border':'1px solid red'
        }}
            >

                  {
                    fields_subbission.map((d,index)=>(
                        <div style={{'padding':'.8rem 0'}}
                        key={index}
                        >
                            <InputWithLabel 
                        label={d.name}
                        register={register(`fields_subbission.${index}.value`)}
                        />
                        </div>
                    ))
                }
                {
                    file_submission.map((d,index)=>(
                    <div
                    style={{'padding':'.8rem 0'}}
                        key={index}
                    >
                        <InputWithLabel 
                        label={d.name_of_file}
                        register={register(`file_submission.${index}.file`)}
                        type='file'
                        />
                        <a href={d.file_link} target="_blank" rel="noreferrer">view current upload</a>

                    </div>
                    ))
                }
                <CustomBtn style={{'width':'250px','margin':'0 auto'}}>Submit</CustomBtn>
            </form>
        </DashboardLayout>
    )
}

export default UpdateSubmmissionPage