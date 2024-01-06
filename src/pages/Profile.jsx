import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Menu from '../components/menu/menu';
import SingleProfile from '../components/profile/SingleProfile';


function Profile(props) {
  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Menu/>
      <SingleProfile/>
    </Box>
  );
}


export default Profile;