# Phase 3: Mobile Viewport Tuning - Context

**Gathered:** 2026-06-03
**Status:** Ready for planning
**Source:** Codebase mapping and Phase 2 completion

<domain>
## Phase Boundary

Optimize the WebGL components to ensure 60fps scrolling and fast load times on mobile devices (width < 768px). This involves scaling down or replacing the Three.js WebGL Globe in `src/components/ui/globe.tsx` with a static map visualization, and completely pausing/bypassing the fixed `Aurora.tsx` Three.js canvas render loop on mobile viewports by replacing it with a hardware-accelerated static CSS radial gradient background.

</domain>

<decisions>
## Implementation Decisions

- **Globe Viewport Responsiveness**: Detect screen width using media queries. For widths < 768px, render a static image representation of the world maps to bypass WebGL entirely on mobile.
- **Aurora Shader Pause**: Detect mobile viewports in `Aurora.tsx` and return a performant, static CSS gradient backdrop that mimics the color tone of the particle swarm and grid, eliminating Three.js render loops.
- **Hook Reuse**: Standardize on `window.matchMedia` listeners inside React hooks for robust, real-time responsive updates when users resize or rotate their devices.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### 3D / WebGL Components
- `src/components/ui/globe.tsx` — containing the main landing page timezone Globe component
- `src/components/Aurora.tsx` — containing the background animation grid and particle swarm

</canonical_refs>

<specifics>
## Specific Ideas

Keep CSS backdrop styling smooth by matching the existing dark theme colors (`#0a0f1e`, `#d97706` amber, etc.).

</specifics>

<deferred>
## Deferred Ideas

None — all mobile optimization tasks are in scope for Phase 3.

</deferred>

---

*Phase: 03-mobile-viewport-tuning*
*Context gathered: 2026-06-03 after Phase 2 completion*
