import { useState } from "react";
import BasicModal from "../Modals";
import { ArrowDropDown } from "@mui/icons-material";
import { Grid, TextField, Menu, MenuItem, Typography } from "@mui/material";
import HeadText from "../Dashboard/DashboardHead";
import GreenButton from "../Buttonn";


export default function Logout(props){
    
    return (
        <Grid container >
            {/* <HeadText text='Confirm Delete'/> */}
            <Typography fontWeight='bolder' variant='h6' pb={2} sx={{margin:'0 auto'}} className='text'>Confirm Logout</Typography>
            <Typography py={2} variant='body2' px={5} textAlign='center' className='text'>
                Confirm you wish to Logout 
                from this site
            </Typography>
            

            <Grid md={12} mt={1} container justifyContent='space-around'>
                <GreenButton text='Logout' textColor='#fff' paddingY={1} radius={3} paddingX={7} bg='#203719' />
                <GreenButton text='Cancel' textColor='#203719' paddingY={1} radius={3} paddingX={7} bg='#E1F1DC' click={()=>props.handleClose()} />
            </Grid>
        </Grid>
    )
}