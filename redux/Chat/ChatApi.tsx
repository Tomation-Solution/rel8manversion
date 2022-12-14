import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axios";

type member_infoType = {id:number,name:string,value:string,member_id:number}

export type MembersType = {
    id:number;
    member_info:member_infoType[],
    exco_info:any,
    is_active:boolean;
    email:string
    photo:string;
    amount_owing:number,
    is_exco:boolean,
    is_financial:boolean,
    user:number,
}


export const get_list_members = createAsyncThunk(
    'chat/get_list_members',async(data,thunkApi)=>{

        try{
            const resp = await axios.get('/tenant/user/memberlist-info/get_all_members/')

            return resp.data.data as MembersType[]
        }
        catch(err:any){
            return thunkApi.rejectWithValue(err)
        }
    })

type get_old_chatsProp = {
    reciver_id:number,
    sender_id:number
}

type chatResponseType = {
    send_user_id:number;
    message:string;
}
export const get_old_chats = createAsyncThunk(
    'chat/get_old_chats',async (data:string,thunkApi)=>{

        try{
            const resp = await axios.get(`/tenant/chat/${data}`)
            console.log({'chat resp':resp})
            return resp.data.data as chatResponseType[]
        }
        catch(err:any){
            console.log({'chat err':err})

            return thunkApi.rejectWithValue({'err':'somth'})
        }


    }
)