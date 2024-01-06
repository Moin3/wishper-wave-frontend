import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar'
import { userInfo } from '../../context/UserProvider';
import { Link } from 'react-router-dom';


const Conversations = ({users,handleDrawerToggle}) => {
    const {setPerson} =userInfo()

    const getUser = async () => {
        setPerson(users);
        handleDrawerToggle()
        
    }
  return (
        <List>
          <Link to={'/'} style={{textDecoration:'none',color:'black'}}>
            <ListItem disablePadding>
                <ListItemButton onClick={() => getUser()}>
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