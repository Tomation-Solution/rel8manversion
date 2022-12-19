import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ContestantType, ElectionType, get_contestant, get_elections, member_vote } from "./ElectionAPi";



type State = {
    status:'idle'|'pending'|'success'|'voted'|'error',
    election: ElectionType[],
    contestant:ContestantType[],
    'message':string;
}

const initialState:State={
    status:'idle',
    election:[],
    contestant:[],
    message:''
}


const ElectionSLice = createSlice({
    name:'election',
    initialState,
    reducers:{
        setElectionStatus:(state,{payload}:PayloadAction<State['status']>)=>{
            state.status=payload
        }
    },
    extraReducers:({addCase})=>{

        addCase(get_elections.pending,(state,action)=>{
            state.status='pending'
        })

        addCase(get_elections.fulfilled,(state,{payload}:PayloadAction<ElectionType[]>)=>{
            state.status='success'
            state.election = payload
        })

        addCase(get_elections.rejected,(state,acton)=>{
            state.status='error'
        })

        addCase(get_contestant.pending,(state,action)=>{
            //
            state.status='pending'
        })

        addCase(get_contestant.fulfilled,(state,{payload}:PayloadAction<ContestantType[]>)=>{
            //
            state.status='success'
            state.contestant = payload
        })


        
        addCase(get_contestant.rejected,(state,action)=>{
            //
            state.status='error'
        })

        addCase(member_vote.pending,(state,action)=>{
            state.status='pending'
        })

        addCase(member_vote.fulfilled,(state,action)=>{
            state.status='voted'
            if(action.payload == 201){
                state.message='Your vote has been counted'
            }else{
            state.message=action.payload.message.error
            }
        })
        addCase(member_vote.rejected,(state,{payload}:PayloadAction<any>)=>{
            state.status='error'
            // console.log(action.payload)
            // state.message
            if(payload.response.data.status_code ==400){    
                state.message = payload.response.data.message.error
            }
        })

    }
})


export const  { setElectionStatus } = ElectionSLice.actions
export const selectMemberElection = (state:RootState)=>state.MemberElection

export default ElectionSLice.reducer