# CI/CD Pipeline Guide for FitnessPoint

This guide explains the Continuous Integration (CI) and Continuous Deployment (CD) pipelines configured for the FitnessPoint project.

## Table of Contents
- [Overview](#overview)
- [CI Pipeline](#ci-pipeline)
- [CD Pipeline](#cd-pipeline)
- [Workflow Files](#workflow-files)
- [Pipeline Configuration](#pipeline-configuration)
- [Environment Setup](#environment-setup)
- [Deployment Strategies](#deployment-strategies)
- [Troubleshooting](#troubleshooting)

## Overview

FitnessPoint uses GitHub Actions for CI/CD, automating:
- **Continuous Integration:** Code quality checks, linting, type checking, building
- **Continuous Deployment:** Automated deployment to staging and production environments

## CI Pipeline

### Trigger Events
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

### Jobs

#### 1. Client - Lint & Build
- **Purpose:** Validate and build the React client application
- **Steps:**
  1. Checkout code
  2. Setup Node.js (version 18) with npm cache
  3. Install dependencies (`npm ci --legacy-peer-deps`)
  4. Run ESLint
  5. Type check TypeScript
  6. Build production bundle
  7. Upload build artifacts

#### 2. Server - Lint & Build
- **Purpose:** Validate and build the Node.js server application
- **Steps:**
  1. Checkout code
  2. Setup Node.js (version 18) with npm cache
  3. Install dependencies (`npm ci`)
  4. Type check TypeScript
  5. Build TypeScript to JavaScript
  6. Upload build artifacts

#### 3. Integration Tests
- **Purpose:** Run end-to-end integration tests
- **Status:** Currently disabled (set `if: true` when tests are added)
- **Steps:**
  1. Install all dependencies
  2. Download build artifacts
  3. Run integration test suite

#### 4. Security Audit
- **Purpose:** Check for known security vulnerabilities
- **Steps:**
  1. Run `npm audit` on root, server, and client packages
  2. Report vulnerabilities (non-blocking)

### Viewing CI Results
1. Go to your GitHub repository
2. Click on "Actions" tab
3. Select a workflow run to see detailed logs
4. Check individual job status and logs

## CD Pipeline

### Trigger Events
- Push to `main` branch
- Version tags (e.g., `v1.0.0`)
- Manual workflow dispatch with environment selection

### Jobs

#### 1. Build & Test
- **Purpose:** Build all artifacts before deployment
- **Steps:**
  1. Checkout code
  2. Setup Node.js
  3. Install all dependencies
  4. Build server and client
  5. Upload build artifacts

#### 2. Deploy to Staging
- **Purpose:** Deploy to staging environment
- **Trigger:** Runs after successful build
- **Environment:** `staging`
- **Steps:**
  1. Download build artifacts
  2. Deploy to staging (configure with your deployment method)

#### 3. Deploy to Production
- **Purpose:** Deploy to production environment
- **Trigger:** Only on `main` branch or version tags
- **Environment:** `production`
- **Steps:**
  1. Download build artifacts
  2. Deploy to production
  3. Create GitHub release (on version tags)

### Deployment Environments

#### Staging Environment
- **Purpose:** Pre-production testing environment
- **URL:** Configure in workflow file (default: `https://staging.fitnesspoint.example.com`)
- **Access:** Development and QA teams

#### Production Environment
- **Purpose:** Live production environment
- **URL:** Configure in workflow file (default: `https://fitnesspoint.example.com`)
- **Access:** End users
- **Protection:** Requires approval if branch protection rules are enabled

## Workflow Files

### `.github/workflows/ci.yml`
- **Purpose:** Continuous Integration pipeline
- **Runs on:** Push and pull requests to main/develop
- **Jobs:** Client build, Server build, Integration tests, Security audit

### `.github/workflows/cd.yml`
- **Purpose:** Continuous Deployment pipeline
- **Runs on:** Push to main, version tags, manual trigger
- **Jobs:** Build & Test, Deploy to Staging, Deploy to Production

### `.github/workflows/code-quality.yml`
- **Purpose:** Additional code quality checks
- **Runs on:** Pull requests and pushes to main/develop
- **Jobs:** Code quality analysis, linting, type checking

## Pipeline Configuration

### Node.js Version
All workflows use Node.js version 18. To change:
```yaml
node-version: '18'  # Change to '20', '16', etc.
```

### Caching
npm dependencies are cached to speed up builds:
```yaml
cache: 'npm'
cache-dependency-path: client/package-lock.json
```

### Artifacts
Build artifacts are stored for 7 days:
- Client build: `client/build/`
- Server build: `server/dist/`

## Environment Setup

### GitHub Secrets
Configure these secrets in GitHub repository settings:

#### For Deployment (examples - adjust based on your platform)

**AWS Deployment:**
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `S3_BUCKET_NAME` (for static hosting)

**Azure Deployment:**
- `AZURE_WEBAPP_PUBLISH_PROFILE`
- `AZURE_WEBAPP_NAME`

**Heroku Deployment:**
- `HEROKU_API_KEY`
- `HEROKU_APP_NAME`

**SSH Deployment:**
- `SSH_PRIVATE_KEY`
- `SSH_HOST`
- `SSH_USER`

**Vercel/Netlify:**
- `VERCEL_TOKEN` / `NETLIFY_AUTH_TOKEN`
- `VERCEL_ORG_ID` / `NETLIFY_SITE_ID`

### Environment Variables
Configure environment-specific variables in GitHub Environments:

1. Go to repository Settings → Environments
2. Create environments: `staging` and `production`
3. Add environment variables:
   - `NODE_ENV`
   - `API_URL`
   - `DATABASE_URL` (if applicable)
   - Other environment-specific variables

### Environment Protection Rules
For production environment, consider adding:
- Required reviewers
- Wait timer
- Deployment branches (only `main`)

## Deployment Strategies

### Option 1: Static Hosting (Client) + Cloud Functions (Server)

**Client (Vercel/Netlify):**
```yaml
- name: Deploy to Vercel
  uses: amondnet/vercel-action@v20
  with:
    vercel-token: ${{ secrets.VERCEL_TOKEN }}
    vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
    vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
    working-directory: ./client
```

**Server (AWS Lambda/Azure Functions):**
- Deploy server as serverless functions
- Use serverless framework or platform-specific tools

### Option 2: Container Deployment (Docker)

1. Create `Dockerfile` for client and server
2. Build and push to container registry
3. Deploy to container orchestration platform (Kubernetes, ECS, etc.)

**Example Dockerfile additions needed:**
```dockerfile
# server/Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
CMD ["node", "dist/index.js"]
```

### Option 3: Traditional Server Deployment (SSH)

```yaml
- name: Deploy via SSH
  uses: appleboy/ssh-action@master
  with:
    host: ${{ secrets.SSH_HOST }}
    username: ${{ secrets.SSH_USER }}
    key: ${{ secrets.SSH_PRIVATE_KEY }}
    script: |
      cd /var/www/fitnesspoint
      git pull origin main
      npm install
      cd server && npm install && npm run build
      cd ../client && npm install && npm run build
      pm2 restart fitnesspoint
```

### Option 4: Platform-as-a-Service (PaaS)

**Heroku Example:**
```yaml
- name: Deploy to Heroku
  uses: akhileshns/heroku-deploy@v3.12.12
  with:
    heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
    heroku_app_name: ${{ secrets.HEROKU_APP_NAME }}
    heroku_email: ${{ secrets.HEROKU_EMAIL }}
```

## Adding Tests

When you add tests, update the CI pipeline:

### Client Tests
```yaml
- name: Run client tests
  working-directory: ./client
  run: npm test -- --coverage --watchAll=false
```

### Server Tests
```yaml
- name: Run server tests
  working-directory: ./server
  run: npm test -- --coverage
```

### Integration Tests
```yaml
- name: Run integration tests
  run: npm run test:integration
```

Enable the integration test job in `ci.yml`:
```yaml
if: true  # Change from false to true
```

## Troubleshooting

### CI Pipeline Fails

**Common Issues:**

1. **Dependency Installation Fails**
   - Check `package-lock.json` is committed
   - Verify Node.js version compatibility
   - Check for version conflicts

2. **Linting Errors**
   - Run linting locally: `cd client && npx eslint src`
   - Fix linting errors before pushing
   - Check ESLint configuration

3. **TypeScript Errors**
   - Run type check locally: `npx tsc --noEmit`
   - Fix type errors before pushing

4. **Build Failures**
   - Build locally to reproduce: `npm run build`
   - Check for missing dependencies
   - Verify environment variables

### CD Pipeline Fails

1. **Deployment Secrets Missing**
   - Verify secrets are configured in GitHub
   - Check secret names match workflow file

2. **Environment Not Configured**
   - Create environments in GitHub Settings
   - Configure environment variables

3. **Deployment Scripts**
   - Test deployment scripts locally first
   - Check deployment platform logs
   - Verify permissions and access

### Viewing Logs

1. Go to repository → Actions tab
2. Click on failed workflow run
3. Expand failed job
4. Check individual step logs
5. Look for error messages and stack traces

## Best Practices

1. **Keep Pipelines Fast**
   - Use caching for dependencies
   - Parallelize independent jobs
   - Only run necessary checks

2. **Fail Fast**
   - Run quick checks first (linting, type checking)
   - Run slower checks (tests, builds) after quick checks pass

3. **Security**
   - Never commit secrets to repository
   - Use GitHub Secrets for sensitive data
   - Enable dependency vulnerability scanning
   - Use least-privilege access for deployment

4. **Monitoring**
   - Set up notifications for failed pipelines
   - Monitor deployment success rates
   - Track pipeline execution times

5. **Documentation**
   - Document deployment procedures
   - Keep environment variables documented
   - Update this guide as processes change

## Next Steps

1. **Configure Deployment:**
   - Choose deployment platform
   - Set up GitHub Secrets
   - Configure environment variables
   - Update deployment steps in `cd.yml`

2. **Add Testing:**
   - Write unit tests for client and server
   - Add integration tests
   - Enable test jobs in CI pipeline
   - Set up code coverage reporting

3. **Enhance Pipelines:**
   - Add performance testing
   - Set up automated security scanning
   - Configure notifications (Slack, email)
   - Add deployment rollback procedures

4. **Monitoring:**
   - Set up application monitoring (e.g., Sentry)
   - Configure uptime monitoring
   - Set up error tracking
   - Create deployment dashboards

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Actions Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [GitHub Environments](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)

---

**Last Updated:** [Current Date]  
**Version:** 1.0



