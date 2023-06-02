import InputWithLabel from "../InputWithLabel/InputWithLabel";
import Spinner from "../Spinner";
import {useEffect} from 'react'

import { toast } from "react-toastify";

import { useForm ,useFieldArray} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from "../../helpers/axios";
import { useMutation } from "react-query";
import CustomBtn from "../CustomBtn/Button";






export const adminGetMemberInfo = async({memberId}:{memberId:number|string} ):Promise<UpdateMemberInfoSchema['user_info']>=>{
    const res = await axios.get(`/tenant/user/admin-update-member-info/?member_id=${memberId}`)
    return res.data.results
}


export const updateMemberInfo = async({memberId,data}:{memberId:number|string,data:UpdateMemberInfoSchema} ):Promise<any>=>{
    const res = await axios.put(`/tenant/user/admin-update-member-info/1/?member_id=${memberId}`,data)
    return res.data
}














const schema = yup.object({
    user_info:yup.array().of(yup.object({
        name:yup.string().required(),
        value:yup.string().required(),
        id:yup.number().required(),
    }))
})
export type UpdateMemberInfoSchema = yup.InferType<typeof schema>

const UpdateMemberModal = ({memberid}:{memberid:string|number}):React.ReactElement=>{
    const { register, handleSubmit, setValue,control,formState: { errors } } = useForm<UpdateMemberInfoSchema>({
        resolver: yupResolver(schema)
      });

    const { fields, append, remove } = useFieldArray({
        name: "user_info",
        control,
      });
      const {mutate,isLoading} = useMutation(adminGetMemberInfo,{
        'onSuccess':(data)=>{
            console.log({'submitted':data})
            setValue('user_info',data)
        }
      })
      const { isLoading:updating,mutate:updateInfor} = useMutation(updateMemberInfo,{
        'onSuccess':(data)=>{
            //some toast like that
            toast.success('Updated')
        }
      })

      const onSubmit = (data: UpdateMemberInfoSchema)=>{
        console.log("wanna nsubmit",data)
        updateInfor({'memberId':memberid ,data})
      }

    useEffect(()=>{
        console.log({memberid})
        if(memberid){
            mutate({'memberId':memberid})
        }
    },[memberid])
    return (
        <form
        onSubmit={handleSubmit(onSubmit)}
        >   
        {
            (isLoading ||updating)?
            <Spinner  />:''
        }
            <div 
            style={{'display':'grid',
'gridTemplateColumns':'1fr 1fr',
            'gap':'10px','justifyContent':'space-between','alignItems':'center'}}
            >
{
                fields.map((field,index)=>(
                    <InputWithLabel
                    label={field.name== 'Chapter'?'Branch':field.name}
                    // placeholder={field.name}
                    key={index}
                    isShowLabel={true}
                    register={register(`user_info.${index}.value`)}
                    />
                ))
            }
            </div>
            <br />
            <CustomBtn style={{'width':'40%','margin':'0 auto'}} 
// styleType={editProfile===false?'pry':'sec'}
>
    Update
</CustomBtn>
            {/* <SubConBtn
            style={{'width':'80%','margin':'10px auto','display':'block'}}
            typex='filled'
            >Update</SubConBtn> */}
        </form>
    )
}

export default UpdateMemberModal