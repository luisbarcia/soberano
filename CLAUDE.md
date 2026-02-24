# Soberano — Hugo Theme

## Project Overview
Dark-first, cypherpunk-inspired Hugo theme for sovereign digital publishing. Monospace aesthetic, privacy-focused, zero external dependencies.

**Site type:** Blog + Portfolio
**CSS stack:** CSS puro (zero dependencies)
**JS strategy:** Minimal (vanilla JS, ~81 lines)
**Dark mode:** Dark-only (single scheme)
**Distribution:** Hugo Module

## Tech Stack
- **Hugo** v0.152.0+ (standard edition, Go templates) — target upgrade to v0.156.0
- **CSS**: Pure CSS (no framework), dark-only palette, custom properties
- **JavaScript**: Vanilla JS via `js.Build` (ESBuild), no external libs
- **Fonts**: Space Mono + Instrument Serif (self-hosted WOFF2)
- **Search**: Pagefind integration
- **i18n**: English (extensible via i18n/ directory)
- **Go Module**: `github.com/luisbarcia/soberano`

## Project Structure
```
soberano/                    # Theme root
├── archetypes/              # Content templates (default, portfolio, canary)
├── assets/css/              # main.css (~1300 lines), syntax.css
├── assets/js/               # main.js, pagefind-loader.js
├── exampleSite/             # Demo site with hugo.toml config
├── i18n/                    # en.yaml
├── layouts/
│   ├── _default/            # baseof, list, single, terms, canary, pgp, mirrors, nostr-json
│   ├── _markup/             # Render hooks (images, links, headings, codeblocks)
│   ├── partials/            # head/, header, footer, navigation, components/
│   ├── portfolio/           # Portfolio section templates
│   └── shortcodes/          # axiom, manifesto, card
├── static/                  # favicon.svg, favicon.png, apple-touch-icon.png, og-default.png
├── static/fonts/            # WOFF2 font files
├── go.mod                   # Go module definition
├── theme.toml               # Theme metadata
└── README.md                # Full documentation
```

## Development Commands
```bash
# Dev server (from exampleSite/)
cd soberano/exampleSite && hugo server -D

# Production build
cd soberano/exampleSite && hugo --gc --minify

# Update Hugo modules
hugo mod get -u

# Template profiling
hugo --templateMetrics --templateMetricsHints

# List drafts/expired/future content
hugo list drafts
hugo list expired
hugo list future
```

