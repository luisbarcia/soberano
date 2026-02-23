# AUDITORIA COMPLETA — Tema Hugo Soberano

> **Data:** 2026-02-23
> **Hugo Version Target:** v0.156.0
> **Metodologia:** Sistema HUGO MASTER Multi-Role (10 roles)
> **Auditor:** Claude (Opus 4.6)

---

## RESUMO EXECUTIVO

| Categoria | Nota | Veredicto |
|-----------|------|-----------|
| Arquitetura | A | Estrutura limpa, Hugo-idiomatic |
| Templates | A | Zero funções deprecated, boa documentação |
| CSS/Design | A | Dark-only coerente, acessível, <30KB |
| JavaScript | A+ | 72 linhas vanilla, zero deps |
| SEO | A+ | JSON-LD completo (7 schemas), OG, Twitter |
| Acessibilidade | A | Skip-link, ARIA, focus-visible, reduced-motion |
| Performance | A+ | SRI, fingerprint, lazy load, <30KB CSS+JS |
| Segurança | A- | SRI, CSP-ready (com 2 exceções) |
| i18n | A | 100% paridade EN/PT-BR (22 strings) |
| ExampleSite | B | Funcional mas incompleto |
| Compatibilidade v0.156 | A+ | Zero funções removidas encontradas |

**Veredicto geral: PRONTO PARA PRODUÇÃO com ajustes menores.**

---

## Roles Ativados

```
ARQUITETO DE PROJETO + DESIGNER DE TEMAS + ENGENHEIRO DE TEMPLATES +
ESTRATEGISTA DE CONTEÚDO + ENGENHEIRO DE PERFORMANCE +
ESPECIALISTA SEO + ENGENHEIRO DE DEPLOY +
ESPECIALISTA EM SEGURANÇA + ENGENHEIRO DE QUALIDADE +
ENGENHEIRO DE MANUTENÇÃO
```

---

## 1. ARQUITETO DE PROJETO

### Estrutura de Diretórios

A estrutura segue o padrão canônico Hugo. Todos os diretórios essenciais estão presentes:

```
soberano/
├── archetypes/              # default.md, portfolio.md
├── assets/css/              # main.css (~1305 linhas), syntax.css
├── assets/js/               # main.js (~72 linhas), pagefind-loader.js
├── exampleSite/             # Demo site completo
├── i18n/                    # en.yaml, pt-br.yaml (22 strings cada)
├── layouts/
│   ├── _default/            # baseof, list, single, terms, taxonomy, search
│   ├── _markup/             # render-heading, render-image, render-link
│   ├── partials/            # header, footer, post-item, project-card, components/picture
│   ├── portfolio/           # list, single
│   └── shortcodes/          # axiom, manifesto, card
├── static/fonts/            # 5 WOFF2 files (Space Mono + Instrument Serif)
├── go.mod                   # github.com/luisbarcia/soberano
├── theme.toml               # Metadados do tema
└── README.md
```

### Configuração (go.mod)

- `module github.com/luisbarcia/soberano` com Go 1.22
- Distribuição como Hugo Module configurada corretamente

### Decisões Arquiteturais Validadas

| Decisão | Escolha | Justificativa |
|---------|---------|---------------|
| CSS Stack | CSS Puro | Zero deps, alinhado com filosofia privacy-first |
| JS Strategy | Vanilla minimal | 72 linhas, sem frameworks, sem build tools |
| Dark Mode | Dark-only | Sem toggle, single scheme simplifica CSS |
| Fonts | Self-hosted WOFF2 | Sem Google Fonts, sem requests externos |
| Search | Pagefind | Client-side, sem server, carregamento dinâmico |
| Distribution | Hugo Module | Padrão moderno, versionamento via Go modules |

---

## 2. ENGENHEIRO DE TEMPLATES — Compatibilidade v0.156.0

### Varredura de Funções Removidas/Deprecated

| Função Removida (v0.156+) | Encontrada? | Status |
|----------------------------|-------------|--------|
| `getCSV` / `getJSON` | Não | SEGURO |
| `resources.ToCSS` | Não | SEGURO |
| `resources.PostCSS` | Não | SEGURO |
| `resources.Babel` | Não | SEGURO |
| `.Page.NextPage` / `.PrevPage` | Não | SEGURO |
| `.Paginator.PageSize` | Não | SEGURO |
| `.Site.LastChange` | Não | SEGURO |
| `.Site.Author` | Não | SEGURO (usa `site.Params.author`) |
| `.Site.Social` | Não | SEGURO (usa `site.Params.social`) |
| `.Site.IsMultiLingual` | Não | SEGURO |
| `.Sites.First` | Não | SEGURO |
| `.Site.Data` | Não | SEGURO |
| `.Site.AllPages` | Não | SEGURO |
| `.Page.URL` | Não | SEGURO |
| `readDir` / `readFile` | Não | SEGURO |

