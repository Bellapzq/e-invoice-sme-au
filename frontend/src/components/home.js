import React from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  AppBar,
  Toolbar,
  Link,
  Paper,
} from "@mui/material";

const HomePage = () => {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FFFFFF" }}>
      {/* Header */}
      <AppBar
        position="static"
        style={{ backgroundColor: "#6589af", height: "90px" }}
      >
        <Toolbar style={{ justifyContent: "space-between", height: "90px" }}>
          <Typography variant="h6" component="div">
            <img
              src="company-logo.png"
              style={{ width: "40px", marginRight: "10px" }}
            />
            Company Name and Logo
          </Typography>
          <Box style={{ marginLeft: "-20px" }}>
            <Link
              href="/"
              color="inherit"
              style={{
                marginRight: "20px",
                textDecoration: "none",
                fontSize: "18px",
              }}
            >
              Home
            </Link>
            <Link
              href="/serviceType"
              color="inherit"
              style={{
                marginRight: "20px",
                textDecoration: "none",
                fontSize: "18px",
              }}
            >
              Service Type
            </Link>
            <Link
              href="/myAccount"
              color="inherit"
              style={{
                marginRight: "20px",
                textDecoration: "none",
                fontSize: "18px",
              }} // Set font size
            >
              My Account
            </Link>
            <Button
              href="/log-in"
              variant="contained"
              style={{
                backgroundColor: "#FFFFFF",
                color: "#6589af",
                border: "1px solid #6589af",
                fontSize: "16px",
                textTransform: "none",
              }}
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Section */}
      <Grid container style={{ padding: "50px" }}>
        {/* Left Section - Illustration */}
        <Grid
          item
          xs={12}
          md={6}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <img
            src="home_1.png"
            alt="Invoice illustration"
            style={{ maxWidth: "80%", height: "auto" }}
          />
        </Grid>

        {/* Right Section - Text */}
        <Grid
          item
          xs={12}
          md={6}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            style={{
              fontFamily: "Righteous",
              fontSize: "48px",
              fontWeight: "400",
              lineheight: "20px",
              letterspacing: "0.1px",
            }}
          >
            🚀 Automate Your Invoicing
            <br />- Fast, Easy, and Hassle-Free!
          </Typography>
          <Typography variant="body1" paragraph>
            Tired of the tedious process of generating invoices manually? Let us
            take care of that with our Automatic Invoicing Website, designed to
            simplify and speed up your billing process, so you can focus on what
            matters most — growing your business!
          </Typography>

          <Button
            variant="contained"
            size="large"
            href="/serviceType"
            style={{
              backgroundColor: "#84a9d9",
              width: "fit-content",
              padding: "8px 16px",
              textTransform: "none",
            }}
          >
            Start your service
          </Button>
        </Grid>
      </Grid>

      {/* Customers Section */}
      <Box textAlign="center" padding="50px 0">
        <Typography
            variant="h3"
            component="h1"
            gutterBottom
            style={{
              fontFamily: "Roboto",
              fontSize: "48px",
              fontWeight: "400",
            }}
          >
          Thousands of customers and partners trust us
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center">
          {/* Example customer icons */}
          <img
            src="customer_1.png"
            alt="Customer 1"
            style={{ width: "200px", margin: "100px" }}
          />
          <img
            src="customer_2.png"
            alt="Customer 2"
            style={{ width: "200px", margin: "100px" }}
          />
          <img
            src="customer_3.png"
            alt="Customer 3"
            style={{ width: "200px", margin: "100px" }}
          />
          <img
            src="customer_4.png"
            alt="Customer 4"
            style={{ width: "200px", margin: "100px" }}
          />
        </Box>
      </Box>

      {/* Key Features Section */}
      <Box padding="50px" bgcolor="#F0F4F8">
        <Typography variant="h4" textAlign="center" gutterBottom>
          Key Features
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              style={{ padding: "20px", textAlign: "center" }}
            >
              <img
                src="home_2.png"
                alt="Feature 1"
                style={{ width: "100%", height: "auto" }}
              />
              <Typography variant="h6">Invoice Creation</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              style={{ padding: "20px", textAlign: "center" }}
            >
              <img
                src="home_3.png"
                alt="Feature 2"
                style={{ width: "100%", height: "auto" }}
              />
              <Typography variant="h6">
                Invoice Sending and Receiving
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              style={{ padding: "20px", textAlign: "center" }}
            >
              <img
                src="home_4.png"
                alt="Feature 3"
                style={{ width: "100%", height: "auto" }}
              />
              <Typography variant="h6">Invoice Validation</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>


      {/* Contact Section */}
      <Grid container style={{ padding: "50px" }}>
        {/* Left Section - Illustration */}
        <Grid
          item
          xs={12}
          md={6}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <img
            src="home_5.png"
            alt="Contact illustration"
            style={{ maxWidth: "80%", height: "auto" }}
          />
        </Grid>
        {/* Right Section - Text */}
        <Grid
          item
          xs={12}
          md={6}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            style={{
              fontFamily: "Righteous",
              fontSize: "48px",
              fontWeight: "400",
            }}
          >
            Contact us for further information!
          </Typography>

          <Button
            variant="contained"
            size="large"
            href="/serviceType"
            style={{
              backgroundColor: "#84a9d9",
              width: "fit-content",
              padding: "8px 16px",
              textTransform: "none",
            }}
          >
            Click here
          </Button>
        </Grid>
      </Grid>

      {/* Footer Section */}
      <Box bgcolor="#F0F4F8" padding="20px" display="flex" justifyContent="space-between" textAlign="center">
        <Box textAlign="center">
          <img
            src="home_6.png"
            alt="Peppol"
            style={{ maxWidth: "30%", height: "auto" }}
          />
          <Typography variant="body2">
            Peppol Supporting ©
          </Typography>
        </Box>
        <Box textAlign="right">
          <Typography variant="body2">
            © 2024 Company Name. All Rights Reserved.
          </Typography>
          <Typography variant="body2">
            IT developing team: CTRL+ALT+ELITE
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;
