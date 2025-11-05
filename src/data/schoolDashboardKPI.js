export const schoolDashboardKPI = {
  school_id: "SCH-RY-1001",
  school_name: "Al-Noor International School",

  overall_score: {
    current_score: 90.8,
    current_grade: "A",
    previous_score: 85.6,
    previous_grade: "B+",
    change_percentage: 5.2,
    change_direction: "up",
    comparison_period: "Oct 2024"
  },

  pending_items: {
    total_count: 3,
    compliance_count: 2,
    evidence_count: 1,
    items: [
      {
        type: "Compliance",
        indicator_code: "C105",
        indicator_name: "Emergency Evacuation Plans",
        due_date: "2025-11-10T23:59:59Z",
        priority: "high"
      },
      {
        type: "Compliance",
        indicator_code: "C108",
        indicator_name: "Health Insurance Documentation",
        due_date: "2025-11-10T23:59:59Z",
        priority: "high"
      },
      {
        type: "Evidence",
        indicator_code: "EX204",
        indicator_name: "Technology Resources - Additional Evidence Required",
        due_date: "2025-11-10T23:59:59Z",
        priority: "medium"
      }
    ]
  },

  deadline: {
    due_date: "2025-11-10T23:59:59Z",
    days_remaining: 13,
    status: "on_track" // "on_track", "warning", "urgent"
  },

  completion_progress: {
    completed_indicators: 14,
    total_indicators: 18,
    percentage: 78,
    remaining_questions: 4
  },

  evaluation_status: {
    status: "Returned for Correction",
    status_code: "returned",
    version: 2,
    max_versions: 4,
    action_required_by: "school",
    last_updated: "2025-11-03T14:30:00Z",
    ops_comment: "Please provide additional evidence for fire safety equipment and update emergency evacuation plans."
  }
};

export const getSchoolDashboardKPI = (schoolId) => {
  // In real implementation, this would fetch based on schoolId
  return schoolDashboardKPI;
};
