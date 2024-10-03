import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../helpers/axios"



export const signinApi =createAsyncThunk(
    "signin/signinApi",async (data:{matric_number:string,password:string,company_name:string},thunkApi)=>{

    
        try{
            // console.log("Data before request:", data);
            const resp = await axios.post(`tenant/auth/login/`,{...data,'email':'m1@gmail.com'})

            console.log({resp,data:resp.data})

            return resp.data
        }
        catch(err:any){
            // 
            console.log({err})
            return  thunkApi.rejectWithValue(err.response.data)
        }

    }
)




export const requestForgotPasswordApi = async (data:{email:string})=>{
    const resp = await axios.post('/tenant/user/forgot-password/request_password_change/',data)
    return resp.data
}

export const restPasswordApi= async(data:{new_password:string,token:string,uidb64:string})=>{
    const resp = await axios.post('/tenant/user/forgot-password/rest_password/',data)
    return resp.data
}