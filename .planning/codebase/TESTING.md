# Testing Patterns

**Analysis Date:** 2026-06-03

## Test Framework

**Runner:**
- No automated test runner (Jest, Vitest, etc.) is currently configured in the main project.
- Visual CMS studio tests can be checked via local Sanity dashboard runs.

**Run Commands:**
- None configured in `package.json`.

## Test File Organization
- No `*.test.ts`, `*.spec.ts`, or separate test directories exist inside `src/`.
- Pre-compiled packages (such as Open GSD inside `.agent/`) contain their own internal test suites which can be ignored for portfolio operations.

## Manual Verification Patterns

**Development Verification:**
- Run `npm run dev` and navigate routes to verify client-side bundle builds.
- Check browser console logs for dynamic fetching successes or failures when querying CMS endpoints.

**Build Verification:**
- Run `npm run build` to verify tree-shaking, TypeScript compiler checks (`tsc --noEmit`), and production asset bundling.
- Preview production builds locally using `npm run preview`.

**Sanity CMS Verification:**
- Run `npm run dev` in `sanity-studio/` to load schemas and test visual block editors and content field inputs.

## Future Recommendations

**Unit & Integration Testing:**
- Setup **Vitest** for lightweight testing of CMS fetching loaders and slug/title sanitation logic.
- Target collocated test files: `src/data/blogLoader.test.ts`.

**E2E Testing:**
- Setup **Playwright** to automate page loading audits, skipping navigation accessibility tests, and form submissions in `src/pages/Contact.tsx`.

---

*Testing analysis: 2026-06-03*
*Update when test patterns change*
