# Text Hierarchy & Responsive Typography System
### Codex Implementation Plan — emmanuelodebiyi.name.ng

> **Site context from live metadata:**
> Brand: Emmanuel Odebiyi — Content Marketing Automation Specialist
> Theme colour: `#0E1C2A` (dark navy — dark mode base)
> Audience: B2B SaaS decision-makers, operators
> Tone: authoritative, precise, results-driven
> Mode: Light + Dark (homepage only currently; to propagate to all pages)

---

## PART 1 — WHAT THIS DOCUMENT IS FOR

This document defines the **complete typographic system** for the site. It covers:

1. The type scale — every heading level, body size, and supporting text size
2. How those sizes behave across every breakpoint (fluid, not stepped)
3. Alignment rules per screen size (what centers, what left-aligns, what is never centered)
4. Spacing rules between text elements (the vertical rhythm system)
5. Light mode and dark mode text colour tokens
6. What to audit, what to fix, and what not to touch

Read this entirely before editing a single line of CSS. Typography decisions have cascading effects. Changing an H2 size without updating its line-height and margin-bottom breaks the vertical rhythm of every page it appears on.

---

## PART 2 — SITE AUDIT CHECKLIST (RUN BEFORE ANY CHANGES)

Before implementing anything, audit every page of the site against this list. Document what you find. Fix only what is listed here.

### 2.1 Type Scale Audit
- [ ] Is there a single, consistent H1 size across all pages?
- [ ] Does each heading level (H1 → H6) have a visibly distinct size and weight from the one below it?
- [ ] Is the size jump between consecutive heading levels based on a consistent ratio (1.25 or 1.333)?
- [ ] Does body text render at or above 16px on desktop? At or above 15px on mobile?
- [ ] Is any text element set below 12px anywhere on the site?
- [ ] Are there any headings that are the same size as body text (just bolder)?

### 2.2 Alignment Audit
- [ ] Is body text ever centered on desktop at paragraphs longer than 2 lines? (It should not be)
- [ ] Are there any left-aligned elements that appear to be offset incorrectly — not anchored to the grid?
- [ ] Are CTAs or buttons ever right-aligned unintentionally on mobile?
- [ ] Does the hero headline align left on desktop and left on mobile (never centered on desktop)?
- [ ] Are section subtitles ever centered when the headline above them is left-aligned (mismatched alignment)?

### 2.3 Spacing Audit
- [ ] Is the space below each heading less than the space above it? (This is correct — the heading belongs to what follows it)
- [ ] Do adjacent paragraphs have consistent spacing between them?
- [ ] Are any text elements touching other elements with zero gap?
- [ ] Does any heading sit so close to the section above it that it reads as continuation rather than start of new section?
- [ ] Is line height on any text block below 1.4? (too tight — causes eye fatigue)
- [ ] Is line height on any body text block above 1.9? (too loose — breaks reading rhythm)

### 2.4 Mobile-Specific Audit
- [ ] Does any text clip or overflow horizontally on a 375px screen?
- [ ] Does any text appear truncated with `...` when it should wrap?
- [ ] Does the hero headline break awkwardly mid-word on mobile?
- [ ] Is any CTA text too small to be read comfortably (below 14px)?
- [ ] Do any headings remain desktop-large on small screens, causing them to push page width wider than the viewport?
- [ ] Is the body text measure (line length) on mobile exceeding 75 characters? (causes scanning fatigue)

### 2.5 Contrast Audit
- [ ] Does all body text on both light and dark backgrounds pass WCAG AA (4.5:1 contrast ratio)?
- [ ] Does heading text on all backgrounds pass WCAG AA for large text (3:1 minimum)?
- [ ] Is any text appearing in a mid-grey that fails contrast in either theme mode?

---

## PART 3 — THE TYPOGRAPHY TOKEN SYSTEM

These are the CSS custom property values to implement. Every size, weight, and spacing decision in the codebase must reference one of these tokens. No hardcoded font-size values anywhere.

### 3.1 Base Size

