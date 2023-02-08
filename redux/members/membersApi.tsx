import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axios";


export type ExcoInfoType={
    id:number;
    member_id:number;
    name:string;
    about:string;
    can_upload_min:string;
    chapter_id:string;
}
export type MemberInfoType =  {
    id:number;
    name:string;
    value:string;
    member_id:number;
}
export type memberEducationType ={
    "member":number,
    "name_of_institution": string,
    "major": string,
    "degree": string,
    "language": string,
    "reading": string,
    "speaking":string,
    "date":string,
    "id"?: number,
    
}
export type memberEmploymentHistory = {
    "member": number,
    "postion_title": string,
    "employment_from": string,
    "employment_to": string,
    "employer_name_and_addresse":string,
    "id"?: number
}
export type MemberType =       {
    "id": number,
    "member_info": MemberInfoType[],
    "exco_info": ExcoInfoType[],
    "is_active": boolean,
    "email": string,
    "amount_owing": string,
    "is_exco": boolean,
    "is_financial": boolean,
    "user": number;
    'photo'?:string;
    'member_education':memberEducationType[],
    'member_employment_history':memberEmploymentHistory[]
}




type getMembersParaType = {
    get_excos:boolean
}
export const getMembersAndExco = createAsyncThunk(
    'member_and_exco/getMembersAndExco',async ({get_excos}:getMembersParaType)=>{
        let url:string;
        if(get_excos){
            url = `/tenant/user/memberlist-info/get_all_exco/`
        }else{
            url = `/tenant/user/memberlist-info/get_all_members/`
        }

        try {
            const resp = await axios.get(url);
            return resp.data.data as MemberType[]
        } catch (error) {
            
            return error.response.data as any
        }
    }
)

