import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MemberType } from '../members/membersApi';
import { RootState } from "../store";
import { createNews, createNwsComment, deleteNews, deleteNewsComment, getNews, getNewsComment } from './newsApi';



export type NewsType = {
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
export type NewsComment = {
    "id": number,
    "comment":string,
    "news": number,
    "member": {
        "full_name":string,
        "photo_url": string,
        "id": number
    }
}
type initialStateType= {
    status: "idle" | "loading"|"created" | "succeeded" | "failed"|"created"|'deleted';
    error: any;
    data: null|NewsType[]
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



const news = createSlice({
    name:'news',
    initialState,
    reducers:{},
    extraReducers:({addCase})=>{
        //
        addCase(getNews.pending,(state,action)=>{
                state.status='loading'
        })
        addCase(getNews.fulfilled,(state,action:PayloadAction<NewsType[]>)=>{
            state.status='succeeded'
            state.data = action.payload
        })
        addCase(getNews.rejected,(state,action)=>{
            state.status = 'failed'
        })

        addCase(createNews.pending,(state,action)=>{
            state.status='loading'
        })
        addCase(createNews.fulfilled,(state,action:PayloadAction<NewsType>)=>{
            state.data = [...state.data,action.payload]
           state.status='created'
        })
        addCase(createNews.rejected,(state,action)=>{
            state.status = 'failed'
        })


        addCase(deleteNews.pending,(state,action)=>{
            state.status='loading'
        })

        addCase(deleteNews.fulfilled,(state,{payload}:PayloadAction<number>)=>{
            state.status='deleted'
            state.data = state.data.filter(data=>data.id !== payload)
        })

        addCase(getNewsComment.pending,(state,action)=>{
            state.commentStatus='loading'
        })

        addCase(getNewsComment.rejected,(state,action)=>{
            state.commentStatus='failed'
            state.error='Please Check your internet Comment was not loaded'
        })
        
        addCase(getNewsComment.fulfilled,(state,action)=>{
            state.commentStatus='succeeded'
            state.comment = action.payload
        })

        addCase(createNwsComment.pending,(state,action)=>{
            state.commentStatus = 'loading'
        })

        addCase(createNwsComment.rejected,(state,action)=>{
            state.commentStatus = 'failed'
        })
        addCase(createNwsComment.fulfilled,(state,action)=>{
            state.commentStatus ='created'
            state.comment= [action.payload,...state.comment]
        })
        // deleteNewsComment
        addCase(deleteNewsComment.pending,(state,action)=>{
            state.commentStatus = 'loading'
        })
        addCase(deleteNewsComment.rejected,(state,action)=>{
            state.commentStatus = 'failed'
        })
        addCase(deleteNewsComment.fulfilled,(state,action)=>{
            state.commentStatus = 'deleted'
            state.comment= state.comment.filter(data=>data.id != action.payload)
        })
    }
})

// export const { } = news.actions;
export const selectNews = (state:RootState)=>state.news
export default news.reducer