```css
:root {
  --text-base-size: 1rem; /* = 16px, the anchor for all relative sizing */
}
```

### 3.2 Type Scale — Fluid (clamp-based)

Every size scales continuously from the minimum (mobile 375px) to the maximum (desktop 1440px). No breakpoint jumps.

```css
:root {
  /* ── Display — hero headline, once per page ─────────────────── */
  --text-display: clamp(2.25rem, 5vw + 0.75rem, 5.5rem);
  /* Mobile: ~36px | Tablet: ~48px | Desktop: ~88px */

  /* ── H1 — primary page/section headline ────────────────────── */
  --text-h1: clamp(1.875rem, 4vw + 0.5rem, 4rem);
  /* Mobile: ~30px | Tablet: ~40px | Desktop: ~64px */

  /* ── H2 — major section sub-header ─────────────────────────── */
  --text-h2: clamp(1.5rem, 3vw + 0.375rem, 2.75rem);
  /* Mobile: ~24px | Tablet: ~32px | Desktop: ~44px */

  /* ── H3 — card title, feature name, sub-section ────────────── */
  --text-h3: clamp(1.125rem, 1.75vw + 0.25rem, 1.875rem);
  /* Mobile: ~18px | Tablet: ~24px | Desktop: ~30px */

  /* ── H4 — eyebrow labels, tight sub-sections ───────────────── */
  --text-h4: clamp(1rem, 1.25vw + 0.125rem, 1.375rem);
  /* Mobile: ~16px | Tablet: ~18px | Desktop: ~22px */

  /* ── Body — primary reading text ───────────────────────────── */
  --text-body: clamp(1rem, 1.1vw + 0.1rem, 1.125rem);
  /* Mobile: ~16px | Desktop: ~18px */

  /* ── Body Large — intro paragraphs, lead copy ──────────────── */
  --text-body-lg: clamp(1.0625rem, 1.5vw + 0.125rem, 1.25rem);
  /* Mobile: ~17px | Desktop: ~20px */

  /* ── Small — captions, meta, timestamps, tags ──────────────── */
  --text-sm: clamp(0.8125rem, 0.75vw + 0.125rem, 0.9375rem);
  /* Mobile: ~13px | Desktop: ~15px */

  /* ── Micro — legal, fine print, footnotes ──────────────────── */
  --text-micro: clamp(0.75rem, 0.5vw + 0.125rem, 0.875rem);
  /* Mobile: ~12px | Desktop: ~14px */

  /* ── Mono — numbers, dates, stat labels, code, eyebrows ────── */
  --text-mono: clamp(0.75rem, 0.8vw + 0.1rem, 0.9375rem);
  /* Mobile: ~12px | Desktop: ~15px */
}
```

### 3.3 Font Weight Tokens

```css
:root {
  --weight-light:     300;
  --weight-regular:   400;
  --weight-medium:    500;
  --weight-semibold:  600;
  --weight-bold:      700;
  --weight-black:     800;
}
```

**Assignment by role:**

| Text role | Weight token |
|---|---|
| Display headline | `--weight-bold` or `--weight-black` |
| H1, H2 | `--weight-bold` (700) |
| H3 | `--weight-semibold` (600) |
| H4 eyebrow | `--weight-medium` (500) |
| Body text | `--weight-regular` (400) |
| Body large / intro | `--weight-regular` (400) |
| Caption / meta | `--weight-regular` (400) |
| Monospace labels | `--weight-medium` (500) |
| Buttons | `--weight-medium` or `--weight-semibold` |

### 3.4 Line Height Tokens

```css
:root {
  --leading-display:  1.05;  /* Display text: very tight, headlines feel punchy */
  --leading-heading:  1.2;   /* H1, H2: slightly tight, still readable */
  --leading-snug:     1.35;  /* H3, H4: comfortable for multi-line headings */
  --leading-body:     1.6;   /* Body text: standard reading comfort */
  --leading-body-lg:  1.65;  /* Body large: slightly more air for intro copy */
  --leading-relaxed:  1.75;  /* Long-form / article / blog body */
  --leading-loose:    2.0;   /* Use sparingly — captions, meta with lots of air */
}
```

