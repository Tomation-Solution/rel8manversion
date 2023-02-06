import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axios";
import { NewsComment, NewsType } from "./newsSlice";



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


type getNewsCommentProp ={
    news_id:number;
}
export const  getNewsComment = createAsyncThunk(
    'news/getNewsComment',async({news_id}:getNewsCommentProp)=>{
        try {
            const resp = await axios.get(`/tenant/news/newsview__comment/?news_id=${news_id}`,)

            return resp.data.data as NewsComment[]
        } catch (error:any) {
            console.log({error})            
            return error.reponse.data
        }  
    }
)


export type createNwsCommentPropType ={   
    "comment":string,
    "news":number
}
export const createNwsComment = createAsyncThunk(
    'news/createNwsComment',async(data:createNwsCommentPropType)=>{
        try {
            const resp = await axios.post(`/tenant/news/newsview__comment/`,data)

            return resp.data as NewsComment
        } catch (error:any) {
            console.log({error})            
            return error.reponse.data
        } 
    }
)

export const deleteNewsComment = createAsyncThunk(
    'news/deleteNewsComment',async(newsID:number)=>{
        try{
            const resp = await axios.delete(`/tenant/news/newsview__comment/${newsID}/`)
            return newsID as number 
        }
        catch (error:any) {
            console.log({error})            
            return error.reponse.data
        } 
    }
)