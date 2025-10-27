# Document 02: Mock Data Structures
## For AI Coding Agents

**Build Order:** 2nd  
**Dependencies:** None  
**Estimated Complexity:** Low

---

## Overview

Define all mock JSON data structures that will be used throughout the prototype. This data lives in memory (React state/context) and resets on page refresh.

**No backend, no database, no API calls - pure client-side data.**

---

## Data Files Location

```
src/data/
├── users.json          # Mock users for different roles
├── schools.json        # School profiles
├── evaluations.json    # Evaluation requests with full data
├── indicators.json     # Indicator definitions and formulas
└── mockData.js         # Helper functions to generate/filter data
```

---

## 1. Users Data

**File:** `src/data/users.json`

```json
{
  "users": [
    {
      "id": "user001",
      "username": "ahmad.school",
      "name": "Ahmad Al-Mutairi",
      "name_ar": "أحمد المطيري",
      "role": "school_admin",
      "email": "ahmad@riyadh-intl.edu.sa",
      "school_id": "SCH-2025-001",
      "phone": "+966 50 123 4567"
    },
    {
      "id": "user002",
      "username": "sara.ops",
      "name": "Sara Al-Harbi",
      "name_ar": "سارة الحربي",
      "role": "ops_reviewer",
      "email": "sara.reviewer@moe.sa",
      "region": "Riyadh",
      "phone": "+966 50 234 5678"
    },
    {
      "id": "user003",
      "username": "dr.lina",
      "name": "Dr. Lina Al-Ghamdi",
      "name_ar": "د. لينا الغامدي",
      "role": "committee_member",
      "email": "lina.director@moe.sa",
      "phone": "+966 50 345 6789"
    },
    {
      "id": "user004",
      "username": "omar.appeals",
      "name": "Omar Al-Zahrani",
      "name_ar": "عمر الزهراني",
      "role": "appeals_officer",
      "email": "omar.appeals@moe.sa",
      "phone": "+966 50 456 7890"
    }
  ]
}
```

**Roles:**
- `school_admin` - School administrator
- `ops_reviewer` - Ministry operations reviewer
- `committee_member` - Supervisory committee member
- `appeals_officer` - Appeals officer
- `national_viewer` - National dashboard viewer (leadership)
- `public` - Public portal user (no login)

---

## 2. Schools Data

**File:** `src/data/schools.json`

```json
{
  "schools": [
    {
      "id": "SCH-2025-001",
      "name": "Riyadh International School",
      "name_ar": "مدرسة الرياض العالمية",
      "region": "Riyadh",
      "city": "Riyadh City",
      "level": "Secondary",
      "gender_model": "Co-ed",
      "license_number": "LIC-2024-001234",
      "license_expiry": "2026-12-31",
      "total_students": 450,
      "total_teachers": 40,
      "contact_email": "info@riyadh-intl.edu.sa",
      "contact_phone": "+966 11 234 5678",
      "current_evaluation_id": "REQ-2025-001",
      "published_score": {
        "compliance": "Pass",
        "excellence_score": 83.7,
        "excellence_grade": "B",
        "satisfaction_score": 89.5,
        "satisfaction_grade": "B+",
        "evaluation_date": "2025-09-15"
      }
    },
    {
      "id": "SCH-2025-002",
      "name": "Al-Noor Academy",
      "name_ar": "أكاديمية النور",
      "region": "Riyadh",
      "city": "Riyadh City",
      "level": "Primary",
      "gender_model": "Boys",
      "license_number": "LIC-2024-001235",
      "license_expiry": "2026-06-30",
      "total_students": 320,
      "total_teachers": 28,
      "contact_email": "info@alnoor.edu.sa",
      "contact_phone": "+966 11 345 6789",
      "current_evaluation_id": "REQ-2025-002",
      "published_score": null
    },
    {
      "id": "SCH-2025-003",
      "name": "Al-Faisal Girls School",
      "name_ar": "مدرسة الفيصل للبنات",
      "region": "Jeddah",
      "city": "Jeddah",
      "level": "Intermediate",
      "gender_model": "Girls",
      "license_number": "LIC-2024-001236",
      "license_expiry": "2027-03-31",
      "total_students": 280,
      "total_teachers": 24,
      "contact_email": "info@alfaisal-girls.edu.sa",
      "contact_phone": "+966 12 456 7890",
      "current_evaluation_id": null,
      "published_score": {
        "compliance": "Pass",
        "excellence_score": 91.2,
        "excellence_grade": "A",
        "satisfaction_score": 88.3,
        "satisfaction_grade": "B+",
        "evaluation_date": "2025-08-20"
      }
    }
  ]
}
```

