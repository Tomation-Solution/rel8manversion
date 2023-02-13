import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getCouncilMembers, getMembersAndExco, MemberType } from "./membersApi";



interface initialStateType{
    status: "idle" | "loading" | "succeeded" | "failed";
    isLoggedIn: boolean;
    error: any;
    data: MemberType[]
}

const initialState ={
    status:"idle",
    isLoggedIn:false,
    error:null,
    data:[]

}  as  initialStateType

const MembersAndExcoSlice = createSlice({
    name:'member_and_exco',
    initialState,
    reducers:{},
    extraReducers:({addCase})=>{
        //


        addCase(getMembersAndExco.pending,(state,action)=>{
            state.status='loading'
        })
        addCase(getMembersAndExco.fulfilled,(state,{payload}:PayloadAction<MemberType[]>)=>{
            state.status='succeeded'
            state.data =payload;
        })
        addCase(getMembersAndExco.rejected,(state,action)=>{
            state.status='failed'
            
        })

        
        addCase(getCouncilMembers.pending,(state,action)=>{
            state.status='loading'
        })
        addCase(getCouncilMembers.fulfilled,(state,{payload}:PayloadAction<MemberType[]>)=>{
            state.status='succeeded'
            state.data =payload;
        })
        addCase(getCouncilMembers.rejected,(state,action)=>{
            state.status='failed'
            
        })
    }
})  


export const selectMemberAndExco = (state:RootState)=>state.member_and_exco
export default MembersAndExcoSlice.reducer