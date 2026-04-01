---
name: ux-guardian
description: Actively enforces UI/UX rules on every interface output, ensuring accessibility, responsiveness, and usability.
triggers:
  - ui
  - components
  - pages
  - layouts
  - frontend work
---

# UX Guardian Skill

This skill is mandatory for all frontend tasks and ensures every interface meets high standards for user experience and accessibility.

## Core Rules
### 1. Accessibility (WCAG)
- Ensure all text passes WCAG AA contrast ratios (min 4.5:1).
- Use semantic HTML tags (`<nav>`, `<main>`, `<article>`, etc.).
- All interactive elements must have clear focus states.
- Images must have descriptive `alt` text.

### 2. Responsiveness
- **Mobile-First**: Design and code for mobile devices first, then scale up.
- Touch Targets: Interactive elements (buttons, links) must be at least `44x44px`.
- Use flexible units (`rem`, `em`, `vh`, `vw`) and flexbox/grid.

### 3. Usability & States
- **States**: Mandatory inclusion of loading, error, and empty states.
- **Hierarchy**: Clear visual hierarchy with font weights, sizes, and spacing.
- **CTA Visibility**: Primary actions must be clearly distinguished and prominent.
- **Learnability**: Navigation should be intuitive enough to learn within 3 seconds.

## Review Checklist
- Does the interface work perfectly on mobile?
- Are all touch targets easy to hit?
- Is there a loading/error/empty state handled?
- Is the primary action visually obvious?
- Is the accessibility score (contrast, semantics) high?
