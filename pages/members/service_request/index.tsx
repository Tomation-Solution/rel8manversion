import { NextPage } from "next";
import { DashboardLayout } from "../../../components/Dashboard/Member/Sidebar/dashboard-layout";
import {IoIosPaper } from 'react-icons/io'
import CustomBtn from "../../../components/CustomBtn/Button";
import { Grid, TextField } from "@material-ui/core";
import BasicModal from "../../../components/Modals";
import { useState } from "react";
import Spinner from "../../../components/Spinner";
import axios from "../../../helpers/axios";
import useToast from "../../../hooks/useToast";


const ServiceRequestForm =():React.ReactElement=>{
    const [isLoading,setIsLoading] = useState(false)
    const {notify}  = useToast()
    const [file,setFile] = useState<any>()
    const [content,setContent]= useState('')
    const onSubmit =async ()=>{
        const form = new FormData()
        form.append('extra_info',content)
        form.append('file',file)
        setIsLoading(true)
        const resp = await axios.get('/tenant/extras/member_reissuance_of_certificate/',form)
        setIsLoading(false)

        if(resp.status == 200){
            notify('Success','success')
        }
    }
    return(
        <div>
  <div style={{'padding':'1rem'}}>
            {isLoading?<Spinner/>:''}
            <h2 style={{'textAlign':'center'}}>Reissuance of certificate</h2>
            <br /><br />
             <TextField
              placeholder='Title'
              // label='Password'
              size='small'
              style={{width:'100%'}}
              onChange={e=>setContent(e.target.value)}
              InputLabelProps={{ shrink: true,  }}
              />
            <br /><br />
            <label htmlFor="">Attach requirement for reissuance of certificate</label>
            <TextField
              placeholder='body'
              // label='Password'
              size='medium'
              type={'file'}
              onChange={(e:any)=>{
                setFile(e.target.files[0])
              }}
              style={{width:'100%'}}
              InputLabelProps={{ shrink: true,  }}
              />
            <br /><br />

              <CustomBtn onClick={onSubmit} style={{'width':'250px','margin':'0 auto'}}>
                Submit
              </CustomBtn>
        </div>
        </div>
    )
}

const Service_request=()=>{
    const [openLogout, setOpenLogout] = useState(false);

    const handleClose =()=> setOpenLogout(false);

    return (
        <DashboardLayout>
      <BasicModal handleClose={handleClose} open={openLogout} body={
        <ServiceRequestForm/>
      }/>
      <h2 style={{'textAlign':'center'}}>No service available at the time</h2>

            {/* <Grid container spacing={2} style={{'padding':'1rem'}}>
                <div style={{'padding':'1rem','border':'1px solid blackSS','width':'300px','textAlign':'center'}}>
                    <IoIosPaper style={{"fontSize":'2rem','color':'#04a9fb'}}/>
                    <p style={{'fontSize':'1.5rem'}}>Reissuance of certificate</p>
                    <CustomBtn style={{'width':'150px','margin':'5px auto'}} onClick={e=>setOpenLogout(true)}>Apply</CustomBtn>
                </div>
            </Grid> */}
        
        </DashboardLayout>
    )
}

export default Service_request