import React from "react"
import { LatestUpdateAndGalleryContainer } from "./LatestUpdateAndGallery.style"
import { DashboardLayout } from "../../components/Dashboard/Member/Sidebar/dashboard-layout"
import { HomeLayout, MainPane, SidePane } from "../../styles/MembersHome.style"
import RandomImage from '../../images/Vectorlanding.png'
import { useMediaQuery } from 'react-responsive'



type Prop = React.PropsWithChildren<{}>
const LatestUpdateAndGallery = ({children}:Prop)=>{
    const isPhone = useMediaQuery({ query: '(max-width: 500px)' })

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
          [...new Array(2)].map((img,index)=>(
            <img className="sideImages" key={index} 
            src={'https://res.cloudinary.com/du9oqsosk/image/upload/v1/media/gallery_v2/Photo_1_ujzc9i' }/>

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