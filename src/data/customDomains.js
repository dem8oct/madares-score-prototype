// Mock data for Custom Domains feature
export const customDomains = [
  {
    domain_id: "custom_001",
    domain_name: {
      en: "Environmental Sustainability",
      ar: "الاستدامة البيئية"
    },
    weight: 10, // Percentage
    description: {
      en: "Evaluates school's commitment to environmental sustainability, green initiatives, and eco-friendly practices.",
      ar: "يقيم التزام المدرسة بالاستدامة البيئية والمبادرات الخضراء والممارسات الصديقة للبيئة."
    },
    status: "Approved", // "Pending Approval", "Approved", "Rejected"
    created_by: "Dr. Khalid",
    created_at: "2025-10-15T10:00:00Z",
    approved_by: "Committee Chair",
    approved_at: "2025-10-20T14:30:00Z",
    is_custom: true,
    indicators_count: 5,
    usage_statistics: {
      schools_using: 47,
      evaluations_completed: 123
    }
  },
  {
    domain_id: "custom_002",
    domain_name: {
      en: "Innovation & Entrepreneurship",
      ar: "الابتكار وريادة الأعمال"
    },
    weight: 8,
    description: {
      en: "Measures school's effectiveness in fostering innovation, entrepreneurial thinking, and creative problem-solving among students.",
      ar: "يقيس فعالية المدرسة في تعزيز الابتكار والتفكير الريادي وحل المشكلات الإبداعي بين الطلاب."
    },
    status: "Approved",
    created_by: "Dr. Lina",
    created_at: "2025-09-05T11:30:00Z",
    approved_by: "Committee Chair",
    approved_at: "2025-09-10T09:15:00Z",
    is_custom: true,
    indicators_count: 7,
    usage_statistics: {
      schools_using: 89,
      evaluations_completed: 256
    }
  },
  {
    domain_id: "custom_003",
    domain_name: {
      en: "Digital Citizenship",
      ar: "المواطنة الرقمية"
    },
    weight: 5,
    description: {
      en: "Assesses school's programs for teaching responsible digital behavior, online safety, and ethical technology use.",
      ar: "يقيم برامج المدرسة لتعليم السلوك الرقمي المسؤول والسلامة عبر الإنترنت والاستخدام الأخلاقي للتكنولوجيا."
    },
    status: "Pending Approval",
    created_by: "Dr. Sara",
    created_at: "2025-11-01T08:45:00Z",
    approved_by: null,
    approved_at: null,
    is_custom: true,
    indicators_count: 0, // No indicators yet, newly proposed
    usage_statistics: {
      schools_using: 0,
      evaluations_completed: 0
    }
  },
  {
    domain_id: "custom_004",
    domain_name: {
      en: "Community Engagement",
      ar: "المشاركة المجتمعية"
    },
    weight: 7,
    description: {
      en: "Evaluates school's partnerships with local community, volunteer programs, and social responsibility initiatives.",
      ar: "يقيم شراكات المدرسة مع المجتمع المحلي وبرامج التطوع ومبادرات المسؤولية الاجتماعية."
    },
    status: "Rejected",
    created_by: "Dr. Ahmed",
    created_at: "2025-08-12T15:20:00Z",
    approved_by: "Committee Chair",
    approved_at: "2025-08-18T10:00:00Z",
    rejection_reason: "Overlaps significantly with existing Beneficiary Satisfaction domain. Consider adding as sub-category instead.",
    is_custom: true,
    indicators_count: 0,
    usage_statistics: {
      schools_using: 0,
      evaluations_completed: 0
    }
  }
];

// Get weight sum of all active standard domains
export const getStandardDomainsWeightSum = () => {
  // From indicators.json: Compliance (50%), Excellence (30%), Satisfaction (20%)
  return 100; // Standard domains total 100%
};

// Calculate remaining weight available for custom domains
export const getAvailableWeightForCustomDomain = (excludeDomainId = null) => {
  const standardWeight = getStandardDomainsWeightSum();
  const approvedCustomWeight = customDomains
    .filter(d => d.status === 'Approved' && d.domain_id !== excludeDomainId)
    .reduce((sum, d) => sum + d.weight, 0);

  // In a real system, you'd need to rebalance weights across all domains
  // For now, we'll just track custom domain weights separately
  return Math.max(0, 30 - approvedCustomWeight); // Allow up to 30% for custom domains
};

// Validate domain weight
export const validateDomainWeight = (weight, excludeDomainId = null) => {
  const available = getAvailableWeightForCustomDomain(excludeDomainId);
  if (weight > available) {
    return {
      valid: false,
      message: `Insufficient weight available. Maximum ${available}% available. Total domain weights must not exceed 130% (100% standard + 30% custom).`
    };
  }
  if (weight < 1) {
    return {
      valid: false,
      message: 'Domain weight must be at least 1%.'
    };
  }
  if (weight > 20) {
    return {
      valid: false,
      message: 'Individual custom domain weight cannot exceed 20%.'
    };
  }
  return { valid: true };
};

// Get current total weight with custom domains
export const getCurrentTotalWeight = () => {
  const standardWeight = getStandardDomainsWeightSum();
  const approvedCustomWeight = customDomains
    .filter(d => d.status === 'Approved')
    .reduce((sum, d) => sum + d.weight, 0);
  return standardWeight + approvedCustomWeight;
};

// Filter custom domains
export const filterCustomDomains = (status = 'all') => {
  if (status === 'all') {
    return customDomains;
  }
  return customDomains.filter(d => d.status === status);
};
