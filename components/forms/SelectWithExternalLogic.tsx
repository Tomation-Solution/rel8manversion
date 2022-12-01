import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {SelectOption} from "./multiSelectCheckBox"

interface SelectWithExternalLogicPropType{
    Label:string;
    name:string;
    // setValue:(name:string,value:any)=>void;
    options:SelectOption[]
    customFunc:(currentInput:string|boolean)=>void
}


//NOTE so this component helps us choose what to do with the current selected input
const SelectWithExternalLogic:React.FC<SelectWithExternalLogicPropType>=({

    Label,name,options,customFunc
})=>{

    const [input, setInput] = React.useState<string|boolean>('');


    const handleChange= (event:SelectChangeEvent)=>{
    
        
    setInput(event.target.value as string);
    customFunc(event.target.value)

    }
    return (

        <Box sx={{ width: "100%" }}>
      <FormControl fullWidth>
        <InputLabel id={Label}>{Label}</InputLabel>
        <Select
          // labelId="demo-simple-select-label"
          // id="demo-simple-select"
          value={input}
          label={Label}
          onChange={handleChange}
          required
        >
          {options.map(({name,value})=><MenuItem value={value} key={value}>{name}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
    )

}

export default SelectWithExternalLogic