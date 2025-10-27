# Madares Score System - Frontend Prototype
## Project Overview for AI Coding Agents

**Target:** Build a clickable, UI-only demonstration prototype  
**Purpose:** Stakeholder review and usability testing  
**Timeline:** This is Phase 1 - Frontend prototype only

---

## 🚨 CRITICAL CONSTRAINTS

### What This Prototype IS:
- ✅ React + Tailwind CSS frontend application
- ✅ Client-side routing (React Router)
- ✅ Mock data in JSON files or JavaScript objects
- ✅ Simulated interactions (button clicks, form fills, navigation)
- ✅ Responsive design (desktop-first, 1920x1080 primary)
- ✅ Arabic/English language support (i18n)
- ✅ Accessible (WCAG AA compliance)

### What This Prototype IS NOT:
- ❌ NO authentication system (mock login only)
- ❌ NO backend API calls
- ❌ NO database connections
- ❌ NO actual file uploads (simulate with fake filenames)
- ❌ NO server-side processing
- ❌ NO real data persistence (session-only state)
- ❌ NO third-party integrations
- ❌ NO localStorage/sessionStorage (causes issues in some environments)

---

## Tech Stack

```json
{
  "framework": "React 18+",
  "styling": "Tailwind CSS 3+",
  "routing": "React Router v6",
  "language": "JavaScript (or TypeScript if preferred)",
  "icons": "Lucide React or Heroicons",
  "state": "React Context API + useState/useReducer",
  "i18n": "react-i18next",
  "build": "Vite or Create React App"
}
```

---

## Project Structure

```
madares-score-prototype/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── common/        # Buttons, inputs, cards, modals
│   │   ├── layout/        # Header, sidebar, navigation
│   │   └── domain/        # Domain-specific components
│   ├── pages/             # Full page views
│   │   ├── SchoolAdmin/   # School admin views
│   │   ├── OpsReviewer/   # Operations reviewer views
│   │   ├── Committee/     # Committee dashboard
│   │   ├── Appeals/       # Appeals dashboard
│   │   ├── National/      # National dashboard
│   │   └── Public/        # Public portal
│   ├── data/              # Mock JSON data
│   │   ├── schools.json
│   │   ├── evaluations.json
│   │   ├── indicators.json
│   │   └── users.json
│   ├── context/           # React Context for state
│   │   ├── AuthContext.js
│   │   ├── EvaluationContext.js
│   │   └── LanguageContext.js
│   ├── utils/             # Helper functions
│   │   ├── calculations.js
│   │   ├── formatters.js
│   │   └── validators.js
│   ├── locales/           # i18n translation files
│   │   ├── ar.json
│   │   └── en.json
│   ├── App.js
│   └── index.js
├── public/
│   └── sample-documents/  # Fake PDF/image files for demo
├── README.md
└── package.json
```

---

## Build Sequence

AI coding agents should build components in this order:

### Phase 1: Foundation (Documents 01-03)
1. Project setup and configuration
2. Design system and common components
3. Mock data structures

### Phase 2: Core Views (Documents 04-07)
4. Mock authentication and role selector
5. Evaluation Requests Table (Ops view)
6. Current Evaluation - School Admin view
7. Current Evaluation - Ops Reviewer view

### Phase 3: Additional Dashboards (Documents 08-10)
8. Committee Dashboard
9. Public Portal
10. National Dashboard (optional if time permits)

### Phase 4: Polish (Document 11)
11. i18n, accessibility, responsive design

---

## Mock Authentication Flow

```
User lands on app
  ↓
Mock Login Screen (accepts any username/password)
  ↓
Role Selector Modal appears:
  - School Admin
  - Ops Reviewer  
  - Committee Member
  - Appeals Officer
  - National Dashboard (Leadership)
  - Public (no login)
  ↓
User selects role
  ↓
App renders appropriate dashboard/views for that role
  ↓
User can switch roles via dropdown in header (for demo purposes)
```

**Implementation:**
- Use React Context to store selected role
- Each page checks role and conditionally renders or redirects
- No real authentication tokens or session management

