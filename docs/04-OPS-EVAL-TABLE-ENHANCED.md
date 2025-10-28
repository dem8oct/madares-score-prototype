# Document 04: Evaluation Requests Table (Ops View) - ENHANCED
## For AI Coding Agents

**Build Order:** 4th  
**Dependencies:** Documents 01-03  
**Estimated Complexity:** High

---

## Overview

Build the comprehensive Operations Reviewer dashboard with advanced features including multi-select, bulk actions, assigned reviewers, dropdown menus, pagination, and a complete 4-step request creation flow with duplicate prevention.

**Component:** `src/pages/OpsReviewer/EvaluationRequestsTable.jsx`  
**Additional Components:**
- `CreateRequestModal.jsx` - 4-step request creation wizard
- `ActionDropdownMenu.jsx` - Per-row actions

---

## New Features in This Version

### ✅ Actions Bar (Below Filters)
- Export to Excel button
- Download Evidence Package (enabled when rows selected)
- Search box for School Name or Request ID
- Create New Request button

### ✅ Multi-Select Functionality
- Checkbox column for selecting multiple rows
- Bulk actions enabled when rows selected
- Select all / Deselect all functionality

### ✅ Assigned Reviewer Column
- Shows reviewer name or "Unassigned"
- Sortable and filterable
- Color-coded status

### ✅ Actions Dropdown Menu (⋮)
Per row, includes:
- Open Review (primary)
- Assign to Me
- View History
- Download Evidence
- Add Internal Note

### ✅ Pagination
- Bottom of table shows: "Showing 1–20 of 156 requests"
- Page navigation: < 1 2 3 ... 8 >
- Configurable items per page

### ✅ Create New Request Flow (4-Step Modal)
**Step 1:** Select schools using filter panel  
**Step 2:** Review selected schools (system highlights conflicts)  
**Step 3:** Set evaluation deadline  
**Step 4:** Confirm and create

**Critical Rule:** Blocks creation if school has active request (status ≠ Approved/Published/Archived)

---

## UI Layout

```
┌──────────────────────────────────────────────────────────────┐
│ KPI CARDS (Top Row)                                           │
│ [Total] [In Progress] [Under Review] [SLA Breach] [Avg Time] │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ FILTERS PANEL                                                 │
│ [Region▼] [City▼] [Level▼] [Gender▼] [Status▼] [Reviewer▼] │
│                                             [Clear Filters]   │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ ACTIONS BAR                                                   │
│ [Export Excel] [Download Evidence (3)] | [Search...] [Create]│
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ TABLE                                                         │
│ [☐] | ID | School | Region | Level | Reviewer | Status | ⋮  │
│ [☐] REQ-001 | Riyadh Intl | RUH | Sec | Ahmed | Review | ⋮  │
│ [☑] REQ-002 | Al-Noor | RUH | Pri | Unassigned | Submit | ⋮ │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ PAGINATION                                                    │
│ Showing 1–20 of 156 requests     [◀] 1 2 3 ... 8 [▶]        │
└──────────────────────────────────────────────────────────────┘
```

---

## Complete Implementation

```jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvaluation } from '../../context/EvaluationContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import CreateRequestModal from '../../components/ops/CreateRequestModal';
import ActionDropdownMenu from '../../components/ops/ActionDropdownMenu';
import { 
  Search, Download, FileText, Clock, AlertCircle, TrendingUp,
  ChevronLeft, ChevronRight, Plus, MoreVertical, Check
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
  const { evaluations, updateEvaluation } = useEvaluation();
  const { currentUser } = useAuth();
  const { success, error } = useToast();

  // State
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  // Filters
  const [filters, setFilters] = useState({
    region: 'all',
    city: 'all',
    level: 'all',
    gender: 'all',
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

  // Filter and search evaluations
  const filteredEvaluations = useMemo(() => {
    return evaluations.filter(evaluation => {
      // Apply filters
      if (filters.region !== 'all' && evaluation.school.region !== filters.region) return false;
      if (filters.city !== 'all' && evaluation.school.city !== filters.city) return false;
      if (filters.level !== 'all' && evaluation.school.level !== filters.level) return false;
      if (filters.gender !== 'all' && evaluation.school.gender !== filters.gender) return false;
      if (filters.status !== 'all' && evaluation.status !== filters.status) return false;
      
      // Assigned reviewer filter
      if (filters.assignedReviewer !== 'all') {
        if (filters.assignedReviewer === 'unassigned' && evaluation.assigned_reviewer) return false;
        if (filters.assignedReviewer !== 'unassigned' && evaluation.assigned_reviewer !== filters.assignedReviewer) return false;
      }
      
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const schoolName = evaluation.school.name.toLowerCase();
        const requestId = evaluation.request_id.toLowerCase();
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
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRequests(paginatedEvaluations.map(e => e.request_id));
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
      gender: 'all',
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

  const handleAssignToMe = (requestId) => {
    updateEvaluation(requestId, { assigned_reviewer: currentUser.id });
    success('Request assigned to you');
  };

  const handleViewHistory = (requestId) => {
    navigate(`/ops/evaluation/${requestId}/history`);
  };

  const handleDownloadEvidence = (requestId) => {
    success(`Downloading evidence for ${requestId}... (Demo)`);
  };

  const handleAddNote = (requestId) => {
    // Open note modal
    success('Note modal opened (Demo)');
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      in_progress: { variant: 'warning', label: 'In Progress' },
      submitted: { variant: 'primary', label: 'Submitted' },
      under_review: { variant: 'primary', label: 'Under Review' },
      returned: { variant: 'warning', label: 'Returned' },
      approved: { variant: 'success', label: 'Approved' },
      published: { variant: 'success', label: 'Published' },
    };
    const config = statusConfig[status] || { variant: 'default', label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getReviewerDisplay = (assignedReviewer) => {
    if (!assignedReviewer) {
      return <span className="text-sm text-gray-500 italic">Unassigned</span>;
    }
    // Mock reviewer names
    const reviewers = {
      user003: 'Ahmed Al-Rashid',
      user004: 'Sarah Al-Qahtani',
    };
    return <span className="text-sm font-medium text-gray-900">{reviewers[assignedReviewer] || assignedReviewer}</span>;
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
        <div className="grid grid-cols-6 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
            <select
              value={filters.region}
              onChange={(e) => setFilters({...filters, region: e.target.value})}
              className="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Regions</option>
              <option value="Riyadh">Riyadh</option>
              <option value="Jeddah">Jeddah</option>
              <option value="Dammam">Dammam</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <select
              value={filters.city}
              onChange={(e) => setFilters({...filters, city: e.target.value})}
              className="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Cities</option>
              <option value="Riyadh">Riyadh</option>
              <option value="Jeddah">Jeddah</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
            <select
              value={filters.level}
              onChange={(e) => setFilters({...filters, level: e.target.value})}
              className="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Levels</option>
              <option value="Elementary">Elementary</option>
              <option value="Middle">Middle</option>
              <option value="High">High School</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              value={filters.gender}
              onChange={(e) => setFilters({...filters, gender: e.target.value})}
              className="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All</option>
              <option value="Boys">Boys</option>
              <option value="Girls">Girls</option>
              <option value="Mixed">Mixed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Statuses</option>
              <option value="in_progress">In Progress</option>
              <option value="submitted">Submitted</option>
              <option value="under_review">Under Review</option>
              <option value="returned">Returned</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Reviewer</label>
            <select
              value={filters.assignedReviewer}
              onChange={(e) => setFilters({...filters, assignedReviewer: e.target.value})}
              className="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Reviewers</option>
              <option value="unassigned">Unassigned</option>
              <option value="user003">Ahmed Al-Rashid</option>
              <option value="user004">Sarah Al-Qahtani</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
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
              onClick={() => setShowCreateModal(true)}
              icon={<Plus className="w-4 h-4" />}
            >
              Create New Request
            </Button>
          </div>
        </div>
      </Card>

      {/* Requests Table */}
      <Card title={`Evaluation Requests (${filteredEvaluations.length})`} padding="none">
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
                const isSelected = selectedRequests.includes(evaluation.request_id);
                const deadline = new Date(evaluation.deadline);
                const now = new Date();
                const daysRemaining = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));

                return (
                  <tr key={evaluation.request_id} className={`hover:bg-gray-50 ${isSelected ? 'bg-primary-50' : ''}`}>
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => handleSelectRequest(evaluation.request_id, e.target.checked)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-primary-600">{evaluation.request_id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{evaluation.school.name}</div>
                      <div className="text-xs text-gray-500">{evaluation.school.city}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{evaluation.school.region}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{evaluation.school.level}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getReviewerDisplay(evaluation.assigned_reviewer)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(evaluation.status)}
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
                        requestId={evaluation.request_id}
                        onOpenReview={() => navigate(`/ops/evaluation/${evaluation.request_id}`)}
                        onAssignToMe={() => handleAssignToMe(evaluation.request_id)}
                        onViewHistory={() => handleViewHistory(evaluation.request_id)}
                        onDownloadEvidence={() => handleDownloadEvidence(evaluation.request_id)}
                        onAddNote={() => handleAddNote(evaluation.request_id)}
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

      {/* Create New Request Modal */}
      {showCreateModal && (
        <CreateRequestModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            success('Evaluation requests created successfully');
          }}
        />
      )}
    </div>
  );
};

export default EvaluationRequestsTable;
```

