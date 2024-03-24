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
  const msgText = "The name of my country is Bangladesh";


  const getUser = async (userData) => {
    const response=await postAPI('/conversation/add', { senderId: user?._id, receiverId: userData?._id });
    setPerson(userData);

  };

  return (
    <List>
        {users?.map((userData, index) => (
            userData?.email !== user?.email && (
            <ListItem key={index} disablePadding>
                <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>
                <ListItemButton onClick={() => getUser(userData)}>
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
                </Link>
            </ListItem>
            )
        ))}
    </List>

  );
};

export default Conversations;
