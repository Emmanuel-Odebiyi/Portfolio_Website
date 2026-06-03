# Phase 4: Test Infrastructure - Context

**Gathered:** 2026-06-03
**Status:** Ready for planning
**Source:** Codebase mapping and Phase 3 completion

<domain>
## Phase Boundary

Introduce testing tools to the project to prevent blog ingestion and loader regressions. Install `vitest` as a dev dependency, add a `test` script to `package.json`, and write unit tests that verify both local markdown fallback loaders and Sanity CMS parser helpers.

</domain>

<decisions>
## Implementation Decisions

- **Test Framework**: Install and configure `vitest` to support Vite-native module testing (Fast, ES Module compatible, typescript support out-of-the-box).
- **Loader Coverage**: Write unit tests covering `src/data/blogLoader.ts` parsing methods (specifically, frontmatter extraction, date parsing, section formatting, and timezone slug validation).
- **Package Configuration**: Update `package.json` to include `"test": "vitest run"` so tests run once to verify success rather than starting a watcher by default.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Configuration
- `package.json` — contains project dependency records and script definitions

### Application Logic
- `src/data/blogLoader.ts` — contains loader queries, slug derivation, and fallback loaders
- `src/data/sanityClient.ts` — handles network interactions for Sanity CMS queries

</canonical_refs>

<specifics>
## Specific Ideas

Mock the global `fetch` API in unit tests to verify both successful and failed Sanity CMS responses, checking that the system falls back correctly to local markdown parsing.

</specifics>

<deferred>
## Deferred Ideas

None — all test infrastructure setup tasks are in scope for Phase 4.

</deferred>

---

*Phase: 04-test-infrastructure*
*Context gathered: 2026-06-03 after Phase 3 completion*
