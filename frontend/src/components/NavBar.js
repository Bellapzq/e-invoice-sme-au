import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Link, Box } from '@mui/material';

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login status

  // Check the logged in status every time the component is loaded
  useEffect(() => {
    const loggedInStatus = sessionStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);  // 同步登录状态
  }, []);  // 当 isLoggedIn 改变时，自动更新导航栏

  // Handling logout logic
  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn'); // Clear login status
    sessionStorage.removeItem('token');  // 清除存储的 token
    setIsLoggedIn(false); // Update Status
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#6589af', height: '90px' }}>
      <Toolbar style={{ justifyContent: 'space-between', height: '90px' }}>
        <Typography variant="h6" component="div">
          <img src="company-logo.png" alt="Company Logo" style={{ width: '40px', marginRight: '10px' }} />
          Company Name and Logo
        </Typography>
        <Box style={{ marginLeft: '-20px' }}>
          <Link href="/" color="inherit" style={{ marginRight: '20px', textDecoration: 'none', fontSize: '18px' }}>
            Home
          </Link>
          <Link href="/serviceType" color="inherit" style={{ marginRight: '20px', textDecoration: 'none', fontSize: '18px' }}>
            Service Type
          </Link>
          <Link href="/myAccount" color="inherit" style={{ marginRight: '20px', textDecoration: 'none', fontSize: '18px' }}>
            My Account
          </Link>
          {isLoggedIn ? (
            <Button
              onClick={handleLogout}
              variant="contained"
              style={{
                backgroundColor: '#FFFFFF',
                color: '#6589af',
                border: '1px solid #6589af',
                fontSize: '16px',
                textTransform: 'none',
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              href="/log-in"
              variant="contained"
              style={{
                backgroundColor: '#FFFFFF',
                color: '#6589af',
                border: '1px solid #6589af',
                fontSize: '16px',
                textTransform: 'none',
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
