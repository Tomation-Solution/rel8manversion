import { useEffect, useState } from "react";
import { ArrowDropDown } from "@mui/icons-material";
import { Grid, TextField, Menu, MenuItem, Typography, Checkbox } from "@mui/material";
// import HeadText from "../../../Dashboard/DashboardHead";
import HeadText from "../../Dashboard/DashboardHead";
import GreenButton from "../../Buttonn";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import {createGallery, createGalleryParamType} from '../../../redux/gallery/galleryApi'
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectGallery } from "../../../redux/gallery/gallerySlice";
import useToast from "../../../hooks/useToast";
import Spinner from "../../Spinner";

const schema = yup.object().shape({
    link:yup.string().default(()=> '...'),
    photo_file:yup.mixed().required('You Must Submit a file'),
    name:yup.string(),
})

export default function AddGallery(props){
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl1, setAnchorEl1] = useState(null);
    const open = Boolean(anchorEl);
    const open1 = Boolean(anchorEl1);


    const {notify} = useToast();
    const dispatch  = useAppDispatch();
    const {status,data,error} =useAppSelector(selectGallery);

    const  {
        watch, register,handleSubmit, formState: { errors },setValue,
        } = useForm<createGalleryParamType>({resolver:yupResolver(schema)})





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
    

    const onSubmit:SubmitHandler<createGalleryParamType>=(data)=>{

        console.log({'Hello SUbmitt':data})
        dispatch(createGallery(data))
    }
    useEffect(()=>{
        if(error){
            notify('Something went wrong please reload this page','error')
        }
    },[error])

    useEffect(()=>{
        if(status==='created'){
            notify('Created Succeffully','success')
        }
    },[status])
    return (
        <form>
          {status==='loading'&&<Spinner/>}

            <Grid container >
            <HeadText text='Add Gallery Image'/>
            <TextField
                variant='standard'
                label="Title"
                fullWidth
                InputLabelProps={{className:'light-text'}}
                {...register('name')}
            />

                <div
                        style={{'margin':'.8rem 0'}}
                    >
                        <label htmlFor="image" 
                        >Image</label>
                        <input type="file" id="image" accept="image/png, image/gif, image/jpeg"  {...register('photo_file')}/>
                    </div>
            <br />

                <Grid container mb={2}></Grid>
            
            <Grid md={12} mt={1} container justifyContent='space-around'>
                <GreenButton
         click={handleSubmit(onSubmit)}
                text='Save' textColor='#fff' paddingY={1} radius={3} bg='#203719' paddingX={7} />
                <GreenButton text='Cancel' textColor='#203719' paddingY={1} radius={3} bg='#E1F1DC' paddingX={7} click={()=>props.handleClose()} />
            </Grid>
        </Grid>
        </form>
    )
}