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

import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { userInfo } from '../../context/UserProvider';


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));



function ProfileSettings() {
  const {user}=userAuth()
  const {person}=userInfo()
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
    <div>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Profile information">
              <Box sx={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  {
                    person ? 
                    ( <Typography sx={{textTransform:'capitalize',mr:2,color:'white'}}>{person?.first_name} {person?.last_name}</Typography>) 
                    : (<Typography sx={{textTransform:'capitalize',mr:2,color:'white'}}>{user?.first_name} {user?.last_name}</Typography>)
                  }
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                    >
                      {
                        person ? 
                        ( <Avatar alt="Remy Sharp" sx={{bgcolor:'white'}} src={`${person?.avatar}`} />) 
                        : (<Avatar alt="Remy Sharp" sx={{bgcolor:'white'}} src={`${user?.avatar}`} />)
                      }
                    </StyledBadge>
                </IconButton>
              </Box>
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
              {
                person ? (
                  <Link to='/profile' key="profileLink" style={{textDecoration:'none',color:'#4a4a4a'}} >
                  <MenuItem  onClick={handleCloseUserMenu} sx={{px:7}}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                </Link>
                ) : (
                  <div>
                    <Link to='/profile' key="profileLinks"  style={{textDecoration:'none',color:'#4a4a4a'}} >
                      <MenuItem onClick={handleCloseUserMenu} sx={{px:7}}>
                        <Typography textAlign="center">Profile</Typography>
                      </MenuItem>
                    </Link>
                      <MenuItem key="logout" onClick={handleOpenModal} sx={{px:7}}>
                        <Typography textAlign="center">Logout</Typography>
                      </MenuItem>
                  </div>
                )
              }
                
            </Menu>
          </Box>
        </Toolbar>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
  );
}
export default ProfileSettings;