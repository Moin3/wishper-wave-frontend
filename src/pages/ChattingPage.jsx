import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import EmptyChatBox from '../components/chat/EmptyChatBox';
import Menu from '../components/menu/menu';


function ChattingPage(props) {
  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Menu/>
      <EmptyChatBox/>
    </Box>
  );
}


export default ChattingPage;