---

## 3. Evaluation Requests Data

**File:** `src/data/evaluations.json`

```json
{
  "evaluations": [
    {
      "id": "REQ-2025-001",
      "school_id": "SCH-2025-001",
      "school_name": "Riyadh International School",
      "region": "Riyadh",
      "city": "Riyadh City",
      "level": "Secondary",
      "status": "in_progress",
      "version": "1/4",
      "correction_count": 0,
      "created_date": "2025-10-01",
      "deadline": "2025-11-30",
      "submission_date": null,
      "review_start_date": null,
      "completion_percentage": 75,
      "assigned_reviewer": "user002",
      "compliance_data": {
        "questions": [
          {
            "id": "C101",
            "question": "Do you have a valid operating license?",
            "question_ar": "هل لديك رخصة تشغيل سارية المفعول؟",
            "type": "yes_no",
            "answer": "yes",
            "evidence": ["license_2025.pdf"],
            "status": "complete",
            "ops_review": null
          },
          {
            "id": "C102",
            "question": "Do you have a valid fire safety certificate?",
            "question_ar": "هل لديك شهادة سلامة حريق سارية المفعول؟",
            "type": "yes_no",
            "answer": null,
            "evidence": [],
            "status": "pending",
            "ops_review": null
          },
          {
            "id": "C103",
            "question": "Upload financial audit report (latest year)",
            "question_ar": "رفع تقرير التدقيق المالي (السنة الأخيرة)",
            "type": "file_upload",
            "answer": "yes",
            "evidence": ["audit_2024.pdf"],
            "status": "complete",
            "ops_review": null
          },
          {
            "id": "C104",
            "question": "Are all teacher qualification certificates on file?",
            "question_ar": "هل جميع شهادات مؤهلات المعلمين مودعة؟",
            "type": "yes_no",
            "answer": "yes",
            "evidence": ["teacher_certs_bundle.pdf"],
            "status": "complete",
            "ops_review": null
          },
          {
            "id": "C105",
            "question": "Number of safety violations in the past year",
            "question_ar": "عدد مخالفات السلامة في العام الماضي",
            "type": "number",
            "answer": "2",
            "evidence": ["violations_report.pdf"],
            "status": "complete",
            "ops_review": null
          }
        ]
      },
      "excellence_indicators": [
        {
          "code": "E201",
          "name": "Teacher Qualifications",
          "name_ar": "مؤهلات المعلمين",
          "score": 85.0,
          "weight": 5,
          "data_source": "Noor",
          "calculated": true,
          "details": {
            "qualified_teachers": 34,
            "total_teachers": 40
          }
        },
        {
          "code": "E202",
          "name": "Teacher Training Completion",
          "name_ar": "إكمال تدريب المعلمين",
          "score": 77.5,
          "weight": 4,
          "data_source": "MoE PD System",
          "calculated": true,
          "details": {
            "teachers_completed_pd": 31,
            "total_teachers": 40
          }
        },
        {
          "code": "E203",
          "name": "Student-Teacher Ratio",
          "name_ar": "نسبة الطلاب إلى المعلمين",
          "score": 92.0,
          "weight": 3,
          "data_source": "Noor",
          "calculated": true,
          "details": {
            "total_students": 450,
            "total_teachers": 40,
            "ratio": 11.25,
            "target_ratio": 15
          }
        },
        {
          "code": "E204",
          "name": "Infrastructure Quality",
          "name_ar": "جودة البنية التحتية",
          "score": 88.0,
          "weight": 4,
          "data_source": "School self-report + Ops verification",
          "calculated": true,
          "details": {
            "facilities_score": 85,
            "technology_score": 90,
            "safety_features_score": 90
          }
        }
      ],
      "satisfaction_indicators": [
        {
          "code": "S301",
          "name": "Safety Index (Bullying Rate)",
          "name_ar": "مؤشر السلامة (معدل التنمر)",
          "score": 95.6,
          "weight": 5,
          "data_source": "Incident reports",
          "calculated": true,
          "details": {
            "bullying_incidents": 2,
            "total_students": 450
          }
        },
        {
          "code": "S302",
          "name": "Parent Satisfaction Survey",
          "name_ar": "استبيان رضا أولياء الأمور",
          "score": 87.2,
          "weight": 4,
          "data_source": "Survey API",
          "calculated": true,
          "details": {
            "survey_responses": 320,
            "avg_rating": 4.36,
            "out_of": 5
          }
        },
        {
          "code": "S303",
          "name": "Student Engagement Score",
          "name_ar": "درجة مشاركة الطلاب",
          "score": 85.0,
          "weight": 3,
          "data_source": "Survey API",
          "calculated": true,
          "details": {
            "attendance_rate": 94,
            "participation_rate": 82,
            "satisfaction_rate": 79
          }
        }
      ],
      "pending_items": [
        {
          "type": "missing_data",
          "question_id": "C102",
          "description": "Fire Safety Certificate upload",
          "description_ar": "رفع شهادة السلامة من الحريق"
        }
      ],
      "school_notes": "",
      "ops_notes": ""
    },
    {
      "id": "REQ-2025-002",
      "school_id": "SCH-2025-002",
      "school_name": "Al-Noor Academy",
      "region": "Riyadh",
      "city": "Riyadh City",
      "level": "Primary",
      "status": "returned_for_correction",
      "version": "2/4",
      "correction_count": 1,
      "created_date": "2025-09-15",
      "deadline": "2025-11-15",
      "submission_date": "2025-10-10",
      "review_start_date": "2025-10-12",
      "completion_percentage": 100,
      "assigned_reviewer": "user002",
      "compliance_data": {
        "questions": [
          {
            "id": "C101",
            "question": "Do you have a valid operating license?",
            "question_ar": "هل لديك رخصة تشغيل سارية المفعول؟",
            "type": "yes_no",
            "answer": "yes",
            "evidence": ["old_license_2024.pdf"],
            "status": "returned_for_correction",
            "ops_review": {
              "status": "return_for_correction",
              "comment": "License expired in June 2025. Please provide renewed license.",
              "comment_ar": "انتهت صلاحية الرخصة في يونيو 2025. يرجى تقديم الرخصة المجددة.",
              "reviewer": "user002",
              "review_date": "2025-10-13"
            }
          },
          {
            "id": "C102",
            "question": "Do you have a valid fire safety certificate?",
            "question_ar": "هل لديك شهادة سلامة حريق سارية المفعول؟",
            "type": "yes_no",
            "answer": "yes",
            "evidence": ["fire_cert_2025.pdf"],
            "status": "accepted",
            "ops_review": {
              "status": "accepted",
              "comment": "Certificate verified and valid.",
              "comment_ar": "تم التحقق من الشهادة وهي سارية المفعول.",
              "reviewer": "user002",
              "review_date": "2025-10-13"
            }
          }
        ]
      },
      "excellence_indicators": [
        {
          "code": "E201",
          "name": "Teacher Qualifications",
          "name_ar": "مؤهلات المعلمين",
          "score": 82.0,
          "weight": 5,
          "data_source": "Noor",
          "calculated": true
        }
      ],
      "satisfaction_indicators": [
        {
          "code": "S301",
          "name": "Safety Index",
          "name_ar": "مؤشر السلامة",
          "score": 92.0,
          "weight": 5,
          "data_source": "Incident reports",
          "calculated": true
        }
      ],
      "pending_items": [
        {
          "type": "correction_requested",
          "question_id": "C101",
          "description": "License expired - provide renewed license",
          "description_ar": "انتهت صلاحية الرخصة - قدم الرخصة المجددة",
          "ops_comment": "License expired in June 2025. Please provide renewed license."
        }
      ],
      "school_notes": "We submitted renewal application in May. Awaiting approval.",
      "ops_notes": "School submitted old license. Needs updated document."
    },
    {
      "id": "REQ-2025-003",
      "school_id": "SCH-2025-001",
      "school_name": "Riyadh International School",
      "region": "Riyadh",
      "city": "Riyadh City",
      "level": "Secondary",
      "status": "closed",
      "version": "1/4",
      "correction_count": 0,
      "created_date": "2025-08-01",
      "deadline": "2025-09-30",
      "submission_date": "2025-09-10",
      "review_start_date": "2025-09-12",
      "approved_date": "2025-09-20",
      "published_date": "2025-09-25",
      "completion_percentage": 100,
      "assigned_reviewer": "user002",
      "compliance_data": {
        "questions": []
      },
      "excellence_indicators": [],
      "satisfaction_indicators": [],
      "pending_items": [],
      "school_notes": "",
      "ops_notes": "Previous evaluation cycle - now closed."
    }
  ]
}
```

