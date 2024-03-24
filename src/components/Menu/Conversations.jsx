import React, { useEffect, useState } from 'react';
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

const Conversations = ({ users }) => {
  const { setPerson } = userInfo();
  const { user } = userAuth();
  const [selectedUser, setSelectedUser] = useState(null);
  const msgText = "The name of my country is Bangladesh";

  const getUser = async (userData) => {
    const response = await postAPI('/conversation/add', { senderId: user?._id, receiverId: userData?._id });
    setPerson(userData);
    setSelectedUser(userData); 
  };

  return (
    <List>
      {users?.map((userData, index) => (
        userData?.email !== user?.email && (
          <Link key={index} to={'/'} style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => getUser(userData)}
                // selected={selectedUser?._id === userData._id} // 
                sx={{
                    backgroundColor: selectedUser?._id === userData._id ? '#c4e0f5' : 'transparent', 
                    '&:hover': {
                      backgroundColor: '#e0e0e0', // 
                    },
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
                  <Typography sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                    {`${userData?.first_name} ${userData?.last_name}`}
                  </Typography>
                  <Typography sx={{ fontSize: 'small', letterSpacing: '.5px', fontWeight: 'semi-bold' }}>
                    {msgText.slice(0, 15) + '...'}
                  </Typography>
                </Box>
              </ListItemButton>
            </ListItem>
          </Link>
        )
      ))}
    </List>
  );
};

export default Conversations;