**CONCLUSÃO: 0/15 funções removidas. Tema 100% compatível com Hugo v0.156.0+**

### Anti-Patterns Detectados

| # | Severidade | Arquivo | Linha | Problema | Fix Recomendado |
|---|-----------|---------|-------|----------|-----------------|
| 1 | MEDIO | `layouts/_default/terms.html` | 9 | Inline `style="gap: 0.8rem;"` — viola CSP | Mover para classe CSS `.post-tags` |
| 2 | MEDIO | `layouts/404.html` | 12 | `{{ .Site.BaseURL }}not-found` — trailing slash dupla possível | Usar `{{ .Site.BaseURL \| strings.TrimRight "/" }}/not-found` |
| 3 | BAIXO | `layouts/partials/footer.html` | 86,89 | `safeHTML` em params do footer | Documentar que aceita HTML ou usar `markdownify` |
| 4 | BAIXO | `layouts/index.html` | 10 | `safeHTML` no hero_title | Aceito (admin-controlled), documentar |

### Template por Template

| Template | Linhas | Comentários | Notas |
|----------|--------|-------------|-------|
| `baseof.html` | 321 | Excelente | JSON-LD, OG, SRI, skip-link |
| `index.html` | 77 | Bom | Falta aria-label nas sections |
| `single.html` | ~80 | Bom | Progress bar, TOC, related |
| `list.html` | ~50 | Bom | Pagination com rel prev/next |
| `taxonomy.html` | ~15 | Mínimo | Funcional |
| `terms.html` | 17 | Problema | Inline style (CSP) |
| `search.html` | ~30 | Bom | Preload CSS, noscript fallback |
| `404.html` | 27 | Problema | URL hardcoded, texto sem i18n |
| `portfolio/list.html` | ~12 | Mínimo | Funcional |
| `portfolio/single.html` | ~60 | Bom | Status dots, links externos |
| `render-heading.html` | ~10 | Bom | Anchor links com aria-label |
| `render-image.html` | ~30 | Excelente | WebP + fallback, lazy load |
| `render-link.html` | ~15 | Excelente | External detection, noopener |
| `header.html` | ~20 | Bom | aria-expanded, aria-current |
| `footer.html` | 98 | Bom | SVG + sr-only, rel="me" |
| `picture.html` | ~60 | Excelente | srcset 3 widths, doc completa |
| `axiom.html` | ~8 | Bom | role="note" |
| `manifesto.html` | ~8 | Bom | role="note" |
| `card.html` | ~8 | Bom | role="article" |
| `robots.txt` | ~10 | Excelente | Dinâmico por ambiente |
| `sitemap.xml` | ~23 | Excelente | Respeita noindex, multilíngue |
| `rss.xml` | ~64 | Excelente | RSS 2.0 + Atom self-link |
| `index.json` | ~15 | Bom | Search index para Pagefind |

---

## 3. ENGENHEIRO DE PERFORMANCE

### Asset Pipeline

| Asset | Raw | Minificado (est.) | Pipeline |
|-------|-----|-------------------|----------|
| main.css | ~1305 linhas | ~23KB | `minify \| fingerprint` + SRI |
| syntax.css | ~76 linhas | ~3KB | `minify \| fingerprint` + SRI |
| main.js | ~72 linhas | ~2KB | `minify \| fingerprint` + SRI |
| pagefind-loader.js | ~24 linhas | <1KB | `minify \| fingerprint` |
| **TOTAL CSS+JS** | — | **~29KB** | **Alvo <90KB: APROVADO** |

### Core Web Vitals (Estimativa)

| Métrica | Alvo | Estimativa | Status |
|---------|------|-----------|--------|
| LCP | <2.5s | <1.5s | EXCELENTE — fonts self-hosted, CSS crítico inline-able |
| INP | <200ms | <50ms | EXCELENTE — JS minimal, passive listeners |
| CLS | <0.1 | ~0 | EXCELENTE — width/height em imgs, font-display:swap |

### Lighthouse (Estimativa)

| Métrica | Alvo | Estimativa |
|---------|------|-----------|
| Performance | ≥95 | ~98-100 |
| Accessibility | ≥95 | ~95-98 |
| Best Practices | 100 | ~100 |
| SEO | 100 | ~100 |

### Otimizações Presentes

