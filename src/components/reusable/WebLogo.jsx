import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import WavingHandIcon from '@mui/icons-material/WavingHand';


const WebLogo = () => {
  return (
    <Box sx={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
        <Typography component="h1" variant="h5" sx={{fontFamily:'Acme'}}>
            WishperWave
        </Typography>
        <Avatar sx={{ m: 1, bgcolor: '#577799' }}>
            <WavingHandIcon />
        </Avatar>
    </Box>
  )
}

export default WebLogo