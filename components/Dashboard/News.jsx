import { Grid, Typography } from "@mui/material";
import Link from 'next/link'
import NewImage from '../../images/Vectorlanding.png';
import ChildNewsCard from "../ChildNewsCard";

export default function News(props){
    return(
        <Grid>
            <Grid className='light-green-bg rounded-corners'>
               <Typography variant='caption' fontWeight='400' marginX={2} marginTop={1}>
                    Feb 15th, 2022 - 10:33 
               </Typography>
               <Grid container justifyContent='space-around'>
                <Grid item  md={3}  paddingLeft={2}  className='rounded-corners' >
                  <img src={NewImage.src} height='700px'  className='rounded-corners' />
                </Grid>

                <Grid item md={9} padding={3}>
                    <Typography fontWeight='500' variant="subtitle2">
                        dsdsdsdsdsds dsddsd dsdsdsdsdsdd dsdsdss dssdsdsds sdsdssds
                    </Typography>
                    <Typography fontWeight='300' variant='subtitle2'>
                        ssdsdsdsdsds dsddsd dsdsdsdsdsdd dsdsdss dssdsdsds sdsdssdsdsdsdsdsdsds dsddsd dsdsdsdsdsdd dsdsdss dssdsdsds sdsdssdsdsdsdsdsdsds dsddsd 
                        dsdsdsdsdsdd dsdsdss dssdsdsds sdsdssds dsdsdsdsdsdd dsdsdss dssdsdsds sdsdssdsdsdsdsdsdsdd dsdsdss dssdsdsds sdsdssds...
                        <Typography paddingLeft={2} className='text' fontWeight='600' variant='caption'><Link href='/'><div className='nav-link'>Read More</div></Link></Typography> 
                   </Typography>                    
                </Grid>
               </Grid>
            </Grid>
            
            <Typography variant='h6' className='text' marginTop={2}>
                AANI NEWS
            </Typography>
            <Grid container>
                <ChildNewsCard 
                    date='Feb 15th, 2022 - 10:33 '
                    image={NewImage}                
                    title='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sedLorem ipsum dolor sit '
                    click={()=>props.setSelected(10)}
                />

                <ChildNewsCard 
                    date='Feb 15th, 2022 - 10:33 '
                    image={NewImage}                
                    title='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sedLorem ipsum dolor sit '
                    click={()=>props.setSelected(10)}

                />
                <ChildNewsCard 
                    date='Feb 15th, 2022 - 10:33 '
                    image={NewImage}                
                    title='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sedLorem ipsum dolor sit '
                    click={()=>props.setSelected(10)}

                />                
            </Grid>
        </Grid>
    )
}