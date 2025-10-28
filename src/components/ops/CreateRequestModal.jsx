import React, { useState, useMemo } from 'react';
import { X, CheckCircle, XCircle, AlertTriangle, Calendar } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';
import Badge from '../common/Badge';

const CreateRequestModal = ({ isOpen, onClose, schools, evaluations, onCreateRequests }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [deadline, setDeadline] = useState('');

  // Step 1 filters
  const [filters, setFilters] = useState({
    region: 'all',
    city: 'all',
    level: 'all',
    gender_model: 'all',
  });

  // Filter schools for Step 1
  const filteredSchools = useMemo(() => {
    return schools.filter(school => {
      if (filters.region !== 'all' && school.region !== filters.region) return false;
      if (filters.city !== 'all' && school.city !== filters.city) return false;
      if (filters.level !== 'all' && school.level !== filters.level) return false;
      if (filters.gender_model !== 'all' && school.gender_model !== filters.gender_model) return false;
      return true;
    });
  }, [schools, filters]);

  // Check for conflicts in Step 2
  const schoolsAnalysis = useMemo(() => {
    const readySchools = [];
    const blockedSchools = [];

    selectedSchools.forEach(schoolId => {
      const school = schools.find(s => s.id === schoolId);
      if (!school) return;

      // Check for active requests
      const activeRequest = evaluations.find(
        e => e.school_id === schoolId &&
        !['approved', 'published', 'archived'].includes(e.status)
      );

      if (activeRequest) {
        blockedSchools.push({ school, activeRequest });
      } else {
        readySchools.push(school);
      }
    });

    return { readySchools, blockedSchools };
  }, [selectedSchools, schools, evaluations]);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedSchools(filteredSchools.map(s => s.id));
    } else {
      setSelectedSchools([]);
    }
  };

  const handleSelectSchool = (schoolId, checked) => {
    if (checked) {
      setSelectedSchools([...selectedSchools, schoolId]);
    } else {
      setSelectedSchools(selectedSchools.filter(id => id !== schoolId));
    }
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleCreate = () => {
    const { readySchools } = schoolsAnalysis;
    onCreateRequests(readySchools, deadline);
    handleClose();
  };

  const handleClose = () => {
    setCurrentStep(1);
    setSelectedSchools([]);
    setDeadline('');
    setFilters({ region: 'all', city: 'all', level: 'all', gender_model: 'all' });
    onClose();
  };

  const canProceedFromStep1 = selectedSchools.length > 0;
  const canProceedFromStep2 = schoolsAnalysis.readySchools.length > 0;
  const canProceedFromStep3 = deadline !== '';

  if (!isOpen) return null;

  const regions = ['all', ...new Set(schools.map(s => s.region))];
  const cities = ['all', ...new Set(schools.map(s => s.city))];
  const levels = ['all', 'Primary', 'Intermediate', 'Secondary'];
  const genderModels = ['all', 'Boys', 'Girls', 'Co-ed'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Create New Evaluation Requests</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[1, 2, 3, 4].map((step, idx) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step < currentStep ? 'bg-primary-600 text-white' :
                    step === currentStep ? 'bg-primary-600 text-white' :
                    'bg-gray-300 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  <span className={`text-xs mt-1 ${
                    step === currentStep ? 'text-primary-600 font-semibold' : 'text-gray-500'
                  }`}>
                    {step === 1 ? 'Select' : step === 2 ? 'Review' : step === 3 ? 'Deadline' : 'Confirm'}
                  </span>
                </div>
                {idx < 3 && (
                  <div className={`flex-1 h-1 mx-4 ${
                    step < currentStep ? 'bg-primary-600' : 'bg-gray-300'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 1: Select Schools */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Select Schools</h3>

              {/* Filters */}
              <Card padding="default">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                    <select
                      value={filters.region}
                      onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                      className="w-full border-gray-300 rounded-lg"
                    >
                      {regions.map(r => <option key={r} value={r}>{r === 'all' ? 'All Regions' : r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <select
                      value={filters.city}
                      onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                      className="w-full border-gray-300 rounded-lg"
                    >
                      {cities.map(c => <option key={c} value={c}>{c === 'all' ? 'All Cities' : c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                    <select
                      value={filters.level}
                      onChange={(e) => setFilters({ ...filters, level: e.target.value })}
                      className="w-full border-gray-300 rounded-lg"
                    >
                      {levels.map(l => <option key={l} value={l}>{l === 'all' ? 'All Levels' : l}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      value={filters.gender_model}
                      onChange={(e) => setFilters({ ...filters, gender_model: e.target.value })}
                      className="w-full border-gray-300 rounded-lg"
                    >
                      {genderModels.map(g => <option key={g} value={g}>{g === 'all' ? 'All Models' : g}</option>)}
                    </select>
                  </div>
                </div>
              </Card>

              {/* Schools Table */}
              <Card padding="none">
                <div className="max-h-96 overflow-y-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedSchools.length === filteredSchools.length && filteredSchools.length > 0}
                            onChange={(e) => handleSelectAll(e.target.checked)}
                            className="rounded border-gray-300 text-primary-600"
                          />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">School Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Region</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredSchools.map(school => (
                        <tr key={school.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={selectedSchools.includes(school.id)}
                              onChange={(e) => handleSelectSchool(school.id, e.target.checked)}
                              className="rounded border-gray-300 text-primary-600"
                            />
                          </td>
                          <td className="px-6 py-3 text-sm text-gray-900">{school.name}</td>
                          <td className="px-6 py-3 text-sm text-gray-500">{school.region}</td>
                          <td className="px-6 py-3 text-sm text-gray-500">{school.level}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                  <span className="text-sm text-gray-600">{selectedSchools.length} school(s) selected</span>
                </div>
              </Card>
            </div>
          )}

          {/* Step 2: Review Selected Schools */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Review Selected Schools</h3>

              {/* Ready Schools */}
              {schoolsAnalysis.readySchools.length > 0 && (
                <Card padding="default" className="border-2 border-success-200 bg-success-50">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-success-600" />
                    <h4 className="font-semibold text-success-900">Ready to Create ({schoolsAnalysis.readySchools.length})</h4>
                  </div>
                  <div className="space-y-2">
                    {schoolsAnalysis.readySchools.map(school => (
                      <div key={school.id} className="flex items-center justify-between p-2 bg-white rounded">
                        <span className="text-sm text-gray-900">{school.name}</span>
                        <Badge variant="success">Can Create</Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Blocked Schools */}
              {schoolsAnalysis.blockedSchools.length > 0 && (
                <Card padding="default" className="border-2 border-danger-200 bg-danger-50">
                  <div className="flex items-center gap-2 mb-3">
                    <XCircle className="w-5 h-5 text-danger-600" />
                    <h4 className="font-semibold text-danger-900">Cannot Create ({schoolsAnalysis.blockedSchools.length})</h4>
                  </div>
                  <div className="space-y-3">
                    {schoolsAnalysis.blockedSchools.map(({ school, activeRequest }) => (
                      <div key={school.id} className="p-3 bg-white rounded border border-danger-200">
                        <div className="flex items-start justify-between mb-2">
                          <span className="font-medium text-gray-900">{school.name}</span>
                          <Badge variant="danger">Blocked</Badge>
                        </div>
                        <div className="flex items-start gap-2 p-2 bg-warning-50 border border-warning-200 rounded">
                          <AlertTriangle className="w-4 h-4 text-warning-600 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-warning-900">
                            <p className="font-medium">Cannot create – Active request exists</p>
                            <p className="text-xs mt-1">
                              Request {activeRequest.id}, Status: {activeRequest.status}
                              {activeRequest.version && ` (v${activeRequest.version.current}/${activeRequest.version.max})`}
                            </p>
                            <p className="text-xs mt-1">Please close or archive the existing request first.</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {schoolsAnalysis.readySchools.length === 0 && (
                <Card padding="default" className="border-2 border-warning-200 bg-warning-50">
                  <div className="text-center py-8">
                    <AlertTriangle className="w-12 h-12 text-warning-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-warning-900 mb-2">No Schools Available</h4>
                    <p className="text-sm text-warning-800">
                      All selected schools have active requests. Please go back and select different schools.
                    </p>
                  </div>
                </Card>
              )}

              <div className="text-sm text-gray-600 text-center">
                {schoolsAnalysis.readySchools.length} school(s) ready, {schoolsAnalysis.blockedSchools.length} blocked
              </div>
            </div>
          )}

          {/* Step 3: Set Deadline */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Set Deadline</h3>

              <Card padding="default">
                <div className="max-w-md mx-auto">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Evaluation Deadline <span className="text-danger-600">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Schools will have until this date to complete their evaluation submissions.
                  </p>
                </div>
              </Card>
            </div>
          )}

          {/* Step 4: Confirm Creation */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Confirm Creation</h3>

              <Card padding="default" className="bg-primary-50 border-2 border-primary-200">
                <h4 className="font-semibold text-primary-900 mb-3">Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Schools to Process:</span>
                    <span className="font-semibold text-gray-900">{schoolsAnalysis.readySchools.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Deadline:</span>
                    <span className="font-semibold text-gray-900">{deadline}</span>
                  </div>
                  {schoolsAnalysis.blockedSchools.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-warning-700">Skipped (conflicts):</span>
                      <span className="font-semibold text-warning-900">{schoolsAnalysis.blockedSchools.length}</span>
                    </div>
                  )}
                </div>
              </Card>

              <Card padding="default">
                <p className="text-sm text-gray-700 mb-2">
                  The system will create <strong>{schoolsAnalysis.readySchools.length}</strong> new evaluation request(s).
                </p>
                <p className="text-sm text-gray-600">
                  Each school will receive a notification and can begin filling out their evaluation data.
                </p>
              </Card>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div>
            {currentStep > 1 && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
            {currentStep === 1 && (
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            )}
          </div>
          <div>
            {currentStep < 4 && (
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && !canProceedFromStep1) ||
                  (currentStep === 2 && !canProceedFromStep2) ||
                  (currentStep === 3 && !canProceedFromStep3)
                }
              >
                Next
              </Button>
            )}
            {currentStep === 4 && (
              <Button
                variant="success"
                onClick={handleCreate}
              >
                Create {schoolsAnalysis.readySchools.length} Request(s)
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRequestModal;
