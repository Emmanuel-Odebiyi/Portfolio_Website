# Phase 1: Dependency Cleanup - Context

**Gathered:** 2026-06-03
**Status:** Ready for planning
**Source:** Codebase mapping and initial roadmap

<domain>
## Phase Boundary

Purge Tina CMS package dependencies, configuration files, and folders from the root of the workspace. Standardize the frontmatter schema of offline fallback blog posts under `content/blog/` to ensure full compatibility with the local markdown loader module.

</domain>

<decisions>
## Implementation Decisions

- **Tina Purge**: Remove `.tina` directory, `tina/` directory if present, and uninstall `tinacms` and `@tinacms/cli` dependencies from `package.json`.
- **Markdown Alignment**: Scan all `.md` files in `content/blog/` and ensure uniform metadata properties (e.g. title, date, excerpt, coverImage, author) match the fields decoded by the client loader.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Package Configuration
- `package.json` — contains dependency records to be removed

### Blog Loading
- `src/data/blogLoader.ts` — handles markdown parsing logic and defines the required schema fields

</canonical_refs>

<specifics>
## Specific Ideas

Ensure that after purging packages, `npm install` runs cleanly without package lock conflicts.

</specifics>

<deferred>
## Deferred Ideas

None — all cleanup tasks are in scope for Phase 1.

</deferred>

---

*Phase: 01-dependency-cleanup*
*Context gathered: 2026-06-03 after codebase mapping*
