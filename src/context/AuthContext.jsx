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

  // Mock login - accepts any username/password
  const login = (username, password) => {
    // In a real app, this would validate credentials
    // For demo, we just show role selector
    setShowRoleSelector(true);
    return true;
  };

  // Select role after "login"
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

  // Logout - resets to role selector
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setShowRoleSelector(true);
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
