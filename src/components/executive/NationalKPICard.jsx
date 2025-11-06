import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const NationalKPICard = ({ title, value, unit, trend, trendValue, icon: Icon, color }) => {
  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trendValue !== undefined && (
          <div className={`flex items-center gap-1 ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="text-sm font-medium">
              {Math.abs(trendValue)}{unit === '%' ? 'pp' : ''}
            </span>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-gray-900">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </span>
          {unit && <span className="text-lg text-gray-500">{unit}</span>}
        </div>
      </div>
    </div>
  );
};

export default NationalKPICard;
