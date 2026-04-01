# Emmanuel Odebiyi - Content Marketing Strategist Portfolio

A premium, SaaS-style personal brand portfolio designed to showcase high-level content marketing strategies. Built with an architecture emphasizing advanced scrollytelling, interactive 3D elements, a dynamic timeline, and deep visual hierarchy.

## 🚀 Quick Start

1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Run Locally:**
   ```bash
   npm run dev
   ```
3. **Build for Production:**
   ```bash
   npm run build
   ```

## 🛠 Tech Stack

- **React 19**
- **Vite 6** (Build Tool)
- **Tailwind CSS 4** (Styling)
- **Framer Motion** (Scroll-linked Scrollytelling & 3D Animations)
- **Lucide React** (Icons)
- **Recharts** (Data Visualization)

## 🏗 Architecture & Key Features

### 1. Advanced Scrollytelling Integration
- **Problem Section:** Features a dynamic, sticky left-aligned Vertical Navigator that mathematically maps scroll progression to individual problem nodes via `framer-motion`'s `useScroll`.
- **Solution Section:** Transforms from a standard vertical list into an immersive **Horizontal Accordion**. Active elements expand seamlessly, while inactive elements collapse beautifully with drastically adjusted lighting overlays and scaled typography elements.
- **Results Typography:** Utilizes smooth butter-like, sentence-based staggered reveals that perfectly synchronize with `scrollYProgress`.

### 2. High-Fidelity Interactive Vectors & 3D Effects
- Extrudes native flat scalable vectors (SVGs) utilizing native `framer-motion` properties to simulate deep 3D perspective (`rotateX`, `rotateY`, `rotateZ`), mapping multi-layer responsive drop-shadows across multiple viewports without needing a bloated WebGL backend.
- Intentionally clips vectors across UI surfaces (`overflow-hidden` constraints + absolute bleeds) to build a truly larger-than-life corporate visual identity.

## 🤝 Cross-Platform Handover Guidelines

To maintain visual and systemic consistency across different developers, teams, operations, and environments (VS Code, Cursor, WebStorm, CLI formats, etc.):

1. **Editor Configuration (`.editorconfig`):** Ensures everyone commits with `lf` line endings, 2-space indents, and trailing character cleanup seamlessly bypassing OS bottlenecks.
2. **Prettier Formatting (`.prettierrc`):** Standardizes formatting rules automatically on save (Single quotes, 100 character print width spacing rules, semi-colon requirements).
3. **Node Version Manager (`.nvmrc`):** Standardizes local module environments avoiding dependency conflicts. Run `nvm use` to synchronize your active Node daemon.

*(See `HANDOVER.md` for specific initial project constraints and design philosophy).*

## 🚀 Deployment

This project uses standard Vite building. Upon pulling to production environments or pushing via CI/CD pipelines:
```bash
npm run build 
npm run preview
```
Ensure you set deployment hooks matching standard static directories (`/dist`).
