// import React from 'react'
import  AccountBalanceWalletTwoTone from '@mui/icons-material/AccountBalanceWalletTwoTone';
import {Avatar, Grid, Typography} from '@mui/material';

function IconCard() {
  return (
    <Grid container className='light-grey-bg rounded-corners' justifyContent='space-evenly' paddingX={2} paddingY={3} md={3}>
        <Grid item>
            <Avatar  sx={{ bgcolor: '#FFC5B2' }}>
            <AccountBalanceWalletTwoTone sx={{color:'#FF3B6F'}}/>
        </Avatar>
        </Grid>
        <Grid item>
            <Typography fontWeight='bold' className='text'>
                26,000.00
            </Typography>
            <Typography>
                Outstanding
            </Typography>
        </Grid>
    </Grid>
  )
}

export default IconCard