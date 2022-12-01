
import { Grid, Typography } from "@mui/material";
import GreenButton from "../../Buttonn";


export default function DeleteDue(props){
    
    return (
        <Grid container >
            {/* <HeadText text='Confirm Delete'/> */}
            <Typography fontWeight='bolder' variant='h6' pb={2} sx={{margin:'0 auto'}} className='text'>Confirm Delete</Typography>
            <Typography py={2} variant='body2' textAlign='center' className='text'>
                Confirm you wish to Delete
                due from the database
                
            </Typography>

            <Typography py={2} mx={1} variant='caption' xs={{margin:'0 auto'}} textAlign='center' className='light-text'>
               Note: You {"can't"} retriieve deleted items
            </Typography>
            

            <Grid md={12} mt={1} container justifyContent='space-around'>
                <GreenButton text='Save' textColor='#fff' paddingY={1} radius={3} bg='#203719' paddingX={7} />
                <GreenButton text='Cancel' textColor='#203719' paddingY={1} radius={3} bg='#E1F1DC' paddingX={7} click={()=>props.handleClose()} />
            </Grid>
        </Grid>
    )
}