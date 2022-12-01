import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axios"
export interface CreateDUeType{
    name:string;
    re_occuring:boolean;
    is_for_excos:boolean;
    amount:string;
    startDate:string;
    startTime:string|Date;
    scheduletype: "day_of_week"|"month_of_year";
    schedule:string[];
    for_chapters:boolean;
}


export const createDueApi = createAsyncThunk(
    "due/createDueApi",
    async (data:CreateDUeType,thunkApi)=>{

        try {
            const resp =await axios.post(`/tenant/dues/AdminManageDue/`,data) 
            data = resp.data.data
            console.log(resp)
            return resp.data.data
        } catch (err:any) {
            console.log({"err from request":err})
            return thunkApi.rejectWithValue(err.response.data)
        }
    })


    export const deleteDueApi = createAsyncThunk(
        "due/deleteDueApi",
        async(id:number)=>{
    
    
            try{
                const resp = await axios.delete(`/tenant/dues/AdminManageDue/${id}/`)
                console.log({resp})
                return id as number
             }
             catch(err:any){
                return err.response.data
             }
        }
    )


    export const getDueApi = createAsyncThunk(
        "due/getDueApi",
        async()=>{
    
            try{
                const resp = await axios.get(`/tenant/dues/AdminManageDue/`)
                console.log({resp})
                return resp.data.data
             }
             catch(err:any){
                return err.response.data
             }
        }
    )