- `font-display: swap` em todas as 5 `@font-face` (`main.css:7-45`)
- `loading="lazy"` + `decoding="async"` em imagens de conteúdo
- `loading="eager"` em hero image (above the fold) (`single.html:26`)
- `<picture>` com WebP srcset (480w, 768w, 1200w) + JPG fallback (`picture.html`)
- `partialCached` no footer (`baseof.html:313`)
- Scroll listener com `{ passive: true }` (`main.js:67`)
- `defer` em todos os scripts (`baseof.html:317`)
- Print stylesheet via `@media print` (`main.css:1082-1109`)
- CSS custom properties para theming eficiente (`main.css:47-73`)
- `clamp()` para fluid typography (`main.css:128`)

---

## 4. ESPECIALISTA SEO

### JSON-LD Structured Data — COMPLETO

| Tipo de Página | Schema | Localização |
|----------------|--------|-------------|
| Homepage | WebSite + Person (@graph) | `baseof.html:94-124` |
| Blog Post | BlogPosting + author + publisher | `baseof.html:127-147` |
| Portfolio | CreativeWork + genre + keywords | `baseof.html:150-164` |
| About | ProfilePage + Person | `baseof.html:167-175` |
| Posts List | Blog + blogPost[] | `baseof.html:178-193` |
| Portfolio List | ItemList + ListItem[] | `baseof.html:196-210` |
| Páginas genéricas | WebPage | `baseof.html:213-225` |
| Fallback | WebPage (minimal) | `baseof.html:228-232` |
| Todas (exceto home) | BreadcrumbList | `baseof.html:235-248` |
| Opcional (front matter) | FAQPage | `baseof.html:251-264` |
| Opcional (front matter) | HowTo | `baseof.html:265-277` |

### Features JSON-LD Avançadas

- Person schema com `sameAs` (social links dinâmicos)
- `knowsAbout` e `jobTitle` opcionais
- PGP fingerprint como `PropertyValue`
- SearchAction no WebSite (se página /search existe)
- `timeRequired` calculado automaticamente (ISO 8601)
- `wordCount` em BlogPosting
- Breadcrumbs com 3 níveis (Home > Section > Page)

### Meta Tags Completas

| Meta | Arquivo:Linha | Detalhes |
|------|---------------|----------|
| `<title>` | `baseof.html:279` | Block overridável, fallback `Page · Site` |
| `description` | `baseof.html:10-12` | Chain: `.Description` > `.Summary` > `site.Params.description` |
| `canonical` | `baseof.html:70` | `.Permalink` absoluto |
| `robots` | `baseof.html:19-21` | Dinâmico: ambiente + per-page `noindex` |
| `og:title` | `baseof.html:24` | `.Title` |
| `og:description` | `baseof.html:25` | `$desc` sanitizado |
| `og:type` | `baseof.html:26` | `article` ou `website` |
| `og:url` | `baseof.html:27` | `.Permalink` |
| `og:site_name` | `baseof.html:28` | `site.Title` |
| `og:locale` | `baseof.html:29` | Configurable com fallback |
| `og:image` | `baseof.html:38-60` | Auto-processado: 1200x630 WebP q85 |
| `og:image:alt` | `baseof.html:59` | `$desc` como alt |
| `article:published_time` | `baseof.html:31` | ISO 8601 |
| `article:modified_time` | `baseof.html:32` | Condicional |
| `article:author` | `baseof.html:33` | Via `site.Params.author` |
| `article:tag` | `baseof.html:34` | Cada tag como meta separado |
| `twitter:card` | `baseof.html:63` | `summary_large_image` ou `summary` |
| `twitter:site` | `baseof.html:67` | Via `site.Params.social.twitter` |
| `hreflang` | `baseof.html:72-79` | Multilíngue com `x-default` |
| `author` | `baseof.html:13-14` | Via `site.Params.author` |
| `generator` | `baseof.html:16` | `Hugo {{ hugo.Version }}` |
| RSS autodiscovery | `baseof.html:288-290` | Via `AlternativeOutputFormats` |

### Sitemap + RSS

- **sitemap.xml**: Respeita `noindex`, inclui `lastmod`, suporta multilíngue via `xhtml:link`
- **rss.xml**: RSS 2.0 + Atom self-link, `content:encoded` em CDATA, filtra `noindex` e sem-data, author per-item, categories from tags

---

## 5. ESPECIALISTA EM SEGURANÇA

### Pontos Fortes

