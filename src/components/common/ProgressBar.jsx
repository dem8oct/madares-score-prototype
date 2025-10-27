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
