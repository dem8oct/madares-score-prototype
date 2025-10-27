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
