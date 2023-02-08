import { NextPage } from "next";
import { useState,useEffect } from "react";
import { DashboardLayout } from "../../components/Dashboard/Member/Sidebar/dashboard-layout";
import Profile from "../../components/Profile/Profile";
import axios from "../../helpers/axios";
import { MemberType } from "../../redux/members/membersApi";






const MyProfile:NextPage = ()=>{
    const [member,setMemeber] = useState<null|MemberType>()
    const get_member  = async()=>{
        const resp = await axios.get('/tenant/user/memberlist-info/my_profile/');
        setMemeber(resp.data.data[0])
      }
      
    useEffect(()=>{
        get_member()
    },[])
    return (
        <DashboardLayout>
{
                  member?
                  <Profile member={member} can_edit_img={true}/>:''
                }
        </DashboardLayout>
    )
}

export default MyProfile