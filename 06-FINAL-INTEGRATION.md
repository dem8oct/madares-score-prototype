# Document 06: Final Integration & Build Summary
## For AI Coding Agents

**Build Order:** Final  
**Dependencies:** All previous documents (00-05)  
**Estimated Complexity:** Low

---

## Overview

This document provides the final integration steps, additional components needed, and deployment instructions. Complete this after building all core views.

---

## Additional Components Needed

### 1. Ops Reviewer - Current Evaluation View

**File:** `src/pages/OpsReviewer/EvaluationReview.jsx`

**Key Differences from School View:**
- All school-submitted data is **read-only**
- Add per-question review controls: "Accept" / "Return for Correction"
- Add comment textarea (required for corrections)
- Add Internal Notes section (Ops-only)
- Add action buttons: "Save Draft", "Approve Request", "Return for Correction"

**Implementation Notes:**
```jsx
// Similar structure to School view, but:
// 1. Remove all input editing capabilities
// 2. Add review controls per question:
<div className="mt-4 space-y-3">
  <div className="flex gap-4">
    <label className="flex items-center gap-2">
      <input type="radio" name={`review-${question.id}`} value="accepted" />
      <span>Accept</span>
    </label>
    <label className="flex items-center gap-2">
      <input type="radio" name={`review-${question.id}`} value="return" />
      <span>Return for Correction</span>
    </label>
  </div>
  {reviewStatus === 'return' && (
    <textarea 
      placeholder="Explain what needs to be corrected (required)"
      className="w-full border-gray-300 rounded-lg"
      required
    />
  )}
</div>

// 3. Add Internal Notes section at bottom
<Card title="Internal Notes (Ops Only - Not Visible to School)">
  <textarea rows={4} placeholder="Add notes for other reviewers..." />
</Card>

// 4. Action buttons
<Button variant="success" onClick={handleApprove}>
  Approve Request
</Button>
<Button variant="danger" onClick={handleReturnForCorrection}>
  Return for Correction
</Button>
```

---

### 2. Committee Dashboard

**File:** `src/pages/Committee/Dashboard.jsx`

**Key Features:**
- Table of indicators with weights
- Ability to propose changes (opens modal)
- Pending changes queue
- Domain weight sliders

**Quick Implementation:**
```jsx
const CommitteeDashboard = () => {
  const [indicators, setIndicators] = useState(mockIndicators);
  const [domains, setDomains] = useState(mockDomains);
  
  return (
    <div className="space-y-6">
      <Card title="Domain Weights">
        <div className="space-y-4">
          {domains.map(domain => (
            <div key={domain.id}>
              <label>{domain.name}: {domain.weight * 100}%</label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={domain.weight * 100}
                onChange={(e) => updateWeight(domain.id, e.target.value)}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </Card>

      <Card title="Indicators & Weights">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Domain</th>
              <th>Weight</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {indicators.map(ind => (
              <tr key={ind.code}>
                <td>{ind.code}</td>
                <td>{ind.name}</td>
                <td>{ind.domain}</td>
                <td>{ind.weight}/5</td>
                <td><Badge>{ind.status}</Badge></td>
                <td>
                  <Button size="sm" onClick={() => editIndicator(ind)}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};
```

---

### 3. Public Portal

**File:** `src/pages/Public/SchoolSearch.jsx`

**Key Features:**
- Search filters (City, Gender, Stage)
- Search results cards
- School scorecard modal/page

