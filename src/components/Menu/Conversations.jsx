import React, { useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar'
import { userInfo } from '../../context/UserProvider';
import { Link } from 'react-router-dom';
import { postAPI } from '../../services/api';
import { userAuth } from '../../context/AccountProvider';


const Conversations = ({users,index}) => {
    const {setPerson} =userInfo()
    const {user}=userAuth()


    const getUser = async () => {
        await postAPI('/conversation/add',{senderId:user?._id,receiverId:users?._id})
        setPerson(users);

    }



  return (
        <List>
          <Link to={'/'} style={{textDecoration:'none',color:'black'}} >
                <ListItem disablePadding key={index}>
                <ListItemButton onClick={ getUser} >
                <ListItemIcon>
                    <Avatar
                        alt="Remy Sharp"
                        src={users?.avatar}
                        sx={{ width: 24, height: 24 }}
                    />
                </ListItemIcon>
                <ListItemText sx={{textTransform:'capitalize'}} primary={`${users?.first_name} ${users?.last_name}`} />
                </ListItemButton>
            </ListItem>
        </Link>
        </List>

  )
}

export default Conversations