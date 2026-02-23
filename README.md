# Soberano

A dark, monospace, cypherpunk-inspired Hugo theme for sovereign digital publishing.

> "A liberdade não se pede, se constrói."

## Features

- **Dark-first design** — Black background, monospace typography, amber accent
- **Noise texture overlay** — Subtle grain for analog feel
- **Fully configurable** — All content driven by `hugo.toml` params and menus. No hardcoded pages or links.
- **Custom shortcodes** — axiom, manifesto, card
- **Portfolio section** — Built-in project showcase with stack tags and status badges
- **Search** — Pagefind integration with themed UI
- **JSON-LD** — Rich structured data (WebSite, Person, BlogPosting, CreativeWork, BreadcrumbList, ItemList, ProfilePage)
- **SEO** — Open Graph, Twitter Cards, canonical URLs, dynamic robots meta, hreflang for multilingual
- **Responsive** — Mobile-first with collapsible navigation
- **Accessible** — Skip-link, focus-visible, aria-labels, reduced-motion support
- **Fast** — No JavaScript frameworks, minimal CSS, asset fingerprinting + SRI
- **Privacy-friendly** — No analytics, no external tracking, self-hosted fonts
- **Paginated lists** — Built-in pagination with pinned posts support
- **Syntax highlighting** — Custom dark color scheme (Chroma)
- **RSS feed** — Built-in autodiscovery
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

The theme uses **three menus** — no navigation links are hardcoded:

| Menu | Location | Purpose |
|------|----------|---------|
| `menus.main` | Header navigation | Primary site navigation |
| `menus.hero` | Homepage hero section | Quick links below the hero title |
| `menus.footer` | Footer | Secondary navigation (search, RSS, etc.) |

```toml
# Header nav
[[menus.main]]
  name = "Posts"
  url = "/posts/"
  weight = 1

# Hero quick links
[[menus.hero]]
  name = "About"
  url = "/about/"
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
  # og_locale = "en_US"              # Override OG locale

  # JSON-LD (optional — enriches Person schema)
  # job_title = "Software Engineer"
  # knows_about = ["Automation", "AI"]

  # Homepage hero
  hero_title = "Your <em>Title</em>"  # Supports HTML for accent styling
  hero_subtitle = "Your subtitle."

  # Homepage sections
  homepage_posts = 5                  # Number of posts on homepage
  homepage_projects = 3               # Number of projects on homepage

  # Footer
  footer_left = "Your Name · Powered by Hugo"

  # Social (drives footer icons + JSON-LD sameAs)
  [params.social]
    github = "yourname"
    # email, nostr, mastodon, matrix, signal, linkedin, twitter

  # PGP fingerprint (optional, shown in footer)
  # [params.crypto]
  #   pgp_fingerprint = "XXXX XXXX ..."
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

## Front Matter

```yaml
---
title: "Post Title"
date: 2025-02-19
tags: ["tag1", "tag2"]
description: "Post description for SEO and previews."
toc: true          # Enable table of contents
pinned: true       # Pin to top of lists and homepage
noindex: true      # Block search engine indexing for this page
image: "cover.jpg" # Hero image + OG image
---
```

### Portfolio Front Matter

```yaml
---
title: "Project Name"
date: 2025-01-01
description: "Project description."
category: "automation"
status: "active"        # Shows colored badge (active/completed)
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

## Color Scheme

Soberano is a **dark-only theme by design**. The cypherpunk aesthetic is inseparable from its dark palette. There is no light mode toggle. If you need light mode support, consider forking and adding a `[data-theme="light"]` variable set.

| Variable | Hex | Usage |
|---|---|---|
| `--bg` | `#0a0a0a` | Background |
| `--surface` | `#111111` | Cards, code blocks |
| `--accent` | `#f7931a` | Links, highlights (Bitcoin orange) |
| `--text` | `#e8e8e8` | Primary text |
| `--text-dim` | `#888888` | Secondary text |
| `--green` | `#4ade80` | Success, active status |
| `--red` | `#f87171` | Warnings |

Override any variable by creating `assets/css/custom.css` in your project.

## Security Headers

Soberano outputs no inline styles or scripts that violate CSP. Here are recommended headers per platform:

### Netlify (`netlify.toml`)

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

[[headers]]
  for = "/pagefind/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Vercel (`vercel.json`)

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
    },
    {
      "source": "/fonts/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/pagefind/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

### Cloudflare Pages (`_headers`)

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

/pagefind/*
  Cache-Control: public, max-age=31536000, immutable
```

> **Note on Pagefind:** The CSP above already covers Pagefind — `style-src 'self'` allows Pagefind's external CSS, and `connect-src 'self'` allows search index fetching. No `'unsafe-inline'` is needed; the theme's Pagefind loader uses DOM construction instead of inline styles.

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

**Hardened mode** adds `no-referrer` and `x-dns-prefetch-control: off` meta tags. Suitable for privacy-conscious clearnet sites.

**Paranoid mode** strips all identifying metadata. Only pseudonymous/federated networks (Nostr, Matrix, Mastodon, XMPP, SimpleX) appear in the footer. No author information leaks via RSS, JSON-LD, or meta tags. Ideal for `.onion` sites or maximum anonymity.

### System Fonts

Set `system_fonts = true` to skip loading self-hosted WOFF2 fonts. The theme falls back to system monospace and serif stacks. Useful for Tor users where every kilobyte counts.

### EXIF Stripping

Hugo automatically strips EXIF metadata when processing images with `Resize`, `Fill`, or `Crop`. Use page bundles for automatic image processing — no manual stripping needed.

### CSS-Only Mobile Navigation

The mobile navigation menu works without JavaScript via CSS `:target` selector. When JS is available, the theme progressively enhances with a toggle button for better UX.

## Requirements

- Hugo **v0.152.0** or later (standard edition is fine)
- No Node.js required
- No external dependencies

## License

MIT
