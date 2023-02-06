import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axios";
import { createNwsCommentPropType } from "../news/newsApi";
import { NewsComment } from "../news/newsSlice";
import { PublicationType } from "./publicationSlice";



export type  publicationCreateType= {
    name:string;
    is_exco:boolean;
    is_committe:boolean;
    is_member:boolean;
    commitee_name?:number;
    body:string;
    image:any

}


// /tenant/news/newsview
export const createPublication = createAsyncThunk(
    'publication/createPublication',async (data:publicationCreateType,thunkAPI)=>{
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
            const resp = await axios.post(`/tenant/publication/publicationview/`,form)
            return resp.data.data[0] as PublicationType
        } catch (error:any) {
            console.log({error})            
            return error.reponse.data
        }   
    }
)

export const getPublication = createAsyncThunk(
    'publication/getPublication', async()=>{
        try {
            const resp = await axios.get(`/tenant/publication/publicationview/`,)
            console.log({resp})
            return resp.data.data as PublicationType[]
        } catch (error:any) {
            console.log({error})            
            return error.reponse.data
        }  
    }
)
export const deletePublication = createAsyncThunk(
    'publication/deletePublication',async(id:number)=>{
        //
        try{
            const resp = await axios.delete(`/tenant/publication/publicationview/${id}/`);
            console.log({resp})
            return id as number;
        }
        catch(err:any){
            return err.response.data
        }
    }
)



export const createPublicationComment = createAsyncThunk(
    'publication/createPublicationComment',async(data:createNwsCommentPropType)=>{
        try {
            const resp = await axios.post(`/tenant/publication/publicationview__comment/`,data)
            return resp.data as NewsComment
        } catch (error:any) {
            console.log({error})            
            return error.reponse.data
        } 
    }
)

type getPublicationCommentProp ={
    publication_id:number;
}
export const  getPublicationComment = createAsyncThunk(
    'publication/getPublicationComment',async({publication_id}:getPublicationCommentProp)=>{
        try {
            const resp = await axios.get(`/tenant/news/newsview__comment/?publication_id=${publication_id}`,)

            return resp.data.data as NewsComment[]
        } catch (error:any) {
            console.log({error})            
            return error.reponse.data
        }  
    }
)
export const deletePublicationComment = createAsyncThunk(
    'publication/deletePublicationComment',async(publicationID:number)=>{
        try{
            const resp = await axios.delete(`tenant/publication/publicationview__comment/${publicationID}/`)
            return publicationID as number 
        }
        catch (error:any) {
            console.log({error})            
            return error.reponse.data
        } 
    }
)