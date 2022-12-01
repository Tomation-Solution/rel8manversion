import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axios"


export const  dueListAndOwningMembersGetApi =createAsyncThunk(
    "dueListAndOwningMembers/dueListAndOwningMembersGetApi",
    async (data,thunkApi)=>{
        try {
            const resp =await axios.get(`/tenant/dues/AdminManageDue/owning_members/`) 
            data = resp.data.data
            console.log(resp)
            return resp.data.data
        } catch (err:any) {
            console.log({"err from request":err})
            return thunkApi.rejectWithValue(err.response.data)
        }
    }
)