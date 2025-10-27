/**
 * Validation utilities
 */

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number (Saudi format)
export const isValidPhoneNumber = (phone) => {
  // Saudi phone format: +966 XX XXX XXXX
  const phoneRegex = /^\+966\s?\d{2}\s?\d{3}\s?\d{4}$/;
  return phoneRegex.test(phone);
};

// Validate required field
export const isRequired = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  return true;
};

// Validate number range
export const isInRange = (value, min, max) => {
  const num = parseFloat(value);
  if (isNaN(num)) return false;
  return num >= min && num <= max;
};

// Validate file upload
export const isValidFile = (file, allowedTypes = [], maxSizeMB = 10) => {
  if (!file) return false;

  // Check file type
  if (allowedTypes.length > 0) {
    const fileExt = file.name.split('.').pop().toLowerCase();
    if (!allowedTypes.includes(fileExt)) {
      return { valid: false, error: `File type .${fileExt} is not allowed` };
    }
  }

  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return { valid: false, error: `File size exceeds ${maxSizeMB}MB` };
  }

  return { valid: true };
};

// Validate date format (YYYY-MM-DD)
export const isValidDate = (dateString) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) return false;

  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

// Validate date is in the future
export const isFutureDate = (dateString) => {
  if (!isValidDate(dateString)) return false;

  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return date > today;
};

// Validate date is in the past
export const isPastDate = (dateString) => {
  if (!isValidDate(dateString)) return false;

  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return date < today;
};

// Validate URL format
export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

// Validate score (0-100)
export const isValidScore = (score) => {
  return isInRange(score, 0, 100);
};

// Validate license number format
export const isValidLicenseNumber = (licenseNumber) => {
  // Format: LIC-YYYY-XXXXXX
  const licenseRegex = /^LIC-\d{4}-\d{6}$/;
  return licenseRegex.test(licenseNumber);
};

// Validate school ID format
export const isValidSchoolId = (schoolId) => {
  // Format: SCH-YYYY-XXX
  const schoolIdRegex = /^SCH-\d{4}-\d{3}$/;
  return schoolIdRegex.test(schoolId);
};

// Validate evaluation ID format
export const isValidEvaluationId = (evalId) => {
  // Format: REQ-YYYY-XXX
  const evalIdRegex = /^REQ-\d{4}-\d{3}$/;
  return evalIdRegex.test(evalId);
};

// Check if all required fields are filled
export const validateForm = (data, requiredFields) => {
  const errors = {};

  requiredFields.forEach(field => {
    if (!isRequired(data[field])) {
      errors[field] = 'This field is required';
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validate compliance question answer
export const validateComplianceAnswer = (question) => {
  if (question.type === 'yes_no') {
    return question.answer === 'yes' || question.answer === 'no';
  }

  if (question.type === 'file_upload') {
    return question.evidence && question.evidence.length > 0;
  }

  if (question.type === 'number') {
    return question.answer !== null && question.answer !== '' && !isNaN(question.answer);
  }

  return false;
};
