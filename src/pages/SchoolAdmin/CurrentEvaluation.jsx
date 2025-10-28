import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEvaluation } from '../../context/EvaluationContext';
import { useToast } from '../../context/ToastContext';
import { mockSchools } from '../../data/mockData';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import ProgressBar from '../../components/common/ProgressBar';
import Modal from '../../components/common/Modal';
import { AlertCircle, Upload, FileText, CheckCircle } from 'lucide-react';

const CurrentEvaluation = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { evaluations, getEvaluation, updateComplianceAnswer, submitEvaluation } = useEvaluation();
  const { success, error } = useToast();

  const [evaluation, setEvaluation] = useState(null);
  const [activeTab, setActiveTab] = useState('compliance');
  const [schoolNotes, setSchoolNotes] = useState('');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => {
    // Find the school for this user
    const school = mockSchools.find(s => s.id === user?.school_id);
    if (school && school.current_evaluation_id) {
      const foundEvaluation = getEvaluation(school.current_evaluation_id);
      if (foundEvaluation) {
        setEvaluation(foundEvaluation);
        setSchoolNotes(foundEvaluation.school_notes || '');
      }
    }
  }, [user, getEvaluation]);

  if (!evaluation) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Card>
          <div className="text-center py-8">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Active Evaluation</h2>
            <p className="text-gray-600 mb-4">You don't have any active evaluation requests at the moment.</p>
            <Button onClick={() => navigate('/school')}>Back to Dashboard</Button>
          </div>
        </Card>
      </div>
    );
  }

  // Helper to get status color
  const getStatusColor = (status) => {
    const colors = {
      in_progress: 'warning',
      submitted: 'primary',
      returned_for_correction: 'danger',
      approved: 'success',
    };
    return colors[status] || 'default';
  };

  // Handle answer change
  const handleAnswerChange = (questionId, answer) => {
    updateComplianceAnswer(evaluation.id, questionId, answer,
      evaluation.compliance_data.questions.find(q => q.id === questionId)?.evidence || []
    );
    success('Answer saved');
  };

  // Simulate file upload
  const handleFileUpload = (questionId, file) => {
    const question = evaluation.compliance_data.questions.find(q => q.id === questionId);
    const existingEvidence = question?.evidence || [];
    const newEvidence = [...existingEvidence, file.name];

    updateComplianceAnswer(evaluation.id, questionId, question?.answer, newEvidence);
    success(`File "${file.name}" uploaded successfully`);
  };

  // Remove uploaded file
  const handleFileRemove = (questionId, fileName) => {
    const question = evaluation.compliance_data.questions.find(q => q.id === questionId);
    const updatedEvidence = question.evidence.filter(f => f !== fileName);

    updateComplianceAnswer(evaluation.id, questionId, question.answer, updatedEvidence);
    success('File removed');
  };

  // Save draft
  const handleSaveDraft = () => {
    // In real app, would save schoolNotes
    success('Draft saved successfully');
  };

  // Submit for review
  const handleSubmit = () => {
    if (evaluation.completion_percentage < 100) {
      error('Please complete all required fields before submitting');
      return;
    }
    setShowSubmitModal(true);
  };

  const confirmSubmit = () => {
    submitEvaluation(evaluation.id);
    success('Evaluation submitted for review');
    setShowSubmitModal(false);
    navigate('/school');
  };

  // Calculate days remaining
  const getDaysRemaining = () => {
    const today = new Date();
    const deadline = new Date(evaluation.deadline);
    const days = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    return days;
  };

  const daysRemaining = getDaysRemaining();

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Request Overview Header */}
      <Card padding="default">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Current Evaluation</h1>
            <p className="text-gray-600 mt-1">{evaluation.school_name}</p>
          </div>
          <Badge variant={getStatusColor(evaluation.status)} size="lg">
            {evaluation.status.replace(/_/g, ' ').toUpperCase()}
          </Badge>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <div>
            <div className="text-sm text-gray-600">Version</div>
            <div className="text-lg font-semibold text-gray-900">{evaluation.version}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Status</div>
            <div className="text-lg font-semibold text-gray-900">
              {evaluation.status.replace(/_/g, ' ').toUpperCase()}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Deadline</div>
            <div className={`text-lg font-semibold ${daysRemaining < 3 ? 'text-danger-600' : daysRemaining < 7 ? 'text-warning-600' : 'text-success-600'}`}>
              {daysRemaining} days remaining
            </div>
            <div className="text-xs text-gray-500">{evaluation.deadline}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Completion</div>
            <ProgressBar
              percentage={evaluation.completion_percentage}
              showLabel={false}
              size="md"
            />
            <div className="text-sm font-semibold text-gray-900 mt-1">
              {evaluation.completion_percentage}%
            </div>
          </div>
        </div>
      </Card>

      {/* Pending Items Alert */}
      {evaluation.pending_items && evaluation.pending_items.length > 0 && (
        <Card padding="default" className="border-l-4 border-warning-500 bg-warning-50">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-warning-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-warning-900 mb-2">
                Pending Items ({evaluation.pending_items.length} items need attention)
              </h3>
              <ul className="space-y-2">
                {evaluation.pending_items.map((item, idx) => (
                  <li key={idx} className="text-sm text-warning-800">
                    <strong>{idx + 1}.</strong> {item.description}
                    {item.ops_comment && (
                      <div className="ml-4 mt-1 text-xs italic text-warning-700 bg-warning-100 p-2 rounded">
                        Ops Note: "{item.ops_comment}"
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Domain Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('compliance')}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'compliance'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            Compliance
          </button>
          <button
            onClick={() => setActiveTab('excellence')}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'excellence'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            Institutional Excellence
          </button>
          <button
            onClick={() => setActiveTab('satisfaction')}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'satisfaction'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            Beneficiary Satisfaction
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {/* Compliance Tab */}
        {activeTab === 'compliance' && (
          <Card title="Compliance Questions" padding="default">
            <div className="space-y-8">
              {evaluation.compliance_data.questions.map((question, idx) => (
                <div key={question.id} className="pb-6 border-b border-gray-200 last:border-0">
                  {/* Question Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900 mb-1">
                        Question {idx + 1}: {question.question}
                      </h3>
                      {question.status === 'returned_for_correction' && question.ops_review && (
                        <div className="mt-2 p-3 bg-danger-50 border border-danger-200 rounded-lg">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-danger-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm font-medium text-danger-900">Correction Required</div>
                              <div className="text-sm text-danger-800 mt-1">{question.ops_review.comment}</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    {question.status === 'complete' && (
                      <CheckCircle className="w-6 h-6 text-success-600 flex-shrink-0" />
                    )}
                  </div>

                  {/* Answer Options (for yes/no questions) */}
                  {question.type === 'yes_no' && (
                    <div className="flex gap-4 mb-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={question.id}
                          value="yes"
                          checked={question.answer === 'yes'}
                          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                          className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={question.id}
                          value="no"
                          checked={question.answer === 'no'}
                          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                          className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm font-medium text-gray-700">No</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={question.id}
                          value="n/a"
                          checked={question.answer === 'n/a'}
                          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                          className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm font-medium text-gray-700">N/A</span>
                      </label>
                    </div>
                  )}

                  {/* Number Input (for number questions) */}
                  {question.type === 'number' && (
                    <input
                      type="number"
                      value={question.answer || ''}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      placeholder="Enter number"
                      className="mb-4 w-full max-w-xs border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    />
                  )}

                  {/* File Upload type */}
                  {question.type === 'file_upload' && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Please upload the required document</p>
                    </div>
                  )}

                  {/* Evidence Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Evidence {question.evidence.length === 0 && <span className="text-danger-500">*</span>}
                    </label>

                    {/* Uploaded Files */}
                    {question.evidence && question.evidence.length > 0 && (
                      <div className="space-y-2 mb-3">
                        {question.evidence.map((file, fileIdx) => (
                          <div key={fileIdx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-center gap-2">
                              <FileText className="w-5 h-5 text-gray-400" />
                              <span className="text-sm font-medium text-gray-900">{file}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="text-sm text-primary-600 hover:text-primary-700">View</button>
                              <button
                                onClick={() => handleFileRemove(question.id, file)}
                                className="text-sm text-danger-600 hover:text-danger-700"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Upload Button */}
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        id={`upload-${question.id}`}
                        onChange={(e) => {
                          if (e.target.files[0]) {
                            handleFileUpload(question.id, e.target.files[0]);
                            e.target.value = ''; // Reset input
                          }
                        }}
                        className="hidden"
                      />
                      <label
                        htmlFor={`upload-${question.id}`}
                        className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <Upload className="w-4 h-4" />
                        Choose File
                      </label>
                      {question.evidence.length === 0 && (
                        <span className="text-sm text-gray-500">No files uploaded</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Excellence Tab (Read-Only) */}
        {activeTab === 'excellence' && (
          <Card title="Institutional Excellence Indicators" padding="default">
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <strong>Note:</strong> These indicators are calculated automatically from various data sources.
                  You cannot edit these values directly.
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {evaluation.excellence_indicators.map((indicator) => (
                <div key={indicator.code} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{indicator.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">Weight: {indicator.weight}/5</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary-600">{indicator.score}%</div>
                      <div className="text-xs text-gray-500 mt-1">Calculated by System</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Data Source: {indicator.data_source}
                  </div>
                  {indicator.details && (
                    <div className="mt-2 text-xs text-gray-500">
                      Details: {JSON.stringify(indicator.details)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Satisfaction Tab (Read-Only) */}
        {activeTab === 'satisfaction' && (
          <Card title="Beneficiary Satisfaction Indicators" padding="default">
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <strong>Note:</strong> These indicators are derived from surveys and incident reports.
                  You cannot edit these values directly.
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {evaluation.satisfaction_indicators.map((indicator) => (
                <div key={indicator.code} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{indicator.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">Weight: {indicator.weight}/5</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary-600">{indicator.score}%</div>
                      <div className="text-xs text-gray-500 mt-1">Calculated by System</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Data Source: {indicator.data_source}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* School Notes */}
      <Card title="School Notes (Optional)" padding="default">
        <textarea
          value={schoolNotes}
          onChange={(e) => setSchoolNotes(e.target.value)}
          placeholder="Add any notes or context for reviewers..."
          rows={4}
          className="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
        />
        <p className="text-sm text-gray-500 mt-2">
          These notes will be visible to Ministry reviewers.
        </p>
      </Card>

      {/* Navigation and Actions */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => navigate('/school')}
        >
          Back to Dashboard
        </Button>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
          >
            Save Draft
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={evaluation.completion_percentage < 100}
          >
            Submit for Review
          </Button>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Submit Evaluation for Review?"
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowSubmitModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={confirmSubmit}>
              Confirm Submit
            </Button>
          </>
        }
      >
        <p className="text-gray-700">
          Once submitted, you cannot make changes until your submission is reviewed by Ministry staff.
          They may request corrections.
        </p>
        <div className="mt-4 p-3 bg-gray-50 rounded">
          <div className="text-sm text-gray-600">
            <strong>Completion:</strong> {evaluation.completion_percentage}%
          </div>
          <div className="text-sm text-gray-600 mt-1">
            <strong>Version:</strong> {evaluation.version}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CurrentEvaluation;
