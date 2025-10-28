import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { EvaluationProvider } from './context/EvaluationContext';
import { ToastProvider } from './context/ToastContext';

import Login from './pages/Login';
import RoleSelector from './components/RoleSelector';
import Header from './components/layout/Header';
import ComponentDemo from './pages/ComponentDemo';
import OpsReviewerDashboard from './pages/OpsReviewer';

function AppRoutes() {
  const { isAuthenticated, showRoleSelector, user } = useAuth();

  // Debug: Log current user role
  console.log('Current user:', user);
  console.log('User role:', user?.role);

  // Show role selector after login (check this FIRST)
  if (showRoleSelector) {
    return <RoleSelector />;
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <Login />;
  }

  // Main app with header
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* DEBUG: Show current role */}
      <div style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        background: 'red',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        zIndex: 9999,
        fontWeight: 'bold'
      }}>
        ROLE: {user?.role || 'NONE'}
      </div>
      <main>
        {/* Route to role-specific dashboards */}
        {user?.role === 'ops_reviewer' ? (
          <OpsReviewerDashboard />
        ) : (
          <ComponentDemo />
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <EvaluationProvider>
            <ToastProvider>
              <AppRoutes />
            </ToastProvider>
          </EvaluationProvider>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
