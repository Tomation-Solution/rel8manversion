import { ProfileContainer } from "./Profile.style"
import MemberPlaceholder from '../../images/memberPlaceholder.png'





const Profile = ():React.ReactElement=>{

    return (
<ProfileContainer>
    <img className='profile_pics' src={MemberPlaceholder.src} alt=""  />

<br />
    <h2>Markothedev</h2>
<br />
    <br />
    <div >
        <p><strong>Email</strong></p>
        <p><small>markothedevmail@gmail.com</small></p>
    </div>

</ProfileContainer>
    )
}

export default Profile