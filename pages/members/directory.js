import { Grid,TextField, Button, Table, TableRow,TableHead, TableBody, TableCell, Typography } from "@mui/material";
import GreenButton from "../../components/Buttonn";
import { SearchRounded } from "@mui/icons-material";
import HeadText from "../../components/Dashboard/DashboardHead";
import { DashboardLayout } from "../../components/Dashboard/Member/Sidebar/dashboard-layout";

export default function Directory(){

    const members=[
        {id:1, name:'Ade Bolaji', email:'adebolajo@gmail.com', phone:'0804384344', address:'12, john street, Ajah, Lagos',Occupation:'Financial Manager', course:'Financial Management', period:'2001-2002'},
        {id:2, name:'Abubakar Gumi', email:'gumiAb@gmail.com', phone:'0815343444', address:'101, Willson street, V/I, Lagos',Occupation:'Construction Head', course:'Construction Management', period:'2001-2002'},
        {id:3, name:'Chukwu  James', email:'chucks@gmail.com', phone:'0803845477', address:'98, badmus street, P/H, Lagos',Occupation:'Product Manager', course:'Product Management', period:'2001-2002'},
        {id:4, name:'Jonathan Hayce', email:'joehay@gmail.com', phone:'0807768888', address:'219, Ogbabi Close, Ikeja, Lagos',Occupation:'Financial Manager', course:'Financial Management', period:'2001-2002'},
        {id:5, name:'Biodun John', email:'bjohn@gmail.com', phone:'0800095884', address:'66, Sims road, alausa, Lagos',Occupation:'Financial Manager', course:'Financial Management', period:'2001-2002'},
        {id:6, name:'Musa Lawal', email:'lawalM@gmail.com', phone:'0804384344', address:'234, lekki Epe Experess, Lagos',Occupation:'Financial Manager', course:'Financial Management', period:'2001-2002'},
        {id:7, name:'Eberechi Princess', email:'eber@gmail.com', phone:'0918837744', address:'12, john street, Ikorodu, Lagos',Occupation:'Financial Manager', course:'Financial Management', period:'2001-2002'},
        {id:8, name:'Eberechi Princess', email:'eber@gmail.com', phone:'0918837744', address:'12, john street, Ikorodu, Lagos',Occupation:'Financial Manager', course:'Financial Management', period:'2001-2002'},
        {id:9, name:'Eberechi Princess', email:'eber@gmail.com', phone:'0918837744', address:'12, john street, Ikorodu, Lagos',Occupation:'Financial Manager', course:'Financial Management', period:'2001-2002'},
        {id:10, name:'Eberechi Princess', email:'eber@gmail.com', phone:'0918837744', address:'12, john street, Ikorodu, Lagos',Occupation:'Financial Manager', course:'Financial Management', period:'2001-2002'},
    ]
    return(
        <DashboardLayout>
        <Grid >
            <HeadText text='Members Directory'/>
            <br/>
            <Grid container justifyContent='space-around' md={12} marginTop={5}  >
                <Grid item md={8}>
                    <Grid container>
                        <Grid item md={8}>
                            <TextField 
                            placeholder='Search'
                            label='Search member by name or Occupation'
                            size='small'
                            type= 'text'
                            style={{width:'98%', backgroundColor:'white', boxShadow:'inherit', border:'none' }}

                            />
                            {/* <Button paddingLeft={3} variant='contained' style={{backgroundColor:'#365C2A'}} >
                                <SearchRounded/>
                            </Button> */}
                        </Grid>
                        <Grid item>
                            <Button  paddingY={1} variant='contained' style={{backgroundColor:'#365C2A'}} >
                                <SearchRounded/>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                    <Grid>
                        <Typography className='text'>1 of 20</Typography>
                    </Grid>
                </Grid>
                <br/>
                <br/>
                <Grid md={11} style={{margin: '0 auto'}}>
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
                            { members ? members.map((e,index)=>
                            <TableRow key={index}>
                                <TableCell className='light-text'>{e.id}</TableCell>
                                <TableCell className='light-text'>{e.name}</TableCell>
                                <TableCell className='light-text'>{e.email}</TableCell>
                                <TableCell className='light-text'>{e.phone}</TableCell>
                                <TableCell className='light-text'>{e.address}</TableCell>
                                <TableCell className='light-text'>{e.Occupation}</TableCell>
                                <TableCell className='light-text'>{e.course}</TableCell>
                                <TableCell className='light-text'>{e.period}</TableCell>
                            </TableRow>) :
                            <Typography>No data Available</Typography>
                            }
                            {/* <TableRow >
                                <TableCell className='light-text'>2</TableCell>
                                <TableCell className='light-text'>Ade Bolaji</TableCell>
                                <TableCell className='light-text'>deboyeJohn@gmail.com</TableCell>
                                <TableCell className='light-text'>08023823812</TableCell>
                                <TableCell className='light-text'>12, Allen Avenue, Ikeja Lagos</TableCell>
                                <TableCell className='light-text'>Financial Advisor</TableCell>
                                <TableCell className='light-text'>Financial Advisory</TableCell>
                                <TableCell className='light-text'>1998 - 1999</TableCell>
                            </TableRow> */}
                        </TableBody>
                    </Table>
                </Grid>
  
        </Grid>
        </DashboardLayout>
    )
}