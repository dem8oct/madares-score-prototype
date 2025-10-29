import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Globe, User, LogOut, Building2, ClipboardCheck } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  const isActivePath = (path) => location.pathname.startsWith(path);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {t('app.title')}
                </h1>
                <p className="text-xs text-gray-500">
                  {t('app.subtitle')}
                </p>
              </div>
            </Link>

            {/* Navigation Menu */}
            <nav className="flex items-center gap-2">
              {user?.role === 'ops_reviewer' && (
                <Link
                  to="/ops"
                  className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                    isActivePath('/ops')
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ClipboardCheck className="w-4 h-4" />
                  Ops Dashboard
                </Link>
              )}

              {/* Demo School Links */}
              <div className="flex items-center gap-1 pl-2 ml-2 border-l border-gray-200">
                <span className="text-xs text-gray-500 px-2">Demo Schools:</span>
                <Link
                  to="/school/SCH-2025-001/evaluation"
                  className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                    isActivePath('/school/SCH-2025-001')
                      ? 'bg-warning-50 text-warning-700 border border-warning-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  New Request
                </Link>
                <Link
                  to="/school/SCH-2025-002/evaluation"
                  className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                    isActivePath('/school/SCH-2025-002')
                      ? 'bg-danger-50 text-danger-700 border border-danger-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  Returned
                </Link>
              </div>
            </nav>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>

            {/* User menu */}
            {user && (
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {language === 'ar' ? user.name_ar : user.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {t(`roles.${user.role}`)}
                  </p>
                </div>
                <div className="relative">
                  <button className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Logout (for demo, allows role switching) */}
                <button
                  onClick={logout}
                  className="text-gray-500 hover:text-danger-600 transition-colors"
                  title={t('auth.switchRole')}
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
