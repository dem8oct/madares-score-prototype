import React, { useState } from 'react';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

const IndicatorStatusToggle = ({ status, onChange, indicatorCode, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const statusConfig = {
    Active: {
      color: 'text-green-700',
      bg: 'bg-green-100',
      indicator: '🟢'
    },
    Disabled: {
      color: 'text-red-700',
      bg: 'bg-red-100',
      indicator: '🔴'
    }
  };

  const config = statusConfig[status] || statusConfig.Active;

  const handleToggle = (newStatus) => {
    setIsOpen(false);
    if (newStatus !== status) {
      onChange(newStatus, indicatorCode);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={clsx(
          'flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium',
          config.bg,
          config.color,
          !disabled && 'hover:opacity-80 cursor-pointer',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <span>{config.indicator}</span>
        <span>{status}</span>
        {!disabled && <ChevronDown size={14} />}
      </button>

      {isOpen && !disabled && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20">
            <div className="py-1">
              <button
                onClick={() => handleToggle('Active')}
                className={clsx(
                  'w-full px-4 py-2 text-sm text-left hover:bg-gray-100 flex items-center space-x-2',
                  status === 'Active' && 'bg-gray-50 font-medium'
                )}
              >
                <span>🟢</span>
                <span>Active</span>
              </button>
              <button
                onClick={() => handleToggle('Disabled')}
                className={clsx(
                  'w-full px-4 py-2 text-sm text-left hover:bg-gray-100 flex items-center space-x-2',
                  status === 'Disabled' && 'bg-gray-50 font-medium'
                )}
              >
                <span>🔴</span>
                <span>Disable</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IndicatorStatusToggle;
