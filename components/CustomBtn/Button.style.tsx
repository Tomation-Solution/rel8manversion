import styled from 'styled-components';

import { ButtonProp } from './Button';
import { createExternalStyle } from '../../utils/extraFunction';

export const ButtonStyle = styled.button<ButtonProp>`
  
 border: transparent;
 padding: .7rem 1rem;
border-radius: 5px;
cursor: pointer;
/* this code makes the icon if there is one to fit with the button word */
display: flex;
align-items: center;
justify-content: space-between;
justify-content: center;
width: 100%;
${(prop)=>{
    let style;
    if(prop.styleType==='pry'){
      style = 'background-color:#04a9fb;color: whitesmoke;font-weight: 600;padding: 1rem 1rem;  '
    }else{
      style = 'color:#04a9fb;font-weight: 600;border:1px solid  #04a9fb;background-color:white;'
    }
    return style
  }};
  ${(props)=>createExternalStyle(props)}
  
  `