# Phase 2: Configuration Consolidation - Context

**Gathered:** 2026-06-03
**Status:** Ready for planning
**Source:** Codebase mapping and Phase 1 completion

<domain>
## Phase Boundary

Centralize the hardcoded Sanity CMS project ID, dataset settings, and API queries into a unified `sanityClient.ts` module. Refactor `blogLoader.ts` to consume the unified client instead of holding its own inline project credentials or fetch layers.

</domain>

<decisions>
## Implementation Decisions

- **Centralized Client**: Create `src/data/sanityClient.ts` to export standard project variables and a single helper function for fetching CMS queries.
- **Deduplicated Configs**: Move hardcoded strings like `'96ilx2qv'` to the client so that if the project switches datasets or project IDs in the future, only a single file needs updates.
- **Graceful Fallbacks**: Ensure that if queries fail or parameters are missing, the loader gracefully falls back to local offline markdown data.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Client & Configuration
- `src/data/sanityClient.ts` — new centralized Sanity client
- `src/data/blogLoader.ts` — consumes the centralized client for loading CMS posts

</canonical_refs>

<specifics>
## Specific Ideas

Keep query cache options configurable so the client functions can be reused for real-time visual editing or standard CDN-cached static views in the future.

</specifics>

<deferred>
## Deferred Ideas

None — all consolidation goals are in scope for Phase 2.

</deferred>

---

*Phase: 02-config-consolidation*
*Context gathered: 2026-06-03 after Phase 1 completion*
