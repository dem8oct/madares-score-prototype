import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { LogIn, User } from 'lucide-react';
import { mockUsers } from '../data/mockData';
import { getFirstName } from '../utils/nameUtils';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Login with username (password not validated in demo)
    login(username, password);
  };

  const handleQuickLogin = (user) => {
    setUsername(user.username);
    login(user.username, 'demo');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-6">
        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
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
              placeholder="Enter username"
              required
            />

            <Input
              label={t('auth.password')}
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Any password"
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              leftIcon={<LogIn className="w-5 h-5" />}
            >
              {t('auth.login')}
            </Button>
          </form>

          {/* Demo Note */}
          <p className="mt-6 text-xs text-center text-gray-500">
            Demo Mode: Password not required. Use usernames from the list →
          </p>
        </div>

        {/* Quick Login Panel */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Quick Login - Available Users
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Click any user below to login instantly:
          </p>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {mockUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => handleQuickLogin(user)}
                className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900" title={user.name}>
                      {getFirstName(user.name)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Username: <span className="font-mono text-primary-600">{user.username}</span>
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                    {user.role.replace(/_/g, ' ')}
                  </span>
                </div>
                {user.school_id && (
                  <p className="text-xs text-gray-500 mt-1">
                    School: {user.school_id}
                  </p>
                )}
              </button>
            ))}
          </div>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>Tip:</strong> School admins will see the demo school evaluation pages.
              Ops reviewers will see the operations dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
