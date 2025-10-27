/**
 * Formatting utilities for display
 */

// Format number with commas
export const formatNumber = (number) => {
  if (number === null || number === undefined) return '';
  return number.toLocaleString('en-US');
};

// Format score with decimal places
export const formatScore = (score, decimals = 1) => {
  if (score === null || score === undefined) return '';
  return score.toFixed(decimals);
};

// Format percentage
export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined) return '';
  return `${value.toFixed(decimals)}%`;
};

// Format date in different styles
export const formatDate = (dateString, style = 'medium') => {
  if (!dateString) return '';

  const date = new Date(dateString);

  const styles = {
    short: { year: 'numeric', month: '2-digit', day: '2-digit' },
    medium: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    full: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  };

  return date.toLocaleDateString('en-US', styles[style] || styles.medium);
};

// Format date for Arabic
export const formatDateArabic = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  return date.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Format relative time (e.g., "2 days ago", "in 3 hours")
export const formatRelativeTime = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffDay > 0) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
  if (diffHour > 0) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
  if (diffMin > 0) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
  return 'Just now';
};

// Format phone number
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  // Format: +966 50 123 4567
  return phone.replace(/(\+\d{3})(\s?\d{2})(\s?\d{3})(\s?\d{4})/, '$1 $2 $3 $4');
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Format currency (SAR)
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '';
  return `${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR`;
};

// Format version string
export const formatVersion = (currentVersion, totalVersions) => {
  return `${currentVersion}/${totalVersions}`;
};

// Capitalize first letter
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Convert snake_case to Title Case
export const snakeToTitle = (str) => {
  if (!str) return '';
  return str
    .split('_')
    .map(word => capitalize(word))
    .join(' ');
};
