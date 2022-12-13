import { useEffect,useState } from 'react';
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
import SwitchLabels from '../../../SwitchLabels';
const centerSwitch={
         'display':'flex','alignItems':'center','justifyContent':'center'
        }
const items = [
  {
    href: '/members/home',
    icon: (<DashboardCustomize fontSize="small" />),
    title: 'Dashboard'
  },
  // {
  //   href: '/members/account',
  //   icon: (<AccountBalanceWalletRounded fontSize="small" />),
  //   title: 'My Account'
  // },

  // {
  //   href: '/members/directory',
  //   icon: (<Person fontSize="small" />),
  //   title: 'Member Directory'
  // },
  {
    href: '/members/events',
    icon: (<PeopleRounded fontSize="small" />),
    title: 'Events'
  },

  {
    href: '/members/single-chat',
    icon: (<ChatBubble fontSize="small" />),
    title: 'Chat'
  },
  {
    href: '/members/news',
    icon: (<Info fontSize="small" />),
    title: 'Nimn News'
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
  const [custom_window,setCustom_window] = useState(null)
  const [chapter,setChapter] = useState(false);
  const [exco,setExco]=useState(false)
  const { open, onClose } = props;
  const router = useRouter();
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'))

  useEffect(()=>{
    if(custom_window){
      //check if chapter is on or not
     let isChapter  = localStorage.getItem('chapter')
     let isExco  = localStorage.getItem('exco')
     if(isChapter){
      setChapter(true)
    }
    if(isExco){
      setExco(true)
     }
    }
  },[custom_window])

  try{
    window.localStorage
      if(!custom_window){
        setCustom_window(window)
      }
  }catch(err){
    //
  }
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
          <br/>
          <img 
              src={LogoImage.src}
              alt='logo'
              style={{
                'width':'80px',
                'margin':'0 auto',
                'display':'block',

              }}
              />
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

         <div style={centerSwitch}>

         <SwitchLabels
          label={'Chapter'}
          switch={chapter}
          func={
            ()=>{
              console.log('Yo Yo')
              if(chapter){
                localStorage.removeItem('chapter')
              }else{
                localStorage.setItem('chapter','1')
              }
            setChapter(!chapter)

              window.location.reload()
            }
          }
          />
         </div>

         <div style={centerSwitch}>

<SwitchLabels
          label={'For Exco'}
          switch={exco}
          func={
            ()=>{
              //
              if(exco){
                localStorage.removeItem('exco')
              }else{
                localStorage.setItem('exco','1')
              }

              setExco(!exco)
              window.location.reload()

            }
          }
          />
        </div>
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
            backgroundColor: ' #075a94',
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
