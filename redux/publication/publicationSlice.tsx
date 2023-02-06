import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { NewsComment } from "../news/newsSlice";
import { RootState } from "../store";
import { createPublication, createPublicationComment, deletePublication, deletePublicationComment, getPublication, getPublicationComment } from "./publicationApi";


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
    data: null|PublicationType[],
    comment:NewsComment[],
    commentStatus:'idle'|'loading'|"succeeded" | "failed"|'created'|'deleted'

}

const initialState ={
    status:"idle",
    isLoggedIn:false,
    error:null,
    data:[],
    comment:[],
    commentStatus:'idle'

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





    // "for comment control"

    addCase(createPublicationComment.pending,(state,action)=>{
        state.commentStatus='loading'
    })

    addCase(getPublicationComment.rejected,(state,action)=>{
        state.commentStatus='failed'
        state.error='Please Check your internet Comment was not loaded'
    })
    
    addCase(getPublicationComment.fulfilled,(state,action)=>{
        state.commentStatus='succeeded'
        state.comment = action.payload
    })

    addCase(getPublicationComment.pending,(state,action)=>{
        state.commentStatus = 'loading'
    })

    addCase(createPublicationComment.rejected,(state,action)=>{
        state.commentStatus = 'failed'
    })
    addCase(createPublicationComment.fulfilled,(state,action)=>{
        state.commentStatus ='created'
        state.comment= [action.payload,...state.comment]
    })
    // deleteNewsComment
    addCase(deletePublicationComment.pending,(state,action)=>{
        state.commentStatus = 'loading'
    })
    addCase(deletePublicationComment.rejected,(state,action)=>{
        state.commentStatus = 'failed'
    })
    addCase(deletePublicationComment.fulfilled,(state,action)=>{
        state.commentStatus = 'deleted'
        state.comment= state.comment.filter(data=>data.id != action.payload)
    })

    }

})



export const selectPublication = (state:RootState)=>state.publication
export default publication.reducer