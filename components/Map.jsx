
import mapData from '../helpers/mapData.json'
import { useRouter } from "next/router";


export default function Map(){
  const geoUrl = mapData
  const [content, setContent] = useState('')
  const router = useRouter()
  
  const offsets = {
    VT: [50, -8],
    NH: [34, 2],
    MA: [30, -1],
    RI: [28, 2],
    CT: [35, 10],
    NJ: [34, 1],
    DE: [33, 0],
    MD: [47, 10],
    DC: [49, 21]
  };

return(
  <div>

    </div>)
};

// export default Map;