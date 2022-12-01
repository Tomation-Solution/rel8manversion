import { Divider, Grid, Typography } from "@mui/material";
import GreenButton from "../Buttonn";


export default function Receipt(){
    return(
        <Grid>
            <Typography className='text ' textAlign='center' variant='h5' fontWeight='700'>Receipt</Typography>
            <br/>
            <Grid md={6} style={{margin: '0 auto'}} className='light-grey-bg rounded-corners'>
                <Grid className='dark-green-bg' paddingLeft={5} paddingY={2}> 
                    <Typography className='text white-text'>
                    Receipt for
                    </Typography>
                    <Typography className='text white-text' variant='h5' fontWeight='700'>Christopher James</Typography>
                </Grid>
                <br/>
                <Grid container justifyContent='space-around'>
                    <Grid item>
                        <Typography className='text'>
                          Paid on:  
                        </Typography>
                        <Typography className='text' fontWeight='700'>
                          Feb. 20, 2022  
                        </Typography>
                        
                    </Grid>

                    <Grid item >
                        <Typography className='text'>
                        Receipt No:  
                        </Typography>
                        <Typography className='text' fontWeight='700'>
                        R09288266121
                        </Typography>
                        
                    </Grid>
                </Grid>
                <br/>
                <Grid>
                    <Typography textAlign='center' className='text'>Paid for</Typography>
                    <Typography textAlign='center' className='text' fontWeight='700'>Alumni Quaterly Payment </Typography>
                </Grid>
                <br/>
                <Divider variant='middle'/>
                <Grid marginY={2}>
                    <Typography textAlign='center' className='text'>Amount</Typography>
                    <Typography textAlign='center' className='text' fontWeight='700'>NGN 2,550.00 </Typography>
                </Grid>
                <br/>
            </Grid>
            <br/>
            <Grid md={3} marginTop={2} style={{margin:'0 auto'}}>
                <GreenButton text='Print' bg='#203719' textColor='white' radius={5} paddingY={1} paddingX={3} />
            </Grid>
        </Grid>
    )
} 