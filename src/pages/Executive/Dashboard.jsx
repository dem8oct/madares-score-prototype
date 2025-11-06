import React from 'react';
import { Building2, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';
import NationalKPICard from '../../components/executive/NationalKPICard';
import PerformanceTrendChart from '../../components/executive/PerformanceTrendChart';
import SchoolRankingsList from '../../components/executive/SchoolRankingsList';
import {
  nationalKPIs,
  performanceTrend,
  topSchools,
  bottomSchools,
  regionalSummary,
} from '../../data/executiveDashboard';

const ExecutiveDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Executive Intelligence Dashboard
          </h1>
          <p className="text-gray-600">
            National overview of school performance and compliance metrics
          </p>
        </div>

        {/* National KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <NationalKPICard
            title="Total Schools"
            value={nationalKPIs.totalSchools}
            unit=""
            trend="up"
            trendValue={nationalKPIs.trends.schoolsChange}
            icon={Building2}
            color="bg-blue-500"
          />
          <NationalKPICard
            title="Average Compliance"
            value={nationalKPIs.averageCompliance}
            unit="%"
            trend="up"
            trendValue={nationalKPIs.trends.complianceChange}
            icon={CheckCircle2}
            color="bg-green-500"
          />
          <NationalKPICard
            title="At-Risk Schools"
            value={nationalKPIs.atRiskSchools}
            unit=""
            trend="down"
            trendValue={nationalKPIs.trends.atRiskChange}
            icon={AlertTriangle}
            color="bg-red-500"
          />
        </div>

        {/* Performance Trend Chart */}
        <div className="mb-8">
          <PerformanceTrendChart data={performanceTrend} />
        </div>

        {/* Regional Performance Summary */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Regional Performance Overview</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Region
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Schools
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Avg Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      At Risk
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {regionalSummary.map((region) => {
                    const getStatusColor = (performance) => {
                      if (performance === 'excellent') return 'bg-green-100 text-green-800';
                      if (performance === 'good') return 'bg-blue-100 text-blue-800';
                      if (performance === 'needs-improvement') return 'bg-yellow-100 text-yellow-800';
                      return 'bg-red-100 text-red-800';
                    };

                    return (
                      <tr key={region.region} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{region.region}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{region.schools}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">{region.avgScore}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{region.atRisk}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(region.performance)}`}>
                            {region.performance.replace('-', ' ').toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top and Bottom Schools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SchoolRankingsList
            schools={topSchools}
            type="top"
            title="Top 10 Performing Schools"
          />
          <SchoolRankingsList
            schools={bottomSchools}
            type="bottom"
            title="Bottom 10 Schools"
          />
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;
