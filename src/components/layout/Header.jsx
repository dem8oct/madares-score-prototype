import React from 'react';
import { Globe, User, LogOut } from 'lucide-react';

// Simplified Header component (will be enhanced with contexts in Document 03)
const Header = ({ user = null, onLanguageToggle = null, onLogout = null, language = 'en' }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {language === 'ar' ? 'نظام تقييم المدارس' : 'Madares Score System'}
              </h1>
              <p className="text-xs text-gray-500">
                {language === 'ar' ? 'وزارة التعليم' : 'Ministry of Education'}
              </p>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Language toggle */}
            {onLanguageToggle && (
              <button
                onClick={onLanguageToggle}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>{language === 'en' ? 'العربية' : 'English'}</span>
              </button>
            )}

            {/* User menu */}
            {user && (
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
                <div className="relative">
                  <button className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Logout (for demo, allows role switching) */}
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="text-gray-500 hover:text-danger-600 transition-colors"
                    title="Switch Role"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
