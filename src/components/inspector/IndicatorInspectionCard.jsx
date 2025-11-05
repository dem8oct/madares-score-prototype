import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, XCircle, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import clsx from 'clsx';
import DiscrepancyForm from './DiscrepancyForm';

const IndicatorInspectionCard = ({ indicator, onUpdateFinding }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [findingStatus, setFindingStatus] = useState(indicator.status || 'Pending');
  const [showDiscrepancyForm, setShowDiscrepancyForm] = useState(false);

  const statusOptions = [
    { value: 'Verified', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
    { value: 'Discrepancy Found', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
    { value: 'Unable to Verify', icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' }
  ];

  const handleStatusChange = (newStatus) => {
    setFindingStatus(newStatus);
    setShowDiscrepancyForm(newStatus === 'Discrepancy Found');

    if (newStatus === 'Verified') {
      onUpdateFinding(indicator.indicator_code, {
        finding_status: 'Verified',
        discrepancy_type: null,
        severity: null,
        notes: 'Findings match school\'s claim. No issues found.',
        evidence_files: [],
        inspector_comment: 'Verified during inspection.',
        recorded_at: new Date().toISOString()
      });
    }
  };

  const handleSaveDiscrepancy = (discrepancyData) => {
    onUpdateFinding(indicator.indicator_code, {
      finding_status: 'Discrepancy Found',
      ...discrepancyData,
      recorded_at: new Date().toISOString()
    });
    setShowDiscrepancyForm(false);
  };

  const currentStatusConfig = statusOptions.find(s => s.value === findingStatus);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              [{indicator.indicator_code}] {indicator.indicator_name}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {indicator.domain} • {indicator.sub_category}
            </p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-gray-600"
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* School's Claim */}
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <div className="flex items-center space-x-2 mb-2">
              <FileText size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-900">School's Claim:</span>
            </div>
            <p className="text-sm text-gray-700 mb-3">"{indicator.school_claim}"</p>

            {indicator.school_evidence && indicator.school_evidence.length > 0 && (
              <div>
                <span className="text-xs text-blue-800 font-medium">Evidence:</span>
                <div className="mt-1 space-y-1">
                  {indicator.school_evidence.map((file, idx) => (
                    <div key={idx} className="text-xs text-blue-700 flex items-center space-x-1">
                      <span>📎</span>
                      <span>{file}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-4"></div>

          {/* Inspector's Findings */}
          <div>
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-900">Inspector's Findings:</span>
            </div>

            {/* Status Selection */}
            <div className="space-y-3">
              {statusOptions.map(option => {
                const Icon = option.icon;
                const isSelected = findingStatus === option.value;

                return (
                  <label
                    key={option.value}
                    className={clsx(
                      'flex items-center space-x-3 p-3 border-2 rounded-md cursor-pointer transition-colors',
                      isSelected
                        ? `${option.border} ${option.bg}`
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    )}
                  >
                    <input
                      type="radio"
                      name={`status-${indicator.indicator_code}`}
                      value={option.value}
                      checked={isSelected}
                      onChange={() => handleStatusChange(option.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <Icon size={20} className={option.color} />
                    <span className={clsx('text-sm font-medium', isSelected ? option.color : 'text-gray-700')}>
                      {option.value}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* Verified Message */}
            {findingStatus === 'Verified' && !showDiscrepancyForm && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-900">✅ Findings match school's claim</p>
              </div>
            )}

            {/* Unable to Verify Message */}
            {findingStatus === 'Unable to Verify' && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Unable to Verify:
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Explain why you were unable to verify this indicator..."
                />
              </div>
            )}

            {/* Discrepancy Form */}
            {showDiscrepancyForm && findingStatus === 'Discrepancy Found' && (
              <div className="mt-4">
                <DiscrepancyForm
                  onSave={handleSaveDiscrepancy}
                  initialData={indicator.findings}
                />
              </div>
            )}

            {/* Existing Findings Display */}
            {indicator.findings && !showDiscrepancyForm && findingStatus === 'Discrepancy Found' && (
              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-amber-900">Type:</span>
                    <span className="text-sm text-amber-800 ml-2">{indicator.findings.discrepancy_type}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-amber-900">Severity:</span>
                    <span className="text-sm text-amber-800 ml-2">{indicator.findings.severity}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-amber-900">Notes:</span>
                    <p className="text-sm text-amber-800 mt-1">{indicator.findings.notes}</p>
                  </div>
                  {indicator.findings.evidence_files && indicator.findings.evidence_files.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-amber-900">Evidence:</span>
                      <div className="mt-1 space-y-1">
                        {indicator.findings.evidence_files.map((file, idx) => (
                          <div key={idx} className="text-sm text-amber-800">
                            📷 {file.filename}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => setShowDiscrepancyForm(true)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Edit Findings
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mark as Complete Button */}
          {findingStatus !== 'Pending' && (
            <div className="pt-3 border-t border-gray-200">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">
                Mark as Complete
              </button>
            </div>
          )}
        </div>
      )}

      {/* Collapsed Status Badge */}
      {!isExpanded && (
        <div className="px-4 pb-4">
          {currentStatusConfig && (
            <span className={clsx('inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium', currentStatusConfig.bg, currentStatusConfig.color)}>
              {React.createElement(currentStatusConfig.icon, { size: 16 })}
              <span>{findingStatus}</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default IndicatorInspectionCard;
