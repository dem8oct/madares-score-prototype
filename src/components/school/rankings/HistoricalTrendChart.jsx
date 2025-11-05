import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HistoricalTrendChart = ({ data }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Historical Performance</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="cycle"
            tick={{ fontSize: 12 }}
            stroke="#6b7280"
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 12 }}
            stroke="#6b7280"
            label={{ value: 'Score (%)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.375rem',
              padding: '8px 12px'
            }}
            formatter={(value) => [`${value}%`, 'Score']}
          />
          <Legend
            wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ fill: '#2563eb', r: 4 }}
            activeDot={{ r: 6 }}
            name="Overall Score"
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">📈 Trend:</span> Consistently Improving
          {data.length > 1 && ` (+${((data[data.length - 1].score - data[0].score) / data.length).toFixed(1)}% avg/year)`}
        </p>
      </div>
    </div>
  );
};

export default HistoricalTrendChart;