**Assignment by role:**

| Role | Line height |
|---|---|
| Display | `--leading-display` |
| H1 | `--leading-heading` |
| H2 | `--leading-heading` |
| H3 | `--leading-snug` |
| H4 | `--leading-snug` |
| Body | `--leading-body` |
| Body Large | `--leading-body-lg` |
| Caption / meta | `--leading-body` |

### 3.5 Letter Spacing Tokens

```css
:root {
  --tracking-tight:   -0.03em;  /* Display & large H1 — prevents letters looking too spread at big sizes */
  --tracking-snug:    -0.01em;  /* H2, H3 */
  --tracking-normal:   0em;     /* Body text — never track body text negatively */
  --tracking-wide:     0.04em;  /* Eyebrows, ALL-CAPS labels, monospace stats */
  --tracking-wider:    0.08em;  /* ALL-CAPS micro text, nav labels if uppercased */
}
```

**Assignment by role:**

| Role | Letter spacing |
|---|---|
| Display | `--tracking-tight` |
| H1 | `--tracking-tight` |
| H2 | `--tracking-snug` |
| H3 | `--tracking-snug` |
| H4 eyebrow (if uppercase) | `--tracking-wide` |
| Body | `--tracking-normal` |
| Monospace stats/labels | `--tracking-wide` |
| Navigation links | `--tracking-normal` |

### 3.6 Measure (Line Length) Tokens

```css
:root {
  --measure-headline:  20ch;   /* Display/H1 — short, punchy, never wrap past this */
  --measure-subtitle:  42ch;   /* H2 section titles */
  --measure-lead:      52ch;   /* Intro / body-large paragraphs */
  --measure-body:      65ch;   /* Standard body text — reading comfort sweet spot */
  --measure-wide:      80ch;   /* Max absolute limit — never exceed for any body text */
}
```

Apply `max-width` using these tokens to every text container — not every tag, but to the wrapping `<div>` or `<p>` element directly:

```css
p, li           { max-width: var(--measure-body); }
.intro-text     { max-width: var(--measure-lead); }
h1, .h1         { max-width: var(--measure-headline); }
h2, .h2         { max-width: var(--measure-subtitle); }
```

---

## PART 4 — COLOUR TOKENS FOR TEXT (BOTH MODES)

The site uses `#0E1C2A` as its dark mode base. These tokens enforce proper contrast in both modes.

```css
[data-theme="dark"] {
  /* Primary text — headings, CTAs */
  --text-primary:     #E8EDF2;     /* Slightly cool off-white — not harsh pure white */

  /* Body text — paragraphs, descriptions */
  --text-body-color:  #B8C4CF;     /* Readable on dark navy, passes AA contrast */

  /* Secondary text — meta, captions, timestamps */
  --text-secondary:   #7A8FA0;     /* Subdued but still legible */

  /* Disabled / placeholder text */
  --text-muted:       #4D6070;     /* Very subdued — use only for truly tertiary info */

  /* Accent text — links, highlights, key terms */
  --text-accent:      #5BA8D4;     /* Mid-blue — visible on dark navy without glare */

  /* Monospace / data labels */
  --text-mono-color:  #78C4A0;     /* Teal — distinct from body, readable on dark */
}

[data-theme="light"] {
  /* Primary text */
  --text-primary:     #0E1C2A;     /* Dark navy — your brand colour as text */

  /* Body text */
  --text-body-color:  #2C3E4F;     /* Slightly lighter navy — readable, softer than black */

  /* Secondary text */
  --text-secondary:   #5A7080;     /* Mid slate — for captions, meta */

  /* Disabled / placeholder */
  --text-muted:       #8FA5B5;     /* Soft — barely visible, intentional */

  /* Accent text */
  --text-accent:      #1A6FA0;     /* Deep blue — passes contrast on off-white bg */

  /* Monospace / data labels */
  --text-mono-color:  #1A7A5A;     /* Dark teal — distinct on light backgrounds */
}
```

---

