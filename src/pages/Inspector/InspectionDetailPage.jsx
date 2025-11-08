import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Send } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { inspectorAssignments, getAssignmentById } from '../../data/inspectorAssignments';
import IndicatorInspectionCard from '../../components/inspector/IndicatorInspectionCard';
import { getFirstName } from '../../utils/nameUtils';

const InspectionDetailPage = () => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();

  const [assignment, setAssignment] = useState(() => {
    const found = getAssignmentById(assignmentId);
    return found || null;
  });

  const [generalNotes, setGeneralNotes] = useState(assignment?.general_notes || '');

  if (!assignment) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
          <p className="text-gray-600">Assignment not found.</p>
          <button
            onClick={() => navigate('/inspector/dashboard')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleUpdateFinding = (indicatorCode, findingData) => {
    setAssignment(prev => ({
      ...prev,
      assigned_indicators: prev.assigned_indicators.map(ind =>
        ind.indicator_code === indicatorCode
          ? { ...ind, findings: findingData, status: findingData.finding_status }
          : ind
      )
    }));
  };

  const handleSaveDraft = () => {
    alert('Draft saved successfully!');
  };

  const handleSubmitReport = () => {
    const completedCount = assignment.assigned_indicators.filter(
      ind => ind.status !== 'Pending'
    ).length;

    if (completedCount < assignment.assigned_indicators.length) {
      alert(`Please complete all ${assignment.assigned_indicators.length} indicators before submitting. ${completedCount}/${assignment.assigned_indicators.length} completed.`);
      return;
    }

    if (window.confirm('Are you sure you want to submit this inspection report? This action cannot be undone.')) {
      alert('Inspection report submitted successfully!');
      navigate('/inspector/dashboard');
    }
  };

  const completedCount = assignment.assigned_indicators.filter(ind => ind.status !== 'Pending').length;
  const totalCount = assignment.assigned_indicators.length;
  const progress = (completedCount / totalCount) * 100;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/inspector/dashboard')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>

        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                Inspection: {assignment.school_name}
              </h1>
              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <p>
                  Request ID: {assignment.request_id} | Inspector:{' '}
                  <span title={assignment.inspector_name}>{getFirstName(assignment.inspector_name)}</span>
                </p>
                <p>Visit Date: {format(parseISO(assignment.scheduled_visit), 'MMMM dd, yyyy hh:mm a')}</p>
                <p>Status: <span className="font-semibold">{assignment.status}</span></p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{Math.round(progress)}%</div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-600">Progress</span>
              <span className="font-semibold text-gray-900">{completedCount} of {totalCount} indicators</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Indicators to Inspect */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Indicators to Inspect ({totalCount})
          </h2>
          <div className="space-y-4">
            {assignment.assigned_indicators.map((indicator) => (
              <IndicatorInspectionCard
                key={indicator.indicator_code}
                indicator={indicator}
                onUpdateFinding={handleUpdateFinding}
              />
            ))}
          </div>
        </div>

        {/* General Inspection Notes */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            General Inspection Notes (Optional)
          </h3>
          <textarea
            value={generalNotes}
            onChange={(e) => setGeneralNotes(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add any general observations about the school, cooperation level, recommendations, etc..."
          />
          <div className="text-xs text-gray-500 mt-1">
            {generalNotes.length} / 1000 characters
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-end space-x-4">
            <button
              onClick={handleSaveDraft}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium"
            >
              <Save size={20} />
              <span>Save Draft</span>
            </button>
            <button
              onClick={handleSubmitReport}
              disabled={completedCount < totalCount}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
            >
              <Send size={20} />
              <span>Submit Inspection Report</span>
            </button>
          </div>
          {completedCount < totalCount && (
            <p className="text-sm text-amber-600 mt-3 text-right">
              Please complete all indicators before submitting ({completedCount}/{totalCount} completed)
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InspectionDetailPage;
