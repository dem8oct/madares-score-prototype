import usersData from './users.json';
import schoolsData from './schools.json';
import evaluationsData from './evaluations.json';
import indicatorsData from './indicators.json';

// Calculate grade band from score
export const getGradeBand = (score) => {
  const bands = indicatorsData.grade_bands;
  const band = bands.find(b => score >= b.min && score <= b.max);
  return band || { grade: 'F', color: 'danger' };
};

// Calculate domain score (weighted average)
export const calculateDomainScore = (indicators) => {
  if (!indicators || indicators.length === 0) return 0;

  const totalWeightedScore = indicators.reduce((sum, ind) => {
    return sum + (ind.score * ind.weight);
  }, 0);

  const totalWeight = indicators.reduce((sum, ind) => sum + ind.weight, 0);

  return totalWeight > 0 ? (totalWeightedScore / totalWeight) : 0;
};

// Calculate overall school score
export const calculateOverallScore = (evaluation) => {
  const domains = indicatorsData.domains;

  const excellenceScore = calculateDomainScore(evaluation.excellence_indicators);
  const satisfactionScore = calculateDomainScore(evaluation.satisfaction_indicators);

  // Compliance is binary - if all pass, it's 100, else 0 (for calculation purposes)
  const complianceScore = 100; // Mock: assume pass

  const overall =
    (domains[0].weight * complianceScore) +
    (domains[1].weight * excellenceScore) +
    (domains[2].weight * satisfactionScore);

  return Math.round(overall * 10) / 10; // Round to 1 decimal
};

// Get SLA color based on days remaining
export const getSLAColor = (deadline) => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const daysRemaining = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));

  if (daysRemaining < 0) return 'danger'; // Overdue
  if (daysRemaining <= 3) return 'danger'; // Critical
  if (daysRemaining <= 7) return 'warning'; // Warning
  return 'success'; // On track
};

// Get days remaining text
export const getDaysRemainingText = (deadline) => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const daysRemaining = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));

  if (daysRemaining < 0) return `${Math.abs(daysRemaining)} days overdue`;
  if (daysRemaining === 0) return 'Due today';
  if (daysRemaining === 1) return '1 day remaining';
  return `${daysRemaining} days remaining`;
};

// Filter evaluations by criteria
export const filterEvaluations = (evaluations, filters) => {
  return evaluations.filter(evaluation => {
    if (filters.region && filters.region !== 'all' && evaluation.region !== filters.region) {
      return false;
    }
    if (filters.city && filters.city !== 'all' && evaluation.city !== filters.city) {
      return false;
    }
    if (filters.level && filters.level !== 'all' && evaluation.level !== filters.level) {
      return false;
    }
    if (filters.status && filters.status !== 'all' && evaluation.status !== filters.status) {
      return false;
    }
    return true;
  });
};

// Get status label
export const getStatusLabel = (status) => {
  const statusLabels = {
    draft: { en: 'Draft', ar: 'مسودة' },
    in_progress: { en: 'In Progress', ar: 'قيد التنفيذ' },
    submitted: { en: 'Submitted', ar: 'مقدم' },
    under_review: { en: 'Under Review', ar: 'قيد المراجعة' },
    returned_for_correction: { en: 'Returned for Correction', ar: 'تم الإرجاع للتصحيح' },
    pending_committee: { en: 'Pending Committee', ar: 'في انتظار اللجنة' },
    approved: { en: 'Approved', ar: 'معتمد' },
    published: { en: 'Published', ar: 'منشور' },
    closed: { en: 'Closed', ar: 'مغلق' }
  };
  return statusLabels[status] || { en: status, ar: status };
};

// Get status color variant for Badge component
export const getStatusVariant = (status) => {
  const variantMap = {
    draft: 'default',
    in_progress: 'warning',
    submitted: 'primary',
    under_review: 'primary',
    returned_for_correction: 'danger',
    pending_committee: 'warning',
    approved: 'success',
    published: 'success',
    closed: 'default'
  };
  return variantMap[status] || 'default';
};

// Format date to readable string
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Get user by ID
export const getUserById = (userId) => {
  return mockUsers.find(u => u.id === userId);
};

// Get school by ID
export const getSchoolById = (schoolId) => {
  return mockSchools.find(s => s.id === schoolId);
};

// Get evaluation by ID
export const getEvaluationById = (evalId) => {
  return mockEvaluations.find(e => e.id === evalId);
};

// Get evaluations by school ID
export const getEvaluationsBySchool = (schoolId) => {
  return mockEvaluations.filter(e => e.school_id === schoolId);
};

// Get evaluations by reviewer
export const getEvaluationsByReviewer = (reviewerId) => {
  return mockEvaluations.filter(e => e.assigned_reviewer === reviewerId);
};

// Get unique regions from evaluations
export const getUniqueRegions = () => {
  const regions = mockEvaluations.map(e => e.region);
  return [...new Set(regions)].filter(Boolean);
};

// Get unique cities from evaluations
export const getUniqueCities = (region = null) => {
  let evals = mockEvaluations;
  if (region) {
    evals = evals.filter(e => e.region === region);
  }
  const cities = evals.map(e => e.city);
  return [...new Set(cities)].filter(Boolean);
};

// Get unique levels from evaluations
export const getUniqueLevels = () => {
  const levels = mockEvaluations.map(e => e.level);
  return [...new Set(levels)].filter(Boolean);
};

// Calculate completion percentage
export const calculateCompletionPercentage = (evaluation) => {
  if (!evaluation || !evaluation.compliance_data) return 0;

  const questions = evaluation.compliance_data.questions || [];
  if (questions.length === 0) return 0;

  const completed = questions.filter(q => q.status === 'complete').length;
  return Math.round((completed / questions.length) * 100);
};

// Export mock data
export const mockUsers = usersData.users;
export const mockSchools = schoolsData.schools;
export const mockEvaluations = evaluationsData.evaluations;
export const mockIndicators = indicatorsData.indicators;
export const mockDomains = indicatorsData.domains;
export const mockGradeBands = indicatorsData.grade_bands;
