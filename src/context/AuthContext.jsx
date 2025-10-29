import React, { createContext, useContext, useState } from 'react';
import { mockUsers } from '../data/mockData';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  // Login with username from users.json
  const login = (username, password) => {
    // Find user by username
    const foundUser = mockUsers.find(u => u.username === username);

    if (foundUser) {
      // User found - login with their role
      setUser(foundUser);
      setIsAuthenticated(true);
      setShowRoleSelector(false);
      return true;
    } else {
      // User not found - show role selector for demo
      setShowRoleSelector(true);
      return false;
    }
  };

  // Select role after "login" (fallback for demo)
  const selectRole = (role) => {
    // Find a user with this role from mock data
    const mockUser = mockUsers.find(u => u.role === role) || {
      id: 'demo-user',
      username: 'demo',
      name: 'Demo User',
      name_ar: 'مستخدم تجريبي',
      role: role,
      email: `${role}@demo.sa`,
    };

    setUser(mockUser);
    setIsAuthenticated(true);
    setShowRoleSelector(false);
  };

  // Switch role (for demo purposes)
  const switchRole = (newRole) => {
    selectRole(newRole);
  };

  // Logout - resets to login
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setShowRoleSelector(false);
  };

  // Check if user has specific role
  const hasRole = (roles) => {
    if (!user) return false;
    if (typeof roles === 'string') return user.role === roles;
    return roles.includes(user.role);
  };

  const value = {
    user,
    isAuthenticated,
    showRoleSelector,
    login,
    selectRole,
    switchRole,
    logout,
    hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
