import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockSchools, mockEvaluations, getGradeBand } from '../../data/mockData';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import {
  Building2, FileCheck, TrendingUp, Award, AlertTriangle,
  Users, GraduationCap, Heart, Shield, DollarSign,
  BookOpen, Target, Activity, CheckCircle, XCircle
} from 'lucide-react';

const MasterKPICard = ({ title, value, subtitle, trend, icon: Icon, color = 'primary', size = 'default' }) => {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-600',
    success: 'bg-success-50 text-success-600',
    warning: 'bg-warning-50 text-warning-600',
    danger: 'bg-danger-50 text-danger-600',
    gray: 'bg-gray-100 text-gray-600',
  };

  const sizeClasses = {
    default: 'text-3xl',
    large: 'text-4xl',
    small: 'text-2xl',
  };

  return (
    <Card padding="default" className="hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`${sizeClasses[size]} font-bold text-gray-900`}>{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
          {trend !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className={`w-4 h-4 ${trend >= 0 ? 'text-success-600' : 'text-danger-600 rotate-180'}`} />
              <span className={`text-sm font-medium ${trend >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                {trend > 0 ? '+' : ''}{trend}% vs last quarter
              </span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
};

const MasterDashboard = () => {
  const navigate = useNavigate();

  // Calculate comprehensive metrics
  const metrics = useMemo(() => {
    // System-Wide Metrics
    const totalSchools = mockSchools.length;
    const activeEvaluations = mockEvaluations.filter(e =>
      ['in_progress', 'submitted', 'under_review'].includes(e.status)
    ).length;

    // Calculate average score across all published schools
    const publishedSchools = mockSchools.filter(s => s.published_score);
    const avgScore = publishedSchools.length > 0
      ? publishedSchools.reduce((sum, s) => {
          const excellenceScore = s.published_score.excellence_score || 0;
          const satisfactionScore = s.published_score.satisfaction_score || 0;
          const complianceScore = s.published_score.compliance === 'Pass' ? 100 : 0;
          const weighted = (0.5 * complianceScore) + (0.3 * excellenceScore) + (0.2 * satisfactionScore);
          return sum + weighted;
        }, 0) / publishedSchools.length
      : 0;

    const avgGradeBand = getGradeBand(avgScore);

    // Count schools above A/A+
    const topSchools = publishedSchools.filter(s => {
      const score = (0.5 * 100) + (0.3 * s.published_score.excellence_score) + (0.2 * s.published_score.satisfaction_score);
      return score >= 90;
    }).length;

    // Active appeals (mock)
    const activeAppeals = 24;

    // SLA compliance rate (mock)
    const slaBreachRate = 5; // 5%

    // Compliance Metrics
    const compliantSchools = publishedSchools.filter(s => s.published_score.compliance === 'Pass').length;
    const complianceRate = publishedSchools.length > 0
      ? (compliantSchools / publishedSchools.length) * 100
      : 0;
    const nonCompliantSchools = publishedSchools.length - compliantSchools;

    // Mock data for specific compliance issues
    const licenseExpiring = 15; // Schools with licenses expiring within 3 months
    const safetyViolations = 28; // Schools with unresolved safety violations
    const financialIssues = 8; // Schools with financial compliance issues

    // Excellence Metrics
    const avgExcellence = publishedSchools.length > 0
      ? publishedSchools.reduce((sum, s) => sum + (s.published_score.excellence_score || 0), 0) / publishedSchools.length
      : 0;

    // Mock detailed excellence metrics
    const avgTeacherQualification = 87.5;
    const avgStudentTeacherRatio = 15; // 15:1

    // Satisfaction Metrics
    const avgSatisfaction = publishedSchools.length > 0
      ? publishedSchools.reduce((sum, s) => sum + (s.published_score.satisfaction_score || 0), 0) / publishedSchools.length
      : 0;

    // Mock detailed satisfaction metrics
    const avgParentSatisfaction = 86.2;
    const safetyIndex = 95; // Bullying index

    // Grade Distribution
    const gradeDistribution = {
      'A+': 0, 'A': 0, 'B+': 0, 'B': 0, 'C+': 0, 'C': 0, 'D+': 0, 'D': 0, 'E': 0, 'F': 0
    };

    publishedSchools.forEach(school => {
      if (school.published_score.excellence_grade) {
        gradeDistribution[school.published_score.excellence_grade] =
          (gradeDistribution[school.published_score.excellence_grade] || 0) + 1;
      }
    });

    // Regional breakdown
    const regionStats = {};
    mockSchools.forEach(school => {
      if (!regionStats[school.region]) {
        regionStats[school.region] = {
          total: 0,
          scores: [],
          gradeCount: { 'A+/A': 0, 'B+/B': 0, 'C+/C': 0, 'D+/D/F': 0 }
        };
      }
      regionStats[school.region].total++;

      if (school.published_score) {
        const score = (0.5 * 100) +
                     (0.3 * school.published_score.excellence_score) +
                     (0.2 * school.published_score.satisfaction_score);
        regionStats[school.region].scores.push(score);

        // Categorize grade
        if (score >= 90) regionStats[school.region].gradeCount['A+/A']++;
        else if (score >= 80) regionStats[school.region].gradeCount['B+/B']++;
        else if (score >= 70) regionStats[school.region].gradeCount['C+/C']++;
        else regionStats[school.region].gradeCount['D+/D/F']++;
      }
    });

    // Calculate average scores per region
    Object.keys(regionStats).forEach(region => {
      const scores = regionStats[region].scores;
      regionStats[region].avgScore = scores.length > 0
        ? scores.reduce((a, b) => a + b, 0) / scores.length
        : 0;
    });

    return {
      totalSchools,
      activeEvaluations,
      avgScore: avgScore.toFixed(1),
      avgGradeBand: avgGradeBand.grade,
      topSchools,
      activeAppeals,
      slaBreachRate,
      complianceRate: complianceRate.toFixed(1),
      nonCompliantSchools,
      licenseExpiring,
      safetyViolations,
      financialIssues,
      avgExcellence: avgExcellence.toFixed(1),
      avgTeacherQualification,
      avgStudentTeacherRatio,
      avgSatisfaction: avgSatisfaction.toFixed(1),
      avgParentSatisfaction,
      safetyIndex,
      gradeDistribution,
      regionStats,
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Master Dashboard</h1>
            <p className="text-gray-600 mt-1">Comprehensive system overview and analytics</p>
          </div>
          <Badge variant="primary" size="lg">
            Live Data
          </Badge>
        </div>

        {/* System-Wide KPIs */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">System Overview</h2>
          <div className="grid grid-cols-6 gap-4">
            <MasterKPICard
              title="Total Schools"
              value={metrics.totalSchools.toLocaleString()}
              subtitle="In system"
              icon={Building2}
              color="primary"
              trend={3}
            />
            <MasterKPICard
              title="Active Evaluations"
              value={metrics.activeEvaluations}
              subtitle="In progress"
              icon={FileCheck}
              color="warning"
              trend={-8}
            />
            <MasterKPICard
              title="Avg National Score"
              value={`${metrics.avgScore}%`}
              subtitle={`Grade: ${metrics.avgGradeBand}`}
              icon={Award}
              color="success"
              trend={2}
            />
            <MasterKPICard
              title="Top Performers"
              value={metrics.topSchools}
              subtitle="A+/A Grade"
              icon={TrendingUp}
              color="success"
              trend={5}
            />
            <MasterKPICard
              title="Active Appeals"
              value={metrics.activeAppeals}
              subtitle="Under review"
              icon={AlertTriangle}
              color="warning"
            />
            <MasterKPICard
              title="SLA Compliance"
              value={`${100 - metrics.slaBreachRate}%`}
              subtitle={`${metrics.slaBreachRate}% breached`}
              icon={Activity}
              color={metrics.slaBreachRate <= 5 ? 'success' : 'danger'}
              trend={3}
            />
          </div>
        </div>

        {/* Compliance Metrics */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Compliance Status</h2>
          <div className="grid grid-cols-5 gap-4">
            <MasterKPICard
              title="Compliance Rate"
              value={`${metrics.complianceRate}%`}
              subtitle={`${Math.round((parseFloat(metrics.complianceRate) / 100) * metrics.totalSchools)} schools`}
              icon={CheckCircle}
              color="success"
              trend={1}
            />
            <MasterKPICard
              title="Non-Compliant"
              value={metrics.nonCompliantSchools}
              subtitle="Require action"
              icon={XCircle}
              color="danger"
              trend={-15}
            />
            <MasterKPICard
              title="License Expiring"
              value={metrics.licenseExpiring}
              subtitle="Within 3 months"
              icon={AlertTriangle}
              color="warning"
            />
            <MasterKPICard
              title="Safety Violations"
              value={metrics.safetyViolations}
              subtitle="Unresolved"
              icon={Shield}
              color="danger"
            />
            <MasterKPICard
              title="Financial Issues"
              value={metrics.financialIssues}
              subtitle="Require review"
              icon={DollarSign}
              color="warning"
            />
          </div>
        </div>

        {/* Excellence & Satisfaction Metrics */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Excellence & Satisfaction</h2>
          <div className="grid grid-cols-6 gap-4">
            <MasterKPICard
              title="Avg Excellence"
              value={`${metrics.avgExcellence}%`}
              subtitle="Institutional"
              icon={GraduationCap}
              color="primary"
              trend={4}
              size="small"
            />
            <MasterKPICard
              title="Teacher Quality"
              value={`${metrics.avgTeacherQualification}%`}
              subtitle="Qualified"
              icon={Users}
              color="success"
              trend={2}
              size="small"
            />
            <MasterKPICard
              title="Student-Teacher"
              value={`${metrics.avgStudentTeacherRatio}:1`}
              subtitle="Ratio"
              icon={BookOpen}
              color="primary"
              size="small"
            />
            <MasterKPICard
              title="Avg Satisfaction"
              value={`${metrics.avgSatisfaction}%`}
              subtitle="Overall"
              icon={Heart}
              color="primary"
              trend={3}
              size="small"
            />
            <MasterKPICard
              title="Parent Satisfaction"
              value={`${metrics.avgParentSatisfaction}%`}
              subtitle="Survey"
              icon={Heart}
              color="success"
              trend={5}
              size="small"
            />
            <MasterKPICard
              title="Safety Index"
              value={`${metrics.safetyIndex}%`}
              subtitle="Bullying rate"
              icon={Shield}
              color="success"
              trend={2}
              size="small"
            />
          </div>
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-2 gap-6">
          {/* Grade Distribution */}
          <Card title="Grade Distribution" padding="default">
            <div className="space-y-3">
              {Object.entries(metrics.gradeDistribution).map(([grade, count]) => {
                const total = Object.values(metrics.gradeDistribution).reduce((a, b) => a + b, 0);
                const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
                const color = ['A+', 'A'].includes(grade) ? 'success'
                  : ['B+', 'B'].includes(grade) ? 'primary'
                  : ['C+', 'C'].includes(grade) ? 'warning'
                  : 'danger';

                return (
                  <div key={grade}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={color} size="sm">{grade}</Badge>
                        <span className="text-sm font-medium text-gray-700">{count} schools</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`bg-${color}-600 h-2 rounded-full transition-all`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Top & Bottom Performers */}
          <Card title="Performance Insights" padding="default">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Top Performers (Sample)</h4>
                <div className="space-y-2">
                  {mockSchools.filter(s => s.published_score).slice(0, 3).map(school => (
                    <div key={school.id} className="flex items-center justify-between p-2 bg-success-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{school.name}</p>
                        <p className="text-xs text-gray-600">{school.region}</p>
                      </div>
                      <Badge variant="success">{school.published_score.excellence_grade}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Requires Attention</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-warning-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{metrics.nonCompliantSchools} schools</p>
                      <p className="text-xs text-gray-600">Non-compliant status</p>
                    </div>
                    <Badge variant="danger">Action Required</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-warning-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{metrics.licenseExpiring} schools</p>
                      <p className="text-xs text-gray-600">License expiring soon</p>
                    </div>
                    <Badge variant="warning">Attention</Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Regional Breakdown Table */}
        <Card title="Regional Performance" padding="none">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Region</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Schools</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Avg Score</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">A+/A</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">B+/B</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">C+/C</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">D+/D/F</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(metrics.regionStats).map(([region, stats]) => {
                  const gradeBand = getGradeBand(stats.avgScore);
                  return (
                    <tr key={region} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{region}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="text-sm text-gray-900">{stats.total}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-sm font-semibold text-gray-900">
                            {stats.avgScore.toFixed(1)}%
                          </span>
                          <Badge variant={gradeBand.color} size="sm">{gradeBand.grade}</Badge>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="text-sm text-gray-900">{stats.gradeCount['A+/A']}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="text-sm text-gray-900">{stats.gradeCount['B+/B']}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="text-sm text-gray-900">{stats.gradeCount['C+/C']}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="text-sm text-gray-900">{stats.gradeCount['D+/D/F']}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {stats.avgScore >= 85 ? (
                          <Badge variant="success">Excellent</Badge>
                        ) : stats.avgScore >= 75 ? (
                          <Badge variant="primary">Good</Badge>
                        ) : (
                          <Badge variant="warning">Needs Improvement</Badge>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card title="Quick Actions" padding="default">
          <div className="grid grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/ops/evaluations')}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left"
            >
              <FileCheck className="w-8 h-8 text-primary-600 mb-2" />
              <h3 className="font-semibold text-gray-900">Review Evaluations</h3>
              <p className="text-sm text-gray-500 mt-1">{metrics.activeEvaluations} active</p>
            </button>

            <button
              onClick={() => navigate('/appeals')}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-warning-500 hover:bg-warning-50 transition-colors text-left"
            >
              <AlertTriangle className="w-8 h-8 text-warning-600 mb-2" />
              <h3 className="font-semibold text-gray-900">Manage Appeals</h3>
              <p className="text-sm text-gray-500 mt-1">{metrics.activeAppeals} pending</p>
            </button>

            <button
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-danger-500 hover:bg-danger-50 transition-colors text-left"
            >
              <XCircle className="w-8 h-8 text-danger-600 mb-2" />
              <h3 className="font-semibold text-gray-900">Non-Compliant Schools</h3>
              <p className="text-sm text-gray-500 mt-1">{metrics.nonCompliantSchools} require action</p>
            </button>

            <button
              onClick={() => navigate('/committee')}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left"
            >
              <Target className="w-8 h-8 text-primary-600 mb-2" />
              <h3 className="font-semibold text-gray-900">Adjust Indicators</h3>
              <p className="text-sm text-gray-500 mt-1">Committee dashboard</p>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MasterDashboard;
