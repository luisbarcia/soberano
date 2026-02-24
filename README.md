# Soberano

A dark, monospace, cypherpunk-inspired Hugo theme for sovereign digital publishing.

> "A liberdade não se pede, se constrói."

## Features

- **Dark-first design** — Black background, monospace typography, Bitcoin orange accent
- **Fully configurable** — All content driven by `hugo.toml` params and menus. No hardcoded pages or links.
- **Sovereignty features** — Warrant canary, PGP key page, content integrity hashes, mirrors, NIP-05, onion-location
- **Three-tier privacy** — Standard, hardened, and paranoid modes controlling metadata exposure
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

## Privacy Modes

Soberano supports three privacy levels via `params.privacy.mode`:

| Mode | Generator | OG/Twitter | Canonical | JSON-LD Person | Social Footer | RSS Author |
|------|-----------|------------|-----------|----------------|---------------|------------|
| `standard` (default) | Yes | Yes | Yes | Full (sameAs, PGP) | All configured | Yes |
| `hardened` | No | Yes | Yes | Reduced (no sameAs/PGP) | All configured | Yes |
| `paranoid` | No | No | No | None (WebSite only) | Pseudonymous/federated only | No |

```toml
[params.privacy]
  mode = "hardened"       # "standard", "hardened", or "paranoid"
  system_fonts = false    # Use system fonts instead of self-hosted WOFF2
```

**Hardened mode** adds `no-referrer` and `x-dns-prefetch-control: off` meta tags.

**Paranoid mode** strips all identifying metadata. Only pseudonymous/federated networks (Nostr, Matrix, Mastodon, XMPP, SimpleX) appear in the footer. Ideal for `.onion` sites.

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
    Content-Security-Policy = "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; form-action 'none'; frame-ancestors 'none'; base-uri 'self'"

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
        { "key": "Content-Security-Policy", "value": "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; form-action 'none'; frame-ancestors 'none'; base-uri 'self'" }
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
  Content-Security-Policy: default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; form-action 'none'; frame-ancestors 'none'; base-uri 'self'

/css/*
  Cache-Control: public, max-age=31536000, immutable

/js/*
  Cache-Control: public, max-age=31536000, immutable

/fonts/*
  Cache-Control: public, max-age=31536000, immutable
```

</details>

> **Note on Pagefind:** The CSP above covers Pagefind — `style-src 'self'` allows its CSS and `connect-src 'self'` allows search index fetching. No `'unsafe-inline'` needed.

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
