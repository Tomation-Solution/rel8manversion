import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axios";




export type createGalleryParamType = {
    link:string;
    photo_file:any;
    name:string;
}

export interface GalleryType extends createGalleryParamType{
    id?:number
}

export const createGallery  = createAsyncThunk(
    'gallery/createGallery',async (data:createGalleryParamType,thunkApi)=>{
        
        try{
            const form = new FormData();
            form.append('photo_file',data.photo_file[0])
            form.append('name',data.name)
            form.append('link',data.link)
            const resp = await axios.post(`/tenant/extras/galleryview/`,form)
            console.log({resp})
            return resp.data.data[0]  as  GalleryType
        }catch(err:any){

            console.log({err})
            
            return err.response.data
        }
    }
)


export const getGallery = createAsyncThunk(
    'gallery/getGallery', async ()=>{

        try {   
            const resp = await axios.get(`/tenant/extras/galleryview/`)

            return resp.data.data as GalleryType[]
        } catch (err:any) {
            
            return err.response.data
        }
    }
)

export const deleteGallery = createAsyncThunk(
    'gallery/deleteGallery', async (id:number,thunkApi)=>{
        try{
            const resp =  await axios.delete(`/tenant/extras/galleryview/${id}/`)
            console.log({resp})
            return id as number
        }catch(err:any){
            return err.response.data
        }
    }
)