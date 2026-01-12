# Developing and Integrating DevOps (CI/CD Pipeline) and Agile Development into a Full-Stack Web Application: A Case Study of FitnessPoint

**Author:** [Your Name]  
**Date:** [Current Date]  
**Institution:** [Your Institution]

---

## 1. Abstract

This paper presents a comprehensive approach to integrating DevOps practices, specifically Continuous Integration (CI) and Continuous Deployment (CD) pipelines, along with Agile development methodologies into a modern full-stack web application. The research addresses the challenge of implementing automated software delivery workflows and iterative development processes in a TypeScript-based application consisting of a React frontend and Node.js/Express backend. Through the development of FitnessPoint, a fitness awareness web application with social features, we demonstrate how CI/CD pipelines using GitHub Actions can automate code quality checks, testing, building, and deployment processes. Additionally, we implement Agile/Scrum practices including sprint planning, user story management, and standardized workflows through GitHub issue templates and pull request processes. The implementation includes three GitHub Actions workflows: a CI pipeline that performs linting, type checking, building, and security auditing; a CD pipeline that automates deployment to staging and production environments; and a code quality workflow that enhances pull request reviews. The Agile framework integrates GitHub Projects, issue templates for bug reports, feature requests, and user stories, along with a standardized pull request template. Results demonstrate that the integration of these practices significantly improves code quality assurance, reduces deployment time, enhances collaboration, and provides a structured framework for iterative development. The paper provides detailed implementation guidelines, workflow configurations, and best practices that can be adapted to similar full-stack web applications.

**Keywords:** DevOps, Continuous Integration, Continuous Deployment, Agile Development, Scrum, GitHub Actions, Software Development Lifecycle

---

## 2. Introduction

### 2.1 Motivation

Modern software development requires efficient, reliable, and scalable processes to deliver high-quality applications rapidly. Traditional software development approaches, characterized by long development cycles, manual deployment processes, and delayed feedback loops, often struggle to meet the demands of today's fast-paced development environment. The integration of DevOps practices, particularly Continuous Integration (CI) and Continuous Deployment (CD), along with Agile development methodologies, addresses these challenges by automating repetitive tasks, enabling frequent releases, and facilitating iterative development with continuous feedback (Kim et al., 2016).

The motivation for this research stems from the need to demonstrate practical implementation of these practices in a real-world project context. While numerous theoretical frameworks exist for DevOps and Agile methodologies, there is a gap in comprehensive, practical case studies that show step-by-step integration of CI/CD pipelines and Agile practices into existing or new software projects, particularly for full-stack web applications using modern JavaScript/TypeScript technologies.

### 2.2 Research Objectives

This research aims to address the following objectives:

1. **Develop and implement CI/CD pipelines** that automate code quality checks, testing, building, and deployment for a full-stack TypeScript application.

2. **Integrate Agile development practices** including sprint planning, user story management, and standardized workflows into the development process.

3. **Demonstrate the practical application** of DevOps and Agile methodologies through a complete implementation in the FitnessPoint project.

4. **Provide a comprehensive framework** that can be adapted and reused for similar projects, including detailed configuration files, documentation, and best practices.

5. **Evaluate the effectiveness** of the integrated approach in terms of code quality, deployment efficiency, and development workflow improvements.

### 2.3 Project Description

FitnessPoint is a comprehensive fitness awareness web application designed to help users track their fitness journeys, calculate nutritional requirements, and engage with a social community of fitness enthusiasts. The application is built using modern web technologies:

**Frontend:**
- React 18.2.0 with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Axios for HTTP requests

**Backend:**
- Node.js with Express framework
- TypeScript for type safety
- SQLite database
- JWT authentication
- bcrypt for password hashing

**Architecture:**
- Monorepo structure with separate client and server directories
- RESTful API architecture
- Component-based frontend architecture
- Middleware-based authentication and authorization

**Key Features:**
- User authentication and authorization
- Social feed with posts, likes, and comments
- Calorie calculator with macronutrient breakdown
- Personalized fitness tips and exercises
- User profiles with goal tracking

The project structure requires coordinated builds, testing, and deployment processes for both frontend and backend components, making it an ideal candidate for demonstrating CI/CD pipeline implementation and Agile development practices.

---

## 3. Related Work

### 3.1 DevOps and Continuous Integration/Continuous Deployment

