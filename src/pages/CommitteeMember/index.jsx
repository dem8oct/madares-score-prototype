import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { Award, Settings, TrendingUp, AlertCircle, Plus, Library } from 'lucide-react';
import { mockIndicators, mockDomains, mockGradeBands } from '../../data/mockData';
import IndicatorsTabEnhanced from '../../components/committee/indicators/IndicatorsTabEnhanced';
import { indicatorsWithStatus } from '../../data/indicatorsWithStatus';
import AddIndicatorModal from '../../components/committee/indicators/AddIndicatorModal';

const CommitteeMemberDashboard = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('indicators');
  const [showNewIndicatorModal, setShowNewIndicatorModal] = useState(false);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Committee Member Dashboard
          </h1>
          <p className="text-gray-600">
            Manage evaluation indicators, weights, and scoring criteria
          </p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Library className="w-5 h-5" />}
          onClick={() => navigate('/committee/questions-bank')}
        >
          Questions Bank
        </Button>
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
      {activeTab === 'indicators' && <IndicatorsTabEnhanced onOpenModal={() => setShowNewIndicatorModal(true)} />}
      {activeTab === 'domains' && <DomainsTab />}
      {activeTab === 'grades' && <GradeBandsTab />}

      {/* New Indicator Modal */}
      <AddIndicatorModal
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

export default CommitteeMemberDashboard;
