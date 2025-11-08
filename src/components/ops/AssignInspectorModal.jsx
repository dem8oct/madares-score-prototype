import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { UserCog, CheckCircle, AlertCircle } from 'lucide-react';
import { getInspectors } from '../../utils/inspectorAssignment';
import { indicatorsWithStatus } from '../../data/indicatorsWithStatus';

const AssignInspectorModal = ({ isOpen, onClose, evaluation, onAssign }) => {
  const [selectedInspector, setSelectedInspector] = useState('');
  const [selectedIndicators, setSelectedIndicators] = useState([]);
  const [inspectors, setInspectors] = useState([]);

  useEffect(() => {
    if (isOpen) {
      // Load inspectors
      const allInspectors = getInspectors();
      setInspectors(allInspectors);

      // Pre-select inspector if already assigned
      if (evaluation?.assigned_inspector) {
        setSelectedInspector(evaluation.assigned_inspector);
      } else {
        setSelectedInspector('');
      }

      // Pre-select all indicators from the evaluation
      // In real app: evaluation would have indicators array
      // For demo: select all active indicators as default
      setSelectedIndicators(
        indicatorsWithStatus
          .filter(ind => ind.status === 'Active')
          .slice(0, 5)
          .map(ind => ind.indicator_code)
      );
    }
  }, [isOpen, evaluation]);

  const handleToggleIndicator = (indicatorCode) => {
    setSelectedIndicators(prev => {
      if (prev.includes(indicatorCode)) {
        return prev.filter(code => code !== indicatorCode);
      } else {
        return [...prev, indicatorCode];
      }
    });
  };

  const handleSelectAll = () => {
    const allActiveCodes = indicatorsWithStatus
      .filter(ind => ind.status === 'Active')
      .map(ind => ind.indicator_code);
    setSelectedIndicators(allActiveCodes);
  };

  const handleClearAll = () => {
    setSelectedIndicators([]);
  };

  const handleSubmit = () => {
    if (!selectedInspector) {
      alert('Please select an inspector');
      return;
    }

    if (selectedIndicators.length === 0) {
      alert('Please select at least one indicator');
      return;
    }

    const selectedInspectorData = inspectors.find(i => i.id === selectedInspector);

    onAssign({
      evaluationId: evaluation.id,
      inspectorId: selectedInspector,
      inspectorName: selectedInspectorData?.name,
      indicators: selectedIndicators
    });

    onClose();
  };

  const getInspectorInfo = (inspector) => {
    const parts = [];
    if (inspector.region) parts.push(inspector.region);
    if (inspector.specialization && inspector.specialization.length > 0) {
      parts.push(inspector.specialization.join(', '));
    }
    return parts.join(' • ');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign Inspector"
      size="lg"
    >
      {evaluation && (
        <div className="space-y-6">
          {/* Evaluation Info */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <UserCog className="w-5 h-5 text-primary-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {evaluation.school_name}
                </p>
                <p className="text-xs text-gray-600 mt-0.5">
                  {evaluation.region} • {evaluation.level} • Deadline: {evaluation.deadline}
                </p>
              </div>
            </div>
          </div>

          {/* Inspector Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Inspector <span className="text-danger-600">*</span>
            </label>
            <select
              value={selectedInspector}
              onChange={(e) => setSelectedInspector(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">-- Select an Inspector --</option>
              {inspectors.map(inspector => (
                <option key={inspector.id} value={inspector.id}>
                  {inspector.name} ({getInspectorInfo(inspector)})
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Inspectors are listed with their region and specialization
            </p>
          </div>

          {/* Indicator Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Select Indicators to Inspect <span className="text-danger-600">*</span>
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                >
                  Select All
                </button>
                <span className="text-xs text-gray-400">|</span>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-xs text-gray-600 hover:text-gray-700 font-medium"
                >
                  Clear All
                </button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg divide-y divide-gray-200 max-h-64 overflow-y-auto">
              {indicatorsWithStatus
                .filter(ind => ind.status === 'Active')
                .map(indicator => {
                  const isSelected = selectedIndicators.includes(indicator.indicator_code);
                  return (
                    <label
                      key={indicator.indicator_code}
                      className={`flex items-start gap-3 p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                        isSelected ? 'bg-primary-50' : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleIndicator(indicator.indicator_code)}
                        className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="default" size="sm">
                            {indicator.indicator_code}
                          </Badge>
                          <span className="text-sm font-medium text-gray-900">
                            {indicator.indicator_name}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          {indicator.domain} • Weight: {indicator.weight}%
                        </p>
                      </div>
                      {isSelected && (
                        <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                      )}
                    </label>
                  );
                })}
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Selected: <span className="font-semibold">{selectedIndicators.length}</span> indicator(s)
            </p>
          </div>

          {/* Warning */}
          {evaluation.assigned_inspector && (
            <div className="p-3 bg-warning-50 border border-warning-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-warning-800">
                This evaluation is already assigned to an inspector. Reassigning will replace the current assignment.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={!selectedInspector || selectedIndicators.length === 0}
            >
              Assign Inspector
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default AssignInspectorModal;
