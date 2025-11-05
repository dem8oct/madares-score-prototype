import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import { FileDown, ArrowLeft } from 'lucide-react';
import HistoricalCycleCard from '../../components/school/history/HistoricalCycleCard';
import HistoricalTrendChart from '../../components/school/history/HistoricalTrendChart';
import Card from '../../components/common/Card';
import { evaluationHistory, historicalTrendData, filterEvaluationHistory } from '../../data/evaluationHistory';

const EvaluationHistory = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    year: 'All',
    domain: 'All',
    status: 'All Cycles'
  });

  const filteredCycles = filterEvaluationHistory(filters);

  const handleCompare = (cycle) => {
    navigate(`/school/evaluation-history/compare?cycle=${cycle.cycle_id}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => navigate('/school')}
          className="mb-4"
        >
          Back to Dashboard
        </Button>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Evaluation History
        </h1>
        <p className="text-gray-600">
          View and compare your school's performance across evaluation cycles
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </label>
            <select
              value={filters.year}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="All">All Years</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Domain
            </label>
            <select
              value={filters.domain}
              onChange={(e) => setFilters({ ...filters, domain: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="All">All Domains</option>
              <option value="Compliance">Compliance</option>
              <option value="Excellence">Excellence</option>
              <option value="Satisfaction">Satisfaction</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Show
            </label>
            <div className="flex items-center gap-4 pt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value="All Cycles"
                  checked={filters.status === 'All Cycles'}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="text-primary-600"
                />
                <span className="text-sm text-gray-700">All Cycles</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value="Approved Only"
                  checked={filters.status === 'Approved Only'}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="text-primary-600"
                />
                <span className="text-sm text-gray-700">Approved Only</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value="Failed Only"
                  checked={filters.status === 'Failed Only'}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="text-primary-600"
                />
                <span className="text-sm text-gray-700">Failed Only</span>
              </label>
            </div>
          </div>

          <div className="flex items-end">
            <Button
              variant="primary"
              leftIcon={<FileDown className="w-4 h-4" />}
              className="w-full"
              onClick={() => alert('Export all history to Excel')}
            >
              Export All (Excel)
            </Button>
          </div>
        </div>
      </Card>

      {/* Historical Trend Chart */}
      <Card className="mb-6">
        <HistoricalTrendChart trendData={historicalTrendData} />
      </Card>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Evaluation Cycles ({filteredCycles.length} total):
        </p>
      </div>

      {/* Evaluation Cycles */}
      <div className="space-y-4">
        {filteredCycles.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <p className="text-gray-500">No evaluation cycles found matching your filters.</p>
            </div>
          </Card>
        ) : (
          filteredCycles.map((cycle) => (
            <HistoricalCycleCard
              key={cycle.cycle_id}
              cycle={cycle}
              onCompare={handleCompare}
            />
          ))
        )}
      </div>

      {/* Export Button at Bottom */}
      <div className="mt-6 flex justify-center gap-3">
        <Button
          variant="outline"
          leftIcon={<FileDown className="w-4 h-4" />}
          onClick={() => alert('Download PDF report of all history')}
        >
          Download PDF Report
        </Button>
      </div>
    </div>
  );
};

export default EvaluationHistory;
