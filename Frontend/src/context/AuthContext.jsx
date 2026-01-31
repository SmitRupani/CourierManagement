import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

// Cookie utility functions
const setCookie = (name, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
};

const getCookie = (name) => {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }
  return null;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for token in cookies first, then localStorage (for backward compatibility)
    let token = getCookie('token');
    
    // Migrate from localStorage to cookies if needed
    if (!token) {
      token = localStorage.getItem('token');
      if (token) {
        setCookie('token', token);
        localStorage.removeItem('token'); // Clean up localStorage
      }
    }

    // Also try to restore user from cookie
    const savedUser = getCookie('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        deleteCookie('user');
      }
    }

    if (token) {
      authService.getCurrentUser()
        .then(response => {
          setUser(response.data);
          // Save user to cookie
          setCookie('user', JSON.stringify(response.data));
        })
        .catch(() => {
          deleteCookie('token');
          deleteCookie('user');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    const token = response.data.token || response.data.accessToken;
    
    // Save token to cookie
    setCookie('token', token);
    
    // Fetch and save user details
    const userResponse = await authService.getCurrentUser();
    setUser(userResponse.data);
    setCookie('user', JSON.stringify(userResponse.data));
    
    return response.data;
  };

  const logout = () => {
    // Clear cookies
    deleteCookie('token');
    deleteCookie('user');
    
    // Also clear localStorage for backward compatibility
    localStorage.removeItem('token');
    
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
