# Layout System Reference: Human Portfolio Website
### For Codex — Phase 1 (Homepage) → Phase N (All Pages)

> **How to use this document:** This is the complete layout contract for the entire site. Read it fully before touching any file. Every structural decision — breakpoints, spacing, grid columns, navigation behaviour, section rhythm — is defined here. When a pattern isn't specified, follow the spirit of this document: prefer asymmetry over symmetry, content-driven decisions over arbitrary defaults, and restraint over decoration.

---

## 1. PHILOSOPHY: WHY LAYOUT = TRUST

A human-built website does not feel "designed." It feels **edited**. The difference is intentionality. Every column width, every padding value, every breakpoint exists because the content demanded it — not because the framework defaulted to it.

The three rules that govern every layout decision in this system:

1. **No two adjacent sections should share the same visual structure.** Vary column count, text alignment, background treatment, or content density between every section.
2. **Mobile is not a shrunk desktop.** Every layout is conceived mobile-first and *expanded* for larger screens. Never add a breakpoint just because a device is bigger — add it only when the content starts to feel stretched or cramped.
3. **Spacing is the design.** Generous, intentional negative space communicates confidence. Tight, uniform spacing communicates a template.

---

## 2. BREAKPOINT SYSTEM

Use **content-first breakpoints** — set where the layout actually breaks, not at arbitrary device widths. The following values are the system defaults, but any section may introduce a micro-breakpoint if its content demands it.

```css
/* ─── Breakpoint tokens ─────────────────────────────── */
--bp-xs:   375px;   /* Small phones (iPhone SE, older Android) */
--bp-sm:   480px;   /* Large phones, landscape small phones */
--bp-md:   768px;   /* Tablets portrait, large phones landscape */
--bp-lg:   1024px;  /* Laptops, tablets landscape */
--bp-xl:   1280px;  /* Standard desktop */
--bp-2xl:  1536px;  /* Wide desktop, large monitors */
--bp-max:  1600px;  /* Max content width — text never exceeds this */
```

**Mobile-first rule:** Write base styles for `375px`. Use `min-width` media queries exclusively. Never write `max-width` queries except for very targeted edge cases (documented inline with a comment explaining why).

**Content max-width:** The main content container must never exceed `1600px` and should sit at `1400px` to keep line lengths human. Set it as:

```css
.container {
  width: 100%;
  max-width: 1400px;
  margin-inline: auto;
  padding-inline: var(--space-gutter);
}
```

Where `--space-gutter` scales fluidly (see Section 4).

---

## 3. GRID SYSTEM

### Primary Grid

Use a **12-column CSS Grid** at the container level. This gives maximum flexibility — 2, 3, 4, 6, and asymmetric layouts all fit cleanly.

```css
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-gap);
}
```

**Column span defaults per breakpoint:**

| Element | Mobile (base) | Tablet (md) | Desktop (lg) | Wide (xl) |
|---|---|---|---|---|
| Full-width section | 12 cols | 12 cols | 12 cols | 12 cols |
| Standard body text | 12 cols | 10 cols | 8 cols | 7 cols |
| Hero headline | 12 cols | 10 cols | 8 cols | 6 cols |
| Hero supporting text | 12 cols | 8 cols | 6 cols | 5 cols |
| 2-column layout | 12 / 12 | 6 / 6 | 6 / 6 | 6 / 6 |
| Asymmetric 2-col | 12 / 12 | 7 / 5 | 7 / 5 | 8 / 4 |
| 3-column equal | 12 / 12 / 12 | 6 / 6 / 12 | 4 / 4 / 4 | 4 / 4 / 4 |
| Sidebar layout | 12 / 12 | 12 / 12 | 3 / 9 | 3 / 9 |

### Full-Bleed Sections

Full-bleed sections (no container, edge-to-edge) are deliberately outside the grid. Use them for:
- Section breaks with a contrasting background color
- Marquee / ticker text strips
- Large full-width imagery
- Isolated pull-quote moments

```css
.full-bleed {
  width: 100vw;
  margin-inline: calc(-1 * var(--space-gutter));
  padding-inline: var(--space-gutter);
}
```

---

## 4. SPACING SYSTEM (FLUID)

All spacing tokens use `clamp()` to scale continuously between mobile and desktop without breakpoint jumps. No hardcoded `px` values for structural spacing.

### Space Scale

