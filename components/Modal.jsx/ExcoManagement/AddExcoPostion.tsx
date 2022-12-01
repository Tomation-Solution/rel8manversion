import { useEffect, useState } from "react";
import { ArrowDropDown } from "@mui/icons-material";
import { Grid, TextField, Menu, MenuItem, Typography  ,Checkbox } from "@mui/material";
// import HeadText from "../../../Dashboard/DashboardHead";
import HeadText from "../../Dashboard/DashboardHead";
import GreenButton from "../../Buttonn";
import SelectWithExternalLogic from '../../forms/SelectWithExternalLogic'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import useToast from "../../../hooks/useToast";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectManage_assigning_exco } from "../../../redux/ManageAssigningExco/ManageAssigningExcoSlice";
import { createExcoPosition, createManageAssigningExcoParamType } from "../../../redux/ManageAssigningExco/ManageAssigningExcoApi";
    
const schema = yup.object().shape({
    name:yup.string().required(),
    can_upload_min:yup.boolean().default(function (){
        return false
    }),
    about:yup.string().required(),
})
export default function AddExcoPostion(props:any){
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl1, setAnchorEl1] = useState(null);
    const open = Boolean(anchorEl);
    const open1 = Boolean(anchorEl1);
    const {notify} = useToast()
    const dispatch = useAppDispatch()

    const  {
        watch, register,handleSubmit, formState: { errors },setValue,
        } = useForm<createManageAssigningExcoParamType>({resolver:yupResolver(schema)})
    const {status} = useAppSelector(selectManage_assigning_exco)
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

    const onSubmit:SubmitHandler<createManageAssigningExcoParamType> = (data):void=>{
            console.log({
                'SUbmitted Data':data,
            })
            dispatch(createExcoPosition(data))
    }
    useEffect(()=>{
        if(errors.name){
            notify(errors.name?.message)
        }
        if(errors.about){
            notify(errors.about?.message)
        }
        if(errors.can_upload_min){
            notify(errors.can_upload_min?.message)
        }
    },[errors])
    useEffect(()=>{
        if(status==='created'){
            notify('Created Succeffully','success')
        }
    },[status])
    return (
          
  <form  >
                <Grid container >
                    <HeadText text='Add Exco Postion'/>
                    

                    <TextField
                        variant='standard'
                        label="Title"
                        fullWidth
                        InputLabelProps={{className:'light-text'}}
                        style={{'margin':'.8rem 0'}}
                        {...register('name')}
                    />

                    {/* <TextField
                        variant='standard'
                        type='date'
                        label="Amount"
                        fullWidth
                        InputLabelProps={{className:'light-text'}}
                    /> */}

        
                    <SelectWithExternalLogic
                    name="can_upload_min" 
                    Label="Ability to upload Minute"
                    
                    options={[
                        {name:"Can Upload Minute ",value:"true"},
                        // {name:"For Committe",value:"is_committe"},
                        {name:"Can Not Upload Minute",value:"false"},
                    ]}
                    customFunc={(currentValue)=>{
                        if(currentValue =="false"){
                            setValue("can_upload_min",false)
                        }

                        if(currentValue =="true"){
                            setValue("can_upload_min",true)
                        }
                        
                
                    }}/>
                    

                    <TextField
                    variant='standard'
                    // type='date'
                    label="About Position"
                    fullWidth
                    multiline
                    {...register('about')}
                    />
                

                    
                

                </Grid>

                <Grid md={12} mt={1} container justifyContent='space-around'>
                        <GreenButton text='Save'
                        click={handleSubmit(onSubmit)}
                         textColor='#fff' paddingY={1} radius={3} bg='#203719' paddingX={7} />
                        <GreenButton text='Cancel' textColor='#203719' paddingY={1} radius={3} bg='#E1F1DC' paddingX={7} click={()=>props.handleClose()} />
                    </Grid>
            </form>
    )
}