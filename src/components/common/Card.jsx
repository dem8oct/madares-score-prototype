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
