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
  const {userMainInfo,setMainUserInfo}=useState()
  const {recieverInfo,setRecieverInfo}=useState()
  const msgText = "The name of my country is Bangladesh";
//   const moin=[].push(users)

//   console.log(moin)

console.log(users)


  const getUser = async (receiverInfo) => {
    console.log(receiverInfo)
    
        await postAPI('/conversation/add', { senderId: user?._id, receiverId: receiverInfo._id});
        // setPerson([receiverInfo]);
  };

  return (
    <List>
        {
            users.map((userInfo,index)=>{
                <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>
                <ListItem disablePadding key={index}>
                  <ListItemButton onClick={getUser(userInfo)}>
                    <ListItemIcon>
                      <Avatar
                        alt="Remy Sharp"
                        src={userInfo?.avatar}
                        sx={{ width: 24, height: 24 }}
                      />
                    </ListItemIcon>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                        {`${userInfo?.first_name} ${userInfo?.last_name}`}
                      </Typography>
                      <Typography sx={{ mb: '0px', fontSize: 'small', letterSpacing: '.5px', fontWeight: 'semi-bold' }}>
                        {msgText.slice(0, 15) + '...'}
                      </Typography>
                    </Box>
                  </ListItemButton>
                </ListItem>
              </Link>
            })
        }

    </List>
  );
};

export default Conversations;
