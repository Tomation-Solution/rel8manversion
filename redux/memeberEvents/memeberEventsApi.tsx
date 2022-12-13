import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axios";



type event_accesstype ={
    "has_paid": boolean,
    "link": string
}
export type MemberEventType = {
    "id": number,
    "image": null|string,
    "name": string,
    "is_paid_event": boolean,
    "re_occuring": boolean,
    "is_virtual": boolean,
    "is_for_excos": boolean,
    "commitee_id": null | number,
    "amount": string,
    "is_active":boolean,
    "startDate": string,
    "startTime": string,
    "scheduletype":string,
    "schedule": string[],
    "event_access": event_accesstype
}

type getMembersEventProp = {
    is_chapter?:boolean
}
export const getMembersEvent = createAsyncThunk(
    'MemberEvent/getMembersEvent',async ({is_chapter=false}:getMembersEventProp,thunkApi)=>{
        //
        // ?is_chapter='+is_chapter
        const chapter:any = localStorage.getItem('chapter')

        try{
            const resp = await axios.get(`/tenant/event/eventview/get_events/${chapter?'?is_chapter=True':''}`);
            console.log({resp},'justin')
            return resp.data.data as MemberEventType[]
        }
        catch(err:any){
            console.log({err})
            return thunkApi.rejectWithValue(err)
        }
    }
)


