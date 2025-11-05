import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../common/Card';
import Badge from '../../common/Badge';
import Button from '../../common/Button';
import { ChevronDown, ChevronRight, Download, Eye, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const HistoricalCycleCard = ({ cycle, onCompare }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getGradeVariant = (grade) => {
    if (grade === 'A+' || grade === 'A') return 'success';
    if (grade === 'B+' || grade === 'B') return 'primary';
    if (grade === 'C+' || grade === 'C') return 'warning';
    return 'danger';
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-success-600" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-danger-600" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      {/* Header */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <button className="text-gray-500 hover:text-gray-700">
            {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900">{cycle.cycle_name}</h3>
              <Badge variant={cycle.status === 'Approved' ? 'success' : 'danger'}>
                {cycle.status}
              </Badge>
              <Badge variant={getGradeVariant(cycle.grade)} size="lg">
                {cycle.grade}
              </Badge>
              <span className="text-sm font-semibold text-gray-900">({cycle.overall_score}%)</span>
              {cycle.is_current && (
                <Badge variant="primary" size="sm">Current</Badge>
              )}
            </div>
            <p className="text-sm text-gray-600">{cycle.period}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Eye className="w-4 h-4" />}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/school/scorecard/${cycle.cycle_id}`);
            }}
          >
            View Scorecard
          </Button>
          {cycle.status === 'Approved' && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  window.alert('Download report for ' + cycle.cycle_name);
                }}
              >
                <Download className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onCompare && onCompare(cycle);
                }}
              >
                Compare
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
          {/* Compliance Domain */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-medium text-gray-900">📋 Compliance (50% weight):</h4>
              <Badge variant={cycle.domain_scores.compliance.status === 'Compliant' ? 'success' : 'danger'}>
                {cycle.domain_scores.compliance.status}
              </Badge>
            </div>
            <div className="pl-6 space-y-1">
              {cycle.domain_scores.compliance.indicators.map((indicator, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <span className={indicator.status === 'Compliant' ? 'text-success-600' : 'text-danger-600'}>
                    {indicator.status === 'Compliant' ? '✅' : '❌'}
                  </span>
                  <span className="text-gray-700">[{indicator.code}] {indicator.name}</span>
                  {indicator.issue && (
                    <span className="text-danger-600 text-xs">({indicator.issue})</span>
                  )}
                </div>
              ))}
            </div>
            {cycle.domain_scores.compliance.failure_indicator && (
              <p className="text-sm text-danger-600 mt-2 pl-6">
                Failed due to: {cycle.domain_scores.compliance.failure_indicator}
              </p>
            )}
          </div>

          {/* Excellence Domain */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-medium text-gray-900">📊 Institutional Excellence ({cycle.domain_scores.excellence.weight}% weight):</h4>
              <Badge variant={getGradeVariant(cycle.domain_scores.excellence.grade)}>
                {cycle.domain_scores.excellence.grade} ({cycle.domain_scores.excellence.score}%)
              </Badge>
            </div>
            <div className="pl-6 space-y-1">
              {cycle.domain_scores.excellence.indicators.map((indicator, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <span className="text-gray-700 flex-1">
                    [{indicator.code}] {indicator.name}: {indicator.score}% ({indicator.grade})
                  </span>
                  {indicator.trend && (
                    <div className="flex items-center gap-1">
                      {getTrendIcon(indicator.trend)}
                      {indicator.change !== undefined && indicator.change !== 0 && (
                        <span className={indicator.change > 0 ? 'text-success-600' : 'text-danger-600'}>
                          {indicator.change > 0 ? '+' : ''}{indicator.change}%
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Satisfaction Domain */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-medium text-gray-900">😊 Beneficiary Satisfaction ({cycle.domain_scores.satisfaction.weight}% weight):</h4>
              <Badge variant={getGradeVariant(cycle.domain_scores.satisfaction.grade)}>
                {cycle.domain_scores.satisfaction.grade} ({cycle.domain_scores.satisfaction.score}%)
              </Badge>
            </div>
            <div className="pl-6 space-y-1">
              {cycle.domain_scores.satisfaction.indicators.map((indicator, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <span className="text-gray-700 flex-1">
                    [{indicator.code}] {indicator.name}: {indicator.score}% ({indicator.grade})
                  </span>
                  {indicator.trend && (
                    <div className="flex items-center gap-1">
                      {getTrendIcon(indicator.trend)}
                      {indicator.change !== undefined && indicator.change !== 0 && (
                        <span className={indicator.change > 0 ? 'text-success-600' : 'text-danger-600'}>
                          {indicator.change > 0 ? '+' : ''}{indicator.change}%
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Metadata */}
          <div className="pt-3 border-t border-gray-200 text-sm text-gray-600">
            <div className="flex items-center justify-between">
              <span>Version: {cycle.version} {cycle.correction_cycles > 0 && `(${cycle.correction_cycles} correction cycle${cycle.correction_cycles > 1 ? 's' : ''})`}</span>
              <span>Submitted: {formatDate(cycle.submitted_date)}</span>
              {cycle.approved_date && (
                <span>Approved: {formatDate(cycle.approved_date)}</span>
              )}
            </div>
            {cycle.failure_reason && (
              <p className="text-danger-600 mt-2">
                <strong>Failure Reason:</strong> {cycle.failure_reason}
              </p>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

export default HistoricalCycleCard;
