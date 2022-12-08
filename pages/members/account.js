import Image from "next/image"
import BannerImage from '../../images/Vectorlanding.png';
import { Grid, Table, TableRow,TableHead, TableBody, TableCell, Typography } from "@mui/material";
import IconCard from "../../components/IconCard";
import GreenButton from "../../components/Buttonn";
import { DashboardLayout } from "../../components/Dashboard/Member/Sidebar/dashboard-layout";


export default function Account(props){
    return(
        <DashboardLayout>
        <Grid>
            <Image src={BannerImage}/>
            <br/>
            <br/>
            <Grid container md={12} justifyContent='space-around'>
                <Grid item md={9}>
                    <IconCard/>
                </Grid>
                <Grid item>
                <GreenButton  text='Pay All' bg='#04a9fb' radius='10px' 
                    paddingY={1} paddingX={4} textColor='white'/>
                </Grid>
            </Grid>
            <br/>
            
            <Grid container md={10} style={{margin: '0 auto'}}>
                <br/>
                {/* <br/> */}
                <Typography fontWeight='bold' marginY={2} className='text'>Account Details</Typography>
                    <Table aria-label="strip table">
                        <TableHead>
                            <TableCell><b>S/N</b></TableCell>
                            <TableCell><b>Reason</b></TableCell>
                            <TableCell><b>Amount</b></TableCell>
                            <TableCell><b>Date</b></TableCell>
                            <TableCell><b>Action</b></TableCell>
                            {/* <TableCell><b>Occupation</b></TableCell>
                            <TableCell><b>Course of Study</b></TableCell>
                            <TableCell><b>Period of Study</b></TableCell> */}
                        </TableHead>
                        <TableBody>
                            <TableRow >
                                <TableCell className='light-text'>1</TableCell>
                                <TableCell className='light-text'>Annual Exco Due</TableCell>
                                <TableCell className='light-text'>N 213,000</TableCell>
                                <TableCell className='light-text'>11-12-2022</TableCell>
                                <TableCell style={{width:'20%'}} >
                                    <GreenButton marginX={2} text='Pay' bg='#04a9fb' radius='10px' 
                                    paddingY={1} paddingX={1} textColor='white'/>
                                </TableCell>
                                {/* <TableCell className='light-text'>Financial Advisor</TableCell>
                                <TableCell className='light-text'>Financial Advisory</TableCell>
                                <TableCell className='light-text'>1998 - 1999</TableCell> */}
                            </TableRow>
                            <TableRow >
                                <TableCell className='light-text'>2</TableCell>
                                <TableCell className='light-text'>Ade Bolaji</TableCell>
                                <TableCell className='light-text'>N 133,000</TableCell>
                                <TableCell className='light-text'>11-12-2022</TableCell>
                                <TableCell className='light-text'>
                                    <GreenButton marginX={2} text='Reciept' bg='#04a9fb' radius='10px' 
                                    paddingY={1} paddingX={1} textColor='white' click={()=>props.setSelected(11) }/>
                                </TableCell>
                                {/* <TableCell className='light-text'>Financial Advisor</TableCell>
                                <TableCell className='light-text'>Financial Advisory</TableCell>
                                <TableCell className='light-text'>1998 - 1999</TableCell> */}
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
        </Grid>
        </DashboardLayout>
    )
}