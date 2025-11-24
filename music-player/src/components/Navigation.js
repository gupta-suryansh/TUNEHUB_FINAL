// src/components/Navigation.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ user }) => {
  const location = useLocation();

  return (
    <nav className="main-nav">
      <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
        <i className="fas fa-home"></i> Player
      </Link>
      <Link to="/favorites" className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}>
        <i className="fas fa-heart"></i> Favorites
      </Link>
      <Link to="/profile" className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}>
        <i className="fas fa-user"></i> Profile
      </Link>
    </nav>
  );
};

export default Navigation;