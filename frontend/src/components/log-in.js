import React from 'react';
import { Grid, Paper, TextField, Button, Typography, Checkbox, Link, Box } from '@mui/material';

const LoginPage = () => {
  return (
    <Grid container style={{ minHeight: '100vh' }}>
      {/* Left Section - Login Form */}
      <Grid item xs={12} md={6}>
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          height="100%"
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
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                required
              />
              <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
                <Checkbox color="primary" />
                <Typography variant="body2">Remember me</Typography>
                <Link href="#" variant="body2">Forgot Password?</Link>
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginBottom: '20px' }}
              >
                Log In
              </Button>
              <Typography variant="body2" align="center">
                No account yet? <Link href="#">Sign Up</Link>
              </Typography>
            </form>
          </Paper>
        </Box>
      </Grid>

      {/* Right Section - Illustration */}
      <Grid item xs={12} md={6} style={{ backgroundColor: '#FFFFFF' }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <img src="/img/login.png" alt="Invoice illustration" style={{ width: '80%', height: 'auto' }} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
