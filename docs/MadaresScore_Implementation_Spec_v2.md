# Madares Score System - Implementation Specification v2.0
## New Features for Prototype Development

**Target Platform:** React 18+ with Tailwind CSS  
**State Management:** React Context API + useState/useReducer  
**Routing:** React Router v6  
**Data:** Mock JSON (no backend)  
**Prepared For:** Claude Code Implementation  

---

## Table of Contents

1. [Inspector Role & Workflow](#1-inspector-role--workflow)
2. [Committee: Custom Domain Creation](#2-committee-custom-domain-creation)
3. [Committee: Questions Bank](#3-committee-questions-bank)
4. [Committee: Enable/Disable Indicators](#4-committee-enabledisable-indicators)
5. [Committee: Indicator Review Page](#5-committee-indicator-review-page)
6. [School Admin: Dashboard KPI Cards](#6-school-admin-dashboard-kpi-cards)
7. [School Admin: Comparative Rankings](#7-school-admin-comparative-rankings)
8. [School Admin: Historical Logs](#8-school-admin-historical-logs)
9. [Mock Data Structures](#9-mock-data-structures)
10. [Component Architecture](#10-component-architecture)

---

## 1. Inspector Role & Workflow

### 1.1 Overview
Inspectors conduct physical on-site inspections in parallel with school evaluations. They verify evidence, validate facilities, and flag discrepancies between school-reported data and actual findings.

### 1.2 User Stories

**US-INS-01:** Inspector Dashboard
```
As an Inspector, I want to see my assigned inspection tasks grouped by school,
so I can plan my site visits efficiently.
```

**US-INS-02:** Inspection Assignment Details
```
As an Inspector, I want to view which specific indicators I need to inspect 
for each school, so I know what to verify during my visit.
```

**US-INS-03:** Record Inspection Findings
```
As an Inspector, I want to record my findings for each indicator with photos 
and notes, so Ops reviewers can compare them with school submissions.
```

**US-INS-04:** Flag Discrepancies
```
As an Inspector, when my findings differ from school's claims, I want to 
flag the discrepancy with evidence, so Ops can investigate further.
```

**US-INS-05:** Ops Integration
```
As an Ops Reviewer, I want to see inspector findings alongside school 
submissions, so I can make informed review decisions.
```

### 1.3 Inspector Dashboard UI

**Route:** `/inspector/dashboard`

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│  Inspector Dashboard                    Profile: Omar Al-Rashid │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Summary Cards:                                                 │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │ Assigned     │ │ Completed    │ │ Pending      │            │
│  │ Schools: 8   │ │ Today: 2     │ │ This Week: 6 │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
│                                                                  │
│  My Inspection Assignments:                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 🏫 Al-Noor International School          Status: Pending │  │
│  │ Region: Riyadh | City: Riyadh City | High School        │  │
│  │ Assigned Indicators: 5                                   │  │
│  │   • [C101] Fire Safety Equipment                         │  │
│  │   • [C103] Emergency Evacuation Routes                   │  │
│  │   • [EX203] Infrastructure Quality                       │  │
│  │   • [EX204] Technology Resources                         │  │
│  │   • [BS302] Safety Facilities                            │  │
│  │ Scheduled Visit: Nov 8, 2025 10:00 AM                    │  │
│  │ [Start Inspection] [View Details]                        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 🏫 Green Valley School          Status: In Progress ⏳   │  │
│  │ Region: Riyadh | City: Riyadh City | Elementary         │  │
│  │ Assigned Indicators: 3 | Completed: 1/3                 │  │
│  │ Progress: [████░░░] 33%                                  │  │
│  │ [Continue Inspection] [Submit Report]                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 🏫 Future Leaders Academy      Status: Completed ✅      │  │
│  │ Completed: Nov 5, 2025 | Findings: 2 discrepancies      │  │
│  │ [View Report] [Download PDF]                             │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

**Components Needed:**
- `InspectorDashboard.jsx`
- `AssignmentCard.jsx`
- `InspectionSummaryCards.jsx`

### 1.4 Inspection Detail Page UI

**Route:** `/inspector/inspection/:schoolId`

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│  ← Back to Dashboard                                            │
├─────────────────────────────────────────────────────────────────┤
│  Inspection: Al-Noor International School                       │
│  Request ID: REQ-2024-00123 | Inspector: Omar Al-Rashid         │
│  Visit Date: Nov 8, 2025 10:00 AM | Status: In Progress        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Indicators to Inspect (5):                                     │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ [C101] Valid Fire Safety Equipment                       │  │
│  │ Sub-Category: Health & Safety                            │  │
│  │                                                           │  │
│  │ School's Claim:                                          │  │
│  │   "We have 25 fire extinguishers across all buildings"  │  │
│  │   Evidence: 📎 fire_equipment_inventory.pdf              │  │
│  │                                                           │  │
│  │ ─────────────────────────────────────────────────────── │  │
│  │                                                           │  │
│  │ Inspector's Findings:                                    │  │
│  │   Status: ● Verified  ○ Discrepancy Found  ○ Unable to  │  │
│  │           Verify                                         │  │
│  │                                                           │  │
│  │   [If "Verified" selected:]                              │  │
│  │   ✅ Findings match school's claim                       │  │
│  │                                                           │  │
│  │   [If "Discrepancy Found" selected:]                     │  │
│  │   ⚠️ Discrepancy Type:                                   │  │
│  │      ○ Quantity Mismatch                                 │  │
│  │      ○ Quality Issue                                     │  │
│  │      ○ Missing Evidence                                  │  │
│  │      ○ Expired/Invalid                                   │  │
│  │                                                           │  │
│  │   Inspector Notes (Required):                            │  │
│  │   ┌────────────────────────────────────────────────┐    │  │
│  │   │ Counted only 22 functional fire extinguishers. │    │  │
│  │   │ 3 units in Building C are expired (last        │    │  │
│  │   │ service: 2022).                                 │    │  │
│  │   └────────────────────────────────────────────────┘    │  │
│  │   Character count: 127 / 2000                            │  │
│  │                                                           │  │
│  │   Upload Evidence (Photos/Documents):                    │  │
│  │   [+ Upload Photo] [+ Upload Document]                   │  │
│  │   📷 expired_extinguishers_buildingC.jpg (2.3 MB)       │  │
│  │   📷 equipment_count_discrepancy.jpg (1.8 MB)           │  │
│  │                                                           │  │
│  │   Severity Level:                                        │  │
│  │   ○ Minor  ● Moderate  ○ Critical                        │  │
│  │                                                           │  │
│  │   [Save Finding] [Mark as Complete]                      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  [Repeat for remaining 4 indicators...]                         │
│                                                                  │
│  ─────────────────────────────────────────────────────────────  │
│                                                                  │
│  General Inspection Notes (Optional):                           │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ School was very cooperative. Principal provided access   │  │
│  │ to all facilities. Recommend follow-up in 30 days to     │  │
│  │ verify extinguisher replacement.                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  [Save Draft] [Submit Inspection Report]                        │
└─────────────────────────────────────────────────────────────────┘
```

**Components Needed:**
- `InspectionDetail.jsx`
- `IndicatorInspectionCard.jsx`
- `DiscrepancyForm.jsx`
- `EvidenceUploader.jsx`

### 1.5 Ops View Integration

**Enhancement to:** `/ops/evaluation-request/:id` (Current Evaluation - Ops View)

**New Element in Each Indicator Card:**
```
┌─────────────────────────────────────────────────────────────┐
│ [C101] Valid Fire Safety Certificate                        │
│                                                              │
│ School's Answer: (read-only)                                │
│   Certificate Uploaded: ✓ Yes                              │
│   Evidence: 🗎 fire_safety_cert_2024.pdf                   │
│                                                              │
│ ──────────────────────────────────────────────────────────  │
│                                                              │
│ 🔍 Inspector Findings:  Status: ⚠️ Discrepancy Found       │
│                                                              │
│ Inspector: Omar Al-Rashid | Visited: Nov 8, 2025            │
│                                                              │
│ Finding:                                                     │
│   ⚠️ Quantity Mismatch (Moderate Severity)                  │
│   "Counted only 22 functional fire extinguishers. 3 units   │
│   in Building C are expired (last service: 2022)."          │
│                                                              │
│ Evidence:                                                    │
│   📷 expired_extinguishers_buildingC.jpg [View]             │
│   📷 equipment_count_discrepancy.jpg [View]                 │
│                                                              │
│ [View Full Inspection Report]                                │
│                                                              │
│ ──────────────────────────────────────────────────────────  │
│                                                              │
│ Ops Review:                                                 │
│   Status: ● Accepted  ○ Return for Correction              │
│   Comment: _________________________________________        │
└─────────────────────────────────────────────────────────────┘
```

**Status Badge Colors:**
- ✅ **Inspector Verified** (green): Findings match school's claim
- ⚠️ **Discrepancy Found** (amber): Inspector found issues
- ⏳ **Inspection Pending** (gray): Inspector not yet visited
- ❌ **Unable to Verify** (red): Inspector couldn't access or validate

**Components to Update:**
- `OpsReviewCard.jsx` - Add `InspectorFindings` sub-component
- `InspectorFindingsBadge.jsx`

### 1.6 Inspector Assignment Flow

**Triggered by:** Ops creates Evaluation Request

**Auto-Assignment Logic (Mock):**
- System assigns inspectors based on:
  - Geographic region (inspectors assigned to specific regions)
  - Indicator type (some inspectors specialize in safety, others in facilities)
  - Workload balance (distribute assignments evenly)

**Manual Assignment (Ops):**
- In Evaluation Requests table, add action: "Assign Inspector"
- Opens modal with inspector dropdown and indicator checklist
- Ops selects: Which inspector + Which indicators to inspect

---

## 2. Committee: Custom Domain Creation

### 2.1 Overview
Allow Committee members to create custom domains directly within the "Add New Indicator" workflow, without navigating away.

### 2.2 User Story

**US-COM-01:** Inline Custom Domain Creation
```
As a Committee Member, when proposing a new indicator and selecting domain,
I want to see a "+ Create New Custom Domain" option, so I can create the 
domain and continue with indicator creation in one flow.
```

### 2.3 UI Enhancement

**Location:** `/committee/indicators` → "Add New Indicator" Modal

**Updated Domain Dropdown:**
```
┌─────────────────────────────────────────────────────────────┐
│  Add New Indicator                                    [✕]   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Domain: *                                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Select Domain                                     ▼  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  [Dropdown opens:]                                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Compliance                                            │  │
│  │ Institutional Excellence                              │  │
│  │ Beneficiary Satisfaction                              │  │
│  │ ───────────────────────────────────────────────────── │  │
│  │ Environmental Sustainability (Custom)                 │  │
│  │ ───────────────────────────────────────────────────── │  │
│  │ ➕ Create New Custom Domain                           │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**When "+ Create New Custom Domain" is selected:**
```
┌─────────────────────────────────────────────────────────────┐
│  Create Custom Domain                                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Domain Name (English): *                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Environmental Sustainability                          │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  Domain Name (Arabic): *                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ الاستدامة البيئية                                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  Initial Weight (%): *                                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 10                                                    │  │
│  └──────────────────────────────────────────────────────┘  │
│  ⚠️ Note: Total domain weights must equal 100%. Current    │
│     total without this domain: 90%. Adjust other domains   │
│     if needed.                                              │
│                                                              │
│  Description:                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Evaluates school's commitment to environmental        │  │
│  │ sustainability, green initiatives, and eco-friendly   │  │
│  │ practices.                                             │  │
│  └──────────────────────────────────────────────────────┘  │
│  Character count: 127 / 500                                 │
│                                                              │
│  [Cancel]  [Create Domain & Continue]                       │
└─────────────────────────────────────────────────────────────┘
```

**After domain created:**
- New domain immediately appears in dropdown as selected
- User continues filling indicator form
- Domain status: "Pending Approval" (requires Committee Chair approval)
- Indicator inherits domain's pending status

**Components Needed:**
- Update `AddIndicatorModal.jsx` to include domain creation sub-flow
- New component: `InlineDomainCreator.jsx`
- State management: Track newly created custom domains in Context

---

## 3. Committee: Questions Bank

### 3.1 Overview
A centralized library of reusable, pre-defined questions that Committee members can browse, search, and add to indicators. Questions are tagged by domain/category and version-controlled.

### 3.2 User Stories

**US-COM-02:** Browse Questions Bank
```
As a Committee Member, I want to browse a library of questions filtered by 
domain and category, so I can find relevant questions for my indicators.
```

**US-COM-03:** Add Question to Indicator
```
As a Committee Member, when creating a new indicator, I want to select a 
question from the Questions Bank, so I can ensure consistency and save time.
```

**US-COM-04:** Version Control for Questions
```
As a Committee Member, I want to see the version history of each question, 
so I can track changes and understand why updates were made.
```

### 3.3 Questions Bank UI

**Route:** `/committee/questions-bank`

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│  Questions Bank                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ Search: [_______________________________] 🔍               ││
│  │                                                             ││
│  │ Filters:                                                    ││
│  │   Domain: [All ▼]  Category: [All ▼]  Type: [All ▼]       ││
│  │   Tags: [_________]  Status: [Active ▼]                    ││
│  │                                                             ││
│  │ [Apply Filters] [Clear]          [+ Add New Question]      ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                  │
│  Questions (47 results):                                         │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Q-C-001 | Compliance - Health & Safety        v2.1       │  │
│  │                                                           │  │
│  │ Question Text:                                            │  │
│  │ "Does your school have a valid Fire Safety Certificate   │  │
│  │  issued by the Civil Defense? If yes, please upload the  │  │
│  │  certificate and provide the expiry date."               │  │
│  │                                                           │  │
│  │ Field Type: File Upload + Date Picker                    │  │
│  │ Tags: #fire-safety #certificates #compliance             │  │
│  │ Status: ✅ Active | Used in: 23 indicators               │  │
│  │ Last Updated: Sep 15, 2025 by Dr. Lina                   │  │
│  │                                                           │  │
│  │ [📋 Use in Indicator] [✏️ Edit] [📊 View Usage] [🕒 History]│
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Q-C-002 | Compliance - Financial              v1.0       │  │
│  │                                                           │  │
│  │ Question Text:                                            │  │
│  │ "Has your school completed an external financial audit   │  │
│  │  for the current fiscal year? Upload the audit report    │  │
│  │  with auditor certification."                            │  │
│  │                                                           │  │
│  │ Field Type: Yes/No + File Upload                         │  │
│  │ Tags: #financial #audit #certification                   │  │
│  │ Status: ✅ Active | Used in: 15 indicators               │  │
│  │                                                           │  │
│  │ [📋 Use in Indicator] [✏️ Edit] [📊 View Usage] [🕒 History]│
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Q-EX-015 | Excellence - Teaching Quality      v3.2       │  │
│  │                                                           │  │
│  │ Question Text:                                            │  │
│  │ "What percentage of your teachers completed professional │  │
│  │  development training (minimum 20 hours) in the last     │  │
│  │  academic year?"                                          │  │
│  │                                                           │  │
│  │ Field Type: Percentage Input (0-100%)                    │  │
│  │ Tags: #teacher-training #professional-development        │  │
│  │ Status: ✅ Active | Used in: 8 indicators                │  │
│  │                                                           │  │
│  │ [📋 Use in Indicator] [✏️ Edit] [📊 View Usage] [🕒 History]│
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  [Load More...] or [Pagination: 1 2 3 4 5 >]                   │
└─────────────────────────────────────────────────────────────────┘
```

### 3.4 Add New Question Modal

**Triggered by:** "+ Add New Question" button in Questions Bank

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  Add New Question to Bank                             [✕]   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Question Code (Auto-generated): *                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Q-C-024                                               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  Domain: *                                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Compliance                                         ▼  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  Category: *                                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Health & Safety                                    ▼  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  Question Text (English): *                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Does your school have emergency evacuation plans for  │  │
│  │ all buildings? Upload floor plans with marked exits.  │  │
│  └──────────────────────────────────────────────────────┘  │
│  Character count: 112 / 1000                                │
│                                                              │
│  Question Text (Arabic): *                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ هل لدى مدرستك خطط إخلاء طوارئ لجميع المباني؟         │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  Field Type: *                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ ☐ Text Input                                          │  │
│  │ ☐ Yes/No Radio                                        │  │
│  │ ☑ File Upload                                         │  │
│  │ ☐ Date Picker                                         │  │
│  │ ☐ Dropdown Select                                     │  │
│  │ ☐ Number Input                                        │  │
│  │ ☐ Percentage Input                                    │  │
│  │ ☐ Multiple Choice                                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  Tags (comma-separated):                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ emergency-planning, evacuation, floor-plans, safety   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  Is Required Question: ☑ Yes  ☐ No                         │
│                                                              │
│  Helper Text (Optional):                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Upload PDF files showing evacuation routes for each   │  │
│  │ building. Ensure all exits are clearly marked.        │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  [Cancel]  [Save to Questions Bank]                         │
└─────────────────────────────────────────────────────────────┘
```

### 3.5 Use Question in Indicator

**Integration with "Add New Indicator" Modal:**

Add button in indicator creation: **"📋 Select from Questions Bank"**

**When clicked:**
```
┌─────────────────────────────────────────────────────────────┐
│  Select Question from Bank                            [✕]   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Search: [_______________________________] 🔍               │
│  Filter by Domain: [Compliance ▼]  Category: [All ▼]       │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ ○ Q-C-001 | Fire Safety Certificate         v2.1     │  │
│  │   "Does your school have a valid Fire Safety          │  │
│  │    Certificate issued by the Civil Defense?"          │  │
│  │   Used in: 23 indicators                              │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ ● Q-C-003 | Emergency Evacuation Plans       v1.5     │  │
│  │   "Does your school have emergency evacuation plans   │  │
│  │    for all buildings? Upload floor plans."            │  │
│  │   Used in: 18 indicators                              │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  [Cancel]  [Use Selected Question]                          │
└─────────────────────────────────────────────────────────────┘
```

**After selection:**
- Question text, field type, and helper text auto-populate in indicator form
- User can still customize/edit before saving
- Link to original question preserved (for tracking usage)

### 3.6 Question Version History

**Triggered by:** "🕒 History" button in Questions Bank

**Modal:**
```
┌─────────────────────────────────────────────────────────────┐
│  Question History: Q-C-001                            [✕]   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Version Timeline:                                          │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ v2.1 (Current) - Sep 15, 2025                         │  │
│  │ Changed by: Dr. Lina                                  │  │
│  │                                                        │  │
│  │ Changes:                                              │  │
│  │ • Added requirement for expiry date field             │  │
│  │ • Updated helper text with clarity on issuing agency  │  │
│  │                                                        │  │
│  │ Rationale: "Compliance team feedback - need to track  │  │
│  │ certificate expiry to automate renewal reminders."    │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ v2.0 - Mar 10, 2025                                   │  │
│  │ Changed by: Dr. Khalid                                │  │
│  │                                                        │  │
│  │ Changes:                                              │  │
│  │ • Changed field type from Yes/No to File Upload       │  │
│  │ • Made question mandatory                             │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ v1.0 - Jan 5, 2024                                    │  │
│  │ Created by: Committee Team                            │  │
│  │                                                        │  │
│  │ Initial question created.                             │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  [Close]                                                     │
└─────────────────────────────────────────────────────────────┘
```

**Components Needed:**
- `QuestionsBank.jsx` (main page)
- `QuestionCard.jsx`
- `AddQuestionModal.jsx`
- `QuestionPickerModal.jsx`
- `QuestionHistoryModal.jsx`

---

## 4. Committee: Enable/Disable Indicators

### 4.1 Overview
Allow Committee to deactivate indicators without deleting them, preserving historical data while removing from future evaluations.

### 4.2 User Story

**US-COM-05:** Toggle Indicator Status
```
As a Committee Member, I want to disable an outdated indicator without 
deleting it, so future evaluations don't use it but historical data remains intact.
```

### 4.3 UI Enhancement

**Location:** `/committee/indicators` - Indicator Matrix Table

**Add Status Toggle Column:**

```
| Indicator Code | Domain | Name | Weight | Type | Status | Actions |
|---------------|--------|------|--------|------|--------|---------|
| C101 | Compliance | Fire Safety Cert | 5 | M | [🟢 Active ▼] | Edit |
| C102 | Compliance | Financial Audit | 5 | M | [🟢 Active ▼] | Edit |
| EX201 | Excellence | Teacher Training | 4 | A | [🟢 Active ▼] | Edit |
| EX205 | Excellence | Old Metric | 3 | A | [🔴 Disabled ▼] | Edit |
```

**Status Toggle Dropdown:**
```
┌─────────────────┐
│ 🟢 Active       │ ← Current selection
│ 🔴 Disable      │
└─────────────────┘
```

**When "Disable" is selected:**
```
┌─────────────────────────────────────────────────────────────┐
│  ⚠️ Confirm Disable Indicator                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Are you sure you want to disable this indicator?           │
│                                                              │
│  Indicator: [EX201] Teacher Training Completion Rate        │
│                                                              │
│  Impact:                                                     │
│  • Will be removed from all NEW evaluation requests          │
│  • Currently used in: 1,247 evaluations (historical)        │
│  • Historical data will remain intact and accessible         │
│  • Can be re-enabled anytime                                │
│                                                              │
│  Reason for disabling (optional):                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Replaced by new indicator EX206 with updated formula  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  [Cancel]  [Confirm Disable]                                │
└─────────────────────────────────────────────────────────────┘
```

**Disabled Indicator Display:**
```
Row appears grayed out with strikethrough on name:
| EX205 | Excellence | Old Metric | 3 | A | [🔴 Disabled ▼] | Edit |
                      ~~~~~~~~~~
```

**Re-enabling:**
- Click status dropdown → Select "Active"
- Confirmation: "Are you sure you want to re-enable this indicator? It will be included in all new evaluations starting [Date]."

**Filter for Disabled Indicators:**
Add filter dropdown at top of table:
```
Show: [All Indicators ▼] [Active Only ▼] [Disabled Only ▼]
```

**Components to Update:**
- `IndicatorMatrixTable.jsx` - Add status column and toggle
- `IndicatorStatusToggle.jsx` (new component)
- `DisableIndicatorModal.jsx` (new component)

---

## 5. Committee: Indicator Review Page

### 5.1 Overview
Detailed page showing indicator metadata, usage statistics, school performance distribution, and analytics to support Committee decision-making on weight adjustments or retirement.

### 5.2 User Story

**US-COM-06:** Deep-Dive Indicator Analytics
```
As a Committee Member, I want to see detailed analytics for each indicator 
including usage stats and school performance distribution, so I can make 
data-driven decisions about weight changes or indicator retirement.
```

### 5.3 Indicator Review Page UI

**Route:** `/committee/indicator/:indicatorCode/review`

**Triggered by:** "👁️ Review" button in Indicator Matrix Actions column

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│  ← Back to Indicators                                            │
├─────────────────────────────────────────────────────────────────┤
│  Indicator Review: [EX201] Teacher Training Completion Rate     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Metadata:                                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Indicator Code: EX201                                     │  │
│  │ Domain: Institutional Excellence                          │  │
│  │ Sub-Category: Teaching Quality                            │  │
│  │ Weight: 4 (High Priority)                                 │  │
│  │ Type: Automatic (A)                                       │  │
│  │ Score Type: Numeric (0-100%)                              │  │
│  │ Status: 🟢 Active                                         │  │
│  │                                                            │  │
│  │ Formula:                                                   │  │
│  │   teachers_completed_annual_pd / total_teachers * 100     │  │
│  │                                                            │  │
│  │ Data Source: Noor API + Ministry PD Database              │  │
│  │                                                            │  │
│  │ Calculation Inputs:                                        │  │
│  │   • teachers_completed_annual_pd (from PD DB)             │  │
│  │   • total_teachers (from Noor)                            │  │
│  │                                                            │  │
│  │ Created: Jan 5, 2024 by Committee Team                    │  │
│  │ Last Modified: Sep 15, 2025 by Dr. Lina                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Usage Statistics:                                               │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Total Evaluations Using This Indicator: 1,247             │  │
│  │ Evaluation Cycles: Q1 2024 - Q4 2024                      │  │
│  │ Average Score Across All Schools: 78.3%                   │  │
│  │ Median Score: 82%                                         │  │
│  │ Standard Deviation: 15.2                                  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Performance Distribution:                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                                                            │  │
│  │  # of Schools                                             │  │
│  │  300 ┤                                                    │  │
│  │  250 ┤                                                    │  │
│  │  200 ┤            ████                                    │  │
│  │  150 ┤       ████ ████ ████                               │  │
│  │  100 ┤  ████ ████ ████ ████                               │  │
│  │   50 ┤  ████ ████ ████ ████ ████                          │  │
│  │    0 └──┴────┴────┴────┴────┴────┴─                      │  │
│  │       0-20 20-40 40-60 60-80 80-100 Score Range (%)      │  │
│  │                                                            │  │
│  │  Distribution Breakdown:                                  │  │
│  │    0-20%:   45 schools (3.6%)                             │  │
│  │   20-40%:   89 schools (7.1%)                             │  │
│  │   40-60%:  156 schools (12.5%)                            │  │
│  │   60-80%:  387 schools (31.0%)                            │  │
│  │   80-100%: 570 schools (45.7%)                            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Grade Distribution:                                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  A+:  123 schools (9.9%)   🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢          │  │
│  │  A:   187 schools (15.0%)  🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢  │  │
│  │  B+:  245 schools (19.6%)  🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡│
│  │  B:   298 schools (23.9%)  🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡│
│  │  C+:  189 schools (15.2%)  🟠🟠🟠🟠🟠🟠🟠🟠🟠🟠🟠🟠🟠🟠   │  │
│  │  C:   134 schools (10.7%)  🟠🟠🟠🟠🟠🟠🟠🟠🟠            │  │
│  │  D:    56 schools (4.5%)   🔴🔴🔴🔴                      │  │
│  │  F:    15 schools (1.2%)   🔴                             │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Recent Changes Log:                                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Sep 15, 2025 | Weight changed 3 → 4 | Dr. Lina           │  │
│  │   Rationale: "Increased priority aligned with 2025 MoE   │  │
│  │   strategic focus on teacher professional development."   │  │
│  │                                                            │  │
│  │ Mar 10, 2025 | Formula updated | Dr. Khalid               │  │
│  │   Change: Added minimum 20-hour requirement threshold     │  │
│  │                                                            │  │
│  │ Jan 5, 2024 | Indicator created | Committee Team          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Actions:                                                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ [✏️ Edit Indicator] [⚖️ Adjust Weight] [🔴 Disable]       │  │
│  │ [📊 Export Analytics Report (PDF)]                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Components Needed:**
- `IndicatorReviewPage.jsx`
- `IndicatorMetadataCard.jsx`
- `UsageStatistics.jsx`
- `PerformanceDistributionChart.jsx`
- `GradeDistributionChart.jsx`
- `ChangeHistoryLog.jsx`

**Chart Libraries:**
- Use Recharts or Chart.js for bar charts and distribution graphs
- Mock data: Generate realistic distribution curves

---

## 6. School Admin: Dashboard KPI Cards

### 6.1 Overview
Add prominent KPI summary cards at the top of School Admin dashboard for quick status overview.

### 6.2 User Story

**US-SCH-01:** At-a-Glance Dashboard
```
As a School Admin, when I log in, I want to see key metrics at the top of 
my dashboard, so I immediately understand my school's status without scrolling.
```

### 6.3 Dashboard KPI Cards UI

**Route:** `/school/dashboard`

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│  School Admin Dashboard                   Al-Noor International │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Key Metrics:                                                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        │  │
│  │  │ Overall     │ │ Pending     │ │ Deadline    │        │  │
│  │  │ Score       │ │ Items       │ │             │        │  │
│  │  │             │ │             │ │             │        │  │
│  │  │     A       │ │      3      │ │  13 Days    │        │  │
│  │  │   90.8%     │ │   🔴 Items  │ │  Remaining  │        │  │
│  │  │             │ │             │ │     🟢      │        │  │
│  │  │ ↑ 2.3%      │ │ [View →]    │ │ Nov 10,2025 │        │  │
│  │  │ vs last     │ │             │ │             │        │  │
│  │  └─────────────┘ └─────────────┘ └─────────────┘        │  │
│  │                                                            │  │
│  │  ┌─────────────┐ ┌─────────────┐                         │  │
│  │  │ Completion  │ │ Status      │                         │  │
│  │  │             │ │             │                         │  │
│  │  │   [████░░]  │ │ Returned    │                         │  │
│  │  │    78%      │ │ for         │                         │  │
│  │  │  Complete   │ │ Correction  │                         │  │
│  │  │             │ │    v2/4     │                         │  │
│  │  │             │ │     🟠      │                         │  │
│  │  └─────────────┘ └─────────────┘                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Current Evaluation:                                             │
│  [Rest of dashboard content...]                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.4 Individual KPI Cards Breakdown

**Card 1: Overall Score**
```
┌─────────────────────┐
│ Overall Score       │
│                     │
│       🏅 A          │
│      90.8%          │
│                     │
│  ↑ +2.3%            │ ← Green arrow if improved
│  vs Oct 2024        │
│                     │
│ [View Scorecard]    │
└─────────────────────┘
```

**Card 2: Pending Items**
```
┌─────────────────────┐
│ Pending Items       │
│                     │
│        3            │ ← Large number
│     🔴 Items        │ ← Red if >0, Green if 0
│                     │
│  • Compliance: 2    │
│  • Evidence: 1      │
│                     │
│ [View Details →]    │
└─────────────────────┘
```

**Card 3: Deadline Countdown**
```
┌─────────────────────┐
│ Submission          │
│ Deadline            │
│                     │
│    13 Days          │ ← Large countdown
│   Remaining         │
│       🟢            │ ← Color: Green >7d, Amber 3-7d, Red <3d
│                     │
│ Nov 10, 2025        │
│ 11:59 PM            │
└─────────────────────┘
```

**Card 4: Completion Progress**
```
┌─────────────────────┐
│ Completion          │
│ Progress            │
│                     │
│  [████████████░░░]  │ ← Progress bar
│        78%          │
│     Complete        │
│                     │
│ 4 of 18 questions   │
│ remaining           │
└─────────────────────┘
```

**Card 5: Current Status**
```
┌─────────────────────┐
│ Evaluation          │
│ Status              │
│                     │
│   Returned for      │
│   Correction        │
│      v2/4           │
│       🟠            │ ← Status color
│                     │
│ Action needed by    │
│ you                 │
└─────────────────────┘
```

**Status Color Logic:**
- 🟢 Green: "In Progress", "Submitted" (positive states)
- 🟠 Amber: "Returned for Correction" (action needed)
- 🔴 Red: "Overdue" (critical)
- 🔵 Blue: "Under Review" (waiting on others)
- ✅ Green: "Approved" (complete)

**Components Needed:**
- `SchoolDashboard.jsx` (update)
- `KPICard.jsx` (reusable component with props: title, value, subtitle, color, trend)
- `OverallScoreCard.jsx`
- `PendingItemsCard.jsx`
- `DeadlineCountdownCard.jsx`
- `CompletionProgressCard.jsx`
- `StatusCard.jsx`

---

## 7. School Admin: Comparative Rankings

### 7.1 Overview
Show school's ranking compared to similar schools (region, city, type) and own historical performance to provide competitive context and motivation.

### 7.2 User Stories

**US-SCH-02:** Competitive Positioning
```
As a School Admin, I want to see how my school ranks compared to others in 
my region and city, so I can understand our competitive position.
```

**US-SCH-03:** Historical Improvement Tracking
```
As a School Admin, I want to see how our current score compares to previous 
evaluations, so I can track our improvement trajectory.
```

### 7.3 Rankings Section UI

**Location:** `/school/dashboard` - Below KPI cards, above Current Evaluation

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│  Your School's Position                                          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                                                            │  │
│  │  ┌──────────────────┐  ┌──────────────────┐              │  │
│  │  │ Region Rank      │  │ City Rank        │              │  │
│  │  │                  │  │                  │              │  │
│  │  │      15          │  │       8          │              │  │
│  │  │   of 342         │  │    of 89         │              │  │
│  │  │                  │  │                  │              │  │
│  │  │  Riyadh Region   │  │  Riyadh City     │              │  │
│  │  │                  │  │                  │              │  │
│  │  │  🏆 Top 5%       │  │  🏆 Top 10%      │              │  │
│  │  └──────────────────┘  └──────────────────┘              │  │
│  │                                                            │  │
│  │  ┌──────────────────┐  ┌──────────────────┐              │  │
│  │  │ School Type      │  │ Year-over-Year   │              │  │
│  │  │ Rank             │  │                  │              │  │
│  │  │      12          │  │    ↑ +5.2%       │              │  │
│  │  │   of 156         │  │                  │              │  │
│  │  │                  │  │ vs Oct 2024      │              │  │
│  │  │ Private Intl     │  │ (85.6% → 90.8%)  │              │  │
│  │  │ Schools          │  │                  │              │  │
│  │  │  🏆 Top 10%      │  │  📈 Improving    │              │  │
│  │  └──────────────────┘  └──────────────────┘              │  │
│  │                                                            │  │
│  │  [View Detailed Rankings →]                               │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 7.4 Detailed Rankings Page

**Route:** `/school/rankings`

**Triggered by:** "View Detailed Rankings →" button

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│  ← Back to Dashboard                                             │
├─────────────────────────────────────────────────────────────────┤
│  Detailed Rankings & Comparisons                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Filter Rankings:                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Compare by: ● Region  ○ City  ○ School Type  ○ All       │  │
│  │ Show: ● Overall Score  ○ Excellence  ○ Satisfaction      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Riyadh Region Rankings (342 schools):                           │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Rank | School Name                  | Score  | Grade     │  │
│  │──────┼──────────────────────────────┼────────┼───────────│  │
│  │  1   │ Excellence Academy           │ 96.2%  │ A+        │  │
│  │  2   │ Future Leaders School        │ 94.8%  │ A+        │  │
│  │  3   │ School C (Anonymized)        │ 93.1%  │ A         │  │
│  │ ...  │ ...                           │ ...    │ ...       │  │
│  │ 14   │ School N (Anonymized)        │ 91.2%  │ A         │  │
│  │ 15   │ 🏫 YOUR SCHOOL               │ 90.8%  │ A   ⭐    │  │
│  │ 16   │ School P (Anonymized)        │ 90.5%  │ A         │  │
│  │ 17   │ School Q (Anonymized)        │ 90.1%  │ A         │  │
│  │ ...  │ ...                           │ ...    │ ...       │  │
│  │ 342  │ School ZZZ (Anonymized)      │ 45.3%  │ F         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Your Percentile: 95.6th (Top 5%)                                │
│  Above Average: +12.5% (Regional avg: 78.3%)                    │
│                                                                  │
│  ─────────────────────────────────────────────────────────────  │
│                                                                  │
│  Historical Performance:                                         │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                                                            │  │
│  │  Score (%)                                                │  │
│  │  100 ┤                                                    │  │
│  │   90 ┤                                     ●──────●       │  │
│  │   80 ┤                        ●──────●                    │  │
│  │   70 ┤           ●──────●                                 │  │
│  │   60 ┤  ●──────●                                          │  │
│  │   50 └──┴──────┴──────┴──────┴──────┴──────┴──────       │  │
│  │      2020   2021   2022   2023   2024   2025            │  │
│  │                                                            │  │
│  │  Trend: 📈 Consistently Improving (+6.2% avg/year)       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  [Download Rankings Report (PDF)] [Share with Leadership]       │
└─────────────────────────────────────────────────────────────────┘
```

### 7.5 Public Portal Rankings (Limited View)

**Location:** `/public/schools/:id` (School Scorecard Detail)

**Public Display (No exact ranks):**
```
┌─────────────────────────────────────────────────────────────┐
│  Al-Noor International School                                │
│                                                              │
│  Overall Grade: A (90.8%)                                   │
│                                                              │
│  Performance Indicators:                                    │
│  • Top 10% in Riyadh Region                                 │
│  • Above Regional Average by 12.5%                          │
│  • Consistent Improvement (↑ 5.2% year-over-year)          │
│                                                              │
│  [View Full Scorecard]                                      │
└─────────────────────────────────────────────────────────────┘
```

**Privacy Note:**
- Public portal shows percentile bands (Top 10%, Top 25%, Above Average) - NOT exact ranks
- School dashboard shows exact ranks privately

**Components Needed:**
- `RankingsSection.jsx` (dashboard widget)
- `RankCard.jsx` (individual rank display)
- `DetailedRankingsPage.jsx`
- `RankingsTable.jsx`
- `HistoricalTrendChart.jsx`

---

## 8. School Admin: Historical Logs

### 8.1 Overview
Comprehensive table showing all previous and current evaluation cycles with indicator-level scores over time, enabling trend analysis and comparison.

### 8.2 User Stories

**US-SCH-04:** Evaluation History Access
```
As a School Admin, I want to view all my past evaluation cycles in one table,
so I can review historical performance and identify patterns.
```

**US-SCH-05:** Indicator-Level Trend Analysis
```
As a School Admin, I want to compare specific indicator scores between evaluation 
cycles, so I can see which areas improved or declined.
```

### 8.3 Historical Logs UI

**Route:** `/school/evaluation-history`

**Triggered by:** New tab in School Dashboard navigation: "Evaluation History"

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│  Evaluation History                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Filters:                                                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Year: [All Years ▼]  Domain: [All Domains ▼]             │  │
│  │ Show: ● All Cycles  ○ Approved Only  ○ Failed Only       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Evaluation Cycles (6 total):                                    │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ [+] Q4 2025 | Approved | A (90.8%) | Nov 2025  [Current] │  │
│  └──────────────────────────────────────────────────────────┘  │
│      Compliance: ✅ Compliant                                   │
│      Excellence: B+ (85%) | Satisfaction: A (91%)               │
│      Version: 2/4 (1 correction cycle)                          │
│      [View Details] [Compare with Previous]                     │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ [+] Q3 2025 | Approved | B+ (85.6%) | Aug 2025            │  │
│  └──────────────────────────────────────────────────────────┘  │
│      Compliance: ✅ Compliant                                   │
│      Excellence: B (82%) | Satisfaction: B+ (88%)               │
│      Version: 1/4 (no corrections)                              │
│      [View Details] [Compare with Q4 2025]                      │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ [+] Q2 2025 | Approved | B (80.2%) | May 2025              │  │
│  └──────────────────────────────────────────────────────────┘  │
│      Compliance: ✅ Compliant                                   │
│      Excellence: C+ (78%) | Satisfaction: B (82%)               │
│      [View Details] [Compare]                                   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ [+] Q1 2025 | Not Approved | C (70.5%) | Feb 2025          │  │
│  └──────────────────────────────────────────────────────────┘  │
│      Compliance: ❌ Not Compliant (Fire Safety issue)          │
│      Excellence: B (80%) | Satisfaction: C+ (75%)               │
│      Status: Failed due to non-compliance                       │
│      [View Details]                                             │
│                                                                  │
│  [Load Earlier Cycles...] or [Pagination: < 1 2 >]             │
│                                                                  │
│  [Export All History (Excel)] [Download PDF Report]             │
└─────────────────────────────────────────────────────────────────┘
```

### 8.4 Expanded Cycle View (Click [+] to expand)

```
┌──────────────────────────────────────────────────────────────┐
│ [−] Q4 2025 | Approved | A (90.8%) | Nov 2025  [Current]     │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│ Domain Breakdown:                                            │
│                                                               │
│ 📋 Compliance (50% weight): ✅ Compliant                     │
│   • [C101] Fire Safety Certificate: ✅ Compliant             │
│   • [C102] Financial Audit: ✅ Compliant                     │
│   • [C103] Teacher Licensing: ✅ Compliant                   │
│   • [C105] Emergency Plans: ✅ Compliant                     │
│   • [C108] Health Insurance: ✅ Compliant                    │
│                                                               │
│ 📊 Institutional Excellence (30% weight): B+ (85%)           │
│   • [EX201] Teacher Training: 82% (B+)  [Trend: ↑ +4%]      │
│   • [EX202] Student Achievement: 88% (A)  [Trend: ↑ +6%]    │
│   • [EX203] Infrastructure: 85% (B+)  [Trend: → Stable]     │
│   • [EX204] Technology Resources: 80% (B)  [Trend: ↑ +2%]   │
│                                                               │
│ 😊 Beneficiary Satisfaction (20% weight): A (91%)            │
│   • [BS301] Parent Satisfaction: 88% (A)  [Trend: ↑ +3%]    │
│   • [BS302] Safety Index: 95% (A+)  [Trend: ↑ +5%]          │
│   • [BS303] Teacher Engagement: 89% (A)  [Trend: ↑ +1%]     │
│                                                               │
│ Trend Icons:                                                 │
│   ↑ Improved from last cycle                                 │
│   ↓ Declined from last cycle                                 │
│   → Stable (within ±2%)                                      │
│                                                               │
│ [Download This Cycle's Report]                               │
└──────────────────────────────────────────────────────────────┘
```

### 8.5 Comparison View

**Route:** `/school/evaluation-history/compare`

**Triggered by:** "Compare with Previous" button

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│  Compare Evaluations                                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Select Cycles to Compare:                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Cycle 1: [Q4 2025 (Current) ▼]                           │  │
│  │ Cycle 2: [Q3 2025           ▼]                           │  │
│  │ [Compare]                                                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Side-by-Side Comparison:                                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  │ Q4 2025        │ Q3 2025       │ Δ    │  │
│  │ ─────────────────┼────────────────┼───────────────┼───────│  │
│  │ Overall Score    │ 90.8% (A)      │ 85.6% (B+)    │ +5.2%│  │
│  │ ─────────────────┼────────────────┼───────────────┼───────│  │
│  │ Compliance       │ ✅ Compliant   │ ✅ Compliant  │  ✓   │  │
│  │ Excellence       │ 85% (B+)       │ 82% (B)       │ +3%  │  │
│  │ Satisfaction     │ 91% (A)        │ 88% (B+)      │ +3%  │  │
│  │ ─────────────────┼────────────────┼───────────────┼───────│  │
│  │ [EX201] Teacher  │ 82%            │ 78%           │ +4%  │  │
│  │     Training     │                │               │  ↑   │  │
│  │ [EX202] Student  │ 88%            │ 82%           │ +6%  │  │
│  │     Achievement  │                │               │  ↑   │  │
│  │ [BS301] Parent   │ 88%            │ 85%           │ +3%  │  │
│  │     Satisfaction │                │               │  ↑   │  │
│  │ [BS302] Safety   │ 95%            │ 90%           │ +5%  │  │
│  │     Index        │                │               │  ↑   │  │
│  │ ...              │ ...            │ ...           │ ...  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Key Insights:                                                   │
│  • 🎉 Most Improved: Safety Index (+5%)                         │
│  • 📈 All Excellence indicators improved                        │
│  • ✅ Compliance maintained across both cycles                  │
│  • 💡 Focus area: Continue teacher training momentum           │
│                                                                  │
│  [Download Comparison Report (PDF)]                              │
└─────────────────────────────────────────────────────────────────┘
```

### 8.6 Indicator Trend Chart

**Enhancement to Comparison View:**

Add visual trend line for each indicator over multiple cycles:
```
┌──────────────────────────────────────────────────────────────┐
│  [EX201] Teacher Training Completion Rate - Trend            │
│                                                               │
│  Score (%)                                                   │
│  100 ┤                                                       │
│   90 ┤                                                       │
│   80 ┤                        ●──────●──────●──────●        │
│   70 ┤           ●──────●                                    │
│   60 ┤  ●──────●                                             │
│   50 └──┴──────┴──────┴──────┴──────┴──────┴──────          │
│      Q1    Q2    Q3    Q4    Q1    Q2    Q3    Q4          │
│     2024  2024  2024  2024  2025  2025  2025  2025         │
│                                                               │
│  • Linear growth: +2.5% per quarter average                 │
│  • Current: 82% (Target: 85%)                                │
│  • Projected Q1 2026: 84% (on track to meet target)         │
└──────────────────────────────────────────────────────────────┘
```

**Components Needed:**
- `EvaluationHistory.jsx`
- `HistoricalCycleCard.jsx` (expandable)
- `ComparisonView.jsx`
- `ComparisonTable.jsx`
- `IndicatorTrendChart.jsx`
- `InsightsCard.jsx`

---

## 9. Mock Data Structures

### 9.1 Inspector Assignment Mock Data

**File:** `/src/mockData/inspectorAssignments.js`

```javascript
export const inspectorAssignments = [
  {
    assignment_id: "INSP-001",
    inspector_id: "INS-2025-001",
    inspector_name: "Omar Al-Rashid",
    school_id: "SCH-RY-1001",
    school_name: "Al-Noor International School",
    request_id: "REQ-2024-00123",
    status: "Pending", // "Pending", "In Progress", "Completed", "Unable to Verify"
    scheduled_visit: "2025-11-08T10:00:00Z",
    assigned_indicators: [
      {
        indicator_code: "C101",
        indicator_name: "Valid Fire Safety Equipment",
        domain: "Compliance",
        status: "Pending", // "Pending", "Verified", "Discrepancy Found", "Unable to Verify"
        findings: null
      },
      {
        indicator_code: "C103",
        indicator_name: "Emergency Evacuation Routes",
        domain: "Compliance",
        status: "Pending",
        findings: null
      },
      {
        indicator_code: "EX203",
        indicator_name: "Infrastructure Quality",
        domain: "Institutional Excellence",
        status: "Pending",
        findings: null
      }
    ],
    created_at: "2025-11-01T09:00:00Z"
  },
  {
    assignment_id: "INSP-002",
    inspector_id: "INS-2025-001",
    inspector_name: "Omar Al-Rashid",
    school_id: "SCH-RY-1002",
    school_name: "Green Valley School",
    request_id: "REQ-2024-00156",
    status: "In Progress",
    scheduled_visit: "2025-11-06T09:00:00Z",
    assigned_indicators: [
      {
        indicator_code: "C101",
        indicator_name: "Valid Fire Safety Equipment",
        domain: "Compliance",
        status: "Discrepancy Found",
        findings: {
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
        status: "Pending",
        findings: null
      }
    ],
    progress: 1 / 2, // 1 completed, 1 pending
    created_at: "2025-11-05T08:00:00Z"
  },
  {
    assignment_id: "INSP-003",
    inspector_id: "INS-2025-001",
    inspector_name: "Omar Al-Rashid",
    school_id: "SCH-RY-1003",
    school_name: "Future Leaders Academy",
    request_id: "REQ-2024-00089",
    status: "Completed",
    scheduled_visit: "2025-11-05T10:00:00Z",
    assigned_indicators: [
      {
        indicator_code: "C101",
        indicator_name: "Valid Fire Safety Equipment",
        domain: "Compliance",
        status: "Verified",
        findings: {
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
        status: "Discrepancy Found",
        findings: {
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
    progress: 1, // All completed
    completed_at: "2025-11-05T12:30:00Z",
    created_at: "2025-11-04T09:00:00Z"
  }
];
```

### 9.2 Questions Bank Mock Data

**File:** `/src/mockData/questionsBank.js`

```javascript
export const questionsBank = [
  {
    question_id: "Q-C-001",
    question_code: "Q-C-001",
    domain: "Compliance",
    category: "Health & Safety",
    question_text_en: "Does your school have a valid Fire Safety Certificate issued by the Civil Defense? If yes, please upload the certificate and provide the expiry date.",
    question_text_ar: "هل لدى مدرستك شهادة سلامة حريق صالحة صادرة عن الدفاع المدني؟",
    field_type: ["File Upload", "Date Picker"],
    tags: ["fire-safety", "certificates", "compliance", "civil-defense"],
    status: "Active",
    used_in_indicators: ["C101", "C102-A", "C102-B"], // 23 total
    usage_count: 23,
    is_required: true,
    helper_text: "Upload the official certificate as a PDF. Ensure the expiry date is clearly visible.",
    created_by: "Committee Team",
    created_at: "2024-01-05T08:00:00Z",
    last_updated: "2025-09-15T10:00:00Z",
    last_updated_by: "Dr. Lina",
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
        rationale: "Need actual certificate verification, not just self-reporting."
      },
      {
        version: "1.0",
        date: "2024-01-05T08:00:00Z",
        changed_by: "Committee Team",
        changes: ["Initial question created"],
        rationale: null
      }
    ]
  },
  {
    question_id: "Q-C-002",
    question_code: "Q-C-002",
    domain: "Compliance",
    category: "Financial",
    question_text_en: "Has your school completed an external financial audit for the current fiscal year? Upload the audit report with auditor certification.",
    question_text_ar: "هل أكملت مدرستك تدقيقًا ماليًا خارجيًا للسنة المالية الحالية؟",
    field_type: ["Yes/No Radio", "File Upload"],
    tags: ["financial", "audit", "certification", "external-auditor"],
    status: "Active",
    used_in_indicators: ["C102"],
    usage_count: 15,
    is_required: true,
    helper_text: "Upload the complete audit report signed by a certified external auditor.",
    created_by: "Dr. Khalid",
    created_at: "2024-02-10T09:00:00Z",
    last_updated: "2024-02-10T09:00:00Z",
    last_updated_by: "Dr. Khalid",
    version: "1.0",
    version_history: [
      {
        version: "1.0",
        date: "2024-02-10T09:00:00Z",
        changed_by: "Dr. Khalid",
        changes: ["Initial question created"],
        rationale: null
      }
    ]
  },
  {
    question_id: "Q-EX-015",
    question_code: "Q-EX-015",
    domain: "Institutional Excellence",
    category: "Teaching Quality",
    question_text_en: "What percentage of your teachers completed professional development training (minimum 20 hours) in the last academic year?",
    question_text_ar: "ما هي نسبة المعلمين الذين أكملوا التدريب المهني (20 ساعة كحد أدنى) في العام الدراسي الماضي؟",
    field_type: ["Percentage Input"],
    tags: ["teacher-training", "professional-development", "PD", "teaching-quality"],
    status: "Active",
    used_in_indicators: ["EX201"],
    usage_count: 8,
    is_required: false,
    helper_text: "Enter the percentage as a number between 0 and 100. This data will be cross-verified with Ministry PD records.",
    created_by: "Dr. Lina",
    created_at: "2024-03-15T10:00:00Z",
    last_updated: "2025-06-20T11:00:00Z",
    last_updated_by: "Dr. Lina",
    version: "3.2",
    version_history: [
      {
        version: "3.2",
        date: "2025-06-20T11:00:00Z",
        changed_by: "Dr. Lina",
        changes: ["Specified minimum 20 hours requirement"],
        rationale: "Align with new MoE teacher PD standards for 2025."
      },
      {
        version: "3.1",
        date: "2025-01-10T10:00:00Z",
        changed_by: "Committee Team",
        changes: ["Added note about cross-verification"],
        rationale: "Transparency with schools about data validation."
      },
      {
        version: "3.0",
        date: "2024-09-05T09:00:00Z",
        changed_by: "Dr. Khalid",
        changes: ["Changed from text input to percentage input for validation"],
        rationale: "Reduce data entry errors."
      }
    ]
  }
  // Add 15-20 more questions...
];
```

### 9.3 Indicator Status & Review Mock Data

**File:** `/src/mockData/indicatorsWithStatus.js`

```javascript
export const indicatorsWithStatus = [
  {
    indicator_code: "C101",
    domain: "Compliance",
    sub_category: "Health & Safety",
    indicator_name: "Valid Fire Safety Certificate",
    weight: 5,
    type: "M",
    score_type: "B",
    status: "Active", // "Active", "Disabled", "Pending Approval"
    usage_statistics: {
      total_evaluations: 1247,
      evaluation_cycles: "Q1 2024 - Q4 2024",
      average_score_percentage: null, // N/A for binary
      compliance_rate: 94.2, // % of schools compliant
      median_score: null,
      standard_deviation: null
    },
    performance_distribution: {
      compliant: 1175,
      non_compliant: 72
    },
    created_at: "2024-01-05T08:00:00Z",
    last_modified: "2025-09-15T10:00:00Z",
    last_modified_by: "Dr. Lina"
  },
  {
    indicator_code: "EX201",
    domain: "Institutional Excellence",
    sub_category: "Teaching Quality",
    indicator_name: "Teacher Training Completion Rate",
    weight: 4,
    type: "A",
    score_type: "N",
    status: "Active",
    usage_statistics: {
      total_evaluations: 1247,
      evaluation_cycles: "Q1 2024 - Q4 2024",
      average_score_percentage: 78.3,
      compliance_rate: null,
      median_score: 82,
      standard_deviation: 15.2
    },
    performance_distribution: {
      "0-20": 45,
      "20-40": 89,
      "40-60": 156,
      "60-80": 387,
      "80-100": 570
    },
    grade_distribution: {
      "A+": 123,
      "A": 187,
      "B+": 245,
      "B": 298,
      "C+": 189,
      "C": 134,
      "D": 56,
      "F": 15
    },
    change_history: [
      {
        date: "2025-09-15T10:00:00Z",
        changed_by: "Dr. Lina",
        change_type: "Weight Adjustment",
        old_value: 3,
        new_value: 4,
        rationale: "Increased priority aligned with 2025 MoE strategic focus on teacher professional development."
      },
      {
        date: "2025-03-10T10:00:00Z",
        changed_by: "Dr. Khalid",
        change_type: "Formula Update",
        change_description: "Added minimum 20-hour requirement threshold",
        rationale: "Align with updated MoE PD standards."
      },
      {
        date: "2024-01-05T08:00:00Z",
        changed_by: "Committee Team",
        change_type: "Indicator Created",
        change_description: "Initial indicator created",
        rationale: null
      }
    ],
    created_at: "2024-01-05T08:00:00Z",
    last_modified: "2025-09-15T10:00:00Z",
    last_modified_by: "Dr. Lina"
  },
  {
    indicator_code: "EX205",
    domain: "Institutional Excellence",
    sub_category: "Old Metric",
    indicator_name: "Outdated Infrastructure Index",
    weight: 3,
    type: "A",
    score_type: "N",
    status: "Disabled", // This indicator has been disabled
    disabled_at: "2025-08-01T10:00:00Z",
    disabled_by: "Dr. Lina",
    disable_reason: "Replaced by new indicator EX206 with updated formula and better data sources.",
    usage_statistics: {
      total_evaluations: 876, // Historical count before disabling
      evaluation_cycles: "Q1 2024 - Q2 2024",
      average_score_percentage: 72.1,
      compliance_rate: null,
      median_score: 75,
      standard_deviation: 18.5
    },
    performance_distribution: {
      "0-20": 67,
      "20-40": 112,
      "40-60": 198,
      "60-80": 345,
      "80-100": 154
    },
    created_at: "2024-01-05T08:00:00Z",
    last_modified: "2025-08-01T10:00:00Z",
    last_modified_by: "Dr. Lina"
  }
  // Add 20-30 more indicators...
];
```

### 9.4 School Rankings Mock Data

**File:** `/src/mockData/schoolRankings.js`

```javascript
export const schoolRankings = {
  school_id: "SCH-RY-1001",
  school_name: "Al-Noor International School",
  current_evaluation: {
    cycle: "Q4 2025",
    overall_score: 90.8,
    overall_grade: "A",
    compliance: "Compliant",
    excellence_score: 85,
    excellence_grade: "B+",
    satisfaction_score: 91,
    satisfaction_grade: "A"
  },
  rankings: {
    region: {
      rank: 15,
      total_schools: 342,
      region_name: "Riyadh Region",
      percentile: 95.6,
      percentile_band: "Top 5%",
      regional_average: 78.3,
      above_average_by: 12.5
    },
    city: {
      rank: 8,
      total_schools: 89,
      city_name: "Riyadh City",
      percentile: 91.0,
      percentile_band: "Top 10%",
      city_average: 80.1,
      above_average_by: 10.7
    },
    school_type: {
      rank: 12,
      total_schools: 156,
      school_type: "Private International Schools",
      percentile: 92.3,
      percentile_band: "Top 10%",
      type_average: 82.5,
      above_average_by: 8.3
    }
  },
  year_over_year: {
    previous_cycle: "Q3 2025",
    previous_score: 85.6,
    previous_grade: "B+",
    change_percentage: 5.2,
    change_direction: "up", // "up", "down", "stable"
    trend: "Improving"
  },
  historical_performance: [
    { cycle: "Q1 2020", date: "2020-02-01", score: 62.5, grade: "C" },
    { cycle: "Q2 2020", date: "2020-05-01", score: 65.8, grade: "C+" },
    { cycle: "Q3 2020", date: "2020-08-01", score: 68.2, grade: "C+" },
    { cycle: "Q4 2020", date: "2020-11-01", score: 70.5, grade: "C+" },
    { cycle: "Q1 2021", date: "2021-02-01", score: 72.3, grade: "C+" },
    { cycle: "Q2 2021", date: "2021-05-01", score: 74.8, grade: "C+" },
    { cycle: "Q3 2021", date: "2021-08-01", score: 76.1, grade: "C+" },
    { cycle: "Q4 2021", date: "2021-11-01", score: 78.5, grade: "B" },
    { cycle: "Q1 2022", date: "2022-02-01", score: 79.2, grade: "B" },
    { cycle: "Q2 2022", date: "2022-05-01", score: 80.7, grade: "B" },
    { cycle: "Q3 2022", date: "2022-08-01", score: 81.5, grade: "B" },
    { cycle: "Q4 2022", date: "2022-11-01", score: 82.3, grade: "B" },
    { cycle: "Q1 2023", date: "2023-02-01", score: 83.1, grade: "B" },
    { cycle: "Q2 2023", date: "2023-05-01", score: 83.8, grade: "B" },
    { cycle: "Q3 2023", date: "2023-08-01", score: 84.5, grade: "B" },
    { cycle: "Q4 2023", date: "2023-11-01", score: 85.2, grade: "B+" },
    { cycle: "Q1 2024", date: "2024-02-01", score: 70.5, grade: "C", note: "Failed due to non-compliance" },
    { cycle: "Q2 2024", date: "2024-05-01", score: 80.2, grade: "B" },
    { cycle: "Q3 2024", date: "2024-08-01", score: 85.6, grade: "B+" },
    { cycle: "Q4 2024", date: "2024-11-01", score: 90.8, grade: "A" }
  ],
  nearby_schools_ranking: [
    { rank: 13, school_name: "School N (Anonymized)", score: 91.5, grade: "A" },
    { rank: 14, school_name: "School M (Anonymized)", score: 91.2, grade: "A" },
    { rank: 15, school_name: "YOUR SCHOOL", score: 90.8, grade: "A", highlight: true },
    { rank: 16, school_name: "School P (Anonymized)", score: 90.5, grade: "A" },
    { rank: 17, school_name: "School Q (Anonymized)", score: 90.1, grade: "A" }
  ]
};

// Full regional rankings (for detailed rankings page)
export const regionalRankings = [
  { rank: 1, school_name: "Excellence Academy", score: 96.2, grade: "A+" },
  { rank: 2, school_name: "Future Leaders School", score: 94.8, grade: "A+" },
  { rank: 3, school_name: "School C (Anonymized)", score: 93.1, grade: "A" },
  // ... 10 more entries
  { rank: 14, school_name: "School N (Anonymized)", score: 91.2, grade: "A" },
  { rank: 15, school_name: "Al-Noor International School", score: 90.8, grade: "A", highlight: true },
  { rank: 16, school_name: "School P (Anonymized)", score: 90.5, grade: "A" },
  // ... continue to 342
];
```

### 9.5 Historical Logs Mock Data

**File:** `/src/mockData/evaluationHistory.js`

```javascript
export const evaluationHistory = [
  {
    cycle_id: "EVAL-2025-Q4",
    cycle_name: "Q4 2025",
    evaluation_date: "2025-11-01",
    request_id: "REQ-2024-00123",
    version: 2,
    max_correction_cycles: 4,
    status: "Approved",
    is_current: true,
    overall_score: 90.8,
    overall_grade: "A",
    domains: {
      compliance: {
        status: "Compliant",
        indicators: [
          { code: "C101", name: "Fire Safety Certificate", result: "Compliant" },
          { code: "C102", name: "Financial Audit", result: "Compliant" },
          { code: "C103", name: "Teacher Licensing", result: "Compliant" },
          { code: "C105", name: "Emergency Plans", result: "Compliant" },
          { code: "C108", name: "Health Insurance", result: "Compliant" }
        ]
      },
      excellence: {
        score: 85,
        grade: "B+",
        indicators: [
          { code: "EX201", name: "Teacher Training", score: 82, grade: "B+", trend: "up", change: 4 },
          { code: "EX202", name: "Student Achievement", score: 88, grade: "A", trend: "up", change: 6 },
          { code: "EX203", name: "Infrastructure", score: 85, grade: "B+", trend: "stable", change: 0 },
          { code: "EX204", name: "Technology Resources", score: 80, grade: "B", trend: "up", change: 2 }
        ]
      },
      satisfaction: {
        score: 91,
        grade: "A",
        indicators: [
          { code: "BS301", name: "Parent Satisfaction", score: 88, grade: "A", trend: "up", change: 3 },
          { code: "BS302", name: "Safety Index", score: 95, grade: "A+", trend: "up", change: 5 },
          { code: "BS303", name: "Teacher Engagement", score: 89, grade: "A", trend: "up", change: 1 }
        ]
      }
    }
  },
  {
    cycle_id: "EVAL-2025-Q3",
    cycle_name: "Q3 2025",
    evaluation_date: "2025-08-01",
    request_id: "REQ-2024-00089",
    version: 1,
    max_correction_cycles: 4,
    status: "Approved",
    is_current: false,
    overall_score: 85.6,
    overall_grade: "B+",
    domains: {
      compliance: {
        status: "Compliant",
        indicators: [
          { code: "C101", name: "Fire Safety Certificate", result: "Compliant" },
          { code: "C102", name: "Financial Audit", result: "Compliant" },
          { code: "C103", name: "Teacher Licensing", result: "Compliant" },
          { code: "C105", name: "Emergency Plans", result: "Compliant" },
          { code: "C108", name: "Health Insurance", result: "Compliant" }
        ]
      },
      excellence: {
        score: 82,
        grade: "B",
        indicators: [
          { code: "EX201", name: "Teacher Training", score: 78, grade: "C+", trend: null, change: null },
          { code: "EX202", name: "Student Achievement", score: 82, grade: "B", trend: null, change: null },
          { code: "EX203", name: "Infrastructure", score: 85, grade: "B+", trend: null, change: null },
          { code: "EX204", name: "Technology Resources", score: 78, grade: "C+", trend: null, change: null }
        ]
      },
      satisfaction: {
        score: 88,
        grade: "B+",
        indicators: [
          { code: "BS301", name: "Parent Satisfaction", score: 85, grade: "B+", trend: null, change: null },
          { code: "BS302", name: "Safety Index", score: 90, grade: "A", trend: null, change: null },
          { code: "BS303", name: "Teacher Engagement", score: 88, grade: "A", trend: null, change: null }
        ]
      }
    }
  },
  {
    cycle_id: "EVAL-2025-Q2",
    cycle_name: "Q2 2025",
    evaluation_date: "2025-05-01",
    request_id: "REQ-2024-00067",
    version: 1,
    max_correction_cycles: 4,
    status: "Approved",
    is_current: false,
    overall_score: 80.2,
    overall_grade: "B",
    domains: {
      compliance: {
        status: "Compliant",
        indicators: [
          { code: "C101", name: "Fire Safety Certificate", result: "Compliant" },
          { code: "C102", name: "Financial Audit", result: "Compliant" },
          { code: "C103", name: "Teacher Licensing", result: "Compliant" },
          { code: "C105", name: "Emergency Plans", result: "Compliant" },
          { code: "C108", name: "Health Insurance", result: "Compliant" }
        ]
      },
      excellence: {
        score: 78,
        grade: "C+",
        indicators: [
          { code: "EX201", name: "Teacher Training", score: 75, grade: "C+", trend: null, change: null },
          { code: "EX202", name: "Student Achievement", score: 78, grade: "C+", trend: null, change: null },
          { code: "EX203", name: "Infrastructure", score: 80, grade: "B", trend: null, change: null },
          { code: "EX204", name: "Technology Resources", score: 75, grade: "C+", trend: null, change: null }
        ]
      },
      satisfaction: {
        score: 82,
        grade: "B",
        indicators: [
          { code: "BS301", name: "Parent Satisfaction", score: 80, grade: "B", trend: null, change: null },
          { code: "BS302", name: "Safety Index", score: 85, grade: "B+", trend: null, change: null },
          { code: "BS303", name: "Teacher Engagement", score: 82, grade: "B", trend: null, change: null }
        ]
      }
    }
  },
  {
    cycle_id: "EVAL-2025-Q1",
    cycle_name: "Q1 2025",
    evaluation_date: "2025-02-01",
    request_id: "REQ-2024-00045",
    version: 3,
    max_correction_cycles: 4,
    status: "Not Approved",
    is_current: false,
    overall_score: 70.5,
    overall_grade: "C",
    failure_reason: "Non-compliance: Fire Safety Certificate expired",
    domains: {
      compliance: {
        status: "Not Compliant",
        indicators: [
          { code: "C101", name: "Fire Safety Certificate", result: "Not Compliant", note: "Certificate expired" },
          { code: "C102", name: "Financial Audit", result: "Compliant" },
          { code: "C103", name: "Teacher Licensing", result: "Compliant" },
          { code: "C105", name: "Emergency Plans", result: "Compliant" },
          { code: "C108", name: "Health Insurance", result: "Compliant" }
        ]
      },
      excellence: {
        score: 80,
        grade: "B",
        indicators: [
          { code: "EX201", name: "Teacher Training", score: 78, grade: "C+", trend: null, change: null },
          { code: "EX202", name: "Student Achievement", score: 82, grade: "B", trend: null, change: null },
          { code: "EX203", name: "Infrastructure", score: 80, grade: "B", trend: null, change: null },
          { code: "EX204", name: "Technology Resources", score: 75, grade: "C+", trend: null, change: null }
        ]
      },
      satisfaction: {
        score: 75,
        grade: "C+",
        indicators: [
          { code: "BS301", name: "Parent Satisfaction", score: 72, grade: "C", trend: null, change: null },
          { code: "BS302", name: "Safety Index", score: 78, grade: "C+", trend: null, change: null },
          { code: "BS303", name: "Teacher Engagement", score: 75, grade: "C+", trend: null, change: null }
        ]
      }
    }
  }
  // Add 2-3 more historical cycles...
];
```

---

## 10. Component Architecture

### 10.1 New Components Overview

```
src/
├── components/
│   ├── inspector/
│   │   ├── InspectorDashboard.jsx
│   │   ├── AssignmentCard.jsx
│   │   ├── InspectionSummaryCards.jsx
│   │   ├── InspectionDetail.jsx
│   │   ├── IndicatorInspectionCard.jsx
│   │   ├── DiscrepancyForm.jsx
│   │   └── InspectorFindingsBadge.jsx
│   ├── committee/
│   │   ├── InlineDomainCreator.jsx
│   │   ├── QuestionsBank.jsx
│   │   ├── QuestionCard.jsx
│   │   ├── AddQuestionModal.jsx
│   │   ├── QuestionPickerModal.jsx
│   │   ├── QuestionHistoryModal.jsx
│   │   ├── IndicatorStatusToggle.jsx
│   │   ├── DisableIndicatorModal.jsx
│   │   ├── IndicatorReviewPage.jsx
│   │   ├── IndicatorMetadataCard.jsx
│   │   ├── UsageStatistics.jsx
│   │   ├── PerformanceDistributionChart.jsx
│   │   ├── GradeDistributionChart.jsx
│   │   └── ChangeHistoryLog.jsx
│   ├── school/
│   │   ├── KPICard.jsx (reusable)
│   │   ├── OverallScoreCard.jsx
│   │   ├── PendingItemsCard.jsx
│   │   ├── DeadlineCountdownCard.jsx
│   │   ├── CompletionProgressCard.jsx
│   │   ├── StatusCard.jsx
│   │   ├── RankingsSection.jsx
│   │   ├── RankCard.jsx
│   │   ├── DetailedRankingsPage.jsx
│   │   ├── RankingsTable.jsx
│   │   ├── HistoricalTrendChart.jsx
│   │   ├── EvaluationHistory.jsx
│   │   ├── HistoricalCycleCard.jsx
│   │   ├── ComparisonView.jsx
│   │   ├── ComparisonTable.jsx
│   │   ├── IndicatorTrendChart.jsx
│   │   └── InsightsCard.jsx
│   └── shared/
│       ├── EvidenceUploader.jsx
│       └── Badge.jsx (status badges)
├── pages/
│   ├── inspector/
│   │   ├── InspectorDashboardPage.jsx
│   │   └── InspectionDetailPage.jsx
│   ├── committee/
│   │   ├── QuestionsBankPage.jsx
│   │   └── IndicatorReviewPageWrapper.jsx
│   ├── school/
│   │   ├── SchoolDashboardPage.jsx (updated)
│   │   ├── RankingsPage.jsx
│   │   ├── EvaluationHistoryPage.jsx
│   │   └── ComparisonPage.jsx
│   └── ops/
│       └── OpsReviewPage.jsx (updated with inspector findings)
├── context/
│   ├── InspectorContext.jsx
│   ├── QuestionsBankContext.jsx
│   └── RankingsContext.jsx
└── mockData/
    ├── inspectorAssignments.js
    ├── questionsBank.js
    ├── indicatorsWithStatus.js
    ├── schoolRankings.js
    └── evaluationHistory.js
```

### 10.2 Key Component Props

**InspectorDashboard.jsx**
```javascript
// Props: None (fetches from context)
// State: assignments (array), filterStatus (string)
// Displays: Summary cards + list of assigned inspections
```

**InspectionDetail.jsx**
```javascript
// Props: schoolId (string), assignmentId (string)
// State: indicators (array), generalNotes (string), findings (object)
// Functions: handleFindingUpdate, handleSubmitReport
```

**QuestionsBank.jsx**
```javascript
// Props: None
// State: questions (array), filters (object), searchTerm (string)
// Functions: handleSearch, handleFilter, handleAddQuestion, handleEditQuestion
```

**QuestionPickerModal.jsx**
```javascript
// Props: isOpen (boolean), onClose (function), onSelectQuestion (function), domain (string)
// State: filteredQuestions (array), selectedQuestion (object)
```

**IndicatorReviewPage.jsx**
```javascript
// Props: indicatorCode (string)
// State: indicatorData (object), usageStats (object), performanceData (array)
// Displays: Metadata + charts + change history
```

**KPICard.jsx** (Reusable)
```javascript
// Props:
//   title (string)
//   value (string | number)
//   subtitle (string)
//   color (string) - "green", "red", "amber", "blue"
//   trend (object) - { direction: "up" | "down" | "stable", value: number }
//   icon (ReactNode)
//   onClick (function - optional)
```

**RankingsSection.jsx**
```javascript
// Props: schoolId (string)
// State: rankings (object from context)
// Displays: 4 ranking cards (region, city, type, YoY)
```

**EvaluationHistory.jsx**
```javascript
// Props: schoolId (string)
// State: history (array), expandedCycles (array), filters (object)
// Functions: handleExpand, handleCompare
```

**ComparisonView.jsx**
```javascript
// Props: cycle1 (object), cycle2 (object)
// Displays: Side-by-side comparison table + insights
```

### 10.3 Routing Updates

**Add to React Router:**
```javascript
// Inspector Routes
<Route path="/inspector/dashboard" element={<InspectorDashboardPage />} />
<Route path="/inspector/inspection/:schoolId" element={<InspectionDetailPage />} />

// Committee Routes (new)
<Route path="/committee/questions-bank" element={<QuestionsBankPage />} />
<Route path="/committee/indicator/:indicatorCode/review" element={<IndicatorReviewPageWrapper />} />

// School Routes (new)
<Route path="/school/rankings" element={<RankingsPage />} />
<Route path="/school/evaluation-history" element={<EvaluationHistoryPage />} />
<Route path="/school/evaluation-history/compare" element={<ComparisonPage />} />
```

### 10.4 Context Providers

**InspectorContext.jsx**
```javascript
export const InspectorContext = createContext();

export const InspectorProvider = ({ children }) => {
  const [assignments, setAssignments] = useState(inspectorAssignments);
  
  const updateFinding = (assignmentId, indicatorCode, finding) => {
    // Update logic
  };
  
  const submitReport = (assignmentId) => {
    // Submit logic
  };
  
  return (
    <InspectorContext.Provider value={{ assignments, updateFinding, submitReport }}>
      {children}
    </InspectorContext.Provider>
  );
};
```

**QuestionsBankContext.jsx**
```javascript
export const QuestionsBankContext = createContext();

export const QuestionsBankProvider = ({ children }) => {
  const [questions, setQuestions] = useState(questionsBank);
  
  const addQuestion = (newQuestion) => {
    // Add logic
  };
  
  const editQuestion = (questionId, updates) => {
    // Edit logic
  };
  
  return (
    <QuestionsBankContext.Provider value={{ questions, addQuestion, editQuestion }}>
      {children}
    </QuestionsBankContext.Provider>
  );
};
```

---

## Implementation Priority

### Phase 1: Core Features (Week 1-2)
1. Inspector Dashboard & Inspection Detail
2. School Admin Dashboard KPIs
3. Committee: Enable/Disable Indicators

### Phase 2: Advanced Features (Week 3-4)
4. Committee: Questions Bank
5. School Admin: Rankings Section
6. School Admin: Evaluation History

### Phase 3: Polish & Integration (Week 5)
7. Committee: Custom Domain Creation inline
8. Committee: Indicator Review Page
9. Ops Integration with Inspector Findings
10. Testing & Bug Fixes

---

## Testing Checklist

- [ ] Inspector can view assignments and record findings
- [ ] Inspector discrepancies show in Ops review
- [ ] Committee can create custom domains inline
- [ ] Committee can browse, add, and use questions from bank
- [ ] Committee can enable/disable indicators with confirmation
- [ ] Committee can view detailed indicator analytics
- [ ] School Admin sees 5 KPI cards on dashboard
- [ ] School Admin can view rankings (region, city, type, YoY)
- [ ] School Admin can access evaluation history table
- [ ] School Admin can compare two evaluation cycles
- [ ] All mock data loads correctly
- [ ] Navigation between pages works smoothly
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Accessibility: keyboard navigation and screen reader support

---

**End of Implementation Specification**

This document is ready for Claude Code to implement all new features. Each section includes detailed UI layouts, mock data structures, component architecture, and user stories with acceptance criteria.
---

# IMPLEMENTATION NOTES

**Implementation Date**: November 5, 2025
**Implementation Branch**: main
**Build Status**: ✅ Passing
**Documentation**: See `IMPLEMENTATION_STATUS.md` and `CHANGELOG.md`

## Implementation Summary

All 8 features from Phase 1-4 have been **successfully implemented and merged to main**.

| Feature | Phase | Status | Location | Route |
|---------|-------|--------|----------|-------|
| Inspector Dashboard | 2 | ✅ | `src/pages/Inspector/` | `/inspector/dashboard` |
| Custom Domains | 3 | ✅ | `src/components/committee/domains/` | Inline in AddIndicator |
| Questions Bank | 3 | ✅ | `src/pages/Committee/QuestionsBank.jsx` | `/committee/questions-bank` |
| Enable/Disable | 1 | ✅ | `src/components/committee/indicators/` | `/committee` |
| Indicator Review | 4 | ✅ | `src/pages/Committee/IndicatorReviewPage.jsx` | `/committee/indicator/:code/review` |
| KPI Cards | 1 | ✅ | `src/components/school/dashboard/` | `/school` |
| Rankings | 2 | ✅ | `src/pages/School/RankingsPage.jsx` | `/school/rankings` |
| Eval History | 4 | ✅ | `src/pages/School/EvaluationHistory.jsx` | `/school/evaluation-history` |

## Additional Enhancements (Beyond Spec)

1. **Enhanced Scorecard Page** - Comprehensive visualization at `/school/scorecard/:cycleId`
2. **Table View Mode** - Toggle between table/cards in Evaluation History
3. **Complete Navigation** - All features accessible via buttons/links throughout app

## Technical Stats

- **Files Created**: 17 (11 components, 6 pages)
- **Mock Data Files**: 4 comprehensive datasets
- **Routes Added**: 6 new routes
- **Code Added**: +3,974 lines
- **Dependencies**: recharts, date-fns, clsx
- **Build**: 921KB (242KB gzipped)

## Key Commits

- `7238d90` - Phase 1 & 2 features (KPI cards, Inspector, Rankings)
- `b357ead` - Phase 3 features (Custom Domains, Questions Bank)
- `29782f0` - Phase 4 features (Indicator Review, Evaluation History)
- `b93952a` - Navigation enhancements and Scorecard page

## Verification

All acceptance criteria from this spec have been met. For detailed implementation notes, test results, and component documentation, refer to:
- `IMPLEMENTATION_STATUS.md` - Detailed feature-by-feature status
- `CHANGELOG.md` - Version history and changes
- `docs/COMPONENTS.md` - Component API documentation
- `docs/USER_GUIDE.md` - End-user feature guide

---
