# Technology Stack

**Analysis Date:** 2026-06-03

## Languages

**Primary:**
- TypeScript 5.8 - Application code, React components, state/routing logic
- JSX/TSX - React component markup

**Secondary:**
- JavaScript - CLI build scripts, styling config

## Runtime

**Environment:**
- Node.js 22.x/24.x (Active LTS) - Local development, dev server, compilation
- Modern Browser Runtimes - Client-side execution

**Package Manager:**
- npm 11.x / lockfile: `package-lock.json` present

## Frameworks

**Core:**
- React 19.0.0 - Component-driven UI library
- React Router DOM 7.13.1 - Routing and nested layouts

**Testing:**
- None configured in package.json (no jest/vitest/playwright scripts)

**Build/Dev:**
- Vite 6.2.0 - Bundling, dev server, environment configuration
- @tailwindcss/vite 4.1.14 - Vite plugin for compiling Tailwind v4 CSS
- TypeScript compiler (tsc) ~5.8.2

## Key Dependencies

**Critical:**
- @google/genai 1.29.0 - Google Gemini AI integration SDK
- @react-three/fiber 9.5.0 / @react-three/drei 10.7.7 / three 0.183.2 - Interactive 3D graphics
- Framer Motion 12.38.0 / gsap 3.15.0 - Micro-animations, transitions, scrollytelling
- lucide-react 0.546.0 / @iconify/react 6.0.2 - SVG icons
- vite-plugin-pwa 1.2.0 - Progressive Web App service worker and manifest compiler
- next-themes 0.4.6 - Light/dark mode state management
- sanity 5.28.0 (under `sanity-studio/`) - Sanity CMS client and visual studio

**Infrastructure:**
- Express 4.21.2 - Optional HTTP server / fallback backend

## Configuration

**Environment:**
- `.env` / `.env.local` files loaded via Vite's `loadEnv`
- `GEMINI_API_KEY` - API key for Gemini SDK (injected at runtime)
- `APP_URL` - Main hosted service URL

**Build:**
- `tsconfig.json` - TypeScript compiler parameters
- `vite.config.ts` - Vite build configurations, PWA setup, and aliases
- `vercel.json` - Deployment routing, redirect configurations, clean URLs

## Platform Requirements

**Development:**
- Cross-platform (Windows / macOS / Linux with Node.js)
- No local database required (headless API integrations)

**Production:**
- Hosted as static frontend with dynamic API fallbacks (primarily on Vercel)
- Sanity CMS dataset hosted on sanity.io

---

*Stack analysis: 2026-06-03*
*Update after major dependency changes*
