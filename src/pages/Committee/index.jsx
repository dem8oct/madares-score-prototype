import React, { useState } from 'react';
import { mockIndicators, mockDomains } from '../../data/mockData';
import { useToast } from '../../context/ToastContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { Edit, Plus, Save } from 'lucide-react';

const CommitteeDashboard = () => {
  const { success } = useToast();
  const [domains, setDomains] = useState(mockDomains);
  const [indicators, setIndicators] = useState(mockIndicators);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingIndicator, setEditingIndicator] = useState(null);

  const updateDomainWeight = (domainId, newWeight) => {
    setDomains(prev =>
      prev.map(d => d.id === domainId ? { ...d, weight: newWeight / 100 } : d)
    );
    success('Domain weight updated');
  };

  const handleEditIndicator = (indicator) => {
    setEditingIndicator(indicator);
    setShowEditModal(true);
  };

  const handleSaveIndicator = () => {
    success('Indicator changes proposed for review');
    setShowEditModal(false);
    setEditingIndicator(null);
  };

  const getStatusVariant = (status) => {
    if (status === 'active') return 'success';
    if (status === 'pending_review') return 'warning';
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

        {/* Indicators Table */}
        <Card title="Evaluation Indicators" padding="none">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Domain
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Weight
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {indicators.map((indicator) => (
                  <tr key={indicator.code} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{indicator.code}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{indicator.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{indicator.domain}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{indicator.weight}/5</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">{indicator.data_source}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusVariant(indicator.status)}>
                        {indicator.status.replace(/_/g, ' ')}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditIndicator(indicator)}
                        icon={<Edit className="w-4 h-4" />}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-200">
            <Button
              variant="primary"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => {
                setEditingIndicator({
                  code: '',
                  name: '',
                  domain: 'Excellence',
                  weight: 3,
                  data_source: '',
                  status: 'pending_review',
                });
                setShowEditModal(true);
              }}
            >
              Propose New Indicator
            </Button>
          </div>
        </Card>

        {/* Edit Indicator Modal */}
        <Modal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingIndicator(null);
          }}
          title={editingIndicator?.code ? 'Edit Indicator' : 'Propose New Indicator'}
          size="lg"
          footer={
            <>
              <Button variant="outline" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveIndicator} icon={<Save className="w-4 h-4" />}>
                Save Changes
              </Button>
            </>
          }
        >
          {editingIndicator && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Indicator Code
                </label>
                <input
                  type="text"
                  value={editingIndicator.code}
                  onChange={(e) => setEditingIndicator({ ...editingIndicator, code: e.target.value })}
                  className="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="E301"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Indicator Name
                </label>
                <input
                  type="text"
                  value={editingIndicator.name}
                  onChange={(e) => setEditingIndicator({ ...editingIndicator, name: e.target.value })}
                  className="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Professional Development Hours"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Domain
                  </label>
                  <select
                    value={editingIndicator.domain}
                    onChange={(e) => setEditingIndicator({ ...editingIndicator, domain: e.target.value })}
                    className="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="Compliance">Compliance</option>
                    <option value="Excellence">Excellence</option>
                    <option value="Satisfaction">Satisfaction</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight (1-5)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={editingIndicator.weight}
                    onChange={(e) => setEditingIndicator({ ...editingIndicator, weight: parseInt(e.target.value) })}
                    className="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data Source
                </label>
                <input
                  type="text"
                  value={editingIndicator.data_source}
                  onChange={(e) => setEditingIndicator({ ...editingIndicator, data_source: e.target.value })}
                  className="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Ministry HR System"
                />
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> All changes will be submitted for committee review and approval
                  before taking effect.
                </p>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default CommitteeDashboard;
