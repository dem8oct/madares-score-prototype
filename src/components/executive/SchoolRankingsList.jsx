import React from 'react';
import { TrendingUp, TrendingDown, Minus, MapPin, AlertTriangle } from 'lucide-react';

const SchoolRankingsList = ({ schools, type = 'top', title }) => {
  const isTop = type === 'top';

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    if (score >= 60) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getRiskBadge = (riskLevel) => {
    const colors = {
      critical: 'bg-red-100 text-red-800',
      high: 'bg-orange-100 text-orange-800',
      medium: 'bg-yellow-100 text-yellow-800',
    };

    if (!riskLevel) return null;

    return (
      <span className={`text-xs px-2 py-1 rounded-full ${colors[riskLevel]}`}>
        {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {!isTop && (
          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm font-medium">Requires Intervention</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {schools.map((school, index) => (
          <div
            key={school.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
          >
            <div className="flex items-start gap-3 flex-1">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                isTop ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
              } font-bold text-sm`}>
                {index + 1}
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{school.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-3 h-3" />
                  <span>{school.city}, {school.region}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {school.riskLevel && (
                <div className="mr-2">
                  {getRiskBadge(school.riskLevel)}
                </div>
              )}

              <div className="flex items-center gap-2">
                {getTrendIcon(school.trend)}
                <span className={`text-lg font-bold px-3 py-1 rounded-lg ${getScoreColor(school.score)}`}>
                  {school.score}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!isTop && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Action Required:</strong> These schools need immediate support and intervention
            to improve their performance and compliance rates.
          </p>
        </div>
      )}
    </div>
  );
};

export default SchoolRankingsList;
