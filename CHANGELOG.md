# Changelog

All notable changes to MadaresScore prototype.

## [1.0.0] - 2025-11-05

### Added - Phase 1 Features
- School Admin Dashboard KPI Cards (5 cards: Overall Score, Pending Items, Deadline, Progress, Status)
- Committee Enable/Disable Indicators with impact analysis and confirmation modals

### Added - Phase 2 Features
- Inspector Dashboard with assignment workflow and inspection detail page
- School Rankings with comparative analysis (region/city/type/YoY)

### Added - Phase 3 Features
- Custom Domain Creation (inline mode, no navigation interruption)
- Questions Bank (search, filter, versioning, history tracking)

### Added - Phase 4 Features
- Committee Indicator Review Page (analytics, performance charts, grade distribution)
- School Evaluation History (filtering by year/domain/status)

### Added - Enhancements
- Comprehensive Scorecard page with domain breakdowns (`/school/scorecard/:cycleId`)
- Table/Cards toggle view in Evaluation History
- Clickable navigation: indicator codes → review page, dashboard buttons → history
- Trend indicators (↑↓) showing performance changes across cycles
- "View Scorecard" buttons throughout application

### Technical
- Dependencies: recharts, date-fns, clsx
- Created: 17 new components, 4 mock data files
- Routes: 6 new routes added
- Build: Passing (921KB bundle, 242KB gzipped)
- Commits: 3 feature commits merged to main

### Files Changed
- 22 files modified/created
- +3,974 lines added, -214 removed

## [0.1.0] - 2025-11-04
### Added
- Initial prototype with basic routing, authentication, and role-based dashboards
