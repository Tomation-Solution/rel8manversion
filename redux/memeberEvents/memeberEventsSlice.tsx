import { createSlice ,PayloadAction} from "@reduxjs/toolkit";
import { registerForEventApi } from "../events/eventsApi";
import { RootState } from "../store";
import { getEventAttendies, getEventAttendiesResponse, getMembersEvent, MemberEventType } from "./memeberEventsApi";



type State ={
    status:'pending'|'success'|'error'|'created'
    events:MemberEventType[],
    attendies:getEventAttendiesResponse[]
    errorMessage:any
}
const initialState = {
    status:'pending',
    events:[],
    errorMessage:null ,
    attendies:[]
} as State

const memeberEventsSlice= createSlice({
    name:'MemberEvent',
    initialState,
    reducers:{},
    extraReducers:({addCase})=>{
        //


        addCase(registerForEventApi.pending,(state,{payload})=>{
            state.status = 'pending'
        })
        addCase(registerForEventApi.fulfilled,(state,{payload})=>{
            state.status = 'created'

        })

        addCase(registerForEventApi.rejected,(state,{payload}:any)=>{
            state.status = 'error'
            if(payload.response.status==400){
                state.errorMessage='You have Already Registered'
            }
        })

        addCase(getMembersEvent.pending,(state,action)=>{
            state.status='pending'
        })

        addCase(getMembersEvent.fulfilled,(state,{payload}:PayloadAction<MemberEventType[]>)=>{
            state.status='success'
            state.events = payload
        })

        addCase(getMembersEvent.rejected,(state,action)=>{
            state.status='error'

            state.errorMessage='Something went wrong'
            console.log({'error meesage from event':action.payload})
        })


        addCase(getEventAttendies.pending,(state,action)=>{
            //
            state.status='pending'
        })

        addCase(getEventAttendies.fulfilled,(state,action:PayloadAction<getEventAttendiesResponse[]>)=>{
            //
            state.status='success'
            state.attendies=action.payload
        })

        addCase(getEventAttendies.rejected,(state,action)=>{
            state.status='error'
            state.errorMessage='Please Check Your Internet'
        })
    }




})



export const selectMemberEvent = (state:RootState)=>state.memeberEventsSlice

export default memeberEventsSlice.reducer