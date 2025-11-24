// src/utils/auth.js
const STORAGE_KEY = 'musicAppUsers';

// Get all users from localStorage
const getUsers = () => {
  const users = localStorage.getItem(STORAGE_KEY);
  return users ? JSON.parse(users) : {};
};

// Save users to localStorage
const saveUsers = (users) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

// Simple hash function for passwords (in a real app, use a proper hashing library)
const hashPassword = (password) => {
  return btoa(password); // Base64 encoding (for demo only)
};

// Register a new user
export const registerUser = (email, password) => {
  const users = getUsers();
  
  if (users[email]) {
    return { success: false, message: 'Email already registered' };
  }

  users[email] = {
    email,
    password: hashPassword(password), // In a real app, use proper password hashing
    createdAt: new Date().toISOString()
  };

  saveUsers(users);
  return { success: true, user: { email } };
};

// Authenticate a user
export const loginUser = (email, password) => {
  const users = getUsers();
  const user = users[email];

  if (!user) {
    return { success: false, message: 'User not found' };
  }

  if (user.password !== hashPassword(password)) {
    return { success: false, message: 'Invalid password' };
  }

  return { 
    success: true, 
    user: { 
      email: user.email,
      // Don't include password in the returned user object
    } 
  };
};

// Get current user from session
export const getCurrentUser = () => {
  const user = localStorage.getItem('musicAppCurrentUser');
  return user ? JSON.parse(user) : null;
};

// Set current user in session
export const setCurrentUser = (user) => {
  if (user) {
    localStorage.setItem('musicAppCurrentUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('musicAppCurrentUser');
  }
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem('musicAppCurrentUser');
};