| Feature | Implementação | Localização |
|---------|---------------|-------------|
| SRI (Subresource Integrity) | CSS e JS com `integrity` + `crossorigin` | `baseof.html:282-285, 316-317` |
| Fingerprinting | Hash SHA256 em URLs | Pipeline `\| fingerprint` |
| External links | `rel="noopener noreferrer"` | `render-link.html`, `footer.html` |
| Mastodon verification | `rel="me"` | `footer.html:33` |
| Markdown unsafe | `unsafe = false` | `hugo.toml` |
| Robots dinâmico | `Disallow: /` fora de produção | `robots.txt` |
| Go template escaping | Automático | Em todos os templates |
| JSON-LD safe | `jsonify \| safeHTML` | `baseof.html` |

### Pontos de Atenção

| # | Risco | Detalhe | Recomendação |
|---|-------|---------|--------------|
| 1 | MEDIO | `terms.html:9` — inline `style` viola CSP strict | Mover para CSS class |
| 2 | BAIXO | `footer.html:86,89` — `safeHTML` em params | Mitigado (admin-controlled), documentar |
| 3 | BAIXO | `index.html:10` — `safeHTML` no hero | Mitigado (admin-controlled), documentar |
| 4 | INFO | Sem bloco `[security]` no hugo.toml | Recomendado para temas publicados |
| 5 | INFO | `meta name="generator"` expõe versão | Considerar remover em produção |

---

## 6. ENGENHEIRO DE QUALIDADE — Acessibilidade

### WCAG 2.1 AA Compliance

| Critério | Status | Implementação |
|----------|--------|---------------|
| Skip-link | PRESENTE | `baseof.html:302`, i18n, visível no focus |
| Semantic HTML | PRESENTE | `<main>`, `<article>`, `<nav>`, `<aside>`, `<figure>` |
| `aria-label` | PRESENTE | Menus, pagination, TOC, social, headings |
| `aria-expanded` | PRESENTE | Mobile nav toggle (`header.html:11`) |
| `aria-current="page"` | PRESENTE | Nav ativa (`header.html:17`) |
| `aria-hidden` | PRESENTE | SVGs decorativos (`footer.html`) |
| `.sr-only` | PRESENTE | Labels de ícones sociais (8 ocorrências) |
| `focus-visible` | PRESENTE | Global: links, buttons (`main.css:1157-1170`) |
| `prefers-reduced-motion` | PRESENTE | Desabilita transições (`main.css:1112-1118`) |
| `prefers-contrast: more` | PRESENTE | Aumenta contraste (`main.css:1121-1128`) |
| Alt text em imagens | PRESENTE | render-image e picture partial |
| `lang` attribute | PRESENTE | `<html lang="...">` (`baseof.html:4`) |
| Width/height em imgs | PRESENTE | Previne CLS (`picture.html:55-56`) |
| `<noscript>` | PRESENTE | Fallback para busca (`search.html:20`) |
| Print stylesheet | PRESENTE | `@media print` (`main.css:1082-1109`) |

### Melhorias Sugeridas

| Local | Problema | Melhoria |
|-------|----------|----------|
| `index.html:31,53` | `<section>` sem label | Adicionar `aria-label` |
| `project-card.html` | Link sem label acessível | Adicionar `aria-label="{{ .Title }}"` |
| `404.html:17-19` | Texto hardcoded em inglês | Usar i18n strings |

---

## 7. ESTRATEGISTA DE CONTEÚDO — i18n

### Paridade EN/PT-BR: 100% (22/22 strings)

| Chave | EN | PT-BR |
|-------|-----|-------|
| newer | Newer | Mais recente |
| older | Older | Mais antigo |
| allPosts | All posts | Todos os posts |
| allProjects | All projects | Todos os projetos |
| contents | Contents | Índice |
| tags | Tags | Tags |
| stack | Stack | Stack |
| posts | posts | posts |
| post | post | post |
| minRead | min read | min de leitura |
| nothingPublished | Nothing published yet | Nada publicado ainda |
| searchRequiresJS | Search requires JavaScript | A busca requer JavaScript |
| skipToContent | Skip to content | Pular para o conteúdo |
| copyCode | Copy | Copiar |
| copied | Copied | Copiado |
| backToPortfolio | Back to portfolio | Voltar ao portfólio |
| home | Home | Início |
| tag | TAG | TAG |
| related | Related | Relacionados |

**Status: PARIDADE PERFEITA**

### Strings Faltantes (não i18n)

| Arquivo | Linha | Texto Hardcoded | Ação |
|---------|-------|-----------------|------|
| `404.html` | 13 | "ERROR: resource not found in any mirror" | Criar string i18n |
| `404.html` | 17-19 | "This page doesn't exist..." | Criar string i18n |

### Archetypes

| Arquivo | Campos Presentes | Campos Faltando |
|---------|-----------------|-----------------|
| `default.md` | title, date, draft, tags, description, toc | `author` |
| `portfolio.md` | title, date, description, category, status, stack, links, client, period, role | `cover_alt` |

