import React from 'react';
import { Trophy, TrendingUp, TrendingDown } from 'lucide-react';
import KPICard from './KPICard';

const OverallScoreCard = ({ data, onViewScorecard }) => {
  const {
    current_score,
    current_grade,
    previous_score,
    change_percentage,
    change_direction,
    comparison_period
  } = data;

  const isImproving = change_direction === 'up';
  const TrendIcon = isImproving ? TrendingUp : TrendingDown;

  return (
    <KPICard title="Overall Score">
      <div className="flex flex-col items-center justify-center space-y-3">
        {/* Grade Icon */}
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-white">
          <Trophy size={32} />
        </div>

        {/* Grade and Score */}
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900">{current_grade}</div>
          <div className="text-2xl font-semibold text-gray-600">{current_score}%</div>
        </div>

        {/* Trend */}
        <div className={`flex items-center space-x-1 text-sm ${isImproving ? 'text-green-600' : 'text-red-600'}`}>
          <TrendIcon size={16} />
          <span className="font-medium">
            {isImproving ? '+' : ''}{change_percentage}%
          </span>
        </div>

        {/* Comparison Period */}
        <div className="text-xs text-gray-500">
          vs {comparison_period}
        </div>

        {/* Action Button */}
        <button
          onClick={onViewScorecard}
          className="w-full mt-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
        >
          View Scorecard
        </button>
      </div>
    </KPICard>
  );
};

export default OverallScoreCard;