**Quick Implementation:**
```jsx
const SchoolSearch = () => {
  const [filters, setFilters] = useState({
    city: 'all',
    gender: 'all',
    stage: 'all',
  });
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // Filter mockSchools based on filters
    const filtered = mockSchools.filter(school => {
      // Apply filters
      return true; // Simplified
    });
    setResults(filtered);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Card title="Search Schools">
        <div className="grid grid-cols-3 gap-4">
          <select onChange={(e) => setFilters({...filters, city: e.target.value})}>
            <option value="all">All Cities</option>
            {/* Add cities */}
          </select>
          <select onChange={(e) => setFilters({...filters, gender: e.target.value})}>
            <option value="all">All Gender Models</option>
            {/* Add gender models */}
          </select>
          <select onChange={(e) => setFilters({...filters, stage: e.target.value})}>
            <option value="all">All Stages</option>
            {/* Add stages */}
          </select>
        </div>
        <Button onClick={handleSearch} className="mt-4">Search</Button>
      </Card>

      <div className="mt-8 grid grid-cols-2 gap-6">
        {results.map(school => (
          <Card key={school.id}>
            <h3 className="text-xl font-bold">{school.name}</h3>
            <p className="text-gray-600">{school.city}, {school.region}</p>
            
            {school.published_score && (
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Compliance:</span>
                  <Badge variant="success">{school.published_score.compliance}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Excellence:</span>
                  <Badge variant="primary">
                    {school.published_score.excellence_grade} ({school.published_score.excellence_score}%)
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Satisfaction:</span>
                  <Badge variant="primary">
                    {school.published_score.satisfaction_grade} ({school.published_score.satisfaction_score}%)
                  </Badge>
                </div>
              </div>
            )}
            
            <Button variant="outline" size="sm" className="mt-4" fullWidth>
              View Full Scorecard
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
```

---

## App Routing Structure

**File:** `src/App.jsx` (Complete routing)

```jsx
function AppRoutes() {
  const { isAuthenticated, showRoleSelector, user } = useAuth();

  if (!isAuthenticated) return <Login />;
  if (showRoleSelector) return <RoleSelector />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <Routes>
          {/* School Admin Routes */}
          {user.role === 'school_admin' && (
            <>
              <Route path="/" element={<Navigate to="/school/evaluation" />} />
              <Route path="/school/evaluation" element={<CurrentEvaluation />} />
            </>
          )}

          {/* Ops Reviewer Routes */}
          {user.role === 'ops_reviewer' && (
            <>
              <Route path="/" element={<Navigate to="/ops/evaluations" />} />
              <Route path="/ops/evaluations" element={<EvaluationRequestsTable />} />
              <Route path="/ops/evaluation/:evalId" element={<EvaluationReview />} />
            </>
          )}

          {/* Committee Routes */}
          {user.role === 'committee_member' && (
            <>
              <Route path="/" element={<Navigate to="/committee/dashboard" />} />
              <Route path="/committee/dashboard" element={<CommitteeDashboard />} />
            </>
          )}

          {/* Public Routes */}
          {user.role === 'public' && (
            <>
              <Route path="/" element={<Navigate to="/public/search" />} />
              <Route path="/public/search" element={<SchoolSearch />} />
            </>
          )}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}
```

---

## Package.json Dependencies

