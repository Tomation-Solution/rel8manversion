import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { NavItem } from '../nav-item';
import { Person, DashboardCustomize, PeopleRounded, PersonPinRounded, 
  SettingsSuggest, AccountBalanceWalletRounded, Info, LogoutRounded, EventRounded, ChatBubble, Photo, MenuBook  } from '@mui/icons-material';
import Image from 'next/image';
import LogoImage from '../../../../images/logo.png'

const items = [
  {
    href: '/members/home',
    icon: (<DashboardCustomize fontSize="small" />),
    title: 'Dashboard'
  },
  {
    href: '/members/account',
    icon: (<AccountBalanceWalletRounded fontSize="small" />),
    title: 'My Account'
  },

  {
    href: '/members/directory',
    icon: (<Person fontSize="small" />),
    title: 'Member Directory'
  },
  {
    href: '/members/events',
    icon: (<PeopleRounded fontSize="small" />),
    title: 'Events'
  },

  {
    href: '/members/chat',
    icon: (<ChatBubble fontSize="small" />),
    title: 'Chat'
  },
  {
    href: '/members/news',
    icon: (<Info fontSize="small" />),
    title: 'AANI News'
  },
  {

    href: '#',
    isDroppable:true,
    icon: (<MenuBook fontSize="small" />),
    title: 'Resources'
  },

  {
    href: '/members/gallery',
    icon: (<Photo fontSize="small" />),
    title: 'Gallery'
  },

  {
    href: '#',
    icon: (<LogoutRounded fontSize="small" />),
    title: 'Logout'
  }
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg')
)
  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ px: 2 }}>
            <Box
              my={2}
              sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                py: '11px',
                borderRadius: 1
              }}
            >
              <Image src={LogoImage}/>
              {/* <SelectorIcon
                sx={{
                  color: 'neutral.500',
                  width: 14,
                  height: 14
                }}
              /> */}
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: 'rgba(255, 255, 255, 0.04)',
            my: 1
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: '#365C2A',
            color: '#FFFFFF',
            width: 200,
            borderRadius:"10px"
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 170
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
      
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
