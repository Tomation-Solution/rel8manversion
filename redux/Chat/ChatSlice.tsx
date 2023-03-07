import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { MemberNewsType } from "../memberNews/memberNewsApi";
import { RootState } from "../store";
import { get_old_chats, MembersType } from "./ChatApi";
import {get_list_members} from './ChatApi'



type State = {
    status:'pending'| 'error' | 'success'|'idle';
    members:MembersType[];
    // chat:{
    //     'full_name'?:string|null;
    //     'message':string;
    //     'send_user_id':number;
    // }[];
    chat:any;
    errorMessage:any;
}

const initialState:State={
    status:'idle',
    members:[],
    chat:[],
    errorMessage:null
}

export const ChatSlice = createSlice({
    name:'chat',
    initialState,
    reducers:{
        addChat:(state,action)=>{
            state.chat =[...state.chat,action.payload]
        },
        clearChat:(state,action)=>{
            state.chat=[]
        }
    },
    extraReducers:({addCase})=>{
        //
        addCase(get_list_members.pending,(state,action)=>{
            state.status='pending'
        })

        addCase(get_list_members.fulfilled,(state,{payload}:PayloadAction<MembersType[]>)=>{
            state.status='success'
            state.members = payload
        })

        addCase(get_list_members.rejected,(state,action)=>{
            state.status='error'
            state.errorMessage='Something went wrong'
        })


        addCase(get_old_chats.pending,(state,action)=>{
            
            state.status='pending'
        })
        addCase(get_old_chats.fulfilled,(state,action)=>{
            
            state.status='success'
            state.chat = action.payload
        })

        addCase(get_old_chats.rejected,(state,action)=>{
            
            state.status='error'
            state.chat=[]
            state.errorMessage='Something went wrong'
            console.log(action.payload)
        })
    }
})

export const {addChat,clearChat}  =  ChatSlice.actions
export default ChatSlice.reducer
export const selectChat = (state:RootState)=>state.chat