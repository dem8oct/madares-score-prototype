# Component Documentation

Quick reference for major components and pages.

---

## School Components

### Scorecard
**File**: `src/pages/School/Scorecard.jsx`
**Route**: `/school/scorecard/:cycleId`
**Purpose**: Display comprehensive evaluation results

**Props**: None (uses `useParams` to get cycleId)
**Data**: `evaluationHistory.js`

**Usage**:
```jsx
navigate('/school/scorecard/eval_2025_q4')
```

### EvaluationHistory
**File**: `src/pages/School/EvaluationHistory.jsx`
**Route**: `/school/evaluation-history`
**Purpose**: Show historical evaluation cycles with table/cards toggle

**Features**: Filter by year/domain/status, table view, trend chart
**Data**: `evaluationHistory.js`

### HistoricalCycleCard
**File**: `src/components/school/history/HistoricalCycleCard.jsx`
**Props**: `cycle` (object), `onCompare` (function)
**Features**: Expandable card showing domain breakdowns, "View Scorecard" button

### RankingsPage
**File**: `src/pages/School/RankingsPage.jsx`
**Route**: `/school/rankings`
**Purpose**: Show school's ranking across different dimensions
**Data**: `schoolRankings.js`

### KPI Cards
**Files**: `src/components/school/dashboard/*.jsx`
**Cards**: OverallScoreCard, PendingItemsCard, DeadlineCountdownCard, CompletionProgressCard, StatusCard
**Props**: `data` (object), action handlers (onClick functions)

---

## Committee Components

### IndicatorReviewPage
**File**: `src/pages/Committee/IndicatorReviewPage.jsx`
**Route**: `/committee/indicator/:code/review`
**Purpose**: Display detailed analytics for a specific indicator

**Features**: Performance charts, grade distribution, usage stats, change history
**Data**: `indicatorDetailedReview.js`

### QuestionsBank
**File**: `src/pages/Committee/QuestionsBank.jsx`
**Route**: `/committee/questions-bank`
**Purpose**: Browse and manage question templates

**Features**: Search, multi-filter, add question, version history
**Components**: QuestionCard, AddQuestionModal, QuestionPickerModal, QuestionHistoryModal
**Data**: `questionsBank.js`

### InlineDomainCreator
**File**: `src/components/committee/domains/InlineDomainCreator.jsx`
**Props**: `onDomainCreated` (function), `currentWeight` (number)
**Purpose**: Create custom domains inline without navigation interruption

**Features**: Weight validation (max 30%), bilingual input, approval workflow

### IndicatorsTabEnhanced
**File**: `src/components/committee/indicators/IndicatorsTabEnhanced.jsx`
**Props**: `onOpenModal` (function)
**Purpose**: Display indicators table with enable/disable functionality

**Features**: Search, filter by status, clickable indicator codes → review page
**Components**: IndicatorStatusToggle, DisableIndicatorModal

---

## Inspector Components

### InspectorDashboardPage
**File**: `src/pages/Inspector/InspectorDashboardPage.jsx`
**Route**: `/inspector/dashboard`
**Purpose**: Show assigned inspection tasks

**Features**: Assignment cards, status filtering, search
**Data**: `inspectorAssignments.js`

### InspectionDetailPage
**File**: `src/pages/Inspector/InspectionDetailPage.jsx`
**Route**: `/inspector/inspection/:assignmentId`
**Purpose**: Conduct inspection and record findings

**Features**: Indicator checklist, discrepancy form, file upload, status tracking
**Components**: DiscrepancyForm, IndicatorChecklistItem

---

## Common Components

### Table
**File**: `src/components/common/Table.jsx`
**Props**: `columns` (array), `data` (array)
**Features**: Sortable columns, custom renderers

**Example**:
```jsx
const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'score', label: 'Score', sortable: true, render: (val) => `${val}%` }
];
<Table columns={columns} data={items} />
```

### Card
**File**: `src/components/common/Card.jsx`
**Props**: `title`, `padding`, `className`, `children`

### Badge
**File**: `src/components/common/Badge.jsx`
**Props**: `variant` ('success'|'danger'|'warning'|'primary'), `size` ('sm'|'md'|'lg')

### Button
**File**: `src/components/common/Button.jsx`
**Props**: `variant`, `size`, `leftIcon`, `rightIcon`, `disabled`, `onClick`

---

## Data Files

### evaluationHistory.js
- 4 evaluation cycles (Q1-Q4 2025)
- Domain scores: Compliance, Excellence, Satisfaction
- Indicator-level details with trends

### indicatorDetailedReview.js
- Enhanced indicator metadata
- Usage statistics, performance data
- Change history with rationale

### questionsBank.js
- 10 question templates
- Version history for each question
- Multi-domain coverage

### customDomains.js
- 4 custom domain examples
- Weight tracking, approval status
- Bilingual support

### indicatorsWithStatus.js
- Indicator list with Active/Disabled status
- Disable/enable history tracking

---

## Quick Navigation Map

```
/school
  → /school/evaluation-history (History button)
    → /school/scorecard/:cycleId (View Scorecard)
  → /school/rankings (Rankings section link)

/committee
  → /committee/questions-bank (Questions Bank button)
  → /committee/indicator/:code/review (Click indicator code)

/inspector/dashboard
  → /inspector/inspection/:assignmentId (Click assignment)
```

---

## Testing Components

To test individual components:

```jsx
// Test Scorecard
navigate('/school/scorecard/eval_2025_q4')

// Test Indicator Review
navigate('/committee/indicator/IND-001/review')

// Test Questions Bank
navigate('/committee/questions-bank')

// Test Evaluation History
navigate('/school/evaluation-history')
```
