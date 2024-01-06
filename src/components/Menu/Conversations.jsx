import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Avatar from '@mui/material/Avatar'


const Conversations = ({users}) => {
  return (
    <List>
        {users?.map((user, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Avatar
                    alt="Remy Sharp"
                    src={user?.avatar}
                    sx={{ width: 24, height: 24 }}
                />
              </ListItemIcon>
              <ListItemText sx={{textTransform:'capitalize'}} primary={`${user?.first_name} ${user?.last_name}`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
  )
}

export default Conversations