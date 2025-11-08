// Mock data for Questions Bank feature
export const questionsBank = [
  {
    question_id: "Q-C-001",
    question_code: "Q-C-001",
    indicator_code: "C101",
    domain: "Compliance",
    category: "Health & Safety",
    question_text: {
      en: "Does your school have a valid Fire Safety Certificate issued by the Civil Defense? If yes, please upload the certificate and provide the expiry date.",
      ar: "هل لدى مدرستك شهادة سلامة حريق سارية صادرة عن الدفاع المدني؟ إذا كانت الإجابة بنعم، يرجى تحميل الشهادة وتقديم تاريخ الانتهاء."
    },
    field_type: "File Upload + Date Picker",
    tags: ["fire-safety", "certificates", "compliance"],
    status: "Active",
    is_required: true,
    helper_text: {
      en: "Upload the original certificate PDF. The certificate must be current and not expired.",
      ar: "قم بتحميل ملف PDF للشهادة الأصلية. يجب أن تكون الشهادة سارية وغير منتهية الصلاحية."
    },
    usage_statistics: {
      used_in_indicators: 1,
      total_responses: 1247,
      last_used: "2025-11-05T10:00:00Z"
    },
    version: "2.1",
    version_history: [
      {
        version: "2.1",
        date: "2025-09-15T10:00:00Z",
        changed_by: "Dr. Lina",
        changes: ["Added requirement for expiry date field", "Updated helper text with clarity on issuing agency"],
        rationale: "Compliance team feedback - need to track certificate expiry to automate renewal reminders."
      },
      {
        version: "2.0",
        date: "2025-03-10T10:00:00Z",
        changed_by: "Dr. Khalid",
        changes: ["Changed field type from Yes/No to File Upload", "Made question mandatory"],
        rationale: "Need actual certificate verification, not just self-declaration."
      },
      {
        version: "1.0",
        date: "2024-01-05T08:00:00Z",
        changed_by: "Committee Team",
        changes: ["Initial question created"],
        rationale: null
      }
    ],
    created_at: "2024-01-05T08:00:00Z",
    last_updated: "2025-09-15T10:00:00Z",
    last_updated_by: "Dr. Lina"
  },
  {
    question_id: "Q-C-002",
    question_code: "Q-C-002",
    indicator_code: "C102",
    domain: "Compliance",
    category: "Financial",
    question_text: {
      en: "Has your school completed an external financial audit by a certified auditor within the last 12 months? Upload the audit report.",
      ar: "هل أكملت مدرستك تدقيقًا ماليًا خارجيًا من قبل مدقق معتمد خلال الـ 12 شهرًا الماضية؟ قم بتحميل تقرير التدقيق."
    },
    field_type: "File Upload",
    tags: ["financial-audit", "compliance", "reports"],
    status: "Active",
    is_required: true,
    helper_text: {
      en: "Upload the complete audit report signed by a certified auditor. The audit must have been conducted within the past year.",
      ar: "قم بتحميل تقرير التدقيق الكامل الموقع من قبل مدقق معتمد. يجب أن يكون التدقيق قد تم خلال العام الماضي."
    },
    usage_statistics: {
      used_in_indicators: 18,
      total_responses: 1247,
      last_used: "2025-11-05T09:30:00Z"
    },
    version: "1.5",
    version_history: [
      {
        version: "1.5",
        date: "2025-06-20T14:00:00Z",
        changed_by: "Dr. Lina",
        changes: ["Added 12-month timeframe requirement", "Updated helper text"],
        rationale: "Align with MoE regulations requiring annual audits."
      },
      {
        version: "1.0",
        date: "2024-01-05T08:00:00Z",
        changed_by: "Committee Team",
        changes: ["Initial question created"],
        rationale: null
      }
    ],
    created_at: "2024-01-05T08:00:00Z",
    last_updated: "2025-06-20T14:00:00Z",
    last_updated_by: "Dr. Lina"
  },
  {
    question_id: "Q-C-003",
    question_code: "Q-C-003",
    indicator_code: "C103",
    domain: "Compliance",
    category: "Health & Safety",
    question_text: {
      en: "Does your school have emergency evacuation plans for all buildings? Upload floor plans with marked exits.",
      ar: "هل لدى مدرستك خطط إخلاء طوارئ لجميع المباني؟ قم بتحميل مخططات الطوابق مع تحديد المخارج."
    },
    field_type: "File Upload",
    tags: ["emergency-planning", "evacuation", "floor-plans", "safety"],
    status: "Active",
    is_required: true,
    helper_text: {
      en: "Upload PDF files showing evacuation routes for each building. Ensure all exits are clearly marked.",
      ar: "قم بتحميل ملفات PDF توضح طرق الإخلاء لكل مبنى. تأكد من تحديد جميع المخارج بوضوح."
    },
    usage_statistics: {
      used_in_indicators: 18,
      total_responses: 1247,
      last_used: "2025-11-03T11:20:00Z"
    },
    version: "1.3",
    version_history: [
      {
        version: "1.3",
        date: "2025-07-10T09:00:00Z",
        changed_by: "Dr. Khalid",
        changes: ["Specified requirement for all buildings, not just main building"],
        rationale: "Safety standards require comprehensive coverage of all facilities."
      },
      {
        version: "1.0",
        date: "2024-01-05T08:00:00Z",
        changed_by: "Committee Team",
        changes: ["Initial question created"],
        rationale: null
      }
    ],
    created_at: "2024-01-05T08:00:00Z",
    last_updated: "2025-07-10T09:00:00Z",
    last_updated_by: "Dr. Khalid"
  },
  {
    question_id: "Q-EX-001",
    question_code: "Q-EX-001",
    indicator_code: "EX201",
    domain: "Institutional Excellence",
    category: "Teaching Quality",
    question_text: {
      en: "What percentage of your teachers completed at least 20 hours of professional development training in the last academic year?",
      ar: "ما هي النسبة المئوية للمعلمين الذين أكملوا 20 ساعة على الأقل من التدريب على التطوير المهني في العام الدراسي الماضي؟"
    },
    field_type: "Percentage Input",
    tags: ["professional-development", "teacher-training", "quality"],
    status: "Active",
    is_required: true,
    helper_text: {
      en: "Enter the percentage (0-100). Training must be certified and documented. Minimum 20 hours per teacher as per MoE standards.",
      ar: "أدخل النسبة المئوية (0-100). يجب أن يكون التدريب معتمدًا وموثقًا. الحد الأدنى 20 ساعة لكل معلم حسب معايير وزارة التعليم."
    },
    usage_statistics: {
      used_in_indicators: 31,
      total_responses: 1247,
      last_used: "2025-11-05T08:45:00Z"
    },
    version: "3.0",
    version_history: [
      {
        version: "3.0",
        date: "2025-09-05T09:00:00Z",
        changed_by: "Dr. Khalid",
        changes: ["Changed from text input to percentage input for validation"],
        rationale: "Reduce data entry errors."
      },
      {
        version: "2.0",
        date: "2025-03-15T10:00:00Z",
        changed_by: "Dr. Lina",
        changes: ["Added 20-hour minimum requirement", "Updated helper text"],
        rationale: "Align with updated MoE professional development standards."
      },
      {
        version: "1.0",
        date: "2024-01-05T08:00:00Z",
        changed_by: "Committee Team",
        changes: ["Initial question created"],
        rationale: null
      }
    ],
    created_at: "2024-01-05T08:00:00Z",
    last_updated: "2025-09-05T09:00:00Z",
    last_updated_by: "Dr. Khalid"
  },
  {
    question_id: "Q-EX-002",
    question_code: "Q-EX-002",
    indicator_code: "EX202",
    domain: "Institutional Excellence",
    category: "Academic Achievement",
    question_text: {
      en: "What is your school's average student achievement rate on national standardized tests? (Percentage of students scoring above 70%)",
      ar: "ما هو متوسط معدل إنجاز الطلاب في مدرستك في الاختبارات الوطنية الموحدة؟ (نسبة الطلاب الذين حصلوا على أكثر من 70٪)"
    },
    field_type: "Percentage Input",
    tags: ["academic-achievement", "standardized-tests", "student-performance"],
    status: "Active",
    is_required: true,
    helper_text: {
      en: "Enter the percentage of students who scored 70% or above on national standardized tests. Data should be from the most recent academic year.",
      ar: "أدخل نسبة الطلاب الذين حصلوا على 70٪ أو أعلى في الاختبارات الوطنية الموحدة. يجب أن تكون البيانات من العام الدراسي الأخير."
    },
    usage_statistics: {
      used_in_indicators: 27,
      total_responses: 1247,
      last_used: "2025-11-04T15:30:00Z"
    },
    version: "2.2",
    version_history: [
      {
        version: "2.2",
        date: "2025-08-12T11:00:00Z",
        changed_by: "Dr. Lina",
        changes: ["Clarified 70% threshold requirement", "Added note about cross-verification"],
        rationale: "Transparency with schools about data validation."
      },
      {
        version: "2.0",
        date: "2025-04-05T09:00:00Z",
        changed_by: "Committee Team",
        changes: ["Changed to percentage-based metric from raw scores"],
        rationale: "Standardize across different test formats."
      },
      {
        version: "1.0",
        date: "2024-01-05T08:00:00Z",
        changed_by: "Committee Team",
        changes: ["Initial question created"],
        rationale: null
      }
    ],
    created_at: "2024-01-05T08:00:00Z",
    last_updated: "2025-08-12T11:00:00Z",
    last_updated_by: "Dr. Lina"
  },
  {
    question_id: "Q-EX-003",
    question_code: "Q-EX-003",
    indicator_code: "EX203",
    domain: "Institutional Excellence",
    category: "Infrastructure",
    question_text: {
      en: "Does your school have dedicated science laboratories with modern equipment for all grade levels that require them?",
      ar: "هل لدى مدرستك مختبرات علمية مخصصة بمعدات حديثة لجميع المستويات الدراسية التي تتطلبها؟"
    },
    field_type: "Yes/No Radio",
    tags: ["infrastructure", "laboratories", "facilities"],
    status: "Active",
    is_required: true,
    helper_text: {
      en: "Select 'Yes' only if you have fully equipped science labs accessible to all relevant grade levels.",
      ar: "اختر 'نعم' فقط إذا كان لديك مختبرات علمية مجهزة بالكامل ومتاحة لجميع المستويات الدراسية ذات الصلة."
    },
    usage_statistics: {
      used_in_indicators: 15,
      total_responses: 1247,
      last_used: "2025-11-02T14:15:00Z"
    },
    version: "1.1",
    version_history: [
      {
        version: "1.1",
        date: "2025-05-18T10:00:00Z",
        changed_by: "Dr. Khalid",
        changes: ["Added requirement for 'modern equipment'", "Clarified 'all grade levels that require them'"],
        rationale: "Previous version was too vague; schools need clear criteria."
      },
      {
        version: "1.0",
        date: "2024-01-05T08:00:00Z",
        changed_by: "Committee Team",
        changes: ["Initial question created"],
        rationale: null
      }
    ],
    created_at: "2024-01-05T08:00:00Z",
    last_updated: "2025-05-18T10:00:00Z",
    last_updated_by: "Dr. Khalid"
  },
  {
    question_id: "Q-BS-001",
    question_code: "Q-BS-001",
    indicator_code: "BS301",
    domain: "Beneficiary Satisfaction",
    category: "Parent Satisfaction",
    question_text: {
      en: "What is the overall parent satisfaction score from your most recent parent survey? (Scale: 1-5, where 5 is highly satisfied)",
      ar: "ما هو معدل رضا أولياء الأمور الإجمالي من استطلاع أولياء الأمور الأخير؟ (المقياس: 1-5، حيث 5 يعني راضٍ جدًا)"
    },
    field_type: "Number Input",
    tags: ["parent-satisfaction", "surveys", "feedback"],
    status: "Active",
    is_required: true,
    helper_text: {
      en: "Enter the average score (1.0-5.0) from your annual parent satisfaction survey. Survey must have at least 50% response rate to be valid.",
      ar: "أدخل المتوسط (1.0-5.0) من استطلاع رضا أولياء الأمور السنوي. يجب أن يكون معدل الاستجابة 50٪ على الأقل ليكون صالحًا."
    },
    usage_statistics: {
      used_in_indicators: 22,
      total_responses: 1247,
      last_used: "2025-11-05T07:20:00Z"
    },
    version: "2.0",
    version_history: [
      {
        version: "2.0",
        date: "2025-07-25T13:00:00Z",
        changed_by: "Dr. Lina",
        changes: ["Added 50% minimum response rate requirement", "Standardized scale to 1-5"],
        rationale: "Ensure survey data is representative and comparable across schools."
      },
      {
        version: "1.0",
        date: "2024-01-05T08:00:00Z",
        changed_by: "Committee Team",
        changes: ["Initial question created"],
        rationale: null
      }
    ],
    created_at: "2024-01-05T08:00:00Z",
    last_updated: "2025-07-25T13:00:00Z",
    last_updated_by: "Dr. Lina"
  },
  {
    question_id: "Q-BS-002",
    question_code: "Q-BS-002",
    indicator_code: "BS302",
    domain: "Beneficiary Satisfaction",
    category: "Safety & Security",
    question_text: {
      en: "Do parents rate the school's safety and security measures as satisfactory or above in your annual survey? What percentage of parents responded positively?",
      ar: "هل يقيم أولياء الأمور تدابير السلامة والأمن في المدرسة بأنها مرضية أو أعلى في استطلاعكم السنوي؟ ما هي النسبة المئوية لأولياء الأمور الذين أجابوا بشكل إيجابي؟"
    },
    field_type: "Percentage Input",
    tags: ["safety", "parent-satisfaction", "security"],
    status: "Active",
    is_required: true,
    helper_text: {
      en: "Enter the percentage (0-100) of parents who rated safety measures as 'Satisfactory' or higher.",
      ar: "أدخل النسبة المئوية (0-100) من أولياء الأمور الذين قيموا تدابير السلامة بأنها 'مرضية' أو أعلى."
    },
    usage_statistics: {
      used_in_indicators: 19,
      total_responses: 1247,
      last_used: "2025-11-04T16:45:00Z"
    },
    version: "1.2",
    version_history: [
      {
        version: "1.2",
        date: "2025-06-30T11:30:00Z",
        changed_by: "Dr. Khalid",
        changes: ["Changed from Yes/No to percentage input for granular data"],
        rationale: "Better measurement of satisfaction levels across parent population."
      },
      {
        version: "1.0",
        date: "2024-01-05T08:00:00Z",
        changed_by: "Committee Team",
        changes: ["Initial question created"],
        rationale: null
      }
    ],
    created_at: "2024-01-05T08:00:00Z",
    last_updated: "2025-06-30T11:30:00Z",
    last_updated_by: "Dr. Khalid"
  },
  {
    question_id: "Q-C-004",
    question_code: "Q-C-004",
    indicator_code: "C101",
    domain: "Compliance",
    category: "Licensing",
    question_text: {
      en: "Are all teachers employed at your school properly licensed by the Ministry of Education? Upload the license verification report.",
      ar: "هل جميع المعلمين العاملين في مدرستك مرخصون بشكل صحيح من قبل وزارة التعليم؟ قم بتحميل تقرير التحقق من الترخيص."
    },
    field_type: "File Upload",
    tags: ["teacher-licensing", "compliance", "credentials"],
    status: "Active",
    is_required: true,
    helper_text: {
      en: "Upload a report listing all teachers with their valid MoE license numbers. All licenses must be current.",
      ar: "قم بتحميل تقرير يسرد جميع المعلمين مع أرقام تراخيص وزارة التعليم الصالحة. يجب أن تكون جميع التراخيص سارية."
    },
    usage_statistics: {
      used_in_indicators: 25,
      total_responses: 1247,
      last_used: "2025-11-05T09:00:00Z"
    },
    version: "1.4",
    version_history: [
      {
        version: "1.4",
        date: "2025-08-20T10:00:00Z",
        changed_by: "Dr. Lina",
        changes: ["Added requirement for verification report upload", "Clarified 'all teachers' includes part-time staff"],
        rationale: "Strengthen verification process and close compliance gaps."
      },
      {
        version: "1.0",
        date: "2024-01-05T08:00:00Z",
        changed_by: "Committee Team",
        changes: ["Initial question created"],
        rationale: null
      }
    ],
    created_at: "2024-01-05T08:00:00Z",
    last_updated: "2025-08-20T10:00:00Z",
    last_updated_by: "Dr. Lina"
  },
  {
    question_id: "Q-EX-004",
    question_code: "Q-EX-004",
    indicator_code: "EX204",
    domain: "Institutional Excellence",
    category: "Technology",
    question_text: {
      en: "What is the student-to-computer ratio in your school? (Number of students per available computer for educational use)",
      ar: "ما هي نسبة الطلاب إلى الحاسوب في مدرستك؟ (عدد الطلاب لكل حاسوب متاح للاستخدام التعليمي)"
    },
    field_type: "Number Input",
    tags: ["technology", "infrastructure", "digital-resources"],
    status: "Active",
    is_required: true,
    helper_text: {
      en: "Enter the ratio as a number (e.g., 5 means 5 students per computer). Lower numbers indicate better access.",
      ar: "أدخل النسبة كرقم (مثلاً، 5 تعني 5 طلاب لكل حاسوب). الأرقام المنخفضة تشير إلى وصول أفضل."
    },
    usage_statistics: {
      used_in_indicators: 16,
      total_responses: 1247,
      last_used: "2025-11-03T13:30:00Z"
    },
    version: "2.1",
    version_history: [
      {
        version: "2.1",
        date: "2025-09-01T14:00:00Z",
        changed_by: "Dr. Khalid",
        changes: ["Clarified 'educational use' excludes administrative computers", "Added guidance on ratio interpretation"],
        rationale: "Ensure consistent reporting across schools."
      },
      {
        version: "1.0",
        date: "2024-01-05T08:00:00Z",
        changed_by: "Committee Team",
        changes: ["Initial question created"],
        rationale: null
      }
    ],
    created_at: "2024-01-05T08:00:00Z",
    last_updated: "2025-09-01T14:00:00Z",
    last_updated_by: "Dr. Khalid"
  },
  {
    question_id: "Q-C-005",
    question_code: "Q-C-005",
    indicator_code: "C102",
    domain: "Compliance",
    category: "Financial",
    question_text: {
      en: "Does your school maintain separate bank accounts for tuition fees and operational expenses as per MoE regulations?",
      ar: "هل تحتفظ مدرستك بحسابات بنكية منفصلة للرسوم الدراسية والنفقات التشغيلية وفقًا لأنظمة وزارة التعليم؟"
    },
    field_type: "Yes/No Radio",
    tags: ["financial-compliance", "banking", "regulations"],
    status: "Active",
    is_required: true,
    helper_text: {
      en: "Select 'Yes' if you maintain separate accounts as required by MoE financial regulations.",
      ar: "اختر 'نعم' إذا كنت تحتفظ بحسابات منفصلة كما هو مطلوب بموجب الأنظمة المالية لوزارة التعليم."
    },
    usage_statistics: {
      used_in_indicators: 1,
      total_responses: 1247,
      last_used: "2025-11-05T10:30:00Z"
    },
    version: "1.0",
    version_history: [
      {
        version: "1.0",
        date: "2024-01-05T08:00:00Z",
        changed_by: "Committee Team",
        changes: ["Initial question created"],
        rationale: null
      }
    ],
    created_at: "2024-01-05T08:00:00Z",
    last_updated: "2024-01-05T08:00:00Z",
    last_updated_by: "Committee Team"
  },
  {
    question_id: "Q-C-006",
    question_code: "Q-C-006",
    indicator_code: "C103",
    domain: "Compliance",
    category: "Health & Safety",
    question_text: {
      en: "How many fire drills were conducted in the last academic year? Upload documentation of drill dates and participation rates.",
      ar: "كم عدد تدريبات الحريق التي أجريت في العام الدراسي الماضي؟ قم بتحميل وثائق تواريخ التدريبات ومعدلات المشاركة."
    },
    field_type: "Number Input + File Upload",
    tags: ["fire-drills", "emergency-preparedness", "safety"],
    status: "Active",
    is_required: true,
    helper_text: {
      en: "Enter the number of drills (minimum 2 per year required). Upload signed drill reports with dates and student/staff participation counts.",
      ar: "أدخل عدد التدريبات (الحد الأدنى 2 في السنة مطلوب). قم بتحميل تقارير التدريبات الموقعة مع التواريخ وأعداد مشاركة الطلاب/الموظفين."
    },
    usage_statistics: {
      used_in_indicators: 1,
      total_responses: 1247,
      last_used: "2025-11-04T14:20:00Z"
    },
    version: "1.2",
    version_history: [
      {
        version: "1.2",
        date: "2025-08-10T10:00:00Z",
        changed_by: "Dr. Lina",
        changes: ["Added requirement for participation rates in documentation"],
        rationale: "Need to verify actual drill effectiveness, not just occurrence."
      },
      {
        version: "1.0",
        date: "2024-01-05T08:00:00Z",
        changed_by: "Committee Team",
        changes: ["Initial question created"],
        rationale: null
      }
    ],
    created_at: "2024-01-05T08:00:00Z",
    last_updated: "2025-08-10T10:00:00Z",
    last_updated_by: "Dr. Lina"
  },
  {
    question_id: "Q-EX-005",
    question_code: "Q-EX-005",
    indicator_code: "EX201",
    domain: "Institutional Excellence",
    category: "Teaching Quality",
    question_text: {
      en: "What percentage of your teachers hold advanced degrees (Master's or PhD) in their subject area?",
      ar: "ما هي النسبة المئوية للمعلمين الحاصلين على درجات علمية متقدمة (ماجستير أو دكتوراه) في مجال تخصصهم؟"
    },
    field_type: "Percentage Input",
    tags: ["teacher-qualifications", "advanced-degrees", "quality"],
    status: "Active",
    is_required: false,
    helper_text: {
      en: "Enter the percentage (0-100). Include only degrees directly related to the subject being taught.",
      ar: "أدخل النسبة المئوية (0-100). قم بتضمين الدرجات العلمية المتعلقة مباشرة بالمادة التي يتم تدريسها فقط."
    },
    usage_statistics: {
      used_in_indicators: 1,
      total_responses: 1247,
      last_used: "2025-11-03T11:00:00Z"
    },
    version: "1.0",
    version_history: [
      {
        version: "1.0",
        date: "2024-01-05T08:00:00Z",
        changed_by: "Committee Team",
        changes: ["Initial question created"],
        rationale: null
      }
    ],
    created_at: "2024-01-05T08:00:00Z",
    last_updated: "2024-01-05T08:00:00Z",
    last_updated_by: "Committee Team"
  },
  {
    question_id: "Q-EX-006",
    question_code: "Q-EX-006",
    indicator_code: "EX202",
    domain: "Institutional Excellence",
    category: "Academic Achievement",
    question_text: {
      en: "What is the graduation rate for your school in the last academic year? (Percentage of enrolled students who completed their program)",
      ar: "ما هو معدل التخرج في مدرستك في العام الدراسي الماضي؟ (نسبة الطلاب المسجلين الذين أكملوا برنامجهم)"
    },
    field_type: "Percentage Input",
    tags: ["graduation-rate", "academic-success", "student-retention"],
    status: "Active",
    is_required: true,
    helper_text: {
      en: "Enter the percentage (0-100) of students who successfully completed and graduated. Exclude transfers to other schools.",
      ar: "أدخل النسبة المئوية (0-100) من الطلاب الذين أكملوا وتخرجوا بنجاح. استبعد المنتقلين إلى مدارس أخرى."
    },
    usage_statistics: {
      used_in_indicators: 1,
      total_responses: 1247,
      last_used: "2025-11-05T09:15:00Z"
    },
    version: "1.1",
    version_history: [
      {
        version: "1.1",
        date: "2025-06-15T10:00:00Z",
        changed_by: "Dr. Khalid",
        changes: ["Clarified exclusion of transfers in calculation"],
        rationale: "Standardize calculation methodology across schools."
      },
      {
        version: "1.0",
        date: "2024-01-05T08:00:00Z",
        changed_by: "Committee Team",
        changes: ["Initial question created"],
        rationale: null
      }
    ],
    created_at: "2024-01-05T08:00:00Z",
    last_updated: "2025-06-15T10:00:00Z",
    last_updated_by: "Dr. Khalid"
  },
  {
    question_id: "Q-EX-007",
    question_code: "Q-EX-007",
    indicator_code: "EX203",
    domain: "Institutional Excellence",
    category: "Infrastructure",
    question_text: {
      en: "Does your school have a dedicated library with a minimum of 10 books per student?",
      ar: "هل لدى مدرستك مكتبة مخصصة بحد أدنى 10 كتب لكل طالب؟"
    },
    field_type: "Yes/No Radio",
    tags: ["library", "infrastructure", "learning-resources"],
    status: "Active",
    is_required: true,
    helper_text: {
      en: "Select 'Yes' if your library meets the minimum 10 books per student requirement. Digital books count toward this total.",
      ar: "اختر 'نعم' إذا كانت مكتبتك تلبي الحد الأدنى من 10 كتب لكل طالب. تُحتسب الكتب الرقمية ضمن هذا المجموع."
    },
    usage_statistics: {
      used_in_indicators: 1,
      total_responses: 1247,
      last_used: "2025-11-02T16:30:00Z"
    },
    version: "1.3",
    version_history: [
      {
        version: "1.3",
        date: "2025-09-20T10:00:00Z",
        changed_by: "Dr. Lina",
        changes: ["Added clarification that digital books count"],
        rationale: "Reflect modern learning resources and digital transformation."
      },
      {
        version: "1.0",
        date: "2024-01-05T08:00:00Z",
        changed_by: "Committee Team",
        changes: ["Initial question created"],
        rationale: null
      }
    ],
    created_at: "2024-01-05T08:00:00Z",
    last_updated: "2025-09-20T10:00:00Z",
    last_updated_by: "Dr. Lina"
  },
  {
    question_id: "Q-BS-003",
    question_code: "Q-BS-003",
    indicator_code: "BS301",
    domain: "Beneficiary Satisfaction",
    category: "Parent Satisfaction",
    question_text: {
      en: "What is the response rate for your annual parent satisfaction survey?",
      ar: "ما هو معدل الاستجابة لاستطلاع رضا أولياء الأمور السنوي؟"
    },
    field_type: "Percentage Input",
    tags: ["parent-engagement", "survey-participation", "feedback"],
    status: "Active",
    is_required: true,
    helper_text: {
      en: "Enter the percentage (0-100) of parents who responded to the survey. Minimum 50% response rate required for valid results.",
      ar: "أدخل النسبة المئوية (0-100) من أولياء الأمور الذين استجابوا للاستطلاع. الحد الأدنى لمعدل الاستجابة 50٪ مطلوب للنتائج الصالحة."
    },
    usage_statistics: {
      used_in_indicators: 1,
      total_responses: 1247,
      last_used: "2025-11-04T10:45:00Z"
    },
    version: "1.0",
    version_history: [
      {
        version: "1.0",
        date: "2024-01-05T08:00:00Z",
        changed_by: "Committee Team",
        changes: ["Initial question created"],
        rationale: null
      }
    ],
    created_at: "2024-01-05T08:00:00Z",
    last_updated: "2024-01-05T08:00:00Z",
    last_updated_by: "Committee Team"
  }
];

