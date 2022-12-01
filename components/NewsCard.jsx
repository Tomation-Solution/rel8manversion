import { Grid, Typography, Button } from "@mui/material";
import styles from '../styles/Home.module.css';
import Image from "next/image";
import GreenButton from "./Buttonn";
// import NewsImage from '../images/Vectorlanding.png'

export default function Newscard (props){
    return(
        <Grid md={5} item marginY={2}>
            <Image src={props.image} marginTop={0} height='600px' className='rounded-corners'/>
            <Typography fontWeight='bold' marginY={1}>{props.title}</Typography>
            <Typography variant="body2" textAlign='justify' marginBottom={2}>{props.body}</Typography>
            <Grid md={10} sm={9} style={{margin:'0 auto'}}>
                {/* <Button variant='contained'  size='small' className={[styles.button, 'button-lower rounded-button'] }>
                    More
                </Button>
                <GreenButton/> */}
                <GreenButton text='More' radius='10px'
               textColor='white' paddingY={1} paddingX={1}  bg='#436937'/>
            </Grid>
        </Grid>
    )

}