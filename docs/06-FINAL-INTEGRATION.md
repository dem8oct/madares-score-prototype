# Document 06: Committee Dashboard - ENHANCED
## For AI Coding Agents

**Build Order:** 6th  
**Dependencies:** Documents 01-05  
**Estimated Complexity:** High

---

## Overview

Build the comprehensive Committee Dashboard with enhanced indicator management including disable/enable functionality, approval workflow, formula editing, and a complete pending changes review tab.

**Component:** `src/pages/Committee/Dashboard.jsx`  
**Additional Components:**
- `ProposeIndicatorModal.jsx` - Enhanced with formula, type, and score type fields
- `PendingChangesTab.jsx` - Complete approval workflow interface
- `ImpactPreviewModal.jsx` - Shows change impact analysis

---

## New Features in This Version

### ✅ Enhanced Indicator Matrix Table Actions
- **Disable** - Opens confirmation modal, then grays out row
- **Approve/Reject** - For pending indicators

### ✅ Enhanced "Propose New Indicator" Form
New fields:
- **Formula** - Textarea for calculation formula
- **Type** - Radio buttons: Manual (M) / Automatic (A)
- **Score Type** - Radio buttons: Binary (B) / Numeric (N) / Gradual (G)

### ✅ New Pending Changes Tab
Complete workflow system showing:
- List of proposed changes in cards
- Change type, proposer, rationale
- Action buttons: Approve, Reject, Request Info
- Impact preview link (opens modal with chart)

---

## UI Layout

```
┌──────────────────────────────────────────────────────────────┐
│ KPI CARDS (Top Row)                                           │
│ [Total Indicators] [Active] [Pending] [Avg Weight] [Updated] │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ TABS: [Indicators Matrix] [Pending Changes] 🆕               │
└──────────────────────────────────────────────────────────────┘

// INDICATORS MATRIX TAB
┌──────────────────────────────────────────────────────────────┐
│ Domain | Indicator | Weight | Type | Score | Status | Actions│
│ Safety | Fire Ext  |   3    |  M   |   B   | Active | ⚙️▼   │
│        |           |        |      |       |        | Disable│
│        |           |        |      |       |        | Edit   │
└──────────────────────────────────────────────────────────────┘

// PENDING CHANGES TAB 🆕
┌──────────────────────────────────────────────────────────────┐
│ ┌────────────────────────────────────────────────────────┐   │
│ │ CHANGE CARD                                             │   │
│ │ Type: New Indicator                                     │   │
│ │ Proposer: Ahmed Al-Rashid                              │   │
│ │ Rationale: Align with new safety standards            │   │
│ │                                                         │   │
│ │ [Approve] [Reject] [Request Info] [Preview Impact]    │   │
│ └────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

---

## Complete Implementation

```jsx
import React, { useState, useMemo } from 'react';
import { mockIndicators, mockDomains } from '../../data/mockData';
import { useToast } from '../../context/ToastContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import ProposeIndicatorModal from '../../components/committee/ProposeIndicatorModal';
import PendingChangesTab from '../../components/committee/PendingChangesTab';
import { 
  Target, CheckCircle, Clock, TrendingUp, Activity,
  Settings, Edit, XCircle, Check, AlertTriangle
} from 'lucide-react';

