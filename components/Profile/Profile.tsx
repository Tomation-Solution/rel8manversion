import { ProfileContainer } from "./Profile.style"
import MemberPlaceholder from '../../images/memberPlaceholder.png'
import { MemberType } from "../../redux/members/membersApi"
import { FetchName } from "../../utils/extraFunction"
import CustomBtn from "../CustomBtn/Button"
import axios from "../../helpers/axios"
import useToast from "../../hooks/useToast"
import {useEffect, useState} from 'react'
import Spinner from "../Spinner"
import {MdOutlineAddAPhoto} from 'react-icons/md'
import { useForm, useFieldArray, useWatch, Control } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {TextField} from '@mui/material'
import {  Person,  } from "@mui/icons-material"


type Prop ={
    member:MemberType,
    can_edit_img?:boolean;
}

type ProfileTypeForm  ={
    memberData:MemberType['member_info'],
}
const schema = yup.object({
    'memberData':yup.array().of(yup.object({
        'id':yup.number(),
        'name':yup.string(),
        'value':yup.string(),
    }))
})

const Profile = ({member,can_edit_img=false}:Prop):React.ReactElement=>{
    const Name:string = FetchName(member)
    const [editProfile,setEditProfile] =useState(false)
    const [photo,setPhoto] = useState(member.photo?member.photo:'')
    const {notify} = useToast()
    const [isLoading,setIsLoading] = useState(false)


    const { register,control,setValue, watch,handleSubmit,formState: { errors } } = useForm<ProfileTypeForm>({
        resolver: yupResolver(schema),
      mode: "onBlur"
    });

    const {fields,} = useFieldArray({
        name:'memberData',control
    })
    useEffect(()=>{
        setValue('memberData',member.member_info)
    },[])



    const onSubmit =async (submmited:ProfileTypeForm ) =>{
        console.log({submmited})
        setIsLoading(true)
        const resp =await axios.post('/tenant/user/memberlist-info/update_profile/',submmited.memberData)
        if(resp.data.status_code ==200){
            notify('Profile Update','success')
            notify('Please hold on as we get the recent data','success')
            window.location.reload()
        }
    }
    const updateProfile = async (file:any)=>{
        const form = new FormData()
        form.append('photo',file)
        setIsLoading(true)
        const resp = await axios.post('/tenant/user/memberlist-info/update_profile_img/',form)
        if(resp.data.status_code==200){
            notify('Photo updated Successfully','success')
            setPhoto(resp.data.data[0])
        }
        setIsLoading(false)

    }

    return  (
<ProfileContainer>
    {
        isLoading?
        <Spinner/>:''
    }
    <img className='profile_pics' src={photo} alt=""  />
    {
        can_edit_img?
        <CustomBtn style={{'padding':'.9rem','margin':'5px auto','width':'50px','height':'50px','border-radius':'50%','position':'relative'}}>
            <label htmlFor="profile_photo" style={{'position':'absolute','top':'0','left':'0','width':'100%','height':'100%','cursor':'pointer'}}>
    </label>
        <MdOutlineAddAPhoto/>
    </CustomBtn>
    :''
    }
<input type="file" name="profile_photo" id="profile_photo" style={{'display':'none'}} 
onChange={(e)=>{
    const file = e.target.files[0]
    updateProfile(file)
}}
/>
{editProfile===false?

<div>
<br />
    <h2>{Name}</h2>
<br />
{
    member.member_info.length!==0?
    <>
        <h2>Member Info</h2>
        <br />
        <div>
            {
                member.member_info.map((data,index)=>(
                    <div key={index}>
                        <p><strong>{data.name}</strong></p>
                        <p><small>{data.value}</small></p>
                        <br />
                    </div>
                ))
            }
        </div>
    </>
    :''
    
}
<br />
{
    member.exco_info.length!==0?
    <>
        <h2>Exco Info</h2>
        <div>
            {
                member.exco_info.map((data,index)=>(
                    <div key={index}>
                        <p><strong>{data.name}</strong></p>
                        <p><small>{data.about}</small></p>
                    </div>
                ))
            }
        </div>
    </>
    :''
    
}
    <br />
</div>
:
<form
onSubmit={handleSubmit(onSubmit)}
>
    {
        fields.map((data,index)=>{
            return (
                <div key={index}>
<TextField 
              placeholder={data.name} 
              // label='Username'  
              style={{width:'100%'}} size='small'
              InputProps={{
              
                  startAdornment:(
                      <Person color='disabled'  fontSize={'medium'}/>
                  )
              }}
              {...register(`memberData.${index}.value`)}
              />
                </div>
            )
        })
    }
    <br />
    <CustomBtn style={{'width':'40%','margin':'0 auto'}} 
styleType={'pry'}
>
    Update
</CustomBtn>
</form>
}
<br />
{
    can_edit_img?
<CustomBtn style={{'width':'40%','margin':'0 auto'}} 
onClick={e=>setEditProfile(!editProfile)}
styleType={editProfile===false?'pry':'sec'}
>
    {
        editProfile===false?
        'Edit profile':'Close edit form'
    }
</CustomBtn>:''
}

</ProfileContainer>
    )
}

export default Profile