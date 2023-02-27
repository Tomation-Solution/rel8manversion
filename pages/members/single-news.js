import { Grid, Typography } from "@mui/material"
import { fontFamily } from "@mui/system"
import { DashboardLayout } from "../../components/Dashboard/Member/Sidebar/dashboard-layout"
import NewsImage from '../../images/Vectorlanding.png'


export default function SingleNews(props){
    return(
        <DashboardLayout px={2}>
            <Grid mx={3}>
        {/* <Grid container md={10} justifyContent='center' sx={{margin:'0 auto'}}> */}
            <Grid><img src={NewsImage.src} className='rounded-corners'/></Grid>
            <Grid container justifyContent='space-between' py={3}> 
                <Grid item>
                    <Typography className='text' variant='h6' fontWeight='bold'>
                        Lorem ipsum dolor sit amet, consetetur sadipscing 
                        elitr
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography className='text' variant='body2' xs={{fontFamily:'poppings'}}>
                        Feb 15th, 2022 - 10:33
                    </Typography>
                </Grid> 
            </Grid>
            <Grid>
                <Typography className='text' textAlign='justify' variant='body2' xs={{fontFamily:'poppings'}}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum....... Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsumLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsumLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                </Typography>
            </Grid>
        {/* </Grid> */}</Grid>
        </DashboardLayout>
    )
}