---

## Action Dropdown Menu Component

**File:** `src/components/ops/ActionDropdownMenu.jsx`

```jsx
import React, { useState, useRef, useEffect } from 'react';
import { 
  MoreVertical, Eye, UserPlus, History, Download, MessageSquare
} from 'lucide-react';

const ActionDropdownMenu = ({ 
  requestId, 
  onOpenReview,
  onAssignToMe,
  onViewHistory,
  onDownloadEvidence,
  onAddNote
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const menuItems = [
    { 
      label: 'Open Review', 
      icon: Eye, 
      onClick: onOpenReview,
      className: 'text-primary-600 font-medium'
    },
    { 
      label: 'Assign to Me', 
      icon: UserPlus, 
      onClick: onAssignToMe
    },
    { 
      label: 'View History', 
      icon: History, 
      onClick: onViewHistory
    },
    { 
      label: 'Download Evidence', 
      icon: Download, 
      onClick: onDownloadEvidence
    },
    { 
      label: 'Add Internal Note', 
      icon: MessageSquare, 
      onClick: onAddNote
    },
  ];

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <MoreVertical className="w-5 h-5 text-gray-600" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left text-sm flex items-center gap-3 hover:bg-gray-50 transition-colors ${item.className || 'text-gray-700'}`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ActionDropdownMenu;
```

---

## Create Request Modal (4-Step Wizard)

**File:** `src/components/ops/CreateRequestModal.jsx`

```jsx
import React, { useState, useMemo } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { mockSchools } from '../../data/mockData';
import { useEvaluation } from '../../context/EvaluationContext';
import { AlertTriangle, CheckCircle, XCircle, Calendar, ChevronRight, ChevronLeft } from 'lucide-react';

