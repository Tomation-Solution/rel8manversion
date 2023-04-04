import { NextPage } from "next"
import LatestUpdateAndGallery from "../../../layout/LatestUpdateAndGallery/LatestUpdateAndGallery"
import EventMeetDisplay from "../../../components/EventMeetDisplay/EventMeetDisplay"
import { useRouter } from 'next/router'



export const MeetingDetails:NextPage =()=>{
    const route = useRouter()
    let data:any = null
    if(typeof localStorage !=='undefined' ){
        if( localStorage.getItem('meeting_detail')){
            data  = JSON.parse(localStorage.getItem('meeting_detail'))
          }

    }
      console.log({'Meeting':data})
    return (
        <LatestUpdateAndGallery>
            <p style={{'cursor':'pointer',}} onClick={e=>{
                route.push('/members/meetings/')
            }}>Back  to Meetings</p>

            {
                data?
                <EventMeetDisplay meeting={data}/>
                :''
            }
        </LatestUpdateAndGallery>
    )
}

export default MeetingDetails