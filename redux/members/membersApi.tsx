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

