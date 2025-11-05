// Mock data for School Evaluation History (Feature 8)

export const evaluationHistory = [
  {
    cycle_id: "eval_2025_q4",
    cycle_name: "Q4 2025",
    period: "Oct - Nov 2025",
    status: "Approved",
    is_current: true,
    overall_score: 90.8,
    grade: "A",
    submitted_date: "2025-11-01T10:00:00Z",
    approved_date: "2025-11-05T14:30:00Z",
    version: "2/4",
    correction_cycles: 1,
    domain_scores: {
      compliance: {
        status: "Compliant",
        indicators: [
          { code: "C101", name: "Fire Safety Certificate", status: "Compliant", trend: "stable" },
          { code: "C102", name: "Financial Audit", status: "Compliant", trend: "stable" },
          { code: "C103", name: "Teacher Licensing", status: "Compliant", trend: "stable" },
          { code: "C105", name: "Emergency Plans", status: "Compliant", trend: "stable" },
          { code: "C108", name: "Health Insurance", status: "Compliant", trend: "stable" }
        ]
      },
      excellence: {
        score: 85,
        grade: "B+",
        weight: 30,
        indicators: [
          { code: "EX201", name: "Teacher Training", score: 82, grade: "B+", trend: "up", change: 4 },
          { code: "EX202", name: "Student Achievement", score: 88, grade: "A", trend: "up", change: 6 },
          { code: "EX203", name: "Infrastructure", score: 85, grade: "B+", trend: "stable", change: 0 },
          { code: "EX204", name: "Technology Resources", score: 80, grade: "B", trend: "up", change: 2 }
        ]
      },
      satisfaction: {
        score: 91,
        grade: "A",
        weight: 20,
        indicators: [
          { code: "BS301", name: "Parent Satisfaction", score: 88, grade: "A", trend: "up", change: 3 },
          { code: "BS302", name: "Safety Index", score: 95, grade: "A+", trend: "up", change: 5 },
          { code: "BS303", name: "Teacher Engagement", score: 89, grade: "A", trend: "up", change: 1 }
        ]
      }
    }
  },
  {
    cycle_id: "eval_2025_q3",
    cycle_name: "Q3 2025",
    period: "Jul - Aug 2025",
    status: "Approved",
    is_current: false,
    overall_score: 85.6,
    grade: "B+",
    submitted_date: "2025-08-15T10:00:00Z",
    approved_date: "2025-08-20T14:30:00Z",
    version: "1/4",
    correction_cycles: 0,
    domain_scores: {
      compliance: {
        status: "Compliant",
        indicators: [
          { code: "C101", name: "Fire Safety Certificate", status: "Compliant", trend: "stable" },
          { code: "C102", name: "Financial Audit", status: "Compliant", trend: "stable" },
          { code: "C103", name: "Teacher Licensing", status: "Compliant", trend: "stable" },
          { code: "C105", name: "Emergency Plans", status: "Compliant", trend: "stable" },
          { code: "C108", name: "Health Insurance", status: "Compliant", trend: "stable" }
        ]
      },
      excellence: {
        score: 82,
        grade: "B",
        weight: 30,
        indicators: [
          { code: "EX201", name: "Teacher Training", score: 78, grade: "B", trend: "stable", change: 0 },
          { code: "EX202", name: "Student Achievement", score: 82, grade: "B+", trend: "stable", change: 0 },
          { code: "EX203", name: "Infrastructure", score: 85, grade: "B+", trend: "stable", change: 0 },
          { code: "EX204", name: "Technology Resources", score: 78, grade: "B", trend: "stable", change: 0 }
        ]
      },
      satisfaction: {
        score: 88,
        grade: "B+",
        weight: 20,
        indicators: [
          { code: "BS301", name: "Parent Satisfaction", score: 85, grade: "B+", trend: "stable", change: 0 },
          { code: "BS302", name: "Safety Index", score: 90, grade: "A", trend: "stable", change: 0 },
          { code: "BS303", name: "Teacher Engagement", score: 88, grade: "A", trend: "stable", change: 0 }
        ]
      }
    }
  },
  {
    cycle_id: "eval_2025_q2",
    cycle_name: "Q2 2025",
    period: "Apr - May 2025",
    status: "Approved",
    is_current: false,
    overall_score: 80.2,
    grade: "B",
    submitted_date: "2025-05-15T10:00:00Z",
    approved_date: "2025-05-22T14:30:00Z",
    version: "1/4",
    correction_cycles: 0,
    domain_scores: {
      compliance: {
        status: "Compliant",
        indicators: [
          { code: "C101", name: "Fire Safety Certificate", status: "Compliant" },
          { code: "C102", name: "Financial Audit", status: "Compliant" },
          { code: "C103", name: "Teacher Licensing", status: "Compliant" },
          { code: "C105", name: "Emergency Plans", status: "Compliant" },
          { code: "C108", name: "Health Insurance", status: "Compliant" }
        ]
      },
      excellence: {
        score: 78,
        grade: "C+",
        weight: 30,
        indicators: [
          { code: "EX201", name: "Teacher Training", score: 75, grade: "C+" },
          { code: "EX202", name: "Student Achievement", score: 80, grade: "B" },
          { code: "EX203", name: "Infrastructure", score: 78, grade: "B" },
          { code: "EX204", name: "Technology Resources", score: 76, grade: "C+" }
        ]
      },
      satisfaction: {
        score: 82,
        grade: "B",
        weight: 20,
        indicators: [
          { code: "BS301", name: "Parent Satisfaction", score: 80, grade: "B" },
          { code: "BS302", name: "Safety Index", score: 85, grade: "B+" },
          { code: "BS303", name: "Teacher Engagement", score: 81, grade: "B" }
        ]
      }
    }
  },
  {
    cycle_id: "eval_2025_q1",
    cycle_name: "Q1 2025",
    period: "Jan - Feb 2025",
    status: "Not Approved",
    is_current: false,
    overall_score: 70.5,
    grade: "C",
    submitted_date: "2025-02-15T10:00:00Z",
    approved_date: null,
    version: "3/4",
    correction_cycles: 2,
    failure_reason: "Failed due to non-compliance in Fire Safety",
    domain_scores: {
      compliance: {
        status: "Not Compliant",
        failure_indicator: "C101",
        indicators: [
          { code: "C101", name: "Fire Safety Certificate", status: "Non-Compliant", issue: "Certificate expired" },
          { code: "C102", name: "Financial Audit", status: "Compliant" },
          { code: "C103", name: "Teacher Licensing", status: "Compliant" },
          { code: "C105", name: "Emergency Plans", status: "Compliant" },
          { code: "C108", name: "Health Insurance", status: "Compliant" }
        ]
      },
      excellence: {
        score: 80,
        grade: "B",
        weight: 30,
        indicators: [
          { code: "EX201", name: "Teacher Training", score: 78, grade: "B" },
          { code: "EX202", name: "Student Achievement", score: 82, grade: "B+" },
          { code: "EX203", name: "Infrastructure", score: 80, grade: "B" },
          { code: "EX204", name: "Technology Resources", score: 75, grade: "C+" }
        ]
      },
      satisfaction: {
        score: 75,
        grade: "C+",
        weight: 20,
        indicators: [
          { code: "BS301", name: "Parent Satisfaction", score: 72, grade: "C" },
          { code: "BS302", name: "Safety Index", score: 78, grade: "B" },
          { code: "BS303", name: "Teacher Engagement", score: 75, grade: "C+" }
        ]
      }
    }
  }
];

