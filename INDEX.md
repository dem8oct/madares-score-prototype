# Madares Score System - Document Index for AI Coding Agents
## Master Build Guide

**Last Updated:** October 27, 2025  
**Total Documents:** 7 (00-06)  
**Project Type:** Frontend-Only Prototype  
**Tech Stack:** React + Tailwind CSS

---

## 🎯 Project Goal

Build a clickable, professional UI-only prototype of the Madares Score System for the Saudi Ministry of Education. This prototype demonstrates the complete evaluation workflow across multiple user roles **without any backend, authentication, or database**.

---

## 📋 Document Overview

| Doc # | Title | Purpose | Build Order | Complexity |
|-------|-------|---------|-------------|------------|
| **00** | Project Overview | Understand constraints, tech stack, and success criteria | Read First | N/A |
| **01** | Design System & Common Components | Build reusable UI components (buttons, inputs, modals, tables) | 1st | Medium |
| **02** | Mock Data Structures | Create JSON data files and helper functions | 2nd | Low |
| **03** | Authentication & Context Setup | Build mock auth, language switching, and state management | 3rd | Medium |
| **04** | Evaluation Requests Table (Ops View) | Ops dashboard to filter and open evaluations | 4th | Medium |
| **05** | Current Evaluation (School Admin View) | School's main interface to complete evaluations | 5th | High |
| **06** | Final Integration & Build Summary | Additional components, routing, deployment | 6th (Final) | Low |

---

## 🚀 Recommended Build Order

### Phase 1: Foundation (Days 1-2)
```
1. Read Document 00 (Project Overview)
   ├─ Understand constraints (no backend, no auth)
   ├─ Review tech stack requirements
   └─ Note success criteria

2. Build Document 01 (Design System)
   ├─ Set up Tailwind configuration
   ├─ Create Button component
   ├─ Create Input component
   ├─ Create Card component
   ├─ Create Badge component
   ├─ Create Modal component
   ├─ Create Table component
   ├─ Create Toast component
   ├─ Create ProgressBar component
   ├─ Create Header component
   └─ Test all components in isolation

3. Implement Document 02 (Mock Data)
   ├─ Create users.json
   ├─ Create schools.json
   ├─ Create evaluations.json
   ├─ Create indicators.json
   ├─ Build helper functions (mockData.js)
   └─ Validate JSON syntax
```

### Phase 2: Core Infrastructure (Days 3-4)
```
4. Build Document 03 (Auth & Context)
   ├─ Create AuthContext (mock login)
   ├─ Create LanguageContext (i18n)
   ├─ Create EvaluationContext (state management)
   ├─ Create ToastContext (notifications)
   ├─ Build Login page
   ├─ Build RoleSelector modal
   ├─ Set up App.jsx with routing
   ├─ Create translation files (en.json, ar.json)
   └─ Test role switching and language toggle
```

### Phase 3: Core Views (Days 5-8)
```
5. Build Document 04 (Ops Evaluation Table)
   ├─ Create EvaluationRequestsTable component
   ├─ Implement filters panel
   ├─ Build table with sorting
   ├─ Add pagination
   ├─ Add SLA color coding
   ├─ Add "Open Review" action
   └─ Test all filters and sorting

6. Build Document 05 (School Current Evaluation)
   ├─ Create CurrentEvaluation component (School view)
   ├─ Build Request Overview header
   ├─ Build Pending Items alert section
   ├─ Build Domain tabs (Compliance, Excellence, Satisfaction)
   ├─ Implement Compliance questions (editable)
   ├─ Implement file upload simulation
   ├─ Build Excellence indicators (read-only)
   ├─ Build Satisfaction indicators (read-only)
   ├─ Add School Notes textarea
   ├─ Build navigation and action buttons
   ├─ Build Submit confirmation modal
   └─ Test complete evaluation flow
```

### Phase 4: Additional Views & Polish (Days 9-10)
```
7. Build Document 06 (Final Integration)
   ├─ Create EvaluationReview component (Ops view)
   │  ├─ Same structure as School view but read-only
   │  ├─ Add per-question review controls
   │  ├─ Add comment fields for corrections
   │  └─ Add Internal Notes section
   │
   ├─ Create CommitteeDashboard component
   │  ├─ Build indicators table
   │  ├─ Add domain weight sliders
   │  └─ Add propose changes modal
   │
   ├─ Create SchoolSearch component (Public Portal)
   │  ├─ Build search filters
   │  ├─ Display results cards
   │  └─ Build scorecard view
   │
   ├─ Complete App.jsx routing for all roles
   ├─ Add navigation guards
   ├─ Test all role-based flows
   ├─ Fix any bugs
   ├─ Verify i18n (Arabic/English)
   ├─ Test accessibility (keyboard navigation)
   ├─ Build production bundle
   └─ Deploy to Vercel/Netlify
```

