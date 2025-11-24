// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Player from './pages/Player';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import LoginPage from './pages/LoginPage';
import Navigation from './components/Navigation';
import { getCurrentUser } from './utils/auth';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('musicAppCurrentUser');
    // Optionally clear other user-related data from localStorage
  };

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        {currentUser ? (
          <>
            <Routes>
              <Route path="/" element={<Player user={currentUser} onLogout={handleLogout} />} />
              <Route path="/profile" element={<Profile user={currentUser} onLogout={handleLogout} />} />
              <Route path="/favorites" element={<Favorites user={currentUser} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Navigation />
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;