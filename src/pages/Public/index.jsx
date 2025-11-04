import React, { useState } from 'react';
import { mockSchools } from '../../data/mockData';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { Search, MapPin, Users, GraduationCap, Award, TrendingUp, Star, X, Phone, Mail, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

const PublicPortal = () => {
  const [filters, setFilters] = useState({
    region: 'all',
    city: 'all',
    level: 'all',
    gender_model: 'all',
  });
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);

  // Extract unique values for filters
  const regions = ['all', ...new Set(mockSchools.map(s => s.region))];
  const cities = ['all', ...new Set(mockSchools.map(s => s.city))];
  const levels = ['all', 'Primary', 'Intermediate', 'Secondary'];
  const genderModels = ['all', 'Boys', 'Girls', 'Co-ed'];

  // Calculate statistics for published schools
  const publishedSchools = mockSchools.filter(s => s.published_score !== null);
  const stats = {
    total: publishedSchools.length,
    topPerformers: publishedSchools.filter(s => s.published_score.excellence_grade.includes('A')).length,
    avgExcellence: (publishedSchools.reduce((sum, s) => sum + s.published_score.excellence_score, 0) / publishedSchools.length).toFixed(1),
    avgSatisfaction: (publishedSchools.reduce((sum, s) => sum + s.published_score.satisfaction_score, 0) / publishedSchools.length).toFixed(1),
  };

  const handleSearch = () => {
    const filtered = mockSchools.filter(school => {
      if (filters.region !== 'all' && school.region !== filters.region) return false;
      if (filters.city !== 'all' && school.city !== filters.city) return false;
      if (filters.level !== 'all' && school.level !== filters.level) return false;
      if (filters.gender_model !== 'all' && school.gender_model !== filters.gender_model) return false;
      // Only show schools with published scores
      return school.published_score !== null;
    });
    setResults(filtered);
    setHasSearched(true);
  };

  const getGradeColor = (grade) => {
    if (grade.includes('A+')) return 'success';
    if (grade.includes('A')) return 'success';
    if (grade.includes('B')) return 'primary';
    if (grade.includes('C')) return 'warning';
    return 'default';
  };

  const getGradeBgColor = (grade) => {
    if (grade.includes('A+')) return 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-200';
    if (grade.includes('A')) return 'bg-gradient-to-br from-green-50 to-green-100 border-green-200';
    if (grade.includes('B')) return 'bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200';
    if (grade.includes('C')) return 'bg-gradient-to-br from-yellow-50 to-amber-100 border-yellow-200';
    return 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200';
  };

  const openScorecard = (school) => {
    setSelectedSchool(school);
  };

  const closeScorecard = () => {
    setSelectedSchool(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 via-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold mb-3">School Score Portal</h1>
              <p className="text-primary-100 text-xl">
                Search and compare school evaluation scores across Saudi Arabia
              </p>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-4xl font-bold">{stats.total}</div>
                <div className="text-sm text-primary-100">Published Schools</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-4xl font-bold">{stats.topPerformers}</div>
                <div className="text-sm text-primary-100">Top Performers</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-4xl font-bold">{stats.avgExcellence}%</div>
                <div className="text-sm text-primary-100">Avg Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Filters */}
        <Card title="Search Schools" padding="default" className="mb-8 shadow-lg border-2 border-primary-100">
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin className="w-4 h-4 inline mr-1" />
                Region
              </label>
              <select
                value={filters.region}
                onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                className="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              >
                {regions.map(region => (
                  <option key={region} value={region}>
                    {region === 'all' ? 'All Regions' : region}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin className="w-4 h-4 inline mr-1" />
                City
              </label>
              <select
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              >
                {cities.map(city => (
                  <option key={city} value={city}>
                    {city === 'all' ? 'All Cities' : city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <GraduationCap className="w-4 h-4 inline mr-1" />
                Education Level
              </label>
              <select
                value={filters.level}
                onChange={(e) => setFilters({ ...filters, level: e.target.value })}
                className="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              >
                {levels.map(level => (
                  <option key={level} value={level}>
                    {level === 'all' ? 'All Levels' : level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Users className="w-4 h-4 inline mr-1" />
                Gender Model
              </label>
              <select
                value={filters.gender_model}
                onChange={(e) => setFilters({ ...filters, gender_model: e.target.value })}
                className="w-full border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              >
                {genderModels.map(model => (
                  <option key={model} value={model}>
                    {model === 'all' ? 'All Models' : model}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button
            variant="primary"
            onClick={handleSearch}
            icon={<Search className="w-4 h-4" />}
            fullWidth
            className="bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700"
          >
            Search Schools
          </Button>
        </Card>

        {/* Results */}
        {hasSearched && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Search Results
                <span className="text-primary-600 font-normal ml-2">({results.length} schools found)</span>
              </h2>
            </div>

            {results.length === 0 ? (
              <Card padding="default">
                <div className="text-center py-12">
                  <Search className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Schools Found</h3>
                  <p className="text-gray-600">Try adjusting your search filters</p>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-2 gap-6">
                {results.map(school => (
                  <Card
                    key={school.id}
                    padding="default"
                    className={`hover:shadow-2xl transition-all duration-300 border-2 ${getGradeBgColor(school.published_score.excellence_grade)}`}
                  >
                    <div className="space-y-4">
                      {/* School Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900">{school.name}</h3>
                          <p className="text-gray-600 text-sm mt-1">
                            <MapPin className="w-4 h-4 inline mr-1" />
                            {school.city}, {school.region}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Badge variant={getGradeColor(school.published_score.excellence_grade)} size="lg">
                            {school.published_score.excellence_grade}
                          </Badge>
                          <span className="text-xs text-gray-500">Overall Grade</span>
                        </div>
                      </div>

                      {/* School Info */}
                      <div className="flex items-center gap-4 text-sm text-gray-700 bg-white/60 rounded-lg p-3">
                        <span className="font-medium">
                          <GraduationCap className="w-4 h-4 inline mr-1" />
                          {school.level}
                        </span>
                        <span className="font-medium">
                          <Users className="w-4 h-4 inline mr-1" />
                          {school.gender_model}
                        </span>
                        <span className="font-medium">
                          <Star className="w-4 h-4 inline mr-1" />
                          {school.total_students} students
                        </span>
                      </div>

                      {/* Scores */}
                      {school.published_score && (
                        <div className="bg-white/60 rounded-lg p-4 space-y-3">
                          <p className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary-600" />
                            Latest Evaluation Scores
                          </p>

                          {/* Compliance */}
                          <div className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
                            <span className="text-sm font-medium text-gray-700">Compliance</span>
                            <Badge
                              variant={school.published_score.compliance === 'Pass' ? 'success' : 'danger'}
                              icon={school.published_score.compliance === 'Pass' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                            >
                              {school.published_score.compliance}
                            </Badge>
                          </div>

                          {/* Excellence */}
                          <div className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
                            <span className="text-sm font-medium text-gray-700">Institutional Excellence</span>
                            <div className="text-right">
                              <Badge variant={getGradeColor(school.published_score.excellence_grade)}>
                                {school.published_score.excellence_grade}
                              </Badge>
                              <div className="text-xs text-gray-600 mt-1 font-semibold">
                                {school.published_score.excellence_score}%
                              </div>
                            </div>
                          </div>

                          {/* Satisfaction */}
                          <div className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
                            <span className="text-sm font-medium text-gray-700">Beneficiary Satisfaction</span>
                            <div className="text-right">
                              <Badge variant={getGradeColor(school.published_score.satisfaction_grade)}>
                                {school.published_score.satisfaction_grade}
                              </Badge>
                              <div className="text-xs text-gray-600 mt-1 font-semibold">
                                {school.published_score.satisfaction_score}%
                              </div>
                            </div>
                          </div>

                          <p className="text-xs text-gray-600 mt-3 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Evaluation Date: {school.published_score.evaluation_date}
                          </p>
                        </div>
                      )}

                      {/* Action Button */}
                      <Button
                        variant="primary"
                        size="sm"
                        fullWidth
                        onClick={() => openScorecard(school)}
                        className="bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700"
                      >
                        <Award className="w-4 h-4 mr-2" />
                        View Full Scorecard
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Info Section */}
        {!hasSearched && (
          <div className="mt-8 grid grid-cols-3 gap-6">
            <Card padding="default" className="text-center bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 hover:shadow-xl transition-all">
              <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Search & Compare</h3>
              <p className="text-sm text-gray-700">
                Use our advanced filters to find schools in your area and compare their performance metrics
              </p>
            </Card>

            <Card padding="default" className="text-center bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-200 hover:shadow-xl transition-all">
              <div className="bg-success-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Verified Scores</h3>
              <p className="text-sm text-gray-700">
                All scores are officially verified and published by the Ministry of Education
              </p>
            </Card>

            <Card padding="default" className="text-center bg-gradient-to-br from-purple-50 to-pink-100 border-2 border-purple-200 hover:shadow-xl transition-all">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Make Informed Decisions</h3>
              <p className="text-sm text-gray-700">
                Use comprehensive evaluation data to make the best educational choices for your children
              </p>
            </Card>
          </div>
        )}
      </div>

      {/* Scorecard Modal */}
      {selectedSchool && (
        <Modal
          isOpen={!!selectedSchool}
          onClose={closeScorecard}
          title={`${selectedSchool.name} - Full Scorecard`}
          size="xl"
        >
          <div className="space-y-6">
            {/* School Information */}
            <div className={`rounded-lg p-6 ${getGradeBgColor(selectedSchool.published_score.excellence_grade)}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedSchool.name}</h3>
                  <p className="text-gray-700 mt-1">{selectedSchool.name_ar}</p>
                </div>
                <Badge variant={getGradeColor(selectedSchool.published_score.excellence_grade)} size="lg">
                  {selectedSchool.published_score.excellence_grade}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  <span><strong>Location:</strong> {selectedSchool.city}, {selectedSchool.region}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <GraduationCap className="w-5 h-5 text-primary-600" />
                  <span><strong>Level:</strong> {selectedSchool.level}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Users className="w-5 h-5 text-primary-600" />
                  <span><strong>Gender Model:</strong> {selectedSchool.gender_model}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Star className="w-5 h-5 text-primary-600" />
                  <span><strong>Students:</strong> {selectedSchool.total_students}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Users className="w-5 h-5 text-primary-600" />
                  <span><strong>Teachers:</strong> {selectedSchool.total_teachers}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Award className="w-5 h-5 text-primary-600" />
                  <span><strong>License:</strong> {selectedSchool.license_number}</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <Card title="Contact Information" padding="default">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Mail className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Email</div>
                    <div className="text-sm font-medium text-gray-900">{selectedSchool.contact_email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Phone className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Phone</div>
                    <div className="text-sm font-medium text-gray-900">{selectedSchool.contact_phone}</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Evaluation Scores */}
            <Card title="Evaluation Scores" padding="default">
              <div className="space-y-4">
                {/* Compliance Domain */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-gray-900">Compliance Domain</h4>
                    <Badge
                      variant={selectedSchool.published_score.compliance === 'Pass' ? 'success' : 'danger'}
                      icon={selectedSchool.published_score.compliance === 'Pass' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    >
                      {selectedSchool.published_score.compliance}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    All compliance requirements including licensing, safety certificates, and regulatory standards have been {selectedSchool.published_score.compliance === 'Pass' ? 'met' : 'not met'}.
                  </p>
                </div>

                {/* Excellence Domain */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-gray-900">Institutional Excellence</h4>
                    <div className="text-right">
                      <Badge variant={getGradeColor(selectedSchool.published_score.excellence_grade)}>
                        {selectedSchool.published_score.excellence_grade}
                      </Badge>
                      <div className="text-sm text-gray-600 mt-1 font-semibold">
                        Score: {selectedSchool.published_score.excellence_score}%
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Measures teacher qualifications, professional development, student-teacher ratios, infrastructure quality, and educational resources.
                  </p>
                  <div className="mt-3 bg-white rounded p-3">
                    <div className="flex justify-between mb-2">
                      <span className="text-xs text-gray-600">Progress</span>
                      <span className="text-xs font-semibold text-gray-900">{selectedSchool.published_score.excellence_score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${selectedSchool.published_score.excellence_grade.includes('A') ? 'bg-success-600' : selectedSchool.published_score.excellence_grade.includes('B') ? 'bg-primary-600' : 'bg-warning-600'}`}
                        style={{ width: `${selectedSchool.published_score.excellence_score}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Satisfaction Domain */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-gray-900">Beneficiary Satisfaction</h4>
                    <div className="text-right">
                      <Badge variant={getGradeColor(selectedSchool.published_score.satisfaction_grade)}>
                        {selectedSchool.published_score.satisfaction_grade}
                      </Badge>
                      <div className="text-sm text-gray-600 mt-1 font-semibold">
                        Score: {selectedSchool.published_score.satisfaction_score}%
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Evaluates safety index, parent satisfaction surveys, student engagement, and overall stakeholder feedback.
                  </p>
                  <div className="mt-3 bg-white rounded p-3">
                    <div className="flex justify-between mb-2">
                      <span className="text-xs text-gray-600">Progress</span>
                      <span className="text-xs font-semibold text-gray-900">{selectedSchool.published_score.satisfaction_score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${selectedSchool.published_score.satisfaction_grade.includes('A') ? 'bg-success-600' : selectedSchool.published_score.satisfaction_grade.includes('B') ? 'bg-primary-600' : 'bg-warning-600'}`}
                        style={{ width: `${selectedSchool.published_score.satisfaction_score}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-primary-50 border border-primary-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-gray-900 mb-1">Evaluation Date</div>
                    <div className="text-sm text-gray-700">
                      This scorecard was published on <strong>{selectedSchool.published_score.evaluation_date}</strong> after a thorough evaluation process by the Ministry of Education.
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Close Button */}
            <Button variant="outline" fullWidth onClick={closeScorecard}>
              Close Scorecard
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PublicPortal;
