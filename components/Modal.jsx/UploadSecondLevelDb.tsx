import { Checkbox,Grid, TextField, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import GreenButton from "../Buttonn";
import useToast from "../../hooks/useToast";
import { Input } from "@material-ui/core";
import axios from "../../helpers/axios";
import Spinner from "../Spinner";



const UploadSecondLevelDb = ():React.ReactElement=>{

    const [file ,setFile] = useState<any>(null)
    const {notify } = useToast();
    const [loading,setLoading] = useState(false)
    const handleUpload = async(e:any)=>{

        if(!file){
            notify('Please Enter a Excel File')
            return false
        } 
        // console.log({file})
        const form_data = new FormData()
        form_data.append('file',file)
        setLoading(true)
        try{
            const resp = await axios.post(`/tenant/auth/upload_database/`,form_data)
            console.log({resp})
            if(resp.status===200){
                notify('Upload Successful','success')
            }
        setLoading(false)

        }catch(e:any){
            console.log({e})
            notify('Somthing went wrong','error')
        }
        setLoading(false)

    }
    return (
        <form action="">
            {loading&&<Spinner/>}
            <input
                // variant='standard'
                // label=".."
                // fullWidth
                type={'file'}
                // InputLabelProps={{className:'light-text'}}
                onChange={(e:any)=>setFile(e.target.files[0])}
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                
            />
            <br />
            <br />
                <GreenButton
                text='Add New'
                bg='#365C2A'
                radius={5}
                textColor='white'
                paddingX={5}
                paddingY={1.5}
                fontWeight={500}
                
                click={handleUpload}
                />
        </form>
    )
}

export default UploadSecondLevelDb