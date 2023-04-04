import { Typography, Grid } from "@mui/material";
import { useRouter } from "next/router";
import GreenButton from "../components/Buttonn";
import Navbar from '../components/Navbar'
import FolderImage from '../images/image_processing20211130-32126-6l1sq4.jpg'

export default function NoChapter(){
    const router = useRouter()
    return(
        <Grid container md={12} sx={{height:'90vh'}} alignContent='center' justifyContent='center'>
            <Navbar/>
            {/* <Grid sx={{height:}} */}
                <Grid item  md={4} sm={10} >
                    <img src={FolderImage.src} style={{margin:"0 auto"}} />
                </Grid>
                <Grid item md={12} mb={4}>
                    <Typography textAlign='center' style={{color:'grey'}} className='text' variant='h4'>Oops!</Typography>
                    <Typography textAlign='center' fontSize={18} style={{color:'grey'}} className='text' >Your State is not Available yet!</Typography>
                </Grid>
                <br/>
                <GreenButton text='Go to Home' radius='10px'
                textColor='white' paddingY={1} paddingX={3} bg='#045696'
                click={()=>router.push('/')}
              />
            {/* </Grid> */}
        </Grid>
        
    )
}