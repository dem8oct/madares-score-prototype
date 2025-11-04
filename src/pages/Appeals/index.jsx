import React, { useState, useMemo } from 'react';
import { useToast } from '../../context/ToastContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import {
  FileText, Clock, AlertCircle, CheckCircle, TrendingUp,
  Search, Download, Filter, ExternalLink
} from 'lucide-react';

// Mock appeals data
const mockAppeals = [
  {
    id: 'APL-2025-001',
    school_name: 'Riyadh International School',
    school_id: 'SCH-001',
    request_id: 'REQ-2025-001',
    appeal_type: 'score_dispute',
    status: 'pending_review',
    priority: 'high',
    submitted_date: '2025-10-20',
    deadline: '2025-11-05',
    assigned_officer: 'user005',
    reason: 'School disputes the Excellence score calculation, claiming that recent teacher certifications were not counted.',
    evidence_files: ['certificate_scan.pdf', 'teacher_records.xlsx'],
  },
  {
    id: 'APL-2025-002',
    school_name: 'Al-Noor Academy',
    school_id: 'SCH-002',
    request_id: 'REQ-2025-002',
    appeal_type: 'procedural_error',
    status: 'under_investigation',
    priority: 'medium',
    submitted_date: '2025-10-18',
    deadline: '2025-11-03',
    assigned_officer: 'user005',
    reason: 'Claims that evaluation was conducted during school holiday period without prior notice.',
    evidence_files: ['school_calendar.pdf', 'email_correspondence.pdf'],
  },
  {
    id: 'APL-2025-003',
    school_name: 'Future Leaders School',
    school_id: 'SCH-003',
    request_id: 'REQ-2025-003',
    appeal_type: 'data_correction',
    status: 'resolved',
    priority: 'low',
    submitted_date: '2025-10-15',
    deadline: '2025-10-30',
    assigned_officer: 'user006',
    reason: 'Student enrollment numbers were incorrect in the submitted data.',
    evidence_files: ['enrollment_report.pdf'],
    resolution: 'Data corrected and score recalculated. New grade: B+ (was C+)',
    resolved_date: '2025-10-25',
  },
];

