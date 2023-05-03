import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axios";
import { generate_url_params } from "../../utils/extraFunction";



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
            "chapters": null | number,
            event_docs?:string|null
            meeting_docs?:string|null
}

export type RegisteredMeetingMembers ={
    name:string;
    date_for:string;
    memebers:{id:number,members__user__email:string}[];
}


export const getMeetings = createAsyncThunk(
    'meetings/getMeetings', async (data:any,thunkApi)=>{
        let lookup =generate_url_params()
        try{
            const resp = await axios.get('/tenant/meeting/meeting_member/'+lookup)
            return resp.data.data as MeetingType[]
        }
        catch(err:any){

            return thunkApi.rejectWithValue(err)
        }
        
    }
)

type registerForMeetingProp ={
    meetingID:number;
    proxy_participants?:{
        full_name:string;
        email:string; 
    }[]
}
export const registerForMeeting = createAsyncThunk(
    'meetings/registerForMeeting',async({proxy_participants=[],meetingID}:registerForMeetingProp,thunkApi)=>{
        //
        const form = new FormData()
        form.append('proxy_participants',JSON.stringify(proxy_participants))
        form.append('meeting',meetingID.toString())

        try{
            const resp = await axios.post('/tenant/meeting/meeting_member/',form)
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



// please note am slowly migrating this code base to react query

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

export const getMemberMeetingAPi= async():Promise<MeetingType[]>=>{
    let lookup =generate_url_params()
    const resp = await axios.get('/tenant/meeting/meeting_member/'+lookup)
    return resp.data.data 
}

export const regsiterMeetingApi = async ({proxy_participants=[],meetingID}:registerForMeetingProp)=>{

    const form = new FormData()

    const data = {
        'meeting':meetingID,
        proxy_participants:proxy_participants
    }
    // form.append('proxy_participants',JSON.stringify(proxy_participants))
    // form.append('meeting',meetingID.toString())
    const resp = await axios.post('/tenant/meeting/meeting_member/',data)
    return resp.data.data 

}

export const sendMeetApplolgyApi = async (data:PropSendMeetingAppology)=>{
    const resp = await axios.post('/tenant/meeting/meeting_member/appologise_for_not_attending/',data)
    return resp.data.data 
}