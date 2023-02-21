import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {useState,useEffect} from 'react'

type Prop ={
    switch:boolean;
    label:string
    func?:(checked:boolean)=>void
}
const  SwitchLabels = (props:Prop):React.ReactElement=> {
  const [checked,setChecked]=useState(false)
  useEffect(()=>{
    setChecked(props.switch)
  },[props.switch])
  return (
    <FormGroup style={{'padding':'0 .5rem'}}>
      <FormControlLabel
      onChange={(event:any,checked:boolean)=>{
        if(props.func){
          // setChecked(checked)
            props.func(checked)
        }
      }}
      control={<Switch size="small"  checked={checked} />} label={props.label} />
    </FormGroup>
  );
}

export default SwitchLabels