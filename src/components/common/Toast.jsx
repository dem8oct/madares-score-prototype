import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const types = {
    success: {
      bg: 'bg-success-50',
      border: 'border-success-500',
      text: 'text-success-800',
      icon: <CheckCircle className="w-5 h-5 text-success-500" />,
    },
    error: {
      bg: 'bg-danger-50',
      border: 'border-danger-500',
      text: 'text-danger-800',
      icon: <AlertCircle className="w-5 h-5 text-danger-500" />,
    },
    info: {
      bg: 'bg-primary-50',
      border: 'border-primary-500',
      text: 'text-primary-800',
      icon: <Info className="w-5 h-5 text-primary-500" />,
    },
  };

  const config = types[type];

  return (
    <div className={`
      fixed top-4 right-4 z-50
      ${isVisible ? 'animate-slide-in-right' : 'animate-slide-out-right'}
    `}>
      <div className={`
        flex items-center gap-3 px-4 py-3 rounded-lg border-l-4 shadow-lg
        ${config.bg} ${config.border}
      `}>
        {config.icon}
        <p className={`text-sm font-medium ${config.text}`}>{message}</p>
        <button
          onClick={() => { setIsVisible(false); setTimeout(onClose, 300); }}
          className={`ml-auto ${config.text} hover:opacity-70`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Toast Container Component
export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>
  );
};

export default Toast;
