import * as React from 'react';
import { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ColorToggleButton from '../components/reusable/AuthPageBtn';
import Copyright from '../components/reusable/Copyright';
import Divider from '@mui/material/Divider'
import WebLogo from '../components/reusable/WebLogo';
import CustomBtn from '../components/reusable/CustomBtn';
import GoogleCustomLogin from '../components/reusable/GoogleCustomLogin';
import {  postAPI } from '../services/api';
import {useNavigate} from 'react-router-dom'

import toast from 'react-hot-toast'
import { userAuth } from '../context/AccountProvider';





const defaultTheme = createTheme();

export default function SignUp() {
  const navigate=useNavigate()
  const {user,token}=userAuth()
  const initialState={first_name:'',last_name:'',email:'',password:''}
  const [userSignUp,setUserSignUp]=useState(initialState)
  const {first_name,last_name,email,password}=userSignUp


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserSignUp({...userSignUp,[name]:value})
  };

  const handleSubmit =async (event) => {
    event.preventDefault();
    // setUserSignUp(initialState)
   try{
    if(first_name && last_name && email && password){
      const signUpUser=await postAPI('/signup',userSignUp)
      const response=signUpUser.data
      if(response.success){
        toast.success(response.msg)
        navigate('/signin')
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
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  autoComplete="given-name"
                  name="first_name"
                  value={first_name}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="last_name"
                  value={last_name}
                  onChange={handleChange}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  name="password"
                  value={password}
                  onChange={handleChange}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <CustomBtn label={'sign up'}/>
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