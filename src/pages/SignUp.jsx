import * as React from 'react';
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





const defaultTheme = createTheme();

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

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
                  name="firstName"
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
                  name="lastName"
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
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  name="password"
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