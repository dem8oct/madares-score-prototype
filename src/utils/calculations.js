/**
 * Calculation utilities for score computation
 */

// Calculate weighted average
export const calculateWeightedAverage = (items, scoreKey = 'score', weightKey = 'weight') => {
  if (!items || items.length === 0) return 0;

  const totalWeightedScore = items.reduce((sum, item) => {
    return sum + (item[scoreKey] * item[weightKey]);
  }, 0);

  const totalWeight = items.reduce((sum, item) => sum + item[weightKey], 0);

  return totalWeight > 0 ? totalWeightedScore / totalWeight : 0;
};

// Round to specified decimal places
export const roundToDecimal = (number, decimals = 1) => {
  const factor = Math.pow(10, decimals);
  return Math.round(number * factor) / factor;
};

// Calculate percentage
export const calculatePercentage = (numerator, denominator) => {
  if (!denominator || denominator === 0) return 0;
  return (numerator / denominator) * 100;
};

// Calculate compliance pass rate
export const calculateCompliancePassRate = (questions) => {
  if (!questions || questions.length === 0) return 0;

  const passedQuestions = questions.filter(q => {
    if (q.type === 'yes_no') {
      return q.answer === 'yes';
    }
    if (q.type === 'file_upload') {
      return q.evidence && q.evidence.length > 0;
    }
    if (q.type === 'number') {
      return q.answer !== null && q.answer !== '';
    }
    return false;
  });

  return (passedQuestions.length / questions.length) * 100;
};

// Normalize score to 0-100 range
export const normalizeScore = (value, min, max) => {
  if (max === min) return 100;
  const normalized = ((value - min) / (max - min)) * 100;
  return Math.max(0, Math.min(100, normalized));
};

// Calculate grade point average (for letter grades)
export const calculateGPA = (grades) => {
  const gradePoints = {
    'A+': 4.0,
    'A': 4.0,
    'B+': 3.5,
    'B': 3.0,
    'C+': 2.5,
    'C': 2.0,
    'D+': 1.5,
    'D': 1.0,
    'E': 0.5,
    'F': 0.0
  };

  if (!grades || grades.length === 0) return 0;

  const total = grades.reduce((sum, grade) => {
    return sum + (gradePoints[grade] || 0);
  }, 0);

  return total / grades.length;
};

// Calculate trend (positive, negative, or neutral)
export const calculateTrend = (currentScore, previousScore) => {
  if (!previousScore) return 'neutral';

  const difference = currentScore - previousScore;

  if (Math.abs(difference) < 1) return 'neutral';
  if (difference > 0) return 'positive';
  return 'negative';
};

// Calculate days between dates
export const calculateDaysBetween = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
