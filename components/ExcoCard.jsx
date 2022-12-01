import { Grid, Typography } from "@mui/material";
import Image from "next/image";

export default function ExcoCard (props){
    return (
        <Grid md={3} marginY={2}>
            <Grid md={10}>
                <Image src={props.image} />
                <Grid container justifyContent='space-around' marginY={1} alignItems='center' >
                    <Grid item>
                        <Typography className='text' fontWeight='600'>
                            {props.name}
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography variant='subtitle2' fontWeight='600' className='light-text nav-link'>  &nbsp;- Read More</Typography>
                    </Grid>
                </Grid>
                <Grid container justifyContent='center'  marginY={1} alignItems='center' >
                    <Grid item>
                        <Typography className='text' variant="body2" fontWeight='400'>
                            Porfolio
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography variant='subtitle2' fontWeight='600' className='light-text nav-link'>  &nbsp;- {props.excoPost}</Typography>
                    </Grid>
                </Grid>
                <Typography className='text'>
                    {props.company}  {props.post}
                </Typography>
                <Typography textAlign='justify' className='light-text'>
                    {props.body}
                </Typography>
            </Grid>
        </Grid>
    )
}