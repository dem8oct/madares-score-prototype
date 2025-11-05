import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Scale, XCircle, FileDown } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import PerformanceDistributionChart from '../../components/committee/indicators/PerformanceDistributionChart';
import GradeDistributionChart from '../../components/committee/indicators/GradeDistributionChart';
import { getIndicatorDetailedData } from '../../data/indicatorDetailedReview';

const IndicatorReviewPage = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  const indicator = getIndicatorDetailedData(code);

  if (!indicator) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <p className="text-gray-500">Indicator not found</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate('/committee')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? 'success' : 'default';
  };

  const getTypeLabel = (type) => {
    return type === 'M' ? 'Manual' : type === 'A' ? 'Automatic' : type;
  };

  const getScoreTypeLabel = (scoreType) => {
    const labels = {
      'B': 'Binary',
      'N': 'Numeric (0-100%)',
      'G': 'Gradual'
    };
    return labels[scoreType] || scoreType;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => navigate('/committee')}
          className="mb-4"
        >
          Back to Indicators
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Indicator Review: [{indicator.indicator_code}] {indicator.indicator_name}
            </h1>
            <p className="text-gray-600">
              Detailed analytics and performance statistics
            </p>
          </div>
          <Badge variant={getStatusColor(indicator.status)} size="lg">
            {indicator.status}
          </Badge>
        </div>
      </div>

      {/* Metadata Card */}
      <Card className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Metadata</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-600">Indicator Code:</span>
              <p className="font-medium text-gray-900">{indicator.indicator_code}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Domain:</span>
              <p className="font-medium text-gray-900">{indicator.domain}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Sub-Category:</span>
              <p className="font-medium text-gray-900">{indicator.sub_category}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Weight:</span>
              <p className="font-medium text-gray-900">
                {indicator.weight} <span className="text-sm text-gray-500">(High Priority)</span>
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-600">Type:</span>
              <p className="font-medium text-gray-900">{getTypeLabel(indicator.type)} ({indicator.type})</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Score Type:</span>
              <p className="font-medium text-gray-900">{getScoreTypeLabel(indicator.score_type)}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Created:</span>
              <p className="font-medium text-gray-900">
                {formatDate(indicator.created_at)} by Committee Team
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Last Modified:</span>
              <p className="font-medium text-gray-900">
                {formatDate(indicator.last_modified)} by {indicator.last_modified_by}
              </p>
            </div>
          </div>
        </div>

        {indicator.detailed_metadata && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600">Formula:</span>
                <p className="font-mono text-sm text-gray-900 bg-gray-50 p-3 rounded mt-1">
                  {indicator.detailed_metadata.formula}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Data Source:</span>
                <p className="font-medium text-gray-900">{indicator.detailed_metadata.data_source}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Calculation Inputs:</span>
                <ul className="list-disc list-inside text-sm text-gray-700 mt-1 space-y-1">
                  {indicator.detailed_metadata.calculation_inputs.map((input, idx) => (
                    <li key={idx}>{input}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Usage Statistics */}
      <Card className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Usage Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Evaluations</p>
            <p className="text-2xl font-bold text-gray-900">
              {indicator.usage_statistics.total_evaluations.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Evaluation Cycles</p>
            <p className="text-lg font-semibold text-gray-900">
              {indicator.usage_statistics.evaluation_cycles}
            </p>
          </div>
          {indicator.score_type !== 'B' && (
            <>
              <div>
                <p className="text-sm text-gray-600 mb-1">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {indicator.usage_statistics.average_score_percentage}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Median Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {indicator.usage_statistics.median_score}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Std. Deviation</p>
                <p className="text-2xl font-bold text-gray-900">
                  {indicator.usage_statistics.standard_deviation}
                </p>
              </div>
            </>
          )}
          {indicator.score_type === 'B' && (
            <div>
              <p className="text-sm text-gray-600 mb-1">Compliance Rate</p>
              <p className="text-2xl font-bold text-success-600">
                {indicator.usage_statistics.compliance_rate}%
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Performance Distribution */}
      <Card className="mb-6">
        <PerformanceDistributionChart
          distributionData={indicator.performance_distribution}
          scoreType={indicator.score_type}
        />
      </Card>

      {/* Grade Distribution (only for numeric indicators) */}
      {indicator.score_type !== 'B' && indicator.grade_distribution && (
        <Card className="mb-6">
          <GradeDistributionChart gradeDistribution={indicator.grade_distribution} />
        </Card>
      )}

      {/* Change History */}
      {indicator.change_history && indicator.change_history.length > 0 && (
        <Card className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Changes Log</h2>
          <div className="space-y-4">
            {indicator.change_history.map((change, idx) => (
              <div key={idx} className="border-l-4 border-primary-500 pl-4 py-2">
                <div className="flex items-start justify-between mb-1">
                  <p className="font-semibold text-gray-900">
                    {formatDate(change.date)} | {change.change_type}
                  </p>
                  <p className="text-sm text-gray-600">{change.changed_by}</p>
                </div>
                {change.old_value !== undefined && (
                  <p className="text-sm text-gray-700 mb-1">
                    Changed from <span className="font-medium">{change.old_value}</span> → <span className="font-medium">{change.new_value}</span>
                  </p>
                )}
                {change.change_description && (
                  <p className="text-sm text-gray-700 mb-1">{change.change_description}</p>
                )}
                {change.rationale && (
                  <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded">
                    <p className="text-sm text-blue-900">
                      <span className="font-medium">Rationale:</span> "{change.rationale}"
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Actions */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" leftIcon={<Edit className="w-4 h-4" />}>
            Edit Indicator
          </Button>
          <Button variant="outline" leftIcon={<Scale className="w-4 h-4" />}>
            Adjust Weight
          </Button>
          <Button variant="outline" leftIcon={<XCircle className="w-4 h-4" />} className="text-danger-600 border-danger-300">
            Disable Indicator
          </Button>
          <Button variant="primary" leftIcon={<FileDown className="w-4 h-4" />}>
            Export Analytics Report (PDF)
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default IndicatorReviewPage;
