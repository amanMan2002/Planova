import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PartyPopper } from 'lucide-react';
import { getAuthToken, removeAuthToken } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const auth = getAuthToken();

  const handleLogout = () => {
    removeAuthToken();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <PartyPopper className="h-8 w-8 text-pink-500" />
              <span className="ml-2 text-2xl font-bold text-pink-500">Planova</span>
            </Link>
            {auth?.isLoggedIn && (
              <div className="ml-10 flex items-center space-x-4">
                <Link to="/wedding" className="text-gray-700 hover:text-pink-500">Wedding</Link>
                <Link to="/parties" className="text-gray-700 hover:text-pink-500">Parties</Link>
                <Link to="/meetups" className="text-gray-700 hover:text-pink-500">Meetups</Link>
                <Link to="/seminars" className="text-gray-700 hover:text-pink-500">Seminars</Link>
                <Link to="/bookings" className="text-gray-700 hover:text-pink-500">Bookings</Link>
              </div>
            )}
          </div>
          <div className="flex items-center">
            {auth?.isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <button className="bg-pink-500 text-white px-4 py-2 rounded-md">
                  Plan Your Event
                </button>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-pink-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
      <Link
        to="/login"
        className="bg-pink-500 text-white px-4 py-2 rounded-md"
      >
        Login
      </Link>
      <Link
        to="/signin"
        className="bg-pink-500 text-white px-4 py-2 rounded-md"
      >
        Sign In
      </Link>
    </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;