import React from 'react';
import { Paper, TextField, Button, Typography, Link, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Grid from '@mui/material/Grid';

function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid container style={{ minHeight: '100vh' }}>
      <Grid item xs={12} md={6}>
        {/* Left Section */}
        <Box display="flex" style={{marginLeft: '10%', marginTop: '10px'}}>
          <img src="left-arrow.png" style={{ width: '20px', height: '20px', marginRight: '10px' }}></img>
          <Typography>Sign up next time. Back to</Typography>
          <Link href="/home" variant="body3" style={{marginLeft: '7px'}}>Home Page</Link>
        </Box>
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          height="80%"
        >
          <Paper elevation={3} style={{ marginLeft: '100px', padding: '40px', width: '80%' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Sign up
            </Typography>
            <form>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  onInvalid={(e) => e.target.setCustomValidity("Please enter your first name.")}
                  onInput={(e) => e.target.setCustomValidity('')} 
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  onInvalid={(e) => e.target.setCustomValidity("Please enter your last name.")}
                  onInput={(e) => e.target.setCustomValidity('')} 
                />
              </Grid>
            </Grid>
              <TextField
                label="Email Address"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                placeholder="example: xxx@xxx.com"
                onInvalid={(e) => e.target.setCustomValidity("Please enter your email address.")}
                onInput={(e) => e.target.setCustomValidity('')} 
              />
              <FormControl style={{ marginTop: '20px' }} variant="outlined" fullWidth required>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="uppercase letters, lowercase letters, numbers and characters #%&*@! ^"
                  onInvalid={(e) => e.target.setCustomValidity("Please enter your password.")}
                  onInput={(e) => e.target.setCustomValidity('')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <FormControl style={{ marginTop: '20px' }} variant="outlined" fullWidth required>
                <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'confirm password'}
                  placeholder="Enter your password again"
                  onInvalid={(e) => e.target.setCustomValidity("Please confirm your password.")}
                  onInput={(e) => e.target.setCustomValidity('')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                style={{ backgroundColor: '#6482AD',  marginBottom: '20px', marginTop: '30px' }}
              >
                Sign up
              </Button>
              <Typography variant="body2">
                Already had account. <Link href="/log-in">Log In</Link>
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
          <img src="signup.png" alt="Invoice illustration" style={{ width: '60%', height: 'auto', marginBottom: '13%' }} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default SignUp;