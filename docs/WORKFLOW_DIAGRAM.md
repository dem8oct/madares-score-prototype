# Madares Score - System Workflow Diagram

## Complete Evaluation Lifecycle

```
╔════════════════════════════════════════════════════════════════════════╗
║                    MADARES SCORE EVALUATION ECOSYSTEM                   ║
╚════════════════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────────────────┐
│ STEP 1: FRAMEWORK CONFIGURATION                                         │
└─────────────────────────────────────────────────────────────────────────┘
                           ┌────────────────────┐
                           │ COMMITTEE MEMBER   │
                           │ Configure System   │
                           └──────────┬─────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    ▼                 ▼                 ▼
              ┌─────────┐       ┌─────────┐      ┌──────────┐
              │ Domains │       │Indicators│      │Questions │
              │ & Weights│       │ Library  │      │   Bank   │
              └─────────┘       └─────────┘      └──────────┘
                    Compliance (40%)                30+ Questions
                    Excellence (35%)                Linked 1:1
                    Satisfaction (25%)              to Indicators

┌─────────────────────────────────────────────────────────────────────────┐
│ STEP 2: EVALUATION REQUEST CREATION                                     │
└─────────────────────────────────────────────────────────────────────────┘
                         ┌──────────────────┐
                         │ OPS REVIEWER     │
                         │ Create Request   │
                         └────────┬─────────┘
                                  │
                  ┌───────────────┼───────────────┐
                  ▼               ▼               ▼
            Select          Select           Set
            Indicators      Schools         Deadline
            (Domain→        (Region,         (SLA
            Category→       Type,            Tracking)
            Indicator)      Level)

┌─────────────────────────────────────────────────────────────────────────┐
│ STEP 3: SCHOOL RESPONSE                                                 │
└─────────────────────────────────────────────────────────────────────────┘
                         ┌──────────────────┐
                         │  SCHOOL ADMIN    │
                         │ Submit Evidence  │
                         └────────┬─────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    ▼             ▼             ▼
              Answer         Upload        Track
              Questions      Documents     Progress
              (Per           (Evidence     (Dashboard
              Indicator)     Files)        KPIs)

┌─────────────────────────────────────────────────────────────────────────┐
│ STEP 4: INSPECTION & VERIFICATION                                       │
└─────────────────────────────────────────────────────────────────────────┘
                         ┌──────────────────┐
                         │   INSPECTOR      │
                         │ Verify Evidence  │
                         └────────┬─────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    ▼             ▼             ▼
              Review         Record         Submit
              Evidence       Findings       Report
              (Documents)    (✓ Verified    (Complete
                             ⚠ Discrepancy  Inspection)
                             ✗ Unable)

┌─────────────────────────────────────────────────────────────────────────┐
│ STEP 5: SCORING & INSIGHTS                                              │
└─────────────────────────────────────────────────────────────────────────┘
                         ┌──────────────────┐
                         │     SYSTEM       │
                         │ Auto-Calculate   │
                         └────────┬─────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    ▼             ▼             ▼
              Domain         Overall        Grade
              Scores         Score          Band
              (Weighted)     (87.2%)        (A/B/C/D)

┌─────────────────────────────────────────────────────────────────────────┐
│ STEP 6: EXECUTIVE MONITORING                                            │
└─────────────────────────────────────────────────────────────────────────┘
                         ┌──────────────────┐
                         │   EXECUTIVE      │
                         │ Monitor & Decide │
                         └────────┬─────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    ▼             ▼             ▼
              View           Analyze        Export
              Dashboards     Trends         Reports
              (Real-time     (Regional      (PDF/Excel)
              KPIs)          Performance)

╔════════════════════════════════════════════════════════════════════════╗
║                         CONTINUOUS CYCLE                                ║
║  Insights → Policy Updates → Framework Changes → New Evaluations       ║
╚════════════════════════════════════════════════════════════════════════╝
```

