/**
 * Inspector Auto-Assignment Utility
 * Assigns inspectors to evaluation requests based on region, specialization, and workload
 */

import users from '../data/users.json';

// Get all inspectors from users
export const getInspectors = () => {
  return users.users.filter(user => user.role === 'inspector');
};

// Map indicator domains/categories to inspector specializations
const getSpecializationForIndicator = (indicator) => {
  if (!indicator) return null;

  const domain = indicator.domain || '';
  const category = indicator.sub_category || indicator.category || '';

  // Map domains/categories to specializations
  const specializationMap = {
    'Health & Safety': 'Safety',
    'Safety & Security': 'Safety',
    'Licensing': 'Infrastructure',
    'Infrastructure': 'Infrastructure',
    'Facilities': 'Facilities',
    'Technology': 'Technology',
    'Teaching Quality': 'Teaching Quality',
    'Academic Programs': 'Teaching Quality',
    'Academic Achievement': 'Academic Achievement',
    'Student Performance': 'Academic Achievement',
  };

  // Try category first, then domain
  return specializationMap[category] || specializationMap[domain] || null;
};

// Calculate current workload for an inspector (mock - count assignments)
const getInspectorWorkload = (inspectorId, existingEvaluations = []) => {
  if (!existingEvaluations || existingEvaluations.length === 0) return 0;

  return existingEvaluations.filter(
    evaluation => evaluation.assigned_inspector === inspectorId &&
    !['approved', 'published', 'closed'].includes(evaluation.status)
  ).length;
};

/**
 * Auto-assign an inspector to a school evaluation
 * @param {Object} school - School object with region
 * @param {Array} indicators - Selected indicators for this evaluation
 * @param {Array} existingEvaluations - Existing evaluations for workload calculation
 * @returns {Object|null} - Assigned inspector user object or null
 */
export const autoAssignInspector = (school, indicators = [], existingEvaluations = []) => {
  const inspectors = getInspectors();

  if (inspectors.length === 0) return null;

  const schoolRegion = school.region;

  // Step 1: Filter by region (priority)
  let candidateInspectors = inspectors.filter(
    inspector => inspector.region === schoolRegion
  );

  // If no inspectors in the region, fall back to all inspectors
  if (candidateInspectors.length === 0) {
    candidateInspectors = inspectors;
  }

  // Step 2: Score inspectors based on specialization match
  const scoredInspectors = candidateInspectors.map(inspector => {
    let specializationScore = 0;

    if (inspector.specialization && Array.isArray(inspector.specialization)) {
      // Check if inspector's specializations match any indicator requirements
      indicators.forEach(indicator => {
        const requiredSpec = getSpecializationForIndicator(indicator);
        if (requiredSpec && inspector.specialization.includes(requiredSpec)) {
          specializationScore += 10; // Bonus points for matching specialization
        }
      });
    }

    return {
      ...inspector,
      specializationScore
    };
  });

  // Step 3: Sort by specialization match first, then by workload (ascending)
  scoredInspectors.sort((a, b) => {
    // Higher specialization score = better match (descending)
    if (b.specializationScore !== a.specializationScore) {
      return b.specializationScore - a.specializationScore;
    }

    // Lower workload = better choice (ascending)
    const workloadA = getInspectorWorkload(a.id, existingEvaluations);
    const workloadB = getInspectorWorkload(b.id, existingEvaluations);
    return workloadA - workloadB;
  });

  // Return the best match (first in sorted list)
  return scoredInspectors[0] || null;
};

/**
 * Auto-assign inspectors to multiple schools
 * @param {Array} schools - Array of school objects
 * @param {Array} indicators - Selected indicators for evaluations
 * @param {Array} existingEvaluations - Existing evaluations for workload calculation
 * @returns {Object} - Map of school_id -> assigned inspector
 */
export const autoAssignInspectorsToSchools = (schools, indicators, existingEvaluations = []) => {
  const assignments = {};

  // Create a mutable copy of evaluations to track workload as we assign
  let currentEvaluations = [...existingEvaluations];

  schools.forEach(school => {
    const assignedInspector = autoAssignInspector(school, indicators, currentEvaluations);

    if (assignedInspector) {
      assignments[school.school_id] = assignedInspector.id;

      // Mock: Add a temporary evaluation to track workload for next assignment
      currentEvaluations.push({
        school_id: school.school_id,
        assigned_inspector: assignedInspector.id,
        status: 'in_progress'
      });
    }
  });

  return assignments;
};

/**
 * Get assignment summary for display
 * @param {Object} assignments - Map of school_id -> inspector_id
 * @returns {Array} - Array of {inspector, count} objects
 */
export const getAssignmentSummary = (assignments) => {
  const inspectors = getInspectors();
  const summary = {};

  Object.values(assignments).forEach(inspectorId => {
    if (!summary[inspectorId]) {
      summary[inspectorId] = {
        inspector: inspectors.find(i => i.id === inspectorId),
        count: 0
      };
    }
    summary[inspectorId].count += 1;
  });

  return Object.values(summary).filter(s => s.inspector);
};
