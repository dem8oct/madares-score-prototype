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
// School pages - both legacy and new
import SchoolAdminDashboard from './pages/SchoolAdmin';
import SchoolEvaluationPage from './pages/SchoolPortal/SchoolEvaluationPage';
import RankingsPage from './pages/School/RankingsPage';
import EvaluationHistory from './pages/School/EvaluationHistory';
// Committee pages - both versions
import CommitteeDashboard from './pages/Committee';
import CommitteeMemberDashboard from './pages/CommitteeMember';
import QuestionsBank from './pages/Committee/QuestionsBank';
import IndicatorReviewPage from './pages/Committee/IndicatorReviewPage';
// Inspector pages
import InspectorDashboardPage from './pages/Inspector/InspectorDashboardPage';
import InspectionDetailPage from './pages/Inspector/InspectionDetailPage';
// Appeals pages - both versions
import AppealsDashboard from './pages/Appeals';
import AppealsOfficerDashboard from './pages/AppealsOfficer';
// National/Master dashboards
import MasterDashboard from './pages/Master';
import NationalViewerDashboard from './pages/NationalViewer';
// Public portal
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
          {/* Operations Reviewer Routes */}
          {user?.role === 'ops_reviewer' && (
            <>
              <Route path="/" element={<Navigate to="/ops" replace />} />
              <Route path="/ops" element={<OpsReviewerDashboard />} />
              <Route path="/ops/evaluation/:id" element={<EvaluationReviewPage />} />
              <Route path="*" element={<Navigate to="/ops" replace />} />
            </>
          )}

          {/* School Admin Routes - Using new SchoolEvaluationPage */}
          {user?.role === 'school_admin' && (
            <>
              <Route path="/" element={<Navigate to="/school" replace />} />
              <Route path="/school" element={<SchoolAdminDashboard />} />
              <Route path="/school/:schoolId/evaluation" element={<SchoolEvaluationPage />} />
              <Route path="/school/rankings" element={<RankingsPage />} />
              <Route path="/school/evaluation-history" element={<EvaluationHistory />} />
              <Route path="*" element={<Navigate to="/school" replace />} />
            </>
          )}

          {/* Inspector Routes */}
          {user?.role === 'inspector' && (
            <>
              <Route path="/" element={<Navigate to="/inspector/dashboard" replace />} />
              <Route path="/inspector/dashboard" element={<InspectorDashboardPage />} />
              <Route path="/inspector/inspection/:assignmentId" element={<InspectionDetailPage />} />
              <Route path="*" element={<Navigate to="/inspector/dashboard" replace />} />
            </>
          )}

          {/* Committee Member Routes - Using new CommitteeMemberDashboard */}
          {user?.role === 'committee_member' && (
            <>
              <Route path="/" element={<Navigate to="/committee" replace />} />
              <Route path="/committee" element={<CommitteeMemberDashboard />} />
              <Route path="/committee/questions-bank" element={<QuestionsBank />} />
              <Route path="/committee/indicator/:code/review" element={<IndicatorReviewPage />} />
              <Route path="/committee-legacy" element={<CommitteeDashboard />} />
              <Route path="*" element={<Navigate to="/committee" replace />} />
            </>
          )}

          {/* Appeals Officer Routes - Using new AppealsOfficerDashboard */}
          {user?.role === 'appeals_officer' && (
            <>
              <Route path="/" element={<Navigate to="/appeals" replace />} />
              <Route path="/appeals" element={<AppealsOfficerDashboard />} />
              <Route path="/appeals-legacy" element={<AppealsDashboard />} />
              <Route path="*" element={<Navigate to="/appeals" replace />} />
            </>
          )}

          {/* National Viewer Routes - Using both dashboards */}
          {user?.role === 'national_viewer' && (
            <>
              <Route path="/" element={<Navigate to="/master" replace />} />
              <Route path="/master" element={<MasterDashboard />} />
              <Route path="/national" element={<NationalViewerDashboard />} />
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