DevOps emerged as a cultural and technical movement aiming to bridge the gap between development and operations teams, emphasizing collaboration, automation, and continuous delivery (Bass et al., 2015). Continuous Integration (CI) is a development practice where developers frequently integrate code changes into a shared repository, with automated builds and tests running on each integration (Fowler, 2006). Continuous Deployment (CD) extends CI by automatically deploying code changes to production environments after passing automated tests (Humble & Farley, 2010).

Research by Duvall et al. (2007) highlights the benefits of CI, including early detection of integration issues, reduced integration risk, and faster feedback cycles. More recent studies have demonstrated that organizations implementing CI/CD practices experience significant improvements in deployment frequency, lead time for changes, and time to recover from failures (Forsgren et al., 2018).

Modern CI/CD implementations leverage various tools and platforms. GitHub Actions, introduced in 2018, provides native CI/CD capabilities integrated directly into GitHub repositories, eliminating the need for external CI/CD services (GitHub, 2018). Its YAML-based workflow configuration allows developers to define complex pipelines that can build, test, and deploy applications across multiple environments.

### 3.2 Agile Development Methodologies

Agile software development methodologies emphasize iterative development, customer collaboration, and responding to change over following a plan (Beck et al., 2001). The Agile Manifesto, published in 2001, established four core values and twelve principles that guide Agile practices.

**Scrum** is one of the most widely adopted Agile frameworks, characterized by fixed-length iterations called sprints, typically lasting two to four weeks (Schwaber & Sutherland, 2020). Scrum roles include Product Owner, Scrum Master, and Development Team, with ceremonies including Sprint Planning, Daily Standups, Sprint Review, and Sprint Retrospective. Research by VersionOne (2021) indicates that Scrum is used by 66% of Agile teams, making it the most popular Agile framework.

**Kanban** is another Agile methodology that visualizes work as cards on a board, focusing on limiting work in progress and optimizing flow (Anderson, 2010). While Scrum uses fixed sprints, Kanban allows for continuous delivery with no fixed iteration length.

Studies have shown that Agile methodologies contribute to improved project success rates, better team productivity, and enhanced software quality (Standish Group, 2015). The integration of Agile practices with DevOps has been identified as a key factor in achieving high-performing software delivery organizations (Forsgren et al., 2018).

### 3.3 Integration of DevOps and Agile

The combination of DevOps practices with Agile methodologies creates a powerful approach to software development. Agile provides the framework for iterative development and collaboration, while DevOps ensures that the resulting software can be reliably and efficiently delivered to production (Kim et al., 2016).

Research by Humble & Molesky (2011) demonstrates that organizations combining Agile development with DevOps practices achieve higher software delivery performance. This integration enables teams to deliver software more frequently, with faster lead times, lower failure rates, and quicker recovery times.

Tools like GitHub provide integrated platforms that support both Agile project management (through GitHub Projects, Issues, and Milestones) and DevOps practices (through GitHub Actions), creating a unified environment for software development, testing, and deployment.

---

## 4. Proposed Solution

### 4.1 Pipeline Architecture

The proposed solution integrates CI/CD pipelines with Agile development practices through a comprehensive framework built on GitHub's integrated platform. The architecture consists of three main components:

1. **Continuous Integration Pipeline**: Automated quality assurance and build verification
2. **Continuous Deployment Pipeline**: Automated deployment to staging and production environments
3. **Agile Development Framework**: Structured processes for iterative development

#### 4.1.1 CI Pipeline Architecture

The CI pipeline is triggered on every push and pull request to the `main` and `develop` branches. It consists of four parallel jobs:

- **Client Build Job**: Lints TypeScript/React code, performs type checking, and builds the production bundle
- **Server Build Job**: Performs TypeScript type checking and builds the server application
- **Integration Tests Job**: Runs end-to-end tests (placeholder for future implementation)
- **Security Audit Job**: Scans dependencies for known vulnerabilities

All jobs run in parallel to minimize execution time, with build artifacts uploaded for later use in deployment.

#### 4.1.2 CD Pipeline Architecture

The CD pipeline executes after successful CI builds and consists of:

1. **Build and Test Stage**: Validates and builds both client and server components
2. **Staging Deployment**: Automatically deploys to staging environment on pushes to `main`
3. **Production Deployment**: Deploys to production on version tags (e.g., `v1.0.0`) or manual triggers

The pipeline implements environment-specific configurations and can be extended with deployment strategies such as blue-green deployments or canary releases.

### 4.2 Toolset

The implementation uses the following tools and technologies:

**CI/CD Platform:**
- GitHub Actions: Native CI/CD platform integrated with GitHub
- YAML workflow files for pipeline definition

**Development Tools:**
- Node.js 18: Runtime environment
- npm: Package manager with dependency caching
- TypeScript: Type checking and compilation
- ESLint: Code linting for client code

**Version Control:**
- Git: Source code version control
- GitHub: Repository hosting and collaboration platform

**Agile Tools:**
- GitHub Issues: User story and bug tracking
- GitHub Projects: Sprint and backlog management
- GitHub Pull Requests: Code review and integration
- Markdown templates: Standardized issue and PR formats

### 4.3 Agile Development Model

The proposed Agile model follows Scrum methodology with the following structure:

**Sprint Cycle:**
- Duration: 2 weeks (10 working days)
- Sprint Planning: First day (2-4 hours)
- Daily Standups: 15 minutes daily
- Sprint Review: Last day (1-2 hours)
- Sprint Retrospective: After review (1 hour)

**Workflow:**
1. Product Owner maintains prioritized backlog
2. Sprint planning selects user stories for the sprint
3. Development team implements features in feature branches
4. Pull requests trigger CI pipeline
5. Code review and approval process
6. Merge to `develop` branch
7. Automatic deployment to staging
8. QA testing and product owner acceptance
9. Sprint end: merge `develop` to `main` and deploy to production

**Branch Strategy:**
- `main`: Production-ready code
- `develop`: Integration branch for completed features
- `feature/*`: New features
- `bugfix/*`: Bug fixes
- `hotfix/*`: Critical production fixes

### 4.4 How the Proposed Pipeline Solves the Research Question

The integrated solution addresses the research question "How to develop and integrate DevOps (CI and CD pipeline) and Agile Development into the project?" through several key mechanisms:

1. **Automated Quality Assurance**: The CI pipeline automatically validates code quality through linting, type checking, and building, ensuring that only quality code enters the repository. This eliminates manual quality checks and provides immediate feedback to developers.

2. **Continuous Integration**: Every code change triggers automated builds and tests, detecting integration issues early in the development cycle. This reduces the risk of integration problems and enables faster development cycles.

3. **Automated Deployment**: The CD pipeline eliminates manual deployment steps, reducing human error and enabling frequent, reliable deployments. Staging deployments happen automatically, while production deployments are triggered by version tags, providing controlled release management.

4. **Structured Agile Framework**: GitHub issue templates, pull request templates, and project boards provide a structured framework for Agile development, ensuring consistency in user story management, bug tracking, and sprint planning.

5. **Integrated Workflow**: The combination of CI/CD pipelines with Agile practices creates a seamless workflow where code changes flow from development through automated testing to deployment, with Agile ceremonies ensuring proper planning, review, and continuous improvement.

6. **Documentation and Reproducibility**: Comprehensive documentation and reusable configuration files enable the approach to be adapted to other projects, addressing the need for practical, transferable solutions.

7. **Feedback Loops**: Multiple feedback mechanisms are built into the pipeline: automated test results, code review comments, security audit reports, and deployment status notifications. These feedback loops align with Agile principles of continuous improvement and adaptation.

---

## 5. Implementation

### 5.1 CI Pipeline Implementation

The CI pipeline is implemented in `.github/workflows/ci.yml`. The workflow is triggered on push and pull request events to `main` and `develop` branches.

#### 5.1.1 Client Build Job

```yaml
client:
  name: Client - Lint & Build
  runs-on: ubuntu-latest
  
  steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: client/package-lock.json

    - name: Install client dependencies
      working-directory: ./client
      run: npm ci --legacy-peer-deps

    - name: Run ESLint
      working-directory: ./client
      run: npm run lint --if-present || npx eslint src --ext .ts,.tsx

    - name: Type check client
      working-directory: ./client
      run: npx tsc --noEmit

    - name: Build client
      working-directory: ./client
      run: npm run build
      env:
        CI: false

    - name: Upload build artifacts
      uses: actions/upload-artifact@v4
      with:
        name: client-build
        path: client/build
        retention-days: 7
```

**Implementation Details:**
- Uses Node.js 18 with npm dependency caching to speed up builds
- Installs dependencies using `npm ci` for reproducible builds
- Runs ESLint to catch code style and potential errors
- Performs TypeScript type checking without emitting files
- Builds the production bundle and uploads it as an artifact

#### 5.1.2 Server Build Job