---

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           DATA FLOW                                      │
└─────────────────────────────────────────────────────────────────────────┘

   Committee          Ops              School           Inspector        Executive
      │                │                  │                  │               │
      │ Config         │                  │                  │               │
      │ Framework      │                  │                  │               │
      ├────────────────┤                  │                  │               │
      │                │ Create           │                  │               │
      │                │ Request          │                  │               │
      │                ├──────────────────┤                  │               │
      │                │                  │ Submit           │               │
      │                │                  │ Evidence         │               │
      │                │                  ├──────────────────┤               │
      │                │                  │                  │ Verify        │
      │                │                  │                  │ & Score       │
      │                │                  │                  ├───────────────┤
      │                │                  │                  │               │ View
      │                │   ┌──────────────────────────────────────────────┐ │ Reports
      │                │   │         CENTRAL DATABASE                     │ │
      │                │   │  - Schools, Indicators, Evaluations          │ │
      │                │   │  - Evidence Files, Inspection Reports        │◄┤
      │                │   │  - Scores, Historical Data, Analytics        │ │
      │                │   └──────────────────────────────────────────────┘ │
      │                │                  │                  │               │
      ▼                ▼                  ▼                  ▼               ▼
   Updates       Manages            Responds           Inspects        Monitors
   Rules         Cycles            to Requests        Submissions      Progress
```

---

## Role Interaction Matrix

```
╔═══════════════╦══════════════╦══════════════╦══════════════╦══════════════╗
║               ║  Committee   ║     Ops      ║   School     ║  Inspector   ║
╠═══════════════╬══════════════╬══════════════╬══════════════╬══════════════╣
║ Committee     ║      -       ║   Provides   ║      -       ║      -       ║
║               ║              ║  Framework   ║              ║              ║
╠═══════════════╬══════════════╬══════════════╬══════════════╬══════════════╣
║ Ops           ║   Requests   ║      -       ║   Sends      ║   Assigns    ║
║               ║   Changes    ║              ║  Requests    ║  Inspections ║
╠═══════════════╬══════════════╬══════════════╬══════════════╬══════════════╣
║ School        ║      -       ║  Receives    ║      -       ║   Provides   ║
║               ║              ║  Requests    ║              ║   Evidence   ║
╠═══════════════╬══════════════╬══════════════╬══════════════╬══════════════╣
║ Inspector     ║      -       ║   Reports    ║   Verifies   ║      -       ║
║               ║              ║   To         ║   Evidence   ║              ║
╠═══════════════╬══════════════╬══════════════╬══════════════╬══════════════╣
║ Executive     ║  Monitors    ║  Monitors    ║  Monitors    ║  Monitors    ║
║               ║  All Roles   ║  All Roles   ║  All Schools ║  All Regions ║
╚═══════════════╩══════════════╩══════════════╩══════════════╩══════════════╝
```

---

## Timeline Example: One Evaluation Cycle

```
Week 1              Week 2              Week 3              Week 4
├─────────────────┼─────────────────┼─────────────────┼─────────────────┤

Ops Creates      Schools Submit    Inspector         Reports
Request          Evidence          Verifies          Generated
    │                │                 │                  │
    │                │                 │                  │
    ▼                ▼                 ▼                  ▼
Committee        Schools Upload    Inspector         Executive
Configures       Documents         Records           Reviews
Framework                          Findings          Performance

└──────┬──────────────────────────────────────────────────────┬──────┘
       │                   ONE CYCLE                           │
       │              (Typical: 2-4 weeks)                     │
       └───────────────────────────────────────────────────────┘
                               │
                               ▼
                          Next Cycle
```

---

## Use This Diagram During Demo

**When**: End of demo (Slide 0 reference point)

**How**:
1. Walk through top-to-bottom flow
2. "We just saw each of these steps live"
3. Connect back to personas demonstrated
4. Emphasize the continuous cycle

**Key Message**:
"All roles connected, real-time visibility, continuous improvement"
