import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEvaluation } from '../../context/EvaluationContext';
import { formatDate } from '../../data/mockData';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { ArrowLeft, CheckCircle, XCircle, FileText, AlertCircle } from 'lucide-react';

const EvaluationReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEvaluation, updateOpsReview } = useEvaluation();
  const [reviewComments, setReviewComments] = useState({});

  const evaluation = getEvaluation(id);

  if (!evaluation) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Card>
          <div className="text-center py-8">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Evaluation Not Found</h2>
            <p className="text-gray-600 mb-4">The evaluation request you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/ops')}>Back to Dashboard</Button>
          </div>
        </Card>
      </div>
    );
  }

  const handleReview = (questionId, status, comment) => {
    updateOpsReview(id, questionId, status, comment);
    setReviewComments(prev => ({ ...prev, [questionId]: '' }));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      in_progress: { variant: 'default', label: 'In Progress' },
      submitted: { variant: 'primary', label: 'Submitted' },
      under_review: { variant: 'warning', label: 'Under Review' },
      returned_for_correction: { variant: 'danger', label: 'Returned for Correction' },
      pending_committee: { variant: 'warning', label: 'Pending Committee' },
      approved: { variant: 'success', label: 'Approved' },
    };

    const config = statusConfig[status] || { variant: 'default', label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getQuestionStatusBadge = (question) => {
    if (question.ops_review) {
      if (question.ops_review.status === 'accepted') {
        return <Badge variant="success">Accepted</Badge>;
      } else if (question.ops_review.status === 'return_for_correction') {
        return <Badge variant="danger">Needs Correction</Badge>;
      }
    }
    if (question.status === 'complete') {
      return <Badge variant="default">Pending Review</Badge>;
    }
    return <Badge variant="default">Not Submitted</Badge>;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/ops')}
          icon={<ArrowLeft className="w-4 h-4" />}
          className="mb-4"
        >
          Back to Dashboard
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{evaluation.school_name}</h1>
            <p className="text-gray-600 mt-1">Request ID: {evaluation.id}</p>
          </div>
          <div className="text-right">
            {getStatusBadge(evaluation.status)}
            <p className="text-sm text-gray-500 mt-2">
              Deadline: {formatDate(evaluation.deadline)}
            </p>
          </div>
        </div>
      </div>

      {/* School Information */}
      <Card title="School Information" className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Region</p>
            <p className="font-medium">{evaluation.region}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">City</p>
            <p className="font-medium">{evaluation.city}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Level</p>
            <p className="font-medium">{evaluation.level}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Gender Model</p>
            <p className="font-medium">{evaluation.gender_model}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Completion</p>
            <p className="font-medium">{evaluation.completion_percentage}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Version</p>
            <p className="font-medium">{evaluation.version}</p>
          </div>
        </div>
      </Card>

      {/* Compliance Questions Review */}
      <Card title="Compliance Questions" className="mb-6">
        <div className="space-y-6">
          {evaluation.compliance_data.questions.map((question, index) => (
            <div key={question.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">
                    {index + 1}. {question.question}
                  </h3>
                  <p className="text-sm text-gray-500">{question.question_ar}</p>
                </div>
                <div className="ml-4">
                  {getQuestionStatusBadge(question)}
                </div>
              </div>

              {/* School's Answer */}
              <div className="bg-gray-50 rounded-lg p-4 mb-3">
                <p className="text-sm font-medium text-gray-700 mb-2">School's Response:</p>
                {question.answer ? (
                  <div>
                    <p className="text-gray-900 mb-2">
                      {question.type === 'yes_no' ? (
                        question.answer === 'yes' ? 'Yes' : 'No'
                      ) : (
                        question.answer
                      )}
                    </p>
                    {question.evidence && question.evidence.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {question.evidence.map((file, i) => (
                          <div key={i} className="flex items-center gap-1 text-sm text-primary-600">
                            <FileText className="w-4 h-4" />
                            <span>{file}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Not answered yet</p>
                )}
              </div>

              {/* Ops Review Section */}
              {question.ops_review ? (
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Your Review:</p>
                  <p className="text-gray-900 mb-2">{question.ops_review.comment}</p>
                  <p className="text-xs text-gray-500">
                    Reviewed on {formatDate(question.ops_review.review_date)}
                  </p>
                </div>
              ) : question.answer ? (
                <div className="flex gap-3">
                  <div className="flex-1">
                    <textarea
                      value={reviewComments[question.id] || ''}
                      onChange={(e) => setReviewComments(prev => ({ ...prev, [question.id]: e.target.value }))}
                      placeholder="Add review comment (optional for acceptance, required for rejection)"
                      className="w-full border-gray-300 rounded-lg text-sm"
                      rows="2"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleReview(question.id, 'accepted', reviewComments[question.id] || 'Accepted')}
                      icon={<CheckCircle className="w-4 h-4" />}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        if (!reviewComments[question.id]) {
                          alert('Please provide a comment explaining what needs to be corrected');
                          return;
                        }
                        handleReview(question.id, 'return_for_correction', reviewComments[question.id]);
                      }}
                      icon={<XCircle className="w-4 h-4" />}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Card>

      {/* Actions */}
      <Card>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Review the compliance questions and provide feedback to the school.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('/ops')}>
              Save & Return
            </Button>
            <Button variant="primary">
              Submit Review
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EvaluationReviewPage;
