import { createSlice ,PayloadAction} from "@reduxjs/toolkit";
import { stat } from "fs";
import { RootState } from "../store";
import { getMemberPublication, MemberPublicationType } from "./memberPublicationAPi";


type State ={
    status:'pending'|'success'|'error'|'idle',
    publication:MemberPublicationType[],
    errorMessage:any
}

const initialState:State={
    status:'idle',
    publication:[],
    errorMessage:null
}


const memberPublication = createSlice({
    name:'memberPublication',
    initialState,
    reducers:{},
    extraReducers:({addCase})=>{
        //

        addCase(getMemberPublication.pending,(state,action)=>{
            state.status='pending'
        })

        addCase(getMemberPublication.fulfilled,(state,{payload}:PayloadAction<MemberPublicationType[]>)=>{
            state.status='success'
            state.publication=payload
        })

        addCase(getMemberPublication.rejected,(state,action)=>{
            state.status='error'
            state.errorMessage='Please Check Your Network'
        })
    }
})

export const selectmemberPublication = (state:RootState)=>state.memberPublication
export default memberPublication.reducer