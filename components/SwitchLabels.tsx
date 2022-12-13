import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


type Prop ={
    switch:boolean;
    label:string
    func?:()=>void
}
const  SwitchLabels = (props:Prop):React.ReactElement=> {
  return (
    <FormGroup>
      <FormControlLabel
      onChange={()=>{
        if(props.func){
            props.func()
        }
      }}
      control={<Switch defaultChecked={props.switch} />} label={props.label} />
    </FormGroup>
  );
}

export default SwitchLabels