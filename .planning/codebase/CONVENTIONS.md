# Coding Conventions

**Analysis Date:** 2026-06-03

## Naming Patterns

**Files:**
- Components & Pages: `PascalCase.tsx` (e.g. `ProblemNavigator.tsx`, `GrowthIntelligenceLab.tsx`)
- Styles: `index.css`
- Utilities & Loaders: `camelCase.ts` (e.g. `blogLoader.ts`, `utils.ts`)

**Functions:**
- camelCase for all function names (e.g. `slugify`, `parseCMSSection`, `fetchSanityPosts`)
- Event Handlers: `handleEventName` prefixing is standard

**Variables & Types:**
- camelCase for normal variables
- UPPER_SNAKE_CASE for constants or hardcoded configurations
- Interfaces & Type Aliases: `PascalCase` without `I` prefixes (e.g. `ExtendedBlogPostType`, `BlogSection`)

## Code Style

**Formatting:**
- Prettier formatting with 2-space indentation
- Semicolons required
- Single quotes for TS/JS module imports, double quotes for React JSX properties

**Linting:**
- TypeScript compile checks configured via `npm run lint` (`tsc --noEmit`)

## Import Organization

**Order:**
1. React hooks and libraries (e.g. `react`, `react-router-dom`)
2. Icons & Third-party animations (e.g. `lucide-react`, `framer-motion`, `gsap`)
3. Global shared components (e.g. `@/components/...`)
4. Data definitions and loaders (e.g. `./blogData`)
5. Styling rules

**Path Aliases:**
- `@/` maps to the project root directory `.` (configured in `tsconfig.json` and `vite.config.ts`)

## Error Handling

**Patterns:**
- Console warnings (`console.warn`) with graceful UI degradation when APIs fail
- Try/catch blocks surrounding third-party API fetches (specifically the Sanity client fetch calls)
- Fallback content triggers: returning local Markdown cache collections when network calls fail or throw exceptions

## Function & Module Design
- Use React Lazy Loading (`lazy`, `Suspense`) for page containers to enable route-level code splitting
- Named exports for UI component definitions, default exports for routed page views
- Explicit early returns for error validation checks and guard clauses

---

*Convention analysis: 2026-06-03*
*Update when patterns change*
