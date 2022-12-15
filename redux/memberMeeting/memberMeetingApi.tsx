import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axios";



export type MeetingType =        {
    "id": 1,
    "name": "Council Zone Meeting",
    "details": "discussion of excos",
    "date_for": "2022-12-14T17:10:54+01:00",
    "exco": 1,
    "chapters": null
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
            const resp = await axios.post('/tenant/meeting/meeting_member/',{meeting_id})
            return resp.data.data as RegisteredMeetingMembers[]
        }
        catch(err:any){

            return thunkApi.rejectWithValue(err)
        }
    }
)