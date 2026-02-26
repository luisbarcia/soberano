# Soberano

A dark, monospace, cypherpunk-inspired Hugo theme for sovereign digital publishing.

> "A liberdade não se pede, se constrói."

## Features

- **Dark-first design** — Black background, monospace typography, Bitcoin orange accent
- **Fully configurable** — All content driven by `hugo.toml` params and menus. No hardcoded pages or links.
- **Sovereignty features** — Warrant canary, PGP key page, content integrity hashes, mirrors, NIP-05, onion-location
- **Modular privacy** — Preset + flag overrides architecture with 21 granular controls for metadata exposure
- **Custom shortcodes** — axiom, manifesto, card, callout (info/warning/danger)
- **Portfolio section** — Project showcase with stack tags, status badges, metadata
- **Archive page** — Posts grouped by year
- **Search** — Pagefind integration with themed UI
- **Prev/next navigation** — Between posts within a section
- **JSON-LD** — Rich structured data (WebSite, Person, BlogPosting, CreativeWork, BreadcrumbList)
- **SEO** — Open Graph, Twitter Cards, canonical URLs, dynamic robots meta
- **Responsive** — Mobile-first with CSS-only collapsible navigation (progressive JS enhancement)
- **Accessible** — Skip-link, focus-visible, aria-labels, reduced-motion support
- **Fast** — No JavaScript frameworks, minimal CSS, asset fingerprinting + SRI
- **CSP-compliant** — No inline styles or scripts
- **Privacy-friendly** — No analytics, no external tracking, self-hosted fonts, zero external requests
- **Paginated lists** — With pinned posts support
- **Syntax highlighting** — Custom dark color scheme, conditional CSS loading
- **RSS + JSON feeds** — Built-in autodiscovery
- **Table of contents** — Per-post, opt-in via front matter
- **Print styles** — Clean print output

## Quick Start

For a step-by-step guide from zero to a running site, see **[QUICKSTART.md](QUICKSTART.md)**.

```bash
# Create a new Hugo site
hugo new site mysite
cd mysite
```

### Option A: Hugo Module (recommended)

