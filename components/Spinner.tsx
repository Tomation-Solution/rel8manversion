
import Preloader from "../images/preloader.gif"

const Spinner=()=>(
    <div style={
        
        { position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        'zIndex':'100000000000000000000'
    }
    }>
        <img src={Preloader.src} 
        // style={{"width":"100%","height":"100%"}}
         alt="Loading..."
        />
    </div>
)

export default Spinner