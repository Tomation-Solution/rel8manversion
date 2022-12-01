import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../../helpers/axios"




export const getDashboardApi = createAsyncThunk(
    'dashboard/getDashboardApi',
    async (data,thunkApi)=>{

        try{
            const resp = await axios.get('/tenant/user/AdminRelatedViews/dashboard_info/')



            const data = resp.data.data;

            console.log({"data from dashboardApi":data,resp})
            return  resp.data.data 
        }
        catch(err){
            console.log({err})
            return thunkApi.rejectWithValue(err.response.data)
        }

    }
)