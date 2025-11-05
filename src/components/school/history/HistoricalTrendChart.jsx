import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const HistoricalTrendChart = ({ trendData }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.cycle}</p>
          <p className="text-sm text-gray-600">
            Score: {data.score}% ({data.grade})
          </p>
          {data.failed && (
            <p className="text-xs text-danger-600 mt-1">❌ Failed</p>
          )}
          {data.current && (
            <p className="text-xs text-primary-600 mt-1">📍 Current</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-4">Historical Performance Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="cycle" tick={{ fontSize: 12 }} />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 12 }}
            label={{ value: 'Score (%)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={70} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Pass', position: 'right', fontSize: 10 }} />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={(props) => {
              const { cx, cy, payload } = props;
              if (payload.current) {
                return (
                  <g>
                    <circle cx={cx} cy={cy} r={6} fill="#3b82f6" stroke="#fff" strokeWidth={2} />
                    <circle cx={cx} cy={cy} r={3} fill="#fff" />
                  </g>
                );
              }
              if (payload.failed) {
                return <circle cx={cx} cy={cy} r={5} fill="#ef4444" stroke="#fff" strokeWidth={2} />;
              }
              return <circle cx={cx} cy={cy} r={4} fill="#3b82f6" stroke="#fff" strokeWidth={2} />;
            }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Trend Analysis */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900">
          <strong>Trend Analysis:</strong> {getTrendAnalysis(trendData)}
        </p>
      </div>
    </div>
  );
};

// Helper function to analyze trend
const getTrendAnalysis = (data) => {
  if (!data || data.length < 2) return 'Insufficient data for trend analysis.';

  const validData = data.filter(d => !d.failed);
  if (validData.length < 2) return 'Insufficient valid cycles for trend analysis.';

  const scores = validData.map(d => d.score);
  const firstScore = scores[0];
  const lastScore = scores[scores.length - 1];
  const avgChange = (lastScore - firstScore) / (scores.length - 1);

  if (avgChange > 2) {
    return `Consistently improving with an average increase of +${avgChange.toFixed(1)}% per cycle.`;
  } else if (avgChange < -2) {
    return `Declining trend with an average decrease of ${avgChange.toFixed(1)}% per cycle. Action needed.`;
  } else {
    return `Stable performance with minor fluctuations (±${Math.abs(avgChange).toFixed(1)}% per cycle).`;
  }
};

export default HistoricalTrendChart;
