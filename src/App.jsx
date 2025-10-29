import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { EvaluationProvider } from './context/EvaluationContext';
import { ToastProvider } from './context/ToastContext';

import Login from './pages/Login';
import RoleSelector from './components/RoleSelector';
import Header from './components/layout/Header';
import ComponentDemo from './pages/ComponentDemo';
import OpsReviewerDashboard from './pages/OpsReviewer';
import EvaluationReviewPage from './pages/OpsReviewer/EvaluationReviewPage';
import SchoolEvaluationPage from './pages/SchoolPortal/SchoolEvaluationPage';

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

  // Main app with header and routes
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
        <Routes>
          {/* Operations Reviewer Routes */}
          {user?.role === 'ops_reviewer' && (
            <>
              <Route path="/ops" element={<OpsReviewerDashboard />} />
              <Route path="/ops/evaluation/:id" element={<EvaluationReviewPage />} />
              <Route path="/school/:schoolId/evaluation" element={<SchoolEvaluationPage />} />
              <Route path="*" element={<Navigate to="/ops" replace />} />
            </>
          )}

          {/* School Admin Routes */}
          {user?.role === 'school_admin' && (
            <>
              <Route path="/school/:schoolId/evaluation" element={<SchoolEvaluationPage />} />
              <Route path="*" element={<Navigate to={`/school/${user.school_id}/evaluation`} replace />} />
            </>
          )}

          {/* Other Roles */}
          {user?.role !== 'ops_reviewer' && user?.role !== 'school_admin' && (
            <>
              <Route path="/" element={<ComponentDemo />} />
              <Route path="/school/:schoolId/evaluation" element={<SchoolEvaluationPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
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