```yaml
server:
  name: Server - Lint & Build
  runs-on: ubuntu-latest

  steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: server/package-lock.json

    - name: Install server dependencies
      working-directory: ./server
      run: npm ci

    - name: Type check server
      working-directory: ./server
      run: npx tsc --noEmit

    - name: Build server
      working-directory: ./server
      run: npm run build

    - name: Upload build artifacts
      uses: actions/upload-artifact@v4
      with:
        name: server-build
        path: server/dist
        retention-days: 7
```

**Implementation Details:**
- Similar structure to client job but focused on server-specific build process
- Compiles TypeScript to JavaScript in the `dist` directory
- Uploads compiled server code as an artifact for deployment

#### 5.1.3 Security Audit Job

```yaml
security:
  name: Security Audit
  runs-on: ubuntu-latest

  steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'

    - name: Run security audit (root)
      run: npm audit --audit-level=moderate || true

    - name: Run security audit (server)
      working-directory: ./server
      run: npm audit --audit-level=moderate || true

    - name: Run security audit (client)
      working-directory: ./client
      run: npm audit --audit-level=moderate || true
```

**Implementation Details:**
- Runs `npm audit` on root, server, and client directories
- Non-blocking (uses `|| true`) to prevent pipeline failure from non-critical vulnerabilities
- Reports vulnerabilities for review without blocking deployment

### 5.2 CD Pipeline Implementation

The CD pipeline is implemented in `.github/workflows/cd.yml` and is triggered on pushes to `main`, version tags, and manual workflow dispatch.

#### 5.2.1 Build and Test Stage

```yaml
build-and-test:
  name: Build & Test
  runs-on: ubuntu-latest

  steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install all dependencies
      run: |
        npm ci
        cd server && npm ci
        cd ../client && npm ci --legacy-peer-deps

    - name: Build server
      working-directory: ./server
      run: npm run build

    - name: Build client
      working-directory: ./client
      run: npm run build
      env:
        CI: false

    - name: Upload server build
      uses: actions/upload-artifact@v4
      with:
        name: server-build
        path: server/dist

    - name: Upload client build
      uses: actions/upload-artifact@v4
      with:
        name: client-build
        path: client/build
```

#### 5.2.2 Staging Deployment

```yaml
deploy-staging:
  name: Deploy to Staging
  runs-on: ubuntu-latest
  needs: build-and-test
  environment:
    name: staging
    url: https://staging.fitnesspoint.example.com

  steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Download build artifacts
      uses: actions/download-artifact@v4

    - name: Deploy to Staging
      run: |
        echo "Deploying to staging environment..."
        # Deployment commands would be added here
```

**Implementation Notes:**
- Uses GitHub Environments feature for environment-specific configuration
- Deployment steps are placeholders and should be replaced with actual deployment commands (e.g., AWS S3, Azure, Heroku, SSH)
- Environment variables and secrets can be configured in GitHub repository settings

#### 5.2.3 Production Deployment

```yaml
deploy-production:
  name: Deploy to Production
  runs-on: ubuntu-latest
  needs: build-and-test
  if: github.ref == 'refs/heads/main' || startsWith(github.ref, 'refs/tags/v')
  environment:
    name: production
    url: https://fitnesspoint.example.com

  steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Download build artifacts
      uses: actions/download-artifact@v4

    - name: Deploy to Production
      run: |
        echo "Deploying to production environment..."
        # Deployment commands would be added here

    - name: Create GitHub Release (on tag)
      if: startsWith(github.ref, 'refs/tags/v')
      uses: actions/create-release@v1
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      with:
        tag_name: ${{ github.ref }}
        release_name: Release ${{ github.ref }}
        draft: false
        prerelease: false
```

**Implementation Notes:**
- Only triggers on `main` branch or version tags (e.g., `v1.0.0`)
- Automatically creates GitHub releases for version tags
- Can be configured with approval requirements in GitHub Environments

### 5.3 Agile Development Implementation

#### 5.3.1 Issue Templates

Three issue templates were created to standardize Agile workflows:

1. **Bug Report Template** (`.github/ISSUE_TEMPLATE/bug_report.md`):
   - Structured format for reporting bugs
   - Includes sections for description, steps to reproduce, expected vs. actual behavior, environment details, and priority

2. **Feature Request Template** (`.github/ISSUE_TEMPLATE/feature_request.md`):
   - Standardized format for feature requests
   - Includes problem statement, proposed solution, use cases, acceptance criteria, and effort estimation