---

## 8. DESIGNER DE TEMAS — ExampleSite

### Problemas do ExampleSite

| # | Severidade | Problema | Recomendação |
|---|-----------|---------|--------------|
| 1 | ALTO | Menu `hero` aponta para `/resources/` (404) | Remover do menu ou criar conteúdo |
| 2 | ALTO | Sem demonstração de i18n | Adicionar `[languages]` section |
| 3 | MEDIO | Apenas 1 projeto no portfolio | Adicionar 2-3 variados |
| 4 | MEDIO | Sem imagens nos posts | Adicionar post com imagem bundle |
| 5 | MEDIO | `_index.md` homepage sem description | Adicionar front matter completo |
| 6 | MEDIO | Outputs apenas na home | Adicionar `section` e `taxonomy` outputs |
| 7 | BAIXO | Params avançados comentados | Descomentar exemplos |
| 8 | BAIXO | `go.mod` sem `require` do tema | Adicionar dependência |

### Extension Points Validados

| Hook | Status | Local |
|------|--------|-------|
| `block "head"` | PRESENTE | `baseof.html:298` |
| `block "scripts"` | PRESENTE | `baseof.html:319` |
| `block "title"` | PRESENTE | `baseof.html:279` |
| `block "main"` | PRESENTE | `baseof.html:308` |
| `block "container_class"` | PRESENTE | `baseof.html:307` |
| CSS custom properties | PRESENTE | `main.css:47-73` |
| `[params.features]` | PARCIAL | Suporta axiom, manifesto |
| `partialCached footer` | PRESENTE | `baseof.html:313` |

---

## 9. ENGENHEIRO DE MANUTENÇÃO — Plano de Ação

### ALTA PRIORIDADE (Corrigir antes de v1.0)

#### Fix 1: Inline style em terms.html

**Arquivo:** `layouts/_default/terms.html:9`

```diff
- <div class="post-tags" style="gap: 0.8rem;">
+ <div class="post-tags">
```

**Adicionar ao CSS** (`assets/css/main.css`):
```css
/* Na seção de post-tags existente */
.post-tags {
  gap: 0.8rem;
}
```

#### Fix 2: URL hardcoded em 404.html

**Arquivo:** `layouts/404.html:12`

```diff
- <span class="error-page__accent">$ </span>curl -s {{ .Site.BaseURL }}not-found<br>
+ <span class="error-page__accent">$ </span>curl -s {{ .Site.BaseURL | strings.TrimRight "/" }}/not-found<br>
```

#### Fix 3: Menu hero com link quebrado

**Arquivo:** `exampleSite/hugo.toml`

Remover ou alterar a entrada do menu hero que aponta para `/resources/`:
```diff
- [[menus.hero]]
-   name = "Resources"
-   url = "/resources/"
-   weight = 3
```

#### Fix 4: Texto hardcoded sem i18n no 404

**Arquivos:** `i18n/en.yaml`, `i18n/pt-br.yaml`, `layouts/404.html`

Adicionar strings de i18n para o conteúdo da página 404.

### MEDIA PRIORIDADE

| # | Ação | Arquivo |
|---|------|---------|
| 5 | Adicionar 2-3 projetos ao portfolio | `exampleSite/content/portfolio/` |
| 6 | Adicionar post com imagem para demo | `exampleSite/content/posts/` |
| 7 | Atualizar `min_version` para 0.156.0 | `theme.toml` |
| 8 | Adicionar `aria-label` nas sections | `layouts/index.html` |
| 9 | Homepage `_index.md` com description | `exampleSite/content/_index.md` |

### BAIXA PRIORIDADE

| # | Ação | Arquivo |
|---|------|---------|
| 10 | Adicionar campo `author` | `archetypes/default.md` |
| 11 | Adicionar campo `cover_alt` | `archetypes/portfolio.md` |
| 12 | Remover generator meta em prod | `layouts/_default/baseof.html` |
| 13 | Adicionar `[security]` block | `exampleSite/hugo.toml` |
| 14 | Demo multilíngue | `exampleSite/hugo.toml` |

---

## 10. ENGENHEIRO DE DEPLOY — Notas

### Compatibilidade de Plataforma

O tema é compatível com todas as plataformas de hospedagem estática:
- GitHub Pages (via GitHub Actions)
- Netlify
- Vercel
- Cloudflare Pages

### Requisitos de Build

- Hugo Standard Edition v0.128.0+ (v0.156.0+ recomendado)
- Não requer Hugo Extended (WebP via WASM desde v0.153)
- Não requer Node.js (CSS puro, JS vanilla)
- Não requer Dart Sass (CSS puro)

### Pagefind

