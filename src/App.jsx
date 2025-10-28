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

function AppRoutes() {
  const { isAuthenticated, showRoleSelector, user } = useAuth();

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
          {/* Operations Reviewer Routes */}
          {user?.role === 'ops_reviewer' && (
            <>
              <Route path="/ops" element={<OpsReviewerDashboard />} />
              <Route path="/ops/evaluation/:id" element={<EvaluationReviewPage />} />
              <Route path="*" element={<Navigate to="/ops" replace />} />
            </>
          )}

          {/* Other Roles */}
          {user?.role !== 'ops_reviewer' && (
            <>
              <Route path="/" element={<ComponentDemo />} />
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
