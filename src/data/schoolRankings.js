export const schoolRankings = {
  school_id: "SCH-RY-1001",
  school_name: "Al-Noor International School",
  current_evaluation: {
    cycle: "Q4 2025",
    overall_score: 90.8,
    overall_grade: "A",
    compliance: "Compliant",
    excellence_score: 85,
    excellence_grade: "B+",
    satisfaction_score: 91,
    satisfaction_grade: "A"
  },
  rankings: {
    region: {
      rank: 15,
      total_schools: 342,
      region_name: "Riyadh Region",
      percentile: 95.6,
      percentile_band: "Top 5%",
      regional_average: 78.3,
      above_average_by: 12.5
    },
    city: {
      rank: 8,
      total_schools: 89,
      city_name: "Riyadh City",
      percentile: 91.0,
      percentile_band: "Top 10%",
      city_average: 80.1,
      above_average_by: 10.7
    },
    school_type: {
      rank: 12,
      total_schools: 156,
      school_type: "Private International Schools",
      percentile: 92.3,
      percentile_band: "Top 10%",
      type_average: 82.5,
      above_average_by: 8.3
    }
  },
  year_over_year: {
    previous_cycle: "Q3 2025",
    previous_score: 85.6,
    previous_grade: "B+",
    change_percentage: 5.2,
    change_direction: "up",
    trend: "Improving"
  },
  historical_performance: [
    { cycle: "Q1 2020", date: "2020-02-01", score: 62.5, grade: "C" },
    { cycle: "Q2 2020", date: "2020-05-01", score: 65.8, grade: "C+" },
    { cycle: "Q3 2020", date: "2020-08-01", score: 68.2, grade: "C+" },
    { cycle: "Q4 2020", date: "2020-11-01", score: 70.5, grade: "C+" },
    { cycle: "Q1 2021", date: "2021-02-01", score: 72.3, grade: "C+" },
    { cycle: "Q2 2021", date: "2021-05-01", score: 74.8, grade: "C+" },
    { cycle: "Q3 2021", date: "2021-08-01", score: 76.1, grade: "C+" },
    { cycle: "Q4 2021", date: "2021-11-01", score: 78.5, grade: "B" },
    { cycle: "Q1 2022", date: "2022-02-01", score: 79.2, grade: "B" },
    { cycle: "Q2 2022", date: "2022-05-01", score: 80.7, grade: "B" },
    { cycle: "Q3 2022", date: "2022-08-01", score: 81.5, grade: "B" },
    { cycle: "Q4 2022", date: "2022-11-01", score: 82.3, grade: "B" },
    { cycle: "Q1 2023", date: "2023-02-01", score: 83.1, grade: "B" },
    { cycle: "Q2 2023", date: "2023-05-01", score: 83.8, grade: "B" },
    { cycle: "Q3 2023", date: "2023-08-01", score: 84.5, grade: "B" },
    { cycle: "Q4 2023", date: "2023-11-01", score: 85.2, grade: "B+" },
    { cycle: "Q1 2024", date: "2024-02-01", score: 70.5, grade: "C", note: "Failed due to non-compliance" },
    { cycle: "Q2 2024", date: "2024-05-01", score: 80.2, grade: "B" },
    { cycle: "Q3 2024", date: "2024-08-01", score: 85.6, grade: "B+" },
    { cycle: "Q4 2024", date: "2024-11-01", score: 90.8, grade: "A" }
  ],
  nearby_schools_ranking: [
    { rank: 13, school_name: "School N (Anonymized)", score: 91.5, grade: "A" },
    { rank: 14, school_name: "School M (Anonymized)", score: 91.2, grade: "A" },
    { rank: 15, school_name: "YOUR SCHOOL", score: 90.8, grade: "A", highlight: true },
    { rank: 16, school_name: "School P (Anonymized)", score: 90.5, grade: "A" },
    { rank: 17, school_name: "School Q (Anonymized)", score: 90.1, grade: "A" }
  ]
};

// Generate full regional rankings (sample)
export const regionalRankings = [
  { rank: 1, school_name: "Excellence Academy", score: 96.2, grade: "A+" },
  { rank: 2, school_name: "Future Leaders School", score: 94.8, grade: "A+" },
  { rank: 3, school_name: "School C (Anonymized)", score: 93.1, grade: "A" },
  { rank: 4, school_name: "School D (Anonymized)", score: 92.8, grade: "A" },
  { rank: 5, school_name: "School E (Anonymized)", score: 92.5, grade: "A" },
  { rank: 6, school_name: "School F (Anonymized)", score: 92.2, grade: "A" },
  { rank: 7, school_name: "School G (Anonymized)", score: 91.9, grade: "A" },
  { rank: 8, school_name: "School H (Anonymized)", score: 91.7, grade: "A" },
  { rank: 9, school_name: "School I (Anonymized)", score: 91.5, grade: "A" },
  { rank: 10, school_name: "School J (Anonymized)", score: 91.3, grade: "A" },
  { rank: 11, school_name: "School K (Anonymized)", score: 91.2, grade: "A" },
  { rank: 12, school_name: "School L (Anonymized)", score: 91.0, grade: "A" },
  { rank: 13, school_name: "School M (Anonymized)", score: 91.0, grade: "A" },
  { rank: 14, school_name: "School N (Anonymized)", score: 91.2, grade: "A" },
  { rank: 15, school_name: "Al-Noor International School", score: 90.8, grade: "A", highlight: true },
  { rank: 16, school_name: "School P (Anonymized)", score: 90.5, grade: "A" },
  { rank: 17, school_name: "School Q (Anonymized)", score: 90.1, grade: "A" },
  { rank: 18, school_name: "School R (Anonymized)", score: 89.8, grade: "A" },
  { rank: 19, school_name: "School S (Anonymized)", score: 89.5, grade: "A" },
  { rank: 20, school_name: "School T (Anonymized)", score: 89.2, grade: "A" },
  // ... would continue to 342 in real implementation
];

export const getSchoolRankings = (schoolId) => {
  // In real implementation, this would fetch based on schoolId
  return schoolRankings;
};
