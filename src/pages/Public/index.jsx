import React, { useState } from 'react';
import { mockSchools } from '../../data/mockData';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { Search, MapPin, Users, GraduationCap } from 'lucide-react';

const PublicPortal = () => {
  const [filters, setFilters] = useState({
    region: 'all',
    city: 'all',
    level: 'all',
    gender_model: 'all',
  });
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Extract unique values for filters
  const regions = ['all', ...new Set(mockSchools.map(s => s.region))];
  const cities = ['all', ...new Set(mockSchools.map(s => s.city))];
  const levels = ['all', 'Primary', 'Intermediate', 'Secondary'];
  const genderModels = ['all', 'Boys', 'Girls', 'Co-ed'];

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
    if (grade.includes('A')) return 'text-success-600';
    if (grade.includes('B')) return 'text-primary-600';
    if (grade.includes('C')) return 'text-warning-600';
    return 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-primary-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">School Score Portal</h1>
          <p className="text-primary-100 text-lg">
            Search and compare school evaluation scores across Saudi Arabia
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Filters */}
        <Card title="Search Schools" padding="default" className="mb-8">
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
          >
            Search Schools
          </Button>
        </Card>

        {/* Results */}
        {hasSearched && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Search Results
                <span className="text-gray-500 font-normal ml-2">({results.length} schools found)</span>
              </h2>
            </div>

            {results.length === 0 ? (
              <Card padding="default">
                <div className="text-center py-8">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Schools Found</h3>
                  <p className="text-gray-600">Try adjusting your search filters</p>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-2 gap-6">
                {results.map(school => (
                  <Card key={school.id} padding="default" className="hover:shadow-lg transition-shadow">
                    <div className="space-y-4">
                      {/* School Header */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{school.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">
                          <MapPin className="w-4 h-4 inline mr-1" />
                          {school.city}, {school.region}
                        </p>
                      </div>

                      {/* School Info */}
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>
                          <GraduationCap className="w-4 h-4 inline mr-1" />
                          {school.level}
                        </span>
                        <span>
                          <Users className="w-4 h-4 inline mr-1" />
                          {school.gender_model}
                        </span>
                        <span>{school.total_students} students</span>
                      </div>

                      {/* Scores */}
                      {school.published_score && (
                        <div className="border-t border-gray-200 pt-4">
                          <p className="text-sm font-medium text-gray-700 mb-3">
                            Latest Evaluation Scores
                          </p>

                          <div className="space-y-3">
                            {/* Compliance */}
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Compliance</span>
                              <Badge variant={school.published_score.compliance === 'Pass' ? 'success' : 'danger'}>
                                {school.published_score.compliance}
                              </Badge>
                            </div>

                            {/* Excellence */}
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Institutional Excellence</span>
                              <div className="text-right">
                                <div className={`font-bold ${getGradeColor(school.published_score.excellence_grade)}`}>
                                  {school.published_score.excellence_grade}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {school.published_score.excellence_score}%
                                </div>
                              </div>
                            </div>

                            {/* Satisfaction */}
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Beneficiary Satisfaction</span>
                              <div className="text-right">
                                <div className={`font-bold ${getGradeColor(school.published_score.satisfaction_grade)}`}>
                                  {school.published_score.satisfaction_grade}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {school.published_score.satisfaction_score}%
                                </div>
                              </div>
                            </div>
                          </div>

                          <p className="text-xs text-gray-500 mt-3">
                            Evaluation Date: {school.published_score.evaluation_date}
                          </p>
                        </div>
                      )}

                      {/* Action Button */}
                      <Button variant="outline" size="sm" fullWidth>
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
            <Card padding="default" className="text-center">
              <Search className="w-12 h-12 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Search & Compare</h3>
              <p className="text-sm text-gray-600">
                Use our filters to find schools in your area and compare their performance
              </p>
            </Card>

            <Card padding="default" className="text-center">
              <GraduationCap className="w-12 h-12 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Verified Scores</h3>
              <p className="text-sm text-gray-600">
                All scores are officially verified by the Ministry of Education
              </p>
            </Card>

            <Card padding="default" className="text-center">
              <Users className="w-12 h-12 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Make Informed Decisions</h3>
              <p className="text-sm text-gray-600">
                Use evaluation data to make the best educational choices for your children
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicPortal;