// Filter functions for Questions Bank
export const filterQuestions = (questions, filters) => {
  return questions.filter(question => {
    if (filters.domain && filters.domain !== 'All' && question.domain !== filters.domain) {
      return false;
    }
    if (filters.category && filters.category !== 'All' && question.category !== filters.category) {
      return false;
    }
    if (filters.fieldType && filters.fieldType !== 'All' && question.field_type !== filters.fieldType) {
      return false;
    }
    if (filters.status && filters.status !== 'Active' && question.status !== filters.status) {
      return false;
    }
    if (filters.indicator && filters.indicator !== 'All' && question.indicator_code !== filters.indicator) {
      return false;
    }
    if (filters.searchTerm && filters.searchTerm.trim() !== '') {
      const searchLower = filters.searchTerm.toLowerCase();
      const matchesText =
        question.question_text.en.toLowerCase().includes(searchLower) ||
        question.question_text.ar.includes(filters.searchTerm) ||
        question.question_code.toLowerCase().includes(searchLower);
      const matchesTags = question.tags.some(tag => tag.toLowerCase().includes(searchLower));
      if (!matchesText && !matchesTags) {
        return false;
      }
    }
    return true;
  });
};

// Get unique categories for a domain
export const getCategoriesForDomain = (domain) => {
  if (domain === 'All') {
    return ['All', ...new Set(questionsBank.map(q => q.category))];
  }
  return ['All', ...new Set(questionsBank.filter(q => q.domain === domain).map(q => q.category))];
};

// Get all unique field types
export const getFieldTypes = () => {
  return ['All', ...new Set(questionsBank.map(q => q.field_type))];
};

// Get questions by indicator code
export const getQuestionsByIndicator = (indicatorCode) => {
  return questionsBank.filter(q => q.indicator_code === indicatorCode);
};

// Get all unique indicators from questions
export const getIndicatorsFromQuestions = () => {
  return [...new Set(questionsBank.map(q => q.indicator_code))].filter(Boolean);
};
