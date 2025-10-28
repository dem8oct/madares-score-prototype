import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvaluation } from '../../context/EvaluationContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { mockSchools } from '../../data/mockData';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import ActionDropdownMenu from '../../components/ops/ActionDropdownMenu';
import CreateRequestModal from '../../components/ops/CreateRequestModal';
import {
  Search, Download, FileText, Clock, AlertCircle, TrendingUp,
  ChevronLeft, ChevronRight, Plus, MoreVertical, X
} from 'lucide-react';

// KPI Card Component
const OpsKPICard = ({ title, value, subtitle, icon: Icon, color = 'primary' }) => {
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

const EvaluationRequestsTable = () => {
  const navigate = useNavigate();
  const { evaluations } = useEvaluation();
  const { currentUser } = useAuth();
  const { success, error } = useToast();

  // State
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    region: 'all',
    city: 'all',
    level: 'all',
    gender_model: 'all',
    status: 'all',
    assignedReviewer: 'all',
  });

  // Calculate KPIs
  const kpis = useMemo(() => {
    const totalRequests = evaluations.length;
    const inProgress = evaluations.filter(e => e.status === 'in_progress').length;
    const underReview = evaluations.filter(e => e.status === 'under_review').length;

    const breached = evaluations.filter(e => {
      if (['approved', 'published', 'closed'].includes(e.status)) return false;
      const deadline = new Date(e.deadline);
      return deadline < new Date();
    }).length;

    const avgReviewDays = 5; // Mock

    return { totalRequests, inProgress, underReview, breached, avgReviewDays };
  }, [evaluations]);

  // Filter options (extracted from data)
  const regions = ['all', ...new Set(evaluations.map(e => e.region))];
  const cities = ['all', ...new Set(evaluations.map(e => e.city))];
  const levels = ['all', 'Primary', 'Intermediate', 'Secondary'];
  const genderModels = ['all', 'Boys', 'Girls', 'Co-ed'];
  const statuses = [
    'all',
    'in_progress',
    'submitted',
    'under_review',
    'returned_for_correction',
    'pending_committee',
    'approved',
  ];

  // Filter and search evaluations
  const filteredEvaluations = useMemo(() => {
    return evaluations.filter(evaluation => {
      // Apply filters
      if (filters.region !== 'all' && evaluation.region !== filters.region) return false;
      if (filters.city !== 'all' && evaluation.city !== filters.city) return false;
      if (filters.level !== 'all' && evaluation.level !== filters.level) return false;
      if (filters.gender_model !== 'all' && evaluation.gender_model !== filters.gender_model) return false;
      if (filters.status !== 'all' && evaluation.status !== filters.status) return false;

      // Assigned reviewer filter
      if (filters.assignedReviewer !== 'all') {
        if (filters.assignedReviewer === 'unassigned' && evaluation.assigned_reviewer) return false;
        if (filters.assignedReviewer !== 'unassigned' && evaluation.assigned_reviewer !== filters.assignedReviewer) return false;
      }

      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const schoolName = evaluation.school_name.toLowerCase();
        const requestId = evaluation.id.toLowerCase();
        if (!schoolName.includes(query) && !requestId.includes(query)) return false;
      }

      return true;
    });
  }, [evaluations, filters, searchQuery]);

  // Pagination
  const paginatedEvaluations = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredEvaluations.slice(startIndex, endIndex);
  }, [filteredEvaluations, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredEvaluations.length / itemsPerPage);

  // Handlers
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRequests(paginatedEvaluations.map(e => e.id));
    } else {
      setSelectedRequests([]);
    }
  };

  const handleSelectRequest = (requestId, checked) => {
    if (checked) {
      setSelectedRequests([...selectedRequests, requestId]);
    } else {
      setSelectedRequests(selectedRequests.filter(id => id !== requestId));
    }
  };

  const handleClearFilters = () => {
    setFilters({
      region: 'all',
      city: 'all',
      level: 'all',
      gender_model: 'all',
      status: 'all',
      assignedReviewer: 'all',
    });
    setSearchQuery('');
  };

  const handleExportToExcel = () => {
    success('Exporting to Excel... (Demo)');
    // In real app: generate Excel file with filtered data
  };

  const handleDownloadEvidencePackage = () => {
    if (selectedRequests.length === 0) {
      error('Please select at least one request');
      return;
    }
    success(`Downloading evidence package for ${selectedRequests.length} requests... (Demo)`);
    // In real app: create ZIP file with all evidence documents
  };

  const handleOpenReview = (evalId) => {
    navigate(`/ops/evaluation/${evalId}`);
  };

  const handleDropdownAction = (action, evaluation) => {
    switch (action) {
      case 'open_review':
        navigate(`/ops/evaluation/${evaluation.id}`);
        break;
      case 'assign_to_me':
        success(`Assigned ${evaluation.school_name} to ${currentUser.name}`);
        // In real app: update evaluation.assigned_reviewer
        break;
      case 'view_history':
        success(`Opening history for ${evaluation.id} (Demo)`);
        // In real app: navigate to history page
        break;
      case 'download_evidence':
        success(`Downloading evidence for ${evaluation.school_name} (Demo)`);
        // In real app: download ZIP file
        break;
      case 'add_note':
        success(`Opening note dialog for ${evaluation.id} (Demo)`);
        // In real app: open modal to add internal note
        break;
      default:
        break;
    }
  };

  const handleCreateRequests = (schools, deadline) => {
    success(`Creating ${schools.length} evaluation request(s) with deadline ${deadline} (Demo)`);
    // In real app: POST to API to create evaluation requests
    // Then refresh evaluations list
  };

  const getStatusBadge = (status, version) => {
    const statusConfig = {
      in_progress: { variant: 'default', label: 'In Progress' },
      submitted: { variant: 'primary', label: 'Submitted' },
      under_review: { variant: 'warning', label: 'Under Review' },
      returned_for_correction: { variant: 'danger', label: `Returned (${version})` },
      pending_committee: { variant: 'warning', label: 'Pending Committee' },
      approved: { variant: 'success', label: 'Approved' },
    };

    const config = statusConfig[status] || { variant: 'default', label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getStatusLabel = (status) => {
    const labels = {
      all: 'All Statuses',
      in_progress: 'In Progress',
      submitted: 'Submitted',
      under_review: 'Under Review',
      returned_for_correction: 'Returned for Correction',
      pending_committee: 'Pending Committee',
      approved: 'Approved',
    };
    return labels[status] || status;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Evaluation Requests</h1>
        <p className="text-gray-600 mt-1">Review and manage school evaluation submissions</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-5 gap-4">
        <OpsKPICard
          title="Total Requests"
          value={kpis.totalRequests}
          subtitle="All evaluations"
          icon={FileText}
          color="primary"
        />
        <OpsKPICard
          title="In Progress"
          value={kpis.inProgress}
          subtitle="School filling data"
          icon={Clock}
          color="warning"
        />
        <OpsKPICard
          title="Under Review"
          value={kpis.underReview}
          subtitle="Require action"
          icon={FileText}
          color="primary"
        />
        <OpsKPICard
          title="SLA Breached"
          value={kpis.breached}
          subtitle="Overdue"
          icon={AlertCircle}
          color={kpis.breached > 0 ? 'danger' : 'success'}
        />
        <OpsKPICard
          title="Avg Review Time"
          value={`${kpis.avgReviewDays}d`}
          subtitle="Target: <7 days"
          icon={TrendingUp}
          color="success"
        />
      </div>

      {/* Filters Panel */}
      <Card title="Filters" padding="default">
        <div className="grid grid-cols-6 gap-4 mb-4">
          {/* Region Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
            <select
              value={filters.region}
              onChange={(e) => handleFilterChange('region', e.target.value)}
              className="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            >
              {regions.map(region => (
                <option key={region} value={region}>
                  {region === 'all' ? 'All Regions' : region}
                </option>
              ))}
            </select>
          </div>

          {/* City Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <select
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              className="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            >
              {cities.map(city => (
                <option key={city} value={city}>
                  {city === 'all' ? 'All Cities' : city}
                </option>
              ))}
            </select>
          </div>

          {/* Level Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">School Level</label>
            <select
              value={filters.level}
              onChange={(e) => handleFilterChange('level', e.target.value)}
              className="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            >
              {levels.map(level => (
                <option key={level} value={level}>
                  {level === 'all' ? 'All Levels' : level}
                </option>
              ))}
            </select>
          </div>

          {/* Gender Model Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender Model</label>
            <select
              value={filters.gender_model}
              onChange={(e) => handleFilterChange('gender_model', e.target.value)}
              className="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            >
              {genderModels.map(model => (
                <option key={model} value={model}>
                  {model === 'all' ? 'All Models' : model}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {getStatusLabel(status)}
                </option>
              ))}
            </select>
          </div>

          {/* Assigned Reviewer Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Reviewer</label>
            <select
              value={filters.assignedReviewer}
              onChange={(e) => handleFilterChange('assignedReviewer', e.target.value)}
              className="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Reviewers</option>
              <option value="unassigned">Unassigned</option>
              <option value="user003">Ahmed Al-Rashid</option>
              <option value="user004">Sarah Al-Qahtani</option>
            </select>
          </div>
        </div>

        {/* Filter Actions */}
        <div className="flex justify-end">
          <Button variant="outline" onClick={handleClearFilters}>
            Clear All Filters
          </Button>
        </div>
      </Card>

      {/* Actions Bar */}
      <Card padding="default">
        <div className="flex items-center justify-between gap-4">
          {/* Left side - Selection actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleExportToExcel}
              icon={<Download className="w-4 h-4" />}
            >
              Export to Excel
            </Button>
            <Button
              variant="primary"
              onClick={handleDownloadEvidencePackage}
              disabled={selectedRequests.length === 0}
              icon={<FileText className="w-4 h-4" />}
            >
              Download Evidence Package ({selectedRequests.length})
            </Button>
            {selectedRequests.length > 0 && (
              <span className="text-sm text-gray-600">
                {selectedRequests.length} selected
              </span>
            )}
          </div>

          {/* Right side - Search and Create */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by School Name or Request ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 w-80"
              />
            </div>
            <Button
              variant="primary"
              onClick={() => setIsCreateModalOpen(true)}
              icon={<Plus className="w-4 h-4" />}
            >
              Create New Request
            </Button>
          </div>
        </div>
      </Card>

      {/* Evaluations Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRequests.length === paginatedEvaluations.length && paginatedEvaluations.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Request ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">School Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Region</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned Reviewer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SLA</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedEvaluations.map((evaluation) => {
                const isSelected = selectedRequests.includes(evaluation.id);
                const deadline = new Date(evaluation.deadline);
                const now = new Date();
                const daysRemaining = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));

                return (
                  <tr key={evaluation.id} className={`hover:bg-gray-50 ${isSelected ? 'bg-primary-50' : ''}`}>
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => handleSelectRequest(evaluation.id, e.target.checked)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-primary-600">{evaluation.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{evaluation.school_name}</div>
                      <div className="text-xs text-gray-500">{evaluation.city}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{evaluation.region}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{evaluation.level}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {evaluation.assigned_reviewer ? (
                        <span className="text-sm font-medium text-gray-900">
                          {evaluation.assigned_reviewer === 'user003' ? 'Ahmed Al-Rashid' : 'Sarah Al-Qahtani'}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500 italic">Unassigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(evaluation.status, evaluation.version)}
                      {evaluation.version && (
                        <div className="text-xs text-gray-500 mt-1">
                          v{evaluation.version.current}/{evaluation.version.max}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${
                        daysRemaining < 0 ? 'text-danger-600' :
                        daysRemaining <= 2 ? 'text-danger-600' :
                        daysRemaining <= 5 ? 'text-warning-600' :
                        'text-success-600'
                      }`}>
                        {daysRemaining < 0 ? `${Math.abs(daysRemaining)}d overdue` : `${daysRemaining}d remaining`}
                      </div>
                      <div className="text-xs text-gray-500">{evaluation.deadline}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <ActionDropdownMenu
                        evaluation={evaluation}
                        onAction={handleDropdownAction}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filteredEvaluations.length)} of {filteredEvaluations.length} requests
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              icon={<ChevronLeft className="w-4 h-4" />}
            >
              Previous
            </Button>
            {[...Array(totalPages)].map((_, idx) => {
              const pageNum = idx + 1;
              // Show first page, last page, current page, and pages around current
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 rounded ${
                      currentPage === pageNum
                        ? 'bg-primary-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                return <span key={pageNum} className="px-2">...</span>;
              }
              return null;
            })}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              icon={<ChevronRight className="w-4 h-4" />}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>

      {/* Create Request Modal */}
      <CreateRequestModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        schools={mockSchools}
        evaluations={evaluations}
        onCreateRequests={handleCreateRequests}
      />
    </div>
  );
};

export default EvaluationRequestsTable;
