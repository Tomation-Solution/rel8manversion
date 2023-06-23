import { NextPage } from "next";
import { DashboardLayout } from "../../../components/Dashboard/Member/Sidebar/dashboard-layout";

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import {Grid,} from "@mui/material";
import { TextField } from "@material-ui/core";
import CustomBtn from "../../../components/CustomBtn/Button";
import axios from "../../../helpers/axios";
import { useState } from "react";
import Spinner from "../../../components/Spinner";
import useToast from "../../../hooks/useToast";
import { useRouter } from "next/router";
import MarkoBtn from "../../../components/MarkoBtn";
import GreenButton from "../../../components/Buttonn";

type IForm = {
    attach_membership_receipt:any,
    note:string
}
const schema = yup.object().shape({
    attach_membership_receipt:yup.mixed().required(),
    note:yup.string().required()
})

const ReissuanceOfCertificate:NextPage = ()=>{
    const [isLoading,setIsLoading] = useState(false)
    const {notify} = useToast()
    const route = useRouter()
    
    return (
<div >
        {/* <br /><br /><br /><br /> */}
     
        <DashboardLayout title={'Reissuance Of Certificate'}>
            {
                isLoading?
                <Spinner />:''
            }
              <div   style={{'margin':'0 auto','maxWidth':'900px'}}>
                <h1>CALL FOR RENEWAL OF MEMBERSHIP CERTIFICATE </h1>
             <p>
             As you are aware, the life span of the 2nd batch of Membership Certificate of the Manufacturers Association of Nigeria (MAN) which was issued in January 2020 expires on the 31st of December 2022. In view of the above, the Association is inviting members to come forward for the renewal of their membership certificate. 
             </p>
             <p>
             Members are therefore advised to follow the guidelines below and do so early to avoid late re-issuance of Certificate
             </p>
             <p>
             Similarly, it is pertinent to inform members who have not applied for re-issuance or fully complied with the requirements since 2017 when the exercise of three yearly renewal commenced to kindly do so urgently. This is because MAN Certificate in their possession has become obsolete and would no longer be accepted by the Association and all relevant Government Agencies and Parastatals. 
             </p>
<br />
             <p>
            <strong>
            Please find below the requirements for the re-issuance: 
            </strong>
             </p>
<br />           
           <h2>Section A: Companies that changed the names on their original Certificates are required to do the </h2>
           <ul>
           <li>Complete the Membership Certificate Re-issuance form as attached. </li>
        <li> Return of MAN Membership Certificate which expired on the 31st December 2023. </li>
        <li>Payment of all outstanding subscription(s) as advised by the undersigned on the 2023 Demand . </li>
        <li>Submission of 2021 and 2022 Audited Financial Statements of the company (new applicants 
        shall include 2019 Audited Financial Report).</li> 
        <li>Copy of the certificate of incorporation. </li>
        
               <li> Submit Change of name Certificate as issued by Corporate Affairs Commission (CAC). </li>
           <li>. A Bank Payment Teller in the sum of Fifty Thousand Naira Only (N50,000) in favour of  </li>
           <li>Manufacturers Association of Nigeria for re-issuance of Membership Certificate. </li>
           </ul>
        <GreenButton text='Proceed' radius='10px'
                click={(e)=>{
                    // route.push('/members/services/reissuance/section-b/')
                    route.push('/members/services/reissuance?nextpage='+'section-a')
                }}
                style={{'width':'30%'}}
               textColor='white' paddingY={1} paddingX={1}  bg='#2e3715'/>
              <br /><br />
              <h2>Section B:Companies that lost their MAN Membership Certificates are required to do the following in </h2>
           <ul>
               <li> An affidavit from a Court of competence jurisdiction supporting the loss of the Certificate.  </li>
           <li>Bank Payment Teller in the sum of Fifty Thousand Naira (N50,000) in favour of Manufacturers Association of Nigeria for re-issuance of Membership Certificate </li>
           </ul>
        <GreenButton text='Proceed' radius='10px'
                click={(e)=>{
                    // route.push('/members/services/reissuance/section-c/')
                    route.push('/members/services/reissuance?nextpage='+'section-b')
        // nextpage

                }}
                style={{'width':'30%'}}
               textColor='white' paddingY={1} paddingX={1}  bg='#2e3715'/>
              
              </div>



        </DashboardLayout>
</div>
    )
}

export default ReissuanceOfCertificate