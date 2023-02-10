import { InputFieldViewContainer } from "./InputFieldView.style"



type Prop ={
    title:string;
    value:string;
}
const InputFieldView = ({title,value}:Prop):React.ReactElement=>{


    return (
        <InputFieldViewContainer>
        <p className="title"><small>{title}</small></p>
        <p className="value">{value}</p>
        </InputFieldViewContainer>
    )
}

export default InputFieldView