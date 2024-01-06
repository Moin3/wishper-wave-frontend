import * as React from 'react';
import { userAuth } from '../../context/AccountProvider';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import ProfileSettings from '../chat/ProfileSettings';
import {styled} from '@mui/material/';
import SearchMenu from '../search/SearchMenu';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import { getAPI } from '../../services/api';
import Conversations from './Conversations';





const drawerWidth = 240;

const ChattingHeader=styled(AppBar)`
    background: rgba(4, 60, 245, 0.26);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);

`


const Menu = () => {
    const {user}=userAuth()
    const [users, setUsers] = React.useState([]);

    const navigate=useNavigate()

   const [mobileOpen, setMobileOpen] = React.useState(false);

   const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar sx={{display:'flex',justifyContent:'center',alignItems:'center',fontWeight:500,fontFamily:'Acme',textTransform:'uppercase'}}>
        <Link to='/'>
          {user && user.first_name}
        </Link>
      </Toolbar>
      <Toolbar sx={{display:'flex',justifyContent:'center',alignItems:'center',fontWeight:500,fontFamily:'Acme',textTransform:'uppercase'}}>
        <SearchMenu/>
      </Toolbar>
      <Divider />

      {/* <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
      <Conversations users={users}/>
    </div>
  );


    

  React.useEffect(() => {
    const fetchData = async () => {
     try{
      let allUsers = await getAPI('/all_users')
      let usersData=allUsers.data
      setUsers(usersData)
     }catch(err){
console.log(err.message)
     }
      
  }
  fetchData();
  }, []);
    
  return (  
    <>
      <ChattingHeader
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          boxShadow:'none'
        }}
      >

        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {/* /* --------------------- ProfileSettings is impoted here -------------------- */}
          <Box sx={{width:'100%',display:'flex',justifyContent:'flex-end',mr:2}}>
            <ProfileSettings/>
          </Box>
        </Toolbar>
      </ChattingHeader>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
    </>
  )
}

export default Menu