import { useState ,useEffect} from "react";
import { ArrowDropDown } from "@mui/icons-material";
import {Select,FormGroup, FormControlLabel,FormControl,InputLabel,Grid, TextField, Menu, MenuItem, Typography, Checkbox } from "@mui/material";
// import HeadText from "../../../Dashboard/DashboardHead";
import HeadText from "../../Dashboard/DashboardHead";
import GreenButton from "../../Buttonn";
import MarkoBtn from "../../MarkoBtn"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import MultipleSelect from "../../forms/multiSelectCheckBox";
import {CreateDUeType} from "../../../redux/due/dueApi";
import SelectWithLabel from "../../forms/SelectWithLable";
import {useAppDispatch,useAppSelector} from "../../../redux/hooks";
import { selectDue } from "../../../redux/due/dueSlice";
import { createDueApi,getDueApi } from "../../../redux/due/dueApi";
import useToast from "../../../hooks/useToast"
import Spinner from "../../Spinner";
const schema = yup.object().shape({
   name:yup.string().required(),
   re_occuring:yup.boolean().required(),
   is_for_excos:yup.boolean().required(),
   amount:yup.string().required(),
   startDate:yup.string().required(),
   startTime:yup.string().required(),
   scheduletype:yup.string().required(),
   schedule:yup.mixed(),
    for_chapters:yup.boolean().required(),

   
})
export default function AddDue(props){
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl1, setAnchorEl1] = useState(null);
    const open = Boolean(anchorEl);
    const open1 = Boolean(anchorEl1);
    const dispatch = useAppDispatch();
    const  { error,status} = useAppSelector(selectDue)
    const {notify} = useToast()

    const {
        watch, register,handleSubmit, formState: { errors },setValue,
    } = useForm<CreateDUeType>({resolver:yupResolver(schema)})
    // reference https://react-hook-form.com/api/useform/watch
    const watchFields =watch(['scheduletype'])
    const submitData:SubmitHandler<CreateDUeType>= (data)=>{
        console.log({
            "submitted data":data
        })

        dispatch(createDueApi(data))
    }
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClose1 = () => {
        setAnchorEl1(null);
        // alert(val)
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };
    console.log({errors,status,error})
    useEffect(()=>{
        if(status==="created"){
            notify("Due Was Created Successfull");
            dispatch(getDueApi())
        }

    },[status])
    return (
        <Grid container >
            <HeadText text='Add Due'/>
            <form
            //  onSubmit={}
            >
                {status==='loading'&&<Spinner/>}
            <TextField
                variant='standard'
                label="Due Name"
                fullWidth
                InputLabelProps={{className:'light-text'}}
                {...register("name")}
            />

            <TextField
                variant='standard'
                type='date'
                label="Start Date"
                fullWidth
                InputLabelProps={{className:'light-text'}}
                {...register("startDate")}
            />
                        <TextField
                variant='standard'
                type='time'
                label="Start time"
                fullWidth
                InputLabelProps={{className:'light-text'}}
                {...register("startTime")}

            />

<TextField
                variant='standard'
                type='number'
                label="Amount"
                fullWidth
                InputLabelProps={{className:'light-text'}}
                {...register("amount")}
            />

           

        
            {/* <SelectWithLabel Label="User Category" name="is_for_excos" setValue={setValue} 
            options={[
                {name:"Exco",value:"exco"},
                {name:"All Memebers",value:"memebers"}
            ]}
            />                   */}
        
    
            <SelectWithLabel Label="Schedule Type" name="scheduletype" setValue={setValue} 
            options={[
                {name:"Day of Week",value:"day_of_week"},
                {name:"Month of Year",value:"month_of_year"}
            ]}
            />  
           
        

            {/* <TextField
                variant='standard'
                label="Course of Study"
                fullWidth
                InputLabelProps={{className:'light-text'}}
            /> */}



{watchFields[0]==="day_of_week" && <MultipleSelect label="Day Of Week" 
name="schedule" setValue={setValue}
option={[
    {name:"Sun",value:"0"},
    {name:"Mon",value:"1"},
    {name:"Tue",value:"2"},
    {name:"Wed",value:"3"},
    {name:"Thurs",value:"4"},
    {name:"Fri",value:"5"},
]}
/>}
 
 
{
    watchFields[0]==="month_of_year"&&<MultipleSelect label="Month Of Year" 
    name="schedule"
    // name="month_of_year"
     setValue={setValue}
    option={[
        {name:"Jan",value:"0"},
        {name:"Feb",value:"1"},
        {name:"Mar",value:"2"},
        {name:"Apri",value:"3"},
        {name:"May",value:"4"},
        {name:"Jun",value:"5"},
        {name:"Jul",value:"6"},
        {name:"Aug",value:"7"},
        {name:"Sep",value:"8"},
        {name:"Oct",value:"9"},
        {name:"Nov",value:"10"},
        {name:"Dec",value:"11"},
    ]}
    />
}
 
{/* <SelectTime/> */}
<Grid container>
               <Grid item>
                    <Typography>
                        <Checkbox title="re_occuring" {...register("re_occuring")}/>
                        Recurrent
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography>
                        <Checkbox title="for_chapters" {...register("for_chapters")} />
                        For Chapters
                    </Typography>
                </Grid>

                <Grid item>
                    <Typography>

                        <Checkbox title="is_for_excos" {...register("is_for_excos")} />
                        Only Excos 
                    </Typography>
                </Grid>
            </Grid>



               {/* <MarkoBtn text={"Hello Submit"}></MarkoBtn> */}
               </form>
            <Grid md={12} mt={1} container justifyContent='space-around'>
                
                <GreenButton t text={status==='loading'?'Creating':'Save'}
                click={handleSubmit(submitData)}
                textColor='#fff' paddingY={1} radius={3} bg='#203719' paddingX={7} />
                <GreenButton text='Cancel' textColor='#203719' paddingY={1} radius={3} bg='#E1F1DC' paddingX={7} click={()=>props.handleClose()} />
            </Grid>
        </Grid>
    )
}