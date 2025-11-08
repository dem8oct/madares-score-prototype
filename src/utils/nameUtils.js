/**
 * Name Utility Functions
 * Helper functions for name display and formatting
 */

/**
 * Extract first name from full name
 * Handles various name formats including Arabic names
 *
 * Examples:
 * - "Ahmad Al-Mutairi" → "Ahmad"
 * - "Dr. Lina Al-Ghamdi" → "Lina"
 * - "Omar" → "Omar"
 * - "أحمد المطيري" → "أحمد"
 *
 * @param {string} fullName - The full name
 * @returns {string} - The first name only
 */
export const getFirstName = (fullName) => {
  if (!fullName || typeof fullName !== 'string') return '';

  // Trim whitespace
  const trimmed = fullName.trim();

  // Remove titles (Dr., Prof., etc.)
  const withoutTitle = trimmed.replace(/^(Dr\.|Prof\.|Mr\.|Mrs\.|Ms\.)\s+/i, '');

  // Split by space and get first part
  const parts = withoutTitle.split(/\s+/);

  return parts[0] || '';
};

/**
 * Get display name with optional tooltip showing full name
 * Useful for UI components that need both short display and full info
 *
 * @param {string} fullName - The full name
 * @returns {object} - { display: "Ahmad", full: "Ahmad Al-Mutairi" }
 */
export const getDisplayName = (fullName) => {
  return {
    display: getFirstName(fullName),
    full: fullName || ''
  };
};

export default {
  getFirstName,
  getDisplayName
};
