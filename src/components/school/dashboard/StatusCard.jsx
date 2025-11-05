import React from 'react';
import { AlertCircle, CheckCircle2, Clock, FileCheck } from 'lucide-react';
import KPICard from './KPICard';

const StatusCard = ({ data }) => {
  const { status, status_code, version, max_versions, action_required_by } = data;

  // Determine status styling and icon
  const getStatusConfig = () => {
    switch (status_code) {
      case 'in_progress':
        return {
          icon: Clock,
          color: 'text-blue-600',
          bg: 'bg-blue-100',
          indicator: '🔵',
          label: 'In Progress'
        };
      case 'returned':
        return {
          icon: AlertCircle,
          color: 'text-amber-600',
          bg: 'bg-amber-100',
          indicator: '🟠',
          label: 'Returned for Correction'
        };
      case 'submitted':
        return {
          icon: FileCheck,
          color: 'text-green-600',
          bg: 'bg-green-100',
          indicator: '🟢',
          label: 'Submitted'
        };
      case 'under_review':
        return {
          icon: Clock,
          color: 'text-purple-600',
          bg: 'bg-purple-100',
          indicator: '🔵',
          label: 'Under Review'
        };
      case 'approved':
        return {
          icon: CheckCircle2,
          color: 'text-green-600',
          bg: 'bg-green-100',
          indicator: '✅',
          label: 'Approved'
        };
      case 'overdue':
        return {
          icon: AlertCircle,
          color: 'text-red-600',
          bg: 'bg-red-100',
          indicator: '🔴',
          label: 'Overdue'
        };
      default:
        return {
          icon: Clock,
          color: 'text-gray-600',
          bg: 'bg-gray-100',
          indicator: '⚪',
          label: status
        };
    }
  };

  const config = getStatusConfig();
  const StatusIcon = config.icon;

  return (
    <KPICard title="Evaluation Status">
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Status Icon */}
        <div className={`flex items-center justify-center w-16 h-16 rounded-full ${config.bg}`}>
          <StatusIcon size={32} className={config.color} />
        </div>

        {/* Status Text */}
        <div className="text-center space-y-1">
          <div className={`text-lg font-semibold ${config.color}`}>
            {status}
          </div>
          <div className="text-sm text-gray-600">
            v{version}/{max_versions}
          </div>
        </div>

        {/* Status Indicator */}
        <div className="text-2xl">
          {config.indicator}
        </div>

        {/* Action Required */}
        {action_required_by === 'school' && (
          <div className="w-full p-2 bg-amber-50 border border-amber-200 rounded-md">
            <div className="text-xs text-center text-amber-800 font-medium">
              Action needed by you
            </div>
          </div>
        )}

        {action_required_by === 'ops' && (
          <div className="w-full p-2 bg-blue-50 border border-blue-200 rounded-md">
            <div className="text-xs text-center text-blue-800 font-medium">
              Waiting on reviewer
            </div>
          </div>
        )}
      </div>
    </KPICard>
  );
};

export default StatusCard;
