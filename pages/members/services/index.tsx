// import { NextPage } from "next";
import styled from "styled-components";
// import { DashboardLayout } from "../../../components/Dashboard/Member/Sidebar/dashboard-layout";
// import ICon from '../../../images/Vector.png'
import {CgScreenWide} from 'react-icons/cg'
import { useRouter } from "next/router";

export const ListOfServiceContainer =styled.div`
    max-width: 500px;
    margin: 0 auto;
    p{
        padding: 0 .5rem;
    }
    svg{
        color: #bfc2b8;
        /* padding-right: .8rem; */
    }
    div{
        display: flex;
        align-items: center;
        padding: .5rem 0;
        border-bottom: 1px solid rgba(43, 53, 19, 0.3);
        width: 100%;
        cursor: pointer;
        margin: 10px 0;
    }
`
// const ListOfService:NextPage=()=>{
    // {
    //     'name':'ff',
    //     'files':files
    // }
//     const services = [
//         // 'membership_admission',
//         // 'Loss_of_certificate',
//         'Reissuance_of_certificate',// endpoint working
//         'Change_of_Name', // endpoint working
//         'Merger_of_member_companies',// endpoint working
//         'Deactivation_or_Suspension_of_membership',// endpoint working
//         'Update_on_product_manufactured',// endpoint working
//         'Update_on_factory_location',// endpoint working
//     ]
//     const route = useRouter();
//     const handleRequestRoute = (page_name:string)=>{
//         route.push(`/members/services/${page_name}/`)
//     }
//     return (
//         <DashboardLayout>
//             <ListOfServiceContainer>
//                 {
            //         services.map((service,index)=>(
            // <div  key={index} onClick={e=>handleRequestRoute(service.toLowerCase())}>
            //     <CgScreenWide/>
            //     <p> {service.replaceAll('_',' ')}</p>
            // </div>

import { DashboardLayout } from "../../../components/Dashboard/Member/Sidebar/dashboard-layout"
import { useQuery } from "react-query";
import { getCustomServices } from "../../../redux/customServiceRequestApi";
import Spinner from "../../../components/Spinner";

//                     ))
//                 }
           
//             </ListOfServiceContainer>
//         </DashboardLayout>
//     )
// }

// export default ListOfService





const ServiceRequest = ()=>{
    const {isLoading,data:services} = useQuery('getCustomServices',getCustomServices)
    const route = useRouter()
    return (
        <DashboardLayout>
            {/* <div style={{
                // 'border':'1px solid red',
            'display':'flex','alignItems':'center','justifyContent':'center','height':'100vh'}}>
                <h1>Coming Very Soon</h1>

            </div> */}
            {isLoading&&<Spinner />}
            <ListOfServiceContainer>
                {
        services?.map((service,index)=>(
            <div  key={index}  onClick={e=>{
                route.push(`/members/services/${service.id}/`)
            }}>
                <CgScreenWide/>
                <p> {service.service_name}</p>
            </div>))
                }
            </ListOfServiceContainer>

        </DashboardLayout>
    )
  }
  
  export default ServiceRequest