import { Grid } from "@material-ui/core";
import { NextPage } from "next";
import {useRouter} from 'next/router'
import { useEffect, useState } from "react";
import { DashboardLayout } from "../../../components/Dashboard/Member/Sidebar/dashboard-layout";
import axios from "../../../helpers/axios";
import useToast from "../../../hooks/useToast";
import Newscard from "../../../components/NewsCard";
import Spinner from "../../../components/Spinner";




export type FundAProjectType={
    "heading": string,
    "about":string,
    "id": number,
    "image": null|string 
}
const FundAProject:NextPage=()=>{
    const [projects,setProjects] = useState<FundAProjectType[]>();
    const route = useRouter()
    const {notify} = useToast();
    const [isLoading,setIsLoading]= useState(false)
    const get_projects= async()=>{
        setIsLoading(true)
        const resp = await axios.get('/tenant/extras/member_support_project/')
        setIsLoading(false)
        if(resp.data.status_code == 200){
            setProjects(resp.data.data)
        }else{
            notify('please check your internet and refresh','error')
        }
    }

    useEffect(()=>{
        get_projects()        
    },[])
    return (
        <DashboardLayout>
            {
                isLoading?<Spinner/>:''
            }
        {
            projects?
<Grid container spacing={2} style={{'padding':'1rem'}}>
          {  projects.map((data,index)=>(
                <Newscard
                key={index}
                title={data.heading}
                image={data.image}
                body={data.about.length==0?'....':data.about.slice(0,50)+'...'}
                data={data}
                onBtnClick={()=>{
                    console.log('Buyll shit code')
                    localStorage.setItem('fund_project',JSON.stringify(data))
                    route.push(`fund_a_project/${data.id}`)
                }}
                />
              ))}
</Grid>
              :
            <h2 style={{'padding':'1rem','textAlign':'center'}}>
                There is no project to fund at the moment
            </h2>
        }


       

        </DashboardLayout>
    )
}

export default FundAProject