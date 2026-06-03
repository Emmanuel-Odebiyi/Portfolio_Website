# Codebase Concerns

**Analysis Date:** 2026-06-03

## Tech Debt

**Tina CMS Remnants:**
- Issue: Legacy build files and schemas from the Tina CMS integration remain after migrating to Sanity CMS.
- Files: Unused package dependencies in `package.json` and legacy Markdown frontmatter format inconsistencies.
- Impact: Increases bundle size and confuses developers onboarding to the codebase.
- Fix approach: Clean up `package.json` dependencies, remove unused config files, and standardize frontmatter layout.

**Hardcoded Project ID:**
- Issue: The Sanity project ID `96ilx2qv` is hardcoded in fetch calls.
- Files: `src/data/blogLoader.ts`
- Why: To bypass environment variable resolution discrepancies inside Vercel deployment environments.
- Impact: Migrating datasets or deploying to a staging Sanity account requires searching and replacing literal strings throughout the codebase.
- Fix approach: Centralize the Sanity configuration object in a single file like `src/lib/sanityClient.ts` and resolve ID variables via Vite's `import.meta.env`.

## Security Considerations

**API Key Exposure:**
- Risk: Exposing private API keys to the browser bundle if variables are prefixed with `VITE_` or used in client-side code directly.
- Files: `.env`, `src/data/blogLoader.ts`
- Current mitigation: Sanity Edge CDN runs read-only requests, meaning the project ID is public by design.
- Recommendations: Ensure that writing actions are executed via secure backend serverless functions, keeping write tokens out of client-side JS.

## Performance Bottlenecks

**3D Canvas Render Loops:**
- Problem: The WebGL Globe and Aurora shader background utilize canvas renders that can trigger high GPU/CPU usage on mobile viewports.
- Files: `src/components/ui/globe.tsx`, `src/components/Aurora.tsx`
- Impact: Framerate drops, interface stuttering, and high battery consumption on mobile browsers.
- Improvement path: Implement conditional canvas rendering or downscaled resolution settings based on device resolution (e.g. disable globe on mobile or use static fallback images).

**Serially Blocked Dynamic Imports:**
- Problem: Lazy-loaded pages wait until route matching completes before initiating JS chunk downloads.
- Files: `src/App.tsx`
- Impact: Delay of 200ms–800ms when clicking nav links on slow networks before the component mounts.
- Improvement path: Implement prefetching strategies on link hovers using React Router's built-in options or custom hover prefetch hooks.

## Fragile Areas

**Sanity Payload Parsing:**
- File: `src/data/blogLoader.ts`
- Why fragile: Expects specific block formats (Portable Text) and transforms them to simple strings for client views.
- Common failures: Malformed block items, missing array structures, or empty titles crash pages during parsing.
- Safe modification: Add robust validation checks, default fallback strings, and catch block statements for individual section mapping.

## Test Coverage Gaps

**Sanity fetch and offline fallback paths:**
- What's not tested: Graceful fallback to local Markdown files when the Sanity CDN times out or returns error codes.
- Risk: API errors can result in white-screen component crashes for visitors.
- Priority: High
- Difficulty to test: Requires mocking fetch responses and simulating network disconnections.

---

*Concerns audit: 2026-06-03*
*Update as issues are fixed or new ones discovered*
