import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { commiteeDetailApi, CommitteeType, get_commitee } from "./CommitteeApi";


type State= {
    status:'pending'|'success'|'error'|'idle',
    commitee:CommitteeType[],
    message?:string,
    commiteeDetail?:CommitteeType,


}
const initialState:State={
    status:'idle',
    commitee:[],
}

const committeeSlice = createSlice({
    name:'commitee',
    initialState,
    reducers:{},
    extraReducers:({addCase})=>{
        addCase(get_commitee.pending,(state,action)=>{
            state.status='pending'
        })

        addCase(get_commitee.fulfilled,(state,action)=>{
            state.status='success'
            state.commitee=action.payload
        })
        addCase(get_commitee.rejected,(state,action)=>{
            state.status='error'
            state.message='Check your network please'
        })


        addCase(commiteeDetailApi.pending,(state,action)=>{
            state.status='pending'
        })

        addCase(commiteeDetailApi.fulfilled,(state,action)=>{
            state.status='success'
            state.commiteeDetail=action.payload
        })
        addCase(commiteeDetailApi.rejected,(state,action)=>{
            state.status='error'
            state.message='Check your network please'
        })
    }
})

export default committeeSlice.reducer

export const selectCommitee = (state:RootState)=>state.commitee