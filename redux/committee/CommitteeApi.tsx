import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../helpers/axios"
import { MemberType } from "../members/membersApi"

export type CommitteeType = {
    "id": number,
    "name":string,
    "team_of_reference": string,
    "commitee_todo": {
        "how": string[]
    },
    "connected_members": MemberType[],
    "commitee_duties": {
        "how": string[]
    }
}


export const get_commitee = createAsyncThunk('commitee/get_commitee',async (data,thunkApi)=>{
        //this get the commitee the logged in use belongs too

        try{
            const resp = await axios.get('/tenant/auth/manage-commitee-member/get_commitee/')
            return resp.data.data as CommitteeType[]
        }
        catch(err:any){

            return thunkApi.rejectWithValue(err)
        }
})

export  const commiteeDetailApi = createAsyncThunk('comittee/commiteeDetailApi',async (id:number,thunkApi)=>{
    try{
        const resp = await axios.post(`/tenant/auth/manage-commitee-member/get_commitee/?commitee_id=${id}`)
        return resp.data.data as CommitteeType
    }
    catch(err:any){

        return thunkApi.rejectWithValue(err)
    }  
})