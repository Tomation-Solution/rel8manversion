import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axios";
import { generate_url_params } from "../../utils/extraFunction";



export type MemberPublicationType =  {
    "id": number,
    "paragraphs": {
        "id": number,
        "paragragh":string,
        "heading":string
    } [],
    "name": string,
    "is_exco": boolean,
    "is_committe": boolean,
    "is_member": boolean,
    "created_at": string,
    "updated_at":string,
    "likes": number,
    "dislikes": number,
    "body": string,
    "image": string,
    "danload": string,
    "commitee_name": null| number,
    "chapters": null| number
}

export const getMemberPublication = createAsyncThunk(
    'memberPublication/getMemberPublication',async(data:any,thunkApi)=>{
        //
        let lookup =generate_url_params()
        
        try{
            const resp = await axios.get(`/tenant/publication/getyourpublication/${lookup}`)
            return resp.data.data as MemberPublicationType[]
        }
        catch(err:any){

           return  thunkApi.rejectWithValue(err)
        }
    }
)