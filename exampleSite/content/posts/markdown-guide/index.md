---
title: "Markdown & Shortcodes Guide"
date: 2026-01-10
tags: ["markdown", "tutorial", "hugo"]
description: "A comprehensive guide to all Markdown elements and custom shortcodes supported by the Soberano theme."
toc: true
---

This post demonstrates all the formatting elements available in Soberano.

## Typography

Regular paragraph text. **Bold text** for emphasis. *Italic text* for nuance. Inline `code` for technical terms. A [link to Hugo](https://gohugo.io) and an [internal link](/posts/hello-world/).

> Blockquotes are styled with an accent border and serif font. They work well for quotes, important notes, or philosophical asides.

---

## Headings

Headings from H2 to H4 are supported in the content area. Each gets an anchor link on hover for deep linking.

### Third Level

Content under a third-level heading. These appear in the accent color.

#### Fourth Level

Content under a fourth-level heading.

## Lists

Unordered list:

- First item with some detail
- Second item
- Third item

Ordered list:

1. Step one
2. Step two
3. Step three

## Code

Inline code: `hugo server -D`

Code block with syntax highlighting:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, Soberano!")
}
```

```bash
# Build for production
hugo --gc --minify --environment production
```

## Tables

| Feature | Status | Notes |
|---------|--------|-------|
| Dark mode | ✅ | Default and only mode |
| Responsive | ✅ | Mobile-first |
| i18n | ✅ | EN + PT-BR |
| Search | ✅ | Via Pagefind |

## Images

Images in leaf bundles are automatically processed to WebP with responsive srcset.

## Custom Shortcodes

### Axiom

{{< axiom label="First principle" >}}
Don't trust. Verify.
{{< /axiom >}}

### Manifesto

{{< manifesto label="DECLARATION" >}}
We build tools that respect the user.

Privacy is not a feature — it is a right.

Sovereignty starts with your own infrastructure.
{{< /manifesto >}}

### Callout

{{< callout type="info" title="Note" >}}
This is an informational callout. Use it for tips, references, or general guidance.
{{< /callout >}}

{{< callout type="warning" title="Heads up" >}}
This action may have unintended side effects. Review your configuration before proceeding.
{{< /callout >}}

{{< callout type="danger" title="Critical" >}}
This operation is **irreversible**. Make sure you have a backup before running `rm -rf /`.
{{< /callout >}}

{{< callout type="info" >}}
Callouts without a title work too — they just show the content with the accent border.
{{< /callout >}}

### Card

{{< card number="01" title="Self-Hosting" role="Infrastructure" >}}
Run your own services. Own your data. Eliminate single points of failure and third-party dependencies.
{{< /card >}}

{{< card number="02" title="Automation" role="Engineering" >}}
Automate repetitive processes with tools like **n8n** and scripting. Free your time for work that matters.
{{< /card >}}
