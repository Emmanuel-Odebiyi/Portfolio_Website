# Rebranding & Redesign Plan: Emmanuel Odebiyi's Portfolio Home Page

This plan outlines the strategy and code-level checklist to transition the home page from a generic "AI-designed template" into a premium, human-crafted editorial tech experience. It incorporates the new brand color palette, applies design principles to eliminate AI signatures, and configures persistent workspace rule constraints.

---

## 1. Brand Color Palette Mapping

Based on the color swatch provided, we will map the brand colors to semantically named tokens in `src/index.css`. This ensures consistent usage and prevents the AI from defaulting to generic tailwind grays or fintech blues.

| Color Role | HEX Code | Tailwind Token | Semantic Usage |
| :--- | :--- | :--- | :--- |
| **Dark Canvas (Base)** | `#111f2e` | `--color-dark-base` | Whole page background (`body`) |
| **Dark Surface (Card)** | `#212b3a` | `--color-dark-surface` | Card panels, grid boxes, comparison blocks |
| **Vibrant Green (Accent)** | `#099069` | `--color-accent-teal` | Success states, autopilot badges, secondary highlights |
| **Warm Gold (Accent)** | `#f0af18` | `--color-accent-gold` | Primary warning text, accent indicators, selection overlays |
| **Royal Blue (Accent)** | `#3b7deb` | `--color-accent-blue` | Primary CTA backgrounds, link highlights |
| **Off-White/Cream** | `#e3e3e2` | `--color-text-primary` | Main text color, high-contrast subtitles |

---

## 2. Eliminating AI Clichés (The "Human Touch")

Following the principles of professional editorial design and the web-design guidelines, we will remove several overused AI signatures:

*   **No Linear/Radial Gradients on Text & CTAs:**
    *   *AI Signature:* Text that shifts from blue-to-indigo-to-amber, and buttons with multi-color gradient fills.
    *   *Human Change:* Replace with solid colors (white or `#f0af18` for accents). Buttons will have solid background colors (`#3b7deb` or `#212b3a` with clean borders).
*   **No Background Aurora Glow Blobs:**
    *   *AI Signature:* Large, semi-transparent colored spheres (`aurora-orb`) floating behind content.
    *   *Human Change:* Replace with a clean, deep slate background (`#111f2e`) with a subtle noise overlay or thin solid borders to separate sections.
*   **No HUD/Sci-Fi Visual Elements:**
    *   *AI Signature:* Tech labels inside grids like `SYS_RUN.v4`, `CTR_BOOST`, or `SEO_INDEXER` along with complex radial pointer tracking spotlights.
    *   *Human Change:* Remove HUD labels entirely. Simplify card hover states to use subtle, hardware-accelerated translations (`translate-y-[-4px]`) and clean border highlights.
*   **Emphasis on Typographic Hierarchy & Spacing:**
    *   Keep the premium serif `Cormorant Garamond` for large editorial section headlines.
    *   Set body copy to `Plus Jakarta Sans` with generous line-height (`leading-relaxed`) and letter spacing (`tracking-tight`).
    *   Increase vertical spacing (`py-24` to `py-32`) to give sections clean room to breathe.

---

## 3. Workspace Rules Configuration (`vibe-rules`)

To establish persistent agent prompt constraints and prevent repetitive instructions, we will add a custom rules file to the workspace.

*   **Rule Location:** `.agents/rules/custom-rules.md` (or integrated directly into `GEMINI.md`).
*   **Target Constraints:**
    1.  **P0 Browser Subagent Restriction:** Do not invoke or start the browser subagent (`browser_subagent`) unless the user explicitly requests it. Rely on text-based verification and user feedback first.
    2.  **Color Scheme Lock:** Never use purple, violet, indigo, or magenta as primary/brand colors. Stick strictly to the defined brand colors.
    3.  **No AI Signatures:** Never output mesh/aurora gradients, glassmorphism overlays, or HUD text markers (`SYS_RUN.v4`) in UI edits.

---

## 4. Component-by-Component Implementation Checklist

### A. Global Styles (`src/index.css`)
- [ ] Update theme color variables with the exact brand HEX codes.
- [ ] Remove `--bg-gradient-brand` definitions that use generic blue/indigo gradients.
- [ ] Ensure `:focus-visible` outlines use the new warm gold accent color (`#f0af18`).

### B. Hero Section (`src/components/home/HeroSection.tsx`)
- [ ] Remove floating radial background aurora glow divs (`aurora-orb-1`, `aurora-orb-2`, `aurora-orb-3`).
- [ ] Replace text clipping inline gradients on the main headline with solid `#ffffff` or clean accent colors.
- [ ] Replace inline gradients on the Primary CTA button ("See Real Client Results") with a solid royal blue background (`#3b7deb`) and a subtle transition.
- [ ] Adjust the background and border of the left/right comparison card blocks ("Manual Grind" vs "Autopilot") to use the new slate surface color (`#212b3a`) and thin `#ffffff/10` borders.

### C. Featured Results (`src/components/home/FeaturedResults.tsx`)
- [ ] Refactor the `BentoCard` component:
    - [ ] Remove mouse coordinate tracking (`coords`, `handleMouseMove`).
    - [ ] Remove inline background radial spotlight (`radial-gradient`).
    - [ ] Remove hover border light trail overlay.
    - [ ] Set background to solid `#212b3a/90` and border to a clean `border-white/10`.
- [ ] Remove the inner blueprint HUD layout lines and text labels (`SYS_RUN.v4`, `SEO_INDEXER`, `CTR_BOOST`, `SERP_OPT`).
- [ ] Replace `text-brand-gradient` metrics (`$127k`, `65%`, etc.) with high-contrast, clean solid colors (e.g., `#f0af18` or `#ffffff`).

### D. Other Home Components (Optional adjustments to match brand)
- [ ] Review `StatsBar.tsx`, `ProblemSection.tsx`, and `SolutionSection.tsx` to replace any remaining blue/purple gradients or radial glows with solid panel styles.
- [ ] Update the static "Powered By" tool logos block in `Home.tsx` to use the slate navy surface background (`#212b3a`) and remove the `hover:shadow-indigo-500/10` shadow.

---

## 5. Verification & Acceptance Criteria

### 1. Manual Checklist
- [ ] The Home page background is a solid, deep navy `#111f2e`.
- [ ] Section dividers are thin, clean solid borders instead of glowing gradients or floating auroras.
- [ ] No gradient headers or HUD label tags are present.
- [ ] The browser subagent has NOT been invoked.

### 2. Technical Checks
- [ ] Run linter to ensure no broken imports or typescript compiler errors:
    ```powershell
    npx tsc --noEmit && npm run lint
    ```
- [ ] Run build test to check production bundle compiler output:
    ```powershell
    npm run build
    ```
