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
import Spinner from "../../../Spinner";

const centerSwitch={
         'display':'flex',
         'padding':' 0 .7rem'
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
    href: '/members/election/',
    icon: (<Person fontSize="small" />),
    title: 'Election'
  },
  {
    href: '/members/dues/',
    icon: (<Person fontSize="small" />),
    title: 'Dues'
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
  const [exco,setExco]=useState(0)
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
      setExco(JSON.parse(isExco))
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


  if(typeof window == 'undefined'){
    return <Spinner/>
  }

  let user_info = null
      if( localStorage.getItem('token')){
        user_info  = JSON.parse(localStorage.getItem('token'))
      }

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

{
  user_info?
  user_info.exco.map((data,index)=>(
        <div style={centerSwitch} key={index}>

        <SwitchLabels
        label={data.name}
        switch={exco == data.id}
        func={
        ()=>{
        //   console.log('Yo Yo')
          if(exco){
            if(exco == data.id){
              localStorage.removeItem('exco')
            }else{
              localStorage.setItem('exco',data.id)
            }
          }else{
            localStorage.setItem('exco',JSON.stringify(data.id))
          }

        window.location.reload()
        }
        }
        />
        </div>
  )):''
}

<br/>
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
)

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: ' #075a94',
            color: '#FFFFFF',
            width: 220,
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
