# Document 04: Evaluation Requests Table (Ops View)
## For AI Coding Agents

**Build Order:** 4th  
**Dependencies:** Documents 01-03  
**Estimated Complexity:** Medium

---

## Overview

Build the main dashboard for Operations Reviewers to filter, view, and open evaluation requests. This is the central hub for reviewing school submissions.

**Component:** `src/pages/OpsReviewer/EvaluationRequestsTable.jsx`

---

## UI Layout

```
┌──────────────────────────────────────────────────────────────┐
│ FILTERS PANEL                                                 │
│ [Region ▼] [City ▼] [Level ▼] [Gender ▼] [Status ▼]        │
│                                          [Clear] [Search]     │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ EVALUATION REQUESTS TABLE                                     │
│                                                               │
│ Request ID | School Name | Region | City | Level | Status   │
│            |             |        |      |       | SLA       │
│            |             |        |      |       | Actions   │
│─────────────────────────────────────────────────────────────│
│ REQ-001   | Riyadh Intl | Riyadh | RUH  | Sec  | In Prog   │
│           |             |        |      |      | 12 days   │
│           |             |        |      |      | [Actions▼]│
│─────────────────────────────────────────────────────────────│
│ REQ-002   | Al-Noor     | Riyadh | RUH  | Pri  | Returned  │
│           | Academy     |        |      |      | (2/4)     │
│           |             |        |      |      | 5 days ⚠️  │
│           |             |        |      |      | [Actions▼]│
└──────────────────────────────────────────────────────────────┘

[◀ Previous] Page 1 of 5 [Next ▶]
```

---

## Implementation

```jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvaluation } from '../../context/EvaluationContext';
import { useLanguage } from '../../context/LanguageContext';
import { filterEvaluations, getSLAColor, getDaysRemainingText } from '../../data/mockData';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { Search, Filter, X, ExternalLink } from 'lucide-react';

const EvaluationRequestsTable = () => {
  const navigate = useNavigate();
  const { evaluations } = useEvaluation();
  const { t, language } = useLanguage();

  // Filter state
  const [filters, setFilters] = useState({
    region: 'all',
    city: 'all',
    level: 'all',
    gender_model: 'all',
    status: 'all',
  });

  // Sorting state
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  // Apply filters
  const filteredEvaluations = useMemo(() => {
    return filterEvaluations(evaluations, filters);
  }, [evaluations, filters]);

  // Apply sorting
  const sortedEvaluations = useMemo(() => {
    if (!sortConfig.key) return filteredEvaluations;

    return [...filteredEvaluations].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredEvaluations, sortConfig]);

  // Paginate
  const totalPages = Math.ceil(sortedEvaluations.length / itemsPerPage);
  const paginatedEvaluations = sortedEvaluations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page
  };

  const handleClearFilters = () => {
    setFilters({
      region: 'all',
      city: 'all',
      level: 'all',
      gender_model: 'all',
      status: 'all',
    });
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleOpenReview = (evalId) => {
    navigate(`/ops/evaluation/${evalId}`);
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Evaluation Requests</h1>
        <p className="text-gray-600 mt-1">Review and manage school evaluation submissions</p>
      </div>

      {/* Filters Panel */}
      <Card title="Filters" padding="default">
        <div className="grid grid-cols-5 gap-4 mb-4">
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
                  {status === 'all' ? 'All Statuses' : t(`evaluation.status.${status}`)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Actions */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing {paginatedEvaluations.length} of {sortedEvaluations.length} evaluations
          </p>
          <Button variant="ghost" size="sm" onClick={handleClearFilters} icon={<X className="w-4 h-4" />}>
            Clear Filters
          </Button>
        </div>
      </Card>

      {/* Evaluations Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  onClick={() => handleSort('id')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  Request ID
                </th>
                <th 
                  onClick={() => handleSort('school_name')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  School Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Region / City
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Level
                </th>
                <th 
                  onClick={() => handleSort('status')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  Status
                </th>
                <th 
                  onClick={() => handleSort('deadline')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  Deadline / SLA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedEvaluations.map((evaluation) => {
                const slaColor = getSLAColor(evaluation.deadline);
                const daysText = getDaysRemainingText(evaluation.deadline);

                return (
                  <tr 
                    key={evaluation.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleOpenReview(evaluation.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-primary-600">{evaluation.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{evaluation.school_name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{evaluation.region}</div>
                      <div className="text-xs text-gray-500">{evaluation.city}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{evaluation.level}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(evaluation.status, evaluation.version)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium text-${slaColor}-600`}>
                        {daysText}
                      </div>
                      <div className="text-xs text-gray-500">{evaluation.deadline}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenReview(evaluation.id);
                        }}
                        icon={<ExternalLink className="w-4 h-4" />}
                      >
                        Open Review
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default EvaluationRequestsTable;
```

---

## Business Rules Enforcement

### 1. One Active Request Per School

**Location:** When creating new request (not in this view, but validate in context)

```javascript
// In EvaluationContext.jsx
const canCreateRequest = (schoolId) => {
  const activeStatuses = ['in_progress', 'submitted', 'under_review', 'returned_for_correction', 'pending_committee'];
  const existingActive = evaluations.find(
    e => e.school_id === schoolId && activeStatuses.includes(e.status)
  );
  return !existingActive;
};
```

### 2. Status Display with Correction Count

Shows version when status is "returned_for_correction":
- `returned_for_correction` + version `2/4` → Badge shows "Returned (2/4)"

---

## Testing Checklist

- [ ] Filters update table results correctly
- [ ] "All" option in each filter works
- [ ] Clear Filters button resets all filters
- [ ] Sorting works for Request ID, School Name, Status, Deadline
- [ ] Pagination shows correct items per page
- [ ] SLA colors match deadline urgency (green/yellow/red)
- [ ] Status badges show correct colors
- [ ] Clicking row opens evaluation review page
- [ ] "Open Review" button navigates correctly
- [ ] No duplicate active requests for same school (validate in data)

---

## Next Steps

After completing this document:
1. ✅ Test all filters and sorting
2. ✅ Verify navigation to review page
3. ✅ Move to Document 05: Current Evaluation - School Admin View
