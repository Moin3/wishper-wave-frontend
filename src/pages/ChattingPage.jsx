import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import EmptyChatBox from '../components/chat/EmptyChatBox';
import ChatBox from '../components/chat/ChatBox';
import { userInfo } from '../context/UserProvider';
import Menus from '../components/menu/Menus';

function ChattingPage(props) {
  const { person } = userInfo();


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Menus />
      {person ? (<ChatBox />) : (<EmptyChatBox />)}
    </Box>
  );
}

export default ChattingPage;
