import Logo from '../../images/logo.png'
import CustomBtn from '../CustomBtn/Button'
import { ProspectiveSideBarContainer } from './ProspectiveSideBar.style'
import {useRouter} from 'next/router'



const ProspectiveSideBar= ()=>{
    const router = useRouter()
    return(
        <ProspectiveSideBarContainer>
          <img className="nav_logo_propective" src={Logo.src} alt="" />
            <ul className="ProspectiveSideBarContainer__body">
                <li><a onClick={e=>{
                    e.preventDefault()
                    router.push('/prospective/home/')
                }}>Application</a></li>
                <li><a 
                onClick={e=>{
                    e.preventDefault()
                    
                    router.push('/prospective/status/')
                }}
                >Application Status</a></li>
                <li><a href="" onClick={e=>{
                    e.preventDefault()
                    if(window.confirm('Are sure you want to log out')){
                        localStorage.clear()
                        router.push('/prospective/')
                    }
                }}>Log Out</a></li>
            </ul>  
        </ProspectiveSideBarContainer>
    )
}

export default ProspectiveSideBar