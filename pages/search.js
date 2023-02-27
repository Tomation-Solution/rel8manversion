import Banner from '../images/shortBanner.png'
import { Grid, TextField, Typography, Button, Table, TableRow,TableHead, TableBody, TableCell } from "@mui/material"
import SearchRounded from "@mui/icons-material/SearchRounded"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function Search(){
    return(
        <Grid>
            <Navbar/><br/><br/><br/>
            <img src={Banner.src}/>
            <br/>
            <br/>
            {/* <Typography className='text' textAlign='center' fontWeight='bolder' variant='h5' zIndex='9000' marginTop={-2}  color='whitesmoke'>
                MEMBERS</Typography> */}
                <Grid container md={8} marginTop={5}  style={{margin:'0 auto'}}>
                    <Grid item md={10}>
                        <TextField 
                        placeholder='Search'
                        label='Search member by name or Occupation'
                        size='small'
                        type= 'text'
                        style={{width:'98%', backgroundColor:'white', boxShadow:'inherit' }}

                        />
                    </Grid>
                    <Grid item>
                        <Button paddingLeft={3} variant='contained' style={{backgroundColor:'#365C2A'}} >
                            <SearchRounded/>
                        </Button>
                    </Grid>
                </Grid>
                <br/>
                <br/>
                <Grid md={10} style={{margin: '0 auto'}}>
                    <Table aria-label="strip table">
                        <TableHead>
                            <TableCell><b>S/N</b></TableCell>
                            <TableCell><b>Name</b></TableCell>
                            <TableCell><b>Email</b></TableCell>
                            <TableCell><b>Phone</b></TableCell>
                            <TableCell><b>Address</b></TableCell>
                            <TableCell><b>Occupation</b></TableCell>
                            <TableCell><b>Course of Study</b></TableCell>
                            <TableCell><b>Period of Study</b></TableCell>
                        </TableHead>
                        <TableBody>
                            <TableRow >
                                <TableCell className='light-text'>1</TableCell>
                                <TableCell className='light-text'>Ade Bolaji</TableCell>
                                <TableCell className='light-text'>deboyeJohn@gmail.com</TableCell>
                                <TableCell className='light-text'>08023823812</TableCell>
                                <TableCell className='light-text'>12, Allen Avenue, Ikeja Lagos</TableCell>
                                <TableCell className='light-text'>Financial Advisor</TableCell>
                                <TableCell className='light-text'>Financial Advisory</TableCell>
                                <TableCell className='light-text'>1998 - 1999</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell className='light-text'>2</TableCell>
                                <TableCell className='light-text'>Ade Bolaji</TableCell>
                                <TableCell className='light-text'>deboyeJohn@gmail.com</TableCell>
                                <TableCell className='light-text'>08023823812</TableCell>
                                <TableCell className='light-text'>12, Allen Avenue, Ikeja Lagos</TableCell>
                                <TableCell className='light-text'>Financial Advisor</TableCell>
                                <TableCell className='light-text'>Financial Advisory</TableCell>
                                <TableCell className='light-text'>1998 - 1999</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
                <br/>
                <br/>
                <br/>
                <Footer/>
        </Grid>
    )
} 