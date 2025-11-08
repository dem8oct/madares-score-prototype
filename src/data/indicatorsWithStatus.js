export const indicatorsWithStatus = [
  {
    indicator_code: "C101",
    domain: "Compliance",
    sub_category: "Health & Safety",
    indicator_name: "Valid Fire Safety Certificate",
    weight: 5,
    type: "M",
    score_type: "B",
    status: "Active",
    usage_statistics: {
      total_evaluations: 1247,
      evaluation_cycles: "Q1 2024 - Q4 2024",
      average_score_percentage: null,
      compliance_rate: 94.2,
      median_score: null,
      standard_deviation: null
    },
    performance_distribution: {
      compliant: 1175,
      non_compliant: 72
    },
    created_at: "2024-01-05T08:00:00Z",
    last_modified: "2025-09-15T10:00:00Z",
    last_modified_by: "Dr. Lina"
  },
  {
    indicator_code: "C102",
    domain: "Compliance",
    sub_category: "Financial",
    indicator_name: "External Financial Audit",
    weight: 5,
    type: "M",
    score_type: "B",
    status: "Active",
    usage_statistics: {
      total_evaluations: 1247,
      evaluation_cycles: "Q1 2024 - Q4 2024",
      compliance_rate: 96.8
    },
    performance_distribution: {
      compliant: 1207,
      non_compliant: 40
    },
    created_at: "2024-01-05T08:00:00Z",
    last_modified: "2024-01-05T08:00:00Z",
    last_modified_by: "Committee Team"
  },
  {
    indicator_code: "C103",
    domain: "Compliance",
    sub_category: "Health & Safety",
    indicator_name: "Emergency Evacuation Plans",
    weight: 5,
    type: "M",
    score_type: "B",
    status: "Active",
    usage_statistics: {
      total_evaluations: 1247,
      evaluation_cycles: "Q1 2024 - Q4 2024",
      compliance_rate: 91.5
    },
    performance_distribution: {
      compliant: 1141,
      non_compliant: 106
    },
    created_at: "2024-01-05T08:00:00Z",
    last_modified: "2024-01-05T08:00:00Z",
    last_modified_by: "Committee Team"
  },
  {
    indicator_code: "EX201",
    domain: "Institutional Excellence",
    sub_category: "Teaching Quality",
    indicator_name: "Teacher Training Completion Rate",
    weight: 4,
    type: "A",
    score_type: "N",
    status: "Active",
    usage_statistics: {
      total_evaluations: 1247,
      evaluation_cycles: "Q1 2024 - Q4 2024",
      average_score_percentage: 78.3,
      compliance_rate: null,
      median_score: 82,
      standard_deviation: 15.2
    },
    performance_distribution: {
      "0-20": 45,
      "20-40": 89,
      "40-60": 156,
      "60-80": 387,
      "80-100": 570
    },
    grade_distribution: {
      "A+": 123,
      "A": 187,
      "B+": 245,
      "B": 298,
      "C+": 189,
      "C": 134,
      "D": 56,
      "F": 15
    },
    change_history: [
      {
        date: "2025-09-15T10:00:00Z",
        changed_by: "Dr. Lina",
        change_type: "Weight Adjustment",
        old_value: 3,
        new_value: 4,
        rationale: "Increased priority aligned with 2025 MoE strategic focus on teacher professional development."
      },
      {
        date: "2025-03-10T10:00:00Z",
        changed_by: "Dr. Khalid",
        change_type: "Formula Update",
        change_description: "Added minimum 20-hour requirement threshold",
        rationale: "Align with updated MoE PD standards."
      }
    ],
    created_at: "2024-01-05T08:00:00Z",
    last_modified: "2025-09-15T10:00:00Z",
    last_modified_by: "Dr. Lina"
  },
  {
    indicator_code: "EX202",
    domain: "Institutional Excellence",
    sub_category: "Academic Achievement",
    indicator_name: "Student Achievement Rate",
    weight: 4,
    type: "A",
    score_type: "N",
    status: "Active",
    usage_statistics: {
      total_evaluations: 1247,
      evaluation_cycles: "Q1 2024 - Q4 2024",
      average_score_percentage: 81.5,
      median_score: 84,
      standard_deviation: 12.8
    },
    performance_distribution: {
      "0-20": 23,
      "20-40": 67,
      "40-60": 134,
      "60-80": 456,
      "80-100": 567
    },
    created_at: "2024-01-05T08:00:00Z",
    last_modified: "2024-01-05T08:00:00Z",
    last_modified_by: "Committee Team"
  },
  {
    indicator_code: "EX203",
    domain: "Institutional Excellence",
    sub_category: "Infrastructure",
    indicator_name: "Infrastructure Quality Index",
    weight: 3,
    type: "A",
    score_type: "N",
    status: "Active",
    usage_statistics: {
      total_evaluations: 1247,
      evaluation_cycles: "Q1 2024 - Q4 2024",
      average_score_percentage: 75.8,
      median_score: 78,
      standard_deviation: 16.3
    },
    performance_distribution: {
      "0-20": 56,
      "20-40": 98,
      "40-60": 189,
      "60-80": 412,
      "80-100": 492
    },
    created_at: "2024-01-05T08:00:00Z",
    last_modified: "2024-01-05T08:00:00Z",
    last_modified_by: "Committee Team"
  },
  {
    indicator_code: "EX204",
    domain: "Institutional Excellence",
    sub_category: "Technology",
    indicator_name: "Technology Resources Availability",
    weight: 3,
    type: "A",
    score_type: "N",
    status: "Active",
    usage_statistics: {
      total_evaluations: 1247,
      evaluation_cycles: "Q1 2024 - Q4 2024",
      average_score_percentage: 72.6,
      median_score: 75,
      standard_deviation: 18.1
    },
    performance_distribution: {
      "0-20": 78,
      "20-40": 124,
      "40-60": 223,
      "60-80": 398,
      "80-100": 424
    },
    created_at: "2024-01-05T08:00:00Z",
    last_modified: "2024-01-05T08:00:00Z",
    last_modified_by: "Committee Team"
  },
  {
    indicator_code: "EX205",
    domain: "Institutional Excellence",
    sub_category: "Legacy Metrics",
    indicator_name: "Outdated Infrastructure Index",
    weight: 3,
    type: "A",
    score_type: "N",
    status: "Disabled",
    disabled_at: "2025-08-01T10:00:00Z",
    disabled_by: "Dr. Lina",
    disable_reason: "Replaced by new indicator EX206 with updated formula and better data sources.",
    usage_statistics: {
      total_evaluations: 876,
      evaluation_cycles: "Q1 2024 - Q2 2024",
      average_score_percentage: 72.1,
      median_score: 75,
      standard_deviation: 18.5
    },
    performance_distribution: {
      "0-20": 67,
      "20-40": 112,
      "40-60": 198,
      "60-80": 345,
      "80-100": 154
    },
    created_at: "2024-01-05T08:00:00Z",
    last_modified: "2025-08-01T10:00:00Z",
    last_modified_by: "Dr. Lina"
  },
  {
    indicator_code: "BS301",
    domain: "Beneficiary Satisfaction",
    sub_category: "Parent Engagement",
    indicator_name: "Parent Satisfaction Survey",
    weight: 3,
    type: "A",
    score_type: "N",
    status: "Active",
    usage_statistics: {
      total_evaluations: 1247,
      evaluation_cycles: "Q1 2024 - Q4 2024",
      average_score_percentage: 83.2,
      median_score: 85,
      standard_deviation: 11.4
    },
    performance_distribution: {
      "0-20": 12,
      "20-40": 45,
      "40-60": 98,
      "60-80": 434,
      "80-100": 658
    },
    created_at: "2024-01-05T08:00:00Z",
    last_modified: "2024-01-05T08:00:00Z",
    last_modified_by: "Committee Team"
  },
  {
    indicator_code: "BS302",
    domain: "Beneficiary Satisfaction",
    sub_category: "Safety",
    indicator_name: "Student Safety Perception Index",
    weight: 3,
    type: "A",
    score_type: "N",
    status: "Active",
    usage_statistics: {
      total_evaluations: 1247,
      evaluation_cycles: "Q1 2024 - Q4 2024",
      average_score_percentage: 86.7,
      median_score: 88,
      standard_deviation: 9.8
    },
    performance_distribution: {
      "0-20": 8,
      "20-40": 34,
      "40-60": 76,
      "60-80": 387,
      "80-100": 742
    },
    created_at: "2024-01-05T08:00:00Z",
    last_modified: "2024-01-05T08:00:00Z",
    last_modified_by: "Committee Team"
  },
  {
    indicator_code: "C104",
    domain: "Compliance",
    sub_category: "Licensing",
    indicator_name: "Teacher Licensing Compliance",
    weight: 5,
    type: "M",
    score_type: "B",
    status: "Active",
    usage_statistics: {
      total_evaluations: 1247,
      evaluation_cycles: "Q1 2024 - Q4 2024",
      compliance_rate: 98.2
    },
    performance_distribution: {
      compliant: 1225,
      non_compliant: 22
    },
    created_at: "2024-01-05T08:00:00Z",
    last_modified: "2024-01-05T08:00:00Z",
    last_modified_by: "Committee Team"
  },
  {
    indicator_code: "C105",
    domain: "Compliance",
    sub_category: "Health & Safety",
    indicator_name: "Emergency Preparedness Training",
    weight: 4,
    type: "M",
    score_type: "B",
    status: "Active",
    usage_statistics: {
      total_evaluations: 1247,
      evaluation_cycles: "Q1 2024 - Q4 2024",
      compliance_rate: 88.7
    },
    performance_distribution: {
      compliant: 1106,
      non_compliant: 141
    },
    created_at: "2024-01-05T08:00:00Z",
    last_modified: "2024-01-05T08:00:00Z",
    last_modified_by: "Committee Team"
  },
  {
    indicator_code: "EX206",
    domain: "Institutional Excellence",
    sub_category: "Infrastructure",
    indicator_name: "Learning Resources Availability",
    weight: 3,
    type: "A",
    score_type: "N",
    status: "Active",
    usage_statistics: {
      total_evaluations: 371,
      evaluation_cycles: "Q3 2024 - Q4 2024",
      average_score_percentage: 80.5,
      median_score: 82,
      standard_deviation: 14.2
    },
    performance_distribution: {
      "0-20": 15,
      "20-40": 28,
      "40-60": 67,
      "60-80": 142,
      "80-100": 119
    },
    change_history: [
      {
        date: "2025-08-01T10:00:00Z",
        changed_by: "Dr. Lina",
        change_type: "Created",
        change_description: "New indicator to replace EX205",
        rationale: "Updated formula and better data sources for modern infrastructure assessment."
      }
    ],
    created_at: "2025-08-01T10:00:00Z",
    last_modified: "2025-08-01T10:00:00Z",
    last_modified_by: "Dr. Lina"
  },
  {
    indicator_code: "BS303",
    domain: "Beneficiary Satisfaction",
    sub_category: "Student Engagement",
    indicator_name: "Student Wellbeing Index",
    weight: 3,
    type: "A",
    score_type: "N",
    status: "Active",
    usage_statistics: {
      total_evaluations: 1247,
      evaluation_cycles: "Q1 2024 - Q4 2024",
      average_score_percentage: 82.4,
      median_score: 84,
      standard_deviation: 13.1
    },
    performance_distribution: {
      "0-20": 18,
      "20-40": 52,
      "40-60": 112,
      "60-80": 445,
      "80-100": 620
    },
    created_at: "2024-01-05T08:00:00Z",
    last_modified: "2024-01-05T08:00:00Z",
    last_modified_by: "Committee Team"
  }
];

export const getActiveIndicators = () => {
  return indicatorsWithStatus.filter(ind => ind.status === "Active");
};

export const getDisabledIndicators = () => {
  return indicatorsWithStatus.filter(ind => ind.status === "Disabled");
};

export const getIndicatorByCode = (code) => {
  return indicatorsWithStatus.find(ind => ind.indicator_code === code);
};

export const getIndicatorsByDomain = (domain) => {
  return indicatorsWithStatus.filter(ind => ind.domain === domain);
};
