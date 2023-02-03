import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'


type Prop =React.PropsWithChildren<
{
//   btnContrroller:React.ReactElement;
  size?:number;
  direction?:'left'|'right'|'bottom';
  btnClick?:()=>void;
  isOpen:boolean;
 setIsOpen:any;
}>

const OffCanvas = ({children,isOpen,setIsOpen,size=40,direction='left',btnClick=()=>null}:Prop):React.ReactElement=>{

//   const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawer = () => {
    btnClick()
    setIsOpen((prevState:boolean) => !prevState)
  }


  return (
    <>
      {/* <div onClick={toggleDrawer} 
      // style={{'border':'1px solid red'}}
      >
        
        {btnContrroller}
      </div> */}
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        className='bla bla bla'
        size={`${size}%`}
        direction={direction}
        zIndex={4000}
        style={{'overflow':'scroll'}}
      >
        <div 
        style={{
          'backgroundColor':'$thickBlue'
        }}
        >

        <br />
        <br />
        {
          children
        }
        </div>
      </Drawer>
    </>
  )
}

export default OffCanvas