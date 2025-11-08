import React, { useState } from 'react';
import { inspectorAssignments } from '../../data/inspectorAssignments';
import InspectionSummaryCards from '../../components/inspector/InspectionSummaryCards';
import AssignmentCard from '../../components/inspector/AssignmentCard';
import { getFirstName } from '../../utils/nameUtils';

const InspectorDashboardPage = () => {
  const [assignments] = useState(inspectorAssignments);
  const [filterStatus, setFilterStatus] = useState('all');

  const inspectorInfo = {
    name: 'Omar Al-Rashid',
    id: 'INS-2025-001',
    region: 'Riyadh'
  };

  const filteredAssignments = filterStatus === 'all'
    ? assignments
    : assignments.filter(a => a.status === filterStatus);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Inspector Dashboard</h1>
            <p className="text-gray-600 mt-1" title={inspectorInfo.name}>
              Welcome, {getFirstName(inspectorInfo.name)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Inspector ID</p>
            <p className="font-semibold text-gray-900">{inspectorInfo.id}</p>
          </div>
        </div>

        {/* Summary Cards */}
        <InspectionSummaryCards assignments={assignments} />

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Filter by Status:</span>
            <div className="flex space-x-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filterStatus === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({assignments.length})
              </button>
              <button
                onClick={() => setFilterStatus('Pending')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filterStatus === 'Pending'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pending ({assignments.filter(a => a.status === 'Pending').length})
              </button>
              <button
                onClick={() => setFilterStatus('In Progress')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filterStatus === 'In Progress'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                In Progress ({assignments.filter(a => a.status === 'In Progress').length})
              </button>
              <button
                onClick={() => setFilterStatus('Completed')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filterStatus === 'Completed'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Completed ({assignments.filter(a => a.status === 'Completed').length})
              </button>
            </div>
          </div>
        </div>

        {/* My Inspection Assignments */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            My Inspection Assignments
          </h2>
          <div className="space-y-4">
            {filteredAssignments.map((assignment) => (
              <AssignmentCard key={assignment.assignment_id} assignment={assignment} />
            ))}
          </div>

          {filteredAssignments.length === 0 && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
              <p className="text-gray-600">No assignments found matching the selected filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InspectorDashboardPage;
