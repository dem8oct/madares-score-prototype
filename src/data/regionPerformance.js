// Region Performance Data for Interactive Map
// Geographic data for Saudi Arabia regions with performance metrics

export const saudiRegions = [
  {
    id: 'riyadh',
    name: 'Riyadh Region',
    nameAr: 'منطقة الرياض',
    schools: 485,
    avgScore: 89.4,
    compliance: 91.2,
    atRisk: 18,
    performance: 'excellent',
    cities: [
      { name: 'Riyadh', schools: 380, avgScore: 90.1 },
      { name: 'Diriyah', schools: 45, avgScore: 88.5 },
      { name: 'Kharj', schools: 60, avgScore: 87.2 },
    ],
  },
  {
    id: 'makkah',
    name: 'Makkah Region',
    nameAr: 'منطقة مكة المكرمة',
    schools: 520,
    avgScore: 88.7,
    compliance: 89.8,
    atRisk: 22,
    performance: 'excellent',
    cities: [
      { name: 'Jeddah', schools: 290, avgScore: 89.8 },
      { name: 'Makkah', schools: 135, avgScore: 88.2 },
      { name: 'Taif', schools: 95, avgScore: 87.1 },
    ],
  },
  {
    id: 'eastern',
    name: 'Eastern Province',
    nameAr: 'المنطقة الشرقية',
    schools: 410,
    avgScore: 88.2,
    compliance: 89.5,
    atRisk: 19,
    performance: 'excellent',
    cities: [
      { name: 'Dammam', schools: 180, avgScore: 89.3 },
      { name: 'Khobar', schools: 145, avgScore: 88.7 },
      { name: 'Dhahran', schools: 85, avgScore: 86.5 },
    ],
  },
  {
    id: 'medina',
    name: 'Medina Region',
    nameAr: 'منطقة المدينة المنورة',
    schools: 215,
    avgScore: 86.5,
    compliance: 87.8,
    atRisk: 12,
    performance: 'good',
    cities: [
      { name: 'Medina', schools: 165, avgScore: 87.2 },
      { name: 'Yanbu', schools: 50, avgScore: 84.5 },
    ],
  },
  {
    id: 'qassim',
    name: 'Qassim Region',
    nameAr: 'منطقة القصيم',
    schools: 180,
    avgScore: 84.8,
    compliance: 85.9,
    atRisk: 15,
    performance: 'good',
    cities: [
      { name: 'Buraydah', schools: 110, avgScore: 85.6 },
      { name: 'Unaizah', schools: 70, avgScore: 83.5 },
    ],
  },
  {
    id: 'asir',
    name: 'Asir Region',
    nameAr: 'منطقة عسير',
    schools: 165,
    avgScore: 82.3,
    compliance: 83.7,
    atRisk: 18,
    performance: 'good',
    cities: [
      { name: 'Abha', schools: 95, avgScore: 83.8 },
      { name: 'Khamis Mushait', schools: 70, avgScore: 80.2 },
    ],
  },
  {
    id: 'tabuk',
    name: 'Tabuk Region',
    nameAr: 'منطقة تبوك',
    schools: 95,
    avgScore: 78.9,
    compliance: 80.2,
    atRisk: 11,
    performance: 'needs-improvement',
    cities: [
      { name: 'Tabuk', schools: 70, avgScore: 79.8 },
      { name: 'Tayma', schools: 25, avgScore: 76.5 },
    ],
  },
  {
    id: 'hail',
    name: 'Hail Region',
    nameAr: 'منطقة حائل',
    schools: 85,
    avgScore: 77.2,
    compliance: 79.1,
    atRisk: 10,
    performance: 'needs-improvement',
    cities: [
      { name: 'Hail', schools: 65, avgScore: 78.1 },
      { name: 'Baqaa', schools: 20, avgScore: 74.5 },
    ],
  },
  {
    id: 'northern',
    name: 'Northern Border Region',
    nameAr: 'منطقة الحدود الشمالية',
    schools: 125,
    avgScore: 72.6,
    compliance: 75.4,
    atRisk: 21,
    performance: 'critical',
    cities: [
      { name: 'Arar', schools: 55, avgScore: 74.2 },
      { name: 'Rafha', schools: 40, avgScore: 71.8 },
      { name: 'Turaif', schools: 30, avgScore: 70.5 },
    ],
  },
  {
    id: 'jazan',
    name: 'Jazan Region',
    nameAr: 'منطقة جازان',
    schools: 90,
    avgScore: 73.8,
    compliance: 76.5,
    atRisk: 6,
    performance: 'needs-improvement',
    cities: [
      { name: 'Jazan', schools: 60, avgScore: 75.2 },
      { name: 'Sabya', schools: 30, avgScore: 71.1 },
    ],
  },
  {
    id: 'najran',
    name: 'Najran Region',
    nameAr: 'منطقة نجران',
    schools: 50,
    avgScore: 74.1,
    compliance: 76.8,
    atRisk: 3,
    performance: 'needs-improvement',
    cities: [
      { name: 'Najran', schools: 40, avgScore: 75.3 },
      { name: 'Sharurah', schools: 10, avgScore: 69.8 },
    ],
  },
  {
    id: 'al-baha',
    name: 'Al-Baha Region',
    nameAr: 'منطقة الباحة',
    schools: 30,
    avgScore: 75.4,
    compliance: 77.9,
    atRisk: 1,
    performance: 'needs-improvement',
    cities: [
      { name: 'Al-Baha', schools: 30, avgScore: 75.4 },
    ],
  },
];

// Performance color thresholds
export const performanceThresholds = {
  excellent: { min: 85, color: '#10b981', label: 'Excellent' },
  good: { min: 70, max: 85, color: '#f59e0b', label: 'Good' },
  'needs-improvement': { min: 60, max: 70, color: '#f97316', label: 'Needs Improvement' },
  critical: { max: 60, color: '#ef4444', label: 'Critical' },
};

// Helper function to get performance level
export const getPerformanceLevel = (score) => {
  if (score >= 85) return 'excellent';
  if (score >= 70) return 'good';
  if (score >= 60) return 'needs-improvement';
  return 'critical';
};

// Helper function to get color by score
export const getScoreColor = (score) => {
  const level = getPerformanceLevel(score);
  return performanceThresholds[level].color;
};
