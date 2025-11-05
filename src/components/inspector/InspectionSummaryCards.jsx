import React from 'react';
import { Building2, CheckCircle2, Clock } from 'lucide-react';

const InspectionSummaryCards = ({ assignments }) => {
  const assignedCount = assignments.length;
  const completedToday = assignments.filter(
    a => a.status === 'Completed' &&
    new Date(a.completed_at).toDateString() === new Date().toDateString()
  ).length;
  const pendingThisWeek = assignments.filter(a => a.status === 'Pending').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Assigned Schools */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Assigned Schools</p>
            <p className="text-3xl font-bold text-gray-900">{assignedCount}</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Completed Today */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Completed Today</p>
            <p className="text-3xl font-bold text-green-600">{completedToday}</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      {/* Pending This Week */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Pending This Week</p>
            <p className="text-3xl font-bold text-amber-600">{pendingThisWeek}</p>
          </div>
          <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
            <Clock className="w-6 h-6 text-amber-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionSummaryCards;