```json
{
  "name": "madares-score-prototype",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "lucide-react": "^0.294.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6",
    "vite": "^5.0.7"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## Build & Deployment

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build project
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

---

## Testing Checklist

### Authentication & Navigation
- [ ] Login page accepts any credentials
- [ ] Role selector shows all 6 roles
- [ ] Each role loads correct dashboard
- [ ] Header shows user info and role
- [ ] Language toggle works (EN ↔ AR)
- [ ] RTL layout applies for Arabic
- [ ] Can switch roles via header

### School Admin Flow
- [ ] Current Evaluation loads with correct data
- [ ] Pending Items show missing/corrected items
- [ ] Can answer Compliance questions
- [ ] Can upload files (simulated)
- [ ] Excellence/Satisfaction tabs show read-only data
- [ ] Progress bar updates as questions completed
- [ ] Save Draft shows toast
- [ ] Submit button only enabled at 100%
- [ ] Submit modal confirms before submitting

### Ops Reviewer Flow
- [ ] Evaluation Requests Table shows all evaluations
- [ ] Filters work correctly
- [ ] Sorting works on columns
- [ ] Pagination works
- [ ] Can open evaluation review
- [ ] Review view shows submitted data as read-only
- [ ] Can mark questions Accept/Return
- [ ] Comment required for corrections
- [ ] Can save draft or approve/return

### Committee Flow
- [ ] Indicators table displays
- [ ] Can adjust domain weights
- [ ] Can propose indicator changes
- [ ] Pending changes queue shows proposals

### Public Portal
- [ ] Search filters work
- [ ] Results display school cards
- [ ] Published scores show correctly
- [ ] Can view scorecard details

### General
- [ ] No console errors
- [ ] All toast notifications work
- [ ] All modals open/close correctly
- [ ] All buttons have hover states
- [ ] Loading states where appropriate
- [ ] Responsive on desktop sizes
- [ ] Browser compatibility (Chrome, Firefox, Safari, Edge)

---

## Known Limitations (For Demo)

Document these clearly:

1. **No Real Authentication**: Anyone can access any role
2. **No Data Persistence**: Refresh resets all changes
3. **No File Uploads**: Files are simulated with names only
4. **No Backend**: All data is client-side mock data
5. **Limited Mobile Support**: Desktop-first design
6. **No Real Calculations**: Scores are pre-calculated in mock data
7. **No Real-Time Updates**: No websockets or polling
8. **English-Only Content**: Arabic translations are minimal
9. **Static Data**: External integrations (Noor, etc.) are mocked
10. **No Error Handling**: Limited validation and error states

---

## Demo Scenarios

Create these user flows for demonstrations:

### Scenario 1: School Completes Evaluation
1. Select "School Administrator" role
2. View Current Evaluation (REQ-2025-001)
3. Answer pending Compliance question
4. Upload fire safety certificate
5. Review Excellence/Satisfaction (read-only)
6. Add school notes
7. Submit for review

### Scenario 2: Ops Reviews and Returns for Correction
1. Select "Operations Reviewer" role
2. View Evaluation Requests Table
3. Filter by status: "Submitted"
4. Open evaluation (REQ-2025-002)
5. Mark some questions "Accept"
6. Mark one question "Return for Correction" with comment
7. Return entire request

### Scenario 3: Committee Adjusts Weights
1. Select "Committee Member" role
2. View indicators table
3. Adjust weight for "Teacher Training" indicator
4. Change domain weights (Excellence: 35%, Satisfaction: 15%)
5. Propose new indicator
6. Review pending changes

### Scenario 4: Public Searches Schools
1. Select "Public" role
2. Search by City: "Riyadh"
3. View results
4. Click "View Full Scorecard" for a school
5. See Compliance, Excellence, Satisfaction scores

---

## Handoff Documentation

Create a `README.md` in project root:

```markdown
# Madares Score System - Prototype

## Overview
UI-only demonstration prototype for the Madares Score evaluation system.

## Quick Start
```bash
npm install
npm run dev
```

## Demo Access
No login required - select any role to explore:
- School Administrator
- Operations Reviewer
- Committee Member
- Appeals Officer
- National Dashboard
- Public Portal

## Key Features
- Complete evaluation workflow
- Multi-role dashboards
- Arabic/English language support
- Responsive design (desktop-first)

## Limitations
- No backend or database
- No real authentication
- Data resets on refresh
- Simulated file uploads

## Tech Stack
- React 18
- Tailwind CSS
- React Router
- Lucide Icons

## Project Structure
See `/docs` folder for detailed component specifications

## Support
Contact: [project lead email]
```

---

## Final Build Commands

```bash
# Complete build process
npm install              # Install dependencies
npm run dev              # Test locally
npm run build            # Build for production
npm run preview          # Test production build

# Deployment
netlify deploy --prod --dir=dist
# OR
vercel --prod
```

---

## Success Metrics

The prototype is complete when:

1. ✅ All 6 roles have functional dashboards
2. ✅ School Admin can complete full evaluation flow
3. ✅ Ops can review and return for corrections
4. ✅ Committee can manage indicators
5. ✅ Public can search and view scores
6. ✅ Language toggle works (EN/AR)
7. ✅ No console errors in any flow
8. ✅ All demo scenarios work smoothly
9. ✅ Deployed and accessible via URL
10. ✅ Documentation complete

---

## Congratulations! 🎉

You've built a complete, professional frontend prototype of the Madares Score System. This prototype demonstrates:

- Complex multi-role workflows
- Read-only vs editable data separation
- Version tracking and correction loops
- SLA management
- Multi-language support
- Professional UI/UX

The prototype is ready for stakeholder demonstrations and usability testing!