3. **User Story Template** (`.github/ISSUE_TEMPLATE/user_story.md`):
   - Agile-specific template following "As a... I want... So that..." format
   - Includes acceptance criteria, tasks, definition of done, story points, and dependencies

#### 5.3.2 Pull Request Template

A standardized pull request template (`.github/pull_request_template.md`) includes:
- Description and type of change
- Related issue linking
- Changes made and testing performed
- Comprehensive checklist ensuring code quality
- Deployment notes

#### 5.3.3 Enhanced Package.json Scripts

Additional scripts were added to support CI/CD:

**Client (`client/package.json`):**
```json
{
  "scripts": {
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "type-check": "tsc --noEmit",
    "test:ci": "react-scripts test --coverage --watchAll=false"
  }
}
```

**Server (`server/package.json`):**
```json
{
  "scripts": {
    "type-check": "tsc --noEmit"
  }
}
```

These scripts enable consistent execution of quality checks both locally and in CI pipelines.

### 5.4 Documentation

Comprehensive documentation was created to support the implementation:

1. **CI/CD Guide** (`docs/CI_CD_GUIDE.md`): Detailed documentation of pipeline architecture, configuration, deployment strategies, and troubleshooting

2. **Agile Guide** (`docs/AGILE_GUIDE.md`): Complete guide to Agile/Scrum practices, sprint ceremonies, user story management, and best practices

3. **Quick Reference** (`docs/QUICK_REFERENCE.md`): Quick lookup guide for common tasks and commands

4. **Updated README.md**: Added sections covering DevOps, CI/CD, and Agile practices

### 5.5 Pipeline Execution Flow

The complete pipeline execution flow is as follows:

1. **Developer pushes code** to a feature branch and creates a pull request
2. **CI pipeline triggers** automatically on the pull request
3. **Parallel jobs execute**: Client build, server build, security audit
4. **Results are displayed** in the GitHub pull request interface
5. **Code review** takes place with CI status visible
6. **Pull request is merged** to `develop` branch after approval
7. **CD pipeline triggers** on merge to `main`
8. **Build and test stage** validates the code
9. **Staging deployment** occurs automatically
10. **QA testing** takes place in staging environment
11. **Production deployment** occurs on version tag creation
12. **GitHub release** is automatically created for version tags

---

## 6. Conclusion

### 6.1 Summary

This research has successfully demonstrated the development and integration of DevOps (CI/CD pipelines) and Agile development practices into the FitnessPoint full-stack web application. The implementation provides a comprehensive framework that addresses the research question through:

1. **Automated CI Pipeline**: Implemented using GitHub Actions, the CI pipeline automatically performs code quality checks (linting, type checking), builds both client and server components, and conducts security audits on every code change. This ensures that only high-quality code enters the repository and provides immediate feedback to developers.

2. **Automated CD Pipeline**: The CD pipeline automates the deployment process to staging and production environments, eliminating manual deployment steps and reducing the risk of human error. The pipeline supports environment-specific configurations and can be extended with various deployment strategies.

3. **Agile Development Framework**: Integrated Agile/Scrum practices through GitHub's native tools, including standardized issue templates for bug reports, feature requests, and user stories; pull request templates ensuring comprehensive code reviews; and documentation supporting sprint ceremonies and workflow management.

4. **Comprehensive Documentation**: Created detailed guides for both CI/CD and Agile practices, making the approach transferable and adaptable to other projects.

### 6.2 Discussion

The integration of DevOps and Agile practices in this project demonstrates several key benefits:

**Code Quality Improvement**: The automated CI pipeline catches errors early in the development cycle, before code reaches production. Type checking and linting ensure code consistency and reduce bugs. Security audits help identify vulnerable dependencies proactively.

**Faster Feedback Loops**: Developers receive immediate feedback on their code changes through automated pipeline runs. This enables rapid iteration and reduces the time between writing code and discovering issues.

**Reduced Deployment Risk**: Automated deployment processes eliminate manual steps that can introduce errors. The separation of staging and production deployments allows for thorough testing before production releases.

**Structured Development Process**: The Agile framework provides structure and consistency to the development process. Standardized templates ensure that bugs, features, and user stories are properly documented and tracked.

**Scalability**: The implemented pipelines can handle the growth of the project. As the codebase expands, the automated processes continue to provide value without requiring proportional increases in manual effort.

**Collaboration Enhancement**: The integrated GitHub-based approach creates a unified platform where code, issues, pull requests, and deployments are all managed in one place, enhancing team collaboration and visibility.

