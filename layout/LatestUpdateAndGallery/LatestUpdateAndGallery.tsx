import React from "react"
import { LatestUpdateAndGalleryContainer } from "./LatestUpdateAndGallery.style"
import { DashboardLayout } from "../../components/Dashboard/Member/Sidebar/dashboard-layout"
import { HomeLayout, MainPane, SidePane } from "../../styles/MembersHome.style"
import RandomImage from '../../images/Vectorlanding.png'
import { useMediaQuery } from 'react-responsive'
import { useQuery } from "react-query"
import { getImagesForLayout } from "../../redux/gallery/galleryApi"



type Prop = React.PropsWithChildren<{}>
const LatestUpdateAndGallery = ({children}:Prop)=>{
    const isPhone = useMediaQuery({ query: '(max-width: 500px)' })
    const {data:images} = useQuery('images_preview',getImagesForLayout,{
      'refetchOnWindowFocus':false
    })
    return (
        <DashboardLayout>
            <HomeLayout>
                <MainPane style={{'width':'100%',}}>
                    {/* <h2>Latest Updates</h2> */}
                    {/* lastest update come here */}
                        <div>
                        {children}
                        </div>
                </MainPane>
                <SidePane style={{'width':isPhone?'100%':'500px',}}>
              <h2>Gallery</h2>
          <div style={{'display':'flex','flexWrap':'wrap','gap':'2px'}}>
          {
         images?.map((img,index)=>(
            <img className="sideImages" key={index} 
            src={  img.images.length!=0?img.images[0].image:''}/>

          ))
          }
          </div>
            <p
            
            onClick={()=>{
            //   route.push('/members/gallery')
          }}>See More</p>
            </SidePane>
            </HomeLayout>
    </DashboardLayout>

    )
}

export default LatestUpdateAndGallery