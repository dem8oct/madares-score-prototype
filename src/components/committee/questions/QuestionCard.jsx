import React from 'react';
import Card from '../../common/Card';
import Badge from '../../common/Badge';
import Button from '../../common/Button';
import { Clock, Tag, CheckCircle } from 'lucide-react';

const QuestionCard = ({ question, onViewHistory, onEdit }) => {
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
    <Card className="hover:shadow-md transition-shadow">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-semibold text-gray-900">
                {question.question_code} | {question.domain} - {question.category}
              </h3>
              <Badge variant="default" size="sm">
                v{question.version}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewHistory(question)}
            leftIcon={<Clock className="w-4 h-4" />}
          >
            History
          </Button>
        </div>

        {/* Question Text */}
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm font-medium text-gray-700 mb-1">Question Text:</p>
          <p className="text-sm text-gray-900">{question.question_text.en}</p>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div>
            <span className="text-gray-600">Field Type: </span>
            <span className="font-medium text-gray-900">{question.field_type}</span>
          </div>
          <div className="flex items-center gap-1">
            <Tag className="w-4 h-4 text-gray-500" />
            <div className="flex flex-wrap gap-1">
              {question.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Status and Usage */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {question.status === 'Active' ? (
                <CheckCircle className="w-4 h-4 text-success-600" />
              ) : (
                <div className="w-4 h-4 rounded-full bg-gray-400" />
              )}
              <Badge variant={question.status === 'Active' ? 'success' : 'default'} size="sm">
                {question.status}
              </Badge>
            </div>
            <div className="text-sm text-gray-600">
              Used in: <span className="font-semibold text-gray-900">
                {question.usage_statistics.used_in_indicators}
              </span> indicators
            </div>
          </div>
          <div className="text-xs text-gray-500">
            Last Updated: {formatDate(question.last_updated)} by {question.last_updated_by}
          </div>
        </div>

        {/* Required Badge */}
        {question.is_required && (
          <div className="pt-2">
            <Badge variant="danger" size="sm">Required Question</Badge>
          </div>
        )}
      </div>
    </Card>
  );
};

export default QuestionCard;
