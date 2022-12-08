import { Grid } from "@mui/material";
import HeadText from "../../components/Dashboard/DashboardHead";
import GalleryImage from '../../images/Vectorlanding.png';
import GalleryCard from "../../components/GalleryCard";
import { DashboardLayout } from "../../components/Dashboard/Member/Sidebar/dashboard-layout";
import axios from '../../helpers/axios'
import { useState } from "react";
import { useEffect } from "react";
export default function Gallery(){
    const [images,setImages] = useState([])
    const getmage =async () =>{

        const resp  = await axios.get('/tenant/extras/galleryview/member_get_gallery/')
        setImages(resp.data.data.data)

    }

    useEffect(()=>{
        getmage()
    },[])
    return(
        <DashboardLayout>
        <Grid container>
            <HeadText text='Photo Gallery'/>
            <Grid container>
                {
                    images.map((data,index)=>(
                        <GalleryCard key={index}
                       
                         image={data.photo_file} text={data.name} />

                    ))
                }
            </Grid>

        </Grid>
        </DashboardLayout>
    )
}