import { ProspectiveMember, getPropspectiveMemberOrNull } from "../../utils/extraFunction"
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
/* @ts-ignore */
import cookieCutter from 'cookie-cutter'
import useToast from "../../hooks/useToast"
import ProspectiveSideBar from "../../components/ProspectiveSideBar/ProspectiveSideBar"
import { PropectiveMemberLayoutContainer } from "./PropectiveMemberLayout.style"
import { useMediaQuery } from 'react-responsive'
import Logo from '../../images/logo.svg'
import {FaBars} from 'react-icons/fa'
import OffCanvas from "../../components/OffCanvas/OffCanvas"
import Spinner from "../../components/Spinner"
import HandleProspectiveRegistrationPayment from "../../components/HandleProspectiveRegistrationPayment"
type Prop = React.PropsWithChildren<{}>
const   PropectiveMemberLayout = ({children}:Prop)=>{
    // const user = getPropspectiveMemberOrNull()
    const {notify} = useToast()
    const router = useRouter()
    const [user,setUser] = useState<'no_data'|null|ProspectiveMember>('no_data')
    const [openDrawer,setOpenDrawer] = useState(false)
    
    const isTab = useMediaQuery({
        query: '(min-width:500px)'
      })
    useEffect(()=>{
        let data =getPropspectiveMemberOrNull()
        if(!data){
            notify('Please you need to login','error')
            router.push('/prospective/')
        }
        setUser(data)
    },[])
    if (user==='no_data'){
        return <Spinner />
    }
    return (
        <PropectiveMemberLayoutContainer >
            {
                !isTab?
                <>
                
                <div style={{'display':'flex','alignItems':'center','justifyContent':'space-between','padding':'1rem 1.8rem'}}>
                    <img src={Logo.src} style={{'display':'block','width':'60px'}} alt="" />
                    <FaBars style={{'cursor':'pointer','fontSize':'1.5rem'}} onClick={e=>{
                        setOpenDrawer(true)
                    }}/>
                </div>
                <OffCanvas
                    isOpen={openDrawer}
                    setIsOpen={setOpenDrawer}
                    size={60}
            >
                <ProspectiveSideBar/>
            </OffCanvas>
                </>

                :
                
                // this for laptop
                <ProspectiveSideBar/>
            }
            
           
            {
                user?.has_paid?
                <div className="PropectiveMemberLayout__childrenbody">
            {children}
            </div>
                    :
            <HandleProspectiveRegistrationPayment/>
            }
        </PropectiveMemberLayoutContainer>
    )
}

export default PropectiveMemberLayout