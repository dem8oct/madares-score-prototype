import React, { useState, useEffect } from 'react';
import Modal from '../../common/Modal';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { Plus, Library } from 'lucide-react';
import InlineDomainCreator from '../domains/InlineDomainCreator';
import QuestionPickerModal from '../questions/QuestionPickerModal';
import { customDomains } from '../../../data/customDomains';
import indicatorsData from '../../../data/indicators.json';

const AddIndicatorModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    name_ar: '',
    domain: '',
    indicator_type: '',
    score_type: '',
    weight: '',
    data_source: '',
    description: '',
  });

  const [showDomainCreator, setShowDomainCreator] = useState(false);
  const [showQuestionPicker, setShowQuestionPicker] = useState(false);
  const [availableDomains, setAvailableDomains] = useState([]);
  const [newlyCreatedDomain, setNewlyCreatedDomain] = useState(null);
  const [selectedFromBank, setSelectedFromBank] = useState(null);

  useEffect(() => {
    if (isOpen) {
      // Combine standard and custom domains
      const standardDomains = indicatorsData.domains.map(d => ({
        id: d.id,
        name: d.name,
        name_ar: d.name_ar,
        is_custom: false
      }));

      const approvedCustomDomains = customDomains
        .filter(d => d.status === 'Approved')
        .map(d => ({
          id: d.domain_id,
          name: d.domain_name.en,
          name_ar: d.domain_name.ar,
          is_custom: true
        }));

      setAvailableDomains([...standardDomains, ...approvedCustomDomains]);
    }
  }, [isOpen]);

  const indicatorTypeDescriptions = {
    Manual: 'Data entry by evaluators or schools. Requires manual input and verification.',
    Automatic: 'Data automatically collected from other sources (APIs, integrated systems, etc.). No manual entry required.',
  };

  const scoreTypeDescriptions = {
    Binary: 'Yes/No or Pass/Fail scoring. Results in either 0 or 100 points. Example: Valid license (Yes=100, No=0)',
    Numeric: 'Continuous numeric values converted to percentage. Example: Student-teacher ratio, attendance rate (calculated as percentage)',
    Gradual: 'Multi-level scale scoring with defined thresholds. Example: 5-point scale (Excellent=100, Very Good=85, Good=70, Fair=55, Poor=40)',
  };

  const handleDomainChange = (value) => {
    if (value === '__create_new__') {
      setShowDomainCreator(true);
    } else {
      setFormData({ ...formData, domain: value });
    }
  };

  const handleDomainCreated = (newDomain) => {
    // Add to available domains list
    const domainOption = {
      id: newDomain.domain_id,
      name: newDomain.domain_name.en,
      name_ar: newDomain.domain_name.ar,
      is_custom: true,
      status: 'Pending Approval'
    };

    setAvailableDomains(prev => [...prev, domainOption]);
    setNewlyCreatedDomain(domainOption);

    // Auto-select the newly created domain
    setFormData({ ...formData, domain: newDomain.domain_id });

    // Close domain creator
    setShowDomainCreator(false);
  };

  const handleDomainCreatorCancel = () => {
    setShowDomainCreator(false);
  };

  const handleQuestionSelected = (question) => {
    // Auto-populate form with question data
    setFormData(prev => ({
      ...prev,
      name: question.question_text.en,
      name_ar: question.question_text.ar,
      description: `Question from Questions Bank: ${question.question_code}. ${question.helper_text.en || ''}`,
      // Optionally pre-fill domain if it matches
      domain: availableDomains.find(d => d.name === question.domain)?.id || prev.domain
    }));
    setSelectedFromBank(question);
    setShowQuestionPicker(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // In real app, would save to backend
    const selectedDomain = availableDomains.find(d => d.id === formData.domain);
    const isPendingDomain = selectedDomain?.status === 'Pending Approval';

    if (isPendingDomain) {
      alert(
        `New indicator proposal submitted for review!\n\nNote: This indicator is assigned to a custom domain "${selectedDomain.name}" which is pending approval. Both the indicator and domain will need approval from the Committee Chair.`
      );
    } else {
      alert('New indicator proposal submitted for review!');
    }

    onClose();
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      name_ar: '',
      domain: '',
      indicator_type: '',
      score_type: '',
      weight: '',
      data_source: '',
      description: '',
    });
    setShowDomainCreator(false);
    setShowQuestionPicker(false);
    setNewlyCreatedDomain(null);
    setSelectedFromBank(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Propose New Indicator"
      size="lg"
    >
      {showDomainCreator ? (
        <InlineDomainCreator
          onDomainCreated={handleDomainCreated}
          onCancel={handleDomainCreatorCancel}
        />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Indicator Code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="E301"
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Domain <span className="text-danger-600">*</span>
              </label>
              <select
                value={formData.domain}
                onChange={(e) => handleDomainChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">Select Domain</option>
                {availableDomains.map((domain) => (
                  <option key={domain.id} value={domain.id}>
                    {domain.name}
                    {domain.is_custom ? ' (Custom)' : ''}
                    {domain.status === 'Pending Approval' ? ' - Pending' : ''}
                  </option>
                ))}
                <option value="__create_new__" className="font-semibold text-primary-600">
                  ➕ Create New Custom Domain
                </option>
              </select>
            </div>
          </div>

          {/* Show notice if newly created domain is selected */}
          {newlyCreatedDomain && formData.domain === newlyCreatedDomain.id && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                ✓ New domain "{newlyCreatedDomain.name}" created successfully! This domain and any
                indicators assigned to it will require Committee Chair approval.
              </p>
            </div>
          )}

          {/* Question Bank Integration */}
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-900 mb-1">
                  Use a Question from Questions Bank
                </p>
                <p className="text-xs text-purple-700">
                  Select a pre-defined question to auto-populate indicator details
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Library className="w-4 h-4" />}
                onClick={() => setShowQuestionPicker(true)}
                type="button"
              >
                Select from Bank
              </Button>
            </div>
            {selectedFromBank && (
              <div className="mt-3 p-2 bg-white rounded border border-purple-300">
                <p className="text-xs text-purple-900">
                  <strong>Selected:</strong> {selectedFromBank.question_code} - {selectedFromBank.question_text.en.substring(0, 80)}...
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Indicator Type <span className="text-danger-600">*</span>
              </label>
              <select
                value={formData.indicator_type}
                onChange={(e) => setFormData({ ...formData, indicator_type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">Select type...</option>
                <option value="Manual">Manual (M)</option>
                <option value="Automatic">Automatic (A)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Score Type <span className="text-danger-600">*</span>
              </label>
              <select
                value={formData.score_type}
                onChange={(e) => setFormData({ ...formData, score_type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">Select scoring method...</option>
                <option value="Binary">Binary</option>
                <option value="Numeric">Numeric</option>
                <option value="Gradual">Gradual</option>
              </select>
            </div>
          </div>

          {/* Indicator Type Description */}
          {formData.indicator_type && (
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-sm font-medium text-purple-900 mb-1">
                {formData.indicator_type} Indicator:
              </p>
              <p className="text-xs text-purple-800">
                {indicatorTypeDescriptions[formData.indicator_type]}
              </p>
            </div>
          )}

          {/* Score Type Description */}
          {formData.score_type && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-900 mb-1">
                {formData.score_type} Scoring:
              </p>
              <p className="text-xs text-blue-800">
                {scoreTypeDescriptions[formData.score_type]}
              </p>
            </div>
          )}

          <Input
            label="Indicator Name (English)"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Teacher Professional Development Hours"
            required
          />

          <Input
            label="Indicator Name (Arabic)"
            value={formData.name_ar}
            onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
            placeholder="ساعات التطوير المهني للمعلمين"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Weight"
              type="number"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              placeholder="5"
              min="1"
              max="10"
              required
            />
            <Input
              label="Data Source"
              value={formData.data_source}
              onChange={(e) => setFormData({ ...formData, data_source: e.target.value })}
              placeholder="Noor System"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description / Justification <span className="text-danger-600">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows="4"
              placeholder="Explain why this indicator should be added and how it will be measured..."
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button variant="outline" onClick={handleClose} type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit Proposal
            </Button>
          </div>
        </form>
      )}

      {/* Question Picker Modal */}
      <QuestionPickerModal
        isOpen={showQuestionPicker}
        onClose={() => setShowQuestionPicker(false)}
        onQuestionSelected={handleQuestionSelected}
        preSelectedDomain={availableDomains.find(d => d.id === formData.domain)?.name}
      />
    </Modal>
  );
};

export default AddIndicatorModal;
