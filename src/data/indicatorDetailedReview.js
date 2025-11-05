// Enhanced indicator data for detailed review page
import { indicatorsWithStatus } from './indicatorsWithStatus';

// Add detailed metadata to indicators
export const getIndicatorDetailedData = (indicatorCode) => {
  const baseIndicator = indicatorsWithStatus.find(ind => ind.indicator_code === indicatorCode);

  if (!baseIndicator) return null;

  // Enhanced metadata based on indicator type
  const detailedMetadata = {
    C101: {
      formula: "Binary check: Valid certificate exists AND expiry date > current date",
      data_source: "School uploaded documents + Civil Defense API verification",
      calculation_inputs: [
        "certificate_document (PDF upload)",
        "expiry_date (Date field)",
        "civil_defense_api_verification (Boolean)"
      ]
    },
    EX201: {
      formula: "(teachers_completed_annual_pd / total_teachers) * 100",
      data_source: "Noor API + Ministry PD Database",
      calculation_inputs: [
        "teachers_completed_annual_pd (from PD DB)",
        "total_teachers (from Noor)"
      ]
    },
    EX202: {
      formula: "(students_scoring_above_70 / total_students) * 100",
      data_source: "National Standardized Tests Database",
      calculation_inputs: [
        "students_scoring_above_70 (from Test DB)",
        "total_students (from Noor)"
      ]
    },
    EX203: {
      formula: "Weighted composite: (lab_quality * 0.3) + (library_quality * 0.25) + (facilities_quality * 0.25) + (safety_features * 0.2)",
      data_source: "School self-report + Ops verification + Inspector findings",
      calculation_inputs: [
        "lab_quality_score (0-100)",
        "library_quality_score (0-100)",
        "facilities_quality_score (0-100)",
        "safety_features_score (0-100)"
      ]
    },
    BS301: {
      formula: "(parents_satisfied / total_parent_responses) * 100",
      data_source: "Annual Parent Satisfaction Survey (Ministry Portal)",
      calculation_inputs: [
        "parents_satisfied (rating >= 4/5)",
        "total_parent_responses (min 50% response rate required)"
      ]
    }
  };

  return {
    ...baseIndicator,
    detailed_metadata: detailedMetadata[indicatorCode] || {
      formula: "Standard calculation based on indicator type",
      data_source: "Multiple sources",
      calculation_inputs: ["Input data varies by indicator"]
    }
  };
};

// Get all indicators with detailed data
export const getAllIndicatorsDetailed = () => {
  return indicatorsWithStatus.map(ind => getIndicatorDetailedData(ind.indicator_code));
};
