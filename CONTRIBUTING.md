# Contributing to Soberano

Thank you for your interest in contributing to Soberano.

## How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/your-feature`)
3. Make your changes
4. Run the dev server to verify (`cd exampleSite && hugo server -D`)
5. Commit using [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, etc.)
6. Push to your fork and open a Pull Request

## Development Setup

```bash
git clone https://github.com/luisbarcia/soberano.git
cd soberano/exampleSite
hugo server -D
```

Requires Hugo v0.152.0+ (standard edition).

## Guidelines

- **No external dependencies** — no npm, no CDN, no build tools
- **CSS only** — no preprocessors, no frameworks
- **Vanilla JS** — no libraries, keep it minimal
- **Self-hosted fonts** — WOFF2 only, no Google Fonts
- **Privacy-first** — no analytics, no tracking, no external requests
- **CSP-compliant** — no inline styles or scripts
- **Accessible** — WCAG AA minimum, semantic HTML, ARIA labels

## Reporting Bugs

Open an issue with:
- Hugo version (`hugo version`)
- Steps to reproduce
- Expected vs actual behavior

## Code Style

- Hugo templates: use `site.` (lowercase), not `.Site.`
- CSS: use custom properties defined in `:root`
- Follow existing patterns in the codebase

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
