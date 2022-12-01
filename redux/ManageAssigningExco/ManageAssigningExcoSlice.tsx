import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { asignExcoPostion, createExcoPosition, createManageAssigningExcoParamType, deleteExcoPostion, getExcoPostion } from "./ManageAssigningExcoApi";




type initialStateType= {
    status: "idle" | "loading"|"created" | "succeeded" | "failed"|"created"|'updated'|'deleted';
    error: any;
    data: null|createManageAssigningExcoParamType[]
}

const initialState ={
    status:"idle",
    isLoggedIn:false,
    error:null,
    data:[]

}  as  initialStateType

const manage_assigning_exco= createSlice({
    name:'manage_assigning_exco',
    initialState,
    reducers:{
        setmanage_assigning_excoIdle:(state,action)=>{
            state.status='idle'
        }
    },
    extraReducers:({addCase})=>{
        //

        addCase(createExcoPosition.pending,(state,action)=>{
            state.status='loading'
        })

        addCase(createExcoPosition.fulfilled,(state,action:PayloadAction<createManageAssigningExcoParamType>)=>{
            state.status='created'
            state.data = [action.payload,...state.data,]
        })
        addCase(createExcoPosition.rejected,(state,action)=>{
            state.status = 'failed';
            state.error='Somthing Went Wrong'
        })


        addCase(getExcoPostion.pending,(state,action)=>{
            state.status= 'loading';
        })
        addCase(getExcoPostion.fulfilled,(state,{payload}:PayloadAction<createManageAssigningExcoParamType[]>)=>{
            state.status= 'succeeded';
            state.data = payload
        })
        addCase(getExcoPostion.rejected,(state,action)=>{
            state.status = 'failed';
            state.error='Somthing Went Wrong'
        })

        addCase(asignExcoPostion.pending,(state,action)=>{
            state.status='loading'
        })

        addCase(asignExcoPostion.fulfilled,(state,action)=>{
            state.status='updated';

        })

        addCase(asignExcoPostion.rejected,(state,action)=>{
            state.status = 'failed';
            state.error='Somthing Went Wrong'
        })


        addCase(deleteExcoPostion.pending,(state,action)=>{
            state.status='loading'
        })
        addCase(deleteExcoPostion.fulfilled,(state,{payload}:PayloadAction<number>)=>{
            state.status ='deleted'
            state.data = state.data.filter(data=>data.id !== payload)
        })
    }
})

export const {setmanage_assigning_excoIdle} = manage_assigning_exco.actions
export const selectManage_assigning_exco = (state:RootState)=>state.manage_assigning_exco
export default manage_assigning_exco.reducer