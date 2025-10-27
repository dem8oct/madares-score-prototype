# Document 03: Authentication & Context Setup
## For AI Coding Agents

**Build Order:** 3rd  
**Dependencies:** Document 01 (Components), Document 02 (Mock Data)  
**Estimated Complexity:** Medium

---

## Overview

Build mock authentication system and React Context providers for state management. This enables role-based views and simulates user login **without any real authentication**.

**No backend, no JWT tokens, no session storage, no cookies - pure client-side role simulation.**

---

## 1. Authentication Context

**File:** `src/context/AuthContext.jsx`

```jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
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
```

---

## 2. Language Context (i18n)

**File:** `src/context/LanguageContext.jsx`

```jsx
import React, { createContext, useContext, useState } from 'react';
import enTranslations from '../locales/en.json';
import arTranslations from '../locales/ar.json';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Default to English
  const [direction, setDirection] = useState('ltr');

  const translations = {
    en: enTranslations,
    ar: arTranslations,
  };

  // Get translation by key (supports nested keys with dot notation)
  const t = (key, params = {}) => {
    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    if (!value) return key; // Return key if translation not found

    // Replace params like {{name}}
    let result = value;
    Object.keys(params).forEach(param => {
      result = result.replace(`{{${param}}}`, params[param]);
    });

    return result;
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    setDirection(newLang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const setLanguageExplicit = (lang) => {
    setLanguage(lang);
    setDirection(lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const value = {
    language,
    direction,
    t,
    toggleLanguage,
    setLanguage: setLanguageExplicit,
    isArabic: language === 'ar',
    isEnglish: language === 'en',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
```

---

## 3. Evaluation Context

**File:** `src/context/EvaluationContext.jsx`

