// import React from 'react'
import { MoneyOffRounded } from '@mui/icons-material';
import {Avatar, Grid, IconButton, Typography} from '@mui/material';

function StatCard(props) {
  return (
    <Grid container className='rounded-corners'
     justifyContent='space-evenly' paddingX={2} paddingY={3} sx={{bgcolor:props.color?props.color:'#F8F8F8'}}>
        <Grid item>
           { props.hasBg ?
            <Avatar  sx={{ bgcolor: props.iconBg }}>
                {/* <MoneyOffRounded sx={{color:'#FF3B6F'}}/> */}
                {props.icon}
            </Avatar>
            : 
            <IconButton disabled>{props.icon}</IconButton>
            
            }
        </Grid>
        <Grid item>
            <Typography fontWeight='bold' textAlign='center' className='text'>
                {props.header}
            </Typography>
            <Typography className='light-text'>
                {props.body}
            </Typography>
        </Grid>
    </Grid>
  )
}

export default StatCard