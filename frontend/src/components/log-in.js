import React, { useState } from 'react';
import { Grid, Paper, TextField, Button, Typography, Checkbox, Link, Box } from '@mui/material';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setLoggedIn }) => {
    // Use the useState hook to store the email and password entered by the user 使用 useState 钩子来存储用户输入的邮箱和密码
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');  // To handle error messages 用于处理错误提示
    const [loading, setLoading] = useState(false);  // To display the loading status
    const navigate = useNavigate();
    const [rememberMe, setRememberMe] = useState(false);  // Remember me state
  
    // Processing function when the form is submitted 表单提交时的处理函数
    const handleSubmit = async (e) => {
      e.preventDefault();  // Prevent page refresh
      setLoading(true);  // Start loading
  
      try {
        // Initiate a POST request to the backend API
        const response = await axios.post('http://localhost:5001/api/users/login', {
          email,
          password
        });

        if (rememberMe) {
          localStorage.setItem('email', email); 
        }
  
       // Processing after successful login
        const token = response.data.token;
        // localStorage.setItem('token', token);  // 存储从后端返回的 JWT token
        sessionStorage.setItem('token', token);
        console.log('JWT Token:', response.data.token);
        // localStorage.setItem('isLoggedIn', 'true');  // 登录状态
        sessionStorage.setItem('isLoggedIn', 'true'); 
        // 在登录成功后调用 setLoggedIn(true)
        setLoggedIn(true);
        // fetchData();  // 调用 fetchData 函数，获取受保护的资源
        setError('');  // Clear error message
        setLoading(false);
        // After successful login, jump to the home page
        navigate('/');  
    } catch (error) {
      // Catch the error and update the error status
      setError('Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <Grid container style={{ minHeight: '100vh' }}>
      <Grid item xs={12} md={6}>
        {/* Left Section */}
        <Box display="flex" style={{marginLeft: '10%', marginTop: '10px'}}>
          <img src="left-arrow.png" style={{ width: '20px', height: '20px', marginRight: '10px' }}></img>
          <Link href="/" variant="body3">Log in next time</Link>
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
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email Address"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                onInvalid={(e) => e.target.setCustomValidity("Please enter your email address.")}
                onInput={(e) => e.target.setCustomValidity('')} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <Typography color="error" variant="body2">{error}</Typography>}
              <Box display="flex" justifyContent="flex-start" alignItems="center" my={2}>
                <Checkbox
                  color="primary"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <Typography variant="body2">Remember me</Typography>
                <Link href="#" variant="body2" style={{ marginLeft: 'auto' }}>Forgot Password?</Link>
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ backgroundColor: '#6482AD', marginBottom: '20px' }}
                disabled={loading}  // 防止重复提交
              >
                {loading ? 'Logging in...' : 'Log In'}
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
