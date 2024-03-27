import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material';

import { keyFeature } from '../../utils/data';

const WelcomeText = styled(Typography)`
  color: #577799;
  font-size: 2rem;
  font-family: Quicksand;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
`;

const drawerWidth = 240;

export default function EmptyChatBox() {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
    >
      <Toolbar />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Card sx={{ maxWidth: 900, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <WelcomeText>
            Welcome to the WishperWave
          </WelcomeText>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: '600', fontFamily: "Quicksand", textAlign: 'justify', fontSize: '14px', px: 7, mt: '15px' }}>
            "WishperWave, an application that allows people to easily connect and communicate in real-time. The application should provide a seamless and enjoyable chatting experience, with features such as instant messaging, user authentication, and a clean, responsive interface. The goal is to foster smooth and efficient communication while maintaining a visually appealing and intuitive design."
          </Typography>
          <CardContent>
            <WelcomeText sx={{ fontSize: '1.5rem' }}>
              Key Features:
            </WelcomeText>
            <List sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper' }}>
              {keyFeature.map((listOpt, index) => (
                <div key={index}>
                  <ListItem sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: { xs: 'column', sm: 'column', md: 'row' }, justifyContent: { xs: 'start', md: 'center' }, alignItems: 'center' }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: '#c4e0f5', color: 'black' }}>{listOpt.icon}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ fontWeight: '600', fontFamily: "Quicksand", textAlign: { xs: 'start', sm: 'start' } }}
                            color="text.primary"
                          >
                            {listOpt.label}
                          </Typography>
                          <Typography sx={{ fontWeight: '500', fontFamily: "Quicksand", textAlign: { xs: 'start', sm: 'start' } }} >
                            {listOpt.des}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  {index < keyFeature.length - 1 && <Divider variant="inset" component="li" />}
                </div>
              ))}
            </List>

          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
