# Security Policy

## 🔒 Supported Versions

We actively maintain and provide security updates for the following versions:

| Version | Supported          | Status |
| ------- | ------------------ | ------ |
| Latest (main) | ✅ Yes | Active development |
| Docker latest | ✅ Yes | Latest stable release |
| Previous releases | ❌ No | Use latest version |

## 🚨 Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security vulnerability, please follow these guidelines:

### For Sensitive Vulnerabilities (Recommended)

**Please DO NOT open a public issue for sensitive security vulnerabilities.**

Instead, please report them privately using one of these methods:

1. **GitHub Security Advisories** (Preferred)
   - Go to the [Security tab](https://github.com/jordanhubbard/aviation-missions-app/security/advisories)
   - Click "Report a vulnerability"
   - Fill out the form with detailed information

2. **Direct Contact**
   - Email: [Contact maintainer directly through GitHub profile]
   - Include "SECURITY" in the subject line
   - Provide detailed information about the vulnerability

### For Non-Sensitive Security Issues

For general security improvements or non-exploitable issues, you can:
- Open a [security-related issue](https://github.com/jordanhubbard/aviation-missions-app/issues/new?template=security_report.yml)
- Start a [discussion](https://github.com/jordanhubbard/aviation-missions-app/discussions)

## 📋 What to Include in Your Report

When reporting a vulnerability, please include:

1. **Description**: Clear description of the vulnerability
2. **Impact**: Potential impact and severity assessment
3. **Steps to Reproduce**: Detailed steps to reproduce the issue
4. **Proof of Concept**: Code, screenshots, or other evidence
5. **Suggested Fix**: If you have ideas for fixing the issue
6. **Environment**: Version, deployment method, browser, etc.

## ⏱️ Response Timeline

We are committed to responding quickly to security reports:

- **Initial Response**: Within 24-48 hours
- **Assessment**: Within 1 week
- **Resolution**: Varies based on complexity, typically 1-4 weeks
- **Disclosure**: Coordinated disclosure after fix is available

## 🛡️ Security Measures

### Current Security Features

- **Input Validation**: All user inputs are validated and sanitized
- **SQL Injection Prevention**: Parameterized queries and ORM protection
- **XSS Protection**: Output encoding and Content Security Policy
- **CSRF Protection**: CSRF tokens for state-changing operations
- **Authentication**: Secure session management for admin functions
- **Container Security**: Multi-stage Docker builds with minimal attack surface
- **Dependency Scanning**: Automated vulnerability scanning of dependencies

### Automated Security Scanning

This project includes automated security scanning:

- **Dependency Vulnerabilities**: Daily scans with Trivy and Dependabot
- **Code Analysis**: Static analysis with CodeQL
- **Container Scanning**: Docker image vulnerability scanning
- **Secret Scanning**: Automated detection of exposed secrets
- **License Compliance**: Automated license checking

## 🔧 Security Configuration

### Recommended Deployment Security

1. **HTTPS**: Always use HTTPS in production
2. **Firewall**: Restrict access to necessary ports only
3. **Updates**: Keep the application and dependencies updated
4. **Monitoring**: Monitor logs for suspicious activity
5. **Backups**: Regular encrypted backups
6. **Access Control**: Limit admin access and use strong passwords

### Environment Variables

Sensitive configuration should use environment variables:

```bash
# Don't hardcode in configuration files
DATABASE_PASSWORD=your-secure-password
ADMIN_PASSWORD=your-admin-password
JWT_SECRET=your-jwt-secret
```

## 🏆 Security Hall of Fame

We appreciate security researchers who help improve our security. Responsible disclosure contributors will be acknowledged here (with permission):

<!-- Future contributors will be listed here -->

*Be the first to contribute to our security!*

## 📚 Security Resources

### For Users
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Container Security Best Practices](https://sysdig.com/blog/dockerfile-best-practices/)
- [Web Application Security](https://developer.mozilla.org/en-US/docs/Web/Security)

### For Developers
- [Secure Coding Practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)
- [Clojure Security](https://clojure.org/guides/security)
- [React Security](https://snyk.io/blog/10-react-security-best-practices/)

## 🔄 Security Updates

### Staying Informed

- **Watch this repository** for security advisories
- **Enable notifications** for security updates
- **Follow release notes** for security-related changes
- **Subscribe to security mailing lists** for dependencies

### Automatic Updates

We recommend:
- Enable Dependabot for automatic dependency updates
- Use `docker pull` regularly to get latest security updates
- Monitor security advisories for dependencies

## ❓ Questions?

If you have questions about security that don't involve reporting a vulnerability:

- Check the [Discussions](https://github.com/jordanhubbard/aviation-missions-app/discussions) section
- Review the [documentation](README.md)
- Open a [general issue](https://github.com/jordanhubbard/aviation-missions-app/issues)

## 📜 Responsible Disclosure

We follow responsible disclosure practices:

1. **Investigation**: We investigate all reports promptly
2. **Communication**: We keep reporters informed of progress
3. **Fix Development**: We develop and test fixes thoroughly
4. **Coordinated Release**: We coordinate disclosure timing
5. **Credit**: We provide appropriate credit to reporters (if desired)

Thank you for helping keep the Aviation Mission Management System secure! 🛡️
