import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import KPICard from './KPICard';

const CompletionProgressCard = ({ data }) => {
  const { completed_indicators, total_indicators, percentage, remaining_questions } = data;

  return (
    <KPICard title="Completion Progress">
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Progress Circle or Icon */}
        <div className="relative w-24 h-24">
          {/* SVG Circle Progress */}
          <svg className="transform -rotate-90 w-24 h-24">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - percentage / 100)}`}
              className="text-blue-600 transition-all duration-500"
              strokeLinecap="round"
            />
          </svg>
          {/* Percentage in Center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-900">{percentage}%</span>
          </div>
        </div>

        {/* Status Text */}
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">Complete</div>
        </div>

        {/* Progress Bar (Alternative visual) */}
        <div className="w-full">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Details */}
        <div className="w-full space-y-1 text-sm text-center">
          <div className="text-gray-700">
            <span className="font-semibold text-gray-900">{completed_indicators}</span>
            {' '}of{' '}
            <span className="font-semibold text-gray-900">{total_indicators}</span>
            {' '}indicators
          </div>
          <div className="text-gray-500">
            {remaining_questions} {remaining_questions === 1 ? 'question' : 'questions'} remaining
          </div>
        </div>
      </div>
    </KPICard>
  );
};

export default CompletionProgressCard;
