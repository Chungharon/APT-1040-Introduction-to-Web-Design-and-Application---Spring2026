# Threat Model: Africa Vibe

## Assets
1. User Registration Data (extracted from forms).
2. Application Source Code.
3. API endpoints (though not explicitly defined yet).

## Threat Profile: Adversarial AI Findings

### 1. Form Injection / Cross-Site Scripting (XSS)
- **Vulnerability**: Form fields like "Full Name", "Motivation" do not have specific sanitation in the current React components.
- **Impact**: Attacker could submit valid HTML/JS payloads.
- **Mitigation**: Use Next.js/React built-in escaping. Ensure any back-end processing uses parameterized queries or serious ORM sanitation.

### 2. Information Leakage
- **Vulnerability**: Generic Error pages might have leaked internal paths or environment variables if not properly configured.
- **Findings**: `app/error.tsx` has been implemented with Sentry integration to safely capture errors while showing a user-friendly generic message.
- **Mitigation**: Maintain the `error.tsx` boundary and use environment variables for sensitive keys (Sentry DSN).

### 3. Server-Side Interaction (SSR/SSG context)
- **Vulnerability**: Currently, everything is static/client-side. No SSR-based injection points found.
- **Mitigation**: Continue to use `use client` strictly where needed and sanitize any URL parameters when implementing dynamic routing.

### 4. Dependency Vulnerabilities
- **Vulnerability**: Use of outdated or malicious npm packages.
- **Findings**: `npm audit` returned 0 vulnerabilities. Sentry SDK has been added which adds to the attack surface.
- **Mitigation**: Regular `npm audit` and using Renovate/Dependabot for updates.

### 5. Deployment / Docker
- **Vulnerability**: Running as root in container.
- **Findings**: `Dockerfile` has been configured to use the `nextjs` user with UID 1001, following best practices for non-privileged execution.

## Conclusion
The project is currently low-risk due to its static-first nature, but as back-end logic is added, sanitation and authentication will become critical boundaries.
