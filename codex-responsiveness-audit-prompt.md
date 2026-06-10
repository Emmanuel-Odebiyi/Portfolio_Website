# Responsiveness Audit & Fix Prompt
### For Codex / Anti-Gravity Tool — All Pages, All Screen Sizes

---

## MISSION

You are performing a full **responsiveness audit and fix pass** across every page of this portfolio website. Your job is twofold:

1. **Audit** — inspect every page at every target viewport in the matrix below and document every issue found.
2. **Fix** — resolve every issue found, following the rules in this document precisely.

You are not redesigning anything. You are making the existing design work correctly at every screen size. No layout change should be visible at desktop sizes after this pass — only broken or degraded experiences at smaller viewports should be corrected.

---

## TARGET SCREEN MATRIX

Test every page against **all** of the following viewports. These are the globally dominant screen sizes as of 2026, ordered by real-world traffic share.

### 📱 Mobile — Portrait (highest traffic tier)

| Label | Viewport Width | Represents |
|---|---|---|
| `mobile-xs` | 320px | Older iPhones, budget Android, minimum floor |
| `mobile-sm` | 360px | Most common Android viewport globally |
| `mobile-md` | 375px | iPhone 14/15 base models |
| `mobile-lg` | 390px | iPhone 15 Pro, Pixel 9 |
| `mobile-xl` | 414px | iPhone Plus models, large Android |
| `mobile-xxl` | 430px | iPhone 15 Plus, large Android flagships |

### 📱 Mobile — Landscape (secondary check)

| Label | Viewport Width | Represents |
|---|---|---|
| `mobile-ls-sm` | 667px | iPhone SE landscape |
| `mobile-ls-md` | 812px | iPhone X/11/12 landscape |
| `mobile-ls-lg` | 896px | iPhone 11 Pro Max landscape |

### 📟 Tablet — Portrait

| Label | Viewport Width | Represents |
|---|---|---|
| `tablet-sm` | 600px | Small Android tablets, large phones in landscape |
| `tablet-md` | 768px | iPad Mini, iPad Air portrait — the most common tablet size |
| `tablet-lg` | 820px | iPad Air 5th gen portrait |
| `tablet-xl` | 1024px | iPad Pro 11" portrait, large tablets |

### 📟 Tablet — Landscape

| Label | Viewport Width | Represents |
|---|---|---|
| `tablet-ls-md` | 1024px | iPad Mini/Air landscape |
| `tablet-ls-lg` | 1180px | iPad Pro 11" landscape |
| `tablet-ls-xl` | 1366px | iPad Pro 12.9" landscape |

### 💻 Laptop & Desktop

| Label | Viewport Width | Represents |
|---|---|---|
| `laptop-sm` | 1280px | Common 13" laptop, lower-res displays |
| `laptop-md` | 1366px | Most common budget laptop resolution globally |
| `laptop-lg` | 1440px | MacBook Pro 14", standard design desktop |
| `desktop-hd` | 1920px | Full HD monitors — most common desktop resolution |
| `desktop-qhd` | 2560px | QHD/2K monitors, high-end laptops |
| `desktop-4k` | 3840px | 4K monitors (scale check — not a layout target) |

**For 4K (`3840px`):** The audit at this size is limited to one check — confirm that content does not become absurdly small or that the max-width container is properly constraining layout. No layout optimization needed beyond confirming the container cap is working.

---

## AUDIT PROCESS — HOW TO WORK

Work **page by page**, then **viewport by viewport** within each page. Do not audit all pages at one viewport then move to the next — complete each page fully before moving on.

For each page × viewport combination, run through the **Issue Checklist** below. Document every issue found using the **Issue Log Format** before writing any fix. Fix after documenting. Never silently fix an issue without logging it first.

### Pages to Audit (in this order)

1. Homepage (`/`)
2. About (`/about`)
3. Services (`/services`)
4. Work / Portfolio (`/work`)
5. Blog Index (`/blog`)
6. Blog Post (single — test one representative post)
7. Contact (`/contact`)

If any page does not yet exist, skip it and note it as "not yet built."

---

## ISSUE CHECKLIST (run for every page × viewport)

### 🔴 CRITICAL — Must fix before any other work

**C1 — Horizontal Scroll**
Does the page produce horizontal scrollbar or allow the user to scroll sideways? If yes: find the element whose width exceeds the viewport. Common causes: images without `max-width: 100%`, fixed-width elements, `padding` or `margin` that pushes outside the container, `pre`/`code` blocks without `overflow-x: auto`.

