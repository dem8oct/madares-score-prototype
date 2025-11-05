import React, { useState } from 'react';
import Modal from '../../common/Modal';
import Button from '../../common/Button';
import Input from '../../common/Input';
import Badge from '../../common/Badge';
import { Search } from 'lucide-react';
import { questionsBank, filterQuestions } from '../../../data/questionsBank';

const QuestionPickerModal = ({ isOpen, onClose, onQuestionSelected, preSelectedDomain }) => {
  const [filters, setFilters] = useState({
    searchTerm: '',
    domain: preSelectedDomain || 'All',
    category: 'All'
  });

  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const filteredQuestions = filterQuestions(questionsBank, filters);

  const handleDomainChange = (domain) => {
    setFilters({
      ...filters,
      domain,
      category: 'All' // Reset category when domain changes
    });
  };

  const handleUseQuestion = () => {
    if (selectedQuestion) {
      onQuestionSelected(selectedQuestion);
      onClose();
      setSelectedQuestion(null);
    }
  };

  const handleClose = () => {
    setSelectedQuestion(null);
    setFilters({
      searchTerm: '',
      domain: preSelectedDomain || 'All',
      category: 'All'
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Select Question from Bank"
      size="xl"
    >
      <div className="space-y-4">
        {/* Search and Filters */}
        <div className="space-y-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={filters.searchTerm}
              onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
              placeholder="Search questions by text, code, or tags..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Domain and Category Filters */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Domain
              </label>
              <select
                value={filters.domain}
                onChange={(e) => handleDomainChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="All">All Domains</option>
                <option value="Compliance">Compliance</option>
                <option value="Institutional Excellence">Institutional Excellence</option>
                <option value="Beneficiary Satisfaction">Beneficiary Satisfaction</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="All">All Categories</option>
                <option value="Health & Safety">Health & Safety</option>
                <option value="Financial">Financial</option>
                <option value="Teaching Quality">Teaching Quality</option>
                <option value="Academic Achievement">Academic Achievement</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Parent Satisfaction">Parent Satisfaction</option>
                <option value="Safety & Security">Safety & Security</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600">
          {filteredQuestions.length} question{filteredQuestions.length !== 1 ? 's' : ''} found
        </div>

        {/* Questions List */}
        <div className="max-h-96 overflow-y-auto space-y-3">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No questions found matching your filters.
            </div>
          ) : (
            filteredQuestions.map((question) => (
              <div
                key={question.question_id}
                onClick={() => setSelectedQuestion(question)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedQuestion?.question_id === question.question_id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Radio Circle */}
                  <div className="pt-1">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedQuestion?.question_id === question.question_id
                          ? 'border-primary-600 bg-primary-600'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedQuestion?.question_id === question.question_id && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </div>

                  {/* Question Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-gray-900">
                        {question.question_code} | {question.category}
                      </h4>
                      <Badge variant="default" size="sm">
                        v{question.version}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-700 mb-2">
                      "{question.question_text.en}"
                    </p>

                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span>Field Type: <strong>{question.field_type}</strong></span>
                      <span>Used in: <strong>{question.usage_statistics.used_in_indicators}</strong> indicators</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleUseQuestion}
            disabled={!selectedQuestion}
          >
            Use Selected Question
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default QuestionPickerModal;
