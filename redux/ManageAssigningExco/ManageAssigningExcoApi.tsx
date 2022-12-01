

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axios";


export type createManageAssigningExcoParamType ={
    "name":string,
    "about":string,
    "can_upload_min":boolean;
    id?:number;
    member_id?:null |number;
    chapter_id?:null |number;
}

export const createExcoPosition= createAsyncThunk(
    'manage_assigning_exco/createExcoPosition',async (data:createManageAssigningExcoParamType,thunkApi)=>{

        try {
            const resp = await axios.post(`/tenant/user/ManageAssigningExos/`,{
                "name":data.name,
                "about":data.about,
                "can_upload_min":data.can_upload_min,
            });
            console.log({'createExcoPostionData':resp})
            return resp.data.data[0] as  createManageAssigningExcoParamType
        } catch (err:any) {

            return err.response.data
        }
    }
)

export const getExcoPostion = createAsyncThunk(
    'manage_assigning_exco/getExcoPostion',async ()=>{
        //
        try{
            const resp  =  await axios.get(`/tenant/user/ManageAssigningExos/`);
            console.log({'getExcoPostion':resp})
            return resp.data.data as createManageAssigningExcoParamType
        }catch(err:any){
            return err.response.data as any
        }
    }
)


export type asignPostionParamType = {
    "name":string,
    "about": string,
    "can_upload_min": boolean,
    "member_id":number,
    "is_remove_member":boolean,
    'postion_id':number,
    chapter_id?:null | number
}

export const asignExcoPostion = createAsyncThunk(
    'manage_assigning_exco/asignExcoPostion',async (data:asignPostionParamType,thunkApi)=>{
        const postion_id:number = data.postion_id
        delete data['postion_id']
        try {
            const resp = await axios.patch(`/tenant/user/ManageAssigningExos/${postion_id}/`,data)
            return resp.data.data as asignPostionParamType
        } catch (err:any) {
            return err.response.data as any
        }
    }
)

export const deleteExcoPostion = createAsyncThunk(
    'manage_assigning_exco/deleteExcoPostion', async(id:number) =>{

        try {   
                const resp = await axios.delete(`/tenant/user/ManageAssigningExos/${id}/`)

                return id as number
        } catch (error:any) {
            return error.respons.data
        }
    }
)