**Status values:**
- `draft` - Request created but school hasn't started
- `in_progress` - School is filling data
- `submitted` - School submitted for review
- `under_review` - Ops is reviewing
- `returned_for_correction` - Ops sent back with corrections (version increments)
- `pending_committee` - Awaiting committee approval
- `approved` - Committee approved
- `published` - Published to public portal
- `closed` - Evaluation cycle complete (historical)

---

## 4. Indicators Data

**File:** `src/data/indicators.json`

```json
{
  "domains": [
    {
      "id": "compliance",
      "name": "Compliance",
      "name_ar": "الامتثال",
      "weight": 0.50,
      "scoring_style": "binary",
      "description": "Policies, safety, finance, academic standards"
    },
    {
      "id": "excellence",
      "name": "Institutional Excellence",
      "name_ar": "التميز المؤسسي",
      "weight": 0.30,
      "scoring_style": "numeric",
      "description": "Teaching quality, PD, infrastructure, outcomes"
    },
    {
      "id": "satisfaction",
      "name": "Beneficiary Satisfaction",
      "name_ar": "رضا المستفيدين",
      "weight": 0.20,
      "scoring_style": "numeric",
      "description": "Parent, student, teacher sentiment"
    }
  ],
  "indicators": [
    {
      "code": "E201",
      "domain": "excellence",
      "sub_category": "Teaching Quality",
      "sub_category_ar": "جودة التدريس",
      "name": "Teacher Qualifications",
      "name_ar": "مؤهلات المعلمين",
      "formula": "(qualified_teachers / total_teachers) * 100",
      "weight": 5,
      "type": "automatic",
      "data_source": "Noor",
      "status": "active"
    },
    {
      "code": "E202",
      "domain": "excellence",
      "sub_category": "Professional Development",
      "sub_category_ar": "التطوير المهني",
      "name": "Teacher Training Completion",
      "name_ar": "إكمال تدريب المعلمين",
      "formula": "(teachers_completed_pd / total_teachers) * 100",
      "weight": 4,
      "type": "automatic",
      "data_source": "MoE PD System",
      "status": "active"
    },
    {
      "code": "S301",
      "domain": "satisfaction",
      "sub_category": "Safety & Engagement",
      "sub_category_ar": "السلامة والمشاركة",
      "name": "Safety Index (Bullying Rate)",
      "name_ar": "مؤشر السلامة (معدل التنمر)",
      "formula": "100 - ((bullying_incidents / total_students) * 1000)",
      "weight": 5,
      "type": "automatic",
      "data_source": "Incident reports",
      "status": "active"
    },
    {
      "code": "S302",
      "domain": "satisfaction",
      "sub_category": "Parent Engagement",
      "sub_category_ar": "مشاركة أولياء الأمور",
      "name": "Parent Satisfaction Survey",
      "name_ar": "استبيان رضا أولياء الأمور",
      "formula": "(avg_rating / 5) * 100",
      "weight": 4,
      "type": "automatic",
      "data_source": "Survey API",
      "status": "active"
    }
  ],
  "grade_bands": [
    { "min": 95, "max": 100, "grade": "A+", "color": "success", "color_hex": "#16a34a" },
    { "min": 90, "max": 94, "grade": "A", "color": "success", "color_hex": "#22c55e" },
    { "min": 85, "max": 89, "grade": "B+", "color": "success", "color_hex": "#84cc16" },
    { "min": 80, "max": 84, "grade": "B", "color": "warning", "color_hex": "#eab308" },
    { "min": 75, "max": 79, "grade": "C+", "color": "warning", "color_hex": "#f59e0b" },
    { "min": 70, "max": 74, "grade": "C", "color": "warning", "color_hex": "#f97316" },
    { "min": 65, "max": 69, "grade": "D+", "color": "danger", "color_hex": "#fb923c" },
    { "min": 60, "max": 64, "grade": "D", "color": "danger", "color_hex": "#f87171" },
    { "min": 50, "max": 59, "grade": "E", "color": "danger", "color_hex": "#ef4444" },
    { "min": 0, "max": 49, "grade": "F", "color": "danger", "color_hex": "#dc2626" }
  ]
}
```

