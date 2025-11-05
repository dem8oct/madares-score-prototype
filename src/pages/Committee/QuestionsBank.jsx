import React, { useState } from 'react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { Plus, Search } from 'lucide-react';
import QuestionCard from '../../components/committee/questions/QuestionCard';
import QuestionHistoryModal from '../../components/committee/questions/QuestionHistoryModal';
import AddQuestionModal from '../../components/committee/questions/AddQuestionModal';
import { questionsBank, filterQuestions, getCategoriesForDomain, getFieldTypes } from '../../data/questionsBank';

const QuestionsBank = () => {
  const [questions, setQuestions] = useState(questionsBank);
  const [filters, setFilters] = useState({
    searchTerm: '',
    domain: 'All',
    category: 'All',
    fieldType: 'All',
    status: 'Active'
  });

  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [availableCategories, setAvailableCategories] = useState(['All']);

  React.useEffect(() => {
    const categories = getCategoriesForDomain(filters.domain);
    setAvailableCategories(categories);
  }, [filters.domain]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));

    if (field === 'domain') {
      setFilters(prev => ({ ...prev, category: 'All' }));
    }
  };

  const handleClearFilters = () => {
    setFilters({
      searchTerm: '',
      domain: 'All',
      category: 'All',
      fieldType: 'All',
      status: 'Active'
    });
  };

  const handleViewHistory = (question) => {
    setSelectedQuestion(question);
    setShowHistoryModal(true);
  };

  const handleQuestionAdded = (newQuestion) => {
    setQuestions(prev => [newQuestion, ...prev]);
  };

  const filteredQuestions = filterQuestions(questions, filters);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Questions Bank</h1>
        <p className="text-gray-600">
          Manage and browse the library of reusable evaluation questions
        </p>
      </div>

      {/* Search and Filters Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              placeholder="Search questions by text, code, or tags..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-3">Filters:</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Domain Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Domain
              </label>
              <select
                value={filters.domain}
                onChange={(e) => handleFilterChange('domain', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="All">All</option>
                <option value="Compliance">Compliance</option>
                <option value="Institutional Excellence">Institutional Excellence</option>
                <option value="Beneficiary Satisfaction">Beneficiary Satisfaction</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {availableCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Field Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field Type
              </label>
              <select
                value={filters.fieldType}
                onChange={(e) => handleFilterChange('fieldType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {getFieldTypes().map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="All">All</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={handleClearFilters}>
            Clear Filters
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setShowAddQuestionModal(true)}
          >
            Add New Question
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Questions ({filteredQuestions.length} result{filteredQuestions.length !== 1 ? 's' : ''}):
        </p>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-500">No questions found matching your filters.</p>
            <Button
              variant="primary"
              size="sm"
              className="mt-4"
              onClick={() => setShowAddQuestionModal(true)}
            >
              Add Your First Question
            </Button>
          </div>
        ) : (
          filteredQuestions.map((question) => (
            <QuestionCard
              key={question.question_id}
              question={question}
              onViewHistory={handleViewHistory}
            />
          ))
        )}
      </div>

      {/* Modals */}
      <AddQuestionModal
        isOpen={showAddQuestionModal}
        onClose={() => setShowAddQuestionModal(false)}
        onQuestionAdded={handleQuestionAdded}
      />

      <QuestionHistoryModal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        question={selectedQuestion}
      />
    </div>
  );
};

export default QuestionsBank;
