import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Table from '../../common/Table';
import IndicatorStatusToggle from './IndicatorStatusToggle';
import DisableIndicatorModal from './DisableIndicatorModal';
import { indicatorsWithStatus } from '../../../data/indicatorsWithStatus';

const IndicatorsTabEnhanced = ({ onOpenModal }) => {
  const [indicators, setIndicators] = useState(indicatorsWithStatus);
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'Active', 'Disabled'
  const [searchTerm, setSearchTerm] = useState('');
  const [modalState, setModalState] = useState({
    isOpen: false,
    indicator: null,
    action: 'disable'
  });

  // Filter indicators
  const filteredIndicators = indicators.filter(ind => {
    const matchesStatus = filterStatus === 'all' || ind.status === filterStatus;
    const matchesSearch =
      ind.indicator_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ind.indicator_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ind.domain.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Handle status toggle
  const handleStatusChange = (newStatus, indicatorCode) => {
    const indicator = indicators.find(ind => ind.indicator_code === indicatorCode);

    if (indicator) {
      setModalState({
        isOpen: true,
        indicator: indicator,
        action: newStatus === 'Disabled' ? 'disable' : 'enable'
      });
    }
  };

  // Confirm status change
  const handleConfirmStatusChange = (indicatorCode, action, reason) => {
    const newStatus = action === 'disable' ? 'Disabled' : 'Active';
    const now = new Date().toISOString();

    setIndicators(prev => prev.map(ind => {
      if (ind.indicator_code === indicatorCode) {
        return {
          ...ind,
          status: newStatus,
          ...(action === 'disable' ? {
            disabled_at: now,
            disabled_by: 'Current User',
            disable_reason: reason
          } : {
            enabled_at: now,
            enabled_by: 'Current User',
            enable_reason: reason
          }),
          last_modified: now
        };
      }
      return ind;
    }));
  };

  const columns = [
    {
      key: 'code',
      label: 'Code',
      sortable: true,
      render: (value, row) => (
        <span className={row.status === 'Disabled' ? 'text-gray-400 line-through' : 'font-medium text-gray-900'}>
          {value}
        </span>
      )
    },
    {
      key: 'name',
      label: 'Indicator Name',
      sortable: true,
      render: (value, row) => (
        <span className={row.status === 'Disabled' ? 'text-gray-400' : 'text-gray-900'}>
          {value}
        </span>
      )
    },
    {
      key: 'domain',
      label: 'Domain',
      sortable: true,
      render: (value, row) => (
        <span className={row.status === 'Disabled' ? 'text-gray-400' : 'text-gray-700'}>
          {value}
        </span>
      )
    },
    {
      key: 'weight',
      label: 'Weight',
      sortable: true,
      render: (value, row) => (
        <span className={row.status === 'Disabled' ? 'text-gray-400' : 'font-medium text-gray-900'}>
          {value}
        </span>
      )
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      render: (value, row) => {
        const typeLabel = value === 'M' ? 'Mandatory' : 'Automatic';
        return (
          <span className={`text-xs px-2 py-1 rounded-full ${
            row.status === 'Disabled'
              ? 'bg-gray-100 text-gray-400'
              : value === 'M'
              ? 'bg-red-100 text-red-700'
              : 'bg-blue-100 text-blue-700'
          }`}>
            {typeLabel}
          </span>
        );
      }
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value, row) => (
        <IndicatorStatusToggle
          status={value}
          onChange={handleStatusChange}
          indicatorCode={row.indicator_code}
        />
      )
    },
  ];

  const data = filteredIndicators.map(ind => ({
    indicator_code: ind.indicator_code,
    code: ind.indicator_code,
    name: ind.indicator_name,
    domain: ind.domain,
    weight: ind.weight,
    type: ind.type,
    status: ind.status,
  }));

  return (
    <>
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

        {/* Filters */}
        <div className="flex items-center gap-4 mb-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search indicators..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Show:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Indicators</option>
              <option value="Active">Active Only</option>
              <option value="Disabled">Disabled Only</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-600 mb-3">
          Showing {data.length} of {indicators.length} indicators
        </div>

        {/* Table */}
        <Table columns={columns} data={data} />
      </Card>

      {/* Disable/Enable Modal */}
      <DisableIndicatorModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        onConfirm={handleConfirmStatusChange}
        indicator={modalState.indicator}
        action={modalState.action}
      />
    </>
  );
};

export default IndicatorsTabEnhanced;
