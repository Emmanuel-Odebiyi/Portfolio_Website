# Emmanuel Odebiyi's Portfolio Website

## What This Is

A premium personal portfolio website and Growth Lab showcasing Emmanuel's digital marketing, SEO, automation, and engineering deliverables. It features responsive pages, interactive growth tools, dynamic Sanity CMS articles, and robust fallback offline capabilities.

## Core Value

Provide an engaging, performant, and visual proof-of-competence showcase that converts visitors into clients or partners.

## Requirements

### Validated

- ✓ Client-side SPA routing for seamless page transitions — existing
- ✓ Headless Sanity CMS blog integration with edge caching bypass — existing
- ✓ Local markdown file parser fallback for offline blog accessibility — existing
- ✓ Interactive WebGL 3D Globe and Aurora background shaders — existing
- ✓ Multi-themed CSS design tokens (light/dark mode) — existing
- ✓ Custom tools (ROI growth engine and problem navigators) — existing

### Active

- [ ] Resolve Tina CMS dependency remnants and consolidate local markdown schemas
- [ ] Unify Sanity client configuration details into a single central client module
- [ ] Implement responsive viewport scaling overrides for heavy 3D canvas modules on mobile devices
- [ ] Add basic Vitest test configurations to prevent regressions in blog parsers and fallback loaders

### Out of Scope

- User authentication dashboard — Sanity Studio handles content writer admin access.
- E-commerce merchandise store — Deferred to future milestones to focus on core portfolio deliverables first.

## Context

- **Environment**: Vite + React 19 client-side app served statically on Vercel.
- **Data Integrations**: Sanity CMS dataset mapping (`96ilx2qv`), dynamically falling back to `/content/blog/` markdown.
- **Prior Work**: Migrated CMS platforms from Tina to Sanity, leaving some unused workspace package footprints.

## Constraints

- **Compatibility**: Must run efficiently across modern desktop and mobile browsers.
- **Performance**: High frame rate scrolling and animations; 3D canvas modules must degrade gracefully on low-end hardware.
- **Deployment**: Static deployment targets (Vercel) require build-time generation checks.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Transitioned to Sanity CMS | Replaced Tina CMS to leverage visual edge-hosted studio and CDNs | ✓ Good |
| Bypassed CDN Cache parameters | Solved dynamic post syncing issues by disabling standard fetch cache headers | ✓ Good |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-06-03 after codebase mapping*