## Key Design Principles
- **Privacy-first**: No analytics, no tracking, no external requests
- **Zero dependencies**: No npm, no build tools, no CDN
- **CSP-compliant**: No inline styles/scripts, asset fingerprinting + SRI
- **Accessibility**: skip-link, focus-visible, aria-labels, prefers-reduced-motion
- **Dark-only**: Single dark theme with Bitcoin orange (#f7931a) accent
- **Hugo-idiomatic**: Always prefer native Hugo features over external solutions

## Color Palette
```
--bg: #0a0a0a          --surface: #111111
--accent: #f7931a      --text: #e8e8e8
--text-dim: #888888    --green: #4ade80
--red: #f87171         --border: #222222
```

## Content Sections
- **Posts** (`/posts`): Blog articles with tags, TOC, reading time
- **Portfolio** (`/portfolio`): Project showcases with tech stack, links
- **Canary** (`/canary`): Warrant canary with dead man's switch (`layout: canary`)
- **PGP** (`/pgp`): PGP public key page (`layout: pgp`)
- **Mirrors** (`/mirrors`): Alternative access points — Tor, I2P, IPFS (`layout: mirrors`)

## Hugo Version Compatibility — Migration Table

When upgrading to Hugo v0.156.0+, these functions/configs MUST be replaced:

| Removed (v0.156+) | Replacement |
|--------------------|-------------|
| `getCSV` / `getJSON` | `resources.GetRemote` + `transform.Unmarshal` |
| `resources.ToCSS` | `css.Sass` |
| `resources.PostCSS` | `css.PostCSS` |
| `resources.Babel` | `js.Babel` |
| `.Page.NextPage` / `.Page.PrevPage` | `.Page.Next` / `.Page.Prev` |
| `.Paginator.PageSize` | `.Paginator.PagerSize` |
| `.Site.LastChange` | `.Site.Lastmod` |
| `.Site.Author` | `.Site.Params.Author` |
| `.Site.Social` | `.Site.Params.Social` |
| `.Site.IsMultiLingual` | `hugo.IsMultilingual` |
| `.Sites.First` | `.Sites.Default` |
| `paginate` (config) | `pagination.pagerSize` |
| `paginatePath` (config) | `pagination.path` |

| Deprecated (use replacement) | Replacement |
|-------------------------------|-------------|
| `.Site.Data` | `hugo.Data` |
| `.Site.AllPages` | check docs |
| `Page.Sites` / `Site.Sites` | `hugo.Sites` |
| `cascade._target` | `cascade.target` |
| LibSass | Dart Sass |
| `includeFiles`/`excludeFiles` | `files` with negation (`! pattern`) |

### Version-specific features
- **v0.152+**: New YAML library — `yes`/`no`/`on`/`off` no longer treated as booleans, use `true`/`false`
- **v0.153+**: WebP via WASM (no Extended edition needed), animated WebP support, LibSass deprecated
- **v0.154+**: Partial decorators with `inner` keyword, `reflect.*` functions
- **v0.155+**: XMP/IPTC image metadata, aliases now site-relative (multilingual breaking change)
- **v0.156+**: `hugo.Data` replaces `.Site.Data`, Spring Cleaning removals (see table above)

## Hugo Template Anti-Patterns (NEVER do)
- **Hardcode URLs**: `{{ .Site.baseURL }}/path` → use `.Permalink`, `.RelPermalink`, `relURL`, `absURL`
- **Use `.Page.URL`** (deprecated) → use `.RelPermalink`
- **Use removed functions**: see migration table above
- **Use `yes`/`no` YAML booleans** (broken since v0.152) → use `true`/`false`
- **Use `readDir`/`readFile`** in public themes — fails on many hosts
- **Forget alt text** on images — accessibility and SEO penalty
- **Ship heavy JS** — use `js.Build` (ESBuild) if needed, no webpack/vite
- **Leave pages without layouts** → use `disableKinds` for unimplemented kinds
- **Deliver incomplete snippets** — all code must be complete and functional

## Template Conventions
- Always include comments with file purpose, expected context (`.`), and accepted params
- Use `with` to safely access potentially nil values
- Use `$` for root context inside `range`/`with` blocks
- Use `partialCached` for expensive partials that don't change per-page
- Debug with `{{ debug.Dump . }}` or `{{ warnf "msg: %v" .Variable }}`
- Use `templates.Defer` when processing needs to happen after all content is rendered

## Privacy System (`params.privacy`)
Modular privacy architecture using **preset + flag overrides**. Presets provide sensible defaults; 21 individual boolean flags allow granular customization.

**Architecture:**
- Central resolver: `partials/helpers/resolve-privacy.html` (uses `partialCached`, returns `dict`)
- All templates call: `{{ $privacy := partialCached "helpers/resolve-privacy.html" . "privacy" }}`
- Backwards-compatible: legacy `params.privacy.mode` still works as fallback for `preset`

**Presets:**
- **standard** (default): Full metadata, all social links, complete JSON-LD
- **hardened**: No generator, no-referrer, reduced JSON-LD (no sameAs/PGP)
- **paranoid**: No OG/Twitter/canonical, no Person schema, only federated networks

**Flag categories:**
- **Head meta**: `show_author_meta`, `show_generator`, `show_og`, `show_twitter_cards`, `show_canonical`
- **Security headers**: `add_referrer_policy`, `add_dns_prefetch_control`
- **JSON-LD**: `show_person_schema`, `show_same_as`, `show_pgp_in_schema`, `show_author_in_posts`, `show_author_in_pages`
- **Footer**: `show_social_centralized`, `show_social_federated`, `show_pgp_badge`, `show_nip05_badge`, `show_theme_credit`, `show_pgp_fingerprint`
- **Feeds/SEO**: `show_rss_generator`, `show_rss_author`, `show_sitemap_in_robots`

**Override pattern:** `isset` distinguishes explicit `false` from absent (nil = use preset default).

Related params:
- `params.privacy.system_fonts`: Use system font stack instead of self-hosted WOFF2
- Mobile nav works without JS via CSS `:target` selector (progressive enhancement)
- `support.html` per-entry visibility uses `$privacy.preset` for tier comparison

## Sovereignty Features (`params.sovereignty`, `params.nostr`)
Optional cypherpunk features activated via `hugo.toml`:
- **Warrant Canary**: Dead man's switch page with Bitcoin block proof of contemporaneity
- **Onion-Location**: `<meta http-equiv="onion-location">` for Tor Browser auto-redirect
- **Mirrors**: Tor/I2P/IPFS/Clearnet alternative access points
- **NIP-05**: Nostr identity verification via `.well-known/nostr.json` (Hugo template)
- **Content Hash**: SHA-256 hash displayed on posts (via `sha256` front matter field)
- **PGP Key Page**: Dedicated page with fingerprint highlight and Keyoxide link
- **Security.txt**: RFC 9116 contact file (static, user-managed)
- **Footer indicators**: Sovereignty badges (Canary/Onion/IPFS/PGP/NIP-05) with status dots

## Theme Extension Points
Expose hooks for user customization without modifying theme files:
- `partials/head/custom.html` — user can inject custom head content
- `partials/hooks/body-start.html` — inject after `<body>` open
- `partials/hooks/body-end.html` — inject before `</body>` close
- Feature flags via `[params.features]` in hugo.toml
- Design tokens via CSS custom properties in `:root`
- Privacy via `[params.privacy]` in hugo.toml
- Sovereignty via `[params.sovereignty]`, `[params.nostr]`, `[params.crypto]` in hugo.toml

## Quality Targets
| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥ 95 (target 100) |
| Lighthouse Accessibility | ≥ 95 (target 100) |
| Lighthouse Best Practices | 100 |
| Lighthouse SEO | 100 |
| Total CSS+JS | < 90KB |
| LCP | < 2.5s |
| INP | < 200ms |
| CLS | < 0.1 |
| WCAG level | AA minimum |

## Conventions
- Follow Hugo template conventions and Go template syntax
- CSS uses custom properties (variables) defined in `:root`
- Keep JS minimal — vanilla only, no frameworks
- All fonts must remain self-hosted (WOFF2)
- All i18n strings are defined in en.yaml; add new language files as needed
- Use semantic HTML and ARIA attributes for accessibility
- Shortcodes: `axiom`, `manifesto`, `card`
- Responsive images: use WebP with `picture` element and `srcset`
- JSON-LD structured data for SEO (WebSite, BlogPosting, CreativeWork, BreadcrumbList)
- Code blocks use `render-codeblock.html` hook with `.Store.Set "hasCode"` pattern for conditional `syntax.css` loading
- When using features that require a specific Hugo version, annotate: `{{/* Requires Hugo ≥ vX.Y.Z */}}`

## Git
- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`
- Theme code lives in `soberano/` subdirectory
- **GitHub identity**: This repo belongs to `luisbarcia` (NOT `luismattos`)
  - Git user: `luisbarcia <barcia.me@proton.me>` (configured in `.git/config`)
  - GitHub API: use `GH_TOKEN` from `/Users/luismattos/Documents/Workspaces/luisbarcia/.envrc`
  - For `gh` commands: always prefix with `source /Users/luismattos/Documents/Workspaces/luisbarcia/.envrc &&` or pass `GH_TOKEN` inline
  - For `gh release`, `gh pr`, `gh issue`: always use `--repo luisbarcia/soberano`
