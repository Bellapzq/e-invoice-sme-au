import React, { useState } from 'react';
import { Paper, TextField, Button, Typography, Link, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
// import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Regular expression to validate email format
  const emailRegex = /\S+@\S+\.\S+/;

  // Regular expression to verify password format
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  
  // Handling form submissions
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // check email input format
    if (!emailRegex.test(email)) {
      setError('Invalid email format. Please use @xxx.com.');
      return;
    }
    
    // check password format
    if (!passwordRegex.test(password)){
      setError('Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.');
      return;
    }

    if (password != confirmPassword){
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      // sent POST request to register API
      const response = await axios.post('http://localhost:5001/api/users/sign-up',{
        firstName,
        lastName,
        phoneNumber,
        email,
        password
      });

      // Redirect to the login page after successful registration
      setLoading(false);
      navigate('/log-in');
    }catch(error){
      setError('Registration failed. Please try again.');
      setLoading(false);
    }
  };

  // show password
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
          <Link href="/" variant="body3" style={{marginLeft: '7px'}}>Home Page</Link>
        </Box>
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          height="80%"
        >
          <Paper elevation={3} style={{ marginTop: '80px', marginLeft: '100px', padding: '40px', width: '80%' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Sign up
            </Typography>
            <form onSubmit={handleSubmit}>
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
                  onChange={(e) => setFirstName(e.target.value)}
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
                  onChange={(e) => setLastName(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(error && error.includes('email'))}
                helperText={error && error.includes('email') && error}
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                onInvalid={(e) => e.target.setCustomValidity("Please enter your email address.")}
                onInput={(e) => e.target.setCustomValidity('')} 
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                required
                placeholder="Uppercase, lowercase, numbers, special characters"
                onInvalid={(e) => e.target.setCustomValidity('Please enter your password.')}
                onInput={(e) => e.target.setCustomValidity('')}
                onChange={(e) => setPassword(e.target.value)}
                // error={Boolean(error && error.includes('Password'))} // 将 error 转为布尔值
                // helperText={error && error.includes('Password') && error} // 显示具体的错误信息
                InputProps={{
                  endAdornment: (
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
                  ),
                }}
              />
              <TextField
                label="Confirm Password"
                type= "password"
                variant="outlined"
                placeholder="Enter your password again"
                fullWidth
                margin="normal"
                required
                onInvalid={(e) => e.target.setCustomValidity("Please confirm your password.")}
                onInput={(e) => e.target.setCustomValidity('')} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                // error={Boolean(error && error.includes('email'))}
                // helperText={error && error.includes('Password') && error}
              />
              {error && <Typography color="error">{error}</Typography>}
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