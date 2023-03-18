import { Grid, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { FundAProjectType } from ".";
import CustomBtn from "../../../components/CustomBtn/Button";
import { DashboardLayout } from "../../../components/Dashboard/Member/Sidebar/dashboard-layout";
import BasicModal from "../../../components/Modals";
import useToast from "../../../hooks/useToast";
import {useRouter} from 'next/router'
import axios from "../../../helpers/axios";
import Spinner from "../../../components/Spinner";
import SelectWithLabel from "../../../components/forms/SelectWithLable";
import FundProjectInKindForm from "../../../components/forms/FundProjectInKindForm";
import { NextPage } from "next";


export type FundProjectInKindFormProp = {
    what_project_needs:string[]
}

const ProjectDetail:NextPage = ()=>{
    const [projects,setProjects] = useState<null|FundAProjectType>();
    const {notify} = useToast()
    const [openLogout, setOpenLogout] = useState(false);

    const handleClose =()=> setOpenLogout(false);
  
  
    useEffect(()=>{
        if( localStorage.getItem('fund_project')){
            setProjects(JSON.parse(localStorage.getItem('fund_project')))
        }
    },[])
    console.log(projects)
    return (
        <DashboardLayout>

            <div style={{'padding':'4rem 0',}}>
                {
                    projects?
                    <img 
                    src={projects.image} 
                    alt=""  style={{'display':'block','borderRadius':'10px','width':'400px','height':'300px','margin':'0 auto'}}/>
                    :''
                }
                <br /><br />
                 <div style={{'padding':'0  1rem','margin':'0 auto','maxWidth':'900px',}}>
                <h2 style={{'textAlign':'center'}}>{projects?.heading}</h2>
                <br /><br />

                <Grid style={{'color':'#000000c4'}} >
                    <p>{projects?.about}</p>
                </Grid>
                
            </div>
            <br /><br />
                <div style={{'maxWidth':'400px','margin':'0 auto','display':'flex','justifyContent':'space-between'}}>
                    <CustomBtn 
                    onClick={(e)=>setOpenLogout(true)}
                    style={{'width':'40%'}}>
                    Support in Kind
                    </CustomBtn>
                    <CustomBtn styleType="sec" style={{'width':'40%'}} onClick={e=>{
                        notify('Please hold on payment is still in development','error')
                    }}>
                    Support In Cash
                    </CustomBtn>
                </div>
            </div>

      <BasicModal handleClose={handleClose} open={openLogout} body={
        <FundProjectInKindForm what_project_needs={projects.what_project_needs}/>
      }/>

        </DashboardLayout>

    )
}

export default ProjectDetail