**C2 — Text Clipping / Overflow**
Is any text being cut off, hidden by `overflow: hidden`, or invisible because it overflows its container? Check especially: hero headline at small viewports, long unbroken words (URLs, email addresses, long service names), any element with a fixed height that doesn't grow with its content.

**C3 — Navigation Broken**
Is the navigation usable? Check: do all nav links fit without overlapping or collapsing at this viewport? Does the mobile hamburger menu appear at the right breakpoint? Does it open, close, and allow tapping every link? Are touch targets at least 44×44px?

**C4 — Content Unreachable**
Is any content hidden or inaccessible — not via a toggle or tab, but simply off-screen or behind another element? Check especially at landscape mobile, where viewport height is very short and fixed/sticky elements can block content.

---

### 🟡 MAJOR — Must fix in this pass

**M1 — Uneven or Broken Spacing**
Are there sections where spacing between elements is visibly unequal in a way that looks accidental? This includes: inconsistent gaps between cards in a grid, one section with far more or far less padding than its neighbours for no apparent reason, elements that are cramped against each other or against the screen edge.
- The minimum horizontal padding from any text or element to the screen edge on mobile is `1rem` (16px). Never less.
- The minimum vertical spacing between distinct content blocks is `1.5rem`. Never less.

**M2 — Text Alignment Violations**
Is text aligned incorrectly for its context? Apply these rules:

| Element Type | Correct Alignment | Never Use |
|---|---|---|
| Body text / paragraphs | `left` always | `center`, `justify`, `right` |
| Headlines in hero | `left` on desktop, `left` on mobile | `center` unless deliberate and short (≤ 4 words) |
| Section titles | `left` unless full-bleed accent strip | `justify` ever |
| Pull quotes / accent text | `left` or `center` if ≤ 2 lines | `justify` |
| Card body text | `left` always | `center`, `justify` |
| Navigation links | follows layout direction | `justify` |
| Stats / numbers | `center` within their cell is acceptable | `justify` |
| Footer columns | `left` | `center` for body text, `justify` |
| CTA button text | `center` within the button | `justify` |
| Form labels | `left` | anything else |
| Metadata / monospace labels | `left` | `center` or `justify` |

**Responsive alignment rule:** If a section stacks to a single column on mobile, text that was `left` on desktop must remain `left` on mobile. Do not auto-center stacked text just because it looks "more balanced" — it reads as an AI default and breaks reading flow.

The only exception: a very short (1–3 word) standalone label or eyebrow that is explicitly centered as a design choice. This must be intentional, documented, and consistent — not applied via a catch-all `.text-center` on mobile.

**M3 — Font Size Too Small or Too Large**
Is any text smaller than `14px` (0.875rem) at any viewport? Is any body text larger than `20px` (1.25rem) at mobile? Check: paragraph text, labels, captions, navigation links, form placeholder text, button text. Fix with `clamp()` values. Never use `px` for font sizes on text that should be readable at all sizes.

**M4 — Line Length Too Long on Mobile**
Is any paragraph text spanning the full width of the screen at mobile with no `max-width` constraint? On mobile (`360–430px`), a paragraph spanning the full viewport produces lines of 40–60 characters, which is acceptable. But if a paragraph runs edge-to-edge with only the container gutter as margin, it will feel cramped. Ensure body text always has `padding-inline` of at least `1rem` from the screen edge.

**M5 — Image Overflow or Distortion**
Does any image exceed its container width? Does any image stretch (distort aspect ratio)? Does any image appear blurry because it is being rendered at 2× its natural size? Fix: all images must have `max-width: 100%; height: auto; object-fit: cover` where a fixed aspect-ratio container is used.

**M6 — Button / CTA Not Tappable**
Is any button or link smaller than `44×44px` in tap target size at mobile? This includes small icon buttons, nav links, footer links, inline text links. Fix with `padding` — do not change the visual font size, just ensure the tappable area meets the minimum.

---

### 🔵 STANDARD — Fix in this pass

**S1 — Inconsistent Section Padding**
Does any section feel visually "tight" against the viewport edge compared to other sections on the same page? All sections must use the spacing token system (see Layout System Reference). If no token system exists yet, set a consistent pattern: `padding-block: clamp(3rem, 6vw, 6rem)` as the base for standard sections, and apply it uniformly unless a deliberate variation is intended.

**S2 — Cards Collapsing Incorrectly**
At tablet portrait (`768px`), do cards stay in a 2-column grid? At mobile, do they become single-column? At desktop, do they show the correct column count for their pattern? Any card grid that goes from desktop 3-column directly to mobile 1-column without a 2-column intermediate state at tablet is missing a breakpoint.

