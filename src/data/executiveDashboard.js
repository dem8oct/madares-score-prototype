// Executive Dashboard Mock Data
// National-level aggregated data for executive overview

export const nationalKPIs = {
  totalSchools: 2450,
  averageCompliance: 87.3,
  atRiskSchools: 156,
  trends: {
    schoolsChange: +12, // New schools added this month
    complianceChange: +2.1, // Percentage point increase
    atRiskChange: -8, // Decrease in at-risk schools
  },
};

// 6-month performance trend data
export const performanceTrend = [
  { month: 'May 2024', avgScore: 84.2, compliance: 82.5, atRisk: 189 },
  { month: 'Jun 2024', avgScore: 85.1, compliance: 83.8, atRisk: 178 },
  { month: 'Jul 2024', avgScore: 85.8, compliance: 84.9, atRisk: 171 },
  { month: 'Aug 2024', avgScore: 86.3, compliance: 85.6, atRisk: 165 },
  { month: 'Sep 2024', avgScore: 86.9, compliance: 86.4, atRisk: 160 },
  { month: 'Oct 2024', avgScore: 87.3, compliance: 87.3, atRisk: 156 },
];

// Top 10 performing schools
export const topSchools = [
  { id: 1, name: 'Al-Faisal International School', city: 'Riyadh', region: 'Riyadh', score: 98.7, trend: 'up' },
  { id: 2, name: 'King Abdulaziz Model School', city: 'Jeddah', region: 'Makkah', score: 97.9, trend: 'up' },
  { id: 3, name: 'Al-Andalus Excellence Academy', city: 'Dammam', region: 'Eastern', score: 97.5, trend: 'stable' },
  { id: 4, name: 'Prince Sultan Technical School', city: 'Riyadh', region: 'Riyadh', score: 96.8, trend: 'up' },
  { id: 5, name: 'Al-Khobar International School', city: 'Khobar', region: 'Eastern', score: 96.4, trend: 'up' },
  { id: 6, name: 'Makkah Science Academy', city: 'Makkah', region: 'Makkah', score: 95.9, trend: 'stable' },
  { id: 7, name: 'Taif Modern School', city: 'Taif', region: 'Makkah', score: 95.6, trend: 'up' },
  { id: 8, name: 'Jubail Industrial School', city: 'Jubail', region: 'Eastern', score: 95.2, trend: 'stable' },
  { id: 9, name: 'Medina Advanced Learning Center', city: 'Medina', region: 'Medina', score: 94.8, trend: 'up' },
  { id: 10, name: 'Yanbu Technical Institute', city: 'Yanbu', region: 'Medina', score: 94.5, trend: 'stable' },
];

// Bottom 10 schools requiring intervention
export const bottomSchools = [
  { id: 2441, name: 'Al-Wadi Rural School', city: 'Al-Wadi', region: 'Northern', score: 52.3, trend: 'down', riskLevel: 'critical' },
  { id: 2442, name: 'Jazan Border School #7', city: 'Jazan', region: 'Jazan', score: 53.1, trend: 'down', riskLevel: 'critical' },
  { id: 2443, name: 'Najran Community School', city: 'Najran', region: 'Najran', score: 54.8, trend: 'stable', riskLevel: 'critical' },
  { id: 2444, name: 'Al-Jawf Rural Institute', city: 'Al-Jawf', region: 'Northern', score: 55.6, trend: 'down', riskLevel: 'high' },
  { id: 2445, name: 'Tabuk Desert School', city: 'Tabuk', region: 'Tabuk', score: 56.2, trend: 'stable', riskLevel: 'high' },
  { id: 2446, name: 'Al-Baha Mountain School', city: 'Al-Baha', region: 'Al-Baha', score: 57.1, trend: 'up', riskLevel: 'high' },
  { id: 2447, name: 'Hail Provincial School #3', city: 'Hail', region: 'Hail', score: 57.9, trend: 'stable', riskLevel: 'high' },
  { id: 2448, name: 'Arar Northern School', city: 'Arar', region: 'Northern', score: 58.4, trend: 'down', riskLevel: 'high' },
  { id: 2449, name: 'Sakaka Technical School', city: 'Sakaka', region: 'Northern', score: 58.8, trend: 'stable', riskLevel: 'medium' },
  { id: 2450, name: 'Qassim Rural Academy', city: 'Buraydah', region: 'Qassim', score: 59.2, trend: 'up', riskLevel: 'medium' },
];

// Regional summary for quick insights
export const regionalSummary = [
  { region: 'Riyadh', schools: 485, avgScore: 89.4, atRisk: 18, performance: 'excellent' },
  { region: 'Makkah', schools: 520, avgScore: 88.7, atRisk: 22, performance: 'excellent' },
  { region: 'Eastern', schools: 410, avgScore: 88.2, atRisk: 19, performance: 'excellent' },
  { region: 'Medina', schools: 215, avgScore: 86.5, atRisk: 12, performance: 'good' },
  { region: 'Qassim', schools: 180, avgScore: 84.8, atRisk: 15, performance: 'good' },
  { region: 'Asir', schools: 165, avgScore: 82.3, atRisk: 18, performance: 'good' },
  { region: 'Tabuk', schools: 95, avgScore: 78.9, atRisk: 11, performance: 'needs-improvement' },
  { region: 'Hail', schools: 85, avgScore: 77.2, atRisk: 10, performance: 'needs-improvement' },
  { region: 'Northern', schools: 125, avgScore: 72.6, atRisk: 21, performance: 'critical' },
  { region: 'Jazan', schools: 90, avgScore: 73.8, atRisk: 6, performance: 'needs-improvement' },
  { region: 'Najran', schools: 50, avgScore: 74.1, atRisk: 3, performance: 'needs-improvement' },
  { region: 'Al-Baha', schools: 30, avgScore: 75.4, atRisk: 1, performance: 'needs-improvement' },
];

// System-wide metrics
export const systemMetrics = {
  totalInspections: 1847,
  completedInspections: 1653,
  pendingInspections: 194,
  totalIndicators: 156,
  averageIndicatorsPerSchool: 142,
  complianceRate: 87.3,
  totalDiscrepancies: 234,
  resolvedDiscrepancies: 198,
  pendingDiscrepancies: 36,
};
