import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

type Prop = React.PropsWithChildren<{
    Button:React.ReactNode;
}>
export default function BasicPopover({children ,Button }:Prop) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <a href='#' onClick={(e)=> handleClick(e)}>
        {Button }
      </a>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
       <Typography style={{'padding':'1.5rem'}}>
       {
            children
        }
       </Typography>
      </Popover>
    </div>
  );
}