// KPI Card Component
const AppealsKPICard = ({ title, value, subtitle, icon: Icon, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-600',
    success: 'bg-success-50 text-success-600',
    warning: 'bg-warning-50 text-warning-600',
    danger: 'bg-danger-50 text-danger-600',
  };

  return (
    <Card padding="default" className="hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
};

const AppealsDashboard = () => {
  const { success } = useToast();
  const [appeals] = useState(mockAppeals);
  const [selectedAppeal, setSelectedAppeal] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    appealType: 'all',
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate KPIs
  const kpis = useMemo(() => {
    const totalAppeals = appeals.length;
    const pendingReview = appeals.filter(a => a.status === 'pending_review').length;
    const underInvestigation = appeals.filter(a => a.status === 'under_investigation').length;
    const slaBreached = appeals.filter(a => {
      const deadline = new Date(a.deadline);
      const now = new Date();
      return deadline < now && !['resolved', 'rejected'].includes(a.status);
    }).length;
    const avgResolutionDays = 7; // Mock

    return { totalAppeals, pendingReview, underInvestigation, slaBreached, avgResolutionDays };
  }, [appeals]);

  // Filter appeals
  const filteredAppeals = useMemo(() => {
    return appeals.filter(appeal => {
      if (filters.status !== 'all' && appeal.status !== filters.status) return false;
      if (filters.priority !== 'all' && appeal.priority !== filters.priority) return false;
      if (filters.appealType !== 'all' && appeal.appeal_type !== filters.appealType) return false;

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const schoolName = appeal.school_name.toLowerCase();
        const appealId = appeal.id.toLowerCase();
        if (!schoolName.includes(query) && !appealId.includes(query)) return false;
      }

      return true;
    });
  }, [appeals, filters, searchQuery]);

  // SLA monitoring - appeals approaching deadline
  const slaAlerts = useMemo(() => {
    const now = new Date();
    return appeals.filter(a => {
      if (['resolved', 'rejected'].includes(a.status)) return false;
      const deadline = new Date(a.deadline);
      const daysRemaining = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
      return daysRemaining <= 3 && daysRemaining >= 0;
    });
  }, [appeals]);

  const handleOpenAppeal = (appeal) => {
    setSelectedAppeal(appeal);
    setShowDetailModal(true);
  };

  const handleResolveAppeal = (appeal, resolution) => {
    success(`Appeal ${appeal.id} resolved: ${resolution}`);
    setShowDetailModal(false);
  };

  const handleRejectAppeal = (appeal, reason) => {
    success(`Appeal ${appeal.id} rejected`);
    setShowDetailModal(false);
  };

  const handleEscalateAppeal = (appeal) => {
    success(`Appeal ${appeal.id} escalated to senior review`);
    setShowDetailModal(false);
  };

  const getStatusBadge = (status) => {
    const config = {
      pending_review: { variant: 'warning', label: 'Pending Review' },
      under_investigation: { variant: 'primary', label: 'Under Investigation' },
      resolved: { variant: 'success', label: 'Resolved' },
      rejected: { variant: 'danger', label: 'Rejected' },
      escalated: { variant: 'warning', label: 'Escalated' },
    };
    const { variant, label } = config[status] || { variant: 'default', label: status };
    return <Badge variant={variant}>{label}</Badge>;
  };

  const getPriorityBadge = (priority) => {
    const config = {
      high: { variant: 'danger', label: 'High' },
      medium: { variant: 'warning', label: 'Medium' },
      low: { variant: 'default', label: 'Low' },
    };
    const { variant, label } = config[priority] || { variant: 'default', label: priority };
    return <Badge variant={variant}>{label}</Badge>;
  };

  const getAppealTypeLabel = (type) => {
    const labels = {
      score_dispute: 'Score Dispute',
      procedural_error: 'Procedural Error',
      data_correction: 'Data Correction',
      unfair_evaluation: 'Unfair Evaluation',
    };
    return labels[type] || type;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appeals Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage school evaluation appeals and disputes</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-5 gap-4">
          <AppealsKPICard
            title="Total Appeals"
            value={kpis.totalAppeals}
            subtitle="All time"
            icon={FileText}
            color="primary"
          />
          <AppealsKPICard
            title="Pending Review"
            value={kpis.pendingReview}
            subtitle="Require action"
            icon={Clock}
            color="warning"
          />
          <AppealsKPICard
            title="Under Investigation"
            value={kpis.underInvestigation}
            subtitle="In progress"
            icon={Search}
            color="primary"
          />
          <AppealsKPICard
            title="SLA Breached"
            value={kpis.slaBreached}
            subtitle="Overdue"
            icon={AlertCircle}
            color={kpis.slaBreached > 0 ? 'danger' : 'success'}
          />
          <AppealsKPICard
            title="Avg Resolution"
            value={`${kpis.avgResolutionDays}d`}
            subtitle="Target: <10 days"
            icon={TrendingUp}
            color="success"
          />
        </div>

        {/* SLA Monitoring Section */}
        {slaAlerts.length > 0 && (
          <Card padding="default" className="border-2 border-warning-200 bg-warning-50">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-warning-900 mb-2">SLA Alert: Appeals Approaching Deadline</h3>
                <div className="space-y-2">
                  {slaAlerts.map(appeal => {
                    const deadline = new Date(appeal.deadline);
                    const now = new Date();
                    const daysRemaining = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
                    return (
                      <div key={appeal.id} className="flex items-center justify-between p-2 bg-white rounded">
                        <div>
                          <span className="font-medium text-gray-900">{appeal.id}</span>
                          <span className="text-gray-600 ml-2">- {appeal.school_name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-warning-700 font-medium">
                            {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} remaining
                          </span>
                          <Button variant="outline" size="sm" onClick={() => handleOpenAppeal(appeal)}>
                            Open
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Filters Panel */}
        <Card title="Filters" padding="default">
          <div className="grid grid-cols-4 gap-4 mb-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full border-gray-300 rounded-lg"
              >
                <option value="all">All Statuses</option>
                <option value="pending_review">Pending Review</option>
                <option value="under_investigation">Under Investigation</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={filters.priority}
                onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                className="w-full border-gray-300 rounded-lg"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Appeal Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Appeal Type</label>
              <select
                value={filters.appealType}
                onChange={(e) => setFilters({ ...filters, appealType: e.target.value })}
                className="w-full border-gray-300 rounded-lg"
              >
                <option value="all">All Types</option>
                <option value="score_dispute">Score Dispute</option>
                <option value="procedural_error">Procedural Error</option>
                <option value="data_correction">Data Correction</option>
                <option value="unfair_evaluation">Unfair Evaluation</option>
              </select>
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Appeal ID or School Name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {filteredAppeals.length} of {appeals.length} appeals
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setFilters({ status: 'all', priority: 'all', appealType: 'all' });
                setSearchQuery('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </Card>

        {/* Appeals Table */}
        <Card title="Appeals List" padding="none">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Appeal ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">School Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deadline</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppeals.map((appeal) => {
                  const deadline = new Date(appeal.deadline);
                  const now = new Date();
                  const daysRemaining = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));

                  return (
                    <tr key={appeal.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-primary-600">{appeal.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{appeal.school_name}</div>
                        <div className="text-xs text-gray-500">{appeal.request_id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{getAppealTypeLabel(appeal.appeal_type)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getPriorityBadge(appeal.priority)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(appeal.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${
                          daysRemaining < 0 ? 'text-danger-600' :
                          daysRemaining <= 2 ? 'text-warning-600' :
                          'text-success-600'
                        }`}>
                          {daysRemaining < 0
                            ? `${Math.abs(daysRemaining)}d overdue`
                            : `${daysRemaining}d remaining`}
                        </div>
                        <div className="text-xs text-gray-500">{appeal.deadline}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenAppeal(appeal)}
                          icon={<ExternalLink className="w-4 h-4" />}
                        >
                          Open
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredAppeals.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Appeals Found</h3>
              <p className="text-gray-600">Try adjusting your filters</p>
            </div>
          )}
        </Card>

        {/* Export & Reporting */}
        <Card title="Export & Reporting" padding="default">
          <div className="flex gap-4">
            <Button
              variant="outline"
              icon={<Download className="w-4 h-4" />}
              onClick={() => success('Exporting appeals to Excel... (Demo)')}
            >
              Export to Excel
            </Button>
            <Button
              variant="outline"
              icon={<FileText className="w-4 h-4" />}
              onClick={() => success('Generating report... (Demo)')}
            >
              Generate Report
            </Button>
          </div>
        </Card>

        {/* Appeal Detail Modal */}
        {showDetailModal && selectedAppeal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Appeal Details</h2>
                  <p className="text-sm text-gray-600 mt-1">{selectedAppeal.id}</p>
                </div>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <span className="text-2xl text-gray-500">×</span>
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* School Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">School Name</label>
                    <p className="text-gray-900 font-medium">{selectedAppeal.school_name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Request ID</label>
                    <p className="text-gray-900 font-medium">{selectedAppeal.request_id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Appeal Type</label>
                    <p className="text-gray-900">{getAppealTypeLabel(selectedAppeal.appeal_type)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    {getPriorityBadge(selectedAppeal.priority)}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Submitted Date</label>
                    <p className="text-gray-900">{selectedAppeal.submitted_date}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Deadline</label>
                    <p className="text-gray-900">{selectedAppeal.deadline}</p>
                  </div>
                </div>

                {/* Reason */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Appeal</label>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-900">{selectedAppeal.reason}</p>
                  </div>
                </div>

                {/* Evidence Files */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Evidence Documents</label>
                  <div className="space-y-2">
                    {selectedAppeal.evidence_files.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{file}</span>
                        </div>
                        <Button variant="ghost" size="sm">Download</Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resolution (if resolved) */}
                {selectedAppeal.resolution && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Resolution</label>
                    <div className="p-4 bg-success-50 border border-success-200 rounded-lg">
                      <p className="text-success-900">{selectedAppeal.resolution}</p>
                      <p className="text-sm text-success-700 mt-2">
                        Resolved on: {selectedAppeal.resolved_date}
                      </p>
                    </div>
                  </div>
                )}

                {/* Decision Section (if not resolved/rejected) */}
                {!['resolved', 'rejected'].includes(selectedAppeal.status) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Decision</label>
                    <textarea
                      rows={4}
                      className="w-full border-gray-300 rounded-lg"
                      placeholder="Enter your decision and reasoning..."
                    />
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <Button variant="outline" onClick={() => setShowDetailModal(false)}>
                  Close
                </Button>
                {!['resolved', 'rejected'].includes(selectedAppeal.status) && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleEscalateAppeal(selectedAppeal)}
                    >
                      Escalate
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleRejectAppeal(selectedAppeal, 'Insufficient evidence')}
                    >
                      Reject Appeal
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => handleResolveAppeal(selectedAppeal, 'Appeal accepted')}
                    >
                      Resolve Appeal
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppealsDashboard;
