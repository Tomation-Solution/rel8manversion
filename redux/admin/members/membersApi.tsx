import  {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../../helpers/axios";



export const getMembersApi = createAsyncThunk(
    "members/getMembersApi",
    async (data,thunkApi) =>{


        try {
            const resp = await axios.get('/tenant/user/AdminRelatedViews/get_members_and_excos/')
            console.log({"from members api ":resp})
            return resp.data.data
        } catch (err:any) {
            console.log({"err from geting memebers":err})
            return thunkApi.rejectWithValue(err.response.data)
        }
    }
)