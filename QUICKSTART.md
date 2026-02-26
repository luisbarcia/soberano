# Quickstart

From zero to a running Soberano site in 10 minutes.

## Prerequisites

- [Hugo](https://gohugo.io/installation/) v0.152.0+ (standard edition)
- [Go](https://go.dev/dl/) (for Hugo Modules)

## 1. Create your site

```bash
hugo new site mysite
cd mysite
hugo mod init github.com/yourname/mysite
```

Add the theme to `hugo.toml`:

```toml
[module]
  [[module.imports]]
    path = "github.com/luisbarcia/soberano"
```

Pull the theme:

```bash
hugo mod get
```

## 2. Copy the example config

```bash
curl -o hugo.toml https://raw.githubusercontent.com/luisbarcia/soberano/main/exampleSite/hugo.toml
```

Remove the `[module] replacements` line (that's only for theme development):

```toml
# DELETE this line:
#   replacements = "github.com/luisbarcia/soberano -> ../.."
```

Your `[module]` block should look like:

```toml
[module]
  [[module.imports]]
    path = "github.com/luisbarcia/soberano"
```

## 3. Make it yours

Edit `hugo.toml` and replace the placeholder values:

```toml
baseURL = "https://yoursite.com/"
title = "Your Site Name"

[params]
  description = "What your site is about."
  author = "Your Name"
  tagline = "// your tagline"
  hero_title = "Your <em>Name</em>"
  hero_subtitle = "One line about you."

[params.social]
  github = "yourname"
  # email = "you@example.com"
```

## 4. Create your first post

```bash
hugo new posts/hello-world.md
```

Edit `content/posts/hello-world.md`:

```yaml
---
title: "Hello World"
date: 2026-02-25
draft: false
tags: ["intro"]
description: "My first post."
---

Welcome to my sovereign corner of the internet.
```

## 5. Create a portfolio item

```bash
hugo new portfolio/my-project.md
```

Edit `content/portfolio/my-project.md`:

```yaml
---
title: "My Project"
date: 2026-02-25
draft: false
description: "What this project does."
category: "web"
status: "active"
stack: ["Hugo", "Go"]
tags: ["web"]
links:
  Source: "https://github.com/yourname/project"
---

## Overview

What the project does and why it exists.
```

## 6. Run it

```bash
hugo server -D
```

Open http://localhost:1313. You should see your site with the dark Soberano theme, your post listed, and your project in the portfolio grid.

## 7. Add optional pages

### About

Create `content/about.md`:

```yaml
---
title: "About"
description: "About me."
---

Write about yourself here.
```

### Search

Soberano uses [Pagefind](https://pagefind.app) for client-side search. Create `content/search.md`:

```yaml
---
title: "Search"
layout: search
---
```

The search index is built after `hugo --gc --minify`. During `hugo server`, the search page will show a "not available" message — this is expected.

### Archive

Posts grouped by year. Create `content/archive.md`:

```yaml
---
title: "Archive"
layout: archive
description: "All posts by year."
---
```

Once created, the archive page is automatically linked in the footer.

## 8. Sovereignty features (optional)

These are what make Soberano unique. All are opt-in.

### Warrant Canary

```bash
hugo new canary.md
```

This creates `content/canary.md` with instructions for PGP-signing your statement. Update `bitcoin_block` and `bitcoin_hash` with the latest block from [mempool.space](https://mempool.space).

### PGP Key Page

Create `content/pgp.md` with this front matter:

```yaml
---
title: "PGP Public Key"
layout: pgp
---
```

Then paste your public key block in the body of the file (as a fenced code block with `text` language).

Configure the fingerprint in `hugo.toml`:

```toml
[params.crypto]
  pgp_fingerprint = "XXXX XXXX XXXX XXXX XXXX  XXXX XXXX XXXX XXXX XXXX"
  pgp_key_url = "/pgp/"
```

### Content Integrity

Every post automatically shows a SHA-256 hash. For a site-wide manifest, create `content/integrity.md`:

```yaml
---
title: "Integrity Manifest"
layout: integrity
---
```

### Support Page

```bash
hugo new support.md
```

Configure crypto addresses in `hugo.toml`:

```toml
[[params.crypto.support]]
  name = "Bitcoin"
  label = "on-chain"
  address = "bc1q..."
  description = "On-chain transaction."
  privacy = "standard"

[[params.crypto.support]]
  name = "Monero"
  label = "XMR"
  address = "4..."
  description = "Private by default."
  privacy = "paranoid"
```

## 9. Privacy (optional)

Choose a privacy preset:

| Preset | What it does |
|--------|-------------|
| `standard` | Full metadata, all social links, complete JSON-LD |
| `hardened` | No generator tag, no-referrer policy, reduced JSON-LD |
| `paranoid` | No OG/Twitter/canonical, no Person schema, federated networks only |

```toml
[params.privacy]
  preset = "hardened"
```

Override individual flags as needed:

```toml
[params.privacy]
  preset = "paranoid"
  show_pgp_badge = true        # keep PGP visible even in paranoid
  show_pgp_fingerprint = true
```

See the [README](README.md#privacy-system) for the full list of 21 flags.

## 10. Deploy

```bash
hugo --gc --minify
```

The `public/` directory is your complete static site. Deploy it to any static host:

- **Netlify**: Push to GitHub, connect repo
- **Cloudflare Pages**: Push to GitHub, connect repo
- **Vercel**: Push to GitHub, connect repo
- **Self-hosted**: Copy `public/` to your server

See the [README](README.md#security-headers) for recommended security headers per platform.

## What's next

- Read the full [README](README.md) for all configuration options
- Check `exampleSite/` for a complete working example
- See `exampleSite/content/` for sample posts and portfolio items
