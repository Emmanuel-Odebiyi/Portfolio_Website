# Codebase Structure

**Analysis Date:** 2026-06-03

## Directory Layout

```
[project-root]/
├── .agent/              # GSD framework profiles, configurations, and skills
├── content/             # Local Markdown content files for CMS fallbacks
│   └── blog/            # Offline blog posts (.md/.mdx)
├── public/              # Static public files, web app icons, and vectors
├── sanity-studio/       # Sanity CMS admin visual dashboard
│   ├── schemas/         # CMS document structures (posts, custom blocks)
│   └── sanity.config.ts # Project ID, plugins, and dataset configurations
├── src/                 # Application client source code
│   ├── assets/          # Shared visual media and images
│   ├── components/      # Reusable composed layout components
│   │   ├── ui/          # Atomic primitives (Buttons, Globes, Maps)
│   │   └── animations/  # GSAP and Canvas motion wrappers
│   ├── data/            # Local data structures and CMS loaders
│   ├── lib/             # Shared helpers (Tailwind class mergers)
│   ├── pages/           # Page-level containers mapped to routes
│   │   ├── portfolio/   # Client Case Study pages
│   │   ├── services/    # Client Service offering pages
│   │   └── tools/       # Growth widgets (Autopilot, Radar, Time Machine)
│   ├── App.tsx          # Root React Router mapping
│   ├── main.tsx         # Client application index mounting module
│   └── index.css        # Tailwind v4 directives and CSS tokens
├── tsconfig.json        # TypeScript compiler configurations
├── vercel.json          # Deployment redirects and path mapping rules
└── vite.config.ts       # Vite build configurations, HMR setups, and PWA manifests
```

## Directory Purposes

**content/blog/**
- Purpose: Storage for local markdown documents serving as CMS cache fallbacks.
- Contains: `.md` and `.mdx` files.
- Key files: Fallback blog articles describing marketing automation and SEO workflows.

**sanity-studio/**
- Purpose: Content creation system configured for Emmanuel's Growth Lab.
- Contains: Sanity dashboard files, schemas, and assets.
- Key files: `sanity.config.ts` (API bindings) and `schemas/post.ts` (blog post structures).

**src/components/ui/**
- Purpose: Atomic primitives, custom canvas rendering, and animated items.
- Contains: React components with Framer Motion, GSAP, and Three.js hooks.
- Key files: `globe.tsx` (3D webgl globe), `gsap-text-reveal.tsx` (scroll reveal effects).

**src/pages/**
- Purpose: Full screen containers representing application paths.
- Contains: Routed component views, split by feature sub-folders.
- Subdirectories: `portfolio/` for case studies, `services/` for business verticals, `tools/` for automated calculators.

## Key File Locations

**Entry Points:**
- `src/main.tsx` - App startup scripting.
- `sanity-studio/sanity.cli.ts` - Local Sanity studio console CLI path.

**Configuration:**
- `vite.config.ts` - Bundle compilers, Vite plugins, aliases, and PWA rules.
- `package.json` - System dependencies, compiler scripts, and package listings.
- `vercel.json` - Cloud host routing overrides.
- `.env` - Development environment secrets (Gemini API access).

**Core Logic & Fetching:**
- `src/data/blogLoader.ts` - CMS HTTP request mappings, offline loaders, and sanitization routines.
- `src/data/blogData.ts` - Static legacy fallback list.
- `src/lib/utils.ts` - Style merger mapping (`clsx` + `tailwind-merge`).

## Naming Conventions

**Files:**
- `kebab-case.ts/js`: Configuration scripts, data loaders, and asset managers (e.g. `blog-loader.ts`).
- `PascalCase.tsx`: React layout components, pages, and UI primitives (e.g. `ProblemNavigator.tsx`).
- `*.md`: Structured text documents, templates, and specifications.

**Directories:**
- `kebab-case`: Sub-folders representing specific modules or feature domains.

## Where to Add New Code

**New Page / View:**
- Implementation: `src/pages/`
- Routing config: Update `src/App.tsx` imports and lazy boundaries.

**New UI Primitive:**
- Implementation: `src/components/ui/`
- Styling: Vanilla CSS/Tailwind v4 class mapping.

**New Case Study:**
- Implementation: `src/pages/portfolio/`
- Configuration: Route setup in `src/App.tsx`.

## Special Directories

**.planning/**
- Purpose: Persistent project architecture, roadmaps, task boards, and verification ledgers.
- Source: Created and managed by GSD workflows.
- Committed: Yes (tracked under VCS).

---

*Structure analysis: 2026-06-03*
*Update when directory structure changes*
