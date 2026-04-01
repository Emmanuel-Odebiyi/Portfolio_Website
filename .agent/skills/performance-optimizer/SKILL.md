---
name: performance-optimizer
description: Enforces lightweight output, CSS-first animations, lazy loading, and no unnecessary JS libraries.
triggers:
  - code generation
  - component generation
  - feature implementation
---

# Performance Optimizer Skill

This skill ensures all generated code is optimized for performance and follows best practices for a fast, responsive user experience.

## Performance Core Rules
### 1. CSS-First Approach
- **Animations**: Use CSS animations and transitions instead of JS-based solutions where possible.
- **Critical CSS**: Inline critical CSS for above-the-fold content to improve initial load time.
- Avoid bulky CSS frameworks; prefer vanilla CSS or lightweight utilities.

### 2. Assets & Media
- **Icons**: Use SVG icons (prefixed as `inline` or `sprite`) instead of icon fonts.
- **Images**: Mandatory `loading="lazy"` for off-screen images. Use modern formats (WebP/AVIF).
- **Fonts**: Preconnect to font domains, use `font-display: swap`.

### 3. Dependencies & JS
- **No Bloat**: Zero-tolerance policy for unnecessary JS libraries (e.g., don't use Lodash for a single function).
- **Code Splitting**: Break down large components and pages into smaller, async-loaded chunks.
- **Bundle Size**: Monitor and minimize the final JS footprint.

## Review Checklist
- Are animations CSS-only?
- Are images lazy-loaded?
- Is there any unnecessary library being imported?
- Are SVGs used instead of icon fonts?
- Is critical CSS inlined or minimized?
