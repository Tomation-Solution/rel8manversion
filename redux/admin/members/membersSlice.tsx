import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import {getMembersApi } from "./membersApi";

interface   excoInfoType{
    "name":string;
    "about": string;
    "can_upload_min": boolean;
}

interface memeberInfoType{
    "value":string;
    "name": string;
}
interface memberDataType     {
    "user__email": string;
    "user__chapter__name": string;
    "is_financial":boolean;
    "id": number;
    "memeber_info": null | memeberInfoType[]
    "exco_info": null | excoInfoType[]
}
interface membersData{
    "members":memberDataType[];
}   


interface DashboardDataSliceType{
    status: "idle" | "loading" | "succeeded" | "failed";
    error: any;
    data: null | membersData[]
} 


const initialState = {
    status: "idle",
    error: null,
    data: null,
} as DashboardDataSliceType




const members  = createSlice({
    name:"members",
    initialState,
    reducers:{},
    extraReducers:(builders)=>{


        builders.addCase(getMembersApi.pending,(state,{payload})=>{
            state.status="loading";
        })



        builders.addCase(getMembersApi.fulfilled,(state,{payload})=>{
            state.status="succeeded";
            console.log({"from payload":payload})
            state.data = payload;
        })
        builders.addCase(getMembersApi.rejected,(state,{payload})=>{
            state.status="failed";
        })


    }
})


export const selectMembers = (state:RootState)=>state.members
export default members.reducer