import { Typography, Grid ,Button} from "@mui/material";


const  MarkoBtn = (props)=>{
    return (
        <Button onClick={props.click} md={props.md} justify='center' 
        type={props.type?props.type:"submit"}
        alignContent='center' sm={props.sm} style={{backgroundColor:props.bg, borderRadius:props.radius,"width":"100%"}} 
        className='nav-link' paddingX={props.paddingX} paddingY={props.paddingY}>
            <Typography className=' light-text text' fontWeight={400} style={{color:props.textColor}} textAlign='center' >
                {props.text}
            </Typography>
        </Button>
    )
}


export default MarkoBtn



// <Grid onClick={props.click} md={props.md} justify='center' 
// alignContent='center' sm={props.sm} style={{backgroundColor:props.bg, borderRadius:props.radius}} 
// className='nav-link' paddingX={props.paddingX} paddingY={props.paddingY}>
//     <Typography className=' light-text text' fontWeight={400} style={{color:props.textColor}} textAlign='center' >
//         {props.text}
//     </Typography>
// </Grid>