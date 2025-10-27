# Madares Score System - Frontend Prototype

A clickable, UI-only demonstration prototype for the Saudi Ministry of Education's school evaluation system.

## Project Overview

**Type:** Frontend-only prototype (NO backend, NO database)
**Purpose:** Stakeholder review and usability testing
**Tech Stack:** React 18 + Vite + Tailwind CSS + React Router

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173`

## Project Structure

```
madares-score-prototype/
├── docs/                          # Complete documentation
│   ├── 00-PROJECT-OVERVIEW.md     # START HERE - Critical constraints
│   ├── 01-DESIGN-SYSTEM.md        # UI components specifications
│   ├── 02-MOCK-DATA.md            # Data structures
│   ├── 03-AUTH-CONTEXT.md         # State management
│   ├── 04-OPS-EVAL-TABLE.md       # Operations dashboard
│   ├── 05-SCHOOL-CURRENT-EVAL.md  # School admin interface
│   ├── 06-FINAL-INTEGRATION.md    # Additional views
│   └── INDEX.md                   # Master build guide
│
├── src/
│   ├── components/
│   │   ├── common/                # Reusable UI components
│   │   ├── layout/                # Header, sidebar, etc.
│   │   └── domain/                # Domain-specific components
│   ├── pages/                     # Full page views by role
│   │   ├── SchoolAdmin/
│   │   ├── OpsReviewer/
│   │   ├── Committee/
│   │   ├── Public/
│   │   └── ...
│   ├── context/                   # React Context providers
│   ├── data/                      # Mock JSON data
│   ├── utils/                     # Helper functions
│   └── locales/                   # i18n translations (AR/EN)
│
└── public/
    └── sample-documents/          # Fake files for demo
```

## Critical Constraints

### ✅ What This IS:
- React + Tailwind CSS frontend
- Client-side routing
- Mock data in JSON files
- Simulated interactions
- Arabic/English i18n support

### ❌ What This IS NOT:
- NO authentication system (mock only)
- NO backend API calls
- NO database connections
- NO file uploads (simulated)
- NO data persistence (session-only)
- NO localStorage/sessionStorage

## Build Phases

1. **Phase 1: Foundation** - Design system, mock data, auth context
2. **Phase 2: Core Views** - Ops dashboard, school evaluation interface
3. **Phase 3: Additional Views** - Committee, public portal, integration
4. **Phase 4: Polish** - i18n, accessibility, deployment

See `docs/INDEX.md` for detailed build plan.

## Demo User Roles

The prototype demonstrates 6 user personas:

1. **School Admin** - Completes evaluation requests
2. **Operations Reviewer** - Reviews and validates submissions
3. **Committee Member** - Manages indicators and approves evaluations
4. **Appeals Officer** - Handles school appeals
5. **National Dashboard** - Leadership view
6. **Public Portal** - No login required

## Development Status

- ✅ Project setup complete
- ⏳ Components (pending)
- ⏳ Mock data (pending)
- ⏳ Context/State (pending)
- ⏳ Pages (pending)
- ⏳ i18n (pending)

## Documentation

📖 **Start with:** `docs/00-PROJECT-OVERVIEW.md`
📋 **Build guide:** `docs/INDEX.md`
📘 **Full blueprint:** `docs/madares-score-system-blueprint.md`

## Technologies

- **React 18.3** - UI framework
- **Vite 6.0** - Build tool
- **Tailwind CSS 3.4** - Styling
- **React Router 6.28** - Routing
- **Lucide React** - Icons

## License

Prototype for Saudi Ministry of Education - Internal use only

---

**Ready to build!** 🚀

For questions or clarifications, see the documentation in `/docs` folder.
