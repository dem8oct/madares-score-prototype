import React from 'react';
import Modal from '../../common/Modal';
import Badge from '../../common/Badge';
import { Clock } from 'lucide-react';

const QuestionHistoryModal = ({ isOpen, onClose, question }) => {
  if (!question) return null;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Question History: ${question.question_code}`}
      size="lg"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>Version Timeline</span>
        </div>

        {/* Version History List */}
        <div className="space-y-4">
          {question.version_history.map((version, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border ${
                idx === 0
                  ? 'border-primary-300 bg-primary-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">
                      v{version.version}
                      {idx === 0 && (
                        <Badge variant="primary" size="sm" className="ml-2">
                          Current
                        </Badge>
                      )}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    {formatDate(version.date)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Changed by: <span className="font-medium">{version.changed_by}</span>
                  </p>
                </div>
              </div>

              {/* Changes */}
              {version.changes && version.changes.length > 0 && (
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">Changes:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {version.changes.map((change, changeIdx) => (
                      <li key={changeIdx} className="text-sm text-gray-900">
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Rationale */}
              {version.rationale && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-sm font-medium text-blue-900 mb-1">Rationale:</p>
                  <p className="text-sm text-blue-800">{version.rationale}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default QuestionHistoryModal;
