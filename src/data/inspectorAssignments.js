export const inspectorAssignments = [
  {
    assignment_id: "INSP-001",
    inspector_id: "INS-2025-001",
    inspector_name: "Omar Al-Rashid",
    school_id: "SCH-RY-1001",
    school_name: "Al-Noor International School",
    request_id: "REQ-2024-00123",
    region: "Riyadh",
    city: "Riyadh City",
    school_type: "High School",
    status: "Pending",
    scheduled_visit: "2025-11-08T10:00:00Z",
    assigned_indicators: [
      {
        indicator_code: "C101",
        indicator_name: "Valid Fire Safety Equipment",
        domain: "Compliance",
        sub_category: "Health & Safety",
        status: "Pending",
        school_claim: "We have 25 fire extinguishers across all buildings",
        school_evidence: ["fire_equipment_inventory.pdf"],
        findings: null
      },
      {
        indicator_code: "C103",
        indicator_name: "Emergency Evacuation Routes",
        domain: "Compliance",
        sub_category: "Health & Safety",
        status: "Pending",
        school_claim: "All buildings have clearly marked evacuation routes",
        school_evidence: ["evacuation_plans.pdf"],
        findings: null
      },
      {
        indicator_code: "EX203",
        indicator_name: "Infrastructure Quality",
        domain: "Institutional Excellence",
        sub_category: "Facilities",
        status: "Pending",
        school_claim: "All facilities are in excellent condition",
        school_evidence: ["facility_report.pdf"],
        findings: null
      },
      {
        indicator_code: "EX204",
        indicator_name: "Technology Resources",
        domain: "Institutional Excellence",
        sub_category: "Facilities",
        status: "Pending",
        school_claim: "Modern computer labs in all buildings",
        school_evidence: ["tech_inventory.pdf"],
        findings: null
      },
      {
        indicator_code: "BS302",
        indicator_name: "Safety Facilities",
        domain: "Beneficiary Satisfaction",
        sub_category: "Safety",
        status: "Pending",
        school_claim: "Comprehensive safety measures in place",
        school_evidence: ["safety_audit.pdf"],
        findings: null
      }
    ],
    created_at: "2025-11-01T09:00:00Z",
    general_notes: ""
  },
  {
    assignment_id: "INSP-002",
    inspector_id: "INS-2025-001",
    inspector_name: "Omar Al-Rashid",
    school_id: "SCH-RY-1002",
    school_name: "Green Valley School",
    request_id: "REQ-2024-00156",
    region: "Riyadh",
    city: "Riyadh City",
    school_type: "Elementary",
    status: "In Progress",
    scheduled_visit: "2025-11-06T09:00:00Z",
    assigned_indicators: [
      {
        indicator_code: "C101",
        indicator_name: "Valid Fire Safety Equipment",
        domain: "Compliance",
        sub_category: "Health & Safety",
        status: "Discrepancy Found",
        school_claim: "We have 25 fire extinguishers across all buildings",
        school_evidence: ["fire_equipment_inventory.pdf"],
        findings: {
          finding_status: "Discrepancy Found",
          discrepancy_type: "Quantity Mismatch",
          severity: "Moderate",
          notes: "Counted only 22 functional fire extinguishers. 3 units in Building C are expired (last service: 2022).",
          evidence_files: [
            { filename: "expired_extinguishers_buildingC.jpg", size: "2.3 MB", uploaded_at: "2025-11-06T11:30:00Z" },
            { filename: "equipment_count_discrepancy.jpg", size: "1.8 MB", uploaded_at: "2025-11-06T11:32:00Z" }
          ],
          inspector_comment: "School claimed 25 extinguishers. Recommend immediate replacement of expired units.",
          recorded_at: "2025-11-06T11:35:00Z"
        }
      },
      {
        indicator_code: "C103",
        indicator_name: "Emergency Evacuation Routes",
        domain: "Compliance",
        sub_category: "Health & Safety",
        status: "Pending",
        school_claim: "All buildings have marked evacuation routes",
        school_evidence: ["evacuation_plans.pdf"],
        findings: null
      },
      {
        indicator_code: "EX203",
        indicator_name: "Infrastructure Quality",
        domain: "Institutional Excellence",
        sub_category: "Facilities",
        status: "Pending",
        school_claim: "All HVAC systems functional",
        school_evidence: ["hvac_maintenance.pdf"],
        findings: null
      }
    ],
    progress: 0.33,
    created_at: "2025-11-05T08:00:00Z",
    general_notes: "School was cooperative during initial inspection."
  },
  {
    assignment_id: "INSP-003",
    inspector_id: "INS-2025-001",
    inspector_name: "Omar Al-Rashid",
    school_id: "SCH-RY-1003",
    school_name: "Future Leaders Academy",
    request_id: "REQ-2024-00089",
    region: "Riyadh",
    city: "Riyadh City",
    school_type: "High School",
    status: "Completed",
    scheduled_visit: "2025-11-05T10:00:00Z",
    assigned_indicators: [
      {
        indicator_code: "C101",
        indicator_name: "Valid Fire Safety Equipment",
        domain: "Compliance",
        sub_category: "Health & Safety",
        status: "Verified",
        school_claim: "25 fire extinguishers, all serviced",
        school_evidence: ["fire_equipment_inventory.pdf"],
        findings: {
          finding_status: "Verified",
          discrepancy_type: null,
          severity: null,
          notes: "All fire extinguishers present and properly serviced. Documentation matches inventory.",
          evidence_files: [
            { filename: "fire_equipment_verified.jpg", size: "1.5 MB", uploaded_at: "2025-11-05T11:00:00Z" }
          ],
          inspector_comment: "School's claim verified. No issues found.",
          recorded_at: "2025-11-05T11:10:00Z"
        }
      },
      {
        indicator_code: "EX203",
        indicator_name: "Infrastructure Quality",
        domain: "Institutional Excellence",
        sub_category: "Facilities",
        status: "Discrepancy Found",
        school_claim: "All HVAC systems functional",
        school_evidence: ["hvac_maintenance.pdf"],
        findings: {
          finding_status: "Discrepancy Found",
          discrepancy_type: "Quality Issue",
          severity: "Minor",
          notes: "Two classrooms have broken air conditioning units. School reported all HVAC systems functional.",
          evidence_files: [
            { filename: "broken_ac_room201.jpg", size: "1.2 MB", uploaded_at: "2025-11-05T12:00:00Z" }
          ],
          inspector_comment: "Minor discrepancy. School should update maintenance logs.",
          recorded_at: "2025-11-05T12:15:00Z"
        }
      }
    ],
    progress: 1,
    completed_at: "2025-11-05T12:30:00Z",
    created_at: "2025-11-04T09:00:00Z",
    general_notes: "School was very cooperative. Principal provided access to all facilities. Recommend follow-up in 30 days to verify AC replacement."
  }
];

export const getAssignmentById = (assignmentId) => {
  return inspectorAssignments.find(a => a.assignment_id === assignmentId);
};

export const getAssignmentsByInspector = (inspectorId) => {
  return inspectorAssignments.filter(a => a.inspector_id === inspectorId);
};

export const getAssignmentsByStatus = (status) => {
  return inspectorAssignments.filter(a => a.status === status);
};
