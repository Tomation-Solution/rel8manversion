import Logo from '../../images/logo.png'
import CustomBtn from '../CustomBtn/Button'
import { ProspectiveSideBarContainer } from './ProspectiveSideBar.style'




const ProspectiveSideBar= ()=>{
    
    return(
        <ProspectiveSideBarContainer>
          <img className="nav_logo_propective" src={Logo.src} alt="" />
            <ul className="ProspectiveSideBarContainer__body">
                <li><a href="">Application</a></li>
                <li><a href="">Application Status</a></li>
                <li><a href="">Log Out</a></li>
            </ul>  
        </ProspectiveSideBarContainer>
    )
}

export default ProspectiveSideBar