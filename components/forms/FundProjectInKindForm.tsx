import { TextField } from "@mui/material"
import { useRouter } from "next/dist/client/router"
import { useState } from "react"
import axios from "../../helpers/axios"
import useToast from "../../hooks/useToast"
import { FundProjectInKindFormProp } from "../../pages/members/fund_a_project/[project_id]"
import CustomBtn from "../CustomBtn/Button"
import Spinner from "../Spinner"
import SelectWithLabel from "./SelectWithLable"





const FundProjectInKindForm = ({what_project_needs=[]}:FundProjectInKindFormProp):React.ReactElement=>{
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
             {/* <TextField
              placeholder='Title'
              // label='Password'
              size='small'
              style={{width:'100%'}}
              onChange={e=>setHeading(e.target.value)}
              InputLabelProps={{ shrink: true,  }}
              /> */}
              <label style={{'color':'#838080'}}>What Project Needs</label>
              <SelectWithLabel
              Label=''
              name='title'
              options={what_project_needs.map((data,index)=>({
                'name':data,
                'value':data,
              }))}
              setValue={(name,value)=>{
                setHeading(value)
              }}
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


export default FundProjectInKindForm