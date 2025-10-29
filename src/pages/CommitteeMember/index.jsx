import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { Award, Settings, TrendingUp, AlertCircle, Plus } from 'lucide-react';
import { mockIndicators, mockDomains, mockGradeBands } from '../../data/mockData';

const CommitteeMemberDashboard = () => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('indicators');
  const [showNewIndicatorModal, setShowNewIndicatorModal] = useState(false);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Committee Member Dashboard
        </h1>
        <p className="text-gray-600">
          Manage evaluation indicators, weights, and scoring criteria
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Indicators</p>
              <p className="text-2xl font-bold text-gray-900">{mockIndicators.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Evaluation Domains</p>
              <p className="text-2xl font-bold text-gray-900">{mockDomains.length}</p>
            </div>
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Grade Bands</p>
              <p className="text-2xl font-bold text-gray-900">{mockGradeBands.length}</p>
            </div>
            <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
              <Settings className="w-6 h-6 text-warning-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Reviews</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <div className="w-12 h-12 bg-danger-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-danger-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('indicators')}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'indicators'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Indicators ({mockIndicators.length})
        </button>
        <button
          onClick={() => setActiveTab('domains')}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'domains'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Domains ({mockDomains.length})
        </button>
        <button
          onClick={() => setActiveTab('grades')}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'grades'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Grade Bands ({mockGradeBands.length})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'indicators' && <IndicatorsTab onOpenModal={() => setShowNewIndicatorModal(true)} />}
      {activeTab === 'domains' && <DomainsTab />}
      {activeTab === 'grades' && <GradeBandsTab />}

      {/* New Indicator Modal */}
      <NewIndicatorModal
        isOpen={showNewIndicatorModal}
        onClose={() => setShowNewIndicatorModal(false)}
      />
    </div>
  );
};

// Indicators Tab
const IndicatorsTab = ({ onOpenModal }) => {
  const columns = [
    { key: 'code', label: 'Code', sortable: true },
    { key: 'name', label: 'Indicator Name', sortable: true },
    { key: 'domain', label: 'Domain', sortable: true },
    { key: 'weight', label: 'Weight', sortable: true },
    { key: 'data_source', label: 'Data Source', sortable: false },
    { key: 'status', label: 'Status', sortable: true },
  ];

  const data = mockIndicators.map(ind => ({
    code: ind.code,
    name: ind.name,
    domain: ind.domain,
    weight: ind.weight,
    data_source: ind.data_source,
    status: <Badge variant="success">Active</Badge>,
  }));

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Evaluation Indicators
        </h2>
        <Button
          variant="primary"
          size="sm"
          onClick={onOpenModal}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Propose New Indicator
        </Button>
      </div>
      <Table columns={columns} data={data} />
    </Card>
  );
};

// Domains Tab
const DomainsTab = () => {
  return (
    <div className="grid gap-4">
      {mockDomains.map((domain, idx) => (
        <Card key={idx}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {domain.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3">{domain.name_ar}</p>
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-sm text-gray-600">Weight: </span>
                  <span className="font-semibold text-gray-900">
                    {(domain.weight * 100).toFixed(0)}%
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Indicators: </span>
                  <span className="font-semibold text-gray-900">
                    {mockIndicators.filter(i => i.domain === domain.name).length}
                  </span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Configure
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

// Grade Bands Tab
const GradeBandsTab = () => {
  const getVariant = (color) => {
    const map = { success: 'success', primary: 'primary', warning: 'warning', danger: 'danger' };
    return map[color] || 'default';
  };

  return (
    <Card>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Grade Bands Configuration
      </h2>
      <div className="space-y-3">
        {mockGradeBands.map((band, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-4">
              <Badge variant={getVariant(band.color)} size="lg">
                {band.grade}
              </Badge>
              <div>
                <p className="font-medium text-gray-900">{band.label}</p>
                <p className="text-sm text-gray-600">{band.label_ar}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">
                {band.min} - {band.max}
              </p>
              <p className="text-sm text-gray-600">Score Range</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// New Indicator Modal
const NewIndicatorModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    name_ar: '',
    domain: 'Excellence',
    indicator_type: '',
    score_type: '',
    weight: '',
    data_source: '',
    description: '',
  });

  const scoreTypeDescriptions = {
    Binary: 'Yes/No or Pass/Fail scoring. Results in either 0 or 100 points. Example: Valid license (Yes=100, No=0)',
    Numeric: 'Continuous numeric values converted to percentage. Example: Student-teacher ratio, attendance rate (calculated as percentage)',
    Gradual: 'Multi-level scale scoring with defined thresholds. Example: 5-point scale (Excellent=100, Very Good=85, Good=70, Fair=55, Poor=40)',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app, would save to backend
    alert('New indicator proposal submitted for review!');
    onClose();
    setFormData({
      code: '',
      name: '',
      name_ar: '',
      domain: 'Excellence',
      indicator_type: '',
      score_type: '',
      weight: '',
      data_source: '',
      description: '',
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Propose New Indicator"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Indicator Code"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            placeholder="E301"
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Domain *
            </label>
            <select
              value={formData.domain}
              onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="Excellence">Excellence</option>
              <option value="Satisfaction">Satisfaction</option>
              <option value="Compliance">Compliance</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Indicator Type *
            </label>
            <select
              value={formData.indicator_type}
              onChange={(e) => setFormData({ ...formData, indicator_type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="">Select type...</option>
              <option value="Performance">Performance</option>
              <option value="Quality">Quality</option>
              <option value="Compliance">Compliance</option>
              <option value="Efficiency">Efficiency</option>
              <option value="Outcome">Outcome</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Score Type *
            </label>
            <select
              value={formData.score_type}
              onChange={(e) => setFormData({ ...formData, score_type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="">Select scoring method...</option>
              <option value="Binary">Binary</option>
              <option value="Numeric">Numeric</option>
              <option value="Gradual">Gradual</option>
            </select>
          </div>
        </div>

        {/* Score Type Description */}
        {formData.score_type && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-medium text-blue-900 mb-1">
              {formData.score_type} Scoring:
            </p>
            <p className="text-xs text-blue-800">
              {scoreTypeDescriptions[formData.score_type]}
            </p>
          </div>
        )}

        <Input
          label="Indicator Name (English)"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Teacher Professional Development Hours"
          required
        />

        <Input
          label="Indicator Name (Arabic)"
          value={formData.name_ar}
          onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
          placeholder="ساعات التطوير المهني للمعلمين"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Weight"
            type="number"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            placeholder="5"
            min="1"
            max="10"
            required
          />
          <Input
            label="Data Source"
            value={formData.data_source}
            onChange={(e) => setFormData({ ...formData, data_source: e.target.value })}
            placeholder="Noor System"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description / Justification
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows="4"
            placeholder="Explain why this indicator should be added and how it will be measured..."
            required
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Submit Proposal
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CommitteeMemberDashboard;
