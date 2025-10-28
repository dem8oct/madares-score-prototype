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

// Role-specific pages
import OpsReviewerDashboard from './pages/OpsReviewer';
import EvaluationReviewPage from './pages/OpsReviewer/EvaluationReviewPage';
import SchoolAdminDashboard from './pages/SchoolAdmin';
import CommitteeDashboard from './pages/Committee';
import AppealsDashboard from './pages/Appeals';
import PublicPortal from './pages/Public';

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
      <main>
        <Routes>
          {/* School Admin Routes */}
          {user?.role === 'school_admin' && (
            <>
              <Route path="/" element={<Navigate to="/school" replace />} />
              <Route path="/school" element={<SchoolAdminDashboard />} />
              <Route path="*" element={<Navigate to="/school" replace />} />
            </>
          )}

          {/* Operations Reviewer Routes */}
          {user?.role === 'ops_reviewer' && (
            <>
              <Route path="/" element={<Navigate to="/ops" replace />} />
              <Route path="/ops" element={<OpsReviewerDashboard />} />
              <Route path="/ops/evaluation/:id" element={<EvaluationReviewPage />} />
              <Route path="*" element={<Navigate to="/ops" replace />} />
            </>
          )}

          {/* Committee Member Routes */}
          {user?.role === 'committee_member' && (
            <>
              <Route path="/" element={<Navigate to="/committee" replace />} />
              <Route path="/committee" element={<CommitteeDashboard />} />
              <Route path="*" element={<Navigate to="/committee" replace />} />
            </>
          )}

          {/* Appeals Officer Routes */}
          {user?.role === 'appeals_officer' && (
            <>
              <Route path="/" element={<Navigate to="/appeals" replace />} />
              <Route path="/appeals" element={<AppealsDashboard />} />
              <Route path="*" element={<Navigate to="/appeals" replace />} />
            </>
          )}

          {/* Master Dashboard Routes */}
          {user?.role === 'master_dashboard' && (
            <>
              <Route path="/" element={<Navigate to="/master" replace />} />
              <Route path="/master" element={<ComponentDemo />} />
              <Route path="*" element={<Navigate to="/master" replace />} />
            </>
          )}

          {/* Public Portal Routes */}
          {user?.role === 'public' && (
            <>
              <Route path="/" element={<Navigate to="/public" replace />} />
              <Route path="/public" element={<PublicPortal />} />
              <Route path="*" element={<Navigate to="/public" replace />} />
            </>
          )}

          {/* Fallback */}
          <Route path="*" element={<ComponentDemo />} />
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
