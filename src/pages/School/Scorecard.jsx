import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, CheckCircle, XCircle, Award, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { evaluationHistory } from '../../data/evaluationHistory';

const Scorecard = () => {
  const { cycleId } = useParams();
  const navigate = useNavigate();

  // Find the cycle data
  const cycle = evaluationHistory.find(c => c.cycle_id === cycleId);

  if (!cycle) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-500">Evaluation cycle not found.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => navigate('/school/evaluation-history')}
            >
              Back to History
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const getGradeVariant = (grade) => {
    if (grade === 'A+' || grade === 'A') return 'success';
    if (grade === 'B+' || grade === 'B') return 'primary';
    if (grade === 'C+' || grade === 'C') return 'warning';
    return 'danger';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-success-600" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-danger-600" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => navigate('/school/evaluation-history')}
          className="mb-4"
        >
          Back to History
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Evaluation Scorecard
            </h1>
            <p className="text-gray-600">
              {cycle.cycle_name} • {cycle.period}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              leftIcon={<Download className="w-4 h-4" />}
              onClick={() => alert('Download scorecard PDF')}
            >
              Download PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Overall Score Section */}
      <Card className="mb-6">
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Badge variant={cycle.status === 'Approved' ? 'success' : 'danger'} size="lg">
              {cycle.status}
            </Badge>
            {cycle.is_current && (
              <Badge variant="primary" size="lg">Current Cycle</Badge>
            )}
          </div>
          <h2 className="text-6xl font-bold text-primary-600 mb-2">{cycle.overall_score}%</h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant={getGradeVariant(cycle.grade)} size="lg" className="text-2xl px-6 py-2">
              Grade {cycle.grade}
            </Badge>
          </div>
          <p className="text-gray-600">Overall Evaluation Score</p>

          {/* Metadata */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Submitted</p>
                <p className="font-medium text-gray-900">{formatDate(cycle.submitted_date)}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Approved</p>
                <p className="font-medium text-gray-900">{formatDate(cycle.approved_date)}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Version</p>
                <p className="font-medium text-gray-900">
                  {cycle.version}
                  {cycle.correction_cycles > 0 && ` (${cycle.correction_cycles} correction${cycle.correction_cycles > 1 ? 's' : ''})`}
                </p>
              </div>
            </div>
          </div>

          {cycle.failure_reason && (
            <div className="mt-4 p-4 bg-danger-50 border border-danger-200 rounded-lg">
              <p className="text-danger-700 font-medium">
                <strong>Failure Reason:</strong> {cycle.failure_reason}
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Domain Scores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Compliance Card */}
        <Card className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl">📋</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Compliance</h3>
            <Badge
              variant={cycle.domain_scores.compliance.status === 'Compliant' ? 'success' : 'danger'}
              size="lg"
            >
              {cycle.domain_scores.compliance.status}
            </Badge>
          </div>
          <div className="text-sm text-gray-600">
            <p className="font-medium">Weight: 50%</p>
            <p className="mt-1">Pass/Fail Assessment</p>
          </div>
        </Card>

        {/* Excellence Card */}
        <Card className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Institutional Excellence</h3>
            <div className="flex items-center justify-center gap-2">
              <Badge variant={getGradeVariant(cycle.domain_scores.excellence.grade)} size="lg">
                {cycle.domain_scores.excellence.grade}
              </Badge>
              <span className="text-2xl font-bold text-gray-900">
                {cycle.domain_scores.excellence.score}%
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <p className="font-medium">Weight: {cycle.domain_scores.excellence.weight}%</p>
            <p className="mt-1">{cycle.domain_scores.excellence.indicators.length} Indicators</p>
          </div>
        </Card>

        {/* Satisfaction Card */}
        <Card className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl">😊</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Beneficiary Satisfaction</h3>
            <div className="flex items-center justify-center gap-2">
              <Badge variant={getGradeVariant(cycle.domain_scores.satisfaction.grade)} size="lg">
                {cycle.domain_scores.satisfaction.grade}
              </Badge>
              <span className="text-2xl font-bold text-gray-900">
                {cycle.domain_scores.satisfaction.score}%
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <p className="font-medium">Weight: {cycle.domain_scores.satisfaction.weight}%</p>
            <p className="mt-1">{cycle.domain_scores.satisfaction.indicators.length} Indicators</p>
          </div>
        </Card>
      </div>

      {/* Compliance Detailed Breakdown */}
      <Card className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>📋</span> Compliance Domain (50% weight)
        </h2>
        <div className="mb-4">
          <Badge
            variant={cycle.domain_scores.compliance.status === 'Compliant' ? 'success' : 'danger'}
            size="lg"
          >
            {cycle.domain_scores.compliance.status}
          </Badge>
        </div>
        <div className="space-y-3">
          {cycle.domain_scores.compliance.indicators.map((indicator, idx) => (
            <div
              key={idx}
              className={`flex items-start justify-between p-4 rounded-lg border ${
                indicator.status === 'Compliant'
                  ? 'bg-success-50 border-success-200'
                  : 'bg-danger-50 border-danger-200'
              }`}
            >
              <div className="flex items-start gap-3">
                {indicator.status === 'Compliant' ? (
                  <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-danger-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-medium text-gray-900">
                    [{indicator.code}] {indicator.name}
                  </p>
                  {indicator.issue && (
                    <p className="text-sm text-danger-700 mt-1">
                      <strong>Issue:</strong> {indicator.issue}
                    </p>
                  )}
                </div>
              </div>
              <Badge
                variant={indicator.status === 'Compliant' ? 'success' : 'danger'}
              >
                {indicator.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Excellence Detailed Breakdown */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Award className="w-6 h-6 text-primary-600" />
            Institutional Excellence ({cycle.domain_scores.excellence.weight}% weight)
          </h2>
          <div className="flex items-center gap-2">
            <Badge variant={getGradeVariant(cycle.domain_scores.excellence.grade)} size="lg">
              {cycle.domain_scores.excellence.grade}
            </Badge>
            <span className="text-2xl font-bold text-gray-900">
              {cycle.domain_scores.excellence.score}%
            </span>
          </div>
        </div>
        <div className="space-y-3">
          {cycle.domain_scores.excellence.indicators.map((indicator, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-900 mb-1">
                  [{indicator.code}] {indicator.name}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant={getGradeVariant(indicator.grade)}>
                    {indicator.grade}
                  </Badge>
                  <span className="text-sm text-gray-600">Score: {indicator.score}%</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {indicator.trend && (
                  <div className="flex items-center gap-1">
                    {getTrendIcon(indicator.trend)}
                    {indicator.change !== undefined && indicator.change !== 0 && (
                      <span
                        className={`text-sm font-medium ${
                          indicator.change > 0 ? 'text-success-600' : 'text-danger-600'
                        }`}
                      >
                        {indicator.change > 0 ? '+' : ''}{indicator.change}%
                      </span>
                    )}
                  </div>
                )}
                <span className="text-2xl font-bold text-gray-900">{indicator.score}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Satisfaction Detailed Breakdown */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span>😊</span>
            Beneficiary Satisfaction ({cycle.domain_scores.satisfaction.weight}% weight)
          </h2>
          <div className="flex items-center gap-2">
            <Badge variant={getGradeVariant(cycle.domain_scores.satisfaction.grade)} size="lg">
              {cycle.domain_scores.satisfaction.grade}
            </Badge>
            <span className="text-2xl font-bold text-gray-900">
              {cycle.domain_scores.satisfaction.score}%
            </span>
          </div>
        </div>
        <div className="space-y-3">
          {cycle.domain_scores.satisfaction.indicators.map((indicator, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-900 mb-1">
                  [{indicator.code}] {indicator.name}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant={getGradeVariant(indicator.grade)}>
                    {indicator.grade}
                  </Badge>
                  <span className="text-sm text-gray-600">Score: {indicator.score}%</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {indicator.trend && (
                  <div className="flex items-center gap-1">
                    {getTrendIcon(indicator.trend)}
                    {indicator.change !== undefined && indicator.change !== 0 && (
                      <span
                        className={`text-sm font-medium ${
                          indicator.change > 0 ? 'text-success-600' : 'text-danger-600'
                        }`}
                      >
                        {indicator.change > 0 ? '+' : ''}{indicator.change}%
                      </span>
                    )}
                  </div>
                )}
                <span className="text-2xl font-bold text-gray-900">{indicator.score}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Actions */}
      <div className="flex justify-center gap-3">
        <Button
          variant="outline"
          onClick={() => navigate('/school/evaluation-history')}
        >
          Back to History
        </Button>
        <Button
          variant="primary"
          leftIcon={<Download className="w-4 h-4" />}
          onClick={() => alert('Download detailed scorecard report')}
        >
          Download Full Report
        </Button>
      </div>
    </div>
  );
};

export default Scorecard;
