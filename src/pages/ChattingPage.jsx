import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import EmptyChatBox from '../components/chat/EmptyChatBox';
import Menu from '../components/menu/menu';
import ChatBox from '../components/chat/ChatBox';
import { userInfo } from '../context/UserProvider';
import Footer from '../components/chat/Footer';

const drawerWidth = 240;
function ChattingPage(props) {
  const {person}=userInfo()

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
        <Menu/>
          {
            person ? 
            (
              <>
                <ChatBox/> 
              </>
            )
            : (<EmptyChatBox/>)
          }
    </Box>
  );
}


export default ChattingPage;