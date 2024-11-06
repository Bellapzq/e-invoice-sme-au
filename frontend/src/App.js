import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/home';
import Login from './components/log-in';
import SignUp from './components/sign-up';
import ServiceType from './components/serviceType'
import MyService from './components/myService';
import NavBar from './components/NavBar'; 
import Management from './components/management';
import SendConnection from './components/relationship/sendConnection';
import PendingRequests from './components/relationship/PendingRequests'
import PartnerCompanies from './components/relationship/PartnerCompanies'
import FileUpload from './components/uploadTest'
import Profile from './components/profile'
import ProfileUpdate from './components/profileUpdate'

function App() {
  return (
    <Router>
      <InnerApp />
    </Router>
  );
}

function InnerApp() {
  const location = useLocation();
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <div className="content">
        {location.pathname !== '/log-in' && location.pathname !== '/sign-up' && (
          <NavBar />
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log-in" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/serviceType" element={<ServiceType />} />
          <Route path="/myService" element={<MyService />} />
          <Route path="/management" element={<Management />} />
          <Route path="/sendConnection" element={<SendConnection />} />
          <Route path="/pendingRequests" element={<PendingRequests />} />
          <Route path="/partnerCompanies" element={<PartnerCompanies />} />
          <Route path="/fileUpload" element={<FileUpload />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profileUpdate" element={<ProfileUpdate />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;