---

## 🔑 Critical Success Factors

### Must-Have Features
✅ **No Backend Dependencies**
- All data in JSON files loaded into React state
- No API calls, no database connections
- No localStorage/sessionStorage (causes issues)

✅ **Mock Authentication**
- Login accepts any credentials
- Role selector lets user choose persona
- Can switch roles for demo purposes

✅ **Read-Only vs Editable Clarity**
- School Admin can edit Compliance questions only
- Excellence and Satisfaction indicators are read-only
- Ops can review but not edit school data
- Clear visual indicators ("Calculated by System")

✅ **Version Tracking**
- Show "Version 2/4" when corrections requested
- Status column shows correction cycle count
- Pending Items list updates dynamically

✅ **Multi-Language Support**
- Toggle between English and Arabic
- RTL layout for Arabic
- All UI text translated

---

## 📊 Component Dependency Tree

```
App (Context Providers)
├─ AuthProvider
├─ LanguageProvider
├─ EvaluationProvider
└─ ToastProvider
    │
    ├─ Login
    ├─ RoleSelector
    │
    └─ Routes (by role)
        │
        ├─ School Admin
        │   └─ CurrentEvaluation
        │       ├─ Card (Request Overview)
        │       ├─ Card (Pending Items)
        │       ├─ Tabs (Domains)
        │       ├─ Compliance Questions
        │       │   ├─ Input (Radio/Number)
        │       │   └─ FileUpload
        │       ├─ Excellence Indicators (Read-Only)
        │       ├─ Satisfaction Indicators (Read-Only)
        │       ├─ School Notes (Textarea)
        │       ├─ Button (Save Draft)
        │       ├─ Button (Submit)
        │       └─ Modal (Confirm Submit)
        │
        ├─ Ops Reviewer
        │   ├─ EvaluationRequestsTable
        │   │   ├─ Card (Filters)
        │   │   ├─ Table (with sorting/pagination)
        │   │   └─ Badge (Status)
        │   │
        │   └─ EvaluationReview
        │       ├─ Card (Request Overview)
        │       ├─ Read-Only Display (School Data)
        │       ├─ Review Controls (per question)
        │       ├─ Internal Notes
        │       └─ Action Buttons
        │
        ├─ Committee Member
        │   └─ CommitteeDashboard
        │       ├─ Card (Domain Weights)
        │       ├─ Table (Indicators)
        │       └─ Modal (Propose Change)
        │
        └─ Public
            └─ SchoolSearch
                ├─ Card (Search Filters)
                ├─ Results Grid
                └─ Modal (Scorecard Detail)
```

---

## 🛠️ Development Commands

```bash
# Initial setup
npm create vite@latest madares-score-prototype -- --template react
cd madares-score-prototype
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install react-router-dom lucide-react

# During development
npm run dev              # Start dev server (http://localhost:5173)
npm run build            # Build for production
npm run preview          # Preview production build

# Deployment
npm run build
netlify deploy --prod --dir=dist
# OR
vercel --prod
```

---

## 📦 File Structure

```
madares-score-prototype/
├── public/
│   └── sample-documents/     # Fake files for demo
├── src/
│   ├── components/
│   │   ├── common/           # Reusable components (Doc 01)
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Table.jsx
│   │   │   ├── Toast.jsx
│   │   │   └── ProgressBar.jsx
│   │   ├── layout/           # Layout components
│   │   │   └── Header.jsx
│   │   └── RoleSelector.jsx  # Role selection modal
│   │
│   ├── context/              # React Context (Doc 03)
│   │   ├── AuthContext.jsx
│   │   ├── LanguageContext.jsx
│   │   ├── EvaluationContext.jsx
│   │   └── ToastContext.jsx
│   │
│   ├── data/                 # Mock data (Doc 02)
│   │   ├── users.json
│   │   ├── schools.json
│   │   ├── evaluations.json
│   │   ├── indicators.json
│   │   └── mockData.js       # Helper functions
│   │
│   ├── locales/              # i18n translations
│   │   ├── en.json
│   │   └── ar.json
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── SchoolAdmin/
│   │   │   └── CurrentEvaluation.jsx        # (Doc 05)
│   │   ├── OpsReviewer/
│   │   │   ├── EvaluationRequestsTable.jsx  # (Doc 04)
│   │   │   └── EvaluationReview.jsx         # (Doc 06)
│   │   ├── Committee/
│   │   │   └── Dashboard.jsx                # (Doc 06)
│   │   └── Public/
│   │       └── SchoolSearch.jsx             # (Doc 06)
│   │
│   ├── App.jsx               # Main app with routing
│   ├── index.css             # Tailwind imports
│   └── main.jsx              # React entry point
│
├── docs/                     # This folder (all documents)
│   ├── 00-PROJECT-OVERVIEW.md
│   ├── 01-DESIGN-SYSTEM.md
│   ├── 02-MOCK-DATA.md
│   ├── 03-AUTH-CONTEXT.md
│   ├── 04-OPS-EVAL-TABLE.md
│   ├── 05-SCHOOL-CURRENT-EVAL.md
│   ├── 06-FINAL-INTEGRATION.md
│   └── INDEX.md (this file)
│
├── tailwind.config.js
├── package.json
├── vite.config.js
└── README.md
```

