---
title: "Integrity Manifest"
layout: integrity
description: "SHA-256 checksums for all published content."
---

SHA-256 checksums for all published content. Hashes are computed from the Markdown source (`RawContent`) at build time. Pages with manually provided hashes are marked as **signed**.

To verify a hash, clone the repository and run:

```bash
# Strip front matter and compute hash
awk '/^---$/{n++; next} n>=2' content/posts/your-post.md | sha256sum
```
