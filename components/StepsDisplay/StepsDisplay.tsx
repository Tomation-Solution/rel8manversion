import { StepsDisplayContainer } from "./StepsDisplay.style"

import {useState} from 'react'

type Prop ={
    currentNumber:number;
    count:number
}
const StepsDisplay = ({currentNumber,count}:Prop)=>{
    return <StepsDisplayContainer>
        <div className="display_line"></div>
            {
                [...new Array(count)].map((d,index)=>(
                    
                    <div className={`display_ball ${currentNumber==(index)?'active':''}`} key={index}>
                        <p>
                            {index+1}
                        </p>
                    </div>
                    
                ))
            }
           
    </StepsDisplayContainer>
}

export default StepsDisplay