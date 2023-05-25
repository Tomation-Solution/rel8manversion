import { DashboardLayout } from "../../../components/Dashboard/Member/Sidebar/dashboard-layout";
import axios from '../../../helpers/axios'
import { useState } from "react";
import { useEffect } from "react";
import CustomBtn from "../../../components/CustomBtn/Button";
import { useRouter} from 'next/router'
import Spinner from "../../../components/Spinner";


export type GalleryV2Type = {
    "id": number,
    "images": {"image":string}[],
    "name": string,
    "date_taken": string,
    "chapters": any
}
export default function Gallery(){
    const [images,setImages] = useState<GalleryV2Type[]>([])
    const route = useRouter()
    const [loading,setLoading] = useState(false)
    const getmage =async () =>{
        setLoading(true)
        const resp  = await axios.get('/tenant/extras/gallery_version2/')
        setLoading(false)

        setImages(resp.data.data.data)

    }

    useEffect(()=>{
        getmage()
    },[])
    return(
        <DashboardLayout>
    {
        loading?
        <Spinner/>
        :''
    }
    <div style={{'display':'flex','flexWrap':'wrap','padding':'1rem 1.3rem','gap':'10px'}}>
        {
            images.map((data,index)=>(
                <div key={index} style={{'maxWidth':'250px'}}>
                    <img  src={
                    data.images.length!=0?data.images[0].image:''
                } style={{'display':'block','width':'250px','objectFit':'contain','borderRadius':'10px'}}/>
                <br />
                <p style={{'textAlign':'center'}}>{data.name.slice(0,100)}</p>
                <CustomBtn style={{'width':'100px','padding':'.5rem 1rem','margin':'10px auto'}} styleType='sec'
                onClick={e=>route.push(`/members/gallery/${data.id}/`)}
                >
                    View
                </CustomBtn>
                </div>

            ))
        }
    </div>
        </DashboardLayout>
    )
}