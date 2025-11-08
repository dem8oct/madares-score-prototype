# Demo Slides Content - Madares Score Prototype
**Format**: Side-by-side presentation (Browser Left | Slides Right)

---

## SLIDE 0: System Overview
**Title**: Madares Score - Evaluation Ecosystem

### The Complete Flow
```
┌─────────────────────────────────────────────────────────────┐
│                    EVALUATION LIFECYCLE                      │
└─────────────────────────────────────────────────────────────┘

    ┌──────────────┐
    │ EXECUTIVES   │ ──→ Monitor Performance & Trends
    └──────────────┘
           ↓
    ┌──────────────┐
    │ COMMITTEE    │ ──→ Configure Framework (Indicators/Domains)
    └──────────────┘
           ↓
    ┌──────────────┐
    │ OPS REVIEWER │ ──→ Create Evaluation Requests
    └──────────────┘
           ↓
    ┌──────────────┐
    │ SCHOOLS      │ ──→ Submit Evidence & Data
    └──────────────┘
           ↓
    ┌──────────────┐
    │ INSPECTORS   │ ──→ Verify & Validate
    └──────────────┘
           ↓
    ┌──────────────┐
    │ REPORTS      │ ──→ Scores & Insights Generated
    └──────────────┘
           ↓
         (Loop back to Executives)
```

**5 Roles | 1 System | Real-Time Data**

---

## SLIDE 1: Executive Dashboard
**Persona**: Dr. Abdullah Al-Faisal | Executive Director

### What They Do
✓ **Monitor** kingdom-wide performance
✓ **Identify** trends and patterns
✓ **Compare** regions and school types
✓ **Track** strategic KPIs

### Key Features
- Overall Score: 87.2%
- Regional Performance Matrix
- Trend Analysis (YoY, QoQ)
- Automated Insights
- Performance Distribution

### Value
"Strategic oversight without manual reports"

---

## SLIDE 2: Operations Reviewer
**Persona**: Sara Al-Harbi | Operations Reviewer, Riyadh Region

### What They Do
✓ **Create** evaluation requests
✓ **Assign** schools and indicators
✓ **Track** progress and SLA
✓ **Manage** inspector assignments
✓ **Download** evidence packages

### Key Features
- 5-Step Request Creation
  1. Select Indicators (Domain → Category → Indicator)
  2. Select Schools (Filters by region/type)
  3. Review Selection
  4. Set Deadline
  5. Confirm & Create
- Advanced Filters (Date, SLA, Status)
- Bulk Actions
- Real-time Status Tracking

### Value
"Orchestrate evaluations at scale with precision"

---

## SLIDE 3: School Admin
**Persona**: Ahmad Al-Mutairi | School Admin, Riyadh International School

### What They Do
✓ **View** pending evaluation requests
✓ **Fill** indicator responses
✓ **Upload** evidence documents
✓ **Track** submission progress
✓ **Monitor** deadlines

### Key Features
- Dashboard KPIs
  - Overall Score
  - Pending Items
  - Days Until Deadline
  - Progress Percentage
  - Status Tracking
- Step-by-Step Guidance
- File Upload Management
- Version Control

### Value
"Clear tasks, clear deadlines, no confusion"

---

## SLIDE 4: Inspector
**Persona**: Omar Al-Rashid | Inspector, Riyadh Region

### What They Do
✓ **Receive** school assignments
✓ **Review** submitted evidence
✓ **Verify** indicator compliance
✓ **Record** findings & discrepancies
✓ **Submit** inspection reports

### Key Features
- Assignment Dashboard
  - Pending Inspections
  - In-Progress Work
  - Workload Overview
- Indicator-by-Indicator Review
- Evidence Viewer
- Finding Status
  - ✓ Verified
  - ⚠ Discrepancy
  - ✗ Unable to Verify
- Comment & Annotation Tools

### Value
"Systematic verification, consistent standards"

---

## SLIDE 5: Indicators Committee
**Persona**: Dr. Lina Al-Ghamdi | Committee Member

### What They Do
✓ **Configure** evaluation framework
✓ **Manage** indicators and domains
✓ **Control** weights and scoring
✓ **Maintain** Questions Bank
✓ **Enable/Disable** indicators

