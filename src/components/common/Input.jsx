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
