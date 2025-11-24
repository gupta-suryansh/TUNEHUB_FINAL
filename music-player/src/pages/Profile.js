// src/pages/Profile.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <i className="fas fa-user-circle"></i>
        </div>
        <h1>{user?.email || 'User'}</h1>
        <p className="member-since">Member since {new Date().toLocaleDateString()}</p>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <i className="fas fa-music"></i>
          <div className="stat-value">42</div>
          <div className="stat-label">Songs Played</div>
        </div>
        <div className="stat-card">
          <i className="fas fa-heart"></i>
          <div className="stat-value">18</div>
          <div className="stat-label">Favorites</div>
        </div>
        <div className="stat-card">
          <i className="fas fa-clock"></i>
          <div className="stat-value">24h 36m</div>
          <div className="stat-label">Listening Time</div>
        </div>
      </div>

      <div className="profile-actions">
        <button className="edit-profile-btn">
          <i className="fas fa-user-edit"></i> Edit Profile
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;