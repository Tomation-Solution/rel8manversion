import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import {signUpApi} from "./signupApi"




const signUp = createSlice({
    name:'signUp',
    initialState:{},
    reducers:{},
    extraReducers:(builder)=>{
        // builder.addCase(signUpApi.pending,(state,action)=>{

        // })
    }
})


export const {} = signUp.actions;
// export const selectSignup=(state:RootState)=>state.signUp;
export default signUp.reducer;