// Historical trend data for charts (6 cycles)
export const historicalTrendData = [
  { cycle: "Q3 2024", date: "2024-08", score: 78.5, grade: "B" },
  { cycle: "Q4 2024", date: "2024-11", score: 80.0, grade: "B" },
  { cycle: "Q1 2025", date: "2025-02", score: 70.5, grade: "C", failed: true },
  { cycle: "Q2 2025", date: "2025-05", score: 80.2, grade: "B" },
  { cycle: "Q3 2025", date: "2025-08", score: 85.6, grade: "B+" },
  { cycle: "Q4 2025", date: "2025-11", score: 90.8, grade: "A", current: true }
];

// Get indicator trend over time
export const getIndicatorTrend = (indicatorCode) => {
  const trendData = {
    EX201: [
      { cycle: "Q3 2024", score: 72 },
      { cycle: "Q4 2024", score: 75 },
      { cycle: "Q1 2025", score: 78 },
      { cycle: "Q2 2025", score: 75 },
      { cycle: "Q3 2025", score: 78 },
      { cycle: "Q4 2025", score: 82 }
    ],
    EX202: [
      { cycle: "Q3 2024", score: 76 },
      { cycle: "Q4 2024", score: 78 },
      { cycle: "Q1 2025", score: 82 },
      { cycle: "Q2 2025", score: 80 },
      { cycle: "Q3 2025", score: 82 },
      { cycle: "Q4 2025", score: 88 }
    ],
    BS301: [
      { cycle: "Q3 2024", score: 75 },
      { cycle: "Q4 2024", score: 78 },
      { cycle: "Q1 2025", score: 72 },
      { cycle: "Q2 2025", score: 80 },
      { cycle: "Q3 2025", score: 85 },
      { cycle: "Q4 2025", score: 88 }
    ]
  };

  return trendData[indicatorCode] || [];
};

// Filter evaluation history
export const filterEvaluationHistory = (filters) => {
  return evaluationHistory.filter(cycle => {
    if (filters.year && !cycle.cycle_name.includes(filters.year)) {
      return false;
    }
    if (filters.status === 'Approved Only' && cycle.status !== 'Approved') {
      return false;
    }
    if (filters.status === 'Failed Only' && cycle.status === 'Approved') {
      return false;
    }
    return true;
  });
};
