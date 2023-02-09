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

const FundProjectInKindForm = ():React.ReactElement=>{
    const [heading,setHeading] = useState('')
    const [body,setBody] = useState('')
    const {notify} = useToast()
    const route = useRouter()
    const {project_id} = route.query
    const [isLoading,setIsLoading] = useState(false)
    const onSubmit = async()=>{
        if(!heading){
            notify('title can not be empty','error')
            return 
        }
        if(!body){
            notify('body can not be empty','error')
            return 
        }
        // project_id
        if(typeof project_id != 'string'){
            return
        }
        const data ={
            heading,'about':body,'project':parseInt(project_id)
        }
        setIsLoading(true)
        const resp = await axios.post('/tenant/extras/member_support_project/support_in_kind/',data);
        setIsLoading(false)

        if(resp.data.status_code == 400){
            notify('Project Has been deleted','error')
        }
        if(resp.data.status_code == 201){
            notify('Success','success')
        }
    }
    return (
        <div style={{'padding':'1rem'}}>
            {isLoading?<Spinner/>:''}
            <h2 style={{'textAlign':'center'}}>Support in Kind</h2>
            <br /><br />
             <TextField
              placeholder='Title'
              // label='Password'
              size='small'
              style={{width:'100%'}}
              onChange={e=>setHeading(e.target.value)}
              InputLabelProps={{ shrink: true,  }}
              />
            <br /><br />
            <TextField
              placeholder='body'
              // label='Password'
              size='medium'
              onChange={e=>setBody(e.target.value)}
              style={{width:'100%'}}
              InputLabelProps={{ shrink: true,  }}
              />
            <br /><br />

              <CustomBtn onClick={onSubmit} style={{'width':'250px','margin':'0 auto'}}>
                Submit
              </CustomBtn>
        </div>
    )
}
const ProjectDetail = ()=>{
    const [projects,setProjects] = useState<null|FundAProjectType>();
    const {notify} = useToast()
    const [openLogout, setOpenLogout] = useState(false);

    const handleClose =()=> setOpenLogout(false);
  
  
    useEffect(()=>{
        if( localStorage.getItem('fund_project')){
            setProjects(JSON.parse(localStorage.getItem('fund_project')))
        }
    },[])
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
                    Support with Cash
                    </CustomBtn>
                </div>
            </div>

      <BasicModal handleClose={handleClose} open={openLogout} body={
        <FundProjectInKindForm/>
      }/>

        </DashboardLayout>

    )
}

export default ProjectDetail