import * as React from 'react';
import { ReactElement } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


type ModalProps = {
    show : boolean,
    children :ReactElement
    onClose : ()=> void;
}

const AddModal = ({ show=true,onClose,children} : ModalProps) => {
    console.log("Came here bro : ",show)

    if(!show) return null
  
    return (
      <div>
        <Modal
          open={show}
          onClose={onClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {children}
          </Box>
        </Modal>
      </div>
    );
}

export default AddModal