import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

const DiscrepancyForm = ({ onSave, initialData = null }) => {
  const [formData, setFormData] = useState({
    discrepancy_type: initialData?.discrepancy_type || '',
    severity: initialData?.severity || '',
    notes: initialData?.notes || '',
    evidence_files: initialData?.evidence_files || [],
    inspector_comment: initialData?.inspector_comment || ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      filename: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      uploaded_at: new Date().toISOString()
    }));
    setFormData(prev => ({
      ...prev,
      evidence_files: [...prev.evidence_files, ...newFiles]
    }));
  };

  const removeFile = (filename) => {
    setFormData(prev => ({
      ...prev,
      evidence_files: prev.evidence_files.filter(f => f.filename !== filename)
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="space-y-4 bg-amber-50 border border-amber-200 rounded-md p-4">
      <div className="flex items-center space-x-2 text-amber-900 font-medium">
        <span>⚠️</span>
        <span>Discrepancy Details</span>
      </div>

      {/* Discrepancy Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Discrepancy Type <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {['Quantity Mismatch', 'Quality Issue', 'Missing Evidence', 'Expired/Invalid'].map(type => (
            <label key={type} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="discrepancy_type"
                value={type}
                checked={formData.discrepancy_type === type}
                onChange={(e) => handleChange('discrepancy_type', e.target.value)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Inspector Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Inspector Notes <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe what you observed during inspection..."
        />
        <div className="text-xs text-gray-500 mt-1">
          {formData.notes.length} / 2000 characters
        </div>
      </div>

      {/* Upload Evidence */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Evidence (Photos/Documents)
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-md p-4">
          <label className="flex flex-col items-center justify-center cursor-pointer">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">Click to upload or drag and drop</span>
            <span className="text-xs text-gray-500 mt-1">PNG, JPG, PDF up to 10MB</span>
            <input
              type="file"
              multiple
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Uploaded Files List */}
        {formData.evidence_files.length > 0 && (
          <div className="mt-3 space-y-2">
            {formData.evidence_files.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-md">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-900">📷 {file.filename}</span>
                  <span className="text-xs text-gray-500">({file.size})</span>
                </div>
                <button
                  onClick={() => removeFile(file.filename)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Severity Level */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Severity Level <span className="text-red-500">*</span>
        </label>
        <div className="flex space-x-4">
          {['Minor', 'Moderate', 'Critical'].map(level => (
            <label key={level} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="severity"
                value={level}
                checked={formData.severity === level}
                onChange={(e) => handleChange('severity', e.target.value)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{level}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end space-x-3 pt-3 border-t border-amber-300">
        <button
          onClick={handleSave}
          disabled={!formData.discrepancy_type || !formData.notes || !formData.severity}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
        >
          Save Finding
        </button>
      </div>
    </div>
  );
};

export default DiscrepancyForm;
