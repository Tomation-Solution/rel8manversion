import { NextPage } from "next";
import { DashboardLayout } from "../../../components/Dashboard/Member/Sidebar/dashboard-layout";
import MemberCard from "../../../components/memberCard/memberCard";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from "@mui/material";
import { a11yProps, TabPanel } from "../dues";





const AllMembers:NextPage = ()=>{
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
      };

    return (
        <DashboardLayout>

<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="All Members" {...a11yProps(0)} />
          <Tab label="All Exco" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
                <h1>All Memebers</h1>

            <div style={{'display':'flex','flexWrap':'wrap','gap':'5px','padding':'1rem .3rem'}}>
                {
                    [...new Array(8)].map((data,index)=>(
                        <MemberCard key={index}/>
                    ))
                }
            </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h1>All Exco</h1>

            <div style={{'display':'flex','flexWrap':'wrap','gap':'5px','padding':'1rem .3rem'}}>
                {
                    [...new Array(8)].map((data,index)=>(
                        <MemberCard key={index}/>
                    ))
                }
            </div>
      </TabPanel>
           

        </DashboardLayout>
    )
}

export default AllMembers