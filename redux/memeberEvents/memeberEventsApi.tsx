import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axios";
import { generate_url_params } from "../../utils/extraFunction";



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
        const lookup = generate_url_params()
        
        try{
            const resp = await axios.get(`/tenant/event/eventview/get_events/${lookup}`);
            console.log({resp},'justin')
            return resp.data.data as MemberEventType[]
        }
        catch(err:any){
            console.log({err})
            return thunkApi.rejectWithValue(err)
        }
    }
)

export type getEventAttendiesResponse = {
    "id": number,
    "member_info": {
            "id": number,
            "name": string,
            "value": string,
            "member_id": number}[],
    "exco_info": any,
    "is_active": boolean,
    "email":string,
    "photo": string,
    "amount_owing": string,
    "is_exco": boolean,
    "is_financial": boolean,
    "user": number
}
export const getEventAttendies= createAsyncThunk(
    'MemberEvent/getEventAttendies',async ({event_id}:{'event_id':number},thunkApi)=>{
        //
        const form = new FormData()
        form.append('event_id',JSON.stringify(event_id))
        try{
            const resp = await axios.post(`/tenant/event/eventview/list_of_register_members/`,form)

            return resp.data.data  as getEventAttendiesResponse[]
        }
        catch(err:any){

            return thunkApi.rejectWithValue(err)
        }
    }
)


type registerForFreeEventProp = {
    id:number,
    notify:any ,
    setisLoading:(value:any)=>void;
}
export const registerForFreeEvent = async({setisLoading,notify,id}:registerForFreeEventProp)=>{
        const form = new FormData()
        form.append('event_id',JSON.stringify(id))
        const resp = await axios.post('/tenant/event/eventview/register_for_free_event/',form)
        console.log(resp)
        setisLoading(false)
        if(resp.status ==200){
            notify('Registered for Successfully','success')
            setTimeout(()=>{
                window.location.reload()
            },2000)
        }
        if(resp.status==400){
            notify('It a paid event you need to pay','success')

        }
    }

type registerForPaidEventTypeProp = {
    id:number,
    notify:any ,
    setisLoading:(value:any)=>void;
}
export const registerForPaidEvent = async  ({id,notify,setisLoading}:registerForPaidEventTypeProp)=>{
    const form = new FormData()
    setisLoading(true)
    form.append('event_id',JSON.stringify(id))
    const resp = await axios.post(`/tenant/dues/process_payment/event_payment/${id}/`,form)
    console.log(resp)
notify('Payment Gateway processing','success')
    window.location.href=resp.data.data.data.authorization_url
    setisLoading(false)
}


export const registerForPaidEventApi = async ({id})=>{

    const resp = await axios.post(`/tenant/dues/process_payment/event_payment/${id}/`,)
    window.location.href=resp.data.data.data.authorization_url
    return resp.data
}