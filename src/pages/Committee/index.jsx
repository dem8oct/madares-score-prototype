import React, { useState } from 'react';
import { mockIndicators, mockDomains } from '../../data/mockData';
import { useToast } from '../../context/ToastContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import {
  Edit, Plus, Save, X, CheckCircle, XCircle,
  BarChart2, MessageSquare, AlertTriangle
} from 'lucide-react';

const CommitteeDashboard = () => {
  const { success } = useToast();
  const [domains, setDomains] = useState(mockDomains);
  const [indicators, setIndicators] = useState(mockIndicators);
  const [activeTab, setActiveTab] = useState('indicators'); // 'indicators' or 'pending'
  const [domainFilter, setDomainFilter] = useState('All');

  // Modals
  const [showProposeModal, setShowProposeModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showImpactModal, setShowImpactModal] = useState(false);

  // Form data
  const [proposalData, setProposalData] = useState({
    name_en: '',
    name_ar: '',
    domain: 'Excellence',
    weight: 3,
    type: 'M', // M or A
    score_type: 'G', // B, N, or G
    formula: '',
    rationale: '',
  });

  const [editData, setEditData] = useState({
    code: '',
    name: '',
    name_ar: '',
    domain: 'Excellence',
    weight: 3,
    data_source: '',
  });

  const [selectedIndicator, setSelectedIndicator] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  // Mock pending changes
  const [pendingChanges] = useState([
    {
      id: 'CHG-001',
      type: 'new_indicator',
      proposer: 'Ahmed Al-Rashid',
      proposer_role: 'Senior Evaluator',
      date: '2025-10-25',
      indicator: {
        name: 'Emergency Response Time',
        domain: 'Safety & Security',
        weight: 3,
        type: 'A',
        score_type: 'N',
        formula: '(Total_Drills / Total_Scheduled) * 100'
      },
      rationale: 'Emergency preparedness is crucial for school safety. This indicator measures how effectively schools conduct and complete scheduled safety drills.',
      impact: {
        affected_schools: 156,
        estimated_score_change: +1.2
      },
      status: 'pending'
    },
    {
      id: 'CHG-002',
      type: 'weight_change',
      proposer: 'Sarah Al-Qahtani',
      proposer_role: 'Committee Member',
      date: '2025-10-26',
      indicator: {
        name: 'Teacher Qualification Rate',
        current_weight: 4,
        proposed_weight: 5
      },
      rationale: 'Teacher qualifications have a direct impact on educational quality. Increasing the weight reflects the importance of qualified teaching staff.',
      impact: {
        affected_schools: 156,
        estimated_score_change: -0.8
      },
      status: 'pending'
    }
  ]);

  const updateDomainWeight = (domainId, newWeight) => {
    setDomains(prev =>
      prev.map(d => d.id === domainId ? { ...d, weight: newWeight / 100 } : d)
    );
    success('Domain weight updated');
  };

  const handleProposeIndicator = () => {
    success('New indicator proposed for review');
    setShowProposeModal(false);
    resetProposalForm();
  };

  const handleEditIndicator = (indicator) => {
    setEditData({
      code: indicator.code,
      name: indicator.name,
      name_ar: indicator.name_ar || '',
      domain: indicator.domain,
      weight: indicator.weight,
      data_source: indicator.data_source,
    });
    setShowEditModal(true);
  };

  const confirmEdit = () => {
    setIndicators(prev =>
      prev.map(ind =>
        ind.code === editData.code
          ? { ...ind, name: editData.name, name_ar: editData.name_ar, weight: editData.weight, domain: editData.domain, data_source: editData.data_source }
          : ind
      )
    );
    success(`Indicator ${editData.code} updated successfully`);
    setShowEditModal(false);
  };

  const handleDisableIndicator = (indicator) => {
    setSelectedIndicator(indicator);
    setShowDisableModal(true);
  };

  const confirmDisable = () => {
    success(`Indicator ${selectedIndicator.code} disabled`);
    setShowDisableModal(false);
    setSelectedIndicator(null);
  };

  const handleEnableIndicator = (indicator) => {
    success(`Indicator ${indicator.code} enabled`);
  };

  const handleApproveChange = (change) => {
    success(`Change ${change.id} approved`);
  };

  const handleRejectChange = (change) => {
    setSelectedIndicator(change);
    setShowRejectModal(true);
  };

  const confirmReject = () => {
    success(`Change ${selectedIndicator.id} rejected`);
    setShowRejectModal(false);
    setSelectedIndicator(null);
    setRejectReason('');
  };

  const handlePreviewImpact = (change) => {
    setSelectedIndicator(change);
    setShowImpactModal(true);
  };

  const resetProposalForm = () => {
    setProposalData({
      name_en: '',
      name_ar: '',
      domain: 'Excellence',
      weight: 3,
      type: 'M',
      score_type: 'G',
      formula: '',
      rationale: '',
    });
  };

  const getStatusVariant = (status) => {
    if (status === 'active') return 'success';
    if (status === 'pending_approval') return 'warning';
    if (status === 'disabled') return 'default';
    return 'default';
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Committee Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage evaluation indicators and domain weights</p>
        </div>

        {/* Domain Weights */}
        <Card title="Domain Weights" padding="default">
          <p className="text-sm text-gray-600 mb-4">
            Adjust the weight of each domain in the overall evaluation score. Total must equal 100%.
          </p>
          <div className="space-y-6">
            {domains.map(domain => (
              <div key={domain.id}>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-medium text-gray-900">{domain.name}</label>
                  <span className="text-lg font-bold text-primary-600">
                    {Math.round(domain.weight * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={domain.weight * 100}
                  onChange={(e) => updateDomainWeight(domain.id, parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
                <p className="text-xs text-gray-500 mt-1">{domain.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> Changes to domain weights will affect all future evaluations.
              Current total: {Math.round(domains.reduce((sum, d) => sum + d.weight, 0) * 100)}%
            </p>
          </div>
        </Card>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('indicators')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'indicators'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Indicators Matrix
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === 'pending'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pending Changes
              <Badge variant="warning" size="sm">{pendingChanges.length}</Badge>
            </button>
          </nav>
        </div>

        {/* Indicators Matrix Tab */}
        {activeTab === 'indicators' && (
          <Card title="Evaluation Indicators" padding="none">
            {/* Filter Section */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">Filter by Domain:</label>
                <select
                  value={domainFilter}
                  onChange={(e) => setDomainFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                >
                  <option value="All">All Domains</option>
                  <option value="Compliance">Compliance</option>
                  <option value="Excellence">Institutional Excellence</option>
                  <option value="Satisfaction">Beneficiary Satisfaction</option>
                </select>
                {domainFilter !== 'All' && (
                  <button
                    onClick={() => setDomainFilter('All')}
                    className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Clear filter
                  </button>
                )}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Domain</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Weight</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {indicators
                    .filter(indicator => domainFilter === 'All' || indicator.domain === domainFilter)
                    .map((indicator) => {
                    const isDisabled = indicator.status === 'disabled';
                    return (
                      <tr
                        key={indicator.code}
                        className={`hover:bg-gray-50 ${isDisabled ? 'bg-gray-100 opacity-50' : ''}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm font-medium ${isDisabled ? 'italic text-gray-500' : 'text-gray-900'}`}>
                            {indicator.code}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-sm ${isDisabled ? 'italic text-gray-500' : 'text-gray-900'}`}>
                            {indicator.name}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{indicator.domain}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{indicator.weight}/5</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="primary" size="sm">{indicator.data_source}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant={getStatusVariant(indicator.status)}>
                            {indicator.status.replace(/_/g, ' ')}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                          {indicator.status === 'active' && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditIndicator(indicator)}
                                icon={<Edit className="w-4 h-4" />}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDisableIndicator(indicator)}
                                icon={<XCircle className="w-4 h-4" />}
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
                                onClick={() => success(`Approved indicator ${indicator.code}`)}
                              >
                                Approve
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDisableIndicator(indicator)}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          {indicator.status === 'disabled' && (
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => handleEnableIndicator(indicator)}
                            >
                              Enable
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-gray-200">
              <Button
                variant="primary"
                size="sm"
                icon={<Plus className="w-4 h-4" />}
                onClick={() => setShowProposeModal(true)}
              >
                Propose New Indicator
              </Button>
            </div>
          </Card>
        )}

        {/* Pending Changes Tab */}
        {activeTab === 'pending' && (
          <div className="space-y-4">
            {pendingChanges.length === 0 ? (
              <Card padding="default">
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-success-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Pending Changes</h3>
                  <p className="text-gray-600">All proposed changes have been reviewed</p>
                </div>
              </Card>
            ) : (
              pendingChanges.map(change => (
                <Card key={change.id} padding="default">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={change.type === 'new_indicator' ? 'success' : 'warning'}
                        size="lg"
                      >
                        {change.type === 'new_indicator' ? 'New Indicator' : 'Weight Change'}
                      </Badge>
                      <span className="text-sm text-gray-600">#{change.id}</span>
                      <Badge variant="warning">Pending Review</Badge>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Proposer:</span>
                      <span className="font-medium">{change.proposer} ({change.proposer_role})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{change.date}</span>
                    </div>
                  </div>

                  {/* Impact Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <BarChart2 className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Affected Schools:</span>
                      <span className="font-medium">{change.impact.affected_schools} schools</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart2 className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Estimated Score Change:</span>
                      <span className={`font-medium ${
                        change.impact.estimated_score_change > 0 ? 'text-success-600' : 'text-danger-600'
                      }`}>
                        {change.impact.estimated_score_change > 0 ? '+' : ''}{change.impact.estimated_score_change}%
                      </span>
                    </div>
                  </div>

                  {/* Change Details */}
                  <div className="p-4 bg-gray-50 rounded-lg mb-4">
                    {change.type === 'new_indicator' && (
                      <div className="space-y-2 text-sm">
                        <div><strong>Name:</strong> {change.indicator.name}</div>
                        <div><strong>Domain:</strong> {change.indicator.domain}</div>
                        <div><strong>Weight:</strong> {change.indicator.weight}/5</div>
                        <div><strong>Type:</strong> {change.indicator.type === 'A' ? 'Automatic' : 'Manual'}</div>
                        <div><strong>Score Type:</strong> {
                          change.indicator.score_type === 'B' ? 'Binary' :
                          change.indicator.score_type === 'N' ? 'Numeric' : 'Gradual'
                        }</div>
                        {change.indicator.formula && (
                          <div><strong>Formula:</strong> <code className="text-xs bg-white px-2 py-1 rounded">{change.indicator.formula}</code></div>
                        )}
                      </div>
                    )}
                    {change.type === 'weight_change' && (
                      <div className="flex items-center gap-4">
                        <div><strong>{change.indicator.name}</strong></div>
                        <div className="flex items-center gap-2">
                          <Badge variant="danger">Current: {change.indicator.current_weight}</Badge>
                          <span>→</span>
                          <Badge variant="success">Proposed: {change.indicator.proposed_weight}</Badge>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Rationale */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Rationale</h4>
                    <p className="text-sm text-gray-700">{change.rationale}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreviewImpact(change)}
                      icon={<BarChart2 className="w-4 h-4" />}
                    >
                      Preview Impact
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<MessageSquare className="w-4 h-4" />}
                      >
                        Request Info
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRejectChange(change)}
                      >
                        Reject
                      </Button>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleApproveChange(change)}
                      >
                        Approve
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Propose Indicator Modal */}
        <Modal
          isOpen={showProposeModal}
          onClose={() => {
            setShowProposeModal(false);
            resetProposalForm();
          }}
          title="Propose New Indicator"
          size="xl"
          footer={
            <>
              <Button variant="outline" onClick={() => setShowProposeModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleProposeIndicator} icon={<Save className="w-4 h-4" />}>
                Submit Proposal
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            {/* Domain */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Domain <span className="text-danger-600">*</span>
              </label>
              <select
                value={proposalData.domain}
                onChange={(e) => setProposalData({ ...proposalData, domain: e.target.value })}
                className="w-full border-gray-300 rounded-lg"
              >
                <option value="Compliance">Compliance</option>
                <option value="Excellence">Excellence</option>
                <option value="Satisfaction">Satisfaction</option>
              </select>
            </div>

            {/* Names */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Indicator Name - English <span className="text-danger-600">*</span>
                </label>
                <input
                  type="text"
                  value={proposalData.name_en}
                  onChange={(e) => setProposalData({ ...proposalData, name_en: e.target.value })}
                  className="w-full border-gray-300 rounded-lg"
                  placeholder="Professional Development Hours"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Indicator Name - Arabic <span className="text-danger-600">*</span>
                </label>
                <input
                  type="text"
                  value={proposalData.name_ar}
                  onChange={(e) => setProposalData({ ...proposalData, name_ar: e.target.value })}
                  className="w-full border-gray-300 rounded-lg"
                  placeholder="ساعات التطوير المهني"
                  dir="rtl"
                />
              </div>
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight (1-5) <span className="text-danger-600">*</span>
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={proposalData.weight}
                onChange={(e) => setProposalData({ ...proposalData, weight: parseInt(e.target.value) })}
                className="w-full border-gray-300 rounded-lg"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type <span className="text-danger-600">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-start gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="type"
                    value="M"
                    checked={proposalData.type === 'M'}
                    onChange={(e) => setProposalData({ ...proposalData, type: e.target.value })}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Manual (M)</div>
                    <div className="text-sm text-gray-600">Requires manual data entry</div>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="type"
                    value="A"
                    checked={proposalData.type === 'A'}
                    onChange={(e) => setProposalData({ ...proposalData, type: e.target.value })}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Automatic (A)</div>
                    <div className="text-sm text-gray-600">Calculated by formula</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Formula (only if Automatic) */}
            {proposalData.type === 'A' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Formula <span className="text-danger-600">*</span>
                </label>
                <textarea
                  value={proposalData.formula}
                  onChange={(e) => setProposalData({ ...proposalData, formula: e.target.value })}
                  rows={3}
                  className="w-full border-gray-300 rounded-lg font-mono text-sm"
                  placeholder="(Qualified_Teachers / Total_Teachers) * 100"
                />
                <p className="text-xs text-gray-500 mt-1">Use variable names with underscores</p>
              </div>
            )}

            {/* Score Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Score Type <span className="text-danger-600">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-start gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="score_type"
                    value="B"
                    checked={proposalData.score_type === 'B'}
                    onChange={(e) => setProposalData({ ...proposalData, score_type: e.target.value })}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Binary (B)</div>
                    <div className="text-sm text-gray-600">Yes/No, Pass/Fail</div>
                    <div className="text-xs text-gray-500 mt-1">Example: Fire extinguisher present</div>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="score_type"
                    value="N"
                    checked={proposalData.score_type === 'N'}
                    onChange={(e) => setProposalData({ ...proposalData, score_type: e.target.value })}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Numeric (N)</div>
                    <div className="text-sm text-gray-600">Exact number</div>
                    <div className="text-xs text-gray-500 mt-1">Example: Number of qualified teachers</div>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="score_type"
                    value="G"
                    checked={proposalData.score_type === 'G'}
                    onChange={(e) => setProposalData({ ...proposalData, score_type: e.target.value })}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Gradual (G)</div>
                    <div className="text-sm text-gray-600">Percentage or scale</div>
                    <div className="text-xs text-gray-500 mt-1">Example: 0-100%, 1-5 rating</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Rationale */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rationale <span className="text-danger-600">*</span>
              </label>
              <textarea
                value={proposalData.rationale}
                onChange={(e) => setProposalData({ ...proposalData, rationale: e.target.value })}
                rows={4}
                className="w-full border-gray-300 rounded-lg"
                placeholder="Explain why this indicator is important and how it will benefit the evaluation system..."
              />
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Note:</strong> All fields marked with * are required. Your proposal will be reviewed by the committee before being activated.
              </p>
            </div>
          </div>
        </Modal>

        {/* Edit Indicator Modal */}
        <Modal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
          }}
          title={`Edit Indicator: ${editData.code}`}
          size="lg"
          footer={
            <>
              <Button variant="outline" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={confirmEdit} icon={<Save className="w-4 h-4" />}>
                Save Changes
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            {/* Domain */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Domain <span className="text-danger-600">*</span>
              </label>
              <select
                value={editData.domain}
                onChange={(e) => setEditData({ ...editData, domain: e.target.value })}
                className="w-full border-gray-300 rounded-lg"
              >
                <option value="Compliance">Compliance</option>
                <option value="Excellence">Excellence</option>
                <option value="Satisfaction">Satisfaction</option>
              </select>
            </div>

            {/* Names */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Indicator Name - English <span className="text-danger-600">*</span>
                </label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="w-full border-gray-300 rounded-lg"
                  placeholder="Teacher Qualifications"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Indicator Name - Arabic
                </label>
                <input
                  type="text"
                  value={editData.name_ar}
                  onChange={(e) => setEditData({ ...editData, name_ar: e.target.value })}
                  className="w-full border-gray-300 rounded-lg"
                  placeholder="مؤهلات المعلمين"
                  dir="rtl"
                />
              </div>
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight (1-5) <span className="text-danger-600">*</span>
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={editData.weight}
                onChange={(e) => setEditData({ ...editData, weight: parseInt(e.target.value) })}
                className="w-full border-gray-300 rounded-lg"
              />
            </div>

            {/* Data Source */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Source <span className="text-danger-600">*</span>
              </label>
              <input
                type="text"
                value={editData.data_source}
                onChange={(e) => setEditData({ ...editData, data_source: e.target.value })}
                className="w-full border-gray-300 rounded-lg"
                placeholder="e.g., Noor System, MoE PD System"
              />
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Note:</strong> Changes to indicator details will be applied to all future evaluations. Existing evaluations will not be affected.
              </p>
            </div>
          </div>
        </Modal>

        {/* Disable Confirmation Modal */}
        <Modal
          isOpen={showDisableModal}
          onClose={() => {
            setShowDisableModal(false);
            setSelectedIndicator(null);
          }}
          title="Disable Indicator"
          size="md"
          footer={
            <>
              <Button variant="outline" onClick={() => setShowDisableModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDisable}>
                Disable Indicator
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <div className="p-4 bg-warning-50 border border-warning-200 rounded-lg flex gap-3">
              <AlertTriangle className="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-warning-900">
                <p className="font-medium mb-2">Warning: This action will affect all future evaluations</p>
                <p>
                  Disabling indicator <strong>{selectedIndicator?.code}</strong> will prevent it from being used
                  in new evaluations. Existing evaluations using this indicator will not be affected.
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-700">
              Are you sure you want to disable this indicator?
            </p>
          </div>
        </Modal>

        {/* Reject Change Modal */}
        <Modal
          isOpen={showRejectModal}
          onClose={() => {
            setShowRejectModal(false);
            setSelectedIndicator(null);
            setRejectReason('');
          }}
          title="Reject Change Proposal"
          size="md"
          footer={
            <>
              <Button variant="outline" onClick={() => setShowRejectModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmReject}>
                Reject Proposal
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Please provide a reason for rejecting this proposal:
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={4}
              className="w-full border-gray-300 rounded-lg"
              placeholder="Explain why this proposal is being rejected..."
              required
            />
          </div>
        </Modal>

        {/* Impact Preview Modal */}
        <Modal
          isOpen={showImpactModal}
          onClose={() => {
            setShowImpactModal(false);
            setSelectedIndicator(null);
          }}
          title="Impact Preview"
          size="xl"
        >
          {selectedIndicator && (
            <div className="space-y-6">
              {/* Summary Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <Card padding="default">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">
                      {selectedIndicator.impact.affected_schools}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Affected Schools</div>
                  </div>
                </Card>
                <Card padding="default">
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${
                      selectedIndicator.impact.estimated_score_change > 0 ? 'text-success-600' : 'text-danger-600'
                    }`}>
                      {selectedIndicator.impact.estimated_score_change > 0 ? '+' : ''}
                      {selectedIndicator.impact.estimated_score_change}%
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Estimated Score Change</div>
                  </div>
                </Card>
                <Card padding="default">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600">High</div>
                    <div className="text-sm text-gray-600 mt-1">Confidence Level</div>
                  </div>
                </Card>
              </div>

              {/* Warning */}
              <div className="p-4 bg-warning-50 border border-warning-200 rounded-lg flex gap-3">
                <AlertTriangle className="w-5 h-5 text-warning-600 flex-shrink-0" />
                <p className="text-sm text-warning-900">
                  This is a statistical projection based on current data. Actual impact may vary.
                </p>
              </div>

              {/* Mock Distribution Chart */}
              <Card padding="default">
                <h3 className="font-semibold text-gray-900 mb-4">Grade Distribution Comparison</h3>
                <div className="space-y-3">
                  {['A+', 'A', 'B+', 'B', 'C+', 'C', 'D+'].map((grade, idx) => {
                    const before = Math.max(5, 30 - idx * 4);
                    const after = before + (selectedIndicator.impact.estimated_score_change > 0 ? idx - 2 : 2 - idx);
                    return (
                      <div key={grade}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{grade}</span>
                          <span className="text-sm text-gray-600">
                            {before} → {after} schools ({after - before > 0 ? '+' : ''}{after - before})
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <div
                            className="h-8 bg-danger-200 rounded flex items-center justify-center text-xs"
                            style={{ width: `${before * 2}%` }}
                          >
                            {before}
                          </div>
                          <div
                            className="h-8 bg-success-600 rounded flex items-center justify-center text-xs text-white"
                            style={{ width: `${after * 2}%` }}
                          >
                            {after}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Key Insights */}
              <Card padding="default">
                <h3 className="font-semibold text-gray-900 mb-3">Key Insights</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Majority of schools see minimal change (±1-2%)</li>
                  <li>• High performers slightly {selectedIndicator.impact.estimated_score_change > 0 ? 'increase' : 'decrease'}</li>
                  <li>• Mid-tier schools benefit most from this change</li>
                </ul>
              </Card>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default CommitteeDashboard;
