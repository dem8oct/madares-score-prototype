import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEvaluation } from '../../context/EvaluationContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import {
  AlertCircle,
  CheckCircle,
  Upload,
  Save,
  Send,
  FileText,
  Award,
  Heart,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { mockSchools } from '../../data/mockData';

const SchoolEvaluationPage = () => {
  const { schoolId } = useParams();
  const navigate = useNavigate();
  const { getEvaluation, updateComplianceAnswer, submitEvaluation } = useEvaluation();
  const { language, t } = useLanguage();
  const { showToast } = useToast();

  const [school, setSchool] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const [activeSection, setActiveSection] = useState('compliance');
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Find school
    const foundSchool = mockSchools.find(s => s.id === schoolId);
    if (!foundSchool) {
      showToast('School not found', 'error');
      navigate('/');
      return;
    }
    setSchool(foundSchool);

    // Find evaluation
    if (foundSchool.current_evaluation_id) {
      const foundEval = getEvaluation(foundSchool.current_evaluation_id);
      if (foundEval) {
        setEvaluation(foundEval);
        // Initialize form data from evaluation
        const initialData = {};
        foundEval.compliance_data?.questions?.forEach(q => {
          initialData[q.id] = {
            answer: q.answer,
            evidence: q.evidence || []
          };
        });
        setFormData(initialData);
      }
    }
  }, [schoolId, getEvaluation]);

  const handleAnswerChange = (questionId, answer) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        answer
      }
    }));
  };

  const handleSaveDraft = () => {
    // Save all answers
    Object.keys(formData).forEach(questionId => {
      const data = formData[questionId];
      updateComplianceAnswer(evaluation.id, questionId, data.answer, data.evidence);
    });
    showToast('Draft saved successfully', 'success');
  };

  const handleSubmit = () => {
    // Validate all required fields are filled
    const allAnswered = evaluation.compliance_data.questions.every(q =>
      formData[q.id]?.answer !== null && formData[q.id]?.answer !== undefined
    );

    if (!allAnswered) {
      showToast('Please answer all questions before submitting', 'error');
      return;
    }

    // Save and submit
    handleSaveDraft();
    submitEvaluation(evaluation.id);
    showToast('Evaluation submitted for review', 'success');
  };

  if (!school || !evaluation) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading evaluation...</p>
        </div>
      </div>
    );
  }

  const isReturned = evaluation.status === 'returned_for_correction';
  const pendingCorrections = evaluation.pending_items?.filter(
    item => item.type === 'correction_requested'
  ) || [];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {language === 'ar' ? school.name_ar : school.name}
            </h1>
            <p className="text-gray-600">
              {school.level} • {school.gender_model} • {school.city}
            </p>
          </div>
          <div className="text-right">
            <Badge
              variant={isReturned ? 'danger' : 'warning'}
              size="lg"
            >
              {isReturned ? (
                <>
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  Returned for Correction (v{evaluation.version})
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4 mr-1" />
                  In Progress ({evaluation.completion_percentage}%)
                </>
              )}
            </Badge>
          </div>
        </div>

        {/* Alert Banner for Returned Evaluations */}
        {isReturned && pendingCorrections.length > 0 && (
          <div className="bg-danger-50 border-l-4 border-danger-500 p-4 mb-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-danger-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-danger-800 font-semibold mb-1">
                  Action Required: {pendingCorrections.length} Item(s) Need Correction
                </h3>
                <ul className="text-danger-700 text-sm space-y-1">
                  {pendingCorrections.map((item, idx) => (
                    <li key={idx}>
                      • {item.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${evaluation.completion_percentage}%` }}
          />
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex space-x-1 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveSection('compliance')}
          className={`px-4 py-3 font-medium flex items-center gap-2 border-b-2 transition-colors ${
            activeSection === 'compliance'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <FileText className="w-5 h-5" />
          Compliance
          {pendingCorrections.length > 0 && (
            <Badge variant="danger" size="sm">{pendingCorrections.length}</Badge>
          )}
        </button>
        <button
          onClick={() => setActiveSection('excellence')}
          className={`px-4 py-3 font-medium flex items-center gap-2 border-b-2 transition-colors ${
            activeSection === 'excellence'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <Award className="w-5 h-5" />
          Excellence Indicators
        </button>
        <button
          onClick={() => setActiveSection('satisfaction')}
          className={`px-4 py-3 font-medium flex items-center gap-2 border-b-2 transition-colors ${
            activeSection === 'satisfaction'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <Heart className="w-5 h-5" />
          Satisfaction Indicators
        </button>
      </div>

      {/* Section Content */}
      {activeSection === 'compliance' && (
        <ComplianceSection
          evaluation={evaluation}
          formData={formData}
          onAnswerChange={handleAnswerChange}
          isReturned={isReturned}
          language={language}
        />
      )}

      {activeSection === 'excellence' && (
        <ExcellenceSection
          evaluation={evaluation}
          language={language}
        />
      )}

      {activeSection === 'satisfaction' && (
        <SatisfactionSection
          evaluation={evaluation}
          language={language}
        />
      )}

      {/* Action Buttons */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 mt-8 flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={handleSaveDraft}
          leftIcon={<Save className="w-4 h-4" />}
        >
          Save Draft
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          leftIcon={<Send className="w-4 h-4" />}
          disabled={evaluation.completion_percentage < 100}
        >
          {isReturned ? 'Resubmit for Review' : 'Submit for Review'}
        </Button>
      </div>
    </div>
  );
};

// Compliance Section Component
const ComplianceSection = ({ evaluation, formData, onAnswerChange, isReturned, language }) => {
  const questions = evaluation.compliance_data?.questions || [];

  return (
    <div className="space-y-4">
      {questions.map((question) => {
        const hasCorrection = question.ops_review?.status === 'return_for_correction';
        const isAccepted = question.status === 'accepted';

        return (
          <Card key={question.id} className={hasCorrection ? 'border-2 border-danger-500' : ''}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {language === 'ar' ? question.question_ar : question.question}
                </h3>
                {question.ops_review?.comment && (
                  <div className={`mt-2 p-3 rounded-lg ${
                    hasCorrection ? 'bg-danger-50 border border-danger-200' : 'bg-success-50 border border-success-200'
                  }`}>
                    <p className={`text-sm font-medium ${
                      hasCorrection ? 'text-danger-800' : 'text-success-800'
                    }`}>
                      {hasCorrection ? 'Reviewer Comment:' : 'Approved'}
                    </p>
                    <p className={`text-sm mt-1 ${
                      hasCorrection ? 'text-danger-700' : 'text-success-700'
                    }`}>
                      {language === 'ar' ? question.ops_review.comment_ar : question.ops_review.comment}
                    </p>
                  </div>
                )}
              </div>
              <div className="ml-4">
                {isAccepted && (
                  <Badge variant="success">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Accepted
                  </Badge>
                )}
                {hasCorrection && (
                  <Badge variant="danger">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    Needs Correction
                  </Badge>
                )}
              </div>
            </div>

            {/* Question Input */}
            {question.type === 'yes_no' && (
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={question.id}
                    value="yes"
                    checked={formData[question.id]?.answer === 'yes'}
                    onChange={(e) => onAnswerChange(question.id, e.target.value)}
                    className="w-4 h-4 text-primary-600"
                  />
                  <span className="text-gray-700">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={question.id}
                    value="no"
                    checked={formData[question.id]?.answer === 'no'}
                    onChange={(e) => onAnswerChange(question.id, e.target.value)}
                    className="w-4 h-4 text-primary-600"
                  />
                  <span className="text-gray-700">No</span>
                </label>
              </div>
            )}

            {question.type === 'number' && (
              <input
                type="number"
                value={formData[question.id]?.answer || ''}
                onChange={(e) => onAnswerChange(question.id, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter number"
              />
            )}

            {question.type === 'file_upload' && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Click to upload or drag and drop
                </p>
                {question.evidence?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2 justify-center">
                    {question.evidence.map((file, idx) => (
                      <Badge key={idx} variant="default">
                        <FileText className="w-3 h-3 mr-1" />
                        {file}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
};

// Excellence Section Component
const ExcellenceSection = ({ evaluation, language }) => {
  const indicators = evaluation.excellence_indicators || [];

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <p className="text-blue-800 text-sm">
          <strong>Note:</strong> Excellence indicators are automatically calculated from your school's data in connected systems (Noor, MoE, etc.).
          These values are read-only and updated in real-time.
        </p>
      </div>

      {indicators.map((indicator) => (
        <Card key={indicator.code}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">
                {language === 'ar' ? indicator.name_ar : indicator.name}
              </h3>
              <p className="text-sm text-gray-600">
                Code: {indicator.code} • Weight: {indicator.weight} • Source: {indicator.data_source}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary-600">
                {indicator.score.toFixed(1)}
              </div>
              <div className="text-xs text-gray-500">out of 100</div>
            </div>
          </div>

          {/* Indicator Details */}
          {indicator.details && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                {Object.entries(indicator.details).map(([key, value]) => (
                  <div key={key}>
                    <span className="text-gray-600 capitalize">
                      {key.replace(/_/g, ' ')}:
                    </span>
                    <span className="ml-2 font-medium text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

// Satisfaction Section Component
const SatisfactionSection = ({ evaluation, language }) => {
  const indicators = evaluation.satisfaction_indicators || [];

  return (
    <div className="space-y-4">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
        <p className="text-purple-800 text-sm">
          <strong>Note:</strong> Satisfaction indicators are calculated from surveys, incident reports, and other stakeholder feedback systems.
          These values reflect real-time data from various sources.
        </p>
      </div>

      {indicators.map((indicator) => (
        <Card key={indicator.code}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">
                {language === 'ar' ? indicator.name_ar : indicator.name}
              </h3>
              <p className="text-sm text-gray-600">
                Code: {indicator.code} • Weight: {indicator.weight} • Source: {indicator.data_source}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-purple-600">
                {indicator.score.toFixed(1)}
              </div>
              <div className="text-xs text-gray-500">out of 100</div>
            </div>
          </div>

          {/* Indicator Details */}
          {indicator.details && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                {Object.entries(indicator.details).map(([key, value]) => (
                  <div key={key}>
                    <span className="text-gray-600 capitalize">
                      {key.replace(/_/g, ' ')}:
                    </span>
                    <span className="ml-2 font-medium text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default SchoolEvaluationPage;