```jsx
import React, { createContext, useContext, useState } from 'react';
import { mockEvaluations } from '../data/mockData';

const EvaluationContext = createContext();

export const useEvaluation = () => {
  const context = useContext(EvaluationContext);
  if (!context) {
    throw new Error('useEvaluation must be used within EvaluationProvider');
  }
  return context;
};

export const EvaluationProvider = ({ children }) => {
  // Store evaluations in state (starts with mock data)
  const [evaluations, setEvaluations] = useState(mockEvaluations);

  // Get evaluation by ID
  const getEvaluation = (id) => {
    return evaluations.find(e => e.id === id);
  };

  // Update evaluation (simulates saving changes)
  const updateEvaluation = (id, updates) => {
    setEvaluations(prev => 
      prev.map(e => e.id === id ? { ...e, ...updates } : e)
    );
  };

  // Update compliance answer
  const updateComplianceAnswer = (evalId, questionId, answer, evidence = []) => {
    setEvaluations(prev =>
      prev.map(e => {
        if (e.id !== evalId) return e;
        
        return {
          ...e,
          compliance_data: {
            ...e.compliance_data,
            questions: e.compliance_data.questions.map(q =>
              q.id === questionId 
                ? { ...q, answer, evidence, status: answer ? 'complete' : 'pending' }
                : q
            ),
          },
        };
      })
    );

    // Recalculate completion percentage
    recalculateCompletion(evalId);
  };

  // Update Ops review for a question
  const updateOpsReview = (evalId, questionId, reviewStatus, comment) => {
    setEvaluations(prev =>
      prev.map(e => {
        if (e.id !== evalId) return e;
        
        return {
          ...e,
          compliance_data: {
            ...e.compliance_data,
            questions: e.compliance_data.questions.map(q =>
              q.id === questionId 
                ? { 
                    ...q, 
                    ops_review: {
                      status: reviewStatus,
                      comment: comment,
                      reviewer: 'user002', // Mock reviewer
                      review_date: new Date().toISOString().split('T')[0],
                    },
                    status: reviewStatus === 'accepted' ? 'accepted' : 'returned_for_correction',
                  }
                : q
            ),
          },
        };
      })
    );
  };

  // Submit evaluation for review
  const submitEvaluation = (evalId) => {
    setEvaluations(prev =>
      prev.map(e =>
        e.id === evalId
          ? {
              ...e,
              status: 'submitted',
              submission_date: new Date().toISOString().split('T')[0],
            }
          : e
      )
    );
  };

  // Return for correction (increments version)
  const returnForCorrection = (evalId) => {
    setEvaluations(prev =>
      prev.map(e => {
        if (e.id !== evalId) return e;
        
        const [current, max] = e.version.split('/');
        const newVersion = `${parseInt(current) + 1}/${max}`;
        
        return {
          ...e,
          status: 'returned_for_correction',
          version: newVersion,
          correction_count: e.correction_count + 1,
        };
      })
    );

    // Update pending items based on corrections
    updatePendingItems(evalId);
  };

  // Approve evaluation
  const approveEvaluation = (evalId) => {
    setEvaluations(prev =>
      prev.map(e =>
        e.id === evalId
          ? {
              ...e,
              status: 'approved',
              approved_date: new Date().toISOString().split('T')[0],
            }
          : e
      )
    );
  };

  // Recalculate completion percentage
  const recalculateCompletion = (evalId) => {
    setEvaluations(prev =>
      prev.map(e => {
        if (e.id !== evalId) return e;
        
        const questions = e.compliance_data.questions;
        const completedQuestions = questions.filter(q => q.status === 'complete').length;
        const percentage = Math.round((completedQuestions / questions.length) * 100);
        
        return { ...e, completion_percentage: percentage };
      })
    );
  };

  // Update pending items based on current state
  const updatePendingItems = (evalId) => {
    setEvaluations(prev =>
      prev.map(e => {
        if (e.id !== evalId) return e;
        
        const pendingItems = [];
        
        // Check for missing data
        e.compliance_data.questions.forEach(q => {
          if (!q.answer || q.answer === null) {
            pendingItems.push({
              type: 'missing_data',
              question_id: q.id,
              description: `${q.question}`,
              description_ar: `${q.question_ar}`,
            });
          }
          
          // Check for corrections
          if (q.ops_review && q.ops_review.status === 'return_for_correction') {
            pendingItems.push({
              type: 'correction_requested',
              question_id: q.id,
              description: q.ops_review.comment,
              description_ar: q.ops_review.comment_ar || q.ops_review.comment,
              ops_comment: q.ops_review.comment,
            });
          }
        });
        
        return { ...e, pending_items: pendingItems };
      })
    );
  };

  const value = {
    evaluations,
    getEvaluation,
    updateEvaluation,
    updateComplianceAnswer,
    updateOpsReview,
    submitEvaluation,
    returnForCorrection,
    approveEvaluation,
  };

  return (
    <EvaluationContext.Provider value={value}>
      {children}
    </EvaluationContext.Provider>
  );
};
```

---

## 4. Toast Context (Notifications)

**File:** `src/context/ToastContext.jsx`

```jsx
import React, { createContext, useContext, useState } from 'react';
import { ToastContainer } from '../components/common/Toast';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const success = (message, duration) => addToast(message, 'success', duration);
  const error = (message, duration) => addToast(message, 'error', duration);
  const info = (message, duration) => addToast(message, 'info', duration);

  const value = {
    addToast,
    success,
    error,
    info,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};
```

---

## 5. Translation Files

**File:** `src/locales/en.json`

