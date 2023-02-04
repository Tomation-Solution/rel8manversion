import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axios";



export type MeetingType =        {
    "id": number,
            "name":string,
            "details":string,
            "date_for": null |string,
            "addresse":string,
            "event_date": string,
            "organiserName": string,
            "organiserDetails":string,
            "exco": null | number,
            "chapters": null | number
}

export type RegisteredMeetingMembers ={
    name:string;
    date_for:string;
    memebers:{id:number,members__user__email:string}[];
}


export const getMeetings = createAsyncThunk(
    'meetings/getMeetings', async (data:any,thunkApi)=>{
        let lookup ='?for_members=True'
        let exco:any = localStorage.getItem('exco')
        if(exco){
            lookup =`?exco=${exco}`
        }
        try{
            const resp = await axios.get('/tenant/meeting/meeting_member/'+lookup)
            return resp.data.data as MeetingType[]
        }
        catch(err:any){

            return thunkApi.rejectWithValue(err)
        }
        
    }
)


export const registerForMeeting = createAsyncThunk(
    'meetings/registerForMeeting',async(meeting:number,thunkApi)=>{
        //

        try{
            const resp = await axios.post('/tenant/meeting/meeting_member/',{meeting})
            return resp.data.data 
        }
        catch(err:any){

            return thunkApi.rejectWithValue(err)
        }
    }
)



export const getregisteredmembers_forMeeting = createAsyncThunk(
    'meetings/getregisteredmembers_forMeeting',async(meeting_id:number,thunkApi)=>{
        //

        try{
            const resp = await axios.post('/tenant/meeting/meeting_member/get_register_members/',{meeting_id})
            return resp.data.data as RegisteredMeetingMembers
        }
        catch(err:any){

            return thunkApi.rejectWithValue(err)
        }
    }
)

type PropSendMeetingAppology={
    "meeting":number,
    "note":string,
}
export const sendMeetingAppology= createAsyncThunk(
    'meetings/sendMeetingAppology',async (data:PropSendMeetingAppology,thunkApi)=>{
        console.log({data})
        try{
            const resp = await axios.post('/tenant/meeting/meeting_member/appologise_for_not_attending/',data)
            return resp.data.data 
        }
        catch(err:any){

            return thunkApi.rejectWithValue(err)
        }
    }
)