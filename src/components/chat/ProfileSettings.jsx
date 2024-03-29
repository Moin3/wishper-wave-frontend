import * as React from 'react';
import { userAuth } from '../../context/AccountProvider';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { userInfo } from '../../context/UserProvider';
import { useState, useEffect } from 'react';

const StyledBadge = styled(Badge)(({ theme, isActive }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: isActive ? '#44b700' : 'gray',
    color: isActive ? '#44b700' : 'white',
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
  const { user, activeUsers } = userAuth();
  const { person } = userInfo();
  const [active, setActive] = useState(false);

  useEffect(() => {
    const isActiveUser = activeUsers?.find(actUser => actUser?._id === (person?._id || user?._id));
    setActive(!!isActiveUser);
  }, [activeUsers, person, user]);

  return (
    <div>
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 0 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            {person ? (
              <Typography sx={{ textTransform: 'capitalize', mr: 2, color: 'white', fontFamily: 'Quicksand', fontWeight: '800' }}>
                {person?.first_name} {person?.last_name}
              </Typography>
            ) : (
              <Typography sx={{ textTransform: 'capitalize', mr: 2, color: 'white', fontFamily: 'Quicksand', fontWeight: '800' }}>
                {user?.first_name} {user?.last_name}
              </Typography>
            )}
            <IconButton sx={{ p: 0 }}>
              <StyledBadge
                isActive={active}
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
              >
                <Avatar alt="Avatar" sx={{ bgcolor: 'white' }} src={person ? person.avatar : user.avatar} />
              </StyledBadge>
            </IconButton>
            {/* <Box>{active ? 'online' : 'offline'}</Box> */}
          </Box>
        </Box>
      </Toolbar>
    </div>
  );
}

export default ProfileSettings;
