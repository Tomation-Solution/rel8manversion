import { Typography } from "@mui/material"

export default function HeadText (props){
    return (<Typography className='text' fontWeight='bold' marginX={2}>
        {props.text}
    </Typography>)
}