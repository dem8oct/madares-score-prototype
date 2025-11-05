import React from 'react';
import { AlertCircle, ChevronRight } from 'lucide-react';
import KPICard from './KPICard';

const PendingItemsCard = ({ data, onViewDetails }) => {
  const { total_count, compliance_count, evidence_count } = data;

  const hasItems = total_count > 0;
  const statusColor = hasItems ? 'text-red-600' : 'text-green-600';
  const statusBg = hasItems ? 'bg-red-100' : 'bg-green-100';

  return (
    <KPICard title="Pending Items">
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Count Badge */}
        <div className={`flex items-center justify-center w-20 h-20 rounded-full ${statusBg}`}>
          <span className={`text-4xl font-bold ${statusColor}`}>
            {total_count}
          </span>
        </div>

        {/* Status Text */}
        <div className="text-center">
          <div className={`text-lg font-semibold ${statusColor}`}>
            {hasItems ? 'Items Pending' : 'All Complete'}
          </div>
        </div>

        {/* Breakdown */}
        {hasItems && (
          <div className="w-full space-y-1 text-sm">
            {compliance_count > 0 && (
              <div className="flex justify-between items-center px-2 py-1 bg-gray-50 rounded">
                <span className="text-gray-600">Compliance:</span>
                <span className="font-semibold text-gray-900">{compliance_count}</span>
              </div>
            )}
            {evidence_count > 0 && (
              <div className="flex justify-between items-center px-2 py-1 bg-gray-50 rounded">
                <span className="text-gray-600">Evidence:</span>
                <span className="font-semibold text-gray-900">{evidence_count}</span>
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        {hasItems && (
          <button
            onClick={onViewDetails}
            className="w-full mt-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors flex items-center justify-center space-x-1"
          >
            <span>View Details</span>
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </KPICard>
  );
};

export default PendingItemsCard;
