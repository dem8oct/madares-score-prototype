import React from 'react';
import clsx from 'clsx';

const KPICard = ({
  title,
  children,
  className,
  onClick,
  size = 'medium' // 'small', 'medium', 'large'
}) => {
  const sizeClasses = {
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8'
  };

  return (
    <div
      className={clsx(
        'bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow',
        sizeClasses[size],
        onClick && 'cursor-pointer hover:border-blue-300',
        className
      )}
      onClick={onClick}
    >
      <h3 className="text-sm font-medium text-gray-600 mb-3">{title}</h3>
      {children}
    </div>
  );
};

export default KPICard;
