import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { userAuth } from '../../context/AccountProvider';
import {useNavigate} from 'react-router-dom'


const drawerWidth = 240;


const SingleProfile = () => {

  const {user,token}=userAuth()
  const navigate=useNavigate()

  React.useEffect(()=>{
    if(!user || !token){
      navigate('/signin')
    }
  },[user,token])



  return (
    <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%'}}>
          <Card sx={{ maxWidth: 900,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
              />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
          </Card>
        </Box>
      </Box>
  )
}

export default SingleProfile