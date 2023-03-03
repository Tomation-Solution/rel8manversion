import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Typography, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsRounded from '@mui/icons-material/NotificationsRounded';
import BasicPopover from '../../../PopOver';
import axios from '../../../../helpers/axios';
import { useEffect, useState } from 'react';


const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  // backgroundColor: theme.palette.background.paper,
  // boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, type, ...other } = props;
  const [notification ,setNotification] =useState([])
  const getNotification  = async ()=>{
    try{
      const resp = await axios.get('/tenant/reminder/member_reminder/')
      setNotification(resp.data.results)

    }catch(err){
      setNotification([])
    }
  }
  useEffect(()=>{
    getNotification()
  },[])
  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 190
          },
          width: {
            lg: 'calc(100% - 180px)'
          },
          backgroundColor:'#fff',
          boxShadow:'none'
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>

<Box style={{'justifyContent':'space-between','display':'flex','width':'80%','margin':'0 auto','alignItem':'center'}}>

          <Typography className='text' fontWeight='bold' sx={{color:'black'}} >
            {type}
             {/* Dashboards */}
          </Typography>
          {/* <Tooltip title="Search">
            <IconButton sx={{ ml: 1 }}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </Tooltip> */}
          
          {/* <Box  style={{'border':'1px solid red','width':'400px'}} /> */}
{/*           
          <Tooltip title="My Profile">
            <IconButton sx={{ ml: 1 }}>
              
              <Avatar sx={{ height: 30, width: 30 }}
              // src="/static/images/avatars/avatar_1.png"
            >
            </Avatar>
            </IconButton>
          </Tooltip> */}
            <BasicPopover
            Button={
              <Tooltip title="Notifications">
<IconButton>
              <Badge
                    badgeContent={4}
                    color="primary"
                    variant="dot"
                  >
                    <NotificationsRounded/>
              </Badge>
            </IconButton>
          </Tooltip>
            }>
              {
                notification.map((data,index)=>(
                  <p key={index} style={{'padding':'.9rem 0'}}>{data.title}</p>
                ))
              }
            </BasicPopover>
</Box>
            
          
            {/* <UserCircleIcon fontSize="small" /> */}
          {/* </Avatar> */}
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
