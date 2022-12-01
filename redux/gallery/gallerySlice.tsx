import { createSlice ,PayloadAction} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createGallery, deleteGallery, GalleryType, getGallery } from "./galleryApi";


type  initialStateType = {
    status: "idle" | "loading"|"created" | "succeeded" | "failed"|"created";
    isLoggedIn: boolean;
    error: any;
    data: null | GalleryType[]
}


const initialState ={
    status:"idle",
    isLoggedIn:false,
    error:null,
    data:[]

}  as  initialStateType


const gallery = createSlice({
    name:'gallery',
    initialState,
    reducers:{},
    extraReducers:({addCase})=>{
        //

        addCase(createGallery.pending,(state,action)=>{
            state.status='loading'
        })

        addCase(createGallery.fulfilled,(state,action:PayloadAction<GalleryType>)=>{
            state.status='created'
            state.data = [...state.data,action.payload]
        })
        addCase(createGallery.rejected,(state,action)=>{
            //
            state.status='failed';
            state.error = 'Something Went Wrong';
        })


        addCase(getGallery.pending,(state,action)=>{
            state.status='loading'
        })

        addCase(getGallery.fulfilled,(state,action:PayloadAction<GalleryType[]>)=>{
            state.status='succeeded'
            state.data =  action.payload
        })
        addCase(getGallery.rejected,(state,action)=>{
            //
            state.status='failed';
            state.error = 'Something Went Wrong';
        })


        addCase(deleteGallery.pending,(state,action)=>{
            state.status='loading';
        })
        addCase(deleteGallery.fulfilled,(state,{payload}:PayloadAction<number>)=>{
            state.status='succeeded';
            state.data = state.data.filter(data=>data.id!==payload)
        })
        
        addCase(deleteGallery.rejected,(state,action)=>{
            state.status='failed';
        })
    }
}) 


export const selectGallery = (state:RootState)=>state.gallery;
export default gallery.reducer