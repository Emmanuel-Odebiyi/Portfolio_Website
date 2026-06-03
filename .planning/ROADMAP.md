# Roadmap: Emmanuel Odebiyi's Portfolio Website

## Overview

This roadmap defines the execution phases to clean up legacy Tina CMS dependencies, unify the Sanity CMS client integration, optimize 3D canvas rendering for mobile devices, and introduce a test suite to ensure long-term stability.

## Phases

- [x] **Phase 1: Dependency Cleanup** - Purge Tina CMS remnants and standardize local markdown post schemas.
- [x] **Phase 2: Configuration Consolidation** - Centralize Sanity CMS client queries and Project ID definitions.
- [x] **Phase 3: Mobile Viewport Tuning** - Optimize WebGL Globe viewport boundaries and shader render loops on mobile.
- [ ] **Phase 4: Test Infrastructure** - Setup Vitest runner configurations and write initial loaders test suites.

## Phase Details

### Phase 1: Dependency Cleanup
**Goal**: Remove unused packages and unify frontmatter files for offline fallback content.
**Depends on**: Nothing
**Requirements**: CMS-01, CMS-02
**Success Criteria**:
  1. No Tina CMS package scripts remain inside package.json.
  2. All local markdown fallback posts compile cleanly without schema mismatches.
**Plans**: 1 plan

Plans:
- [x] 01-01: Remove unused Tina packages and align blog markdown keys

### Phase 2: Configuration Consolidation
**Goal**: Unify API calls and edge caching configurations.
**Depends on**: Phase 1
**Requirements**: CMS-03
**Success Criteria**:
  1. A single centralized `sanityClient.ts` module manages all queries.
  2. The hardcoded project ID and CDN endpoints resolve from a single file.
**Plans**: 1 plan

Plans:
- [x] 02-01: Build unified Sanity Client module

### Phase 3: Mobile Viewport Tuning
**Goal**: Maximize scrolling performance on mobile screens by scaling down heavy WebGL nodes.
**Depends on**: Phase 2
**Requirements**: MOB-01, MOB-02
**Success Criteria**:
  1. The WebGL Globe component scales down or switches to static images under 768px viewports.
  2. Aurora shader render loops are paused or throttled on low-end mobile devices.
**Plans**: 1 plan

Plans:
- [x] 03-01: Adjust 3D components for mobile device viewports

### Phase 4: Test Infrastructure
**Goal**: Introduce testing tools to prevent blog ingestion regressions.
**Depends on**: Phase 3
**Requirements**: QA-01, QA-02
**Success Criteria**:
  1. Running `npm run test` executes a Vitest script.
  2. Main loader parses and offline fallback compilers are covered by basic test assertions.
**Plans**: 1 plan

Plans:
- [ ] 04-01: Integrate Vitest and write loader tests

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Dependency Cleanup | 1/1 | Completed | 2026-06-03 |
| 2. Configuration Consolidation | 1/1 | Completed | 2026-06-03 |
| 3. Mobile Viewport Tuning | 1/1 | Completed | 2026-06-03 |
| 4. Test Infrastructure | 0/1 | Not started | - |
