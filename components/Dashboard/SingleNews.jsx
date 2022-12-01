import { Grid, Typography } from "@mui/material"
import Image from "next/image"
import NewsImage from '../../images/Vectorlanding.png'


export default function SingleNews(props){
    return(
        <Grid container md={10} justifyContent='center' sx={{margin:'0 auto'}}>
            <Grid><Image src={NewsImage} className='rounded-corners'/></Grid>
            <Grid container justifyContent='space-between' py={3}> 
                <Grid item>
                    <Typography className='text' variant='h6' fontWeight='bold'>
                        Lorem ipsum dolor sit amet, consetetur sadipscing 
                        elitr
                    </Typography>
                </Grid>
                <Grid item>Feb 15th, 2022 - 10:33</Grid> 
            </Grid>
            <Grid>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum....... Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsumLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsumLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum</Grid>
        </Grid>
    )
}