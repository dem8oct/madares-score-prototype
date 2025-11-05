import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const PerformanceDistributionChart = ({ distributionData, scoreType }) => {
  // Prepare data for chart
  const prepareChartData = () => {
    if (scoreType === 'B') {
      // Binary indicator
      return [
        { name: 'Compliant', count: distributionData.compliant, color: '#10b981' },
        { name: 'Non-Compliant', count: distributionData.non_compliant, color: '#ef4444' }
      ];
    } else {
      // Numeric indicator
      return [
        { name: '0-20%', count: distributionData['0-20'] || 0, color: '#ef4444' },
        { name: '20-40%', count: distributionData['20-40'] || 0, color: '#f59e0b' },
        { name: '40-60%', count: distributionData['40-60'] || 0, color: '#eab308' },
        { name: '60-80%', count: distributionData['60-80'] || 0, color: '#84cc16' },
        { name: '80-100%', count: distributionData['80-100'] || 0, color: '#10b981' }
      ];
    }
  };

  const chartData = prepareChartData();
  const total = chartData.reduce((sum, item) => sum + item.count, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.count / total) * 100).toFixed(1);
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">
            {data.count} schools ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-4">Performance Distribution</h3>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} label={{ value: '# of Schools', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" radius={[8, 8, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Distribution Breakdown Table */}
      <div className="mt-6 space-y-2">
        <p className="text-sm font-medium text-gray-700">Distribution Breakdown:</p>
        {chartData.map((item, index) => {
          const percentage = ((item.count / total) * 100).toFixed(1);
          return (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-gray-600">{item.name}:</span>
              <span className="font-medium text-gray-900">
                {item.count} schools ({percentage}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PerformanceDistributionChart;
