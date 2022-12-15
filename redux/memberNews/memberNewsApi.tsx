import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axios";


export type MemberNewsType = {
    "id": number,
    "paragraphs": {
        "id": number,
        "paragragh":string,
        "heading": string
    }[],
    "has_reacted": boolean,
    "name":string,
    "is_exco": boolean,
    "is_committe": boolean,
    "is_member": boolean,
    "created_at": string,
    "updated_at":string,
    "likes": number,
    "dislikes": number,
    "body":string,
    "image": string,
    "danload": string,
    "commitee_name": any,
    "chapters": any,
    "user_that_have_reacted":any
}


export const getMemberNews = createAsyncThunk(
    'MemberNews/getMemberNews',async (data:any,thunkAPi)=>{
        //
        const chapter:any = localStorage.getItem('chapter')
        let lookup ='?for_members=True'
        let exco:any = localStorage.getItem('exco')
        if(exco){
            lookup =`?exco=${exco}`
        }
        try{
            const resp = await axios.get(`/tenant/news/newsview/get_news/${lookup}`)
            return resp.data.data as MemberNewsType[]
        }
        catch(err:any){
            return thunkAPi.rejectWithValue(err)
        }
    }
)