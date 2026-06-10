# Light Theme + Font Cleanup Plan
## Emmanuel Odebiyi Portfolio — Home Page

---

## Part 1: Font Audit & Cleanup

### Current Font Stack (3 fonts)

| Font | Role | Status |
|------|------|--------|
| `Cormorant Garamond` | Display / H1 | ✅ **Keep** — editorial serif, human, premium |
| `Plus Jakarta Sans` | Body / H2-H6 | ✅ **Keep** — clean modern sans, widely used in professional design |
| `JetBrains Mono` | Monospace labels | ❌ **Remove** — strongly associated with AI dev tools, code editors, tech demos |
| `Geist` | Imported via @fontsource | ❌ **Remove** — Vercel's brand font, immediately recognizable as "AI builder" |

### The `font-mono` Problem

The `font-mono` class is used **30+ times** across home components — for section labels, badges, tag pills, card footers, stat labels, and CTA sub-text. This is an "AI signature" pattern:

> Excessive monospace type on labels is a hallmark of AI-generated design systems and dev-tool UIs. Human designers use ALL-CAPS + letter-spacing with the body sans-serif for labels, not a code font.

### Font Replacement Strategy

| What to Change | Current | Replace With |
|------|------|------|
| `--font-mono` token | `"JetBrains Mono"` | Removed; no separate mono font |
| `font-mono` on section labels/badges | `JetBrains Mono` | `font-sans` (`Plus Jakarta Sans`) with `uppercase tracking-widest text-[10px] font-bold` |
| `@import "@fontsource-variable/geist"` | Geist variable font loaded globally | Remove import entirely |

**Rule Going Forward:** Labels and pills use `Plus Jakarta Sans` (sans) at small size + uppercase + wide letter-spacing — NOT a monospace font. This is standard editorial print design.

---

## Part 2: Light Theme Design Concept

### Conceptual Approach

Drawing from the **common thread** across all four reference images you shared:

1. **Lofi** — warm, creamy paper-white backgrounds, dark ink text, organic asymmetry
2. **ShipMerch** — bright clean white with strong typographic hierarchy, high-contrast section separators
3. **Verdant** — clean white panels, editorial section labels, generous whitespace
4. **Fourth image** — minimal, restrained layout, bold black type on white

**Shared design DNA across all four:**
- **Clean white or warm cream backgrounds** (never pure `#ffffff` — usually warm `#f9f7f4` or cool `#f6f8fb`)
- **Dark, high-contrast body text** (near-black)
- **Accent colors used sparingly** — not splashed everywhere
- **Card surfaces as slightly off-white panels** with a hairline border (not shadows)
- **Section separators as thin horizontal lines**, not color block transitions

### Light Theme Color Palette

| Token | HEX | Usage |
|-------|-----|-------|
| `--light-base` | `#f4f5f7` | Page background (cool off-white, not stark white) |
| `--light-surface` | `#ffffff` | Card panels, comparison blocks, stat bar |
| `--light-surface-alt` | `#eef0f4` | Alternate sections (problem/solution) |
| `--light-border` | `rgba(17,31,46,0.10)` | Card borders, dividers |
| `--light-text-primary` | `#111f2e` | Body text, headlines |
| `--light-text-secondary` | `#4a5568` | Sub-text, labels |
| `--accent-blue` | `#3b7deb` | CTAs, links (same as dark mode) |
| `--accent-amber` | `#f0af18` | Accent highlights (same as dark mode) |
| `--accent-teal` | `#099069` | Success indicators (same as dark mode) |

> The accent colors stay **identical** across both themes — only the backgrounds and text colors flip.

---

## Part 3: Dark/Light Theme Toggle Mechanism

### Approach: CSS Class on `<html>`

We will use Tailwind's `dark:` variant combined with a custom class toggle. The `<html>` tag will receive either no class (defaults to **light**) or `class="dark"` (activates dark tokens).

```
light mode → html element has no special class → CSS uses --light-* tokens
dark mode  → html element has class="dark"      → CSS uses existing --dark-* tokens
```

**Toggle Persistence:** The user's preference is stored in `localStorage` so it persists across page reloads.

### Files to Change

| File | Change |
|------|--------|
| `src/index.css` | Add `:root` (light) tokens; wrap current dark tokens inside `.dark` |
| `src/components/ThemeToggle.tsx` | **New file** — sun/moon button that flips `document.html.classList` |
| `src/components/layout/Header.tsx` (or navbar) | Mount `<ThemeToggle />` in the nav |
| All home components | Replace hardcoded dark colors (`text-zinc-400`, `bg-zinc-950`) with semantic CSS variable classes that respond to the theme |

---

## Part 4: Component Semantic Color Replacements (Home Page)

For each component, hardcoded dark colors like `text-zinc-400` and `bg-[#0d1222]` will be replaced with semantic variable-backed classes that adapt to the theme toggle.

### New Semantic CSS Utility Classes (added to `index.css`)

```css
.page-bg     { background-color: var(--bg-page); }
.surface     { background-color: var(--bg-surface); }
.surface-alt { background-color: var(--bg-surface-alt); }
.text-body   { color: var(--text-body); }
.text-muted  { color: var(--text-muted); }
.card-border { border-color: var(--border-card); }
```

These classes automatically pick up light or dark values from `:root` vs `.dark`.

### Component-by-Component Plan

| Component | Key Change |
|-----------|-----------|
| `HeroSection.tsx` | Background to `var(--bg-page)`. Headline text to dark `var(--text-body)`. Side comparison cards to `var(--bg-surface)`. |
| `StatsBar.tsx` | Background to `var(--bg-surface)`, text to `var(--text-body)`. |
| `ProblemSection.tsx` | Sticky viewport background to `var(--bg-surface-alt)`. Card numbers keep accent color. |
| `SolutionSection.tsx` | Sticky viewport background to `var(--bg-surface-alt)`. Collapsed panels light-bordered. |
| `FeaturedResults.tsx` | Cards to `var(--bg-surface)` with `var(--border-card)`. Metric numbers keep accent color. |
| `CTASection.tsx` | Section background to `var(--bg-page)`. CTA button stays brand blue. |
| `Home.tsx` Powered By | Block background to `var(--bg-surface)`. |

---

## Part 5: Execution Order

When you approve this plan, I will execute in this order:

1. **CSS Tokens** — Define all light/dark semantic tokens in `index.css`. This is the foundation.
2. **Font Cleanup** — Remove `JetBrains Mono` and `Geist`. Replace `font-mono` labels with `font-sans` equivalents.
3. **ThemeToggle Component** — Create the `ThemeToggle.tsx` with `localStorage` persistence.
4. **Mount Toggle in Navbar** — Add `<ThemeToggle />` to the site header.
5. **Home Component Updates** — Replace hardcoded dark color classes with semantic variable classes across all 9 home components.
6. **TypeScript Check** — Run `tsc --noEmit` to verify zero errors.

---

## Open Questions Before I Proceed

1. **Default mode:** Should the site **default to Light** on first visit (and let users switch to dark), or default to Dark?
2. **Font for labels:** Since we're removing the mono font, should label text use `Plus Jakarta Sans` with wide letter-spacing (editorial), or should we introduce a different accent/label font? (e.g., `DM Sans` or `Inter`)
3. **Light theme CTA button colour:** The royal blue `#3b7deb` CTA works on a dark background. On a bright white background it may need a slightly deeper shade. Should I auto-adjust the button hover state for the light theme, or use the same color?