---

## ✅ Testing Checklist (Before Delivery)

### Functional Testing
- [ ] All 6 roles accessible and functional
- [ ] School Admin can complete evaluation
- [ ] Ops can review and return for corrections
- [ ] Committee can manage indicators
- [ ] Public can search schools
- [ ] Language toggle works (EN ↔ AR)
- [ ] All modals open and close correctly
- [ ] All toast notifications display
- [ ] All forms save correctly (in memory)
- [ ] Navigation works across all pages

### UI/UX Testing
- [ ] All buttons have hover states
- [ ] All inputs accept keyboard entry
- [ ] Tab navigation works
- [ ] Colors match design system
- [ ] Typography is consistent
- [ ] Spacing is consistent
- [ ] Icons render correctly
- [ ] Images load (if any)
- [ ] Responsive on desktop (1920x1080, 1366x768)
- [ ] Print-friendly (if needed)

### Code Quality
- [ ] No console errors
- [ ] No console warnings
- [ ] Code is commented
- [ ] Components are reusable
- [ ] File structure is organized
- [ ] Naming conventions followed
- [ ] No unused imports
- [ ] No dead code

### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Deployment
- [ ] Production build succeeds
- [ ] No build warnings
- [ ] Deployed to live URL
- [ ] URL accessible publicly
- [ ] Performance acceptable (<3s load)

---

## 🎓 Learning Resources

If you need help with any technology:

- **React**: https://react.dev/learn
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Router**: https://reactrouter.com/en/main
- **Vite**: https://vitejs.dev/guide/

---

## 🚨 Common Pitfalls to Avoid

1. ❌ **Don't use localStorage/sessionStorage** - causes issues in some environments
2. ❌ **Don't make real API calls** - all data must be mock/client-side
3. ❌ **Don't implement real authentication** - use mock role selector
4. ❌ **Don't persist data** - refresh should reset to initial state
5. ❌ **Don't skip accessibility** - ensure keyboard navigation works
6. ❌ **Don't ignore RTL** - Arabic must have proper right-to-left layout
7. ❌ **Don't hardcode text** - use translation system for all user-facing text
8. ❌ **Don't overcomplicate** - this is a prototype, keep it simple
9. ❌ **Don't ignore mobile** - but desktop-first is acceptable
10. ❌ **Don't forget documentation** - README must explain how to run/demo

---

## 💡 Tips for Success

1. ✅ **Build incrementally** - Complete one document before moving to next
2. ✅ **Test as you go** - Don't wait until the end to test
3. ✅ **Use mock data liberally** - Make it realistic but don't overthink it
4. ✅ **Keep it simple** - UI-only means no complex logic needed
5. ✅ **Comment your code** - Future you will thank you
6. ✅ **Reuse components** - Don't repeat yourself
7. ✅ **Follow the design system** - Consistency is key
8. ✅ **Ask questions** - Refer back to main blueprint if unclear
9. ✅ **Demo often** - Show stakeholders early and often
10. ✅ **Have fun!** - This is a cool project

---

## 📞 Support

If you're stuck or have questions about any document:

1. Re-read Document 00 (Project Overview) for constraints
2. Check the main blueprint (`madares-score-system-blueprint.md`) for detailed specs
3. Review similar components in other documents for patterns
4. Test individual components in isolation before integrating
5. Use browser DevTools to debug issues

---

## 🎉 Ready to Build!

You have everything you need:
- ✅ Clear requirements (7 detailed documents)
- ✅ Tech stack defined (React + Tailwind)
- ✅ Mock data provided (JSON files)
- ✅ Component specifications (with code samples)
- ✅ Build order (10-day plan)
- ✅ Testing checklist (comprehensive)
- ✅ Deployment guide (Vercel/Netlify)

**Now go build an amazing prototype!** 🚀

---

**Questions?** Refer to the main blueprint document or individual component docs for detailed specifications.

**Good luck!** 💪
