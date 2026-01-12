# FitnessPoint CI/CD Pipeline Diagram

## Complete Pipeline Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEVELOPER WORKFLOW                           │
│  git push / Pull Request → GitHub Repository                    │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│           CONTINUOUS INTEGRATION (CI) PIPELINE                  │
│                  Trigger: Push/PR to main/develop               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │   CLIENT     │  │   SERVER     │  │   SECURITY   │        │
│  │   BUILD      │  │   BUILD      │  │   AUDIT      │        │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤        │
│  │ • Checkout   │  │ • Checkout   │  │ • Checkout   │        │
│  │ • Setup      │  │ • Setup      │  │ • Setup      │        │
│  │   Node.js    │  │   Node.js    │  │   Node.js    │        │
│  │ • Install    │  │ • Install    │  │ • npm audit  │        │
│  │   deps       │  │   deps       │  │   (root)     │        │
│  │ • ESLint     │  │ • Type       │  │ • npm audit  │        │
│  │ • Type       │  │   Check      │  │   (server)   │        │
│  │   Check      │  │ • Build      │  │ • npm audit  │        │
│  │ • Build      │  │ • Upload     │  │   (client)   │        │
│  │ • Upload     │  │   Artifacts  │  │              │        │
│  │   Artifacts  │  │              │  │              │        │
│  └──────┬───────┘  └──────┬───────┘  └──────────────┘        │
│         │                  │                                    │
│         └────────┬─────────┘                                    │
│                  │                                              │
│         ┌────────▼─────────┐                                    │
│         │ All Jobs Pass?   │                                    │
│         └────────┬─────────┘                                    │
│                  │                                              │
│         ┌────────▼─────────┐                                    │
│         │   ✅ SUCCESS      │                                    │
│         │   ❌ FAILURE      │                                    │
│         └──────────────────┘                                    │
│                                                                 │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ ✅ All Checks Pass
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│        CONTINUOUS DEPLOYMENT (CD) PIPELINE                      │
│     Trigger: Push to main / Version tags / Manual              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────┐          │
│  │         BUILD & TEST STAGE                      │          │
│  ├─────────────────────────────────────────────────┤          │
│  │ • Checkout code                                 │          │
│  │ • Setup Node.js                                 │          │
│  │ • Install all dependencies                      │          │
│  │ • Build server                                  │          │
│  │ • Build client                                  │          │
│  │ • Upload artifacts (server-build, client-build)│          │
│  └───────────────────┬─────────────────────────────┘          │
│                      │                                          │
│         ┌────────────┴────────────┐                           │
│         │                         │                           │
│         ▼                         ▼                           │
│  ┌──────────────┐        ┌──────────────┐                    │
│  │   STAGING    │        │  PRODUCTION  │                    │
│  │  DEPLOYMENT  │        │  DEPLOYMENT  │                    │
│  ├──────────────┤        ├──────────────┤                    │
│  │ Trigger:     │        │ Trigger:     │                    │
│  │ Push to main │        │ Version tags │                    │
│  │              │        │ Manual       │                    │
│  │ • Download   │        │              │                    │
│  │   artifacts  │        │ • Download   │                    │
│  │ • Deploy to  │        │   artifacts  │                    │
│  │   staging    │        │ • Deploy to  │                    │
│  │   environment│        │   production │                    │
│  │              │        │ • Create     │                    │
│  │              │        │   GitHub     │                    │
│  │              │        │   Release    │                    │
│  └──────────────┘        └──────────────┘                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Pipeline Stages Breakdown

### CI Pipeline Stages

1. **Client Build Job**
   - Code checkout
   - Node.js setup (v18)
   - Dependency installation
   - ESLint (code quality)
   - TypeScript type checking
   - Production build
   - Artifact upload

2. **Server Build Job**
   - Code checkout
   - Node.js setup (v18)
   - Dependency installation
   - TypeScript type checking
   - Build compilation
   - Artifact upload

3. **Security Audit Job**
   - Dependency vulnerability scanning
   - Non-blocking warnings

4. **Integration Tests** (Future)
   - End-to-end testing
   - Currently disabled

### CD Pipeline Stages

1. **Build & Test**
   - Full project build
   - Artifact preparation

2. **Staging Deployment**
   - Automatic on push to main
   - Pre-production environment

3. **Production Deployment**
   - On version tags or manual
   - Live production environment
   - GitHub release creation

## Error Flow

```
┌─────────────────┐
│  Build Fails    │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│ GitHub Actions Dashboard│
│ • Red X status          │
│ • Detailed error logs   │
│ • Failed step highlighted│
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Developer Notification  │
│ • Email/Slack alert     │
│ • PR status check       │
│ • Commit status badge   │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Developer Fixes Issues  │
│ • Review error logs     │
│ • Fix locally           │
│ • Push fixes            │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Pipeline Re-runs        │
│ • Automatic trigger     │
│ • Validation repeats    │
└─────────────────────────┘
```

## Timeline Estimates

- **CI Pipeline:** 2-3 minutes (parallel execution)
  - Client Build: ~2 minutes
  - Server Build: ~1 minute
  - Security Audit: ~30 seconds

- **CD Pipeline:** 3-5 minutes
  - Build & Test: ~2 minutes
  - Deployment: ~1-3 minutes (depends on deployment method)

## Environment Configuration

### Staging Environment
- **URL:** https://staging.fitnesspoint.example.com
- **Purpose:** Pre-production testing
- **Access:** Development & QA teams
- **Auto-deploy:** On push to main

### Production Environment
- **URL:** https://fitnesspoint.example.com
- **Purpose:** Live production
- **Access:** End users
- **Auto-deploy:** On version tags (v*)
- **Manual deploy:** Available via workflow dispatch