```css
:root {
  /* Gutter — horizontal container padding */
  --space-gutter: clamp(1rem, 4vw, 3rem);

  /* Gap — space between grid columns */
  --space-gap: clamp(1rem, 2.5vw, 2rem);

  /* Vertical section spacing */
  --space-section-xs:  clamp(2rem,   4vw,  3rem);    /* Tight/accent sections */
  --space-section-sm:  clamp(3rem,   6vw,  5rem);    /* Small sections */
  --space-section-md:  clamp(4rem,   8vw,  7rem);    /* Standard sections */
  --space-section-lg:  clamp(6rem,  10vw, 10rem);    /* Feature/hero sections */
  --space-section-xl:  clamp(8rem,  14vw, 14rem);    /* Hero / above-fold */

  /* Component spacing */
  --space-component-xs: clamp(0.5rem, 1vw, 0.75rem);
  --space-component-sm: clamp(0.75rem, 1.5vw, 1rem);
  --space-component-md: clamp(1rem, 2vw, 1.5rem);
  --space-component-lg: clamp(1.5rem, 3vw, 2.5rem);
  --space-component-xl: clamp(2rem, 4vw, 4rem);
}
```

### Spacing Rules

- **Never hardcode padding/margin** in a section without using a token. If a token doesn't fit, create a new named token and document it.
- **Section `padding-block`** values must be deliberately varied. Adjacent sections should not share the same spacing class. Use this rhythm as a guide:

```
Hero        → --space-section-xl   (biggest breathing room)
Intro/About → --space-section-lg
Services    → --space-section-md
Work/Case   → --space-section-lg   (give it air, visuals need room)
Proof/Stats → --space-section-xs   (tight — makes it punchy)
CTA Strip   → --space-section-md
Footer      → --space-section-sm
```

---

## 5. TYPOGRAPHY SCALE (FLUID)

All font sizes use `clamp()`. No breakpoint-based font-size changes.

### Type Scale Tokens

```css
:root {
  /* Display — hero headline, large moments */
  --text-display:    clamp(2.5rem,  6vw + 1rem, 6rem);

  /* Heading 1 — major section titles */
  --text-h1:         clamp(2rem,    4vw + 0.5rem, 4rem);

  /* Heading 2 — sub-section headers */
  --text-h2:         clamp(1.5rem,  3vw + 0.25rem, 2.5rem);

  /* Heading 3 — card titles, labels */
  --text-h3:         clamp(1.125rem, 1.5vw, 1.5rem);

  /* Body — primary reading text */
  --text-body:       clamp(1rem, 1.2vw, 1.125rem);

  /* Body small — captions, meta, secondary */
  --text-sm:         clamp(0.875rem, 1vw, 1rem);

  /* Mono — numbers, dates, labels, code */
  --text-mono:       clamp(0.75rem, 0.9vw, 0.9rem);
}
```

### Line Height Rules

```css
--leading-tight:   1.1;    /* Display / hero headlines */
--leading-snug:    1.3;    /* Section headings */
--leading-normal:  1.6;    /* Body text — reading comfort */
--leading-relaxed: 1.75;   /* Long-form / article body */
```

### Measure (Line Length) Rules

```css
--measure-narrow:  42ch;   /* Hero headlines */
--measure-body:    65ch;   /* Comfortable reading */
--measure-wide:    80ch;   /* Max — never exceed for body text */
```

Apply `max-width: var(--measure-body)` to every `<p>` block, `<li>` list, and body-text element. Do not let text span the full container width at desktop sizes.

---

## 6. NAVIGATION

### Desktop Navigation (≥ 1024px)

- **Layout:** Horizontal bar, sticky on scroll, spans full width. Logo/name on the left, links on the right, theme toggle at far right.
- **Height:** `64px`. Do not make it taller.
- **Background:** Semi-transparent on scroll (`backdrop-filter: blur(12px)`, `background: rgba(var(--bg-base-rgb), 0.85)`). Fully opaque when at page top only if there's a contrasting hero. Otherwise, always semi-transparent.
- **Links:** 5 items maximum visible in the nav bar. If the site has more pages, add a secondary navigation or group links.
- **Active state:** Not an underline. Use a small dot, a left-positioned bar, or a weight change (600 → 700) to mark the active page.
- **Hover state:** A smooth `color` or `opacity` transition (150ms ease). Never a background-color box appearing on hover — too AI-template.
- **CTA in nav:** One primary CTA ("Work with me", "Get in touch") styled as a small outlined or filled button, distinct from the text links.

