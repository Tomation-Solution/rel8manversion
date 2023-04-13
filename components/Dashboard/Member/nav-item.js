import NextLink from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, ListItem, ListItemButton, ListItemText, 
  ListItemIcon , List, Collapse  } from '@mui/material';
  import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import BasicModal from '../../Modals';
import Logout from '../../Modal.jsx/Logout';


export const NavItem = (props) => {
  const { href, icon, title,isDroppable, ...others } = props;
  const router = useRouter();
  const active = href ? (router.pathname === href) : false;
  const [open, setOpen] = useState(true);
  const [openLogout, setOpenLogout] = useState(false);

  const handleClose =()=> setOpenLogout(false);


  const handleClick = () => {
    setOpen(!open);
  };
// const handleDrop =()=>{
//   router.pathname =='Resources' ?alert('yeah'):''
// }

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 2
      }}
      // onClick={isDroppable? ()=>alert('yeah'):''}
      {...others}
    >
      <BasicModal handleClose={handleClose} open={openLogout} body={<Logout handleClose={handleClose} />}/>
      {title!='Resources' ?
      <NextLink
        href={href}
        passHref
      >
        <Button
          component="a"
          startIcon={icon}
          disableRipple
          onClick={()=>title=='Logout'? setOpenLogout(true):''}
          sx={{
            backgroundColor: active && '#E1F1DC',
            borderRadius: 1,
            color: active ? '#2e3715' : 'white',
            fontWeight: '300',
            fontSize:13,
            justifyContent: 'flex-start',
            px: 3,
            py:1,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            '& .MuiButton-startIcon': {
              color: active ? '#2B4A21' : 'neutral.400'
            },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255, 0.08)'
            }
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            {title}
          </Box>
        </Button>
      </NextLink>:
      <List disableGutters
      >
      <Button
          component="a"
          startIcon={icon}
          endIcon ={open ? <ExpandLess/>:<ExpandMore/>}
          disableRipple
          onClick={handleClick}
          sx={{
            backgroundColor: active && '#2e3715',
            borderRadius: 1,
            color: active ? '#2e3715' : 'white',
            fontWeight: '300',
            fontSize:13,
            justifyContent: 'flex-start',
            px: 3,
            py:1,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            '& .MuiButton-startIcon': {
              color: active ? '#2B4A21' : 'neutral.400'
            },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255, 0.08)'
            }
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            {title}
          </Box>
        </Button>
      <Collapse in={open} timeout="auto" unmountOnExit>
      {/* <NextLink href='/excos' passHref>
        <Button
            component="a"
            disableRipple
            sx={{ backgroundColor: router.pathname=='/excos' && '#E1F1DC', borderRadius: 1,
              color: router.pathname=='/excos' ? '#2B4A21' : 'white',
              fontWeight: '300', fontSize:13,
              justifyContent: 'flex-start',
              px: 3, ml:5, py:0.5,
              textAlign: 'left', textTransform: 'none',
              width: '100%',
              '& .MuiButton-startIcon': {
                color: active ? '#2B4A21' : 'neutral.400'
              },
              '&:hover': { backgroundColor: 'rgba(255,255,255, 0.08)'
              }
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              Excos
            </Box>
          </Button>
        </NextLink> */}


        <NextLink href='/members/publications' passHref>
          <Button
            component="a"
            // startIcon={icon}
            disableRipple
            sx={{
              backgroundColor: router.pathname=='/members/publications' && '#E1F1DC', borderRadius: 1,
              color: router.pathname=='/members/publications' ? '#2B4A21' : 'white', fontWeight: '300',
              fontSize:13, justifyContent: 'flex-start', px: 3, ml:5,
              py:0.5, textAlign: 'left', textTransform: 'none', width: '100%',
              '& .MuiButton-startIcon': { color: active ? '#2B4A21' : 'neutral.400'
              }, '&:hover': { backgroundColor: 'rgba(255,255,255, 0.08)'
              }
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              Publications
            </Box>
          </Button>
        </NextLink>
      </Collapse>
    </List>}
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string
};
