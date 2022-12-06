import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from 'next/link'
import NewImage from '../../images/Vectorlanding.png';
import ChildNewsCard from "../../components/ChildNewsCard";
import { DashboardLayout } from "../../components/Dashboard/Member/Sidebar/dashboard-layout";
import { useState } from "react";
import axios from "../../helpers/axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectmemberPublication } from "../../redux/memberPublication/memberPublicationSlice";
import Spinner from "../../components/Spinner";
import { useEffect } from "react";
import { getMemberPublication } from "../../redux/memberPublication/memberPublicationAPi";

export default function Publications(props){

    const dispatch = useAppDispatch();
    const { status,publication} = useAppSelector(selectmemberPublication);

    useEffect(()=>{
        dispatch(getMemberPublication({}))
    },[])
    return(
        <DashboardLayout>
          {status=='pending'&&<Spinner/>}

        <Grid mx={1}>
           
            <Typography variant='h6' className='text' marginTop={2}>
                AANI Publications
            </Typography>
            <Grid container>
                {
                    publication.map((data,index)=>(
                        <ChildNewsCard 
                        key={index}
                        date='Feb 15th, 2022 - 10:33 '
                        image={NewImage}                
                        title={data.name}
                        click={()=>props.setSelected(10)}
                    />
                    ))
                }
            </Grid>
        </Grid>
        </DashboardLayout>
    )
}