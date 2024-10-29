// src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/authService';

const Header = () => {
  const navigate = useNavigate();
  const username = getCurrentUser(); // This just checks if the user is logged in

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <h1>Articles-App</h1>
      <div className="header-right">
        {username ? (
          <>
            <button onClick={() => navigate('/profile')} className="header-button">Profile</button>
            <button onClick={handleLogout} className="header-button">Logout</button>
          </>
        ) : (
          <button onClick={() => navigate('/login')} className="header-button">Login</button>
        )}
      </div>
    </header>
  );
};

export default Header;
