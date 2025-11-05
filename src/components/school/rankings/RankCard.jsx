import React from 'react';
import { Trophy, TrendingUp, TrendingDown } from 'lucide-react';

const RankCard = ({ title, rank, total, percentile, percentileBand, average, aboveAverageBy, subtitle, showTrend = false, trendData = null }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <h3 className="text-sm font-medium text-gray-600 mb-3">{title}</h3>

      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-4xl font-bold text-gray-900">{rank}</div>
          <div className="text-sm text-gray-600">of {total}</div>
        </div>
        <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center">
          <Trophy className="w-7 h-7 text-yellow-600" />
        </div>
      </div>

      {subtitle && (
        <div className="text-sm text-gray-700 mb-2">{subtitle}</div>
      )}

      <div className="flex items-center space-x-2 mb-2">
        <div className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
          🏆 {percentileBand}
        </div>
      </div>

      {average && aboveAverageBy && (
        <div className="text-sm text-gray-600">
          <span className="font-semibold text-green-600">+{aboveAverageBy}%</span> above average ({average}%)
        </div>
      )}

      {showTrend && trendData && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className={`flex items-center space-x-1 text-sm ${trendData.direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trendData.direction === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span className="font-medium">
              {trendData.direction === 'up' ? '+' : ''}{trendData.value}%
            </span>
            <span className="text-gray-600">vs {trendData.period}</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">📈 {trendData.label}</div>
        </div>
      )}
    </div>
  );
};

export default RankCard;