Pagefind precisa ser executado após o build Hugo:
```bash
hugo --gc --minify
npx pagefind --site public
```

---

## CONCLUSÃO — FASE 1 (Clearnet)

O tema **Soberano** é um tema Hugo de **alta qualidade**, com implementação exemplar em:

1. **SEO**: JSON-LD completo com 7+ tipos de schema, OG/Twitter tags dinâmicos, sitemap filtrado, RSS robusto
2. **Acessibilidade**: Skip-link, ARIA completo, focus-visible, reduced-motion, high-contrast, sr-only
3. **Performance**: ~29KB total CSS+JS, SRI, fingerprinting, responsive WebP images, lazy loading
4. **Compatibilidade**: Zero funções deprecated, pronto para Hugo v0.156.0+
5. **Privacidade**: Zero tracking, zero CDN, zero Google Fonts, self-hosted completo

Os **14 problemas identificados** (4 altos, 6 médios, 4 baixos) são todos corrigíveis e nenhum é bloqueador crítico para produção.

**Recomendação**: Corrigir os 4 itens de alta prioridade e publicar como v1.0.

Após resolver os itens da Fase 1, avançar para a Fase 2 (Dark Web Readiness) documentada abaixo.

---
---

# FASE 2 — DARK WEB READINESS (.onion)

> **Premissa:** O tema Soberano carrega filosofia cypherpunk e "sovereign publishing".
> Prever uso na dark web (Tor/.onion) é uma extensão natural dessa identidade.
> Esta seção documenta o que muda quando o threat model inclui anonimato do operador.

---

## Debate Inter-Roles

### Mudança de Threat Model

Na clearnet, o tema protege o **visitante** (sem tracking, sem CDN, sem Google Fonts).
Na dark web, o tema precisa proteger o **operador E o visitante** — qualquer vazamento
de metadata pode correlacionar o site .onion com uma identidade real.

O Soberano **já é ~70% dark-web-ready** graças às decisões fundamentais:
- Zero external requests
- Self-hosted fonts (WOFF2)
- Dark-only (cultura Tor)
- Minimal JS (~72 linhas)
- Estética monospace/cypherpunk

Os **30% restantes** se dividem em 3 categorias: vazamento de metadata, performance no Tor, e dependência de JavaScript.

---

## Categoria 1: Vazamento de Metadata (Identidade do Operador)

### D1 — `meta generator` expõe versão Hugo

| | |
|---|---|
| **Severidade** | ALTA |
| **Arquivo** | `layouts/_default/baseof.html:16` |
| **Código atual** | `<meta name="generator" content="Hugo {{ hugo.Version }}">` |
| **Risco** | Fingerprinting — adversário correlaciona versão exata do Hugo com deployments conhecidos, reduz o anonymity set do operador |
| **Fix** | Feature flag para desabilitar, ou remover no modo onion |

### D2 — JSON-LD Person vaza identidade real

| | |
|---|---|
| **Severidade** | ALTA |
| **Arquivo** | `layouts/_default/baseof.html:96-103` |
| **Código atual** | Person schema com `name`, `jobTitle`, `sameAs` (GitHub, Twitter, LinkedIn), `knowsAbout`, PGP fingerprint |
| **Risco** | Deanonymization direta — o operador pode publicar anonimamente, mas o tema injeta sua identidade real no HTML via JSON-LD invisível ao olho nu |
| **Fix** | No modo onion: schema mínimo WebSite sem Person, ou Person com pseudônimo |

### D3 — OG/Twitter meta tags vazam URLs clearnet

| | |
|---|---|
| **Severidade** | ALTA |
| **Arquivo** | `layouts/_default/baseof.html:24-67` |
| **Código atual** | `og:url`, `og:image`, `twitter:image` usam `.Permalink` (URL absoluta com baseURL) |
| **Risco** | Se o operador roda dual-stack (clearnet + .onion) com `baseURL` clearnet, as meta tags no site .onion vazam o domínio real. Mesmo sem dual-stack, OG/Twitter são irrelevantes no Tor |
| **Fix** | Desabilitar completamente no modo onion |

### D4 — Canonical URL vaza domínio clearnet

| | |
|---|---|
| **Severidade** | ALTA |
| **Arquivo** | `layouts/_default/baseof.html:70` |
| **Código atual** | `<link rel="canonical" href="{{ .Permalink }}">` |
| **Risco** | Em dual-stack, canonical aponta para clearnet, correlacionando os dois domínios |
| **Fix** | Desabilitar no modo onion |

### D7 — Social links no footer = deanonymization