Requires [Go](https://go.dev/dl/) installed.

```bash
# Initialize your site as a module
hugo mod init github.com/yourname/mysite

# Add the theme to hugo.toml:
# [module]
#   [[module.imports]]
#     path = "github.com/luisbarcia/soberano"

# Copy example config
curl -o hugo.toml https://raw.githubusercontent.com/luisbarcia/soberano/main/exampleSite/hugo.toml

# Run
hugo server -D
```

### Option B: Git submodule

```bash
git submodule add https://github.com/luisbarcia/soberano.git themes/soberano

# Copy the example configuration
cp themes/soberano/exampleSite/hugo.toml hugo.toml

# Edit hugo.toml — set theme = "soberano"

hugo server -D
```

## Configuration

All theme behavior is controlled via `hugo.toml`. Copy `exampleSite/hugo.toml` as your starting point.

### Menus

The theme uses **two menus** — no navigation links are hardcoded:

| Menu | Location | Purpose |
|------|----------|---------|
| `menus.main` | Header navigation | Primary site navigation |
| `menus.footer` | Footer | Secondary navigation (search, RSS, etc.) |

```toml
# Header nav
[[menus.main]]
  name = "Posts"
  url = "/posts/"
  weight = 1

# Footer nav
[[menus.footer]]
  name = "RSS"
  url = "/index.xml"
  weight = 1
```

External links (open in new tab):

```toml
[[menus.footer]]
  name = "Source"
  url = "https://github.com/yourname/yoursite"
  weight = 10
  [menus.footer.params]
    external = true
```

### Site Params

```toml
[params]
  # Identity
  description = "Your site description"
  author = "Your Name"
  tagline = "// your tagline"

  # SEO
  og_image = "og-default.png"        # Default OG image (in static/)

  # JSON-LD (optional — enriches Person schema)
  # job_title = "Software Engineer"
  # knows_about = ["Automation", "AI"]

  # Homepage hero
  hero_title = "Your <em>Title</em>"  # Supports HTML for accent styling
  hero_subtitle = "Your subtitle."

  # Homepage sections
  homepage_posts = 5                  # Number of posts on homepage
  homepage_projects = 3               # Number of projects on homepage

  # Social (drives footer icons + JSON-LD sameAs)
  [params.social]
    github = "yourname"
    # email, nostr, mastodon, matrix, signal, linkedin, twitter, xmpp, simplex

  # PGP (optional, shown in footer)
  [params.crypto]
    pgp_fingerprint = "XXXX XXXX XXXX XXXX XXXX  XXXX XXXX XXXX XXXX XXXX"
    pgp_key_url = "/pgp/"
    # keyoxide_url = "https://keyoxide.org/FINGERPRINT"
```

### Optional Homepage Blocks

**Axiom** — A highlighted principle or belief:

```toml
[params.axiom]
  label = "Core axiom"
  text = "Your core belief here."
```

**Manifesto** — A multi-line declaration:

```toml
[params.manifesto]
  label = "SYNTHESIS"
  lines = ["First line.", "Second line."]
```

Both are optional — if not configured, they don't render.

## Shortcodes

### Axiom

```markdown
{{</* axiom label="Core principle" */>}}
Your axiom text here.
{{</* /axiom */>}}
```

### Manifesto

```markdown
{{</* manifesto label="SYNTHESIS" */>}}
Your manifesto text here.
{{</* /manifesto */>}}
```

### Card

```markdown
{{</* card number="01" title="Title" role="Category" */>}}
Description with **markdown** support.
{{</* /card */>}}
```

### Callout

Three types: `info` (blue), `warning` (yellow), `danger` (red). Title is optional.

```markdown
{{</* callout type="warning" title="Heads up" */>}}
This action may have unintended side effects.
{{</* /callout */>}}
```

## Sovereignty Features

Optional cypherpunk features activated via `hugo.toml`. These are what make Soberano unique — no other Hugo theme integrates these as first-class features.

### Warrant Canary

Dead man's switch page with Bitcoin block proof of contemporaneity. Create `content/canary.md` with `layout: canary`:

```yaml
---
title: "Warrant Canary"
layout: canary
expires: 2026-05-01
bitcoin_block: 880000
bitcoin_hash: "0000000000000000000..."
---
```

If `expires` passes without renewal, the canary status automatically turns red.

### PGP Key Page

Dedicated page with fingerprint highlight, Keyoxide link, and optional key rotation history. Create `content/pgp.md` with `layout: pgp`:

```yaml
---
title: "PGP Public Key"
layout: pgp
rotations:
  - date: "2025-09-01"
    fingerprint: "7D6D 036C 2ED1 ..."
    status: "active"
    bitcoin_block: 880000
    bitcoin_hash: "0000000000..."
  - date: "2024-08-11"
    fingerprint: "6DFD AE66 D43F ..."
    status: "revoked"
---
```

### Content Integrity

Every post automatically displays a SHA-256 hash of its source content. To provide a manually signed hash, add `sha256` to the front matter:

```yaml
sha256: "a1b2c3d4..."      # Shows "signed" badge instead of "auto"
pgp_signature: |            # Optional PGP signature in collapsible block
  -----BEGIN PGP SIGNATURE-----
  ...
  -----END PGP SIGNATURE-----
```

### Integrity Manifest

Site-wide hash listing at `/integrity/`. Create `content/integrity.md` with `layout: integrity`.

### Mirrors

Alternative access points (Tor, I2P, IPFS). Create `content/mirrors.md` with `layout: mirrors` and configure in `hugo.toml`:

```toml
[params.sovereignty]
  onion_url = "http://youronion.onion"

  [[params.sovereignty.mirrors]]
    url = "http://youronion.onion"
    type = "onion"
    label = "Tor Hidden Service"
```

### NIP-05

Nostr identity verification. Create `content/nostr-json.md`:

```yaml
---
url: "/.well-known/nostr.json"
layout: "nostr-json"
outputs: ["json"]
---
```

Configure in `hugo.toml`:

```toml
[params.nostr]
  name = "_"
  pubkey = "hex_pubkey_here"
  relays = ["wss://relay.damus.io", "wss://nos.lol"]
```

### Onion-Location

Automatic Tor Browser redirect via `<meta http-equiv="onion-location">`. Set `params.sovereignty.onion_url` in `hugo.toml`.

### Footer Sovereignty Badges

Automatically displays status badges (Canary, Onion, IPFS, PGP, NIP-05, Integrity) in the footer when the corresponding features are configured.

## Front Matter

### Posts

```yaml
---
title: "Post Title"
date: 2025-02-19
tags: ["tag1", "tag2"]
description: "Post description for SEO and previews."
toc: true          # Enable table of contents
pinned: true       # Pin to top of lists and homepage
noindex: true      # Block search engine indexing
image: "cover.jpg" # Hero image + OG image
sha256: ""         # Manual content hash (optional)
---
```

### Portfolio

```yaml
---
title: "Project Name"
date: 2025-01-01
description: "Project description."
category: "automation"
status: "active"        # active, completed, maintenance, paused
stack: ["Hugo", "Go", "n8n"]
tags: ["automation", "web"]
links:
  Demo: "https://demo.example.com"
  Source: "https://github.com/..."
client: "Client Name"
period: "Jan–Mar 2025"
role: "Lead Engineer"
---
```

### Archive

Create `content/archive.md` to enable the archive page:

```yaml
---
title: "Archive"
layout: archive
description: "All posts by year."
---
```

## Color Scheme

Soberano is a **dark-only theme by design**. The cypherpunk aesthetic is inseparable from its dark palette.

| Variable | Hex | Usage |
|---|---|---|
| `--bg` | `#0a0a0a` | Background |
| `--surface` | `#111111` | Cards, code blocks |
| `--accent` | `#f7931a` | Links, highlights (Bitcoin orange) |
| `--text` | `#e8e8e8` | Primary text |
| `--text-dim` | `#888888` | Secondary text |
| `--green` | `#4ade80` | Success, active status |
| `--red` | `#f87171` | Danger, expired |
| `--yellow` | `#facc15` | Warnings |
| `--blue` | `#60a5fa` | Info, maintenance |

Override any variable by creating `assets/css/custom.css` in your project.

## Privacy System

Soberano uses a **preset + flag overrides** architecture for privacy control. Choose a preset for sensible defaults, then override individual flags as needed.

### Presets

| Preset | Generator | OG/Twitter | Canonical | JSON-LD Person | Social Footer | RSS Author |
|--------|-----------|------------|-----------|----------------|---------------|------------|
| `standard` (default) | Yes | Yes | Yes | Full (sameAs, PGP) | All configured | Yes |
| `hardened` | No | Yes | Yes | Reduced (no sameAs/PGP) | All configured | No |
| `paranoid` | No | No | No | None (WebSite only) | Federated only | No |

```toml
[params.privacy]
  preset = "hardened"     # "standard", "hardened", or "paranoid"
  system_fonts = false    # Use system fonts instead of self-hosted WOFF2
```

**Hardened** adds `no-referrer` and `x-dns-prefetch-control: off` meta tags.

**Paranoid** strips all identifying metadata. Only federated/pseudonymous networks (Nostr, Matrix, Mastodon, XMPP, SimpleX) appear in the footer. Ideal for `.onion` sites.

### Custom Overrides

Override any individual flag to fine-tune privacy beyond what presets offer:

```toml
# Paranoid preset but keep PGP visible (pseudonymous persona on Tor):
[params.privacy]
  preset = "paranoid"
  show_pgp_badge = true
  show_pgp_fingerprint = true

# Standard but suppress Twitter Cards:
[params.privacy]
  preset = "standard"
  show_twitter_cards = false
```

### All Flags

| Flag | standard | hardened | paranoid | Controls |
|------|----------|----------|----------|----------|
| `show_author_meta` | true | true | false | `<meta name="author">` and post author display |
| `show_generator` | true | false | false | `<meta name="generator">` |
| `show_og` | true | true | false | Open Graph meta tags |
| `show_twitter_cards` | true | true | false | Twitter Card meta tags |
| `show_canonical` | true | true | false | `<link rel="canonical">` |
| `add_referrer_policy` | false | true | true | `<meta name="referrer" content="no-referrer">` |
| `add_dns_prefetch_control` | false | true | true | `<meta http-equiv="x-dns-prefetch-control">` |
| `show_person_schema` | true | true | false | JSON-LD Person schema |
| `show_same_as` | true | false | false | sameAs social links in JSON-LD |
| `show_pgp_in_schema` | true | false | false | PGP fingerprint in JSON-LD Person |
| `show_author_in_posts` | true | true | false | author in BlogPosting/CreativeWork JSON-LD |
| `show_author_in_pages` | true | true | false | author in generic page JSON-LD |
| `show_social_centralized` | true | true | false | email, github, linkedin, twitter, signal |
| `show_social_federated` | true | true | true | nostr, mastodon, matrix, xmpp, simplex |
| `show_pgp_badge` | true | true | false | PGP sovereignty badge in footer |
| `show_nip05_badge` | true | true | false | NIP-05 sovereignty badge in footer |
| `show_theme_credit` | true | true | false | "Soberano" theme link in footer |
| `show_pgp_fingerprint` | true | true | false | PGP fingerprint text in footer |
| `show_rss_generator` | true | false | false | `<generator>` in RSS feed |
| `show_rss_author` | true | false | false | `<author>`/`<managingEditor>` in RSS |
| `show_sitemap_in_robots` | true | true | false | Sitemap directive in robots.txt |

> **Backwards compatibility:** The legacy `mode` key still works as a fallback for `preset`.

## Security Headers

Soberano outputs no inline styles or scripts that violate CSP. Recommended headers for your hosting platform:

<details>
<summary>Netlify (<code>netlify.toml</code>)</summary>

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "0"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
    Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
    Content-Security-Policy = "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; worker-src 'self'; form-action 'none'; frame-ancestors 'none'; base-uri 'self'"

[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/js/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/fonts/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

</details>

<details>
<summary>Vercel (<code>vercel.json</code>)</summary>

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains; preload" },
        { "key": "X-XSS-Protection", "value": "0" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Content-Security-Policy", "value": "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; worker-src 'self'; form-action 'none'; frame-ancestors 'none'; base-uri 'self'" }
      ]
    }
  ]
}
```

</details>

<details>
<summary>Cloudflare Pages (<code>_headers</code>)</summary>

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  X-XSS-Protection: 0
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; worker-src 'self'; form-action 'none'; frame-ancestors 'none'; base-uri 'self'

/css/*
  Cache-Control: public, max-age=31536000, immutable

/js/*
  Cache-Control: public, max-age=31536000, immutable

/fonts/*
  Cache-Control: public, max-age=31536000, immutable
```

