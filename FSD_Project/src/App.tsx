import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Weddings from './pages/Weddings';
import Parties from './pages/Parties';
import Meetups from './pages/Meetups';
import Seminars from './pages/Seminars';
import Bookings from './pages/Bookings';
import CheckIn from './pages/CheckIn';
import SignIn from './pages/SignIn';
import { getAuthToken } from './utils/auth';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = getAuthToken();
  return auth?.isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/wedding" element={<PrivateRoute><Weddings /></PrivateRoute>} />
          <Route path="/parties" element={<PrivateRoute><Parties /></PrivateRoute>} />
          <Route path="/meetups" element={<PrivateRoute><Meetups /></PrivateRoute>} />
          <Route path="/seminars" element={<PrivateRoute><Seminars /></PrivateRoute>} />
          <Route path="/bookings" element={<PrivateRoute><Bookings /></PrivateRoute>} />
          <Route path="/check-in/:venueId" element={<PrivateRoute><CheckIn /></PrivateRoute>} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;