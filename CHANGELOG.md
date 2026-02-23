# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- `helpers/resolve-image.html` partial for DRY image resolution
- `partials/icons/nostr.html` and `partials/icons/matrix.html` SVG partials
- `og:image:type` meta tag with dynamic format detection
- `content-visibility: auto` for below-fold rendering performance
- `@media (forced-colors: active)` for Windows High Contrast mode
- `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `CHANGELOG.md`
- Theme attribution link in footer (fixed, not user-configurable)

### Changed
- Instrument Serif fonts use `font-display: optional` instead of `swap`
- `scroll-behavior: smooth` moved to `prefers-reduced-motion: no-preference`
- Noise overlay disabled on touch devices via `@media (hover: hover)`
- Progress bar uses CSS custom property `--progress` instead of inline `style.width`
- Nav toggle uses `classList` instead of `style.display` (CSP-safe)
- RSS `managingEditor` now uses `email (name)` format per spec
- `--text-faint` increased to `#8a8a8a` for WCAG AA compliance
- Security config: removed `npx`/`postcss` from `exec.allow`, restricted `http.urls`

### Removed
- Hero quick links nav (duplicated header navigation)
- Duplicate `.post-item` CSS block

### Fixed
- `.Site.` replaced with `site.` in `rss.xml` for consistency
- BlogPosting JSON-LD now always includes `image` field via site fallback
