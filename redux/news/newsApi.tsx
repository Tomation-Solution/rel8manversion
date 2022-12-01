import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axios";
import { NewsType } from "./newsSlice";



export type  newsCreateType= {
    name:string;
    is_exco:boolean;
    is_committe:boolean;
    is_member:boolean;
    commitee_name?:number;
    body:string;
    image:any

}
type createNewsParam = {
    data:newsCreateType
}

// /tenant/news/newsview
export const createNews = createAsyncThunk(
    'news/createNews',async (data:newsCreateType,thunkAPI)=>{
        const form = new FormData()
        form.append('name',data.name)
        form.append('is_exco',JSON.stringify(data.is_exco))
        form.append('is_committe',JSON.stringify(data.is_committe))
        form.append('is_member',JSON.stringify(data.is_member))
        if(data.commitee_name){
            form.append('commitee_name',JSON.stringify(data.commitee_name))
        }
        form.append('body',data.body)
        form.append('image',data.image[0])
        try {
            const resp = await axios.post(`/tenant/news/newsview/`,form)
            return resp.data.data[0] as NewsType
        } catch (error:any) {
            console.log({error})            
            return error.reponse.data
        }   
    }
)

export const getNews = createAsyncThunk(
    'news/getNews', async()=>{
        try {
            const resp = await axios.get(`/tenant/news/newsview/`,)

            return resp.data.data as NewsType[]
        } catch (error:any) {
            console.log({error})            
            return error.reponse.data
        }  
    }
)

export const deleteNews = createAsyncThunk(
    'news/deleteNews',async (id:number)=>{
        try {
            const resp = await axios.delete(`/tenant/news/newsview/${id}/`,)
            console.log({resp})
            return id as number
        } catch (error:any) {
            console.log({error})            
            return error.reponse.data
        }

    }
)