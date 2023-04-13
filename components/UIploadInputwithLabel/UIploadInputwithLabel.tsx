import { useState } from "react";
import { UIploadInputwithLabelContainer } from "./UIploadInputwithLabel.style";
import {AiOutlineUpload} from 'react-icons/ai'


type Prop ={
    label:string;
    name:string;
    setValue:(name:string,value:any)=>void
}


const UIploadInputwithLabel = ({label,name,setValue}:Prop):React.ReactElement=>{
    const [file,setFile] = useState<any>(null)
    return <UIploadInputwithLabelContainer>
        <p>{label}</p>
        <input id={name} type="file"
        onChange={e=>{
            setFile(e.target.files[0])
            setValue(name,e.target.files[0])
        }}
        />
        <label  htmlFor={name}>
            <AiOutlineUpload style={{'fontSize':file?'2rem':'1rem'}}/>
        </label>
    </UIploadInputwithLabelContainer>
}

export default UIploadInputwithLabel