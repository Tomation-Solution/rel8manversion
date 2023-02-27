import { useState } from "react";
import  ArrowDropDown  from "@mui/icons-material/ArrowDropDown";
import { Grid, TextField, Menu, MenuItem, Typography, Checkbox } from "@mui/material";
import HeadText from "../../Dashboard/DashboardHead";
import GreenButton from "../../Buttonn";


export default function EditNews(props){
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl1, setAnchorEl1] = useState(null);
    const [category, setCategory] = useState('Select Category');
    const [porfolio, setPorfolio] = useState('Select Event Type');
    const open = Boolean(anchorEl);
    const open1 = Boolean(anchorEl1);

    const handleClose = (e) => {
        setAnchorEl(null);
        // alert(e.target.innerText)
        setPorfolio(e.target.innerText)
        
    };

    const handleClose1 = (e) => {
        setAnchorEl1(null);
        setCategory(e.target.innerText)
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };

    return (
        <Grid container >
            <HeadText text='Edit Due'/>
            <TextField
                variant='standard'
                label="Due Name"
                fullWidth
                InputLabelProps={{className:'light-text'}}
            />

            <TextField
                variant='standard'
                label="Amount"
                type={"number"}
                fullWidth
                InputLabelProps={{className:'light-text'}}
            />
            <Grid my={2} py={1} container sx={{borderRadius:1}} className='light-grey-bg'>
            <Typography textAlign='center' id="demo-positioned-menu" onClick={handleClick1 }  className='light-text nav-link' variant="body2" component="div" sx={{ flexGrow: 1 }}>
                <Grid container px={1} alignItems='center' justifyContent='space-between' >{category}<ArrowDropDown />
                </Grid>
            </Typography>
            <Menu id="basic-menu" sx={{width:'100%'}} anchorEl={anchorEl1} open={open1} onClose={handleClose1}
                MenuListProps={{'aria-labelledby': 'basic-button',}}>
                <MenuItem  value='committee' onClick={handleClose1}>Committee</MenuItem>
                <MenuItem  value='Exco' onClick={handleClose1}>Exco</MenuItem>
                <MenuItem  value='sub-committee' onClick={handleClose1}>Sub Committee</MenuItem>
               
            </Menu>
            </Grid>
            
            <Grid container justifyContent='space-around'>
                <Grid item>
                    {/* <Checkbox title="uo" label='fdfdfd'/> */}
                    <Typography>
                        <Checkbox title="uo" label='fdfdfd'/>
                        Recurrent
                    </Typography>
                </Grid>

                <Grid item>
                    <Typography>
                        <Checkbox title="uo" label='fdfdfd'/>
                        One time
                    </Typography>
                </Grid>
            </Grid>

            <Grid md={12} mt={1} container justifyContent='space-around'>
                <GreenButton text='Save' textColor='#fff' paddingY={1} radius={3} bg='#203719' paddingX={7} />
                <GreenButton text='Cancel' textColor='#203719' bg='#E1F1DC' paddingY={1} paddingX={7} click={()=>props.handleClose()} />
            </Grid>
        </Grid>
    )
}