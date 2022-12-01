import { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  ComposableMap,
  Geographies,
  Geography,Annotation, Marker,
} from "react-simple-maps"
import { Tooltip } from "@mui/material";
import { ZoomableGroup } from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import allStates from '../helpers/allState.json';
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

return(<div style={{ width:'90%'}}>
  {/* <Tooltip>yeah</Tooltip> */}


      <ComposableMap projection="geoAzimuthalEqualArea" projectionConfig={{ scale: 3400,  rotate: [-8.0, -9.2, 0],}}   >
        <ZoomableGroup zoom={1}>
        <Geographies geography={geoUrl}  >
          {({geographies}) => geographies.map(geo =>
          
          <Tooltip title={content} >
            <Geography
             key={geo.rsmKey} 
             geography={geo} 
             strokeWidth={0.1} 
             stroke="#FFF" 
             fill="#436937"
             onClick={()=>geo.properties.NAME_1=='Lagos'?router.push('/login', geo.properties.NAME_1): router.push('/no-chapter')} 
            //  onMouseEnter={()=>setContent(geo.properties.NAME_1)}
             onMouseOver={()=>setContent(geo.properties.NAME_1)}
             
             style={{
              default: {
                fill: "#20496A",
                outline: "none",
                alignItems:'flex-end'
              },
              hover: {
                fill: "#01192C",
                outline: "none"
              },
              pressed: {
                fill: "#E42",
                outline: "none"
              }
              
            }}
             />
          </Tooltip>
          )}
        </Geographies>
        
  
      {
        allStates.map(e=>
      <Marker key={e.id} coordinates={[ e.long,e.lat]}>
      <text y={2} style={{color:'#f00'}} fill="#fff" fontSize={12} textAnchor='middle' >
        { e.name }
      </text>
      </Marker>)
      }

{
        allStates.map(e=>
      <Marker key={e.id} coordinates={[ e.long,e.lat]}>
      {e.id==25?
        <circle  x={4} r={7} fill="#F53" strokeWidth={1} /> :''}
      </Marker>)
      }
        </ZoomableGroup>
      </ComposableMap>
    </div>)
};

// export default Map;