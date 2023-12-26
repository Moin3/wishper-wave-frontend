import * as React from 'react';
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





const defaultTheme = createTheme();

export default function SignIn() {

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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              name="password"
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