---

## 5. Helper Functions

**File:** `src/data/mockData.js`

```javascript
import usersData from './users.json';
import schoolsData from './schools.json';
import evaluationsData from './evaluations.json';
import indicatorsData from './indicators.json';

// Calculate grade band from score
export const getGradeBand = (score) => {
  const bands = indicatorsData.grade_bands;
  const band = bands.find(b => score >= b.min && score <= b.max);
  return band || { grade: 'F', color: 'danger' };
};

// Calculate domain score (weighted average)
export const calculateDomainScore = (indicators) => {
  if (!indicators || indicators.length === 0) return 0;
  
  const totalWeightedScore = indicators.reduce((sum, ind) => {
    return sum + (ind.score * ind.weight);
  }, 0);
  
  const totalWeight = indicators.reduce((sum, ind) => sum + ind.weight, 0);
  
  return totalWeight > 0 ? (totalWeightedScore / totalWeight) : 0;
};

// Calculate overall school score
export const calculateOverallScore = (evaluation) => {
  const domains = indicatorsData.domains;
  
  const excellenceScore = calculateDomainScore(evaluation.excellence_indicators);
  const satisfactionScore = calculateDomainScore(evaluation.satisfaction_indicators);
  
  // Compliance is binary - if all pass, it's 100, else 0 (for calculation purposes)
  const complianceScore = 100; // Mock: assume pass
  
  const overall = 
    (domains[0].weight * complianceScore) +
    (domains[1].weight * excellenceScore) +
    (domains[2].weight * satisfactionScore);
  
  return Math.round(overall * 10) / 10; // Round to 1 decimal
};

// Get SLA color based on days remaining
export const getSLAColor = (deadline) => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const daysRemaining = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
  
  if (daysRemaining < 0) return 'danger'; // Overdue
  if (daysRemaining <= 3) return 'danger'; // Critical
  if (daysRemaining <= 7) return 'warning'; // Warning
  return 'success'; // On track
};

// Get days remaining text
export const getDaysRemainingText = (deadline) => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const daysRemaining = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
  
  if (daysRemaining < 0) return `${Math.abs(daysRemaining)} days overdue`;
  if (daysRemaining === 0) return 'Due today';
  if (daysRemaining === 1) return '1 day remaining';
  return `${daysRemaining} days remaining`;
};

// Filter evaluations by criteria
export const filterEvaluations = (evaluations, filters) => {
  return evaluations.filter(eval => {
    if (filters.region && filters.region !== 'all' && eval.region !== filters.region) {
      return false;
    }
    if (filters.city && filters.city !== 'all' && eval.city !== filters.city) {
      return false;
    }
    if (filters.level && filters.level !== 'all' && eval.level !== filters.level) {
      return false;
    }
    if (filters.status && filters.status !== 'all' && eval.status !== filters.status) {
      return false;
    }
    return true;
  });
};

// Export mock data
export const mockUsers = usersData.users;
export const mockSchools = schoolsData.schools;
export const mockEvaluations = evaluationsData.evaluations;
export const mockIndicators = indicatorsData.indicators;
export const mockDomains = indicatorsData.domains;
export const mockGradeBands = indicatorsData.grade_bands;
```

---

## Testing Checklist

- [ ] All JSON files are valid (no syntax errors)
- [ ] Data structures match TypeScript interfaces (if using TS)
- [ ] Helper functions calculate scores correctly
- [ ] Grade bands map to correct score ranges
- [ ] SLA colors update based on deadline
- [ ] Filter functions work with different criteria
- [ ] Mock data represents realistic scenarios
- [ ] At least one example of each status type exists

---

## Next Steps

After completing this document:
1. ✅ Validate all JSON syntax
2. ✅ Test helper functions with sample data
3. ✅ Move to Document 03: Authentication & Role Context
