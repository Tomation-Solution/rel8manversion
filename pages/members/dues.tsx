 import {NextPage} from 'next'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { DashboardLayout } from '../../components/Dashboard/Member/Sidebar/dashboard-layout'
import Table from '../../components/Table/Table'
import { useAppDispatch } from '../../redux/hooks'
import { selectMemberDues, setMemberDuesStatus } from '../../redux/memberDues/memberDuesSlice'
import { getMemberDueBreakDown, getMemberduesApi, payDuesApi } from  '../../redux/memberDues/memberDuesApi'
import PendingIcon from '@mui/icons-material/Pending';
import CheckIcon from '@mui/icons-material/Check';
import useToast from '../../hooks/useToast'
import Spinner from '../../components/Spinner'

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Profile from '../../components/Profile/Profile'
import axios from '../../helpers/axios'
import { MemberType } from '../../redux/members/membersApi'

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
 export function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
export  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


  
const Dues:NextPage = ()=>{
    const [value, setValue] = React.useState(0);
    const [member,setMemeber] = React.useState<null|MemberType>()

    const get_member  = async()=>{

      const resp = await axios.get('/tenant/user/memberlist-info/my_profile/');
      setMemeber(resp.data.data[0])
    }
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
    const dispatch = useAppDispatch()
    const {status ,dues,message,due_break_down} = useSelector(selectMemberDues)
    const {notify } = useToast()
      const prop_columns = [
        {
            Header:'Email',
            accessor:'user__email',
            id:1,
            },
            {
                Header:'Due Name',
                accessor:'due__Name',
            },
            {
                Header:'Over Due',
                accessor:'is_overdue',
                Cell:(tableProps:any)=>(
                    <p>
                          {
                            tableProps.row.original.is_overdue?
                            <CheckIcon style={{'color':'#04a9fb'}}/>
                            :
                            <PendingIcon style={{'color':'yellow'}}/>
                          }
                    </p>
                )
            },
            {
                Header:'amount',
                accessor:'amount',
            },
        
            {
                Header:'Has Paid',
                accessor:'is_paid',
                Cell:(tableProps:any)=>(
                    <p>
                          {
                            tableProps.row.original.is_paid?
                            <CheckIcon style={{'color':'#04a9fb'}}/>
                            :
                            <PendingIcon style={{'color':'yellow'}}/>
                          }
                    </p>
                )
            },
            {
                Header:'Pay',
                accessor:'id',
                Cell:(tableProps:any)=>(
                    <button onClick={()=>{
                        // tableProps.row.original.id
                        dispatch(payDuesApi(tableProps.row.original.id))
                    }}>
                        Pay
                    </button>
                )
            }
        ]


    useEffect(()=>{
        dispatch(getMemberduesApi())
        dispatch(getMemberDueBreakDown())
        get_member()
    },[])

    useEffect(()=>{
        if(status == 'error'){
            notify(message,'error')
            dispatch(setMemberDuesStatus('idle'))
        }
        if(status == 'success'){
            notify(message,'success')
            dispatch(setMemberDuesStatus('idle'))

        }
    },[status])

    return (
        <DashboardLayout>
            {
                status==='pending'?
                <Spinner/>:''
            }
          <div style={{'margin':'1rem auto','maxWidth':'800px','display':'block'}}>

                <div style={{'display':'inline-block','padding':'1.4rem','borderRadius':'10px','color':'white','backgroundColor':'#04a9fb'}}>
                    <p><strong>Outstanding</strong>: {due_break_down.outstanding}</p>
                    <p><strong>Paid</strong>: {due_break_down.total_paid}</p>
                </div>
                <br />
                <br />
                {
                  member?
                  <Profile member={member} can_edit_img={true}/>:''
                }

                <br />

                <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Completed Payment" {...a11yProps(0)} />
          <Tab label="Pending Payment" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
                  <Table prop_columns={prop_columns} custom_data={dues.filter((data)=>data.is_paid===true)}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
                  <Table prop_columns={prop_columns} custom_data={dues.filter((data)=>data.is_paid===false)}/>
      </TabPanel>

    </Box>

          </div>
        </DashboardLayout>
    )
}

export default Dues