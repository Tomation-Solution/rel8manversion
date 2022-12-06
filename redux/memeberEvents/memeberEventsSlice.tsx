import { createSlice ,PayloadAction} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getMembersEvent, MemberEventType } from "./memeberEventsApi";



type State ={
    status:'pending'|'success'|'error'
    events:MemberEventType[],
    errorMessage:any
}
const initialState = {
    status:'pending',
    events:[],
    errorMessage:null 
} as State

const memeberEventsSlice= createSlice({
    name:'MemberEvent',
    initialState,
    reducers:{},
    extraReducers:({addCase})=>{
        //

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
    }




})



export const selectMemberEvent = (state:RootState)=>state.memeberEventsSlice

export default memeberEventsSlice.reducer