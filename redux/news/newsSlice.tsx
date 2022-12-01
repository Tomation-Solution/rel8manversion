import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../store";
import { createNews, deleteNews, getNews } from './newsApi';



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
type initialStateType= {
    status: "idle" | "loading"|"created" | "succeeded" | "failed"|"created"|'deleted';
    error: any;
    data: null|NewsType[]
}

const initialState ={
    status:"idle",
    isLoggedIn:false,
    error:null,
    data:[]

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
    }
})

// export const { } = news.actions;
export const selectNews = (state:RootState)=>state.news
export default news.reducer