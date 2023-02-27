
import Preloader from "../images/preloader.gif"

const Spinner=()=>(
    <div style={
        
        { position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }
    }>
        <img src={Preloader.src} 
        // style={{"width":"100%","height":"100%"}}
         alt="Loading..."
        />
    </div>
)

export default Spinner