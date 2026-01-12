# GitHub Actions Navigation Guide

## Visual Map: How to Navigate GitHub Actions

```
┌─────────────────────────────────────────────────────────────┐
│                  GitHub Repository                          │
│  [Code] [Issues] [Pull requests] [Actions] [Projects] ...  │
│                                                             │
│                    Click Here →                            │
│                   ┌───────────┐                            │
│                   │  Actions  │                            │
│                   └───────────┘                            │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    ACTIONS TAB                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Left Sidebar:              Main Area:                     │
│  ┌──────────────────┐      ┌──────────────────────────┐   │
│  │ All workflows    │      │ Workflow Runs            │   │
│  │                  │      │                          │   │
│  │ CI - Continuous  │      │ ✅ CI - CI #1234        │   │
│  │    Integration   │      │    main • 2 min ago     │   │
│  │                  │      │                          │   │
│  │ CD - Continuous  │      │ ✅ CI - CI #1233        │   │
│  │    Deployment    │      │    main • 1 hour ago    │   │
│  │                  │      │                          │   │
│  │ Code Quality     │      │ ✅ CD - CD #567         │   │
│  │    Checks        │      │    main • 3 min ago     │   │
│  └──────────────────┘      └──────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                           │
                    Click on a Run
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              WORKFLOW RUN DETAILS                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  CI - Continuous Integration #1234                         │
│  main • Commit message • 2 minutes ago                     │
│                                                             │
│  ┌──────────────────────────────────────────────────┐     │
│  │ Jobs:                                            │     │
│  │                                                  │     │
│  │  ✅ Client - Lint & Build  (2m 15s)            │     │
│  │     Click to expand →                          │     │
│  │                                                  │     │
│  │  ✅ Server - Lint & Build  (1m 30s)            │     │
│  │     Click to expand →                          │     │
│  │                                                  │     │
│  │  ✅ Security Audit  (45s)                      │     │
│  │     Click to expand →                          │     │
│  │                                                  │     │
│  └──────────────────────────────────────────────────┘     │
│                                                             │
│  Artifacts:                                                │
│  • client-build (5.2 MB) [Download]                       │
│  • server-build (2.1 MB) [Download]                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                           │
                    Click on a Job
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              JOB DETAILS                                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Client - Lint & Build  ✅                                  │
│                                                             │
│  ┌──────────────────────────────────────────────────┐     │
│  │ Steps:                                           │     │
│  │                                                  │     │
│  │  ✅ Checkout code (5s)                          │     │
│  │     Click to see logs →                         │     │
│  │                                                  │     │
│  │  ✅ Setup Node.js (10s)                         │     │
│  │     Click to see logs →                         │     │
│  │                                                  │     │
│  │  ✅ Install client dependencies (45s)           │     │
│  │     Click to see logs →                         │     │
│  │                                                  │     │
│  │  ✅ Run ESLint (30s)                            │     │
│  │     Click to see logs →                         │     │
│  │     Shows: Linting results, any errors          │     │
│  │                                                  │     │
│  │  ✅ Type check client (20s)                     │     │
│  │     Click to see logs →                         │     │
│  │     Shows: TypeScript compilation output        │     │
│  │                                                  │     │
│  │  ✅ Build client (25s)                          │     │
│  │     Click to see logs →                         │     │
│  │     Shows: Build output, file sizes             │     │
│  │                                                  │     │
│  │  ✅ Upload build artifacts (5s)                 │     │
│  │                                                  │     │
│  └──────────────────────────────────────────────────┘     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                           │
                    Click on a Step
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              STEP LOGS                                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Run ESLint                                                │
│                                                             │
│  ┌──────────────────────────────────────────────────┐     │
│  │ Run: npm run lint                                │     │
│  │                                                  │     │
│  │ Output:                                          │     │
│  │ ✓ No ESLint errors found                        │     │
│  │ ✓ All files pass linting                        │     │
│  │                                                  │     │
│  │ Files checked:                                   │     │
│  │ • src/App.tsx                                    │     │
│  │ • src/components/Navbar.tsx                      │     │
│  │ • src/components/Post.tsx                        │     │
│  │ ... (all TypeScript files)                       │     │
│  │                                                  │     │
│  └──────────────────────────────────────────────────┘     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Quick Navigation Reference

### To View Workflows:
```
Repository → Actions Tab → Select Workflow (left sidebar)
```

### To View a Run:
```
Actions Tab → Click on Workflow → Click on Run (main area)
```

### To View Job Details:
```
Workflow Run → Click on Job Name
```

### To View Step Logs:
```
Job Details → Click on Step Name → View Logs (expanded)
```

### To View Artifacts:
```
Workflow Run → Scroll Down → Artifacts Section
```

### To View Workflow Code:
```
Repository → Code Tab → .github/workflows/ → ci.yml (or cd.yml)
```

## Status Icons Explained

| Icon | Meaning | What It Means |
|------|---------|---------------|
| ✅ | Success | Everything completed successfully |
| ❌ | Failed | Something went wrong - check logs |
| 🟡 | In Progress | Currently running |
| ⏸️ | Cancelled | Was stopped before completion |
| ⚠️ | Warning | Completed but with warnings |

## What to Click For Each Feature

### To Show: **Automated Testing**
**Click:** Actions → CI workflow → Any run → Client job → ESLint step

### To Show: **Build Process**
**Click:** Actions → CI workflow → Any run → Client job → Build step

### To Show: **Parallel Execution**
**Click:** Actions → CI workflow → Any run → View all jobs (they show start/end times)

### To Show: **Build Artifacts**
**Click:** Actions → CI workflow → Any run → Scroll to bottom → Artifacts section

### To Show: **Error Handling**
**Click:** Actions → CI workflow → Failed run (red X) → Failed job → Failed step

### To Show: **Deployment**
**Click:** Actions → CD workflow → Any run → Deploy jobs

### To Show: **Configuration**
**Click:** Code → .github/workflows/ → ci.yml or cd.yml

## Breadcrumb Trail

When viewing a workflow run, you'll see a breadcrumb trail:

```
Actions > CI - Continuous Integration > #1234
```

This shows:
- **Actions** = You're in the Actions tab
- **CI - Continuous Integration** = Which workflow
- **#1234** = Which run

Use this to navigate back!

## Keyboard Shortcuts (Optional)

- `t` = Go to search/filter
- `/` = Focus search box
- `←` / `→` = Navigate between runs (when viewing a run)
- `j` / `k` = Navigate up/down in lists

## Common Views

### View 1: Workflow Run List
**Shows:** All runs of a specific workflow
**Found at:** Actions → Select workflow (left sidebar)

### View 2: Single Run Summary
**Shows:** Overview of one run with all jobs
**Found at:** Click on a run from the list

### View 3: Job Details
**Shows:** All steps in a job
**Found at:** Click on a job name from run summary

### View 4: Step Logs
**Shows:** Detailed output from one step
**Found at:** Click on a step name from job details

### View 5: Timeline View
**Shows:** Visual timeline of when jobs ran
**Found at:** Some workflow runs have a "Timeline" tab

---

**Pro Tip:** Start at the Actions tab, then drill down: Workflow → Run → Job → Step → Logs