// KPI Card Component
const CommitteeKPICard = ({ title, value, subtitle, icon: Icon, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-600',
    success: 'bg-success-50 text-success-600',
    warning: 'bg-warning-50 text-warning-600',
    danger: 'bg-danger-50 text-danger-600',
    gray: 'bg-gray-100 text-gray-600',
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

const CommitteeDashboard = () => {
  const { success, error } = useToast();
  
  // State
  const [indicators, setIndicators] = useState(mockIndicators);
  const [domains, setDomains] = useState(mockDomains);
  const [activeTab, setActiveTab] = useState('indicators'); // 'indicators' or 'pending'
  const [showProposeModal, setShowProposeModal] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [selectedIndicator, setSelectedIndicator] = useState(null);

  // Mock pending changes data
  const [pendingChanges] = useState([
    {
      id: 'CHG-001',
      type: 'new_indicator',
      proposer: 'Ahmed Al-Rashid',
      proposer_role: 'Senior Evaluator',
      date: '2025-10-25',
      indicator: {
        name: 'Emergency Response Time',
        name_ar: 'وقت الاستجابة للطوارئ',
        domain: 'Safety & Security',
        weight: 3,
        type: 'A', // Automatic
        score_type: 'N', // Numeric
        formula: '(Total_Drills_Completed / Total_Drills_Scheduled) * 100',
      },
      rationale: 'Recent safety audits indicate this is a critical gap in our current evaluation framework. Adding this indicator will help ensure schools maintain adequate emergency preparedness.',
      impact: {
        affected_schools: 156,
        estimated_score_change: -2.5,
      },
      status: 'pending',
    },
    {
      id: 'CHG-002',
      type: 'weight_change',
      proposer: 'Sarah Al-Qahtani',
      proposer_role: 'Committee Member',
      date: '2025-10-23',
      indicator: {
        id: 'IND-001',
        name: 'Teacher Qualification Rate',
        current_weight: 4,
        proposed_weight: 5,
      },
      rationale: 'Teacher quality is the most significant factor in student outcomes according to recent research. Increasing weight from 4 to 5 better reflects its importance.',
      impact: {
        affected_schools: 1234,
        estimated_score_change: +1.2,
      },
      status: 'pending',
    },
  ]);

  // Calculate KPIs
  const kpis = useMemo(() => {
    const totalIndicators = indicators.length;
    const activeIndicators = indicators.filter(i => i.status === 'active').length;
    const pendingIndicators = indicators.filter(i => i.status === 'pending_approval').length;
    const avgWeight = (indicators.reduce((sum, i) => sum + i.weight, 0) / indicators.length).toFixed(1);
    const lastUpdate = '2025-09-15';
    
    return { totalIndicators, activeIndicators, pendingIndicators, avgWeight, lastUpdate };
  }, [indicators]);

  // Handlers
  const handleDisableIndicator = (indicator) => {
    setSelectedIndicator(indicator);
    setShowDisableModal(true);
  };

  const confirmDisableIndicator = () => {
    setIndicators(indicators.map(ind => 
      ind.id === selectedIndicator.id 
        ? { ...ind, status: 'disabled' }
        : ind
    ));
    setShowDisableModal(false);
    success(`Indicator "${selectedIndicator.name}" has been disabled`);
  };

  const handleApproveIndicator = (indicatorId) => {
    setIndicators(indicators.map(ind => 
      ind.id === indicatorId 
        ? { ...ind, status: 'active' }
        : ind
    ));
    success('Indicator approved and activated');
  };

  const handleRejectIndicator = (indicatorId) => {
    setIndicators(indicators.map(ind => 
      ind.id === indicatorId 
        ? { ...ind, status: 'rejected' }
        : ind
    ));
    success('Indicator rejected');
  };

  const handleProposeNew = (data) => {
    const newIndicator = {
      id: `IND-${Date.now()}`,
      ...data,
      status: 'pending_approval',
      proposed_by: 'current_user',
      proposed_date: new Date().toISOString().split('T')[0],
    };
    setIndicators([...indicators, newIndicator]);
    setShowProposeModal(false);
    success('New indicator proposed successfully');
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { variant: 'success', label: 'Active' },
      disabled: { variant: 'default', label: 'Disabled' },
      pending_approval: { variant: 'warning', label: 'Pending Approval' },
      rejected: { variant: 'danger', label: 'Rejected' },
    };
    const config = statusConfig[status] || { variant: 'default', label: status };
    return <Badge variant={config.variant} size="sm">{config.label}</Badge>;
  };

  const getTypeBadge = (type) => {
    const typeConfig = {
      M: { label: 'Manual', color: 'bg-blue-100 text-blue-800' },
      A: { label: 'Automatic', color: 'bg-green-100 text-green-800' },
    };
    const config = typeConfig[type] || { label: type, color: 'bg-gray-100 text-gray-800' };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getScoreTypeBadge = (scoreType) => {
    const scoreTypeConfig = {
      B: { label: 'Binary', color: 'bg-purple-100 text-purple-800' },
      N: { label: 'Numeric', color: 'bg-yellow-100 text-yellow-800' },
      G: { label: 'Gradual', color: 'bg-indigo-100 text-indigo-800' },
    };
    const config = scoreTypeConfig[scoreType] || { label: scoreType, color: 'bg-gray-100 text-gray-800' };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Committee Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage indicators, weights, and evaluation criteria</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-5 gap-4">
        <CommitteeKPICard
          title="Total Indicators"
          value={kpis.totalIndicators}
          subtitle="Across all domains"
          icon={Target}
          color="primary"
        />
        <CommitteeKPICard
          title="Active Indicators"
          value={kpis.activeIndicators}
          subtitle="Currently in use"
          icon={CheckCircle}
          color="success"
        />
        <CommitteeKPICard
          title="Pending Changes"
          value={kpis.pendingIndicators + pendingChanges.length}
          subtitle="Require approval"
          icon={Clock}
          color="warning"
        />
        <CommitteeKPICard
          title="Avg Weight"
          value={kpis.avgWeight}
          subtitle="Out of 5"
          icon={TrendingUp}
          color="primary"
        />
        <CommitteeKPICard
          title="Last Updated"
          value={kpis.lastUpdate}
          subtitle="Model version"
          icon={Activity}
          color="gray"
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('indicators')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'indicators'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Indicators Matrix
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors relative ${
              activeTab === 'pending'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Pending Changes
            {pendingChanges.length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-warning-100 text-warning-800 text-xs font-semibold rounded-full">
                {pendingChanges.length}
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* Indicators Matrix Tab */}
      {activeTab === 'indicators' && (
        <div className="space-y-6">
          {/* Action Button */}
          <div className="flex justify-end">
            <Button
              variant="primary"
              onClick={() => setShowProposeModal(true)}
              icon={<Target className="w-4 h-4" />}
            >
              Propose New Indicator
            </Button>
          </div>

          {/* Indicators Table */}
          <Card title="Indicators Matrix" padding="none">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Domain</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Indicator</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Weight</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Score Type</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {indicators.map((indicator) => (
                    <tr 
                      key={indicator.id} 
                      className={`hover:bg-gray-50 ${indicator.status === 'disabled' ? 'opacity-50 bg-gray-100' : ''}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{indicator.domain}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{indicator.name}</div>
                        {indicator.formula && (
                          <div className="text-xs text-gray-500 mt-1 font-mono">{indicator.formula}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="text-sm font-semibold text-gray-900">{indicator.weight}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {getTypeBadge(indicator.type)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {getScoreTypeBadge(indicator.score_type)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {getStatusBadge(indicator.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          {indicator.status === 'active' && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => console.log('Edit', indicator.id)}
                                icon={<Edit className="w-3 h-3" />}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDisableIndicator(indicator)}
                                icon={<XCircle className="w-3 h-3" />}
                              >
                                Disable
                              </Button>
                            </>
                          )}
                          {indicator.status === 'pending_approval' && (
                            <>
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => handleApproveIndicator(indicator.id)}
                                icon={<Check className="w-3 h-3" />}
                              >
                                Approve
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleRejectIndicator(indicator.id)}
                                icon={<XCircle className="w-3 h-3" />}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          {indicator.status === 'disabled' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setIndicators(indicators.map(ind => 
                                  ind.id === indicator.id 
                                    ? { ...ind, status: 'active' }
                                    : ind
                                ));
                                success('Indicator re-enabled');
                              }}
                              icon={<CheckCircle className="w-3 h-3" />}
                            >
                              Enable
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Pending Changes Tab */}
      {activeTab === 'pending' && (
        <PendingChangesTab 
          pendingChanges={pendingChanges}
          onApprove={(changeId) => success(`Change ${changeId} approved`)}
          onReject={(changeId) => success(`Change ${changeId} rejected`)}
          onRequestInfo={(changeId) => success(`Information requested for ${changeId}`)}
        />
      )}

      {/* Propose Indicator Modal */}
      {showProposeModal && (
        <ProposeIndicatorModal
          onClose={() => setShowProposeModal(false)}
          onSubmit={handleProposeNew}
          domains={domains}
        />
      )}

      {/* Disable Confirmation Modal */}
      {showDisableModal && selectedIndicator && (
        <Modal
          isOpen={true}
          onClose={() => setShowDisableModal(false)}
          title="Disable Indicator"
          size="md"
        >
          <div className="space-y-4">
            <div className="p-4 bg-warning-50 border border-warning-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-warning-900 mb-1">
                    Are you sure you want to disable this indicator?
                  </p>
                  <p className="text-sm text-warning-800">
                    <strong>{selectedIndicator.name}</strong> will no longer be used in evaluations. 
                    This will affect all future and ongoing evaluations.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3">
              <Button variant="outline" onClick={() => setShowDisableModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDisableIndicator}>
                Disable Indicator
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CommitteeDashboard;
```

---

## Propose Indicator Modal (Enhanced)

**File:** `src/components/committee/ProposeIndicatorModal.jsx`

```jsx
import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { AlertCircle } from 'lucide-react';

const ProposeIndicatorModal = ({ onClose, onSubmit, domains }) => {
  const [formData, setFormData] = useState({
    domain: '',
    name: '',
    name_ar: '',
    weight: 3,
    type: 'M', // M = Manual, A = Automatic
    score_type: 'N', // B = Binary, N = Numeric, G = Gradual
    formula: '',
    rationale: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!formData.domain) newErrors.domain = 'Domain is required';
    if (!formData.name) newErrors.name = 'Indicator name is required';
    if (!formData.name_ar) newErrors.name_ar = 'Arabic name is required';
    if (formData.weight < 1 || formData.weight > 5) newErrors.weight = 'Weight must be between 1 and 5';
    if (formData.type === 'A' && !formData.formula) newErrors.formula = 'Formula is required for automatic indicators';
    if (!formData.rationale) newErrors.rationale = 'Rationale is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Propose New Indicator"
      size="lg"
    >
      <div className="space-y-6">
        {/* Domain Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Domain *
          </label>
          <select
            value={formData.domain}
            onChange={(e) => setFormData({...formData, domain: e.target.value})}
            className={`w-full border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
              errors.domain ? 'border-danger-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Domain</option>
            {domains.map(domain => (
              <option key={domain.id} value={domain.name}>{domain.name}</option>
            ))}
          </select>
          {errors.domain && <p className="text-sm text-danger-600 mt-1">{errors.domain}</p>}
        </div>

        {/* Indicator Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Indicator Name (English) *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className={`w-full border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
                errors.name ? 'border-danger-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Teacher Qualification Rate"
            />
            {errors.name && <p className="text-sm text-danger-600 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Indicator Name (Arabic) *
            </label>
            <input
              type="text"
              value={formData.name_ar}
              onChange={(e) => setFormData({...formData, name_ar: e.target.value})}
              className={`w-full border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
                errors.name_ar ? 'border-danger-500' : 'border-gray-300'
              }`}
              placeholder="مثال: معدل تأهيل المعلمين"
              dir="rtl"
            />
            {errors.name_ar && <p className="text-sm text-danger-600 mt-1">{errors.name_ar}</p>}
          </div>
        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weight (1-5) *
          </label>
          <input
            type="number"
            min="1"
            max="5"
            value={formData.weight}
            onChange={(e) => setFormData({...formData, weight: parseInt(e.target.value)})}
            className={`w-full border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
              errors.weight ? 'border-danger-500' : 'border-gray-300'
            }`}
          />
          {errors.weight && <p className="text-sm text-danger-600 mt-1">{errors.weight}</p>}
        </div>

        {/* Type (Manual/Automatic) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Indicator Type *
          </label>
          <div className="flex gap-6">
            <label className="flex items-center">
              <input
                type="radio"
                value="M"
                checked={formData.type === 'M'}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="mr-2 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">Manual (M) - Requires manual data entry</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="A"
                checked={formData.type === 'A'}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="mr-2 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">Automatic (A) - Calculated by formula</span>
            </label>
          </div>
        </div>

        {/* Formula (shown only for Automatic) */}
        {formData.type === 'A' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Calculation Formula *
            </label>
            <textarea
              value={formData.formula}
              onChange={(e) => setFormData({...formData, formula: e.target.value})}
              rows={3}
              className={`w-full border rounded-lg focus:ring-primary-500 focus:border-primary-500 font-mono text-sm ${
                errors.formula ? 'border-danger-500' : 'border-gray-300'
              }`}
              placeholder="e.g., (Qualified_Teachers / Total_Teachers) * 100"
            />
            {errors.formula && <p className="text-sm text-danger-600 mt-1">{errors.formula}</p>}
            <p className="text-xs text-gray-500 mt-1">
              Use variable names with underscores. Example: (Field_A / Field_B) * 100
            </p>
          </div>
        )}

        {/* Score Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Score Type *
          </label>
          <div className="space-y-2">
            <label className="flex items-start">
              <input
                type="radio"
                value="B"
                checked={formData.score_type === 'B'}
                onChange={(e) => setFormData({...formData, score_type: e.target.value})}
                className="mr-2 mt-1 text-primary-600 focus:ring-primary-500"
              />
              <div>
                <span className="text-sm font-medium">Binary (B)</span>
                <p className="text-xs text-gray-500">Yes/No, Pass/Fail (e.g., Fire extinguisher present)</p>
              </div>
            </label>
            <label className="flex items-start">
              <input
                type="radio"
                value="N"
                checked={formData.score_type === 'N'}
                onChange={(e) => setFormData({...formData, score_type: e.target.value})}
                className="mr-2 mt-1 text-primary-600 focus:ring-primary-500"
              />
              <div>
                <span className="text-sm font-medium">Numeric (N)</span>
                <p className="text-xs text-gray-500">Exact number (e.g., Number of qualified teachers)</p>
              </div>
            </label>
            <label className="flex items-start">
              <input
                type="radio"
                value="G"
                checked={formData.score_type === 'G'}
                onChange={(e) => setFormData({...formData, score_type: e.target.value})}
                className="mr-2 mt-1 text-primary-600 focus:ring-primary-500"
              />
              <div>
                <span className="text-sm font-medium">Gradual (G)</span>
                <p className="text-xs text-gray-500">Percentage or scale (e.g., 0-100%, 1-5 rating)</p>
              </div>
            </label>
          </div>
        </div>

        {/* Rationale */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rationale *
          </label>
          <textarea
            value={formData.rationale}
            onChange={(e) => setFormData({...formData, rationale: e.target.value})}
            rows={4}
            className={`w-full border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
              errors.rationale ? 'border-danger-500' : 'border-gray-300'
            }`}
            placeholder="Explain why this indicator is important and how it improves the evaluation framework..."
          />
          {errors.rationale && <p className="text-sm text-danger-600 mt-1">{errors.rationale}</p>}
        </div>

        {/* Info Box */}
        <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-primary-900">
              Your proposal will be reviewed by the committee. You'll be notified once a decision is made.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit Proposal
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProposeIndicatorModal;
```

---

## Pending Changes Tab Component

**File:** `src/components/committee/PendingChangesTab.jsx`

```jsx
import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Modal from '../common/Modal';
import ImpactPreviewModal from './ImpactPreviewModal';
import { 
  User, Calendar, FileText, TrendingUp, TrendingDown,
  CheckCircle, XCircle, MessageSquare, BarChart3
} from 'lucide-react';

const PendingChangesTab = ({ pendingChanges, onApprove, onReject, onRequestInfo }) => {
  const [selectedChange, setSelectedChange] = useState(null);
  const [showImpactModal, setShowImpactModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const getChangeTypeLabel = (type) => {
    const types = {
      new_indicator: { label: 'New Indicator', color: 'bg-success-100 text-success-800' },
      weight_change: { label: 'Weight Change', color: 'bg-warning-100 text-warning-800' },
      disable_indicator: { label: 'Disable Indicator', color: 'bg-danger-100 text-danger-800' },
      formula_change: { label: 'Formula Update', color: 'bg-blue-100 text-blue-800' },
    };
    const config = types[type] || { label: type, color: 'bg-gray-100 text-gray-800' };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const handleApprove = (change) => {
    if (window.confirm('Are you sure you want to approve this change?')) {
      onApprove(change.id);
    }
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }
    onReject(selectedChange.id, rejectReason);
    setShowRejectModal(false);
    setRejectReason('');
  };

  return (
    <div className="space-y-6">
      {pendingChanges.length === 0 ? (
        <Card padding="default">
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Pending Changes</h3>
            <p className="text-gray-600">All proposed changes have been reviewed.</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {pendingChanges.map((change) => (
            <Card key={change.id} padding="default" className="hover:shadow-md transition-shadow">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getChangeTypeLabel(change.type)}
                    <span className="text-sm text-gray-500">#{change.id}</span>
                  </div>
                  <Badge variant="warning" size="sm">Pending Review</Badge>
                </div>

                {/* Change Details */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Proposed by:</span>
                      <span className="font-medium text-gray-900">{change.proposer}</span>
                      <span className="text-gray-500">({change.proposer_role})</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium text-gray-900">{change.date}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {change.impact && (
                      <>
                        <div className="flex items-center gap-2 text-sm">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Affected Schools:</span>
                          <span className="font-medium text-gray-900">{change.impact.affected_schools}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          {change.impact.estimated_score_change > 0 ? (
                            <TrendingUp className="w-4 h-4 text-success-600" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-danger-600" />
                          )}
                          <span className="text-gray-600">Est. Score Impact:</span>
                          <span className={`font-medium ${
                            change.impact.estimated_score_change > 0 ? 'text-success-600' : 'text-danger-600'
                          }`}>
                            {change.impact.estimated_score_change > 0 ? '+' : ''}{change.impact.estimated_score_change}%
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Indicator Details */}
                {change.type === 'new_indicator' && (
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Proposed Indicator</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">Name:</span>
                        <span className="ml-2 font-medium text-gray-900">{change.indicator.name}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Domain:</span>
                        <span className="ml-2 font-medium text-gray-900">{change.indicator.domain}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Weight:</span>
                        <span className="ml-2 font-medium text-gray-900">{change.indicator.weight}/5</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Type:</span>
                        <span className="ml-2 font-medium text-gray-900">
                          {change.indicator.type === 'M' ? 'Manual' : 'Automatic'}
                        </span>
                      </div>
                      {change.indicator.formula && (
                        <div className="col-span-2">
                          <span className="text-gray-600">Formula:</span>
                          <div className="mt-1 p-2 bg-white rounded border border-gray-200 font-mono text-xs">
                            {change.indicator.formula}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {change.type === 'weight_change' && (
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Weight Change</h4>
                    <div className="text-sm">
                      <span className="text-gray-600">Indicator:</span>
                      <span className="ml-2 font-medium text-gray-900">{change.indicator.name}</span>
                      <div className="mt-2 flex items-center gap-3">
                        <span className="px-3 py-1 bg-danger-100 text-danger-800 rounded font-medium">
                          Current: {change.indicator.current_weight}
                        </span>
                        <span className="text-gray-400">→</span>
                        <span className="px-3 py-1 bg-success-100 text-success-800 rounded font-medium">
                          Proposed: {change.indicator.proposed_weight}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Rationale */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Rationale</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{change.rationale}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedChange(change);
                      setShowImpactModal(true);
                    }}
                    icon={<BarChart3 className="w-4 h-4" />}
                  >
                    Preview Impact
                  </Button>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRequestInfo(change.id)}
                      icon={<MessageSquare className="w-4 h-4" />}
                    >
                      Request Info
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        setSelectedChange(change);
                        setShowRejectModal(true);
                      }}
                      icon={<XCircle className="w-4 h-4" />}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleApprove(change)}
                      icon={<CheckCircle className="w-4 h-4" />}
                    >
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Impact Preview Modal */}
      {showImpactModal && selectedChange && (
        <ImpactPreviewModal
          change={selectedChange}
          onClose={() => setShowImpactModal(false)}
        />
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedChange && (
        <Modal
          isOpen={true}
          onClose={() => setShowRejectModal(false)}
          title="Reject Change Proposal"
          size="md"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Please provide a reason for rejecting this proposal. The proposer will be notified.
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rejection Reason *
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={4}
                className="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                placeholder="Explain why this proposal is being rejected..."
              />
            </div>
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
              <Button variant="outline" onClick={() => setShowRejectModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleReject}>
                Confirm Rejection
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PendingChangesTab;
```

---

## Impact Preview Modal Component

**File:** `src/components/committee/ImpactPreviewModal.jsx`

```jsx
import React from 'react';
import Modal from '../common/Modal';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

const ImpactPreviewModal = ({ change, onClose }) => {
  // Mock chart data
  const mockDistribution = [
    { range: 'A+ (95-100)', before: 45, after: 42 },
    { range: 'A (90-94)', before: 120, after: 118 },
    { range: 'B+ (85-89)', before: 280, after: 285 },
    { range: 'B (80-84)', before: 420, after: 425 },
    { range: 'C+ (75-79)', before: 245, after: 242 },
    { range: 'C (70-74)', before: 98, after: 96 },
    { range: 'D+ (65-69)', before: 26, after: 26 },
  ];

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Change Impact Analysis"
      size="lg"
    >
      <div className="space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
            <p className="text-sm text-gray-600 mb-1">Affected Schools</p>
            <p className="text-2xl font-bold text-gray-900">{change.impact.affected_schools}</p>
          </div>
          <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
            <p className="text-sm text-gray-600 mb-1">Estimated Score Change</p>
            <p className={`text-2xl font-bold ${
              change.impact.estimated_score_change > 0 ? 'text-success-600' : 'text-danger-600'
            }`}>
              {change.impact.estimated_score_change > 0 ? '+' : ''}{change.impact.estimated_score_change}%
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Confidence Level</p>
            <p className="text-2xl font-bold text-gray-900">High</p>
          </div>
        </div>

        {/* Warning */}
        <div className="p-4 bg-warning-50 border border-warning-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-warning-900">
              <p className="font-medium mb-1">Impact Estimate</p>
              <p>
                This is a statistical projection based on current data. 
                Actual impact may vary once the change is implemented.
              </p>
            </div>
          </div>
        </div>

        {/* Distribution Chart (Mock) */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Projected Grade Distribution
          </h4>
          <div className="space-y-2">
            {mockDistribution.map((row, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-32 text-sm text-gray-700">{row.range}</div>
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 relative">
                    <div className="w-full bg-gray-200 rounded h-8 overflow-hidden">
                      <div 
                        className="bg-danger-400 h-full opacity-50"
                        style={{ width: `${(row.before / 450) * 100}%` }}
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-end pr-2">
                      <span className="text-xs font-medium text-gray-700">Before: {row.before}</span>
                    </div>
                  </div>
                  <div className="flex-1 relative">
                    <div className="w-full bg-gray-200 rounded h-8 overflow-hidden">
                      <div 
                        className="bg-success-500 h-full"
                        style={{ width: `${(row.after / 450) * 100}%` }}
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-end pr-2">
                      <span className="text-xs font-medium text-white">After: {row.after}</span>
                    </div>
                  </div>
                </div>
                <div className="w-16 text-right">
                  {row.after !== row.before && (
                    <span className={`text-sm font-medium ${
                      row.after > row.before ? 'text-success-600' : 'text-danger-600'
                    }`}>
                      {row.after > row.before ? '+' : ''}{row.after - row.before}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-danger-400 opacity-50 rounded"></div>
              <span className="text-gray-600">Before Change</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-success-500 rounded"></div>
              <span className="text-gray-600">After Change</span>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Insights</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary-600">•</span>
              <span>Majority of schools will see minimal score changes (±1-2%)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600">•</span>
              <span>High-performing schools (A+/A) slightly decrease due to new requirements</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600">•</span>
              <span>Mid-tier schools (B+/B) benefit most from the proposed change</span>
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default ImpactPreviewModal;
```

---

## Testing Checklist

### Indicator Matrix Actions
- [ ] "Edit" button opens edit modal
- [ ] "Disable" button opens confirmation modal
- [ ] Disabled indicators gray out
- [ ] "Enable" button re-activates disabled indicators
- [ ] "Approve" button activates pending indicators
- [ ] "Reject" button rejects pending indicators
- [ ] Status badges update correctly

### Propose Indicator Form
- [ ] All fields validate correctly
- [ ] Formula field only shows for Automatic type
- [ ] Type radio buttons work (M/A)
- [ ] Score Type radio buttons work (B/N/G)
- [ ] Formula textarea accepts input
- [ ] Rationale textarea required
- [ ] Submit creates pending indicator
- [ ] Modal closes on success

### Pending Changes Tab
- [ ] Tab shows pending count badge
- [ ] Change cards display correctly
- [ ] Change type labels correct
- [ ] Proposer information shows
- [ ] Impact metrics display
- [ ] "Preview Impact" opens modal
- [ ] "Request Info" triggers notification
- [ ] "Reject" opens reason modal
- [ ] "Approve" confirms and updates
- [ ] Empty state shows when no changes

### Impact Preview Modal
- [ ] Summary metrics display
- [ ] Distribution chart renders
- [ ] Before/After comparison shows
- [ ] Key insights list displays
- [ ] Modal closes correctly

---

## Next Steps

After completing both enhanced documents:
1. ✅ Test all new Ops dashboard features
2. ✅ Test all new Committee dashboard features
3. ✅ Verify 4-step create request flow
4. ✅ Verify pending changes workflow
5. ✅ Update INDEX.md with new features
