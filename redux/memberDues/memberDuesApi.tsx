
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axios";



export type DueBreakDownType =  {
    "outstanding": number,
    "total_paid": number
}
export type memberDuesType = {
    "id": number,
    "user__email":string,
    "due__Name": string,
    "is_overdue": boolean,
    "amount": number,
    "is_paid": boolean
}
export type DuePaymentResponse ={
    "status": boolean,
    "message": string,
    "data": {
        "authorization_url": string,
        "access_code": string,
        "reference": string
    }
}

export const getMemberduesApi = createAsyncThunk(
    'member_dues/getMemberduesApi', async (data,thunkAPi)=>{
        try {
            const resp = await axios.get(`/tenant/dues/memberdue/`);
            return resp.data.data as memberDuesType[]
        } catch (err:any) {

            return thunkAPi.rejectWithValue(err)
        }
})


export const payDuesApi = createAsyncThunk(
    'member_dues/payDuesApi', async (due_id:number,thunkApi)=>{

        try {
            const resp = await axios.post(`/tenant/dues/process_payment/due/${due_id}/`)
            console.log('resp err')
        window.location.href=resp.data.data.data.authorization_url

            return resp.data.data
        } catch (err:any) {
            console.log({err})
            return thunkApi.rejectWithValue(err)
        }
})

export const getMemberDueBreakDown = createAsyncThunk(
    'member_dues/getMemberDueBreakDown', async (data,thunkAPi)=>{
        
        try {
            const resp = await axios.get('/tenant/dues/memberdue/get_due_detail/');
            return resp.data.data as DueBreakDownType[]
        } catch (err:any) {
                return thunkAPi.rejectWithValue(err)
        }
    })


    //this one does not use asynkthunk
export const  payDuesApi2 =async(due_id:number):Promise<DuePaymentResponse>=>{
    const resp = await axios.post(`/tenant/dues/process_payment/due/${due_id}/`)
    return resp.data.data as DuePaymentResponse
}