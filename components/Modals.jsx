import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: '100%',
  bgcolor: 'background.paper',
//   border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius:2,
  'padding':'0',
  margin:'0'
};

export default function BasicModal(props) {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{'padding':'0','minWidth':'400px','margin':'0 auto'}}
      >
        <Grid md={4} sm={10} sx={style}>
        <CancelIcon fontSize="small" style={{'color':'red'}} onClick={()=>props.handleClose()}/>
            {props.body}
        </Grid>
      </Modal>
    </div>
  );
}