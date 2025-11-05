import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import { BarChart3, TrendingUp, Users, School, Award, MapPin } from 'lucide-react';
import { mockSchools, mockEvaluations } from '../../data/mockData';

const NationalViewerDashboard = () => {
  const { language, t } = useLanguage();

  // Calculate statistics
  const totalSchools = mockSchools.length;
  const totalEvaluations = mockEvaluations.length;
  const activeEvaluations = mockEvaluations.filter(e =>
    ['in_progress', 'submitted', 'under_review'].includes(e.status)
  ).length;
  const completedEvaluations = mockEvaluations.filter(e =>
    ['approved', 'published', 'closed'].includes(e.status)
  ).length;

  // Regional breakdown
  const regionalStats = [
    { region: 'Riyadh', schools: 2, avg_score: 86.6, evaluations: 3 },
    { region: 'Jeddah', schools: 2, avg_score: 84.9, evaluations: 1 },
    { region: 'Eastern', schools: 1, avg_score: 94.6, evaluations: 1 },
  ];

  const columns = [
    { key: 'region', label: 'Region', sortable: true },
    { key: 'schools', label: 'Schools', sortable: true },
    { key: 'evaluations', label: 'Evaluations', sortable: true },
    { key: 'avg_score', label: 'Avg Score', sortable: true },
    { key: 'performance', label: 'Performance', sortable: false },
  ];

  const data = regionalStats.map(stat => ({
    region: stat.region,
    schools: stat.schools,
    evaluations: stat.evaluations,
    avg_score: stat.avg_score.toFixed(1),
    performance: (
      <Badge variant={stat.avg_score >= 90 ? 'success' : stat.avg_score >= 80 ? 'primary' : 'warning'}>
        {stat.avg_score >= 90 ? 'Excellent' : stat.avg_score >= 80 ? 'Good' : 'Fair'}
      </Badge>
    ),
  }));

  // Top performing schools
  const topSchools = [
    { name: 'Dammam International School', score: 94.6, grade: 'A+' },
    { name: 'Al-Faisal Girls School', score: 89.8, grade: 'B+' },
    { name: 'Riyadh International School', score: 86.6, grade: 'B' },
    { name: 'Al-Majd Academy', score: 80.3, grade: 'B' },
    { name: 'Al-Noor Academy', score: 87.0, grade: 'B+' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          National Statistics Dashboard
        </h1>
        <p className="text-gray-600">
          Overview of school performance and evaluation metrics across Saudi Arabia
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Schools</p>
              <p className="text-3xl font-bold text-gray-900">{totalSchools}</p>
              <p className="text-xs text-success-600 mt-1">All regions</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <School className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Evaluations</p>
              <p className="text-3xl font-bold text-warning-600">{activeEvaluations}</p>
              <p className="text-xs text-gray-600 mt-1">In progress</p>
            </div>
            <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-warning-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-success-600">{completedEvaluations}</p>
              <p className="text-xs text-gray-600 mt-1">This cycle</p>
            </div>
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">National Avg</p>
              <p className="text-3xl font-bold text-primary-600">86.2</p>
              <p className="text-xs text-success-600 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +3.5% from last year
              </p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Regional Statistics */}
      <Card className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Regional Performance
          </h2>
        </div>
        <Table columns={columns} data={data} />
      </Card>

      {/* Top Performing Schools */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-success-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Top Performing Schools
          </h2>
        </div>
        <div className="space-y-3">
          {topSchools.map((school, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
                  #{idx + 1}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{school.name}</p>
                  <p className="text-sm text-gray-600">Overall Score</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-3">
                <div>
                  <p className="text-2xl font-bold text-primary-600">{school.score}</p>
                  <p className="text-xs text-gray-600">out of 100</p>
                </div>
                <Badge variant={
                  school.grade.startsWith('A') ? 'success' :
                  school.grade.startsWith('B') ? 'primary' : 'warning'
                } size="lg">
                  {school.grade}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Performance Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card>
          <div className="text-center">
            <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-success-600">1</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Excellent (A)</h3>
            <p className="text-sm text-gray-600">90-100 Score Range</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-primary-600">3</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Good (B)</h3>
            <p className="text-sm text-gray-600">80-89 Score Range</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="w-16 h-16 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-warning-600">1</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Fair (C)</h3>
            <p className="text-sm text-gray-600">70-79 Score Range</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NationalViewerDashboard;
