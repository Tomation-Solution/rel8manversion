import React from "react"
import Logo from '../../images/logo.svg'
import { Card,Box,IconButton, InputAdornment, Typography,TextField, Button,Grid, Checkbox } from "@mui/material"
import styles from '../../styles/Home.module.css'



type Prop = React.PropsWithChildren<{
    title:string,
    intro:string
}>
const ReUseAbleTranspParentCard =({title,intro,children}:Prop):React.ReactElement=>{
    return (
        <div className={styles.card}>
        <div style={{'width':'80px','margin':'0 auto'}}>
           <img src={Logo.src} style={{'width':'100%','height':'100%'}}/>
       </div>
            <Typography className='text' textAlign='center' marginBottom={2} fontWeight='bolder' >
                {title}
                </Typography>
           <Typography className='text' fontWeight='normal' textAlign='center' marginBottom={2} variant='subtitle2' color='InactiveCaption'>
           {intro} </Typography>
           <br/>
        {children}
        </div>
    )
}

export default ReUseAbleTranspParentCard