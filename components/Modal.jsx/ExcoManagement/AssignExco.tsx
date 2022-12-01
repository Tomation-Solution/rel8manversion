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
import { selectManage_assigning_exco, setmanage_assigning_excoIdle } from "../../../redux/ManageAssigningExco/ManageAssigningExcoSlice";
import { asignExcoPostion, asignPostionParamType, createExcoPosition, createManageAssigningExcoParamType } from "../../../redux/ManageAssigningExco/ManageAssigningExcoApi";
import axios from "../../../helpers/axios";
import Spinner from "../../Spinner";
    
const schema = yup.object().shape({
        memeber_id:yup.number().required('Please pick a member'),

})

type Prop = {
    handleClose:()=>void;
    currentPostion:createManageAssigningExcoParamType
}
export default function AssignExco(props:Prop){
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl1, setAnchorEl1] = useState(null);
    const open = Boolean(anchorEl);
    const open1 = Boolean(anchorEl1);
    const {notify} = useToast()
    const dispatch = useAppDispatch();
    const [memebers,setMembers] = useState<any>(null)

    const  {
        watch, register,handleSubmit, formState: { errors },setValue,
        } = useForm<{'memeber_id':number}>({resolver:yupResolver(schema)})
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

    const onSubmit:SubmitHandler<{'memeber_id':number}> = (data):void=>{
        const new_data:asignPostionParamType={
            name:props.currentPostion.name,
            about:props.currentPostion.about,
            can_upload_min:props.currentPostion.can_upload_min,
            member_id:data.memeber_id,
            is_remove_member:false,
            postion_id:props.currentPostion.id
        }
        // props.currentPostion['member_id']  =data;
        // props.currentPostion['is_remove_member']  =false;

            console.log({
                'SUbmitted Data':new_data,
            })
            dispatch(asignExcoPostion(new_data))
    }
    const getMembers = async()=>{
        try{
            const resp = await axios.get(`/tenant/user/memberlist-info/get_all_members/`)
            if(resp.data.status_code ===200){
                setMembers(resp.data.data.filter(data=>data.is_exco === false))
            }
        }catch(err:any){
            notify('Something went wrongreload  or re-login!',)

        }
    }
    useEffect(()=>{
        
        if(errors.memeber_id){
            notify(errors.memeber_id?.message)
        }
    },[errors])
    useEffect(()=>{
        if(status==='created'){
            notify('Created Succeffully','success')
        }
    },[status])

    useEffect(()=>{
        if(memebers)return
        notify('Assigned member successfully','success')
        dispatch(setmanage_assigning_excoIdle({}))
        getMembers()
    },[])
    console.log({memebers})
    return (
          
  <form  >
                <Grid container >
                    <HeadText text='Assign Exco Postion'/>
                    
        {
            memebers?
<>

<SelectWithExternalLogic
        name="can_upload_min" 
        Label="Pick Members"
        
        options={memebers.map(member=>({name:`${member.id}`,value:`${member.id}`}))}
        customFunc={(currentValue)=>{
            setValue("memeber_id",Number(currentValue))
           

            
    
        }}/>


</>
        :
        <Spinner/>
        }
        
                    

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