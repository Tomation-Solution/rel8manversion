import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {SelectOption} from "./multiSelectCheckBox"
interface SelectWithLabelPropType{
  Label:string;
  name:string;
  setValue:(name:string,value:any)=>void;
  options:SelectOption[]
}

const SelectWithLabel:React.FC<SelectWithLabelPropType> = ({
  Label,name,setValue,options
}) => {
  const [input, setInput] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setInput(event.target.value as string);
    setValue(name,event.target.value);
  };

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
  );
}

export default  SelectWithLabel