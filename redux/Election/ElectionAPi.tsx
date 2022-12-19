import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axios";




export type ElectionType ={
    "id": number ,
    "name": string,
    "role_name": string,
    "role_detail":string,
    "is_close": boolean //tells if the election is closed or not
}

export type  ContestantType = {
    "member__user__email":string,
    "member": number,
    "ballotbox": number,
    "amount_vote": number,
    "youtubeVidLink": string,
    "id": number
}
export const get_elections = createAsyncThunk(
    'election/get_elections',async (data:any,thunkAPi)=>{
        //
        try{
            const resp = await axios.get('/tenant/election/adminmanageballotbox/list_of_elections/')

            return  resp.data.data as ElectionType[]
        }
        catch(err:any){
            //
            return thunkAPi.rejectWithValue(err)
        }
    }
)

export const get_contestant = createAsyncThunk(
    'election/get_contestant',async (election_id:number,thukApi) =>{
        try {
            const resp = await axios.get(`/tenant/election/adminmanageballotbox/list_of_contestant/?election_id=${election_id}`);
            return resp.data.data as ContestantType[]
        } catch (err:any) {
            return thukApi.rejectWithValue(err)
        }

    }
)
type member_voteApiProp ={
    "ballotBoxID": number,
    "contestantID":number,
    "vote": number
}
export const member_vote = createAsyncThunk(
    'election/member_vote', async (data:member_voteApiProp,thunkApi)=>{
        //
        try{
            const resp = await axios.post('/tenant/election/adminmanageballotbox/vote_for_contestant/',data)
            // if(resp.data.)
            return resp.data.status_code;
        }catch(err:any){
            return thunkApi.rejectWithValue(err)
        }
    }
)