```json
{
  "app": {
    "title": "Madares Score System",
    "subtitle": "Ministry of Education - Private Education Agency"
  },
  "auth": {
    "login": "Login",
    "username": "Username",
    "password": "Password",
    "selectRole": "Select Your Role",
    "logout": "Logout",
    "switchRole": "Switch Role"
  },
  "roles": {
    "school_admin": "School Administrator",
    "ops_reviewer": "Operations Reviewer",
    "committee_member": "Committee Member",
    "appeals_officer": "Appeals Officer",
    "national_viewer": "National Dashboard",
    "public": "Public Portal"
  },
  "common": {
    "save": "Save",
    "cancel": "Cancel",
    "submit": "Submit",
    "approve": "Approve",
    "reject": "Reject",
    "edit": "Edit",
    "delete": "Delete",
    "view": "View",
    "download": "Download",
    "upload": "Upload",
    "search": "Search",
    "filter": "Filter",
    "clear": "Clear",
    "all": "All",
    "yes": "Yes",
    "no": "No",
    "loading": "Loading...",
    "error": "Error",
    "success": "Success"
  },
  "nav": {
    "dashboard": "Dashboard",
    "evaluations": "Evaluations",
    "schools": "Schools",
    "reports": "Reports",
    "settings": "Settings"
  },
  "evaluation": {
    "status": {
      "draft": "Draft",
      "in_progress": "In Progress",
      "submitted": "Submitted",
      "under_review": "Under Review",
      "returned_for_correction": "Returned for Correction",
      "pending_committee": "Pending Committee",
      "approved": "Approved",
      "published": "Published",
      "closed": "Closed"
    },
    "version": "Version",
    "deadline": "Deadline",
    "completion": "Completion",
    "pendingItems": "Pending Items",
    "submitForReview": "Submit for Review",
    "saveDraft": "Save Draft"
  },
  "domains": {
    "compliance": "Compliance",
    "excellence": "Institutional Excellence",
    "satisfaction": "Beneficiary Satisfaction"
  }
}
```

**File:** `src/locales/ar.json`

```json
{
  "app": {
    "title": "نظام مدارس للتقييم",
    "subtitle": "وزارة التعليم - وكالة التعليم الأهلي"
  },
  "auth": {
    "login": "تسجيل الدخول",
    "username": "اسم المستخدم",
    "password": "كلمة المرور",
    "selectRole": "اختر دورك",
    "logout": "تسجيل الخروج",
    "switchRole": "تبديل الدور"
  },
  "roles": {
    "school_admin": "مدير المدرسة",
    "ops_reviewer": "مراجع العمليات",
    "committee_member": "عضو اللجنة",
    "appeals_officer": "موظف الاستئنافات",
    "national_viewer": "لوحة المعلومات الوطنية",
    "public": "البوابة العامة"
  },
  "common": {
    "save": "حفظ",
    "cancel": "إلغاء",
    "submit": "إرسال",
    "approve": "قبول",
    "reject": "رفض",
    "edit": "تعديل",
    "delete": "حذف",
    "view": "عرض",
    "download": "تحميل",
    "upload": "رفع",
    "search": "بحث",
    "filter": "تصفية",
    "clear": "مسح",
    "all": "الكل",
    "yes": "نعم",
    "no": "لا",
    "loading": "جاري التحميل...",
    "error": "خطأ",
    "success": "نجح"
  },
  "nav": {
    "dashboard": "لوحة المعلومات",
    "evaluations": "التقييمات",
    "schools": "المدارس",
    "reports": "التقارير",
    "settings": "الإعدادات"
  },
  "evaluation": {
    "status": {
      "draft": "مسودة",
      "in_progress": "قيد التنفيذ",
      "submitted": "مُرسل",
      "under_review": "قيد المراجعة",
      "returned_for_correction": "إعادة للتصحيح",
      "pending_committee": "في انتظار اللجنة",
      "approved": "موافق عليه",
      "published": "منشور",
      "closed": "مغلق"
    },
    "version": "النسخة",
    "deadline": "الموعد النهائي",
    "completion": "الإنجاز",
    "pendingItems": "العناصر المعلقة",
    "submitForReview": "إرسال للمراجعة",
    "saveDraft": "حفظ المسودة"
  },
  "domains": {
    "compliance": "الامتثال",
    "excellence": "التميز المؤسسي",
    "satisfaction": "رضا المستفيدين"
  }
}
```

---

## 6. Mock Login Page

**File:** `src/pages/Login.jsx`

```jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login - accepts anything
    login(username, password);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-2xl">M</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          {t('app.title')}
        </h1>
        <p className="text-sm text-center text-gray-500 mb-8">
          {t('app.subtitle')}
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={t('auth.username')}
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter any username"
            required
          />

          <Input
            label={t('auth.password')}
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter any password"
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            icon={<LogIn className="w-5 h-5" />}
          >
            {t('auth.login')}
          </Button>
        </form>

        {/* Demo Note */}
        <p className="mt-6 text-xs text-center text-gray-500">
          Demo Mode: Enter any credentials to continue
        </p>
      </div>
    </div>
  );
};

export default Login;
```

---

## 7. Role Selector Modal

**File:** `src/components/RoleSelector.jsx`

```jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Modal from './common/Modal';
import Button from './common/Button';

const RoleSelector = () => {
  const { showRoleSelector, selectRole } = useAuth();
  const { t } = useLanguage();

  const roles = [
    { value: 'school_admin', icon: '🏫', description: 'Manage school evaluations' },
    { value: 'ops_reviewer', icon: '✅', description: 'Review and approve submissions' },
    { value: 'committee_member', icon: '👔', description: 'Manage indicators and weights' },
    { value: 'appeals_officer', icon: '⚖️', description: 'Handle school appeals' },
    { value: 'national_viewer', icon: '📊', description: 'View national statistics' },
    { value: 'public', icon: '🌐', description: 'Browse public school scores' },
  ];

  return (
    <Modal
      isOpen={showRoleSelector}
      onClose={() => {}} // Cannot close without selecting
      title={t('auth.selectRole')}
      size="lg"
      closeOnOutsideClick={false}
    >
      <div className="grid grid-cols-2 gap-4">
        {roles.map((role) => (
          <button
            key={role.value}
            onClick={() => selectRole(role.value)}
            className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left"
          >
            <div className="text-4xl mb-3">{role.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-1">
              {t(`roles.${role.value}`)}
            </h3>
            <p className="text-sm text-gray-500">{role.description}</p>
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-center text-gray-500">
        Select a role to explore the prototype
      </p>
    </Modal>
  );
};

export default RoleSelector;
```

---

## 8. App.js Setup

**File:** `src/App.jsx`

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { EvaluationProvider } from './context/EvaluationContext';
import { ToastProvider } from './context/ToastContext';

import Login from './pages/Login';
import RoleSelector from './components/RoleSelector';
import Header from './components/layout/Header';

// Import page components (will be built in next documents)
import SchoolDashboard from './pages/SchoolAdmin/Dashboard';
import OpsDashboard from './pages/OpsReviewer/Dashboard';
import CommitteeDashboard from './pages/Committee/Dashboard';
// ... other pages

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  const { isAuthenticated, showRoleSelector, user } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  if (showRoleSelector) {
    return <RoleSelector />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <Routes>
          {/* School Admin routes */}
          {user.role === 'school_admin' && (
            <>
              <Route path="/" element={<SchoolDashboard />} />
              {/* Add more routes */}
            </>
          )}

          {/* Ops Reviewer routes */}
          {user.role === 'ops_reviewer' && (
            <>
              <Route path="/" element={<OpsDashboard />} />
              {/* Add more routes */}
            </>
          )}

          {/* Add other role routes */}

          <Route path="*" element={<Navigate to="/" />} />
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
```

---

## Testing Checklist

- [ ] Login page renders correctly
- [ ] Role selector modal appears after login
- [ ] Each role selection loads appropriate dashboard
- [ ] Language toggle works (EN ↔ AR)
- [ ] RTL layout applies for Arabic
- [ ] User can switch roles via header dropdown
- [ ] Toast notifications display correctly
- [ ] Context values accessible in all components
- [ ] No console errors

---

## Next Steps

After completing this document:
1. ✅ Test authentication flow
2. ✅ Verify context providers work
3. ✅ Test language switching
4. ✅ Move to Document 04: Evaluation Requests Table (Ops View)