const CreateRequestModal = ({ onClose, onSuccess }) => {
  const { evaluations, createEvaluationRequest } = useEvaluation();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Step 1: School selection filters
  const [filters, setFilters] = useState({
    region: 'all',
    city: 'all',
    level: 'all',
    gender: 'all',
  });
  
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [evaluationDeadline, setEvaluationDeadline] = useState('');

  // Filter available schools
  const availableSchools = useMemo(() => {
    return mockSchools.filter(school => {
      if (filters.region !== 'all' && school.region !== filters.region) return false;
      if (filters.city !== 'all' && school.city !== filters.city) return false;
      if (filters.level !== 'all' && school.level !== filters.level) return false;
      if (filters.gender !== 'all' && school.gender !== filters.gender) return false;
      return true;
    });
  }, [filters]);

  // Check if school has active request
  const getSchoolStatus = (schoolId) => {
    const activeRequest = evaluations.find(
      e => e.school_id === schoolId && 
      !['approved', 'published', 'archived'].includes(e.status)
    );
    
    if (activeRequest) {
      return {
        hasActive: true,
        request: activeRequest,
        canCreate: false
      };
    }
    
    return { hasActive: false, canCreate: true };
  };

  // Review selected schools with conflicts
  const schoolsReview = useMemo(() => {
    return selectedSchools.map(schoolId => {
      const school = mockSchools.find(s => s.id === schoolId);
      const status = getSchoolStatus(schoolId);
      return { school, status };
    });
  }, [selectedSchools, evaluations]);

  const validSchools = schoolsReview.filter(sr => sr.status.canCreate);
  const blockedSchools = schoolsReview.filter(sr => !sr.status.canCreate);

  // Handlers
  const handleSelectSchool = (schoolId, checked) => {
    if (checked) {
      setSelectedSchools([...selectedSchools, schoolId]);
    } else {
      setSelectedSchools(selectedSchools.filter(id => id !== schoolId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedSchools(availableSchools.map(s => s.id));
    } else {
      setSelectedSchools([]);
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && selectedSchools.length === 0) {
      alert('Please select at least one school');
      return;
    }
    if (currentStep === 3 && !evaluationDeadline) {
      alert('Please set an evaluation deadline');
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleCreate = () => {
    // Create requests for valid schools only
    validSchools.forEach(({ school }) => {
      createEvaluationRequest({
        school_id: school.id,
        deadline: evaluationDeadline,
        status: 'in_progress',
      });
    });
    
    onSuccess();
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Create New Evaluation Request"
      size="xl"
    >
      <div className="space-y-6">
        {/* Progress Indicator */}
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((step) => (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                <span className="text-xs mt-2 text-gray-600">
                  {step === 1 ? 'Select Schools' : 
                   step === 2 ? 'Review' :
                   step === 3 ? 'Set Deadline' :
                   'Confirm'}
                </span>
              </div>
              {step < 4 && (
                <div className={`flex-1 h-1 mx-2 ${
                  currentStep > step ? 'bg-primary-600' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step 1: Select Schools */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Select Schools</h3>
            
            {/* Filters */}
            <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                <select
                  value={filters.region}
                  onChange={(e) => setFilters({...filters, region: e.target.value})}
                  className="w-full border-gray-300 rounded-lg text-sm"
                >
                  <option value="all">All Regions</option>
                  <option value="Riyadh">Riyadh</option>
                  <option value="Jeddah">Jeddah</option>
                  <option value="Dammam">Dammam</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <select
                  value={filters.city}
                  onChange={(e) => setFilters({...filters, city: e.target.value})}
                  className="w-full border-gray-300 rounded-lg text-sm"
                >
                  <option value="all">All Cities</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                <select
                  value={filters.level}
                  onChange={(e) => setFilters({...filters, level: e.target.value})}
                  className="w-full border-gray-300 rounded-lg text-sm"
                >
                  <option value="all">All Levels</option>
                  <option value="Elementary">Elementary</option>
                  <option value="Middle">Middle</option>
                  <option value="High">High School</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  value={filters.gender}
                  onChange={(e) => setFilters({...filters, gender: e.target.value})}
                  className="w-full border-gray-300 rounded-lg text-sm"
                >
                  <option value="all">All</option>
                  <option value="Boys">Boys</option>
                  <option value="Girls">Girls</option>
                  <option value="Mixed">Mixed</option>
                </select>
              </div>
            </div>

            {/* Schools List */}
            <div className="border border-gray-200 rounded-lg max-h-96 overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedSchools.length === availableSchools.length && availableSchools.length > 0}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">School Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Region</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {availableSchools.map((school) => (
                    <tr key={school.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedSchools.includes(school.id)}
                          onChange={(e) => handleSelectSchool(school.id, e.target.checked)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-3 text-sm font-medium text-gray-900">{school.name}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{school.region}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{school.level}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <p className="text-sm text-gray-600">
              {selectedSchools.length} school(s) selected
            </p>
          </div>
        )}

        {/* Step 2: Review Selected Schools */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Review Selected Schools</h3>
            
            {validSchools.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-success-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Ready to Create ({validSchools.length})
                </h4>
                <div className="border border-success-200 rounded-lg bg-success-50 p-4 space-y-2">
                  {validSchools.map(({ school }) => (
                    <div key={school.id} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{school.name}</span>
                      <Badge variant="success" size="sm">Can Create</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {blockedSchools.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-danger-900 mb-2 flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  Cannot Create ({blockedSchools.length})
                </h4>
                <div className="border border-danger-200 rounded-lg bg-danger-50 p-4 space-y-3">
                  {blockedSchools.map(({ school, status }) => (
                    <div key={school.id} className="p-3 bg-white rounded border border-danger-200">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">{school.name}</span>
                        <Badge variant="danger" size="sm">Blocked</Badge>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-danger-600 flex-shrink-0 mt-0.5" />
                        <div className="text-xs text-danger-800">
                          <p className="font-medium">Cannot create – Active request exists</p>
                          <p className="mt-1">
                            Request {status.request.request_id}, Status: {status.request.status}
                            {status.request.version && ` (v${status.request.version.current}/${status.request.version.max})`}
                          </p>
                          <p className="mt-1">Please close or archive the existing request first.</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {validSchools.length === 0 && (
              <div className="p-6 bg-gray-50 rounded-lg text-center">
                <XCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  All selected schools have active requests. Please go back and select different schools.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Set Deadline */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Set Evaluation Deadline</h3>
            <div className="p-6 bg-gray-50 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Evaluation Deadline *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={evaluationDeadline}
                  onChange={(e) => setEvaluationDeadline(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Schools will have until this date to complete their evaluation submissions.
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Confirm */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Confirm Creation</h3>
            <div className="p-6 bg-primary-50 border border-primary-200 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Schools to Process:</p>
                  <p className="text-2xl font-bold text-gray-900">{validSchools.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Deadline:</p>
                  <p className="text-lg font-semibold text-gray-900">{evaluationDeadline}</p>
                </div>
              </div>
              {blockedSchools.length > 0 && (
                <div className="mt-4 pt-4 border-t border-primary-200">
                  <p className="text-sm text-warning-800">
                    ⚠️ {blockedSchools.length} school(s) will be skipped due to active requests
                  </p>
                </div>
              )}
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                The system will create <strong>{validSchools.length}</strong> new evaluation request(s). 
                Each school will receive a notification and can begin their evaluation process immediately.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={currentStep === 1 ? onClose : handleBack}
            icon={currentStep > 1 ? <ChevronLeft className="w-4 h-4" /> : null}
          >
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </Button>
          
          {currentStep < 4 ? (
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={currentStep === 2 && validSchools.length === 0}
              icon={<ChevronRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Next
            </Button>
          ) : (
            <Button
              variant="success"
              onClick={handleCreate}
              icon={<CheckCircle className="w-4 h-4" />}
            >
              Create {validSchools.length} Request(s)
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CreateRequestModal;
```

---

## Testing Checklist

### Actions Bar
- [ ] Export to Excel button works
- [ ] Download Evidence Package disabled when no selection
- [ ] Download Evidence Package enabled and shows count when rows selected
- [ ] Search box filters by school name
- [ ] Search box filters by request ID
- [ ] Create New Request button opens modal

### Multi-Select
- [ ] Checkbox in header selects/deselects all visible rows
- [ ] Individual row checkboxes work
- [ ] Selected rows highlight
- [ ] Selection count updates
- [ ] Selection persists when changing pages

### Assigned Reviewer
- [ ] Column shows reviewer name or "Unassigned"
- [ ] Filter by assigned reviewer works
- [ ] Filter includes "Unassigned" option
- [ ] "Assign to Me" action updates reviewer

### Actions Dropdown
- [ ] Dropdown opens on click
- [ ] Dropdown closes on outside click
- [ ] "Open Review" navigates correctly
- [ ] "Assign to Me" updates assignment
- [ ] "View History" navigates correctly
- [ ] "Download Evidence" triggers download
- [ ] "Add Internal Note" opens note modal

### Pagination
- [ ] Shows correct record range
- [ ] Shows correct total count
- [ ] Previous button disabled on first page
- [ ] Next button disabled on last page
- [ ] Page numbers clickable
- [ ] Ellipsis shows when many pages
- [ ] Current page highlighted

### Create Request Flow - Step 1
- [ ] Filters work correctly
- [ ] Schools list filters dynamically
- [ ] Select all checkbox works
- [ ] Individual checkboxes work
- [ ] Selection count updates
- [ ] Cannot proceed without selecting schools

### Create Request Flow - Step 2
- [ ] Valid schools shown in green section
- [ ] Blocked schools shown in red section
- [ ] Warning messages display for blocked schools
- [ ] Shows request ID and status for conflicts
- [ ] Cannot proceed if all schools blocked

### Create Request Flow - Step 3
- [ ] Date picker works
- [ ] Cannot select past dates
- [ ] Cannot proceed without selecting date

### Create Request Flow - Step 4
- [ ] Summary shows correct counts
- [ ] Shows deadline correctly
- [ ] Shows warning if schools blocked
- [ ] Create button creates requests
- [ ] Modal closes on success
- [ ] Success message displays

### Critical Rule Enforcement
- [ ] System detects active requests correctly
- [ ] Blocks schools with status: in_progress, submitted, under_review, returned
- [ ] Allows schools with status: approved, published, archived
- [ ] Shows clear error messages
- [ ] Does not create duplicate requests

---

## Next Steps

After completing this document:
1. ✅ Test all new features independently
2. ✅ Verify multi-select works across pages
3. ✅ Test Create Request flow end-to-end
4. ✅ Verify conflict detection
5. ✅ Move to Document 06 for Committee enhancements
