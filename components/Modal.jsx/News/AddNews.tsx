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
import {createNews, newsCreateType} from '../../../redux/news/newsApi';
import useToast from "../../../hooks/useToast";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectNews } from "../../../redux/news/newsSlice";
import Spinner from "../../Spinner";
    
const schema = yup.object().shape({
    name:yup.string().required(),
    is_exco:yup.boolean().default(function (){
        return false
    }),
    is_committe:yup.boolean().default(function (){
        return false
    }),
    is_member:yup.boolean().default(function (){
        return false
    }),
    body:yup.string().required(),
    image:yup.mixed()
})
export default function AddNews(props){
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl1, setAnchorEl1] = useState(null);
    const open = Boolean(anchorEl);
    const open1 = Boolean(anchorEl1);
    const {notify} = useToast()
    const dispatch = useAppDispatch()

    const  {
        watch, register,handleSubmit, formState: { errors },setValue,
        } = useForm<newsCreateType>({resolver:yupResolver(schema)})
    const {status} = useAppSelector(selectNews)
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

    const onSubmit:SubmitHandler<newsCreateType> = (data):void=>{
            console.log({
                'SUbmitted Data':data,
                'file':data.image[0]
            })
            dispatch(createNews(data))

    }
    console.log({errors})
    useEffect(()=>{
        if(errors?.name){
            notify(errors?.name?.message)
        }
        if(errors?.image){
            /*@ts-ignore*/
            notify(errors?.image?.message,'error')
        }
        if(errors.body){
            notify(errors.body?.message)
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
                    <HeadText text='Add News'/>
                    {status==='loading'&&<Spinner/>}

                    <TextField
                        variant='standard'
                        label="News Title"
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
                    name="is_paid_event" 
                    Label="Event Type"
                    
                    options={[
                        {name:"For Exco",value:"is_exco"},
                        // {name:"For Committe",value:"is_committe"},
                        {name:"For Member",value:"is_member"},
                    ]}
                    customFunc={(currentValue)=>{
                        if(currentValue =="is_exco"){
                            setValue("is_exco",true)
                            setValue("is_member",false)
                        }
                        if(currentValue =="is_member"){
                            setValue("is_member",true)

                            setValue("is_exco",false)
                            setValue("is_committe",false)
                        }
                        
                
                    }}/>
                    
                    <div
                        style={{'margin':'.8rem 0'}}
                    >
                        <label htmlFor="image" 
                        >Image</label>
                        <input type="file" id="image" accept="image/png, image/gif, image/jpeg"  {...register('image')}/>
                    </div>
                    <TextField
                    variant='standard'
                    // type='date'
                    label="News Body"
                    fullWidth
                    multiline
                    {...register('body')}
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