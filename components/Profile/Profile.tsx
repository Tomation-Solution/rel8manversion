import { ProfileContainer } from "./Profile.style"
import MemberPlaceholder from '../../images/memberPlaceholder.png'
import { memberEducationType, memberEmploymentHistory, MemberType } from "../../redux/members/membersApi"
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
    member_education:memberEducationType[],
    member_employment_history:memberEmploymentHistory[]
}
const schema = yup.object({
    // 'memberData':yup.array().of(yup.object({
    //     'id':yup.number(),
    //     'name':yup.string(),
    //     'value':yup.string(),
    // })),
    'member_education':yup.array().of(yup.object({
        "member":yup.number(),
        "name_of_institution": yup.string(),
        "major": yup.string(),
        "degree": yup.string(),
        "language": yup.string(),
        "reading": yup.string(),
        "speaking":yup.string(),
        "date":yup.string(),
        'id':yup.number()
    })),
    'member_employment_history':yup.array().of(yup.object({
        "member":yup.number(),
        'postion_title':yup.string(),
        'employment_from':yup.string(),
        'employment_to':yup.string(),
        'employer_name_and_addresse':yup.string(),
        'id':yup.number(),
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

    // const {fields,} = useFieldArray({
    //     name:'memberData',control
    // })
    const {fields:education_fields,append,remove} =useFieldArray({
        'name':'member_education',control
    })
    const {fields:employment_fields,append:employment_append,remove:employment_remove} =useFieldArray({
        'name':'member_employment_history',control
    })
    // 
    useEffect(()=>{
        // setValue('memberData',member.member_info)
        setValue('member_education',member.member_education)
        setValue('member_employment_history',member.member_employment_history)
    },[])



    const onSubmit =async (submmited:ProfileTypeForm ) =>{
        setIsLoading(true)
        const resp =await axios.put(`/tenant/user/member-bio/${member.id}/`,{
            'membereducation':submmited.member_education,
            'memberemploymenthistory':submmited.member_employment_history
        })
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
<br />
    <br />
       <h2>Education Bio</h2>

    {
        education_fields.map((data,index)=>(
            <div key={index}>
                <br />
                <label htmlFor="">Name of Institution</label>
                <TextField 
              placeholder={'Name of Institution'} 
              // label='Username'  
              style={{width:'100%'}} size='small'
              InputProps={{
              
                  startAdornment:(
                      <Person color='disabled'  fontSize={'medium'}/>
                  )
              }}
              {...register(`member_education.${index}.name_of_institution`)}
              />
              <br />

            <br />
            <label htmlFor="">Major</label>
              <TextField 
              placeholder={'Major'} 
              // label='Username'  
              style={{width:'100%'}} size='small'
              InputProps={{
              
                  startAdornment:(
                      <Person color='disabled'  fontSize={'medium'}/>
                  )
              }}
              {...register(`member_education.${index}.major`)}
              />
              <br />
            <label htmlFor="">Degree</label>
              <TextField 
              placeholder={'Degree'} 
              // label='Username'  
              style={{width:'100%'}} size='small'
              InputProps={{
              
                  startAdornment:(
                      <Person color='disabled'  fontSize={'medium'}/>
                  )
              }}
              {...register(`member_education.${index}.degree`)}
              />
            <br />
            <label htmlFor="">Language</label>
              <TextField 
              placeholder={'Language'} 
              // label='Username'  
              style={{width:'100%'}} size='small'
              InputProps={{
              
                  startAdornment:(
                      <Person color='disabled'  fontSize={'medium'}/>
                  )
              }}
              {...register(`member_education.${index}.language`)}
              />
               <br />
            <label htmlFor="">Reading</label>
              <TextField 
              placeholder={'Reading'} 
              // label='Username'  
              style={{width:'100%'}} size='small'
              InputProps={{
              
                  startAdornment:(
                      <Person color='disabled'  fontSize={'medium'}/>
                  )
              }}
              {...register(`member_education.${index}.reading`)}
              />
               <br />
            <label htmlFor="">Speaking</label>
              <TextField 
              placeholder={'Speaking'} 
              // label='Username'  
              style={{width:'100%'}} size='small'
              InputProps={{
              
                  startAdornment:(
                      <Person color='disabled'  fontSize={'medium'}/>
                  )
              }}
              {...register(`member_education.${index}.speaking`)}
              />
               <br />
            <label htmlFor="">Date</label>
              <TextField 
              placeholder={'date'} 
              // label='Username'  
              style={{width:'100%'}} size='small'
              type='date'
              InputProps={{
              
                  startAdornment:(
                      <Person color='disabled'  fontSize={'medium'}/>
                  )
              }}
              {...register(`member_education.${index}.date`)}
              />
              <CustomBtn style={{'backgroundColor':'crimson','padding':'.5rem','width':'30%'}}
               onClick={(e:any)=>remove(index)}
              >
                Remove
              </CustomBtn>
              <br />
    <br />
            </div>
        ))
    }
   
    <CustomBtn styleType="sec"
    style={{'width':'40%'}}
    onClick={(e) =>{
        e.preventDefault()
        append({
            'member':1,
            'name_of_institution':'',
            'major':'',
            'degree':'',
            'language':'',
            'reading':'',
            'speaking':'English',
            'date':'',
        })
      }}
    >
        Add More Education
    </CustomBtn>
    <br />
    <br />
      <h2>Employment Bio</h2>
    {   
        employment_fields.map((data,index)=>(
            <div key={index}>
            <br />
            <label htmlFor="">Postion Title</label>
                <TextField 
              placeholder={'Postion Title'} 
              // label='Username'  
              style={{width:'100%'}} size='small'
              InputProps={{
              
                  startAdornment:(
                      <Person color='disabled'  fontSize={'medium'}/>
                  )
              }}
              {...register(`member_employment_history.${index}.postion_title`)}
              />
    <br />
            <label htmlFor="">Employment From</label>
              <TextField 
              placeholder={'Employment From'} 
              label='Employment from'  
              style={{width:'100%'}} size='small'
              type={'date'}
              InputProps={{
                  startAdornment:(
                      <Person color='disabled'  fontSize={'medium'}/>
                  )
              }}
              {...register(`member_employment_history.${index}.employment_from`)}
              />
              <br />
              <br />
            <label htmlFor="">Employment To</label>
              <TextField 
              placeholder={'Employment To'} 
            //   label='Employment to'  
              style={{width:'100%',}} size='small'
              type={'date'}
              InputProps={{
                  startAdornment:(
                      <Person color='disabled'  fontSize={'medium'}/>
                  )
              }}
              {...register(`member_employment_history.${index}.employment_to`)}
              />
              <br />
            <label htmlFor="">Employer name and addresse</label>
              <TextField 
              placeholder={'Employer name and addresse'} 
              // label='Username'  
              style={{width:'100%'}} size='small'
              InputProps={{
                  startAdornment:(
                      <Person color='disabled'  fontSize={'medium'}/>
                  )
              }}
              {...register(`member_employment_history.${index}.employer_name_and_addresse`)}
              />
              <CustomBtn style={{'backgroundColor':'crimson','padding':'.5rem','width':'30%'}}
               onClick={(e:any)=>employment_remove(index)}
              >
                Remove
              </CustomBtn>
              <br />
            </div>
        ))
    }
      <CustomBtn styleType="sec"
    style={{'width':'40%'}}
    onClick={(e) =>{
        e.preventDefault()
        employment_append({
            "member": -1,
            "postion_title": '',
            "employment_from": '',
            "employment_to": '',
            "employer_name_and_addresse":'',
        })
      }}
    >
        Add More Employment
    </CustomBtn>
    {/* {
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
    } */}
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