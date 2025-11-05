import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

const DisableIndicatorModal = ({ isOpen, onClose, onConfirm, indicator, action = 'disable' }) => {
  const [reason, setReason] = useState('');

  if (!isOpen || !indicator) return null;

  const isDisabling = action === 'disable';
  const title = isDisabling ? 'Confirm Disable Indicator' : 'Confirm Enable Indicator';
  const actionText = isDisabling ? 'Disable' : 'Enable';
  const actionColor = isDisabling ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700';

  const handleConfirm = () => {
    onConfirm(indicator.indicator_code, action, reason);
    setReason('');
    onClose();
  };

  const handleCancel = () => {
    setReason('');
    onClose();
  };

  // Mock usage statistics
  const usageCount = indicator.usage_statistics?.total_evaluations || 0;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleCancel} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="text-amber-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            </div>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <p className="text-gray-700">
              {isDisabling
                ? 'Are you sure you want to disable this indicator?'
                : 'Are you sure you want to re-enable this indicator?'}
            </p>

            {/* Indicator Info */}
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="font-semibold text-gray-900">
                [{indicator.indicator_code}] {indicator.indicator_name}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Domain: {indicator.domain} • Weight: {indicator.weight}
              </p>
            </div>

            {/* Impact Information */}
            {isDisabling ? (
              <div className="space-y-2">
                <p className="font-medium text-gray-900">Impact:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Will be removed from all NEW evaluation requests</li>
                  <li>Currently used in: {usageCount.toLocaleString()} evaluations (historical)</li>
                  <li>Historical data will remain intact and accessible</li>
                  <li>Can be re-enabled anytime</li>
                </ul>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="font-medium text-gray-900">Impact:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Will be included in all NEW evaluation requests</li>
                  <li>Previous usage: {usageCount.toLocaleString()} evaluations</li>
                  <li>Historical data remains accessible</li>
                </ul>
              </div>
            )}

            {/* Reason Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for {isDisabling ? 'disabling' : 'enabling'} (optional):
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={
                  isDisabling
                    ? 'e.g., Replaced by new indicator with updated formula'
                    : 'e.g., Restored after review'
                }
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md ${actionColor}`}
            >
              Confirm {actionText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisableIndicatorModal;
