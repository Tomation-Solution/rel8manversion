import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../helpers/axios"



export const signinApi =createAsyncThunk(
    "signin/signinApi",async (data:{matric_number:string,password:string,company_name:string},thunkApi)=>{

    
        try{
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


