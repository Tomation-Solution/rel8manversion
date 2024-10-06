import { Grid, Typography } from "@mui/material";
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
import moment from "moment";
import { useRouter } from "next/router";

export default function Publications(props){

    const dispatch = useAppDispatch();
    const { status,publication} = useAppSelector(selectmemberPublication);
    const route = useRouter()

    useEffect(()=>{
        dispatch(getMemberPublication({}))
    },[])

    return(
        <DashboardLayout>
          {status=='pending'&&<Spinner/>}
            <Grid container spacing={2} mx={1}>
            <Typography variant='h4' sx={{ mt: 2, mb: 2 }}>
                Publications
            </Typography>
            <Grid container spacing={3}>
                {publication.map((data, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <ChildNewsCard
                    date={moment(data.created_at).format('LLL')}
                    image={data.image}
                    title={data.name}
                    data={data}
                    />
                </Grid>
                ))}
            </Grid>
            </Grid>
        </DashboardLayout>
    )
}