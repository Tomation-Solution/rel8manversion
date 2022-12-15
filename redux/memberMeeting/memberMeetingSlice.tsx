import { createSlice, PayloadAction, } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getMeetings, MeetingType, RegisteredMeetingMembers } from "./memberMeetingApi";




type State ={
    status:'pending'|'success'|'idle'|'error',
    meetings:MeetingType[],
    attendees:RegisteredMeetingMembers[]
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

    }
})


export default MeetingSlice.reducer

export const selectMeetings = (state:RootState)=>state.member_meeting