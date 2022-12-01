import { Grid, Typography } from "@mui/material";
import styles from '../styles/Home.module.css';
// import Map from '../images/MAP.PNG';
import Map from "./Map";
import Image from "next/image";


export default function MapHolder (){
    return (
        
            <Grid container className={styles.mapBg} md={11} justifyContent='center' alignItems='center'>
                <Grid  item md={4} xs={12} >
                    <Typography variant='h6' fontWeight='bold' className='text'>
                        Alumni Association of the National Institute (AANI)
                    </Typography>
                    <Typography variant='body2' className='text'>
                    Select the Chapter of the Association you belong to from the map
                    </Typography>
                </Grid>
                <Grid item md={8}>
                    {/* <div id="map"></div> */}
                    {/* <Image src={Map} height='400vh'/> */}
                    <Map/>
                    {/* <div dangerouslySetInnerHTML={{ __html: "<iframe src='http://simplemaps.com/custom/country/48SMs9Lu' />"}} /> */}
                </Grid>
                
            </Grid>
        
    )
}