import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createPublication, deletePublication, getPublication } from "./publicationApi";


export type PublicationType = {
    id:number,
    "name":string,
    "is_exco": boolean,
    "is_committe": boolean,
    "is_member": boolean,
    "created_at": string,
    "updated_at": string,
    "likes": null |number,
    "dislikes":  null |number,
    "body":string,
    "image": string,
    "commitee_name": null|string,
    "chapters": any,
    "user_that_have_reacted": any[]
} 

type initialStateType= {
    status: "idle" | "loading"|"created" | "succeeded" | "failed"|"created"|'deleted';
    error: any;
    data: null|PublicationType[]
}

const initialState ={
    status:"idle",
    isLoggedIn:false,
    error:null,
    data:[]

}  as  initialStateType



const publication  = createSlice({
    name:'publication',
    initialState,
    reducers:{},
    extraReducers:({addCase})=>{

        addCase(getPublication.pending,(state,action)=>{
            state.status='loading'
    })
    addCase(getPublication.fulfilled,(state,action:PayloadAction<PublicationType[]>)=>{
        state.status='succeeded'
        state.data = action.payload
    })
    addCase(getPublication.rejected,(state,action)=>{
        state.status = 'failed'
    })

    addCase(createPublication.pending,(state,action)=>{
        state.status='loading'
    })
    addCase(createPublication.fulfilled,(state,action:PayloadAction<PublicationType>)=>{
        state.data = [...state.data,action.payload]
       state.status='created'
    })
    addCase(createPublication.rejected,(state,action)=>{
        state.status = 'failed'
    })
    addCase(deletePublication.pending,(state,{payload}:PayloadAction<number>)=>{
        state.status='loading';
    })
    addCase(deletePublication.fulfilled,(state,{payload}:PayloadAction<number>)=>{
        state.status='deleted';
        state.data = state.data.filter(data=>data.id !== payload)
    })

    }

})



export const selectPublication = (state:RootState)=>state.publication
export default publication.reducer