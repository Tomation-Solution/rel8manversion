import { Grid, Typography } from '@mui/material'

export default function GalleryCard(props){
    return(
        <Grid item md={4}>
            <Grid item md={11} margin={2}>
                <img 
                 width={'300px'}
                 height={'300px'}
                //  height='900px'
                src={props.image.src}  
                className='rounded-corners'/>
                <Typography className='text'>{props.text}</Typography>
            </Grid>
        </Grid>
    )
}