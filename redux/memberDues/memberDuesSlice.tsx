import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { DueBreakDownType, DuePaymentResponse, getMemberDueBreakDown, getMemberduesApi, memberDuesType, payDuesApi } from "./memberDuesApi";




type State = {
    status:'pending'|'success'|'error'|'idle',
    dues:memberDuesType[],
    message:string,
    due_break_down:DueBreakDownType
}
const initialState:State ={
    status:'idle',
    dues:[],
    message:'',
    due_break_down:{
        'outstanding':0,
        'total_paid':0
    }

}


const memberDues = createSlice({
    name:'member_dues',
    initialState,
    reducers:{
        setMemberDuesStatus:(state,{payload}:PayloadAction<State['status']>)=>{
            state.status=payload
        }
    },
    extraReducers:({addCase})=>{
        //

        addCase(getMemberduesApi.pending,(state,action)=>{
            state.status='pending'
        })

        addCase(getMemberduesApi.fulfilled,(state,{payload}:PayloadAction<memberDuesType[]>)=>{
            state.status='success'
            state.dues = payload
            state.message='Success'
        })

        addCase(getMemberduesApi.rejected,(state,action)=>{
            state.status='error'
            state.message = 'Please Check You Internet Some error occured'
        })

        addCase(payDuesApi.pending,(state,action)=>{
            state.status='pending'
        })

        addCase(payDuesApi.fulfilled,(state,{payload}:PayloadAction<DuePaymentResponse>)=>{
          console.log('SuccesError')
            state.status='success'
            state.message='Please We proccesing a payment gateway hold on'
            window.location.href = payload.data.authorization_url
        })
        addCase(payDuesApi.rejected,(state,{payload}:PayloadAction<any>)=>{
            state.status='error'
            if(payload.response.data.status_code == 400){
                state.message = payload.response.data.message.error
            }else{
                state.message = 'Please Check you internet and refresh'

            }
        })


        addCase(getMemberDueBreakDown.pending,(state,action)=>{
            state.status='pending'

        })

        addCase(getMemberDueBreakDown.fulfilled,(state,{payload}:PayloadAction<DueBreakDownType[]>)=>{
            state.status='success'
            state.due_break_down=payload[0]
            
        })

    }
})

export const {setMemberDuesStatus} = memberDues.actions
export default memberDues.reducer
export const selectMemberDues = (state:RootState)=>state.member_dues
