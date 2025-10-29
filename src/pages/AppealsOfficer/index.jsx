import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import { Scale, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const AppealsOfficerDashboard = () => {
  const { language, t } = useLanguage();

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
      <Button variant="outline" size="sm">
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
    </div>
  );
};

export default AppealsOfficerDashboard;
