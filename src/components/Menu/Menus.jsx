import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import ProfileSettings from '../chat/ProfileSettings';
import { TiHome } from "react-icons/ti";
import { BiSolidExit } from "react-icons/bi";
import {Tooltip, Typography, styled} from '@mui/material/';
import SearchMenu from '../search/SearchMenu';
import { Link } from 'react-router-dom';
import { getAPI } from '../../services/api';
import {toast} from 'react-hot-toast'
import Conversations from './Conversations';
import { userInfo } from '../../context/UserProvider';
import Modal from '../reusable/Modal';



const drawerWidth = 240;

const ChattingHeader=styled(AppBar)`
    background: #577799;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border-radius:10px;
`


const Menus = () => {
    const [users, setUsers] = React.useState([]);
    const { setPerson } = userInfo();
    const [searchText,setSearchText]=React.useState('')
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

   const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const drawer = (
    <Box>
      <Toolbar>
        <Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-around',alignItems:'space-between'}}>
            <Link onClick={()=>setPerson(null)} to={'/intro'}>
            <Tooltip title="Intro Page">
              <Typography sx={{fontSize:'30px',color:'black',
                    '&:hover': {
                      color: 'gray',
                    }}}> 
                <TiHome/>
              </Typography>
            </Tooltip>
            </Link>
            <Tooltip title="Logout">
              <Typography onClick={handleOpenModal} sx={{fontSize:'30px',color:'black',cursor:'pointer',
                      '&:hover': {
                        color: 'gray',
                      }}}>
                  <BiSolidExit />
              </Typography>
            </Tooltip> 
        </Box>
      </Toolbar>
      <Toolbar sx={{display:'flex',justifyContent:'center',alignItems:'center',fontWeight:500,fontFamily:'Acme',textTransform:'uppercase'}}>
        <SearchMenu setSearchText={setSearchText}/>  {/*search functionality*/}
      </Toolbar>
      <Divider />
      {/* conversation functionality */}
      <Conversations users={users}/> 
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />         
    </Box>
  );


    

  React.useEffect(() => {
    const fetchData = async () => {
     try{
      let allUsers = await getAPI('/all_users')
      let usersData=allUsers.data
      let fiteredData = usersData.filter(userDetail => 
        `${userDetail?.first_name} ${userDetail?.last_name}`.toLowerCase().includes(searchText.toLocaleLowerCase())
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