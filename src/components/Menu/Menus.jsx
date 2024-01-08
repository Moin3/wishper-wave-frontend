import * as React from 'react';
import { userAuth } from '../../context/AccountProvider';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import ProfileSettings from '../chat/ProfileSettings';
import {styled} from '@mui/material/';
import SearchMenu from '../search/SearchMenu';
import { Link } from 'react-router-dom';
import { getAPI } from '../../services/api';
import {toast} from 'react-hot-toast'
import Conversations from './Conversations';







const drawerWidth = 240;

const ChattingHeader=styled(AppBar)`
    background: purple;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);

`


const Menus = () => {
    const {user}=userAuth()
    const [users, setUsers] = React.useState([]);
    const [searchText,setSearchText]=React.useState('')

    


   const [mobileOpen, setMobileOpen] = React.useState(false);

   const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar sx={{display:'flex',justifyContent:'center',alignItems:'center',fontWeight:500,fontFamily:'Acme',textTransform:'uppercase'}}>
        <Link onClick={()=>window.location.reload()}>
          {user && user.first_name}
        </Link>
      </Toolbar>
      <Toolbar sx={{display:'flex',justifyContent:'center',alignItems:'center',fontWeight:500,fontFamily:'Acme',textTransform:'uppercase'}}>
        <SearchMenu setSearchText={setSearchText}/>  {/*search functionality*/}
      </Toolbar>
      <Divider />
      {
        users?.map((userData,index)=>(
          userData.email !==user.email && 
          (  
            <Conversations users={userData} index={index} handleDrawerToggle={handleDrawerToggle}/>          
          )

        ))
      }
      
    </div>
  );


    

  React.useEffect(() => {
    const fetchData = async () => {
     try{
      let allUsers = await getAPI('/all_users')
      let usersData=allUsers.data
      let fiteredData = usersData.filter(userDetail => 
        `${userDetail.first_name} ${userDetail.last_name}`.toLowerCase().includes(searchText.toLocaleLowerCase())
      );      
      setUsers(fiteredData)
     }catch(err){
      toast.error(err.message)
     }
      
  }
  fetchData();
  }, [searchText]);
    
  return (  
    <Box>
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
    </Box>
  )
}

export default Menus