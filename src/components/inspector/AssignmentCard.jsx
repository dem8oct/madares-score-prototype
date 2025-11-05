import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Calendar, MapPin, FileText, ChevronRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import clsx from 'clsx';

const AssignmentCard = ({ assignment }) => {
  const navigate = useNavigate();

  const getStatusConfig = (status) => {
    switch (status) {
      case 'Pending':
        return {
          color: 'text-gray-700',
          bg: 'bg-gray-100',
          icon: Clock,
          label: 'Pending'
        };
      case 'In Progress':
        return {
          color: 'text-blue-700',
          bg: 'bg-blue-100',
          icon: AlertCircle,
          label: 'In Progress'
        };
      case 'Completed':
        return {
          color: 'text-green-700',
          bg: 'bg-green-100',
          icon: CheckCircle2,
          label: 'Completed'
        };
      default:
        return {
          color: 'text-gray-700',
          bg: 'bg-gray-100',
          icon: Clock,
          label: status
        };
    }
  };

  const statusConfig = getStatusConfig(assignment.status);
  const StatusIcon = statusConfig.icon;
  const visitDate = format(parseISO(assignment.scheduled_visit), 'MMM dd, yyyy hh:mm a');

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Building2 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{assignment.school_name}</h3>
            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <MapPin size={14} />
                <span>{assignment.region} | {assignment.city}</span>
              </div>
              <span className="text-gray-400">|</span>
              <span>{assignment.school_type}</span>
            </div>
          </div>
        </div>
        <span className={clsx('px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1', statusConfig.bg, statusConfig.color)}>
          <StatusIcon size={16} />
          <span>{statusConfig.label}</span>
        </span>
      </div>

      {/* Indicators List */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">
          Assigned Indicators: {assignment.assigned_indicators.length}
        </p>
        <div className="space-y-1">
          {assignment.assigned_indicators.slice(0, 5).map((indicator, idx) => (
            <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
              <span className="font-medium text-gray-700">[{indicator.indicator_code}]</span>
              <span>{indicator.indicator_name}</span>
            </div>
          ))}
          {assignment.assigned_indicators.length > 5 && (
            <div className="text-sm text-gray-500 pl-3.5">
              +{assignment.assigned_indicators.length - 5} more
            </div>
          )}
        </div>
      </div>

      {/* Visit Date */}
      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-200">
        <Calendar size={16} />
        <span className="font-medium">Scheduled Visit:</span>
        <span>{visitDate}</span>
      </div>

      {/* Progress (if in progress) */}
      {assignment.status === 'In Progress' && assignment.progress !== undefined && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600">Progress</span>
            <span className="font-semibold text-gray-900">{Math.round(assignment.progress * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${assignment.progress * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Findings Count (if completed) */}
      {assignment.status === 'Completed' && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
          <div className="flex items-center space-x-2 text-sm">
            <AlertCircle size={16} className="text-amber-600" />
            <span className="text-amber-900">
              Completed: {format(parseISO(assignment.completed_at), 'MMM dd, yyyy')}
            </span>
            {assignment.assigned_indicators.filter(i => i.status === 'Discrepancy Found').length > 0 && (
              <>
                <span className="text-amber-600">|</span>
                <span className="text-amber-900 font-medium">
                  {assignment.assigned_indicators.filter(i => i.status === 'Discrepancy Found').length} discrepancies found
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center space-x-3">
        {assignment.status === 'Pending' && (
          <>
            <button
              onClick={() => navigate(`/inspector/inspection/${assignment.assignment_id}`)}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium flex items-center justify-center space-x-2"
            >
              <span>Start Inspection</span>
              <ChevronRight size={16} />
            </button>
            <button
              onClick={() => navigate(`/inspector/inspection/${assignment.assignment_id}`)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium"
            >
              View Details
            </button>
          </>
        )}
        {assignment.status === 'In Progress' && (
          <>
            <button
              onClick={() => navigate(`/inspector/inspection/${assignment.assignment_id}`)}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium flex items-center justify-center space-x-2"
            >
              <span>Continue Inspection</span>
              <ChevronRight size={16} />
            </button>
            <button
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium"
            >
              Submit Report
            </button>
          </>
        )}
        {assignment.status === 'Completed' && (
          <>
            <button
              onClick={() => navigate(`/inspector/inspection/${assignment.assignment_id}`)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium"
            >
              View Report
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium">
              Download PDF
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AssignmentCard;
