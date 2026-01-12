# DevOps & Agile Quick Reference

Quick reference guide for CI/CD and Agile practices in FitnessPoint.

## CI/CD Quick Start

### Viewing Pipeline Status
1. Go to GitHub repository
2. Click "Actions" tab
3. View workflow runs and their status

### Local CI Checks (Before Pushing)

**Client:**
```bash
cd client
npm run lint          # Check for linting errors
npm run type-check    # Type check TypeScript
npm run build         # Verify build works
```

**Server:**
```bash
cd server
npm run type-check    # Type check TypeScript
npm run build         # Verify build works
```

### Triggering Deployments

**Staging:**
- Push to `main` branch (automatic)

**Production:**
- Create and push a version tag: `git tag v1.0.0 && git push origin v1.0.0`
- Or use manual workflow dispatch in GitHub Actions

## Agile Quick Reference

### Creating Issues

1. **Bug Report:**
   - Use "Bug Report" template
   - Include steps to reproduce
   - Label with `bug` and priority

2. **Feature Request:**
   - Use "Feature Request" template
   - Describe problem and solution
   - Label with `enhancement` and priority

3. **User Story:**
   - Use "User Story" template
   - Format: "As a [user], I want [goal], so that [benefit]"
   - Include acceptance criteria
   - Estimate story points

### Pull Request Process

1. Create branch: `git checkout -b feature/your-feature-name`
2. Make changes and commit
3. Push branch: `git push origin feature/your-feature-name`
4. Create PR using template
5. Ensure CI checks pass
6. Request review
7. Address feedback
8. Merge after approval

### Branch Naming

- `feature/` - New features
- `bugfix/` - Bug fixes
- `hotfix/` - Critical production fixes
- `docs/` - Documentation updates

### Sprint Cycle

- **Duration:** 2 weeks
- **Daily Standup:** [Set your time]
- **Sprint Planning:** First day
- **Sprint Review:** Last day
- **Retrospective:** After review

## Common Tasks

### Before Starting Work
1. Pull latest from `develop`
2. Create feature branch
3. Check for related issues

### Before Submitting PR
1. Run local CI checks
2. Write/update tests
3. Update documentation
4. Follow PR template
5. Link related issues

### After PR Merge
1. Deploy to staging (automatic)
2. Verify in staging environment
3. Get QA approval
4. Deploy to production (if ready)

## Useful Links

- [Full CI/CD Guide](CI_CD_GUIDE.md)
- [Full Agile Guide](AGILE_GUIDE.md)
- [Main README](../README.md)

---

**Need Help?** Check the detailed guides or contact your team lead.