## PART 5 — ALIGNMENT RULES (PER SCREEN SIZE)

This is where most responsive text issues originate. Follow these rules exactly.

### 5.1 Golden Rule

> **Left-align everything by default. Center only when an element has no reading continuation — meaning the user's eye doesn't need to move anywhere after reading it.**

Elements that may be centered: standalone pull-quotes (1–2 lines max), hero stats (the number + label unit), full-bleed CTA headlines (if short).

Elements that must NEVER be centered: body paragraphs, multi-line headings, service descriptions, nav links, card text, any text longer than 2 lines.

### 5.2 Alignment by Screen Size and Element

| Element | 375px (Mobile) | 768px (Tablet) | 1024px+ (Desktop) |
|---|---|---|---|
| Hero headline | `text-align: left` | `text-align: left` | `text-align: left` |
| Hero eyebrow label | `text-align: left` | `text-align: left` | `text-align: left` |
| Hero body/sub-text | `text-align: left` | `text-align: left` | `text-align: left` |
| Hero CTA | `text-align: left` (full-width button OK) | `text-align: left` | `text-align: left` |
| Section H2 | `text-align: left` | `text-align: left` | `text-align: left` |
| Section body | `text-align: left` | `text-align: left` | `text-align: left` |
| Card headings | `text-align: left` | `text-align: left` | `text-align: left` |
| Card body | `text-align: left` | `text-align: left` | `text-align: left` |
| Stats (number + label) | `text-align: center` | `text-align: center` | `text-align: center` |
| Standalone pull-quote | `text-align: left` | `text-align: center` | `text-align: center` |
| Nav links | `text-align: left` (mobile menu) | inherited/flex | `text-align: left` (flex row) |
| Footer columns | `text-align: left` | `text-align: left` | `text-align: left` |
| Footer legal line | `text-align: left` | `text-align: center` | `text-align: center` |

### 5.3 Indentation Rules

- **No CSS `text-indent` on any element.** Text indentation is a print convention with no place in web UI.
- **No `padding-left` applied to a `<p>` tag directly.** All horizontal indentation is handled by the parent container's `padding-inline` or `margin-inline`.
- List items (`<li>`) use `padding-inline-start: 1.5em` for the standard indent.
- Blockquotes use `border-left: 3px solid var(--text-accent)` + `padding-inline-start: 1.5rem` — no extra `margin-left` that would indent them out of the grid.

---

## PART 6 — VERTICAL SPACING BETWEEN TEXT ELEMENTS

These rules control the space above and below every text element. The guiding principle: **the space below a heading must be smaller than the space above it.** The heading belongs to what follows it, not what precedes it.

### 6.1 Spacing Token Scale (8px base grid)

```css
:root {
  --space-2:   0.125rem;   /*  2px */
  --space-4:   0.25rem;    /*  4px */
  --space-8:   0.5rem;     /*  8px */
  --space-12:  0.75rem;    /* 12px */
  --space-16:  1rem;       /* 16px */
  --space-20:  1.25rem;    /* 20px */
  --space-24:  1.5rem;     /* 24px */
  --space-32:  2rem;       /* 32px */
  --space-40:  2.5rem;     /* 40px */
  --space-48:  3rem;       /* 48px */
  --space-64:  4rem;       /* 64px */
  --space-80:  5rem;       /* 80px */
  --space-96:  6rem;       /* 96px */
}
```

### 6.2 Heading Margin Rules

```css
/* ── Space ABOVE each heading (separates it from previous section) ── */
h1, .h1 { margin-block-start: var(--space-64); }
h2, .h2 { margin-block-start: var(--space-48); }
h3, .h3 { margin-block-start: var(--space-32); }
h4, .h4 { margin-block-start: var(--space-24); }

/* ── Space BELOW each heading (connects it to its content) ── */
h1, .h1 { margin-block-end: var(--space-24); }
h2, .h2 { margin-block-end: var(--space-16); }
h3, .h3 { margin-block-end: var(--space-12); }
h4, .h4 { margin-block-end: var(--space-8); }

/* ── Paragraphs ── */
p { margin-block-end: var(--space-16); }
p:last-child { margin-block-end: 0; }

/* ── Eyebrow label above a heading (the monospace label) ── */
.eyebrow { margin-block-end: var(--space-8); }

/* ── Reset: first child in any container has no top margin ── */
* + * { /* handled by parent padding, not child margins */ }
section > *:first-child,
.card > *:first-child { margin-block-start: 0; }
```

