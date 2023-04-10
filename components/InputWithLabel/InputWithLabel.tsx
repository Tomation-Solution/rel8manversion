import { TextField, Typography } from "@mui/material"
import { Person, Visibility, VisibilityOff } from "@mui/icons-material"
import { IconButton } from "@material-ui/core";
import { useState } from "react";


type Prop ={
    register?:any,
    Icon?:React.ReactElement
    label:string,
    errorMessage?:string;
    type?:'text'|'password'
}

const InputWithLabel = ({register,Icon,label,errorMessage,type='text'}:Prop)=>{
    const [showPassword, setShowPassword]= useState(true);

    return (
        <div>
            <TextField
              placeholder={label} 
              // label='Username'  
              style={{width:'100%',}} size='small'
              type= {showPassword ?  'text':'password' }
              InputProps={{
              
                  startAdornment:(
                    <>
                     {Icon}
                    </>
                  ),
                  endAdornment:(
                    <>
                    {
                        type=='password'?
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={()=>setShowPassword(!showPassword)}
                        // onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                      :''
                    }
                    </>

                  )
              }}
              {...register}
              />
              <Typography  style={{'fontSize':'1rem','color':'crimson'}}>{errorMessage}</Typography>
        </div>
    )
}

export default InputWithLabel