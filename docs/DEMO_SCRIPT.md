# Demo Script - Madares Score Prototype
**Duration**: 30-35 minutes | **Audience**: Executives & Operations Heads

---

## Pre-Demo Setup
- [ ] Open app in browser: `http://localhost:3300`
- [ ] Have 4 browser tabs ready (one per persona)
- [ ] Print this script for reference

---

## PART 1: Executive View (5 mins)
**Goal**: Show the strategic overview

### Login
```
Username: dr.abdullah
Password: [any password]
Role: Executive
```

### Steps
1. **Landing**: "This is what leadership sees - real-time performance across all schools"
2. **Top KPIs**: Point to Overall Score (87.2%), Regional Performance, Trends
3. **Performance Matrix**: "We can see which regions excel and which need support"
4. **Key Insights**: "Automated insights like 'Safety indicators need attention in 23 schools'"
5. **Regional Deep-Dive**: Click "Riyadh" → Show detailed breakdown

**Key Message**: "Leadership gets strategic insights without manual reports"

---

## PART 2: Operations Reviewer (8 mins)
**Goal**: Show how evaluation requests are managed

### Login
```
Username: sara.ops
Password: [any password]
Role: Operations Reviewer
```

### Steps
1. **Dashboard**: "Ops manages all evaluation requests - 45 total, 12 in progress"
2. **Create Request** → Click "Create New Request"
   - **Step 1 - Select Indicators**:
     - Domain: Compliance → Category: Health & Safety
     - Select: C101, C102 (2 indicators)
     - "We choose WHAT to evaluate"
   - **Step 2 - Select Schools**:
     - Filter: Region = Riyadh
     - Select: 3 schools
     - "We choose WHERE to evaluate"
   - **Step 3 - Review**: Show summary
   - **Step 4 - Deadline**: Set 2 weeks from today
   - **Step 5 - Confirm**: Create requests
3. **Filters**: Show Date Range + SLA filters
   - Filter by "At Risk" SLA status
   - "We track deadlines proactively"
4. **Bulk Actions**: Select 2 requests → "Download Evidence Package"

**Key Message**: "Ops creates targeted evaluations and tracks them through completion"

---

## PART 3: School Admin (5 mins)
**Goal**: Show how schools respond

### Login
```
Username: ahmad.school
Password: [any password]
Role: School Admin
School: Riyadh International School
```

### Steps
1. **Dashboard**: "Schools see their current score and pending tasks"
2. **KPI Cards**: Point to Overall Score, Pending Items (3), Deadline (5 days)
3. **Current Evaluation** → Click "View Details" on active evaluation
4. **Fill Indicator** → Click "Start" on C101
   - Show question: "Does your school have emergency evacuation plans?"
   - Answer: Yes
   - Upload: Sample file (just show the button)
   - Submit
5. **Progress Tracking**: "Progress bar shows 1/2 indicators completed"

**Key Message**: "Schools have clear guidance on what's needed and when"

---

## PART 4: Inspector (5 mins)
**Goal**: Show verification process

### Login
```
Username: omar.inspector
Password: [any password]
Role: Inspector
Region: Riyadh
```

### Steps
1. **Dashboard**: "Inspectors see assigned schools - 8 pending, 2 in progress"
2. **Assignment Card** → Click "View Details" on Riyadh International School
3. **Inspection Page**:
   - See indicators: C101 (Health & Safety Compliance)
   - Status: Submitted by school
   - Evidence: evacuation-plan.pdf uploaded
4. **Verify Evidence**:
   - Review uploaded file (just show it's there)
   - Mark finding: "Verified ✓"
   - Add comment: "Floor plans comply with safety standards"
5. **Progress**: "2/2 indicators verified, ready to submit report"

**Key Message**: "Inspectors verify evidence systematically, all in one place"

---

## PART 5: Indicators Committee (7 mins)
**Goal**: Show how the system is configured

### Login
```
Username: dr.lina
Password: [any password]
Role: Indicators Committee Member
```

### Steps
1. **Dashboard**: "Committee configures what gets measured across the kingdom"

2. **Indicators Tab**:
   - Show table: 24 active indicators
   - Click row: C101 → Navigate to Indicator Review page
   - Show: Weight (5%), Type (Mandatory), Related Questions (2)
   - Click "Edit Indicator" → Show modal (don't fill, just show capability)
   - Click "Adjust Weight" → Show slider modal
   - Click "Disable Indicator" → Show impact warning modal

3. **Domains Tab**:
   - Show 3 domains: Compliance (40%), Excellence (35%), Satisfaction (25%)
   - Click "Configure" on Compliance domain
   - Show modal: Edit name (EN/AR), weight slider, description
   - "Total must equal 100%"

4. **Questions Bank** → Navigate via button:
   - Show filters: Domain, Category, **Indicator**, Field Type, Status
   - Filter by Indicator: C101
   - Show 2 related questions
   - Click "Add New Question"
   - Show modal: Link to indicator dropdown, field types
   - "Questions are reusable building blocks"

**Key Message**: "Committee has full control over evaluation framework - what we measure and how"

---

## PART 6: Wrap-Up (2 mins)

### Show the Flow Diagram (Optional)
```
Ops Creates Request → Schools Respond → Inspectors Verify →
Committee Configures → Executives Monitor → Reports Generated
```

### Key Takeaways
1. **Connected**: All roles work in one system
2. **Transparent**: Everyone sees progress in real-time
3. **Efficient**: No Excel, no email chains, no manual consolidation
4. **Flexible**: Committee can adapt framework as policies evolve
5. **Data-Driven**: Leadership gets insights, not just data

---

## Q&A Prep - Common Questions

**Q: Is this connected to existing MOE systems?**
A: "This is a prototype. In production, it would integrate via APIs."

**Q: What about Arabic language?**
A: "Full bilingual support - switch via profile menu (top right)."

**Q: Can we customize workflows?**
A: "Yes - committee controls indicators, domains, questions, weights."

**Q: What about data security?**
A: "Role-based access - schools only see their data, inspectors their region, etc."

**Q: How do we handle appeals?**
A: "There's an Appeals Officer role (not in this demo) for dispute resolution."

---

## Technical Notes
- **If something breaks**: Refresh the page, re-login
- **Browser**: Use Chrome/Edge for best experience
- **Mobile**: Not optimized - use laptop for demo
- **Data resets**: Mock data persists during session only

---

## Demo Checklist
- [ ] Test all 5 logins before demo
- [ ] Close unnecessary browser tabs
- [ ] Zoom level: 100% (not zoomed in/out)
- [ ] Close notifications/emails during demo
- [ ] Have backup: Screen recording or slides

**Good luck! You've got this! 🚀**