### 6.3 Fluid Heading Margins (scale with screen size)

Replace the fixed space above headings with fluid versions on larger screens:

```css
@media (min-width: 1024px) {
  h2, .h2 { margin-block-start: var(--space-64); }
  h3, .h3 { margin-block-start: var(--space-40); }
}
```

---

## PART 7 — RESPONSIVE TEXT BEHAVIOUR BY BREAKPOINT

This section defines exactly what changes at each breakpoint and what must not change.

### 375px — Small Mobile (Base)

- Font sizes: use fluid `clamp()` values — they are already calibrated for this width
- Body text: 16px minimum enforced by the clamp floor
- All headings: left-aligned
- Hero display text: at `375px`, the clamp resolves to ~36px. Confirm it wraps to max 3 lines. If it wraps past 3 lines, the headline is too long — it is a copy issue, not a CSS issue.
- Container padding: `1rem` (16px) on each side — never less
- No element should be `width: 100vw` without also having `overflow: hidden` on its parent — horizontal scroll is a common mobile breakage point

### 480px — Large Phone / Small Tablet

- Type scale begins stepping up fluidly — no changes needed, clamp handles it
- Two-column layouts do NOT activate at this breakpoint — keep single column
- Navigation: still hamburger/overlay

### 768px — Tablet Portrait (Major breakpoint)

- Layout shifts from single column to two-column or asymmetric for applicable sections
- Hero layout: text left, optional visual right
- Section headings: still `text-align: left`
- Body text measure: enforce `max-width: var(--measure-body)` on all `<p>` elements — at tablet width, paragraphs that span the full width become uncomfortable to read
- Navigation: evaluate if all links fit in the horizontal bar; if not, activate the condensed nav variant

### 1024px — Laptop / Desktop (Second major breakpoint)

- Full layout activates: asymmetric grids, numbered editorial lists, all patterns
- Display text resolves to ~64–72px — confirm it never wraps
- Hero: left-aligned, 6–8 column max width for the text block
- All section headings: left-aligned, max-width constrained to `--measure-subtitle`
- Body text: confirm 16–18px range, 1.6 line height, max 65ch line length

### 1280px — Standard Desktop

- Display text resolves near its maximum (~80–88px). If this looks oversized for the actual headline text, lower the max value in the clamp — not every site needs 88px hero type
- Sidebar layouts (3/9 column split) activate here if the site uses them
- Footer grid fully three or four columns

### 1536px+ — Wide Desktop

- Max content width of `1400px` must be enforced — text should not continue spreading across a 2560px screen
- If the container's `max-width` is not set, text lines will exceed 120+ characters and become illegible. This is the single most common responsive failure on wide monitors.
- Verify via Chrome DevTools at 1920px and 2560px that no text element stretches wider than its `max-width` token

---

## PART 8 — SEMANTIC HTML RULES (NON-NEGOTIABLE)

Typography hierarchy is broken at a semantic level before it can even be styled correctly. These rules are pre-CSS.

### 8.1 One H1 Per Page

Every page must have exactly one `<h1>`. This is the page title — the most important piece of information on that page. It is the visual display headline on the homepage. On inner pages (About, Services, Blog, Contact), the page title is the H1.

**Common violation to fix:** Having both a visual display headline AND a separate `<h1>` that duplicates or contradicts it. If the display headline is the main title, it must be an `<h1>`, not a `<div>` or `<p>`.

### 8.2 Logical Heading Sequence

Never skip heading levels for visual reasons. `<h3>` must always be a child of an `<h2>` section. `<h4>` must always be inside an `<h3>` section.

