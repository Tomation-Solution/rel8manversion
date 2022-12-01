import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createDueApi, deleteDueApi, getDueApi} from "./dueApi";
import { RootState } from "../store";

// import RootS

interface dueStateType    {
    "Name":string,
    "re_occuring": boolean,
    "is_for_excos": boolean,
    "amount":string,
    "startDate":string,
    "startTime": string,
    "endDate": null |string,
    "scheduletype": string,
    "schedule":string[],
    "chapter": null|number,
    "id"?: number
}
interface initialStateType{
    status: "idle" | "loading" | "succeeded" | "failed"|'deleted'|'created';
    isLoggedIn: boolean;
    error: any;
    data: null | dueStateType[]
}

const initialState ={
    status:"idle",
    isLoggedIn:false,
    error:null,
    data:[]
}  as initialStateType


const due = createSlice({
    name:'due',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

        builder.addCase(createDueApi.pending,(state,{payload})=>{
            state.status="loading";
        })

        builder.addCase(createDueApi.fulfilled,(state,{payload}:PayloadAction<dueStateType[]>)=>{
            state.status="created";
            if(state.data){

                state.data = [payload[0],...state.data,]
            }
            else{
                state.data =[payload[0]]
            }
            // console.log({"state of success":payload})
            //add the reuturn data to redux cylce
        })


        builder.addCase(createDueApi.rejected,(state,{payload})=>{
            state.status="failed";
            state.error=payload
            //add the reuturn data to redux cylce
        })

        builder.addCase(deleteDueApi.pending,(state,action)=>{
            state.status='loading'
        })

        builder.addCase(deleteDueApi.fulfilled,(state,{payload}:PayloadAction<number>)=>{
            state.status='deleted'
            state.data = state.data.filter(data=>data.id!==payload)
        })

        builder.addCase(getDueApi.pending,(state,action)=>{
            state.status='loading';

        })
        builder.addCase(getDueApi.fulfilled,(state,{payload}:PayloadAction<dueStateType[]>)=>{
            state.status='succeeded';
            state.data=payload
        })
        builder.addCase(getDueApi.rejected,(state,action)=>{
            state.status='failed';
        })
    }
})


export const selectDue =(state:RootState)=>state.due;
export default due.reducer;