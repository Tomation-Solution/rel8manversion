import { Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import bgImage from '../images/Vectorlanding.png'
import styles from '../styles/Home.module.css'


export default function HeroSection(props){
    const router = useRouter();
    console.log(router.query.login)
    return (
        <main>
            <br/>
            <br/>
            <br/>
            <img
            src={bgImage.src}
            className={styles.heroImage}
            // width='100%'
            // height={500}  
            />
        <Grid container justifyContent='center'>
            <Typography className='text' variant='h4' textAlign='center'  color={'red'} style={{color:'#fff',position:'absolute', top:'30%'}} >
                {/* AANI {router.query.login} Chapter */}
                {props.message}
            </Typography>
        </Grid>
        </main>
    )

}