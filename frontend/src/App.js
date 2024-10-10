import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/home';
import Login from './components/log-in';
import SignUp from './components/sign-up';
import ServiceType from './components/serviceType'
import MyService from './components/myService';

function App() {
  return (
    <Router>
      <InnerApp />
    </Router>
  );
}

function InnerApp() {
  const location = useLocation();

  return (
    <div className="App">
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/serviceType" element={<ServiceType />} />
          <Route path="/myService" element={<MyService />} />
        </Routes>
        {location.pathname !== '/log-in' && location.pathname !== '/sign-up' && (
          <nav className="nav-links">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/log-in">Log in</Link>
            <Link className="nav-link" to="/serviceType">Service Type</Link>
            <Link className="nav-link" to="/myService">My Service</Link>
          </nav>
        )}
      </div>
    </div>
  );
}

export default App;