import * as React from 'react';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import WebLogo from '../components/reusable/WebLogo';
import ColorToggleButton from '../components/reusable/AuthPageBtn';
import Copyright from '../components/reusable/Copyright';
import CustomBtn from '../components/reusable/CustomBtn';
import GoogleCustomLogin from '../components/reusable/GoogleCustomLogin';
import {useNavigate} from 'react-router-dom'
import { postAPI } from '../services/api';

import toast from 'react-hot-toast'
import { userAuth } from '../context/AccountProvider';




const defaultTheme = createTheme();

export default function SignIn() {
  const navigate=useNavigate()
  const {setToken,setUser,user,token}=userAuth()
  const initialState={email:'',password:''}
  const [userSignIn,setUserSignin]=useState(initialState)
  const {email,password}=userSignIn


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserSignin({...userSignIn,[name]:value})
  };


  const handleSubmit =async (event) => {
    event.preventDefault();
    // setUserSignin(initialState)
   try{
      if(email && password){
        const signInUser=await postAPI('/signin',userSignIn)
        const response=signInUser.data
          if(response.success){
            toast.success(response.msg)
            navigate('/')
            localStorage.setItem('token',JSON.stringify(response.token))
            localStorage.setItem('user',JSON.stringify(response.user))
            setToken(response.token)
            setUser(response.user)
          }
      }else{
        toast.error('Fill up all field')
      }
   }catch(err){
    toast.error(err.response.data.msg)
   }
    
  };
  

  React.useEffect(()=>{
    if(user && token){
      navigate('/')
    }
  },[token,user])




  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{display:'flex',placeItems:'center',minHeight: '100vh',px:'2rem',py:'3rem',fontFamily:'Poppins'}}>
      <Paper elevation={1} sx={{px:4,py:3}}>
        <CssBaseline />
        <Box
          sx={{
            mt:2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <WebLogo/>
          <ColorToggleButton/>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={handleChange}
              autoComplete="email"
            />
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              name="password"
              value={password}
              onChange={handleChange}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <CustomBtn label={'sign in'}/>
            <Divider sx={{mb:2}}>
              OR
            </Divider>
            <Grid container justifyContent="center">
              <Grid item >
                <GoogleCustomLogin /> 
              </Grid>
            </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}