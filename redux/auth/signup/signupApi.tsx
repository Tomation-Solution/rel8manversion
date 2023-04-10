import { createAsyncThunk } from "@reduxjs/toolkit";
import { PropectiveCreate } from "../../../pages/prospective/create";
import axios from "../../../helpers/axios";
import { getPropspectiveMemberOrNull } from "../../../utils/extraFunction";


type GoodResponse ={
    "message": string,
    "status_code": number,
    "data": any[],
    "success": boolean
}
export const signUpApi = async (data:PropectiveCreate):Promise<GoodResponse>=>{
    const resp = await  axios.post('/tenant/prospectivemember/create_propective_member/',data)
    return resp.data
}

type RegisterationAPiResponse = {
    "status": boolean,
        "message": string,
        "data": {
            "authorization_url": string,
            "access_code": string,
            "reference": string
        }
}
export const PaymentRegisterationAPi = async ():Promise<RegisterationAPiResponse>=>{
   'payment for  perpective from'
    const user= getPropspectiveMemberOrNull()
    if(!user) return

    const resp =await axios.post(`tenant/dues/process_payment/prospective_member_registration/${user.prospective_member_id}/`)
    return resp.data.data 
}






