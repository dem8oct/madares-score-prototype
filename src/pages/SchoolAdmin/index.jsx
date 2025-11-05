import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEvaluation } from '../../context/EvaluationContext';
import { mockSchools } from '../../data/mockData';
import { schoolDashboardKPI } from '../../data/schoolDashboardKPI';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import ProgressBar from '../../components/common/ProgressBar';
import { FileText, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import {
  OverallScoreCard,
  PendingItemsCard,
  DeadlineCountdownCard,
  CompletionProgressCard,
  StatusCard
} from '../../components/school/dashboard';
import RankingsSection from '../../components/school/rankings/RankingsSection';

const SchoolAdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getEvaluation } = useEvaluation();

  // Find school and evaluation
  const school = mockSchools.find(s => s.id === user?.school_id);
  const evaluation = school?.current_evaluation_id ? getEvaluation(school.current_evaluation_id) : null;

  // Get KPI data
  const kpiData = schoolDashboardKPI;

  const getStatusIcon = (status) => {
    if (status === 'approved') return <CheckCircle className="w-5 h-5 text-success-600" />;
    if (status === 'submitted' || status === 'under_review') return <Clock className="w-5 h-5 text-primary-600" />;
    if (status === 'returned_for_correction') return <AlertCircle className="w-5 h-5 text-danger-600" />;
    return <FileText className="w-5 h-5 text-gray-400" />;
  };

  const getStatusVariant = (status) => {
    if (status === 'approved') return 'success';
    if (status === 'submitted' || status === 'under_review') return 'primary';
    if (status === 'returned_for_correction') return 'danger';
    if (status === 'in_progress') return 'warning';
    return 'default';
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">School Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">{school?.name || 'Manage your school\'s evaluation'}</p>
        </div>

        {/* KPI Cards Section */}
        {evaluation && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <OverallScoreCard data={kpiData.overall_score} />
              <PendingItemsCard
                data={kpiData.pending_items}
                onViewDetails={() => navigate('/school/evaluation')}
              />
              <DeadlineCountdownCard data={kpiData.deadline} />
              <CompletionProgressCard data={kpiData.completion_progress} />
              <StatusCard data={kpiData.evaluation_status} />
            </div>
          </div>
        )}

        {/* Rankings Section */}
        {school?.published_score && (
          <RankingsSection />
        )}

        {/* School Information */}
        {school && (
          <Card title="School Information" padding="default">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">School Name</p>
                <p className="font-medium text-gray-900">{school.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Region</p>
                <p className="font-medium text-gray-900">{school.region}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">City</p>
                <p className="font-medium text-gray-900">{school.city}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Level</p>
                <p className="font-medium text-gray-900">{school.level}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">License Number</p>
                <p className="font-medium text-gray-900">{school.license_number}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <p className="font-medium text-gray-900">{school.total_students}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Current Evaluation */}
        {evaluation ? (
          <Card title="Current Evaluation" padding="default">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(evaluation.status)}
                  <div>
                    <h3 className="font-semibold text-gray-900">Request {evaluation.id}</h3>
                    <p className="text-sm text-gray-600">Version {evaluation.version}</p>
                  </div>
                </div>
                <Badge variant={getStatusVariant(evaluation.status)}>
                  {evaluation.status.replace(/_/g, ' ').toUpperCase()}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Completion Progress</p>
                  <ProgressBar percentage={evaluation.completion_percentage} showLabel={true} />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Deadline</p>
                  <p className="font-medium text-gray-900">{evaluation.deadline}</p>
                </div>
              </div>

              {evaluation.pending_items && evaluation.pending_items.length > 0 && (
                <div className="p-3 bg-warning-50 border border-warning-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-warning-900">
                        {evaluation.pending_items.length} items need your attention
                      </p>
                      <p className="text-xs text-warning-800 mt-1">
                        Please review and complete all pending items
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  {evaluation.status === 'in_progress' && 'Continue working on your evaluation'}
                  {evaluation.status === 'returned_for_correction' && 'Review corrections and resubmit'}
                  {evaluation.status === 'submitted' && 'Evaluation is under review by Ministry'}
                  {evaluation.status === 'approved' && 'Evaluation has been approved'}
                </p>
                <Button
                  variant="primary"
                  onClick={() => navigate('/school/evaluation')}
                  disabled={evaluation.status === 'submitted' || evaluation.status === 'approved'}
                >
                  {evaluation.status === 'in_progress' && 'Continue'}
                  {evaluation.status === 'returned_for_correction' && 'Review & Fix'}
                  {evaluation.status === 'submitted' && 'View (Read-Only)'}
                  {evaluation.status === 'approved' && 'View'}
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Card padding="default">
            <div className="text-center py-8">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Evaluation</h3>
              <p className="text-gray-600">
                You don't have any active evaluation requests at the moment.
              </p>
            </div>
          </Card>
        )}

        {/* Published Score (if available) */}
        {school?.published_score && (
          <Card title="Latest Published Score" padding="default">
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Compliance</p>
                <p className="text-2xl font-bold text-gray-900">{school.published_score.compliance}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Excellence</p>
                <p className="text-2xl font-bold text-primary-600">{school.published_score.excellence_score}%</p>
                <p className="text-sm text-gray-600 mt-1">Grade: {school.published_score.excellence_grade}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Satisfaction</p>
                <p className="text-2xl font-bold text-primary-600">{school.published_score.satisfaction_score}%</p>
                <p className="text-sm text-gray-600 mt-1">Grade: {school.published_score.satisfaction_grade}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3 text-center">
              Evaluation Date: {school.published_score.evaluation_date}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SchoolAdminDashboard;
