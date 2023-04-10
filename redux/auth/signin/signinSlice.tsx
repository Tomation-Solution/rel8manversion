import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import {signinApi} from "./signinApi"
/* @ts-ignore */
import cookieCutter from 'cookie-cutter'
interface siginDataType{
    user_type:string;
    token:string;
}
interface signinStateType{
    status: "idle" | "loading" | "succeeded" | "failed";
    isLoggedIn: boolean;
    error: any;
    data: null | siginDataType
}

const initialState={
    status:"idle",
    isLoggedIn:false,
    error:null,
    data:null
}as signinStateType


 const signIn = createSlice({
    name:'signin',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(signinApi.pending,(state,{ payload })=>{
            state.status = "loading"
        })

        builder.addCase(signinApi.fulfilled,(state,{payload}:{payload:any})=>{
            state.status = "succeeded"
            state.data = payload
            
            localStorage.setItem('token',JSON.stringify(payload))
            
        
        })


        builder.addCase(signinApi.rejected,(state,{payload})=>{
            state.status = "failed"
            console.log({"payload faild":payload})
            state.error=payload

        })
        

    }
})


// export const {} = signIn.actions;
export const selectSignIn=(state:RootState)=>state.signIn;
export default signIn.reducer;