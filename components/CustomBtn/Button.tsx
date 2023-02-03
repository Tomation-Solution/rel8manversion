import React from 'react'
import {ButtonStyle} from './Button.style'


export type ButtonProp =React.PropsWithChildren<{
  'styleType'?:'pry'|'sec',
  'style'?:{
    [Key:string]:string,
  },
  onClick?:(e:React.MouseEvent<HTMLButtonElement>)=>void;
  isLoading?:boolean;
}>


// export type PropStyle={
//   'styleType'?:'pry'|'sec',
//   'width'?:string,

// }
const CustomBtn = ({children,styleType='pry',isLoading=false,...rest}:ButtonProp):React.ReactElement=>{


  return (
    <ButtonStyle styleType={styleType} disabled={isLoading}  
      {...rest}>
      {isLoading?'Loading...':children}
    </ButtonStyle>
  )
}




export default CustomBtn