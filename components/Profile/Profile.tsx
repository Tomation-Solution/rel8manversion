import { ProfileContainer } from "./Profile.style"
import MemberPlaceholder from '../../images/memberPlaceholder.png'
import { MemberType } from "../../redux/members/membersApi"
import { FetchName } from "../../utils/extraFunction"



type Prop ={
    member:MemberType
}

const Profile = ({member}:Prop):React.ReactElement=>{
    const Name:string = FetchName(member)

    return (
<ProfileContainer>
    <img className='profile_pics' src={MemberPlaceholder.src} alt=""  />

<br />
    <h2>{Name}</h2>
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
{
    member.exco_info.length!==0?
    <>
        <h2>Personal Info</h2>
        <div>
            {
                member.member_info.map((data,index)=>(
                    <div key={index}>
                        <p><strong>{data.name}</strong></p>
                        <p><small>{data.value}</small></p>
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