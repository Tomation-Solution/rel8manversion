import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { getDashboardApi } from "./dashboardApi";

// interface memeber_infoType{
//     value:string;
//     name:string;
// }
// interface exco_infoType{
//     "name":string;
//     "about":string;
//     "can_upload_min": boolean;
// }
// interface memeberInfo{
//     "user__email":string;
//     "user__chapter__name": string;
//     "is_financial": boolean;
//     "id": number;
//     memeber_info:memeber_infoType[]
//     exco_info:exco_infoType[]
// }
interface dashbordDataType{

            "event_count": number;
            "exco_member": number;
            "total_income": number;
            "amount_owing": number;
}
interface DashboardDataSliceType{
    status: "idle" | "loading" | "succeeded" | "failed";
    isLoggedIn: boolean;
    error: any;
    data: any
}

const initialState={
    status:"idle",
    error:null,
    data:null,
}as DashboardDataSliceType



const adminDashboard = createSlice({
    name:"dashboard",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

    builder.addCase(getDashboardApi.pending,(state,{payload})=>{
        state.status="loading"
    })


    builder.addCase(getDashboardApi.fulfilled,(state,{payload}:{payload:any})=>{
        state.status="succeeded";
       
        state.data =  payload[0];

    })
    builder.addCase(getDashboardApi.rejected,(state,{payload})=>{
        state.status="failed";
        state.error = payload
    })

    
        
    }
})


export const selectDashboard= (state:RootState)=>state.adminDashboard;
export default adminDashboard.reducer