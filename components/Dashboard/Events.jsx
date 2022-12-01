import { useState } from "react";
import { Divider, Grid, Typography } from "@mui/material";
import EventCard from "../EventCard";
import BannerImage from '../../images/Vectorlanding.png'
import Newscard from "../NewsCard";
import EventPageCard from "../EventPageCard";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


export default function Events(){
    const [value, onChange] = useState(new Date());
    console.log(value)

    return(
        <Grid>
            <Grid container justifyContent='space-around'>
                <Grid container md={7}  item>
                    <Grid container paddingY={4} alignItems='center'  justifyContent='space-around' className='light-green-bg rounded-corners'style={{maxHeight:'12vh'}}>
                        <Grid item>
                            <Typography fontWeight='bold' className='text' textAlign='center'>
                                18
                            </Typography>
                            <Typography fontWeight='400' className='text' variant='subtitle2'>
                                National Events
                            </Typography>
                        </Grid>
                        {/* <Divider orientation='horizontal' /> */}
                        <Grid item className='dark-green-bg' sx={{width:'0.1px', height:'35px' }}>  
                        </Grid>

                        <Grid item>
                            <Typography fontWeight='bold' className='text' textAlign='center'>
                                18
                            </Typography>
                            <Typography fontWeight='400' className='text' variant='subtitle2'>
                                State Events
                            </Typography>
                        </Grid>
                        <Grid item className='dark-green-bg' sx={{width:'0.1px', height:'35px' }}>  
                        </Grid>
                        <Grid item>
                            <Typography fontWeight='bold' className='text' textAlign='center'>
                                18
                            </Typography>
                            <Typography fontWeight='400' className='text' variant='subtitle2'>
                                Members Events
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid>fdfd</Grid>
                   
                    {/* <Grid container> fhkfhdk</Grid> */}
                </Grid> 
                <Grid md={4}  padding={2} item>
                    <Calendar 
                    onChange={onChange}  
                    value={value} 
                    minDate={new Date()}
                    className='light-grey-bg rounded-corners'
                    paddingY={3}
                    tileClassName='light-green-bg rounded-corners'
                    

                    // selectRange={[new Date(2022, 2, 26), new Date(2022, 2, 28)]}
                   
                    defaultValue={[new Date(2022, 2, 26), new Date(2022, 2, 28)]}
                    />
                </Grid>
            </Grid>

            {/* <Typography fontWeight='bold' marginTop={4} marginLeft={2} className='text' variant='subtitle2'>
                                National Events
                            </Typography> */}

            <Grid container md={12}  justifyContent='space-around'>
                {/* <Grid md={3}> */}
                <Grid item md={4} >
                    <Typography fontWeight='bold' marginTop={4} marginLeft={2} className='text' variant='subtitle2'>
                        National Events
                    </Typography>
                    <EventPageCard
                        header='National Events'
                        date='Feb 15th, 2022 - 10:33 '
                        body='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
                        image={BannerImage}
                        btnText='Register to Attend'
                    />
                </Grid>

                <Grid item md={4}>
                    <Typography fontWeight='bold' marginTop={4} marginLeft={2} className='text' variant='subtitle2'>
                        State Events
                    </Typography>
                <EventPageCard
                    header='State Events'
                    date='Feb 15th, 2022 - 10:33 '
                    body='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
                    image={BannerImage}
                    btnText='Register to Attend'

                />
                </Grid>
                <Grid item md={4}>
                    <Typography fontWeight='bold' marginTop={4} marginLeft={2} className='text' variant='subtitle2'>
                        Member Events
                    </Typography>
                    {/* <Grid container> */}
                    <EventPageCard
                        header='Member Events'
                        date='Feb 15th, 2022 - 10:33 '
                        body='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
                        image={BannerImage}
                        btnText='Join'
                    />
                    {/* </Grid> */}
                    {/* <Grid container> */}
                    <EventPageCard
                        header='Member Events'
                        date='Feb 15th, 2022 - 10:33 '
                        body='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
                        image={BannerImage}
                        btnText='Join'
                    />
                    {/* </Grid> */}

                    {/* <Grid container> */}
                    <EventPageCard
                        header='Member Events'
                        date='Feb 15th, 2022 - 10:33 '
                        body='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed'
                        image={BannerImage}
                        btnText='Join'
                    />
                    {/* </Grid> */}
                </Grid>
                {/* </Grid> */}
            </Grid>
        </Grid>
    )
}