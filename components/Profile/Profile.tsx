import { ProfileContainer } from "./Profile.style"
import MemberPlaceholder from '../../images/memberPlaceholder.png'
import { MemberType } from "../../redux/members/membersApi"
import { FetchName } from "../../utils/extraFunction"
import CustomBtn from "../CustomBtn/Button"
import axios from "../../helpers/axios"
import useToast from "../../hooks/useToast"
import {useState} from 'react'
import Spinner from "../Spinner"


type Prop ={
    member:MemberType,
    can_edit_img?:boolean;
}

const Profile = ({member,can_edit_img=false}:Prop):React.ReactElement=>{
    const Name:string = FetchName(member)
    const [photo,setPhoto] = useState(member.photo?member.photo:'')
    const {notify} = useToast()
    const [isLoading,setIsLoading] = useState(false)
    const updateProfile = async (file:any)=>{
        const form = new FormData()
        form.append('photo',file)
        setIsLoading(true)
        const resp = await axios.post('/tenant/user/memberlist-info/update_profile_img/',form)
        if(resp.data.status_code==200){
            notify('Photo updated Successfully')
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
        <CustomBtn style={{'padding':'.9rem','margin':'5px auto','width':'40%','position':'relative'}}>
            <label htmlFor="profile_photo" style={{'position':'absolute','top':'0','left':'0','width':'100%','height':'100%'}}>
    </label>
        UploadImg
    </CustomBtn>
    :''
    }
<input type="file" name="profile_photo" id="profile_photo" style={{'display':'none'}} 
onChange={(e)=>{
    const file = e.target.files[0]
    updateProfile(file)
}}
/>
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

</ProfileContainer>
    )
}

export default Profile