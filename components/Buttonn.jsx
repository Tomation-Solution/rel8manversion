import { Typography, Grid } from "@mui/material";

export default function GreenButton(props){
    return (
        <Grid onClick={props.click} md={props.md} justify='center' alignContent='center' sm={props.sm} style={{backgroundColor:props.bg, borderRadius:props.radius,'cursor':'pointer'}} className='nav-link' paddingX={props.paddingX} paddingY={props.paddingY}>
            <Typography className=' light-text text' fontWeight={400} style={{color:props.textColor}} textAlign='center' >
                {props.text}
            </Typography>
        </Grid>
    )
}