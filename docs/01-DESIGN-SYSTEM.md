# Document 01: Design System & Common Components
## For AI Coding Agents

**Build Order:** 1st  
**Dependencies:** None  
**Estimated Complexity:** Medium

---

## Overview

Build the foundational design system and reusable UI components that all other pages will use. This includes buttons, inputs, cards, modals, tables, and layout components.

**No backend, no authentication, no API calls required.**

---

## Tailwind Configuration

### `tailwind.config.js`

```javascript
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary colors (Ministry brand)
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        // Status colors
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
        },
        danger: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
        },
        // Neutral colors
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Tajawal', 'Noto Sans Arabic', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
```

---

## Common Components

### 1. Button Component

**File:** `src/components/common/Button.jsx`

```jsx
import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  onClick, 
  type = 'button',
  fullWidth = false,
  icon = null,
  className = ''
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    success: 'bg-success-600 text-white hover:bg-success-700 focus:ring-success-500',
    danger: 'bg-danger-600 text-white hover:bg-danger-700 focus:ring-danger-500',
    outline: 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-primary-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
```

**Usage Examples:**
```jsx
<Button variant="primary" size="md">Submit</Button>
<Button variant="outline" size="sm" icon={<PlusIcon />}>Add Item</Button>
<Button variant="danger" disabled>Delete</Button>
```

---

### 2. Input Component

**File:** `src/components/common/Input.jsx`

```jsx
import React from 'react';

const Input = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  disabled = false,
  error = '',
  helperText = '',
  icon = null,
  dir = 'ltr', // 'ltr' or 'rtl' for Arabic
}) => {
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={name} 
          className="block text-sm font-medium text-gray-700 mb-1"
          dir={dir}
        >
          {label} {required && <span className="text-danger-500">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          dir={dir}
          className={`
            block w-full rounded-lg border 
            ${icon ? 'pl-10' : 'pl-3'} pr-3 py-2
            ${error ? 'border-danger-500 focus:ring-danger-500 focus:border-danger-500' : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'}
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
            focus:outline-none focus:ring-2
          `}
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-danger-600" dir={dir}>{error}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500" dir={dir}>{helperText}</p>
      )}
    </div>
  );
};

export default Input;
```

---

### 3. Card Component

**File:** `src/components/common/Card.jsx`

```jsx
import React from 'react';

const Card = ({ 
  children, 
  title = '', 
  subtitle = '',
  actions = null,
  padding = 'default', // 'none', 'sm', 'default', 'lg'
  border = true,
  shadow = true,
  className = ''
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
  };
  
  const borderClass = border ? 'border border-gray-200' : '';
  const shadowClass = shadow ? 'shadow-sm' : '';
  
  return (
    <div className={`bg-white rounded-lg ${borderClass} ${shadowClass} ${className}`}>
      {(title || actions) && (
        <div className={`flex items-center justify-between border-b border-gray-200 ${padding === 'none' ? 'p-6 pb-4' : 'pb-4 mb-4'}`}>
          <div>
            {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          {actions && <div>{actions}</div>}
        </div>
      )}
      
      <div className={paddingClasses[padding]}>
        {children}
      </div>
    </div>
  );
};

export default Card;
```

---

### 4. Badge Component

**File:** `src/components/common/Badge.jsx`

```jsx
import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default',
  size = 'md',
  dot = false,
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-primary-100 text-primary-800',
    success: 'bg-success-100 text-success-800',
    warning: 'bg-warning-100 text-warning-800',
    danger: 'bg-danger-100 text-danger-800',
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };
  
  return (
    <span className={`inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]}`}>
      {dot && (
        <svg className="w-2 h-2 mr-1.5" fill="currentColor" viewBox="0 0 8 8">
          <circle cx="4" cy="4" r="3" />
        </svg>
      )}
      {children}
    </span>
  );
};

export default Badge;
```

---

### 5. Modal Component

**File:** `src/components/common/Modal.jsx`

```jsx
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer = null,
  size = 'md', // 'sm', 'md', 'lg', 'xl'
  closeOnOutsideClick = true,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };
  
  const handleBackdropClick = (e) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title" 
      role="dialog" 
      aria-modal="true"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={handleBackdropClick}
      ></div>
      
      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className={`relative bg-white rounded-lg shadow-xl ${sizes[size]} w-full`}>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-900" id="modal-title">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Body */}
          <div className="px-6 py-4">
            {children}
          </div>
          
          {/* Footer */}
          {footer && (
            <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-lg">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
```

