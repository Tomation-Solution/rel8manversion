import { useState } from "react";
import { ArrowDropDown } from "@mui/icons-material";
import { Grid, TextField, Menu, MenuItem, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import HeadText from "../../Dashboard/DashboardHead";
import GreenButton from "../../Buttonn";
import axios from "../../../helpers/axios";
import useToast from "../../../hooks/useToast";
import { useAppDispatch } from "../../../redux/hooks";
import { updateEventWithoutAsync } from "../../../redux/events/eventSlice";
import Spinner from "../../Spinner"


type Prop ={
    event_id:number
}
const  ChangeEventStatus = ({event_id}:Prop)=>{
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl1, setAnchorEl1] = useState(null);
    const [data, setData] = useState<string>('false');
    const dispatch = useAppDispatch()
    const {notify}  = useToast()
    const [loading,setLoading] = useState(false)


    const onSubmit =async()=>{
        let submitted_data  = {
            "switch_on":data==='true'?true:false,
            "event_id":event_id
         }

        setLoading(true)
        try{
            const resp = await axios.post(`/tenant/event/eventview/activate_event/`,submitted_data)
            // if(resp.data)
            setLoading(false)
            if(resp.status === 200){
                    // update the data
                    dispatch(updateEventWithoutAsync({data:resp.data.data}))
                    notify('Active Status Updated','success')
            }

        }catch(err:any){
            setLoading(false)
            console.log({err})
            notify('Some Error Occurred','error')

        }
    }
    return (
        <Grid container >
            <HeadText text='Change Event Status' 

            />
            {loading&&<Spinner/>}
            <br />
            <FormControl fullWidth
                style={{'margin':'1rem 0'}}
            >
  {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={data}
    label=""
    onChange={(e)=>setData(e.target.value)}
  >
    <MenuItem value={'false'}>False</MenuItem>
    <MenuItem value={'true'}>True</MenuItem>
  </Select>
</FormControl>

            <Grid md={12} mt={1} container justifyContent='space-around'>
                <GreenButton click={()=>onSubmit()} text='Save' textColor='#fff' paddingY={1} radius={3} bg='#203719' paddingX={7} />
                {/* <GreenButton text='Cancel' textColor='#203719' bg='#E1F1DC' paddingY={1} paddingX={7} click={()=>handleClose()} /> */}
            </Grid>
        </Grid>
    )
}

export default ChangeEventStatus