**Wrong (common AI-generated pattern):**
```html
<h1>Emmanuel Odebiyi</h1>
<h3>Content Marketing Automation</h3>  <!-- skipped H2 — wrong -->
<p>I build AI-driven systems...</p>
```

**Correct:**
```html
<h1>Emmanuel Odebiyi</h1>
<h2>Content Marketing Automation Specialist</h2>
<p>I build AI-driven systems...</p>
```

### 8.3 Eyebrow Labels Are Not Headings

Eyebrow labels (the small monospace text above a headline, e.g., "01 — Services") are NOT `<h>` tags. They are `<p>` or `<span>` elements with a class like `.eyebrow`. They describe context, not hierarchy.

```html
<!-- Correct -->
<span class="eyebrow">Content Automation</span>
<h2>How I Turn Blogs into Systems</h2>

<!-- Wrong -->
<h5>Content Automation</h5>  <!-- this is not a sub-heading of anything -->
<h2>How I Turn Blogs into Systems</h2>
```

### 8.4 Strong ≠ Heading

`<strong>` is for inline emphasis within a sentence — not for making body text look like a heading. If you are using `<strong>` on a standalone line at large font size to simulate a heading, replace it with the appropriate `<h>` tag.

---

## PART 9 — PAGE-BY-PAGE HEADING ASSIGNMENTS

Use this as the reference for what heading tag each visible text element should be assigned.

### Homepage

| Visual element | Correct tag | Notes |
|---|---|---|
| "Emmanuel Odebiyi" or the main hero statement | `<h1>` | Only one on the page |
| Section title: "What I Do" / "Services" | `<h2>` | Major section break |
| Individual service name (Content Automation, SEO, etc.) | `<h3>` | Child of the Services H2 |
| Stat number (520% ROI etc.) | `<p class="stat-value">` | NOT a heading — it's data |
| Stat label ("ROI increase") | `<p class="stat-label">` | NOT a heading |
| Work/Projects section title | `<h2>` | New major section |
| Individual project name | `<h3>` | Child of Work H2 |
| About section title | `<h2>` | |
| CTA section headline | `<h2>` | |
| Footer column headings | `<h3>` | Navigational — not H2 |

### Inner Pages (About, Services, Blog, Contact)

| Visual element | Correct tag |
|---|---|
| Page title (e.g., "About Emmanuel") | `<h1>` |
| Major section title within page | `<h2>` |
| Sub-section within a section | `<h3>` |
| Card title, item name | `<h3>` or `<h4>` |
| Eyebrow labels everywhere | `<span class="eyebrow">` |

---

## PART 10 — COMMON ISSUES AND SPECIFIC FIXES

These are the most frequent responsive text failures on sites of this type. Check all of them.

### Issue 1: Hero Headline Clips on Mobile
**Symptom:** The hero H1 is set at a fixed large size (e.g., `font-size: 3.5rem`) and overflows the 375px viewport or pushes the page width wider than the screen.
**Fix:** Replace with `font-size: var(--text-display)` which uses `clamp()` and scales down automatically.

### Issue 2: Body Text Too Wide on Desktop
**Symptom:** Paragraphs span the full container width (e.g., 1100px+), resulting in 120+ character lines that are impossible to track when reading.
**Fix:** Add `max-width: var(--measure-body)` to every `<p>` element. This is the single highest-impact readability fix for desktop.

### Issue 3: Centered Text on Mobile That Was Left-Aligned on Desktop
**Symptom:** CSS has `text-align: left` at desktop but no explicit alignment at mobile. Some browsers or parent flex containers default to center.
**Fix:** Always declare `text-align: left` in the base (mobile-first) CSS. Do not rely on inheritance from parent containers for text alignment.

### Issue 4: Section Heading Indented / Offset Left
**Symptom:** An H2 or H3 appears visually indented relative to the body text below it, as if it has extra padding or margin applied.
**Fix:** Verify the heading is not inside a nested container with extra `padding-left`. Heading and body text should both be direct children of the same grid column.

