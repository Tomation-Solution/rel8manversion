import { createSlice, PayloadAction, } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getMeetings, getregisteredmembers_forMeeting, MeetingType, RegisteredMeetingMembers, registerForMeeting, sendMeetingAppology } from "./memberMeetingApi";




type State ={
    status:'pending'|'success'|'idle'|'error'|'registration_success'|'apology_sending'|'apology_failed'|'apology_success',
    meetings:MeetingType[],
    attendees:RegisteredMeetingMembers['memebers'],
    'message':string
}

const initialState:State={
    status:'idle',
    meetings:[],
    attendees:[],
    message:''
}

const MeetingSlice =createSlice({
    'name':'meetings',
    reducers:{
        setMemeberMeetToIdle:(state,action)=>{
            state.status='idle'
        }
    },
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
        addCase(registerForMeeting.rejected,(state,action:any)=>{

            state.status='error';
            if(action.payload.response.status==400){
                state.message='You have Already Registered'
            }
            // state.

        })

        addCase(getregisteredmembers_forMeeting.pending,(state,action)=>{
            state.status='pending'
        })

        addCase(getregisteredmembers_forMeeting.fulfilled,(state,action:PayloadAction<RegisteredMeetingMembers>)=>{
            state.status='success'
            state.attendees= action.payload.memebers
        })

        addCase(sendMeetingAppology.pending,(state,action)=>{
            state.status='apology_sending'
        })
        addCase(sendMeetingAppology.rejected,(state,action:any)=>{
            state.status='apology_failed'
            if(action.payload.response.status ==400){
                state.message='You have Already sent an appology'
            }else{
                state.message = 'Failed tp save your appology'
            }

        })
        
        addCase(sendMeetingAppology.fulfilled,(state,action)=>{
            state.status='apology_success'
            state.message ='Saved Successfull'
        })
        
    }
})


export const {setMemeberMeetToIdle} = MeetingSlice.actions
export default MeetingSlice.reducer

export const selectMeetings = (state:RootState)=>state.member_meeting