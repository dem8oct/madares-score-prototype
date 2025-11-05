import React, { useState } from 'react';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { AlertCircle } from 'lucide-react';
import { validateDomainWeight, getAvailableWeightForCustomDomain, getCurrentTotalWeight } from '../../../data/customDomains';

const InlineDomainCreator = ({ onDomainCreated, onCancel }) => {
  const [formData, setFormData] = useState({
    name_en: '',
    name_ar: '',
    weight: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [charCount, setCharCount] = useState(0);

  const availableWeight = getAvailableWeightForCustomDomain();
  const currentTotalWeight = getCurrentTotalWeight();
  const standardWeight = 100; // From standard domains

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }

    // Update character count for description
    if (field === 'description') {
      setCharCount(value.length);
    }

    // Validate weight in real-time
    if (field === 'weight') {
      const weightNum = parseFloat(value);
      if (!isNaN(weightNum)) {
        const validation = validateDomainWeight(weightNum);
        if (!validation.valid) {
          setErrors(prev => ({ ...prev, weight: validation.message }));
        }
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name_en.trim()) {
      newErrors.name_en = 'English name is required';
    }

    if (!formData.name_ar.trim()) {
      newErrors.name_ar = 'Arabic name is required';
    }

    const weightNum = parseFloat(formData.weight);
    if (!formData.weight || isNaN(weightNum)) {
      newErrors.weight = 'Weight is required and must be a number';
    } else {
      const validation = validateDomainWeight(weightNum);
      if (!validation.valid) {
        newErrors.weight = validation.message;
      }
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length > 500) {
      newErrors.description = 'Description must not exceed 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Create domain object
    const newDomain = {
      domain_id: `custom_${Date.now()}`,
      domain_name: {
        en: formData.name_en,
        ar: formData.name_ar
      },
      weight: parseFloat(formData.weight),
      description: {
        en: formData.description,
        ar: formData.description // In real app, might want separate AR description
      },
      status: 'Pending Approval',
      created_by: 'Current User', // Would come from auth context
      created_at: new Date().toISOString(),
      approved_by: null,
      approved_at: null,
      is_custom: true,
      indicators_count: 0,
      usage_statistics: {
        schools_using: 0,
        evaluations_completed: 0
      }
    };

    onDomainCreated(newDomain);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Create Custom Domain</h3>
        <p className="text-sm text-gray-600 mt-1">
          Create a new evaluation domain to categorize indicators
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Domain Name (English) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Domain Name (English) <span className="text-danger-600">*</span>
          </label>
          <Input
            value={formData.name_en}
            onChange={(e) => handleChange('name_en', e.target.value)}
            placeholder="Environmental Sustainability"
            error={errors.name_en}
          />
          {errors.name_en && (
            <p className="mt-1 text-sm text-danger-600">{errors.name_en}</p>
          )}
        </div>

        {/* Domain Name (Arabic) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Domain Name (Arabic) <span className="text-danger-600">*</span>
          </label>
          <Input
            value={formData.name_ar}
            onChange={(e) => handleChange('name_ar', e.target.value)}
            placeholder="الاستدامة البيئية"
            dir="rtl"
            error={errors.name_ar}
          />
          {errors.name_ar && (
            <p className="mt-1 text-sm text-danger-600">{errors.name_ar}</p>
          )}
        </div>

        {/* Initial Weight */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Initial Weight (%) <span className="text-danger-600">*</span>
          </label>
          <Input
            type="number"
            value={formData.weight}
            onChange={(e) => handleChange('weight', e.target.value)}
            placeholder="10"
            min="1"
            max="20"
            step="0.1"
            error={errors.weight}
          />
          {errors.weight && (
            <p className="mt-1 text-sm text-danger-600">{errors.weight}</p>
          )}

          {/* Weight Warning/Info */}
          <div className="mt-2 p-3 bg-warning-50 border border-warning-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-warning-800">
              <p className="font-medium mb-1">Weight Distribution:</p>
              <p>
                Current total without this domain: {currentTotalWeight}%
              </p>
              <p>
                Available weight for custom domains: {availableWeight.toFixed(1)}%
              </p>
              <p className="mt-1 text-xs">
                Note: Custom domains are supplementary to the standard domains (Compliance 50%,
                Excellence 30%, Satisfaction 20%). Adjust other domain weights if needed.
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-danger-600">*</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className={`w-full px-3 py-2 border ${
              errors.description ? 'border-danger-300' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 ${
              errors.description ? 'focus:ring-danger-500' : 'focus:ring-primary-500'
            }`}
            rows="4"
            placeholder="Evaluates school's commitment to environmental sustainability, green initiatives, and eco-friendly practices."
            maxLength={500}
          />
          <div className="mt-1 flex items-center justify-between">
            <div>
              {errors.description && (
                <p className="text-sm text-danger-600">{errors.description}</p>
              )}
            </div>
            <p className="text-xs text-gray-500">
              Character count: {charCount} / 500
            </p>
          </div>
        </div>

        {/* Approval Info */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This custom domain will require approval from the Committee Chair
            before it can be used in evaluations. Indicators assigned to this domain will inherit
            the pending status.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Button variant="outline" onClick={onCancel} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Create Domain & Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InlineDomainCreator;
