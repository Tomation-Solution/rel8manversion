import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Typography, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NotificationsRounded } from '@mui/icons-material';


const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  // backgroundColor: theme.palette.background.paper,
  // boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;

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

          <Typography className='text' fontWeight='bold' sx={{color:'black'}} >
            Admin Dashboard
          </Typography>
          {/* <Tooltip title="Search">
            <IconButton sx={{ ml: 1 }}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </Tooltip> */}
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              
              <Avatar sx={{ height: 30, width: 30 }}
              // src="/static/images/avatars/avatar_1.png"
            >
            </Avatar>
            </IconButton>
          </Tooltip>
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
