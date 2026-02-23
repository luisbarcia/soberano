---
title: "Working with Images"
date: 2025-07-10
draft: false
tags: ["hugo", "images", "tutorial"]
description: "Demonstrates how Soberano handles images via Hugo's render hooks, including responsive sizing and WebP conversion."
toc: true
---

## Image Render Hook

Soberano processes images through Hugo's built-in image render hook. When you include an image in Markdown, the theme automatically:

1. Converts to **WebP** format for smaller file sizes
2. Generates responsive `srcset` variants
3. Strips EXIF metadata for privacy
4. Adds proper `alt` text from the Markdown syntax

## Usage

Standard Markdown image syntax works out of the box:

```markdown
![A description of the image](photo.jpg)
```

Hugo will process any image placed alongside the content file (page bundle) or referenced from `static/`.

## Tips

- Always provide meaningful `alt` text for accessibility
- Use page bundles (`index.md` + images in same folder) for automatic processing
- Hugo strips EXIF data when using `Resize`, `Fill`, or `Crop` — good for privacy
- Prefer `.jpg` or `.png` source files; Hugo handles WebP conversion
