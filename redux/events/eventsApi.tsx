import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "../../helpers/axios";

export interface EventType{
    id?:number;
    "is_paid_event":boolean;
    "re_occuring":boolean;
    "is_virtual":boolean;
    "is_for_excos":boolean;
    "is_commitee":boolean;
    "is_active":boolean;
    "commitee_name":string;
    "name":string;
    "amount":number;
    "startDate":string;
    "startTime":string;
    "scheduletype":"day_of_week"|"month_of_year";
    "schedule":string[];
    "mintues":string;
    "hour":string;
    "for_chapters":boolean;
    'address':string;
}


export const creatEventsApi = createAsyncThunk(
    "events/creatEventsApi",
    async (data:EventType,thunkApi)=>{

       try {
        const resp = await axios.post('/tenant/event/eventview/',data)
        console.log({resp})
        return resp.data.data as EventType
       } catch (err:any) {
           console.log({err})
        return thunkApi.rejectWithValue(err.response.data)
       }



})

export const setEventStateToIdle = createAsyncThunk(
    "events/setEventStateToIdle",
     (data,thunkApi)=>{
        return true
})




export const getEventsApi2 = createAsyncThunk(
    "events/getEventsApi",
    async (data,thunkApi)=>{
// console.log({isChapter})
       try {
        const resp = await axios.get(`/tenant/event/eventview/`)
       let  data  = resp.data.data
        console.log({data})
        return resp.data.data
       
    } catch (err:any) {
           console.log({"some err from api":err})
        return thunkApi.rejectWithValue(err.response.data)
       }



})

export const deleteEventApi = createAsyncThunk(
    'events/deleteEventApi', async (event_id:number,thunkApi)=>{


        try {
            const resp =await axios.delete(`/tenant/event/eventview/${event_id}`)
            console.log({'delete resp':resp})
            return event_id
        } catch (error) {
            return error.response.data
        }
    }
)


type registerForEventProp={
    event_id:number;
    proxy_participants?:{
        full_name:string;
        email:string; 
    }[]
}
export const registerForEventApi = createAsyncThunk(
    'event/registerForEventApi',async(data:registerForEventProp,thunkApi)=>{

        const form = new FormData()
        if(data.proxy_participants){
            form.append('proxy_participants',JSON.stringify(data.proxy_participants))
        }
        form.append('event_id',data.event_id.toString())

        try{
            const resp = await axios.post('/tenant/event/eventview/register_for_free_event/',form)
            return resp.data.data
        }
        catch(err:any){
            return thunkApi.rejectWithValue(err)
        }
    }
)