</details>

> **Note on Pagefind:** The CSP above covers Pagefind — `style-src 'self'` allows its CSS, `connect-src 'self'` allows search index fetching, and `worker-src 'self'` allows its Web Workers. No `'unsafe-inline'` needed. Pagefind assets are generated at build time and served from `'self'` — they do not use SRI because their content changes with every build.

> **Note on Referrer-Policy:** The examples above use `strict-origin-when-cross-origin` (browser default). If you enable `add_referrer_policy = true` (default in **hardened** and **paranoid** presets), the theme adds `<meta name="referrer" content="no-referrer">` — consider matching this in your server headers with `Referrer-Policy: no-referrer`.

> **Note on JSON-LD:** Soberano uses inline `<script type="application/ld+json">` for structured data. While `type="application/ld+json"` scripts are **not executable** and pose no XSS risk, strict CSP configurations that block all inline scripts will also block these. If your CSP uses `script-src` without `'unsafe-inline'`, you have two options: (1) add a `nonce` attribute via the `head/custom.html` hook, or (2) compute the SHA-256 hash of each JSON-LD block and add it as `'sha256-<hash>'` to your `script-src` directive.

## Theme Extension Points

- `partials/head/custom.html` — inject custom head content
- `partials/hooks/body-start.html` — inject after `<body>` open
- `partials/hooks/body-end.html` — inject before `</body>` close
- Feature flags via `[params.features]`
- Design tokens via CSS custom properties in `:root`

## Requirements

- Hugo **v0.152.0** or later (standard edition)
- No Node.js required
- No external dependencies

## License

MIT