### Issue 5: Uneven Spacing Between Sections
**Symptom:** Some sections feel cramped, others feel too spacious, with no visual rhythm.
**Fix:** Apply the section spacing tokens from Part 6. Every `<section>` element gets `padding-block: var(--space-section-md)` by default, then override with the appropriate token per section as defined in the layout document.

### Issue 6: Light Mode Text Too Dark Against Off-White Background
**Symptom:** Text colour is `#000000` or `#111111` on `#F9F8F6` — technically passes contrast but feels harsh and AI-generated.
**Fix:** Replace with `--text-primary: #0E1C2A` (your brand navy) and `--text-body-color: #2C3E4F`.

### Issue 7: Dark Mode Body Text Too Bright
**Symptom:** Body text is `#FFFFFF` on `#0E1C2A` dark background — technically passes contrast but causes eye strain for extended reading.
**Fix:** Replace with `--text-body-color: #B8C4CF` as defined in Part 4. Pure white on dark backgrounds is the most common dark mode legibility mistake.

### Issue 8: Heading and Body Text Look Too Similar
**Symptom:** H3 headings look almost identical to bold body text — the hierarchy collapses.
**Fix:** Verify the H3 has `font-size: var(--text-h3)`, `font-weight: var(--weight-semibold)`, and `line-height: var(--leading-snug)`. Then verify body text has `font-size: var(--text-body)` and `font-weight: var(--weight-regular)`. If they still look too similar, H3 needs a slightly heavier weight (semibold vs medium) or a tighter letter-spacing (`--tracking-snug`).

### Issue 9: Nav Links Too Small on Mobile Overlay
**Symptom:** The full-screen mobile menu has nav links at body text size (~16px), making them feel like a list, not navigation.
**Fix:** Mobile overlay nav links must be minimum `1.5rem` (`--text-h3` range). They are the primary navigation affordance at that moment.

### Issue 10: Stat Numbers Have No Type Character
**Symptom:** Stats like "520% ROI" are styled in the same body font at a large size, looking indistinct.
**Fix:** Stat values use `font-family: var(--font-mono)`, `font-size: var(--text-h1)` or `--text-display`, `font-weight: var(--weight-bold)`, `letter-spacing: var(--tracking-wide)`, `color: var(--text-accent)`. The monospace treatment makes numbers feel measured and data-like, not decorative.

---

## PART 11 — IMPLEMENTATION ORDER

Execute in this sequence. Do not jump ahead.

1. **Add all tokens** from Parts 3, 4, and 6 to the `:root` and `[data-theme]` blocks in the global stylesheet. Commit this step before any visible changes.
2. **Replace all hardcoded font sizes** with the correct token from Part 3. Search for every `font-size:` declaration in the codebase and map it to the correct token.
3. **Fix semantic HTML** per Part 8 and Part 9. This is structure work — no visual change yet.
4. **Apply measure tokens** (`max-width` on text containers) per Part 3.6.
5. **Apply alignment rules** per Part 5. Fix every `text-align: center` that violates the rules.
6. **Apply spacing rules** per Part 6. Fix heading margins top and bottom.
7. **Apply colour tokens** per Part 4.
8. **Test at all breakpoints:** 375px, 480px, 768px, 1024px, 1280px, 1536px, 1920px.
9. **Contrast check:** Use browser DevTools accessibility panel on every combination of text colour + background colour in both modes.
10. **Final pass:** Check for any element where text clips, overflows, or truncates unexpectedly.

---

## PART 12 — WHAT NOT TO CHANGE

To avoid breaking existing functionality:

- Do not change the theme toggle mechanism or the `[data-theme]` attribute/class name
- Do not change font-family values without checking that the new font is loaded in the `<head>` and that its weight variants (300, 400, 500, 600, 700) are all imported
- Do not modify Sanity CMS schema field names — these affect content fetching
- Do not change any existing routing, URL slugs, or page file names
- Do not alter the `meta-viewport` tag — it is set correctly
- Do not change the OG image or meta description tags during this pass

---

*This document is the text hierarchy reference for all pages. Homepage is Phase 1. All other pages follow the same token system.*
