import React from 'react';
import { Grid, Paper, TextField, Button, Typography, Checkbox, Link, Box } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginPage = () => {
  return (
    <Grid container style={{ minHeight: '100vh' }}>
      <Grid item xs={12} md={6}>
        {/* Left Section */}
        <Box display="flex" style={{marginLeft: '10%', marginTop: '10px'}}>
          <img src="left-arrow.png" style={{ width: '20px', height: '20px', marginRight: '10px' }}></img>
          <Link href="/home" variant="body3">Log in next time</Link>
        </Box>
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          height="80%"
        >
          <Paper elevation={3} style={{ marginLeft: '100px', padding: '40px', width: '80%' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Log In
            </Typography>
            <form>
              <TextField
                label="Email Address"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                onInvalid={(e) => e.target.setCustomValidity("Please enter your email address.")}
                onInput={(e) => e.target.setCustomValidity('')} 
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                onInvalid={(e) => e.target.setCustomValidity("Please enter your password.")}
                onInput={(e) => e.target.setCustomValidity('')} 
              />
              <Box display="flex" justifyContent="flex-start" alignItems="center" my={2}>
                <Checkbox color="primary" />
                <Typography variant="body2">Remember me</Typography>
                <Link href="#" variant="body2" style={{ marginLeft: 'auto' }}>Forgot Password?</Link>
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ backgroundColor: '#6482AD', marginBottom: '20px' }}
              >
                Log In
              </Button>
              <Typography variant="body2">
                No account yet? <Link href="/sign-up">Sign Up</Link>
              </Typography>
            </form>
          </Paper>
        </Box>
      </Grid>

      {/* Right Section */}
      <Grid item xs={12} md={6} style={{ backgroundColor: '#FFFFFF' }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <img src="login.png" alt="Invoice illustration" style={{ width: '80%', height: 'auto' }} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