```
[Logo / Name]          [About]  [Services]  [Work]  [Blog]  [Contact ←CTA]  [☀/🌙]
```

### Tablet Navigation (768px – 1023px)

- Keep the horizontal bar but reduce link font size to `0.875rem`.
- If all links don't fit cleanly, hide 2–3 lower-priority links behind a "More" dropdown or collapser. Never truncate or overlap links.
- Theme toggle stays visible.

### Mobile Navigation (< 768px)

- **Logo left, hamburger icon right.** The hamburger must be on the right — right-handed thumb reach.
- **Hamburger icon:** Three lines → transforms to an X on open. Animate the morph (not just a swap). Transition: 200ms.
- **Menu type:** **Full-screen overlay menu** on mobile for a portfolio. Not a slide-in sidebar. The overlay covers the entire viewport, background is solid (dark mode surface / light mode off-white), font size is large (2rem+ for links), links are vertically stacked with generous spacing.
- **Include in mobile overlay:** All nav links + theme toggle + a prominent CTA.
- **Close:** Tap anywhere outside OR tap the X.
- **Scroll lock:** When the menu is open, lock body scroll (`overflow: hidden` on `<body>`).

### Navigation Behaviour Across Pages

- The nav component is identical across every page. Do not create page-specific nav variations.
- Current page link is visually marked.
- On scroll past `100px`, the nav compresses slightly (height drops from `64px` to `52px`) with a smooth transition.

---

## 7. HERO SECTION

### Anatomy

The hero is the only section allowed to use `--space-section-xl` for vertical padding. It must be visually distinct from every other section on the page.

**Required elements:**
1. An eyebrow label (small monospace text above the headline — e.g., `01 — Content Strategist`)
2. A large headline using `--text-display`
3. A supporting sentence (1–2 lines, no more) using `--text-body` with `--measure-narrow`
4. 1–2 CTAs (primary + secondary or primary + a signal like "scroll down")
5. A visual element OR a bold typographic moment — never nothing

**Layout rules:**

| Screen | Alignment | Layout |
|---|---|---|
| Mobile | Left-aligned | Single column, stacked |
| Tablet (md) | Left-aligned | Text left, visual right (7/5 split) OR full-width text with visual below |
| Desktop (lg+) | Left-aligned | Text left (8 cols), visual right (4 cols) OR text only (6 cols) with right empty |

**Never center the hero.** Centered hero = AI template default. Left-aligned hero = editorial decision.

### Visual Element Options (pick one)

- A real profile photo, cropped to a square or circle, placed offset (not perfectly aligned to column)
- An abstract mesh gradient SVG in brand colors
- A single large typographic element (a number, a year, a monospace code excerpt)
- A subtle animated element (a blinking cursor, a looping gradient)
- Nothing — just the type and generous space

---

## 8. SECTION LAYOUT PATTERNS

Every section on the site must use one of the following patterns. No pattern should appear in the same form in two consecutive sections.

### Pattern A: Full-Width Editorial
**Use for:** About/intro, large statements, CTA strips

```
|←————————————— 12 cols —————————————→|
 [Large headline — left]
 [Body text — max 65ch, left]
 [Optional: CTA or link]
```

### Pattern B: Asymmetric Split (Primary)
**Use for:** Hero, feature callout, case study intro

```
Desktop:  |← 7 cols text →|← 5 cols visual →|
Mobile:   stacked, text first, visual below
```

### Pattern C: Asymmetric Split (Secondary)
**Use for:** About section, alternate feature rows

```
Desktop:  |← 5 cols visual →|← 7 cols text →|
Mobile:   stacked, visual first, text below
```

Alternate between B and C when listing multiple features to create a natural reading rhythm.

### Pattern D: Numbered Editorial List
**Use for:** Services, process steps, skill list

```
Each row:
|← 1 col monospace number →|← 8 cols text →|
01  —  Content Marketing Automation
        Description of the service, 2–3 sentences.
        ──────────────────────────────────────
02  —  SEO Strategy & Optimization
        ...
```

No cards. No icons. No grid. Just numbers and text, separated by a thin horizontal rule.

### Pattern E: 2+1 Asymmetric Card
**Use for:** Services with a featured item, portfolio highlights

```
Desktop:  |← 8 cols featured card →|← 4 cols secondary →|
           [secondary stacks 2 rows vertically]
Mobile:   all cards full-width, stacked
```