### Key Features
- **Indicators Management**
  - Edit definitions
  - Adjust weights
  - Disable/Enable
  - View related questions

- **Domain Configuration**
  - Set domain weights (must = 100%)
  - Edit names (EN/AR)
  - Update descriptions

- **Questions Bank**
  - 30+ reusable questions
  - Link to indicators (1:1)
  - Multiple field types
  - Filter by domain/category/indicator
  - Version history

### Value
"Adapt evaluation framework as policies evolve"

---

## SLIDE 6: System Benefits
**Title**: Why This Matters

### Before (Current State)
❌ Manual Excel tracking
❌ Email chains for evidence
❌ Delayed consolidation
❌ Inconsistent standards
❌ Limited visibility

### After (Madares Score)
✅ Real-time tracking
✅ Centralized evidence
✅ Instant consolidation
✅ Standardized framework
✅ Complete transparency

### Impact
- **90% faster** evaluation cycles
- **100% visibility** for leadership
- **Zero lost** documents
- **Consistent** standards across kingdom
- **Data-driven** policy decisions

---

## SLIDE 7: Technical Highlights
**Title**: Built for Scale

### Architecture
- Modern web application
- Role-based access control
- Bilingual (Arabic/English)
- Mobile-responsive design
- Secure file storage

### Integration Ready
- MOE systems (via APIs)
- National databases
- Reporting platforms
- Existing school portals

### Deployment
- Cloud-hosted (scalable)
- 99.9% uptime
- Automated backups
- Audit trail for compliance

---

## SLIDE 8: Next Steps
**Title**: From Prototype to Production

### Phase 1: Pilot (3 months)
- 10 schools in Riyadh
- Full workflow testing
- User feedback collection
- System refinement

### Phase 2: Regional Rollout (6 months)
- Riyadh region (200+ schools)
- Inspector training program
- Integration with MOE systems
- Performance monitoring

### Phase 3: Kingdom-Wide (12 months)
- All regions
- 5,000+ schools
- Full feature set
- Continuous improvement

### Timeline
**Start**: Q2 2025 | **Kingdom-Wide**: Q2 2026

---

## Navigation Guide for Presenter

### Split-Screen Setup
```
┌─────────────────────┬─────────────────────┐
│                     │                     │
│   BROWSER TAB       │    SLIDE DECK       │
│   (Demo App)        │   (This Content)    │
│                     │                     │
│   Show actual       │   Show current      │
│   functionality     │   persona slide     │
│                     │                     │
└─────────────────────┴─────────────────────┘
```

### Presentation Flow
1. **Start**: Show Slide 0 (System Overview)
2. **Executive**: Tab 1 (Executive logged in) + Slide 1
3. **Ops**: Tab 2 (Ops logged in) + Slide 2
4. **School**: Tab 3 (School logged in) + Slide 3
5. **Inspector**: Tab 4 (Inspector logged in) + Slide 4
6. **Committee**: Tab 5 (Committee logged in) + Slide 5
7. **Benefits**: Slide 6 (no tab switch)
8. **Technical**: Slide 7 (optional, if asked)
9. **Next Steps**: Slide 8 (closing)

### Tips
- Keep slides visible throughout demo
- Use **arrow keys** to navigate slides while demoing
- Highlight current persona on overview slide
- Return to Slide 0 between personas for orientation

---

## Slide Design Recommendations

### Color Scheme (per MOE branding)
- Primary: Dark Blue (#1e40af)
- Secondary: Gold (#f59e0b)
- Success: Green (#10b981)
- Background: White/Light Gray

### Font Sizes
- Title: 32pt (bold)
- Persona: 24pt
- Headers: 20pt (bold)
- Body: 16pt
- Icons: 24pt

### Layout
- Logo: Top right (MOE + Madares Score)
- Persona avatar/icon: Top left
- Content: Centered, generous white space
- Progress indicator: Bottom (Slide X/8)

---

**Ready to create actual slides?**
Tools: PowerPoint, Google Slides, Canva, or Figma
File format: PDF for reliability during demo
