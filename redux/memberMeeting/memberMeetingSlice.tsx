import { createSlice, PayloadAction, } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getMeetings, getregisteredmembers_forMeeting, MeetingType, RegisteredMeetingMembers, registerForMeeting } from "./memberMeetingApi";




type State ={
    status:'pending'|'success'|'idle'|'error'|'registration_success',
    meetings:MeetingType[],
    attendees:RegisteredMeetingMembers['memebers']
}

const initialState:State={
    status:'idle',
    meetings:[],
    attendees:[],
}

const MeetingSlice =createSlice({
    'name':'meetings',
    reducers:{},
    initialState,
    extraReducers:({addCase})=>{
        //

        addCase(getMeetings.pending,(state,action)=>{
            state.status='pending'
        })
        addCase(getMeetings.fulfilled,(state,action:PayloadAction<MeetingType[]>)=>{
            state.status='success'
            state.meetings=action.payload
        })
        addCase(getMeetings.rejected,(state,action)=>{
            state.status='error'
            console.log({'error':action.payload})
        })

        addCase(registerForMeeting.pending,(state,action)=>{
            state.status= 'pending'
        })
        addCase(registerForMeeting.fulfilled,(state,action)=>{
            //
            state.status='registration_success'
        })
        addCase(registerForMeeting.rejected,(state,action)=>{

            state.status='error';
            // state.

        })

        addCase(getregisteredmembers_forMeeting.pending,(state,action)=>{
            state.status='pending'
        })

        addCase(getregisteredmembers_forMeeting.fulfilled,(state,action:PayloadAction<RegisteredMeetingMembers>)=>{
            state.status='success'
            state.attendees= action.payload.memebers
        })

    }
})


export default MeetingSlice.reducer

export const selectMeetings = (state:RootState)=>state.member_meeting