The featured card is visually heavier — larger text, more padding, different background.

### Pattern F: Full-Bleed Accent Strip
**Use for:** Pull quotes, stats row, social proof, dividers between major sections

```
|←——— full viewport width, no container ———→|
 Background: --color-accent or --bg-elevated
 Content: centered or left-aligned single line
```

This is the "chapter break" of the page. Use it deliberately — no more than 2–3 per page.

### Pattern G: Stats / Proof Row
**Use for:** Numbers, metrics, social proof

```
Desktop:  3–4 equal columns, each: [monospace large number] + [label]
Mobile:   2 columns grid
```

Numbers use `--text-display` or `--text-h1`. Labels use `--text-sm`. The numbers must count up on viewport entry (intersection observer).

### Pattern H: Footer
**Use for:** Site footer only

```
Desktop:
|← Logo + tagline (4 cols) →|← Nav links (3 cols) →|← Social + contact (3 cols) →|← Legal (2 cols) →|

Mobile:
[Logo + tagline]
[Nav links — 2 cols of 4 items each]
[Social icons row]
[Legal — single line]
```

Footer background: always `--bg-elevated`, never the same as the body background. It should visually "close" the page.

---

## 9. RESPONSIVE LAYOUT BEHAVIOUR BY COMPONENT

### Cards
- Mobile: full-width, stacked vertically, min-height set so they don't collapse
- Tablet (md): 2-column grid
- Desktop (lg): depends on parent pattern — never a default 3-column equal grid unless Pattern E is explicitly chosen

### Images
- Always `width: 100%; height: auto` as base
- Max-width constrained to the column they occupy — never wider than their grid cell
- Use `object-fit: cover` with explicit aspect ratios:
  - Hero image: `aspect-ratio: 4/5` on mobile, `3/4` on desktop
  - Case study / work thumbnails: `aspect-ratio: 16/9`
  - Avatar / profile: `aspect-ratio: 1/1`

### Buttons & CTAs
- Primary CTA: `min-width: 160px`, `padding: 0.75em 1.75em`
- Never full-width on desktop. On mobile: full-width is acceptable only in hero, not elsewhere.
- Always `height: auto` — never a fixed px height.
- On mobile, CTAs stack vertically, not side-by-side.

### Section Headings
- On mobile: `--text-h2` max for section headings (not display)
- On desktop: `--text-h1` allowed for section headings that anchor a major content block
- Apply `max-width: var(--measure-narrow)` to all section headings. Never let them span the full container.

---

## 10. TOUCH & ACCESSIBILITY REQUIREMENTS

These are not optional additions — they are baseline requirements for every interactive element.

### Touch Targets
- Minimum tap target size: `44px × 44px` (per WCAG 2.5.5)
- Navigation links: minimum `44px` height even if font appears smaller
- Hamburger button: minimum `44px × 44px`, padding compensates if icon is smaller
- All buttons, links, and interactive items must meet the above

### Focus States
- Every interactive element must have a visible focus ring. Do not use `outline: none` anywhere.
- Focus ring style: `outline: 2px solid var(--color-accent); outline-offset: 3px;`
- Ensure focus states are visible in both light and dark mode

### Contrast
- Body text on backgrounds: minimum 4.5:1 contrast ratio (WCAG AA)
- Large text (24px+ / bold 18px+): minimum 3:1
- Test both light and dark mode contrast before shipping any section

### Scroll Behaviour
- `scroll-behavior: smooth` on the `<html>` element
- `scroll-margin-top` on all section anchor targets: `calc(64px + 1rem)` (accounts for sticky nav height)

---

## 11. PERFORMANCE RULES (LAYOUT IMPACT)

Layout choices have performance consequences. These rules prevent common mistakes.

- **No layout shift on image load.** Every `<img>` and `<video>` must have explicit `width` and `height` attributes OR use the aspect-ratio CSS trick. No exceptions.
- **No CLS from fonts.** Use `font-display: swap` and preload the primary font file. If using Google Fonts, load via `<link rel="preload">` not CSS import.
- **Lazy-load below-fold images.** Use `loading="lazy"` on all images not in the hero/above-fold.
- **No layout-triggering animations.** Never animate `width`, `height`, `top`, `left`, or `margin` — these trigger layout. Animate `transform` and `opacity` only.
- **Sticky nav must not cause layout shift.** Use `position: sticky` NOT `position: fixed`. If fixed is required, add `padding-top` to the first section equal to the nav height.

