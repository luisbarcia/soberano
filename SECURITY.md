# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| latest  | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Do not** open a public issue
2. Email the maintainer or use [GitHub Security Advisories](https://github.com/luisbarcia/soberano/security/advisories/new)
3. Include steps to reproduce and potential impact

You should receive a response within 72 hours.

## Security Design

Soberano is built with security as a core principle:

- **Zero external requests** — no CDN, no analytics, no tracking
- **CSP-compliant** — no inline styles or scripts, SRI on all assets
- **Self-hosted fonts** — no Google Fonts or third-party font services
- **No JavaScript dependencies** — vanilla JS only (~81 lines)
- **Hugo security config** — restricted `exec.allow` and `http.urls`
- **Asset fingerprinting** — cache-busting via content hashes
- **Subresource Integrity** — SRI hashes on CSS and JS
