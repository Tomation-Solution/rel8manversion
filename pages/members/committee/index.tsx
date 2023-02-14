import {NextPage} from 'next'
import { useEffect, useState } from 'react'
import { DashboardLayout } from '../../../components/Dashboard/Member/Sidebar/dashboard-layout'
import Newscard from '../../../components/NewsCard'
import Spinner from '../../../components/Spinner'
import useToast from '../../../hooks/useToast'
import { get_commitee } from '../../../redux/committee/CommitteeApi'
import { selectCommitee } from '../../../redux/committee/committeeSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { Grid } from "@material-ui/core";
import {useRouter} from 'next/router'






const Committee:NextPage=()=>{
    const route =useRouter()

    const { commitee ,status,message} = useAppSelector(selectCommitee);
    const {notify} = useToast()
    const dispatch = useAppDispatch()

    const handleCommiteeDetailRoute= (id:number)=>{
        route.push(`committee/${id}/`)
    }
    useEffect(()=>{
        if(status==='error'){
            if(message){
                notify(message,'error')
            }
        }
    },[status])

    useEffect(()=>{
        dispatch(get_commitee())
    },[])

    console.log({commitee})
    return (
        <DashboardLayout>
            {status==='pending'?<Spinner/>:''}
            <Grid container spacing={2} style={{'padding':'1rem'}}>
            {
                commitee.map((data,index)=>(
                    <Newscard
                          key={index}
                          title={data.name}
                          image={data.team_of_reference}
                          body={'..'}
                          data={data}
                          onBtnClick={e=>{
                            handleCommiteeDetailRoute(data.id)
                          }}
                          />                    
                ))
            }
            </Grid>
        </DashboardLayout>
    )
}

export default Committee