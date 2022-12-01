import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {EventType,creatEventsApi,setEventStateToIdle,getEventsApi2, deleteEventApi} from "./eventsApi"
import { RootState } from "../store";





interface initialStateType{
    status: "idle" | "loading"|"created" | "succeeded" | "failed"|"created"|'deleted';
    isLoggedIn: boolean;
    error: any;
    data: null | EventType[]
}

const initialState ={
    status:"idle",
    isLoggedIn:false,
    error:null,
    data:[]

}  as  initialStateType



const events = createSlice({
    name:'events',
    initialState,
    reducers:{
        updateEventWithoutAsync:(state,action:PayloadAction<{data:EventType}>)=>{
            //
            if(state.data){
                state.data = [...state.data.map(data=>{
                    if(data.id===action.payload.data.id){
                        return action.payload.data
                    }
                    return data
                })]
            }
        }
    },
    extraReducers:(builder)=>{
        // getEventsApi

        builder.addCase(getEventsApi2.pending,(state,{payload})=>{
            state.status ="loading"
        })

        builder.addCase(getEventsApi2.fulfilled,(state,{payload})=>{
            state.status ="succeeded"
            
            console.log({"events list":payload})

            state.data = payload
        })


        builder.addCase(getEventsApi2.rejected,(state,{payload})=>{
            state.status ="failed"
            console.log({"events error":payload})
            state.error = payload
        })





        builder.addCase(setEventStateToIdle.pending,(state,{payload})=>{
            state.status ="loading"
        })

        builder.addCase(setEventStateToIdle.fulfilled,(state,{payload})=>{
            state.status ="idle"
        })


     

        builder.addCase(creatEventsApi.pending,(state,{payload})=>{
            state.status ="loading"
            
        })


        builder.addCase(creatEventsApi.fulfilled,(state,{payload}:PayloadAction<EventType>)=>{
            state.status ="created";


            state.data = [payload,...state.data,];
            console.log({"createSuccess Events":payload})
            
        })

        builder.addCase(creatEventsApi.rejected,(state,{payload})=>{
            state.status="failed";
            state.error=payload
            //add the reuturn data to redux cylce
        })


        // delete event 
        builder.addCase(deleteEventApi.pending,(state,action)=>{
            //
            state.status='loading'
        })

        builder.addCase(deleteEventApi.fulfilled,(state,{payload}:PayloadAction<number>)=>{
            //
            state.status='deleted'
            state.data = state.data.filter(data=>data.id!==payload)
        })
    }
})


export const {updateEventWithoutAsync} = events.actions
export const selectEvent =(state:RootState)=>state.events;
export default events.reducer;