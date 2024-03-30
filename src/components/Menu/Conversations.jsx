import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import { userInfo } from '../../context/UserProvider';
import { Link } from 'react-router-dom';
import { postAPI } from '../../services/api';
import { userAuth } from '../../context/AccountProvider';
import { Box, Typography } from '@mui/material';
import { useSocket } from '../../context/SocketProvider';

const Conversations = ({ users }) => {
  const { setPerson } = userInfo();
  const { user } = userAuth();
  const { onlineUsers } = useSocket();
  const [selectedUser, setSelectedUser] = useState(null);
  const msgText = "The name of my country is Bangladesh";

  const getUser = async (userData) => {
    const response = await postAPI('/conversation/add', { senderId: user?._id, receiverId: userData?._id });
    setPerson(userData);
    setSelectedUser(userData);
  };

  return (
    <List>
      {users?.map((userData, index) => {
        const isOnline = onlineUsers.includes(userData._id); // Check if userData._id exists in onlineUsers
        return userData?.email !== user?.email && (
          <Link key={index} to={'/'} style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => getUser(userData)}
                sx={{
                  backgroundColor: selectedUser?._id === userData._id ? '#c4e0f5' : '#f5f6f7',
                  '&:hover': {
                    backgroundColor: '#e0e0e0',
                  },
                  borderRadius: '10px',
                  my: '2px',
                  mx: '5px'
                }}
              >
                <ListItemIcon>
                  <Avatar
                    alt="Remy Sharp"
                    src={userData?.avatar}
                    sx={{ width: 24, height: 24 }}
                  />
                </ListItemIcon>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={{ textTransform: 'capitalize', fontWeight: '700', fontFamily: "Quicksand" }}>
                    {`${userData?.first_name} ${userData?.last_name}`}
                  </Typography>
                  <Typography sx={{ fontSize: 'small', letterSpacing: '.5px', fontWeight: '500', fontFamily: "Quicksand" }}>
                    {msgText.slice(0, 17) + '...'}
                  </Typography>
                  {isOnline ? (
                    <Typography sx={{ fontSize: 'small', color: 'green', fontFamily: "Quicksand", fontWeight: '500' }}>Online</Typography>
                  ) : (
                    <Typography sx={{ fontSize: 'x-small', color: 'red', fontFamily: "Quicksand" }}>Offline</Typography>
                  )}
                </Box>
              </ListItemButton>
            </ListItem>
          </Link>
        )
      })}
    </List>
  );
};

export default Conversations;
