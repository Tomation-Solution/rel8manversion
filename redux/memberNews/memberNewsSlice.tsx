import { createSlice ,PayloadAction} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getMemberNews, MemberNewsType } from "./memberNewsApi";



type State = {
    status:'pending'|'success'|'error'|'idle',
    news:MemberNewsType[],
    errorMessage:any;
}

const initialState:State = {
    status:'idle',
    news:[],
    errorMessage:null
}

const MemberNews = createSlice({
    name:'MemberNews',
    initialState,
    reducers:{},
    extraReducers:({addCase})=>{
        addCase(getMemberNews.pending,(state,action)=>{
            state.status='pending'
        })

        addCase(getMemberNews.fulfilled,(state,{payload}:PayloadAction<MemberNewsType[]>)=>{
            state.status='success'
            state.news = payload
        })
        addCase(getMemberNews.rejected,(state,action)=>{
            //
            state.status='error'
            state.errorMessage='Please Check your internet'
            console.log({'from member news slice':action.payload})
        })
    }
})


export const selectMemberNews = (state:RootState)=>state.MemberNews


export default MemberNews.reducer