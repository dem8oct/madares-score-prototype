import React, { useState } from 'react';
import Modal from '../../common/Modal';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { getCategoriesForDomain, getIndicatorsFromQuestions } from '../../../data/questionsBank';
import { indicatorsWithStatus } from '../../../data/indicatorsWithStatus';

const fieldTypeOptions = [
  'Text Input',
  'Yes/No Radio',
  'File Upload',
  'Date Picker',
  'Dropdown Select',
  'Number Input',
  'Percentage Input',
  'Multiple Choice',
  'File Upload + Date Picker'
];

const AddQuestionModal = ({ isOpen, onClose, onQuestionAdded }) => {
  const [formData, setFormData] = useState({
    domain: 'Compliance',
    category: 'Health & Safety',
    indicator_code: '',
    question_en: '',
    question_ar: '',
    field_types: [],
    tags: '',
    is_required: true,
    helper_text: ''
  });

  const [charCount, setCharCount] = useState(0);
  const [availableCategories, setAvailableCategories] = useState([]);

  React.useEffect(() => {
    if (isOpen) {
      const categories = getCategoriesForDomain(formData.domain);
      setAvailableCategories(categories);
    }
  }, [isOpen, formData.domain]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (field === 'question_en') {
      setCharCount(value.length);
    }

    if (field === 'domain') {
      const categories = getCategoriesForDomain(value);
      setAvailableCategories(categories);
      setFormData(prev => ({ ...prev, category: categories[1] || categories[0] })); // Skip "All"
    }
  };

  const handleFieldTypeChange = (fieldType) => {
    setFormData(prev => {
      const currentTypes = prev.field_types;
      if (currentTypes.includes(fieldType)) {
        return { ...prev, field_types: currentTypes.filter(t => t !== fieldType) };
      } else {
        return { ...prev, field_types: [...currentTypes, fieldType] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate question code
    const domainPrefix = formData.domain.substring(0, 1);
    const questionCode = `Q-${domainPrefix}-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`;

    // Create new question object
    const newQuestion = {
      question_id: questionCode,
      question_code: questionCode,
      indicator_code: formData.indicator_code,
      domain: formData.domain,
      category: formData.category,
      question_text: {
        en: formData.question_en,
        ar: formData.question_ar
      },
      field_type: formData.field_types.join(' + '),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      status: 'Active',
      is_required: formData.is_required,
      helper_text: {
        en: formData.helper_text,
        ar: formData.helper_text
      },
      usage_statistics: {
        used_in_indicators: formData.indicator_code ? 1 : 0,
        total_responses: 0,
        last_used: null
      },
      version: '1.0',
      version_history: [
        {
          version: '1.0',
          date: new Date().toISOString(),
          changed_by: 'Current User', // Would come from auth context
          changes: ['Initial question created'],
          rationale: null
        }
      ],
      created_at: new Date().toISOString(),
      last_updated: new Date().toISOString(),
      last_updated_by: 'Current User'
    };

    if (onQuestionAdded) {
      onQuestionAdded(newQuestion);
    }

    alert('Question added to Questions Bank successfully!');
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setFormData({
      domain: 'Compliance',
      category: 'Health & Safety',
      indicator_code: '',
      question_en: '',
      question_ar: '',
      field_types: [],
      tags: '',
      is_required: true,
      helper_text: ''
    });
    setCharCount(0);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Question"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Domain and Category */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Domain <span className="text-danger-600">*</span>
            </label>
            <select
              value={formData.domain}
              onChange={(e) => handleChange('domain', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="Compliance">Compliance</option>
              <option value="Institutional Excellence">Institutional Excellence</option>
              <option value="Beneficiary Satisfaction">Beneficiary Satisfaction</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-danger-600">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            >
              {availableCategories
                .filter(cat => cat !== 'All')
                .map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>
          </div>
        </div>

        {/* Linked Indicator */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Linked Indicator <span className="text-gray-500">(Optional)</span>
          </label>
          <select
            value={formData.indicator_code}
            onChange={(e) => handleChange('indicator_code', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">None - Not linked to any indicator</option>
            {indicatorsWithStatus
              .filter(ind => ind.status === 'Active')
              .sort((a, b) => a.indicator_code.localeCompare(b.indicator_code))
              .map(ind => (
                <option key={ind.indicator_code} value={ind.indicator_code}>
                  {ind.indicator_code} - {ind.indicator_name}
                </option>
              ))}
          </select>
          <p className="mt-1 text-xs text-gray-500">
            Link this question to a specific indicator. Each question can be linked to only one indicator.
          </p>
        </div>

        {/* Question Text (English) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Question Text (English) <span className="text-danger-600">*</span>
          </label>
          <textarea
            value={formData.question_en}
            onChange={(e) => handleChange('question_en', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows="3"
            placeholder="Does your school have emergency evacuation plans for all buildings? Upload floor plans with marked exits."
            maxLength={1000}
            required
          />
          <p className="text-xs text-gray-500 mt-1">Character count: {charCount} / 1000</p>
        </div>

        {/* Question Text (Arabic) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Question Text (Arabic) <span className="text-danger-600">*</span>
          </label>
          <textarea
            value={formData.question_ar}
            onChange={(e) => handleChange('question_ar', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows="3"
            placeholder="هل لدى مدرستك خطط إخلاء طوارئ لجميع المباني؟"
            dir="rtl"
            required
          />
        </div>

        {/* Field Type (Multiple Select) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Field Type <span className="text-danger-600">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {fieldTypeOptions.map(fieldType => (
              <label key={fieldType} className="flex items-center gap-2 p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.field_types.includes(fieldType)}
                  onChange={() => handleFieldTypeChange(fieldType)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{fieldType}</span>
              </label>
            ))}
          </div>
          {formData.field_types.length === 0 && (
            <p className="text-xs text-danger-600 mt-1">Please select at least one field type</p>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags (comma-separated)
          </label>
          <Input
            value={formData.tags}
            onChange={(e) => handleChange('tags', e.target.value)}
            placeholder="emergency-planning, evacuation, floor-plans, safety"
          />
        </div>

        {/* Is Required */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="is_required"
            checked={formData.is_required}
            onChange={(e) => handleChange('is_required', e.target.checked)}
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <label htmlFor="is_required" className="text-sm font-medium text-gray-700">
            Is Required Question
          </label>
        </div>

        {/* Helper Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Helper Text (Optional)
          </label>
          <textarea
            value={formData.helper_text}
            onChange={(e) => handleChange('helper_text', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows="2"
            placeholder="Upload PDF files showing evacuation routes for each building. Ensure all exits are clearly marked."
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={formData.field_types.length === 0}
          >
            Save to Questions Bank
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddQuestionModal;
