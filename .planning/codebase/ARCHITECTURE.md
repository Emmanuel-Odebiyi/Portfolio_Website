# Architecture

**Analysis Date:** 2026-06-03

## Pattern Overview

**Overall:** Headless CMS-backed React Single-Page Application (SPA) built on Vite, with fallback local data models and client-side 3D/GSAP visual experiences.

**Key Characteristics:**
- Client-side routing with Code-Splitting/Lazy Loading
- Headless API Integration (Sanity CMS) with automatic local Markdown fallback
- Interactive 3D graphics (React Three Fiber) & GSAP motion choreography
- Serverless static deployment (Vercel)

## Layers

**Router Layer:**
- Purpose: Orchestrates pages, handles code-splitting lazy fallbacks, skips navigation.
- Contains: Route mapping and layout wrappers.
- Key Location: `src/App.tsx`
- Depends on: Pages layer, Header/Footer components.
- Used by: React DOM runtime `src/main.tsx`.

**Pages Layer (Container Components):**
- Purpose: Renders page-level views, manages route parameters, initiates CMS/local data fetching, and houses page-specific layout configurations.
- Contains: Pages like `src/pages/Home.tsx`, `src/pages/Blog.tsx`, and `src/pages/BlogPost.tsx`.
- Depends on: Component layer, UI primitive layer, Data loader layer.
- Used by: Router layer.

**Reusable Components Layer:**
- Purpose: Structural components that are composed into pages.
- Contains: Layout elements (Header, Footer, Aurora background) and functional components (ToolsShowcase, ProblemNavigator).
- Key Location: `src/components/`
- Depends on: UI primitive layer, libraries (lucide-react, framer-motion).
- Used by: Pages layer.

**UI Primitives Layer (Atomic Components):**
- Purpose: Reusable micro-components, canvas objects, and raw layout items.
- Contains: Button, Globe, MagneticPull, time-tickers, animations.
- Key Location: `src/components/ui/`
- Depends on: External graphics/animation packages (Three, GSAP, Framer Motion).
- Used by: Components layer, Pages layer.

**Data Ingestion Layer:**
- Purpose: Pulls blog articles and dynamic data from Sanity CMS via zero-cache HTTP calls, falls back to pre-compiled local files, and cleans up slugs/metadata.
- Contains: Schema definition, fetch clients, slug sanitizers, and markdown parsing.
- Key Location: `src/data/blogLoader.ts` and `src/data/blogData.ts`.
- Depends on: Headless CMS REST APIs and local `/content/blog/` files.
- Used by: Blog and BlogPost pages.

## Data Flow

**Dynamic Blog Fetching & Fallback:**

1. User visits `/blog` page (`src/pages/Blog.tsx`).
2. Page invokes data fetch from the loader (`src/data/blogLoader.ts` -> `allBlogPosts`).
3. The loader makes a zero-cache REST API call to Sanity CDN (`https://96ilx2qv.api.sanity.io/...`).
4. **If API call succeeds:** The loader sanitizes the JSON response, converts Portable Text arrays to legacy sections (if needed for TOC sidebars), sanitizes malformed slugs or titles, and returns the list.
5. **If API call fails/offline:** The loader intercepts the error and calls `loadLocalCMSPosts()`, which runs Vite's `import.meta.glob('/content/blog/*.{md,mdx}')` to compile markdown frontmatter and body blocks, and falls back gracefully.
6. The component renders the list using Lucide icons and Framer Motion transitions.

**State Management:**
- Theme/Light-dark state: Handled via `next-themes` and stored in localStorage.
- Content state: Resolved via React Component states (`useState`) during runtime mounting (`useEffect`).

## Key Abstractions

**Loader Modules:**
- Purpose: Decouples rendering pages from data fetching protocols.
- Examples: `src/data/blogLoader.ts`
- Pattern: ES Module Singleton queries.

**Visual Effects / Canvas Elements:**
- Purpose: Embeds responsive 3D/2D animation canvases.
- Examples: `src/components/Aurora.tsx`, `src/components/ui/globe.tsx`
- Pattern: Fiber Canvas wrappers and Three.js effects hook integrations.

## Entry Points

**Main Client Bundle Entry:**
- Location: `src/main.tsx`
- Triggers: Browser loading page resources.
- Responsibilities: Mounts React application, binds router, injects stylesheets, sets up service workers.

**CMS Admin Studio Entry:**
- Location: `sanity-studio/sanity.cli.ts` / `sanity-studio/sanity.config.ts`
- Triggers: Running Sanity dev studio server.
- Responsibilities: Loads schema schemas, connects custom blocks, sets Project IDs/dataset bindings.

## Error Handling

**Strategy:** Error fallback logging and UI degradation.

**Patterns:**
- Try/catch blocks in Sanity fetch queries, defaulting to offline Markdown content.
- Missing path overrides mapping to custom wildcard `NotFound` component inside `App.tsx`.
- Validation checks in CMS slug strings to collapse double-hyphens and eliminate trailing punctuation.

---

*Architecture analysis: 2026-06-03*
*Update when major patterns change*
