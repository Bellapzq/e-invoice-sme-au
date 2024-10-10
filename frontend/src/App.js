import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/home';
import Login from './components/log-in';
import SignUp from './components/sign-up';
import ServiceType from './components/serviceType'
import MyService from './components/myService';
import NavBar from './components/NavBar'; 

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
        {location.pathname !== '/log-in' && location.pathname !== '/sign-up' && (
          <NavBar />
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/serviceType" element={<ServiceType />} />
          <Route path="/myService" element={<MyService />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;