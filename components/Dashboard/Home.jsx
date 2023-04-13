import { Grid, Typography, Button } from "@mui/material"
import  AccountBalanceWalletRounded  from "@mui/icons-material/AccountBalanceWalletRounded";
import NewsImage from '../../images/Vectorlanding.png'
import EventCard from "../EventCard";
import Newscard from "../NewsCard";
import GreenButton from "../Buttonn";
import { Box } from "@mui/system";

export default function Home(props){
    return(
        <Grid>
            <Grid container md={12} justifyContent='space-around'>
            <Grid item md={3}>
              <GreenButton text='Exco Dashboard' radius='10px'
               textColor='white' paddingY={1} paddingX={1} bg='#2e3715'/>
            </Grid>
            <Grid item md={3} sm={10}>
              <GreenButton text='Committee Dashboard' radius='10px'
                textColor='white' paddingY={1} paddingX={1} bg='#2e3715'
              />
            </Grid>
            <Grid item md={3} sm={10}>
            <GreenButton text='Sub-Committee Dashboard' radius='10px'
               textColor='white' paddingY={1} paddingX={1} bg='#2e3715'/>
            </Grid>
          </Grid>
          <br/>
          
          <Grid container md={12} justifyContent='space-around'>
              <Grid item md={8} sm={12} sx={12} marginY={2} paddingBottom={2} className='light-green-bg rounded-corners'>
                <Grid container md={12}  justifyContent='space-between' marginX={3} marginY={2}>
                  <Grid item>
                    <Typography fontWeight='500'  className='text '>
                      Events Dashboard
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography fontWeight='400' className='text light-text'>
                      Aug 23, 2022
                    </Typography>
                  </Grid>
                </Grid>

                <Grid>
                  <Typography fontWeight='300' marginX={3} className='text '>
                    Alumni Thanksgiving Day 2022   -    Feb., 2 2022
                  </Typography>
                </Grid>

                <Grid md={4} marginRight={2} marginTop={2} style={{float:'right'}}>
                <GreenButton text='Register to Attend' radius='10px'
               textColor='white' paddingY={1} paddingX={2} bg='#2e3715'/>
                  {/* <Button variant='contained' size='small' className={[styles.button, 'button-lower'] }>Register to Attend</Button>    */}
                </Grid>

              </Grid>
              <Grid item md={3} sm={12} xs={12} className='light-green-bg rounded-corners' paddingY={3} >
                  <Grid container justifyContent='space-evenly'>
                  <Grid item>
                    <AccountBalanceWalletRounded/>
                  </Grid>
                  <Grid item>
                    <Typography fontWeight='bold' className='text'  >50,000</Typography>
                  </Grid>
                  <Grid container justifyContent='space-around'>
                    <Grid item md={8}>
                      <Typography fontWeight='normal' textAlign='center' className='text' >Oustanding</Typography>
                    </Grid>
                    <Grid item md={8}>
                    <br/>
                    <GreenButton text='Pay' radius='10px'
                      textColor='white' paddingY={1} paddingX={1} marginX={2} bg='#2e3715'/>
                      {/* <Button variant='contained' size='small' className={[styles.button, 'button-lower'] }>
                        Pay
                      </Button> */}
                    </Grid>
                  </Grid>
                  </Grid>
              </Grid>
          </Grid>


          {/* News */}

        <Grid container justifyContent='space-around'>
          <Grid container justifyContent='space-between' marginY={2} marginX={3} md={8}>
            <Grid item>
              <Typography className='text' fontWeight='500'>Latest AANI News</Typography>
            </Grid>
            <Grid item>
              <Typography className='text' fontWeight='500'>All News</Typography>
            </Grid>

            {/* New Details */}
            <Grid container justifyContent='space-between'>
               <Newscard 
                  title='Lorem ipsum.' 
                  image={NewsImage}
                  body='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.'
                  />
               <Newscard 
                  title='Lorem ipsum.' 
                  image={NewsImage}
                  body='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.'
                  />
            </Grid>

            {/* Exco Members */}

            
          </Grid>
          
          <Grid item md={3}  >
                  <br/>
              <Typography marginLeft={2} fontWeight='bold' marginBottom={1}>EXCO MEMBERS</Typography>
              <Grid container justifyContent='space-around'  className='light-grey-bg rounded-corners' padding={3}>
                  <Typography  className='text' fontWeight='300'  marginY={1}>Hon. Babalola John</Typography>
                  <Typography  className='text' fontWeight='300'  marginY={1}>Hon. Babalola John</Typography>
                  <Typography  className='text' fontWeight='300'  marginY={1}>Hon. Babalola John</Typography>
                  <Typography  className='text' fontWeight='300'  marginY={1}>Hon. Babalola John</Typography>
                  <Typography  className='text' fontWeight='300'  marginY={1}>Hon. Babalola John</Typography>
                  <Typography  className='text' fontWeight='300'  marginY={1}>Hon. Babalola John</Typography>
                  <Typography  className='text' fontWeight='300'  marginY={1}>Hon. Babalola John</Typography>
                  <Typography  className='text' fontWeight='300'  marginY={1}>Hon. Babalola John</Typography>
                  <Grid container>
                    <Button onClick={()=>props.setSelected(12)} style={{margin:'0 auto', textTransform:'capitalize'}} className='button-lower'>
                        See All</Button>
                </Grid>
              </Grid>
              
          </Grid>
        </Grid>
        <br/>
        <Typography marginLeft={2} className='text' >Upcoming Members Events</Typography>

        <Grid container justifyContent='space-between' padding={2} className='rounded-corners light-grey-bg'>
          {/* <br/> */}
          <EventCard 
          title='Alumni Thanksgiving Day 2022'
          body='The Annual Alumni Thanksgiving Day 2022'
          />

          <EventCard 
            title='Alumni Thanksgiving Day 2022'
            body='The Annual Alumni Thanksgiving Day 2022'
          />
          <EventCard 
            title='Alumni Thanksgiving Day 2022'
            body='The Annual Alumni Thanksgiving Day 2022'
          />
        </Grid>

        </Grid>
    )
}