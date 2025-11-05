import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import { Scale, Clock, CheckCircle, XCircle, AlertTriangle, FileText } from 'lucide-react';

const AppealsOfficerDashboard = () => {
  const { language, t } = useLanguage();
  const [selectedAppeal, setSelectedAppeal] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Mock appeals data
  const appeals = [
    {
      id: 'APP-2025-001',
      school_id: 'SCH-2025-001',
      school_name: 'Riyadh International School',
      evaluation_id: 'REQ-2025-001',
      appeal_type: 'Score Dispute',
      status: 'pending',
      submitted_date: '2025-10-20',
      deadline: '2025-11-10',
      priority: 'high',
      description: 'We believe our Excellence score was calculated incorrectly. The indicator E201 (Teacher Qualifications) should have been scored higher based on our submitted evidence showing 90% qualified teachers, not the 85% shown in the evaluation.',
      school_comments: 'Our records show 36 out of 40 teachers have full qualifications (90%), but the evaluation shows 34 out of 40 (85%). We have attached updated certification documents.',
      evidence_files: ['teacher_certifications_2025.pdf', 'HR_records_oct_2025.xlsx'],
    },
    {
      id: 'APP-2025-002',
      school_id: 'SCH-2025-002',
      school_name: 'Al-Noor Academy',
      evaluation_id: 'REQ-2025-002',
      appeal_type: 'Compliance Rejection',
      status: 'under_review',
      submitted_date: '2025-10-15',
      deadline: '2025-11-05',
      priority: 'medium',
    },
    {
      id: 'APP-2025-003',
      school_id: 'SCH-2025-004',
      school_name: 'Al-Majd Academy',
      evaluation_id: 'REQ-2025-004',
      appeal_type: 'Process Violation',
      status: 'approved',
      submitted_date: '2025-10-05',
      deadline: '2025-10-25',
      priority: 'low',
      resolution_date: '2025-10-22',
    },
    {
      id: 'APP-2025-004',
      school_id: 'SCH-2025-003',
      school_name: 'Al-Faisal Girls School',
      evaluation_id: 'REQ-2025-003',
      appeal_type: 'Evidence Dispute',
      status: 'rejected',
      submitted_date: '2025-09-28',
      deadline: '2025-10-18',
      priority: 'medium',
      resolution_date: '2025-10-15',
    },
  ];

  const columns = [
    { key: 'id', label: 'Appeal ID', sortable: true },
    { key: 'school_name', label: 'School', sortable: true },
    { key: 'appeal_type', label: 'Type', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'priority', label: 'Priority', sortable: true },
    { key: 'submitted_date', label: 'Submitted', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false },
  ];

  const getStatusVariant = (status) => {
    const map = {
      pending: 'warning',
      under_review: 'primary',
      approved: 'success',
      rejected: 'danger',
    };
    return map[status] || 'default';
  };

  const getPriorityVariant = (priority) => {
    const map = { high: 'danger', medium: 'warning', low: 'default' };
    return map[priority] || 'default';
  };

  const handleReviewAppeal = (appeal) => {
    setSelectedAppeal(appeal);
    setShowReviewModal(true);
  };

  const data = appeals.map(appeal => ({
    id: appeal.id,
    school_name: appeal.school_name,
    appeal_type: appeal.appeal_type,
    status: (
      <Badge variant={getStatusVariant(appeal.status)}>
        {appeal.status.replace(/_/g, ' ')}
      </Badge>
    ),
    priority: (
      <Badge variant={getPriorityVariant(appeal.priority)}>
        {appeal.priority}
      </Badge>
    ),
    submitted_date: appeal.submitted_date,
    actions: (
      <Button variant="outline" size="sm" onClick={() => handleReviewAppeal(appeal)}>
        Review
      </Button>
    ),
  }));

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Appeals Officer Dashboard
        </h1>
        <p className="text-gray-600">
          Review and manage school appeals and disputes
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Appeals</p>
              <p className="text-2xl font-bold text-warning-600">
                {appeals.filter(a => a.status === 'pending').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-warning-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Under Review</p>
              <p className="text-2xl font-bold text-primary-600">
                {appeals.filter(a => a.status === 'under_review').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Scale className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-success-600">
                {appeals.filter(a => a.status === 'approved').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-danger-600">
                {appeals.filter(a => a.status === 'rejected').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-danger-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-danger-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* High Priority Alerts */}
      {appeals.filter(a => a.priority === 'high' && a.status === 'pending').length > 0 && (
        <div className="bg-danger-50 border-l-4 border-danger-500 p-4 mb-6">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-danger-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-danger-800 font-semibold mb-1">
                High Priority Appeals Pending
              </h3>
              <p className="text-danger-700 text-sm">
                {appeals.filter(a => a.priority === 'high' && a.status === 'pending').length} high priority appeal(s) require immediate attention.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Appeals Table */}
      <Card>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            All Appeals
          </h2>
          <p className="text-sm text-gray-600">
            Review and manage school appeals
          </p>
        </div>
        <Table columns={columns} data={data} />
      </Card>

      {/* Review Appeal Modal */}
      {selectedAppeal && (
        <AppealReviewModal
          isOpen={showReviewModal}
          onClose={() => {
            setShowReviewModal(false);
            setSelectedAppeal(null);
          }}
          appeal={selectedAppeal}
        />
      )}
    </div>
  );
};

// Appeal Review Modal
const AppealReviewModal = ({ isOpen, onClose, appeal }) => {
  const [decision, setDecision] = useState('');
  const [officerComments, setOfficerComments] = useState('');

  const handleSubmitDecision = (e) => {
    e.preventDefault();
    alert(`Appeal ${appeal.id} ${decision}!\nComments: ${officerComments}`);
    onClose();
    setDecision('');
    setOfficerComments('');
  };

  const getStatusVariant = (status) => {
    const map = {
      pending: 'warning',
      under_review: 'primary',
      approved: 'success',
      rejected: 'danger',
    };
    return map[status] || 'default';
  };

  const getPriorityVariant = (priority) => {
    const map = { high: 'danger', medium: 'warning', low: 'default' };
    return map[priority] || 'default';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Review Appeal" size="xl">
      <div className="space-y-6">
        {/* Appeal Summary */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-600">Appeal ID</p>
            <p className="font-semibold text-gray-900">{appeal.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">School</p>
            <p className="font-semibold text-gray-900">{appeal.school_name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Type</p>
            <p className="font-semibold text-gray-900">{appeal.appeal_type}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <Badge variant={getStatusVariant(appeal.status)}>
              {appeal.status.replace(/_/g, ' ')}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-gray-600">Priority</p>
            <Badge variant={getPriorityVariant(appeal.priority)}>
              {appeal.priority}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-gray-600">Submitted</p>
            <p className="font-semibold text-gray-900">{appeal.submitted_date}</p>
          </div>
        </div>

        {/* Appeal Details */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Appeal Description</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            {appeal.description || 'No description provided.'}
          </p>
        </div>

        {/* School Comments */}
        {appeal.school_comments && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">School's Comments</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-900">{appeal.school_comments}</p>
            </div>
          </div>
        )}

        {/* Evidence Files */}
        {appeal.evidence_files && appeal.evidence_files.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Evidence Attached</h3>
            <div className="space-y-2">
              {appeal.evidence_files.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-200"
                >
                  <FileText className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">{file}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Decision Form */}
        <form onSubmit={handleSubmitDecision} className="border-t border-gray-200 pt-4">
          <h3 className="font-semibold text-gray-900 mb-4">Make Decision</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Decision *
              </label>
              <div className="flex gap-3">
                <label className="flex-1">
                  <input
                    type="radio"
                    name="decision"
                    value="approved"
                    checked={decision === 'approved'}
                    onChange={(e) => setDecision(e.target.value)}
                    className="sr-only"
                    required
                  />
                  <div
                    className={`p-3 border-2 rounded-lg text-center cursor-pointer transition-colors ${
                      decision === 'approved'
                        ? 'border-success-500 bg-success-50 text-success-700'
                        : 'border-gray-200 hover:border-success-300'
                    }`}
                  >
                    <CheckCircle className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm font-medium">Approve</span>
                  </div>
                </label>
                <label className="flex-1">
                  <input
                    type="radio"
                    name="decision"
                    value="rejected"
                    checked={decision === 'rejected'}
                    onChange={(e) => setDecision(e.target.value)}
                    className="sr-only"
                    required
                  />
                  <div
                    className={`p-3 border-2 rounded-lg text-center cursor-pointer transition-colors ${
                      decision === 'rejected'
                        ? 'border-danger-500 bg-danger-50 text-danger-700'
                        : 'border-gray-200 hover:border-danger-300'
                    }`}
                  >
                    <XCircle className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm font-medium">Reject</span>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Officer's Comments *
              </label>
              <textarea
                value={officerComments}
                onChange={(e) => setOfficerComments(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows="4"
                placeholder="Provide reasoning for your decision..."
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit Decision
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AppealsOfficerDashboard;