**S3 — Navigation Breakpoint Mismatch**
Does the hamburger menu appear too early (e.g., at 1024px when links still fit comfortably at 960px)? Or too late (e.g., links overlapping at 768px before the hamburger triggers)? Set the mobile nav breakpoint at the point where links no longer fit with comfortable spacing — typically `768px` or `900px` depending on the number of nav items.

**S4 — Sticky Nav Obscuring Content**
On pages with anchor links or jump navigation, does the sticky nav header overlap the target content when scrolled to? Fix with `scroll-margin-top: calc(var(--nav-height) + 1rem)` on every section that is an anchor target. `--nav-height` should be `64px` (or whatever the nav compresses to on scroll).

**S5 — Hero Height Issues**
On mobile, does the hero section force the user to scroll a full screen height before reaching the first piece of content? The hero should show enough content to communicate the page purpose without requiring any scroll on a 667px-height mobile viewport. Use `min-height` not `height` on the hero, and ensure the primary headline and at least one CTA are visible above the fold.

**S6 — Footer Layout Collapse**
At mobile, does the footer collapse to a clean single-column layout? Column-based footers must stack at `768px`. Footer links must be large enough to tap (minimum `44px` tap height). The copyright line must wrap cleanly — do not let it overflow or be hidden.

**S7 — Form Usability on Mobile**
On the contact page or any page with a form: do form inputs have a minimum height of `48px`? Does the keyboard push the active input into view (not behind the sticky nav)? Are labels positioned above inputs, not inside them as placeholder text only? Do inputs not zoom the page on iOS (requires `font-size: 16px` minimum on inputs — iOS Safari zooms if `font-size < 16px`)?

**S8 — Table / Code Block Overflow**
Does any table or code block (`<pre>`, `<code>`) overflow on mobile? Fix: wrap tables in a `div` with `overflow-x: auto`. Add `overflow-x: auto; white-space: pre;` to code blocks.

**S9 — Landscape Mode Usability**
On mobile landscape (`667px–896px width, ~360–414px height`): is the navigation accessible without being permanently obscured by the short viewport height? Is the hero section's vertical padding so large that the content is entirely below the fold in landscape? Fix: use `@media (max-height: 500px)` to reduce hero vertical padding for landscape mobile.

---

## ISSUE LOG FORMAT

For each issue found, record it before fixing:

```
PAGE:       /services
VIEWPORT:   mobile-sm (360px)
ISSUE ID:   M2
ELEMENT:    .service-card p
DESCRIPTION: Body text inside service cards is `text-align: center` on mobile.
             Text wraps to multiple lines with uneven line lengths, 
             making it hard to read. This should be `text-align: left`.
FIX APPLIED: Changed `.service-card p` from `text-align: center` to 
             `text-align: left`. Verified at 320px, 360px, 375px.
STATUS:     Fixed ✓
```

Collect all issues into a **Responsive Audit Report** (see Section at end of this document).

---

## FIX RULES — HOW TO WRITE THE CORRECTIONS

### Rule 1: Mobile-First, Min-Width Always
All new CSS must be written mobile-first using `min-width` media queries. If you are modifying an existing stylesheet that uses `max-width` queries, convert the affected rule to `min-width` before fixing it. Do not mix both in the same component.

### Rule 2: No Hardcoded Pixel Widths on Text Containers
Text containers (`p`, `h1–h6`, `li`, `.card`, `.section-text`) must never have a hardcoded `width: 640px` or similar. Use `max-width` with a `ch` or `rem` value, and let it be fluid below that maximum.

### Rule 3: All Font Sizes via clamp() or rem
No `font-size` in `px` for any readable text element. Use:
```css
/* Fluid: scales with viewport */
font-size: clamp(1rem, 1.2vw + 0.5rem, 1.125rem);

/* Fixed-ratio: respects user browser font preferences */
font-size: 1rem; /* = 16px at browser default */
```
Never: `font-size: 14px` on body copy, `font-size: 12px` on labels.

### Rule 4: Spacing Uses clamp() or the Token System
Any new `padding`, `margin`, or `gap` that applies to layout-level elements must use a `clamp()` value or reference the spacing token system. Avoid: `padding: 80px 0` — this is too large on mobile. Use: `padding-block: clamp(3rem, 6vw, 5rem)`.

### Rule 5: Image Rules
Every `<img>` must have:
```css
img {
  max-width: 100%;
  height: auto;
  display: block;
}
```
Every image in a fixed-height container must use `object-fit: cover` with explicit `width: 100%` on the container.

