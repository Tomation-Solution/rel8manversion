import { useQuery } from "react-query"
import { getStatusApi } from "../../redux/prospective.api"
import PropectiveMemberLayout from "../../layout/PropectiveMemberLayout/PropectiveMemberLayout"
import Spinner from "../../components/Spinner"
import StepsDisplay from "../../components/StepsDisplay/StepsDisplay"

import {useState,useEffect} from 'react'



export const Status =()=>{
    const {isLoading,data,status} =useQuery('status',getStatusApi)
    const  [count,setCount] = useState(-2)
   console.log({data})

   useEffect(()=>{
        if(status==='success'){
            if(data?.status ==='approval_in_progress'){
                setCount(0)
            }
            if(data?.status ==='approval_in_principle_granted'){
                setCount(1)
            }
            if(data?.status ==='final_approval'){
                setCount(2)
            }
            // approval_in_progress
            // approval_in_principle_granted
            // final_approval
        }
   },[status])
    return (
        <PropectiveMemberLayout>
            {
                isLoading?
                <Spinner/>:''
            }
            <br />
            <br />
            <br />
            <div style={{'padding':'1rem','maxWidth':'900px','margin':'0 auto','overflow':'auto'}}>
            <h1>View Status</h1>
            <div style={{'width':'700px',}}>
            <StepsDisplay currentNumber={count} count={3}/>  
             <div style={{'display':'flex','justifyContent':'space-between','alignItems':'center','fontSize':'1.3rem'}}>
                <p>
                    Approval in Progress
                </p>
                <p>
                    Approval in Principle Granted
                </p>
                <p>
                    Final Approval
                </p>
            </div> 
            </div>

                {/* <p><strong>Status</strong>{' '}{data?.status.replace('_',' ')}</p> */}
            </div>
        </PropectiveMemberLayout>

    )
}

export default Status