| | |
|---|---|
| **Severidade** | MEDIA |
| **Arquivo** | `layouts/partials/footer.html:8-67` |
| **Código atual** | Links para GitHub, LinkedIn, Twitter, email, Mastodon, etc. |
| **Risco** | Cada link social é um vetor direto de deanonymization — conecta o site anônimo a contas reais |
| **Fix** | Condicionalizar: no modo onion, social links são suprimidos mesmo se configurados (exceto Nostr e Matrix que são nativamente pseudônimos) |

### D12 — `author` no RSS pode vazar identidade

| | |
|---|---|
| **Severidade** | BAIXA |
| **Arquivo** | `layouts/_default/rss.xml:52` |
| **Código atual** | `<dc:creator>{{ site.Params.author }}</dc:creator>` |
| **Risco** | Nome real no feed RSS pode ser capturado por agregadores |
| **Fix** | Condicionalizar por modo |

---

## Categoria 2: Performance no Tor

### D8 — Fonts adicionam ~5 requests extras

| | |
|---|---|
| **Severidade** | MEDIA |
| **Arquivo** | `assets/css/main.css:7-45` |
| **Código atual** | 5 `@font-face` declarations (Space Mono regular/700/italic, Instrument Serif regular/italic) |
| **Risco** | Tor adiciona 200-600ms de latência por hop (3 hops mínimos). 5 requests de fonts = 3-9 segundos extras no LCP. `font-display: swap` ajuda, mas o FOUT (Flash of Unstyled Text) é longo |
| **Opções** | |
| Opção A | Flag `params.privacy.system_fonts = true` — substitui por stack genérico `monospace, serif` |
| Opção B | Base64 embed das fonts no CSS — elimina requests mas engorda CSS de ~23KB para ~83KB |
| Opção C | Reduzir para 2 fonts (regular mono + regular serif) — 2 requests em vez de 5 |
| **Recomendação** | Opção A para modo onion (elimina fonts completamente), Opção C como otimização geral |

### Nota: CSS inline

Com ~23KB de CSS minificado, é viável fazer inline de todo o CSS no `<head>` para eliminar
o roundtrip do stylesheet. No Tor, isso pode economizar 600-1800ms. Implementável via
`resources.Get | minify` + output direto no `<style>` tag (flag `params.privacy.inline_css`).

---

## Categoria 3: Dependência de JavaScript

### D9 — Menu mobile requer JS

| | |
|---|---|
| **Severidade** | MEDIA |
| **Arquivo** | `assets/js/main.js:6-25` |
| **Código atual** | `addEventListener('click')` no toggle button para abrir/fechar nav |
| **Risco** | Tor Browser no modo "Safest" desabilita JavaScript completamente. O menu mobile fica inacessível — links de navegação ficam ocultos em telas pequenas |
| **Fix** | CSS-only fallback usando `:target` selector ou checkbox hack. O JS existente pode permanecer como progressive enhancement |

### D10 — SVGs podem não renderizar no Tor Safest

| | |
|---|---|
| **Severidade** | BAIXA |
| **Arquivo** | `layouts/partials/footer.html:13-62` |
| **Código atual** | ~40 linhas de SVG inline para ícones sociais |
| **Risco** | Tor Browser pode bloquear SVG rendering dependendo do security level. O `<span class="sr-only">` salva screen readers, mas visualmente ficam links vazios |
| **Fix** | Adicionar fallback texto visível ou caracteres Unicode que apareçam quando SVG falha |

### Nota: JS features não-críticas

O copy button e a reading progress bar (`main.js:28-70`) também dependem de JS,
mas são **features opcionais** que não afetam a navegação. O site funciona sem elas.
Nenhuma ação necessária — são progressive enhancement correto.

---

## Categoria 4: Headers de Privacidade

### D5 — Sem `Referrer-Policy: no-referrer`

| | |
|---|---|
| **Severidade** | MEDIA |
| **Arquivo** | `layouts/_default/baseof.html` (ausente) |
| **Risco** | Se o visitante clica num link externo, o header HTTP `Referer` pode vazar o .onion address para o site de destino |
| **Fix** | Adicionar `<meta name="referrer" content="no-referrer">` no modo onion/hardened |

### D6 — Sem `x-dns-prefetch-control: off`

| | |
|---|---|
| **Severidade** | MEDIA |
| **Arquivo** | `layouts/_default/baseof.html` (ausente) |
| **Risco** | Navegadores podem fazer DNS prefetch de links encontrados na página, vazando quais sites o visitante pode visitar. No Tor, qualquer DNS request fora do circuito é um leak |
| **Fix** | Adicionar `<meta http-equiv="x-dns-prefetch-control" content="off">` no modo onion/hardened |

### D11 — EXIF/metadata em imagens processadas

