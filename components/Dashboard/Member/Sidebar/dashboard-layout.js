import { useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 200
  }
}));

export const DashboardLayout = (props) => {
  const { children } = props;
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const [isSidebarOpen, setSidebarOpen] = useState(lgUp);

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          <div style={{ padding: '1.5rem' }}>
            {children}
          </div>
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar type={props.title} onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  );
};
