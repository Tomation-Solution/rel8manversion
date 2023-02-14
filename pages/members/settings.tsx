import { DashboardLayout } from "../../components/Dashboard/Member/Sidebar/dashboard-layout";
import {useState,useEffect} from 'react'
import SwitchLabels from "../../components/SwitchLabels";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { a11yProps, TabPanel } from "./dues";


const centerSwitch={
    'display':'flex',
    'padding':' 0 .7rem'
   }

const MySettings = ()=>{
    const [user_info,setUser_info] = useState(null)
    const [chapter,setChapter] = useState<null|string>(null);
    const [value, setValue] = useState(0);
    const [exco,setExco]=useState<null|{name:string,id:number}>(null)

 
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
        useEffect(()=>{
            if( localStorage.getItem('token')){
                setUser_info(JSON.parse(localStorage.getItem('token')))
              }
           

                
                let council  = localStorage.getItem('council')
              if(council){
                setExco(JSON.parse(council))
               }
        },[])
    return (
        <DashboardLayout>
             <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Filter By Council" {...a11yProps(0)} />
                    <Tab label="Filter by Chapter" {...a11yProps(1)} />
                    <Tab label="Filter by Commitee" {...a11yProps(2)} />
                </Tabs>
                </Box>
                <br />
                <TabPanel value={value} index={0}>
                {
                                user_info?
                    user_info.council.map((data,index)=>(
                    <div style={centerSwitch} key={index}>

                    <SwitchLabels
                    label={data.name}
                    switch={exco == data.id}
                    func={
                    ()=>{
                    //   console.log('Yo Yo')
                    if(exco){
                    if(exco == data.id){
                    localStorage.removeItem('council')
                    }else{
                    localStorage.setItem('council',data.id)
                    }
                    }else{
                    localStorage.setItem('council',JSON.stringify(data.id))
                    }

                    window.location.reload()
                    }
                    }
                    />
                    </div>
                    )):''
                    }
                </TabPanel>

                <TabPanel value={value} index={1}>
                {
    user_info?
    user_info.chapter !=null?
    <div>
    <SwitchLabels
    label={user_info.chapter}
    switch={false}
    func={
    ()=>{
    //
    }}
    />
    </div>:''

:''
}
                </TabPanel>

                <TabPanel value={value} index={2}>
                {
user_info?

<div >
    
<br />
{
user_info.commitee.map((data,index)=>(
<div style={centerSwitch} key={index}>

<SwitchLabels
label={data.name}
switch={false}
func={
()=>{
    //
}
}
/>
</div>
))
}
</div>
:''
}
                </TabPanel>
            </Box>

        </DashboardLayout>
    )
}

export default MySettings