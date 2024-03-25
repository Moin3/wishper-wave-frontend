import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { userAuth } from '../../context/AccountProvider';
import { Link } from 'react-router-dom';

export default function Modal({isOpen,onClose}) {
    const {Logout}=userAuth()

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to Logout?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={onClose}>No</Button>
          <Link to={'/signin'}>
             <Button onClick={Logout} autoFocus>Yes</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}