import * as React from 'react';
import { useContext } from 'react';
import { AccountContext } from '../../context/AccountProvider';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {styled} from '@mui/material';



const WelcomeText=styled(Typography)`
  background: #CF2EAF;
  background: linear-gradient(to right, #CF2EAF 27%, #24AAED 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2rem;
`

const UserName=styled(Typography)`
  background: linear-gradient(to right, #bf2ecf 27%, #245ded 100%);
  font-size: 2rem;
  color: #ffffff;

`
 
const drawerWidth = 240;

const EmptyChatBox = () => {

    const {account}=useContext(AccountContext)
  return (
    <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%'}}>
            <Card sx={{ maxWidth: 900,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                      <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                      <Typography sx={{fontFamily:'acme',fontSize:'5rem',mb:3,mr:2}}>Hi,</Typography>
                      <UserName gutterBottom variant="h5" component="div" align="center" sx={{fontFamily:'acme',fontSize:'2rem',px:'15px',py:'5px',borderRadius:'5px'}}>
                          {account.name}
                      </UserName>
                      </Box>
                    <WelcomeText sx={{fontFamily:'Acme',textAlign:'center'}}>
                        Welcome to the WishperWave
                    </WelcomeText>
                    <CardContent>
                    <Typography variant="body2" color="text.secondary" sx={{fontFamily:'Philosopher',textAlign:'center',fontWeight:'900',fontSize:'15px'}}>
                      "WishperWave,A application that allows people to easily connect and communicate in real-time. The application should provide a seamless and enjoyable chatting experience, with features such as instant messaging, user authentication, and a clean, responsive interface. The goal is to foster smooth and efficient communication while maintaining a visually appealing and intuitive design."
                    </Typography>
                    </CardContent>
            </Card>
        </Box>
      </Box>
  )
}

export default EmptyChatBox