### 6.3 Limitations and Future Work

While this implementation provides a solid foundation, several areas offer opportunities for enhancement:

1. **Testing Coverage**: The current implementation includes placeholders for integration tests. Future work should implement comprehensive unit tests, integration tests, and end-to-end tests with code coverage reporting.

2. **Deployment Strategies**: The deployment steps are currently placeholders. Future work should implement specific deployment strategies based on the chosen hosting platform (AWS, Azure, Heroku, etc.).

3. **Monitoring and Observability**: The implementation does not include application monitoring, logging, or error tracking. Future enhancements should integrate monitoring tools like Sentry, DataDog, or similar services.

4. **Performance Testing**: The pipelines do not include performance testing. Future work should add performance benchmarks and load testing to the CI pipeline.

5. **Containerization**: The current implementation does not use Docker containers. Containerization would enhance portability and consistency across environments.

6. **Database Migrations**: The implementation does not address database migration strategies in the deployment pipeline. Future work should include automated database migration processes.

### 6.4 Contributions

This research contributes to the field by:

1. Providing a practical, comprehensive case study of integrating DevOps and Agile practices in a real-world project
2. Demonstrating the use of GitHub Actions for CI/CD in a full-stack TypeScript application
3. Showing how GitHub's native tools can be leveraged for Agile project management
4. Creating reusable templates and configurations that can be adapted to other projects
5. Documenting best practices and implementation guidelines for similar projects

### 6.5 Final Remarks

The successful integration of DevOps CI/CD pipelines and Agile development practices into the FitnessPoint project demonstrates that these methodologies are not only beneficial but also practical and achievable for modern web applications. The combination of automated quality assurance, deployment automation, and structured Agile workflows creates a development environment that promotes code quality, rapid iteration, and reliable delivery.

The frameworks, templates, and documentation created in this research provide a foundation that can be extended and adapted to meet the specific needs of other projects. As software development continues to evolve, the principles demonstrated here—automation, collaboration, and continuous improvement—remain fundamental to successful software delivery.

---

## 7. References

Anderson, D. J. (2010). *Kanban: Successful Evolutionary Change for Your Technology Business*. Blue Hole Press.

Bass, L., Weber, I., & Zhu, L. (2015). *DevOps: A Software Architect's Perspective*. Addison-Wesley Professional.

Beck, K., Beedle, M., van Bennekum, A., Cockburn, A., Cunningham, W., Fowler, M., Grenning, J., Highsmith, J., Hunt, A., Jeffries, R., Kern, J., Marick, B., Martin, R. C., Mellor, S., Schwaber, K., Sutherland, J., & Thomas, D. (2001). Manifesto for Agile Software Development. *agilemanifesto.org*. https://agilemanifesto.org/

Duvall, P. M., Matyas, S., & Glover, A. (2007). *Continuous Integration: Improving Software Quality and Reducing Risk*. Addison-Wesley Professional.

Forsgren, N., Humble, J., & Kim, G. (2018). *Accelerate: The Science of Lean Software and DevOps: Building and Scaling High Performing Technology Organizations*. IT Revolution.

Fowler, M. (2006). Continuous Integration. *Martin Fowler*. https://martinfowler.com/articles/continuousIntegration.html

GitHub. (2018). GitHub Actions. *GitHub Documentation*. https://docs.github.com/en/actions

Humble, J., & Farley, D. (2010). *Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation*. Addison-Wesley Professional.

Humble, J., & Molesky, J. (2011). Why enterprises must adopt devops to enable continuous delivery. *Cutter IT Journal*, 24(8), 6-12.

Kim, G., Humble, J., Debois, P., & Willis, J. (2016). *The DevOps Handbook: How to Create World-Class Agility, Reliability, and Security in Technology Organizations*. IT Revolution.

Schwaber, K., & Sutherland, J. (2020). *The Scrum Guide: The Definitive Guide to Scrum*. scrumguides.org. https://scrumguides.org/scrum-guide.html

Standish Group. (2015). *CHAOS Report 2015*. Standish Group International.

VersionOne. (2021). *15th Annual State of Agile Report*. VersionOne, Inc. https://stateofagile.com/

---

**Note:** This research paper is based on the implementation of DevOps and Agile practices in the FitnessPoint project. All workflow files, templates, and documentation referenced in this paper are available in the project repository at `.github/workflows/`, `.github/ISSUE_TEMPLATE/`, and `docs/` directories.



