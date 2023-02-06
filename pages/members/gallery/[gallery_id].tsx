import {useRouter} from 'next/router'
import { useEffect, useState } from 'react';
import { GalleryV2Type } from '.';
import { DashboardLayout } from "../../../components/Dashboard/Member/Sidebar/dashboard-layout";
import axios from '../../../helpers/axios';




const GalleryDetails = ()=>{
    const route = useRouter()
    const {gallery_id}  = route.query
    const [galleryDetail,setGalleryDetail] = useState<null|GalleryV2Type>()
    const getGalleryDetails = async (id:number)=>{
        const resp = await axios.get(`/tenant/extras/gallery_version2/${id}/`)
        setGalleryDetail(resp.data.data)
    }
    useEffect(()=>{
        if(typeof gallery_id == 'string'){
            getGalleryDetails(parseInt(gallery_id))
        }
    },[route.isReady])
    
    return (
        <DashboardLayout>
            {
                galleryDetail?
                <h2 style={{'padding':'1rem'}}>{galleryDetail.name}</h2>
                :''
            }
{
    galleryDetail?
    <div style={{'display':'flex','flexWrap':'wrap','gap':'10px','padding':'5px 10px'}}>
        {
            galleryDetail.images.map((data,index)=>(
                <img key={index}  src={data.image} style={{'display':'block','width':'300px','height':'250px','objectFit':'cover','borderRadius':'10px'}}/>
            ))
        }
    </div>
    :
    ''
}
        </DashboardLayout>
    )
}



export default GalleryDetails