### Rule 6: Text Alignment Must Be Explicit
Do not rely on inheritance for text alignment. Every component that contains body text must explicitly declare `text-align: left`. If a component was centered at desktop and needs to stay centered (short headline, stat label), that must also be explicitly set. Never let alignment float by default.

### Rule 7: The 16px iOS Zoom Rule
Every `<input>`, `<textarea>`, and `<select>` must have `font-size: 1rem` (16px minimum). iOS Safari automatically zooms the page when a form field with `font-size < 16px` is focused. This is a critical mobile UX failure.

### Rule 8: Overflow Safety
Add the following to the root container to catch any runaway overflow:
```css
body {
  overflow-x: hidden;
}
.container, main, section, article {
  max-width: 100%;
}
```
Then hunt down the actual offending element rather than relying on `overflow: hidden` to mask it. Masking is not a fix.

### Rule 9: Touch Target Sizing
Use transparent padding to expand tap areas without changing visual size:
```css
/* Small nav link — visually 14px text, but tappable at 44px */
.nav-link {
  font-size: 0.875rem;
  padding-block: 0.75rem; /* ~12px top + bottom = 24px + line-height ≈ 44px total */
}
```

### Rule 10: No `!important` Overrides
Never use `!important` to force a responsive fix. It means you are fighting the specificity of another rule that also should not exist. Find the source rule and fix it properly.

---

## TEXT ALIGNMENT MASTER REFERENCE

This is the authoritative alignment decision tree for every text element on the site. Apply it consistently across all pages.

```
Is this body text / a paragraph?
  └─ Yes → text-align: left. Always. On every viewport.

Is this a multi-line block of text (more than one line when rendered)?
  └─ Yes → text-align: left. Never center or justify multi-line body text.

Is this a headline / section title?
  └─ Yes →
       Is it in a hero section? → left
       Is it a section title above a list or grid? → left
       Is it a full-bleed strip with a single short statement (≤ 6 words)? → center is acceptable
       Is it a stat number inside a stat cell? → center is acceptable

Is this a navigation item?
  └─ Desktop: aligned with the nav layout direction (usually left for logo, left for links)
     Mobile overlay: center is acceptable for large overlay menu links

Is this a CTA button label?
  └─ center within the button (standard button behavior)

Is this form input text?
  └─ left always

Is this a metadata label (date, category, author)?
  └─ left (unless it is a single standalone short label, center acceptable)

Should I ever use justify?
  └─ No. Never. Not on any screen size. Not for any element.
     Justified text creates uneven word spacing that breaks readability
     on responsive layouts and is particularly harmful on narrow viewports.
```

---

## DELIVERABLE: RESPONSIVE AUDIT REPORT

After completing the audit and fix pass, produce a structured report in this format:

```markdown
# Responsive Audit Report
**Date:** [date]
**Pages audited:** [list]
**Viewports tested:** [count]

## Summary
- Total issues found: [N]
- Critical (🔴): [N]
- Major (🟡): [N]
- Standard (🔵): [N]
- All fixed: Yes / No (list any deferred)

## Issues by Page

### /homepage
| ID | Viewport | Issue | Fix Applied |
|----|----------|-------|-------------|
| C1 | mobile-sm (360px) | Horizontal scroll caused by `.hero-bg` fixed width | Set `width: 100%`, removed fixed px value |
| M2 | mobile-md (375px) | `.about-intro p` centered on mobile | Changed to `text-align: left` |
...

### /services
[same table]

...

## CSS Changes Summary
A brief list of every CSS rule added or modified, grouped by file.

## Remaining Concerns
Any issues that could not be fixed in this pass (e.g., require content changes,
design decisions, or are out of scope for a CSS-only fix).
```

---

## SCOPE BOUNDARIES

| In scope | Out of scope |
|---|---|
| All pages, all viewports in the matrix | New page creation |
| Layout, spacing, typography responsive fixes | Visual redesign or style changes |
| Text alignment corrections | Content copywriting |
| Touch target sizing | New features or components |
| Image overflow / distortion | Backend or CMS changes |
| Form usability on mobile | Analytics or tracking |
| Navigation mobile behaviour | Dark/light mode work (separate pass) |

If a fix would require changing visual design (colours, fonts, layout patterns), flag it as a **design decision needed** in the audit report and do not apply it unilaterally.

---

*This prompt works in conjunction with `codex-layout-system.md` (spacing tokens, breakpoints, grid system) and `codex-humanize-homepage-prompt.md` (visual design pass). Run this responsiveness audit **after** the humanize pass is complete on a given page, so that responsive fixes are applied to the final design — not an intermediate state.*
