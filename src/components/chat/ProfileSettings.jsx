import * as React from 'react';
import { useState } from 'react';
import { userAuth } from '../../context/AccountProvider';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Link} from 'react-router-dom'
import Modal from '../reusable/Modal';



function ProfileSettings() {
  const {user}=userAuth()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);



  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Profile information">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={`${user?.avatar}`} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px'}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <Link to='/profile' style={{textDecoration:'none',color:'#4a4a4a'}} >
                  <MenuItem  onClick={handleCloseUserMenu} sx={{px:7}}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                </Link>
                  <MenuItem  onClick={handleOpenModal} sx={{px:7}}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
  );
}
export default ProfileSettings;