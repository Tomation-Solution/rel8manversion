import { ReactElement } from 'react';
import {LdsEllipsis } from './ButtonLoaderStyle'



const ButtonLoader = ():ReactElement=>{


  return (
    <LdsEllipsis className='lds-ellipsis'>
      
      <div></div>
      <div></div>
      <div></div>
    </LdsEllipsis>
  )
}

export default ButtonLoader