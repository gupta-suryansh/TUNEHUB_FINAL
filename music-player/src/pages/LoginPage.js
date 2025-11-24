// src/pages/LoginPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, setCurrentUser } from '../utils/auth';
import './LoginPage.css';

// List of allowed email domains
const ALLOWED_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'hotmail.com',
  'icloud.com',
  'protonmail.com'
];

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any existing error when switching between login/signup
    setError('');
  }, [isSignup]);

  const validateEmail = (email) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }

    // Domain validation
    const domain = email.split('@')[1].toLowerCase();
    if (!ALLOWED_DOMAINS.some(allowed => domain === allowed || domain.endsWith(`.${allowed}`))) {
      return `Only the following email domains are allowed: ${ALLOWED_DOMAINS.join(', ')}`;
    }

    return '';
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/\d/.test(password)) {
      return 'Password must contain at least one number';
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return 'Password must contain at least one special character (!@#$%^&*)';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate email
      const emailError = validateEmail(email);
      if (emailError) {
        setError(emailError);
        return;
      }

      if (isSignup) {
        // Handle signup
        const passwordError = validatePassword(password);
        if (passwordError) {
          setError(passwordError);
          return;
        }

        const result = registerUser(email, password);
        if (result.success) {
          setCurrentUser(result.user);
          onLogin(result.user);
          navigate('/');
        } else {
          setError(result.message || 'Registration failed');
        }
      } else {
        // Handle login
        const result = loginUser(email, password);
        if (result.success) {
          setCurrentUser(result.user);
          onLogin(result.user);
          navigate('/');
        } else {
          setError(result.message || 'Invalid email or password');
        }
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>{isSignup ? 'Create Account' : 'Welcome Back'}</h1>
        <p className="subtitle">
          {isSignup ? 'Sign up with your email' : 'Sign in to continue to Music Player'}
          {isSignup && (
            <span className="allowed-domains">
              Allowed domains: {ALLOWED_DOMAINS.join(', ')}
            </span>
          )}
        </p>

        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              placeholder="Enter your email"
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isSignup ? 'Create a password' : 'Enter your password'}
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              required
              minLength={isSignup ? 8 : 1}
            />
            {isSignup && (
              <div className="password-requirements">
                <p>Password must contain:</p>
                <ul>
                  <li>At least 8 characters</li>
                  <li>At least one number</li>
                  <li>At least one special character</li>
                </ul>
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                <span style={{ marginLeft: '8px' }}>
                  {isSignup ? 'Creating Account...' : 'Signing In...'}
                </span>
              </>
            ) : (
              isSignup ? 'Sign Up' : 'Sign In'
            )}
          </button>
        </form>

        <p className="switch-mode">
          {isSignup ? 'Already have an account? ' : "Don't have an account? "}
          <button 
            type="button" 
            className="switch-button"
            onClick={() => {
              setIsSignup(!isSignup);
              setError('');
              setEmail('');
              setPassword('');
            }}
            disabled={isLoading}
          >
            {isSignup ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;