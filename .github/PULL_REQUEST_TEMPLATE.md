# Pull Request

## 📋 Description

<!-- Provide a brief description of the changes in this PR -->

## 🔗 Related Issue

<!-- Link to the issue this PR addresses -->
Fixes #(issue number)

## 🧪 Type of Change

<!-- Mark the relevant option with an "x" -->

- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📚 Documentation update
- [ ] 🔧 Code refactoring (no functional changes)
- [ ] 🎨 Style changes (formatting, missing semicolons, etc.)
- [ ] ⚡ Performance improvements
- [ ] 🔒 Security improvements
- [ ] 🧪 Tests (adding or updating tests)
- [ ] 🚀 CI/CD changes

## 🧪 Testing

<!-- Describe the tests you ran and how to reproduce them -->

- [ ] I have tested these changes locally
- [ ] I have added/updated tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] I have tested the changes in a Docker container

### Test Commands

```bash
# Backend tests
cd backend && lein test

# Frontend build
cd frontend && npm run build

# Linting
make lint

# Docker build
make build
```

## 📝 Changes Made

<!-- List the main changes made in this PR -->

### Backend Changes
- [ ] API endpoints modified
- [ ] Database schema changes
- [ ] Business logic updates
- [ ] Dependencies updated

### Frontend Changes
- [ ] UI components modified
- [ ] State management changes
- [ ] Styling updates
- [ ] Dependencies updated

### Infrastructure Changes
- [ ] Docker configuration
- [ ] CI/CD pipeline
- [ ] Documentation
- [ ] Configuration files

## 🖼️ Screenshots (if applicable)

<!-- Add screenshots to help explain your changes -->

## ✅ Checklist

<!-- Mark completed items with an "x" -->

### Code Quality
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes

### Security
- [ ] I have reviewed my changes for security implications
- [ ] I have not introduced any hardcoded secrets or credentials
- [ ] I have followed secure coding practices
- [ ] Dependencies are up to date and secure

### Documentation
- [ ] I have updated the README if needed
- [ ] I have updated API documentation if needed
- [ ] I have added/updated code comments where necessary

### Testing
- [ ] All tests pass
- [ ] I have tested edge cases
- [ ] I have tested error conditions
- [ ] The application builds successfully

## 🚀 Deployment Notes

<!-- Any special deployment considerations -->

- [ ] This PR requires database migrations
- [ ] This PR requires environment variable changes
- [ ] This PR requires Docker image rebuild
- [ ] This PR includes breaking changes that need communication

## 👥 Reviewers

<!-- Tag specific reviewers if needed -->

@jordanhubbard

## 📚 Additional Context

<!-- Add any other context about the PR here -->

---

**By submitting this PR, I confirm that:**
- [ ] I have read and agree to the project's Code of Conduct
- [ ] I have the right to submit this code under the project's license
- [ ] I understand that this contribution may be publicly available
