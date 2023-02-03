import {MemeberCardContainer} from './MemberCard.style'
import MemberPlaceholder from '../../images/memberPlaceholder.png'
import MarkoBtn from '../MarkoBtn'
import CustomBtn from '../CustomBtn/Button'
import OffCanvas from '../OffCanvas/OffCanvas'
import { useState } from 'react'
import Profile from '../Profile/Profile'
import { useMediaQuery } from 'react-responsive'


const MemberCard = ()=>{
    const [isOpen, setIsOpen] = useState(false)
    const isPhone = useMediaQuery({ query: '(max-width: 360px)' })
    return (
        <MemeberCardContainer>
           <div className='MemberCardphotoConainer'>
              <img src={MemberPlaceholder.src} alt="" />
           </div>

           <h2>MD Abubakar</h2>
           <p className='member_postion'>Portfolio - Chairman</p>

           <CustomBtn style={{'padding':'.5rem','width':'40%','margin':'10px auto'}}
           onClick={(e)=>{
            setIsOpen(true)
           }}
           >
            View
           </CustomBtn>
           <OffCanvas
            size={isPhone?90:40}
           setIsOpen={setIsOpen}
           isOpen={isOpen}>
                <Profile/>
           </OffCanvas>

        </MemeberCardContainer>
    )
}

export default MemberCard