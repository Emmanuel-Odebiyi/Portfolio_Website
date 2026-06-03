# External Integrations

**Analysis Date:** 2026-06-03

## APIs & External Services

**Sanity CMS Client:**
- Headless CMS hosting the blog posts, content sections, and page schemas
  - SDK/Client: REST query fetches using custom zero-cache fetch calls to bypassed CDN endpoints (`https://96ilx2qv.api.sanity.io/...`)
  - Project ID: `96ilx2qv` (Hardcoded to bypass environment parameter discrepancies)
  - Dataset: `production` (Configured or defaulting to `import.meta.env.VITE_SANITY_DATASET`)
  - Integration method: Fetch API targeting the `v2021-10-21` query dataset
  - Caching parameters: Bypassed via headers (`Cache-Control: no-store`, `Pragma: no-cache`)

**Google Gemini API:**
- Used for interactive AI features, scoring models, and simulator tools
  - SDK/Client: `@google/genai` npm SDK
  - Auth: `process.env.GEMINI_API_KEY` mapped from the Vite env configuration

**Asset Services:**
- DiceBear Avatars (`https://api.dicebear.com/`): Fallback author avatar SVG assets
- Unsplash (`https://images.unsplash.com/`): Content placeholders and high-resolution blog images

## Data Storage

**Databases:**
- None (Headless CMS via Sanity.io cloud)

**File Storage:**
- Sanity Asset Store: Images/assets loaded via CDN urls resolved from `image.asset->url`

**Local Markdown Fallback:**
- Dynamic file ingestion using Vite's `import.meta.glob('/content/blog/*.{md,mdx}')` for offline support, rendering fallback posts compiled locally.

## Authentication & Identity
- No user-facing client accounts (Static portfolio showcases public client deliverables)
- Sanity visual studio uses default Sanity user profiles (OAuth/Email credentials managed via sanity.io/manage)

## Monitoring & Observability
- Deploy logs: Vercel build output logs
- Client-side error warnings: Development mode console outputs

## CI/CD & Deployment

**Hosting:**
- Vercel - Serves client-side bundle and handles rewrite routes
  - Deployment: Automatic CI/CD pipeline triggered by Git commits on tracking branches
  - Custom rules: Configured via `vercel.json` for path overrides, clean URLs, and routing

## Environment Configuration

**Development:**
- Local secrets: `.env` file containing `GEMINI_API_KEY`
- HMR management: Controlled via the `DISABLE_HMR` environment variable

**Production:**
- Secrets management: Managed under Vercel project environment variables

---

*Integration audit: 2026-06-03*
*Update when adding/removing external services*
