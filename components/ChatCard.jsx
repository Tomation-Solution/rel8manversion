import { Grid, Typography } from "@mui/material"


export default function ChatCard(props){
    return (
        <Grid  paddingY={1} paddingX={2} marginY={1} className={`rounded-corners ${props.bg}`}>
            <Typography variant='caption' className='light-text' fontWeight='normal' textAlign='center'>
                {/* {props.date} {props.time} */}
            </Typography>
            <Grid container >
                <Grid item paddingRight={2}>
                    {/* <Image src={props.image} height={'45px'} width={'45px'} className='rounded-corners'/> */}
                </Grid>
                <Grid item>
                    <Typography variant='subtitle2' className='green-text' fontWeight='bold'>
                        {props.name}
                    </Typography>
                    <Typography variant='subtitle2' className='light-text' fontWeight='normal'>
                        {/* {props.message.lenght<28 ? props.message : props.message.substring(0,23) +' ...'} */}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}