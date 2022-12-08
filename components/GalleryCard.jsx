import Image from 'next/image'
import { Grid, Typography } from '@mui/material'

export default function GalleryCard(props){
    return(
        <Grid item md={4}>
            <Grid item md={11} margin={2}>
                <Image 
                 width={'300px'}
                 height={'300px'}
                //  height='900px'
                src={props.image}  
                className='rounded-corners'/>
                <Typography className='text'>{props.text}</Typography>
            </Grid>
        </Grid>
    )
}