# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.2.0] - 2026-02-24

### Added
- Portuguese (pt-BR) translation file (`i18n/pt-br.yaml`)
- `canaryMissingExpires` i18n key (en + pt-BR)
- Dynamic meta descriptions for taxonomy pages (`"Hugo — 3 posts"`)
- Enriched JSON-LD for taxonomy term pages (description + about refs)
- `noindex` on search page to prevent thin-content indexing
- `aria-hidden="true"` on footer dot separators
- `worker-src 'self'` in CSP examples (Netlify, Vercel, Cloudflare)
- Pagefind SRI exception note in README
- Referrer-Policy guidance for hardened/paranoid modes in README
- Fallback `{"names":{},"relays":{}}` for nostr.json when params absent
- Expanded content descriptions (120–160 chars) across example sections

### Changed
- 404 page: suppress canonical, OG, Twitter Cards, and JSON-LD; add `noindex`
- TOC: `<nav>` replaced with `<div role="navigation">` to fix nested landmark
- BreadcrumbList: use `.Permalink` directly (consistent trailing slashes)
- `og:type`: use `article` for all `.IsPage`, not only posts
- Meta description pipeline: add `strings.TrimRight "\n"` before truncate
- `hero_title`: `safeHTML` → `markdownify` for XSS safety
- `--text-dim`: `#888888` → `#8e8e8e` (4.6:1 contrast, passes WCAG AA)
- `nostr-json.md`: `build: { list: never }` replaces non-functional `sitemap: disable`

## [0.1.0] - 2026-02-24

### Added
- Initial theme release — dark-first, cypherpunk-inspired Hugo theme
- 3-tier privacy system: standard, hardened, paranoid modes
- Sovereignty features: warrant canary, Tor/I2P/IPFS mirrors, NIP-05, PGP key page
- Content integrity system: SHA-256 auto-hash, integrity manifest, PGP rotation
- Callout shortcode, axiom shortcode, manifesto shortcode
- Prev/next post navigation
- Archive page layout (posts by year)
- JSON-LD structured data: 9 schema types (WebSite, Person, BlogPosting, Blog, CreativeWork, ItemList, ProfilePage, BreadcrumbList, FAQ/HowTo)
- Pagefind search integration
- Self-hosted fonts (Space Mono + Instrument Serif WOFF2)
- Responsive images: WebP q80 + srcset 480/768/1200
- `helpers/resolve-image.html` partial for DRY image resolution
- `og:image:type` meta tag with dynamic format detection
- `content-visibility: auto` for below-fold rendering performance
- `@media (forced-colors: active)` for Windows High Contrast mode
- CSS custom property `--progress` for reading progress bar (CSP-safe)
- RSS with `content:encoded`, `atom:link`, categories
- Dynamic `robots.txt` per Hugo environment
- Hreflang with `x-default` for multilingual sites
- Extension points: `head/custom.html`, `hooks/body-start.html`, `hooks/body-end.html`
- `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `CHANGELOG.md`

### Changed
- Instrument Serif fonts use `font-display: optional` instead of `swap`
- `scroll-behavior: smooth` scoped to `prefers-reduced-motion: no-preference`
- Noise overlay disabled on touch devices via `@media (hover: hover)`
- Nav toggle uses `classList` instead of `style.display` (CSP-safe)
- RSS `managingEditor` uses `email (name)` format per spec
- Security config: restricted `exec.allow` and `http.urls`

### Removed
- Hero quick links nav (duplicated header navigation)

[Unreleased]: https://github.com/luisbarcia/soberano/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/luisbarcia/soberano/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/luisbarcia/soberano/releases/tag/v0.1.0
