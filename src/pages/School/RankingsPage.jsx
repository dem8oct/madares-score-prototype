import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { schoolRankings, regionalRankings } from '../../data/schoolRankings';
import RankingsTable from '../../components/school/rankings/RankingsTable';
import HistoricalTrendChart from '../../components/school/rankings/HistoricalTrendChart';

const RankingsPage = () => {
  const navigate = useNavigate();
  const [compareBy, setCompareBy] = useState('region');

  const data = schoolRankings;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/school')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Detailed Rankings & Comparisons</h1>
          <p className="text-gray-600 mt-1">Compare your school's performance with similar schools</p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center space-x-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Compare by:</label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCompareBy('region')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    compareBy === 'region'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Region
                </button>
                <button
                  onClick={() => setCompareBy('city')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    compareBy === 'city'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  City
                </button>
                <button
                  onClick={() => setCompareBy('type')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    compareBy === 'type'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  School Type
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Rankings Table */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {compareBy === 'region' && `${data.rankings.region.region_name} Rankings (${data.rankings.region.total_schools} schools)`}
              {compareBy === 'city' && `${data.rankings.city.city_name} Rankings (${data.rankings.city.total_schools} schools)`}
              {compareBy === 'type' && `${data.rankings.school_type.school_type} Rankings (${data.rankings.school_type.total_schools} schools)`}
            </h2>
          </div>

          <RankingsTable rankings={regionalRankings} />

          {/* Stats Summary */}
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="font-medium text-blue-900">Your Percentile:</span>
                <span className="ml-2 text-blue-700">{data.rankings.region.percentile}th (Top {(100 - data.rankings.region.percentile).toFixed(0)}%)</span>
              </div>
              <div>
                <span className="font-medium text-blue-900">Above Average:</span>
                <span className="ml-2 text-blue-700">+{data.rankings.region.above_average_by}% (Regional avg: {data.rankings.region.regional_average}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Historical Performance */}
        <HistoricalTrendChart data={data.historical_performance} />

        {/* Actions */}
        <div className="flex items-center justify-end space-x-4">
          <button className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium">
            <Download size={20} />
            <span>Download Rankings Report (PDF)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RankingsPage;