---

### 6. Table Component

**File:** `src/components/common/Table.jsx`

```jsx
import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const Table = ({ 
  columns, // Array of { key, label, sortable, render }
  data, // Array of objects
  onRowClick = null,
  hoverable = true,
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                onClick={() => column.sortable && handleSort(column.key)}
                className={`
                  px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                  ${column.sortable ? 'cursor-pointer select-none hover:bg-gray-100' : ''}
                `}
              >
                <div className="flex items-center gap-1">
                  {column.label}
                  {column.sortable && (
                    <div className="flex flex-col">
                      <ChevronUp 
                        className={`w-3 h-3 ${sortConfig.key === column.key && sortConfig.direction === 'asc' ? 'text-primary-600' : 'text-gray-400'}`} 
                      />
                      <ChevronDown 
                        className={`w-3 h-3 -mt-1 ${sortConfig.key === column.key && sortConfig.direction === 'desc' ? 'text-primary-600' : 'text-gray-400'}`} 
                      />
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((row, idx) => (
            <tr 
              key={idx}
              onClick={() => onRowClick && onRowClick(row)}
              className={`
                ${hoverable ? 'hover:bg-gray-50' : ''}
                ${onRowClick ? 'cursor-pointer' : ''}
              `}
            >
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
```

---

### 7. Toast Notification Component

**File:** `src/components/common/Toast.jsx`

```jsx
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
```

Add to `tailwind.config.js`:
```javascript
theme: {
  extend: {
    animation: {
      'slide-in-right': 'slideInRight 0.3s ease-out',
      'slide-out-right': 'slideOutRight 0.3s ease-in',
    },
    keyframes: {
      slideInRight: {
        '0%': { transform: 'translateX(100%)', opacity: '0' },
        '100%': { transform: 'translateX(0)', opacity: '1' },
      },
      slideOutRight: {
        '0%': { transform: 'translateX(0)', opacity: '1' },
        '100%': { transform: 'translateX(100%)', opacity: '0' },
      },
    },
  },
}
```

---

### 8. Progress Bar Component

**File:** `src/components/common/ProgressBar.jsx`

```jsx
import React from 'react';

const ProgressBar = ({ 
  percentage, 
  showLabel = true,
  size = 'md', // 'sm', 'md', 'lg'
  color = 'primary', // 'primary', 'success', 'warning', 'danger'
}) => {
  const heights = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6',
  };
  
  const colors = {
    primary: 'bg-primary-600',
    success: 'bg-success-600',
    warning: 'bg-warning-600',
    danger: 'bg-danger-600',
  };
  
  return (
    <div className="w-full">
      <div className={`relative w-full bg-gray-200 rounded-full overflow-hidden ${heights[size]}`}>
        <div 
          className={`${heights[size]} ${colors[color]} transition-all duration-300 ease-out`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-sm text-gray-600 mt-1">{percentage}% complete</p>
      )}
    </div>
  );
};

export default ProgressBar;
```

---

## Layout Components

### 9. Header Component

**File:** `src/components/layout/Header.jsx`

```jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Globe, User, LogOut } from 'lucide-react';

const Header = () => {
  const { user, logout, switchRole } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  
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
              <h1 className="text-xl font-bold text-gray-900">{t('app.title')}</h1>
              <p className="text-xs text-gray-500">{t('app.subtitle')}</p>
            </div>
          </div>
          
          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Language toggle */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>
            
            {/* User menu */}
            {user && (
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{t(`roles.${user.role}`)}</p>
                </div>
                <div className="relative">
                  <button className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                
                {/* Logout (for demo, allows role switching) */}
                <button 
                  onClick={logout}
                  className="text-gray-500 hover:text-danger-600"
                  title="Switch Role"
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
```

---

## Testing Checklist

- [ ] All components render without errors
- [ ] Buttons show correct hover/focus states
- [ ] Inputs handle text entry and validation
- [ ] Modals open/close correctly
- [ ] Tables sort columns when headers clicked
- [ ] Toast notifications appear and dismiss
- [ ] Progress bars animate smoothly
- [ ] Header language toggle works
- [ ] All components responsive (desktop sizes)
- [ ] No console warnings or errors

---

## Next Steps

After completing this document:
1. ✅ Test all components in isolation (Storybook optional but helpful)
2. ✅ Verify Tailwind classes compile correctly
3. ✅ Move to Document 02: Mock Data Structures
