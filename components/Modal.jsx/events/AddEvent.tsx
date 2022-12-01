import { useEffect, useState } from "react";
import { ArrowDropDown } from "@mui/icons-material";
import { Checkbox,Grid, TextField, Menu, MenuItem, Typography } from "@mui/material";
// import HeadText from "../../../Dashboard/DashboardHead";
import HeadText from "../../Dashboard/DashboardHead";
import GreenButton from "../../Buttonn";
import SelectWithLabel from "../../forms/SelectWithLable";
import SelectWithExternalLogic from "../../forms/SelectWithExternalLogic"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import {selectEvent } from  "../../../redux/events/eventSlice";
import {EventType,creatEventsApi,setEventStateToIdle, getEventsApi2} from  "../../../redux/events/eventsApi";
import MultipleSelect from "../../forms/multiSelectCheckBox";
import {useAppDispatch,useAppSelector,} from "../../../redux/hooks"
import MarkoBtn from "../../MarkoBtn"
import useToast from "../../../hooks/useToast"
import Spinner from "../../Spinner";

// schedule only happens if it re-occuring

/*
work on some things like
    serialize the submitted data before u submit
    and actually submit then use redux cyle like geting after submitting u get
    
*/
const schema = yup.object().shape({
    'address':yup.string(),
    "is_paid_event":yup.boolean(),
    "re_occuring":yup.boolean().default(function (){
        return false
    }),
    "is_virtual":yup.boolean(),
    "is_active":yup.boolean().default(function (){
        return false
    }),
    "startDate":yup.string().required(),
    "startTime":yup.string().required(),
    "scheduletype":yup.string(),
    "schedule":yup.mixed(),
    "name":yup.string().required(),
    "commitee_name":yup.string().default(function (){
        return  "..."
    }),
    "is_commitee":yup.boolean(),
    "mintues":yup.string().required().default(function (){
        return "00"
    }),
    "hour":yup.string().required().default(function (){
        return "08"
    }),
    "is_for_excos":yup.boolean(),
    
    "amount":yup.number().default(function (){
        return 0.00
    }),

    
})

export default function AddEvent(props){
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl1, setAnchorEl1] = useState(null);
    const open = Boolean(anchorEl);
    const open1 = Boolean(anchorEl1);
    const dispatch = useAppDispatch();
    const {notify} = useToast()

    const {  
        data,status,error
    } = useAppSelector(selectEvent);

    const  {
    watch, register,handleSubmit, formState: { errors },setValue,
    } = useForm<EventType>({resolver:yupResolver(schema)})
    const watchFields = watch(["re_occuring","scheduletype","is_paid_event","is_commitee"])
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

    const  submitData:SubmitHandler<EventType>=(data)=>{
        let new_data:any ={}
        new_data = {...data}
        if(!data?.scheduletype){
            new_data['scheduletype']="day_of_week"
            new_data["schedule"] =['0']
        }


        dispatch(creatEventsApi(new_data))
    }
    useEffect(()=>{
        if(status==="created"){
            notify("Event Was Created Successfull",'success');
            dispatch(setEventStateToIdle())
        }
    },[status])

    return (
        <form
         onSubmit={handleSubmit(submitData)
         }>
                    {status==='loading'&&<Spinner/>}

        <Grid container >
            <HeadText text='Add Event'/>
            <TextField
                variant='standard'
                label="Event Name"
                fullWidth
                InputLabelProps={{className:'light-text'}}
                
                {...register("name")}
            />

            <TextField
                variant='standard'
                type='date'
                label="Event Date"
                fullWidth
    style={{'margin':'.9rem 0'}}
                InputLabelProps={{className:'light-text'}}
                {...register("startDate")}
            />
            <TextField
                variant='standard'
                type='time'
                label="Event Time"
                fullWidth
    style={{'margin':'.9rem 0'}}

                InputLabelProps={{className:'light-text'}}
                {...register("startTime")}
            />


           
<SelectWithExternalLogic
  name="is_paid_event" 
  Label="Event Type"
  options={[
      {name:"Paid",value:"paid"},
      {name:"Free",value:"free"},
  ]}
  customFunc={(currentValue)=>{
      if(currentValue =="paid"){
          setValue("is_paid_event",true)
      }

      if(currentValue =="free"){
        setValue("is_paid_event",false)
    }

  }}/>


  {
      watchFields[2]===true?
      <TextField
                variant='standard'
                // type='time'
                label="Amount"
    style={{'margin':'.9rem 0'}}

                fullWidth
                InputLabelProps={{className:'light-text'}}
                required={true}
                {...register("amount")}
            />:""
  }



<SelectWithExternalLogic
  name="is_paid_event" 
  Label="Event for which User Type"
  options={[
      {name:"Exco",value:"is_for_excos"},
    //   {name:"Commitee",value:"is_commitee"},
      {name:"All Members",value:"is_all"},
  ]}
  customFunc={(currentValue)=>{
      if(currentValue =="is_for_excos"){
          setValue("is_for_excos",true)
          setValue("is_commitee",false)
      }

      if(currentValue =="is_commitee"){
        setValue("is_commitee",true)//display committee name
        setValue("is_for_excos",false)
        
    }

     if(currentValue =="is_all"){
        setValue("is_for_excos",false)
        setValue("is_commitee",false)

     }


  }}/>
{
    watchFields[3]===true?
    <TextField
    variant='standard'
    // type='time'
    label="Commitee name"
    fullWidth
    style={{'margin':'.9rem 0'}}
    InputLabelProps={{className:'light-text'}}
    {...register("commitee_name")}
/>:""
}

            <TextField
                variant='outlined'
                rows={2}
                multiline={true}
                label="Address"
                fullWidth
                InputLabelProps={{className:'light-text'}}
                {...register('address')}
            />


<br />            
            <Grid container>
                <Grid item>
                    <Typography>
                        <Checkbox title="is_virtual" {...register("is_virtual")}/>
                        is virtual
                    </Typography>
                </Grid>

                <Grid item>
                    <Typography>
                        <Checkbox title="is_active" {...register("is_active")}/>
                        is Activate
                    </Typography>
                </Grid>

            </Grid>
            
            
            
            {
    watchFields[0]===true?
    <>
    <SelectWithLabel Label="Select Category" 
            setValue={setValue}
            name="scheduletype" 
            options={[
                {name:"Day Of Week",value:"day_of_week"},
                {name:"Day Of Year",value:"month_of_year"},
            ]}
            />




{watchFields[1]==="day_of_week" && <MultipleSelect label="Day Of Week" 
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
    watchFields[1]==="month_of_year"&&<MultipleSelect label="Month Of Year" 
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
            </>
            :""
}            
            
            

            
{/* <MarkoBtn text={"Hello Submit"}></MarkoBtn> */}
            
            
            <Grid md={12} mt={1} container justifyContent='space-around'>
<GreenButton click={handleSubmit(submitData)} text={status==="loading"?"Creating":'Save'} textColor='#fff' paddingY={1} radius={3} bg='#203719' paddingX={7} />
                <GreenButton text='Cancel' textColor='#203719' paddingY={1} radius={3} bg='#E1F1DC' paddingX={7} click={()=>props.handleClose()} />
            </Grid>
            
        </Grid>

        </form>
    )
}