---

## Data Flow (Client-Side Only)

```
Mock JSON Data Files
  ↓
Loaded into React Context on app init
  ↓
Components consume from Context
  ↓
User interactions update Context state
  ↓
UI re-renders based on new state
  ↓
Changes persist only during session (memory only)
```

**Key Points:**
- All data starts as static JSON
- Modifications happen in memory via React state
- Refresh page = reset to initial mock data
- No backend calls, no persistence

---

## Key Features to Demonstrate

### 1. Evaluation Lifecycle
- Create request (Ops)
- School fills data
- School submits
- Ops reviews
- Ops returns for correction (version increments)
- School addresses corrections
- Ops approves
- Committee approves
- Published to public portal

### 2. Read-Only Calculated Scores
- Excellence indicators show calculated values
- Satisfaction indicators show calculated values
- School Admin cannot edit these
- Clearly labeled "Calculated by System"

### 3. Pending Items
- Dynamic list of missing/corrected items
- Updates as school completes tasks
- Links to specific questions

### 4. SLA Timers
- Color-coded deadlines (green/yellow/red)
- Countdown timers
- Visual alerts for overdue items

### 5. Version Tracking
- Show "Version 2/4" in request overview
- Status column shows correction cycle count
- History trail visible in review

### 6. Multi-Language Support
- Toggle between Arabic and English
- RTL layout for Arabic
- All content translated

---

## Design Principles

### Visual Hierarchy
- Clear section headers
- Ample whitespace
- Progressive disclosure (hide complexity until needed)
- Consistent spacing (use Tailwind's spacing scale)

### Color Coding
- **Green**: Success, on track, compliant
- **Yellow**: Warning, approaching deadline
- **Red**: Error, overdue, non-compliant
- **Blue**: Primary actions, links
- **Gray**: Disabled, read-only, informational

### Typography
- Headers: Bold, larger size
- Body: Regular weight, readable size (16px base)
- Labels: Semibold, slightly smaller
- Arabic: Ensure proper font support (Noto Sans Arabic, Tajawal)

### Interactive Elements
- Hover states on all clickable elements
- Loading states for simulated actions
- Success/error toast notifications
- Confirmation modals for critical actions

---

## Success Criteria

The prototype is successful if:

1. ✅ Stakeholders can click through entire evaluation lifecycle
2. ✅ All major personas can complete their primary tasks
3. ✅ Key concepts are clearly demonstrated:
   - Binary vs calculated scoring
   - Version tracking
   - Correction loops
   - SLA tracking
4. ✅ UI is professional, polished, and looks production-ready
5. ✅ Works in both Arabic and English
6. ✅ Accessible via keyboard navigation
7. ✅ No console errors
8. ✅ Runs smoothly in modern browsers (Chrome, Firefox, Safari, Edge)

---

## What NOT to Worry About

- ❌ Performance optimization (small dataset, client-side only)
- ❌ Security (no real data, no backend)
- ❌ SEO (not a public site)
- ❌ Mobile optimization (desktop-first is fine for demo)
- ❌ Edge cases in data validation (basic validation is enough)
- ❌ Real-time updates (no websockets needed)
- ❌ Advanced animations (keep it simple)

---

## Delivery Format

### For Demo:
- Deployed to Vercel, Netlify, or GitHub Pages
- Or runnable locally with `npm install && npm start`
- Include README with:
  - How to run
  - How to switch between roles
  - List of demo user scenarios
  - Known limitations

### For Handoff:
- Clean, commented code
- Component documentation (JSDoc or comments)
- List of mock data files and their purpose
- Screenshot or video walkthrough

---

## Next Steps

1. Read all segmented documents (01-11)
2. Set up project structure
3. Build foundation components (design system, layouts)
4. Implement core views one by one
5. Test full user flows
6. Polish UI and fix bugs
7. Deploy and share

---

## Questions?

For clarification on any requirements, refer back to the main blueprint document: `madares-score-system-blueprint.md`

Each numbered document (01-11) provides detailed specifications for that component.

**Ready to build!** 🚀