| | |
|---|---|
| **Severidade** | BAIXA |
| **Arquivo** | `layouts/partials/components/picture.html` |
| **Risco** | Imagens processadas por Hugo (`Resize`, `Fill`) podem reter metadata EXIF (GPS, câmera, software). Na dark web, metadata de fotos pode identificar o operador |
| **Nota** | Hugo strip EXIF por padrão ao processar imagens, mas vale documentar explicitamente e verificar com `exiftool` |
| **Fix** | Documentar no README que imagens são stripped; opcionalmente adicionar `exif.Lat`/`exif.Long` check no render hook para alertar |

---

## Proposta Arquitetural: `params.privacy.mode`

### Configuração

```toml
# hugo.toml
[params.privacy]
  # "standard"  — Clearnet normal. Todas as features habilitadas.
  # "hardened"  — Clearnet com privacidade extra. Remove generator,
  #               social meta, adiciona referrer/DNS headers.
  # "onion"     — Dark web. Strip toda metadata identificável,
  #               system fonts, CSS inline, sem JS obrigatório.
  mode = "standard"

  # Opções granulares (override do modo)
  # system_fonts = false
  # inline_css = false
  # show_generator = true
```

### Comportamento por Modo

| Feature | standard | hardened | onion |
|---------|----------|----------|-------|
| `meta generator` | Sim | Nao | Nao |
| JSON-LD Person (name, social) | Sim | Pseudônimo | Nao |
| JSON-LD WebSite | Sim | Sim | Mínimo |
| JSON-LD BlogPosting | Sim | Sem author real | Sem author |
| JSON-LD BreadcrumbList | Sim | Sim | Sim |
| OG meta tags | Sim | Sim | Nao |
| Twitter Card meta tags | Sim | Sim | Nao |
| Canonical URL | Sim | Sim | Nao |
| Hreflang | Sim | Sim | Nao |
| RSS autodiscovery | Sim | Sim | Sem author |
| Social links footer | Sim | Sim | Nao (*) |
| `Referrer-Policy` | Nao | `no-referrer` | `no-referrer` |
| `x-dns-prefetch-control` | Nao | `off` | `off` |
| Self-hosted fonts | Sim | Sim | System fonts |
| CSS delivery | External | External | Inline `<style>` |
| JS required para nav | Sim | Sim | Nao (CSS fallback) |

(*) Exceção: Nostr e Matrix podem ser mantidos no modo onion pois são nativamente pseudônimos.

### Retrocompatibilidade

- Default = `"standard"` — **nenhuma mudança para usuários existentes**
- Cada feature pode ser override individualmente
- O tema continua funcionando identicamente para quem nunca configura `[params.privacy]`

---

## Plano de Execução — Sequência Recomendada

### Fase 1: Clearnet (resolver primeiro)

Resolver os 14 itens da auditoria principal (seções 1-10 deste documento):

1. Fix inline style em `terms.html`
2. Fix URL hardcoded em `404.html`
3. Fix menu hero com link quebrado
4. Fix texto sem i18n no `404.html`
5. Melhorias no exampleSite (mais projetos, imagens, i18n demo)
6. Melhorias de acessibilidade (aria-labels, archetypes)

### Fase 2: Dark Web Readiness (depois da Fase 1)

Implementar em ordem de impacto:

1. **Criar sistema `params.privacy.mode`** — flag central que controla tudo
2. **Condicionalizar metadata** (D1-D4, D7, D12) — generator, JSON-LD, OG, canonical, social, RSS author
3. **Headers de privacidade** (D5-D6) — referrer, DNS prefetch
4. **System fonts mode** (D8) — flag para eliminar font requests
5. **CSS-only mobile nav** (D9) — fallback sem JS
6. **SVG fallback** (D10) — texto visível quando SVG bloqueado
7. **Documentar EXIF stripping** (D11) — no README
8. **Atualizar exampleSite** — exemplo de configuração onion
9. **Testar no Tor Browser** — todos os security levels (Standard, Safer, Safest)

---

## Conclusão Final (Fase 1 + Fase 2)

O tema Soberano tem fundações excepcionais para ser um dos raros temas Hugo que funciona
nativamente tanto na clearnet quanto na dark web. A filosofia "sovereign publishing" ganha
dimensão real quando o operador pode publicar em .onion com o mesmo tema, mudando apenas
uma linha de configuração.

**Estimativa de esforço:**
- Fase 1 (clearnet fixes): ~2-4 horas
- Fase 2 (dark web readiness): ~6-10 horas
- Testes no Tor Browser: ~2-3 horas

**Total: ~10-17 horas para um tema production-ready em clearnet E dark web.**