---

## 12. DARK MODE / LIGHT MODE — LAYOUT IMPLICATIONS

The theme system affects more than colors. These layout tokens must have mode-aware values.

```css
/* Borders — lighter in dark mode (avoid harsh lines) */
[data-theme="light"] {
  --border-subtle: rgba(0, 0, 0, 0.08);
  --border-default: rgba(0, 0, 0, 0.14);
  --shadow-card: 0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06);
  --shadow-nav: 0 1px 0 rgba(0,0,0,0.06);
}

[data-theme="dark"] {
  --border-subtle: rgba(255, 255, 255, 0.06);
  --border-default: rgba(255, 255, 255, 0.10);
  --shadow-card: 0 1px 2px rgba(0,0,0,0.2), 0 4px 16px rgba(0,0,0,0.3);
  --shadow-nav: 0 1px 0 rgba(255,255,255,0.04);
}
```

### Mode-aware spacing notes

- In dark mode, full-bleed accent strips (Pattern F) should use `--bg-elevated` not the pure dark base — pure dark on pure dark creates zero visual separation.
- In light mode, use background color variation (`--bg-subtle`, `--bg-surface`) to create section separation instead of borders or shadows — it reads more refined.
- The footer must look visually distinct in both modes. In light mode: a slightly darker off-white or a brand-tinted surface. In dark mode: a slightly lighter surface than the body.

---

## 13. PAGE STRUCTURE TEMPLATE (ALL PAGES)

Every page on the site follows this wrapper structure:

```html
<body data-theme="light | dark">

  <header role="banner">
    <nav role="navigation" aria-label="Main navigation">
      <!-- Sticky nav — identical across all pages -->
    </nav>
  </header>

  <main id="main-content" role="main">
    <!-- Page-specific sections -->
  </main>

  <footer role="contentinfo">
    <!-- Identical across all pages -->
  </footer>

</body>
```

**Skip link:** Add `<a href="#main-content" class="skip-link">Skip to content</a>` as the very first element inside `<body>`. Visually hidden until focused.

```css
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  padding: 0.5em 1em;
  background: var(--color-accent);
  color: var(--color-on-accent);
  z-index: 9999;
  &:focus { top: 0; }
}
```

---

## 14. HOMEPAGE SECTION ORDER (PHASE 1 REFERENCE)

This is the intended section sequence for the homepage. Each section references the pattern from Section 8.

| Order | Section | Pattern | Spacing Class |
|---|---|---|---|
| 1 | Navigation | — | `sticky, 64px` |
| 2 | Hero | B (Asymmetric Split) | `--space-section-xl` |
| 3 | Quick Intro / Credibility | A (Full-Width Editorial) | `--space-section-lg` |
| 4 | Services | D (Numbered Editorial List) | `--space-section-md` |
| 5 | Proof / Stats | G (Stats Row) via F (Full-Bleed) | `--space-section-xs` |
| 6 | Work / Projects | E (2+1 Asymmetric Card) | `--space-section-lg` |
| 7 | About (brief) | C (Asymmetric Split, visual first) | `--space-section-md` |
| 8 | CTA / Contact Strip | F (Full-Bleed Accent) | `--space-section-md` |
| 9 | Footer | H (Footer pattern) | `--space-section-sm` |

No two adjacent sections share the same pattern. No two adjacent sections share the same vertical spacing token.

---

## 15. PHASE HANDOFF NOTES (FOR FUTURE PAGES)

When applying this layout system to pages beyond the homepage, follow these rules:

1. **Reuse the token system verbatim.** Do not introduce new spacing, color, or typography tokens without documenting them here first.
2. **The nav and footer are copy-pasted.** Do not modify them per page.
3. **Hero section on inner pages:** Use a simplified hero — Pattern A (Full-Width Editorial) with a page title and a 1-line description. No visual element required on inner pages.
4. **Blog / article pages:** Body text gets `--leading-relaxed` and is constrained to a `7-column` content column at desktop (max `65ch`). No distracting sidebars unless there's a genuinely useful reason.
5. **Contact page:** A single-column form, left-aligned, on a clean background with generous spacing. No cards, no icons, no decorative elements around the form inputs.

---

*Document version: 1.0 — Homepage Phase*
*Apply to homepage first. Expand to other pages only after homepage layout is approved.*
