# MadaresScore User Guide

Quick guide for using key features by role.

---

## School Admin Features

### Dashboard Overview
**Access**: Log in as School Admin → Dashboard
**Key Sections**:
- **KPI Cards** (5 cards showing): Overall Score, Pending Items, Deadline, Completion Progress, Evaluation Status
- **Rankings Section**: Your school's position vs. others
- **Current Evaluation**: Active evaluation progress

### Viewing Evaluation History
1. Click **"Evaluation History"** button (top-right of dashboard)
2. Use filters: Year, Domain, Status (All/Approved/Failed)
3. Toggle between **Table** and **Cards** view
4. **Table view**: Quick scan with sortable columns
5. **Cards view**: Detailed breakdown, click to expand domains

### Understanding Your Scorecard
1. From Evaluation History, click **"View Scorecard"** or click "View" in table
2. **Overall Score**: Large grade display (A, B+, etc.) with percentage
3. **Three Domains**:
   - **Compliance** (50%): Pass/Fail on mandatory requirements
   - **Excellence** (30%): Scored institutional performance
   - **Satisfaction** (20%): Stakeholder feedback scores
4. **Indicators**: See individual scores with trends (↑ improving, ↓ declining)
5. Download PDF for records

### Checking Rankings
1. From dashboard, scroll to **Rankings Section** (quick view)
2. Click **"View Detailed Rankings"** for full page
3. See rankings by:
   - Region (your position among regional schools)
   - City (within your city)
   - School Type (compared to similar schools)
   - Year-over-Year (your improvement)
4. View historical trend chart showing 6-cycle performance

---

## Committee Member Features

### Managing Indicators
**Access**: Log in as Committee Member → Dashboard
**Indicators Tab**: View all evaluation indicators

#### Viewing Indicator Details
1. Click any **indicator code** (e.g., "IND-001") in the table
2. See comprehensive analytics:
   - Usage statistics (total evaluations, avg/median scores)
   - Performance distribution chart
   - Grade distribution (A/B/C/D/F breakdown)
   - Change history with rationale
3. Actions: Edit, Adjust Weight, Disable, Export

#### Enabling/Disabling Indicators
1. In Indicators table, find indicator
2. Click **status dropdown** (Active/Disabled)
3. Review **impact analysis** showing:
   - Number of affected schools
   - Weight redistribution impact
   - Current usage in evaluations
4. Enter rationale for change
5. Confirm action

### Questions Bank
**Access**: Committee Dashboard → "Questions Bank" button

#### Browsing Questions
1. Use **search** to find by text/code/tags
2. **Filter by**: Domain, Category, Field Type, Status
3. View usage statistics on each question card

#### Adding Questions
1. Click **"Add New Question"**
2. Select: Create from scratch OR Select from bank
3. Fill in: Text (EN/AR), Domain, Category, Field Type
4. Save as draft or submit for approval

#### Using Questions in Indicators
1. From Add Indicator modal, click **"Select from Bank"**
2. Search/filter questions
3. Select question → Auto-populate indicator details
4. Customize if needed, submit

### Custom Domains
**Access**: Within "Add New Indicator" modal

#### Creating Custom Domains
1. Click **"Add New Indicator"**
2. In Domain dropdown, click **"+ Create Custom Domain"**
3. Enter: Name (EN/AR), Weight (max 30% total for custom)
4. See weight capacity tracker
5. Submit for approval
6. Once approved, use in indicators

---

## Inspector Features

### Viewing Assignments
**Access**: Log in as Inspector → Dashboard
**Features**:
- Filter by: Status (Pending/In Progress/Completed), Region
- Search by school name or request ID
- See deadline, priority, school location

### Conducting Inspection
1. Click **"Start Inspection"** on assignment card
2. Review school's submitted data
3. For each indicator:
   - Mark as: **Verified**, **Discrepancy Found**, or **Unable to Verify**
   - If discrepancy: Describe issue, upload evidence (photos/documents)
4. Track progress (indicators verified / total)
5. Add general notes
6. **Submit Report** when complete

### Recording Discrepancies
- **What**: Clear description of the issue
- **Evidence**: Upload photos, documents (PDF, images)
- **Impact**: System flags for Ops Reviewer
- **Follow-up**: Track resolution in assignment

---

## Common Tasks

### Exporting Data
- **Scorecard**: Click "Download PDF" (full evaluation report)
- **Evaluation History**: "Export All (Excel)" - all cycles in spreadsheet
- **Rankings**: "Export Data" - rankings table as Excel
- **Indicators**: Individual indicator export from review page

### Understanding Grades
- **A+ / A**: 90-100% (Excellent)
- **B+ / B**: 80-89% (Good)
- **C+ / C**: 70-79% (Satisfactory)
- **D / F**: Below 70% (Needs Improvement)

### Reading Trends
- **↑ Green arrow**: Performance improved vs. previous cycle
- **↓ Red arrow**: Performance declined vs. previous cycle
- **— Gray line**: Stable, no significant change
- **Number (+5%)**: Magnitude of change

### Navigation Tips
- **Back buttons**: Top-left of most pages
- **Breadcrumbs**: Show your current location
- **Dashboard**: Home button in header
- **Clickable codes**: Indicator codes, cycle names link to details

---

## Troubleshooting

**Q: I can't see Evaluation History button**
A: Ensure you're logged in as School Admin, check top-right of dashboard

**Q: Scorecard shows "Not Found"**
A: Verify the cycle ID in the URL matches an existing evaluation

**Q: Table view not showing**
A: Click the "Table" button above the evaluation list

**Q: Can't find Questions Bank**
A: Only visible to Committee Members, check role login

**Q: Indicator codes not clickable**
A: Make sure you're on the Committee dashboard Indicators tab

**Q: Rankings not appearing**
A: Your school must have a published score to see rankings

---

## Quick Reference

| Role | Key Routes | Main Actions |
|------|-----------|--------------|
| School Admin | `/school`, `/school/evaluation-history`, `/school/scorecard/:id` | View history, check scorecard, see rankings |
| Committee | `/committee`, `/committee/questions-bank`, `/committee/indicator/:code/review` | Manage indicators, create questions, review analytics |
| Inspector | `/inspector/dashboard`, `/inspector/inspection/:id` | View assignments, conduct inspections, record findings |

---

**For technical documentation, see**: `docs/COMPONENTS.md`
**For implementation details, see**: `IMPLEMENTATION_STATUS.md`
