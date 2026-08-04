# Project Handover Documentation: Emmanuel Odebiyi Personal Brand & Strategy Platform

## 1. Project Overview
This project is a premium, SaaS-style personal brand homepage and strategy platform for **Emmanuel Odebiyi**, a Content Marketing Strategist. The application is designed with a focus on "Growth Intelligence," featuring interactive tools, scrollytelling elements, and a modern, high-performance user interface.

**Key Objectives:**
- Establish a high-authority digital presence.
- Provide interactive value through "Growth Intelligence" tools.
- Showcase portfolio, strategy, and thought leadership via a blog.
- Convert visitors into strategy call leads.

---

## 2. Technical Stack
The application is built using a modern frontend stack optimized for performance, developer experience, and smooth interactions.

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 6](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) (Utility-first CSS)
- **Animations:** [Motion](https://motion.dev/) (formerly Framer Motion) for layout and scroll animations.
- **Icons:** [Lucide React](https://lucide.dev/)
- **Data Visualization:** [Recharts](https://recharts.org/) (used in diagnostic tools).
- **Routing:** [React Router 7](https://reactrouter.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

---

## 3. Project Structure
```text
/
├── public/             # Static assets (favicons, etc.)
├── src/
│   ├── components/     # Reusable UI components (Header, Footer, Button, etc.)
│   ├── pages/          # Main page components
│   │   ├── tools/      # Interactive tools (Radar, Simulator, etc.)
│   │   └── ...         # Home, About, Blog, etc.
│   ├── services/       # API services (if applicable)
│   ├── App.tsx         # Root component & Routing configuration
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles & Tailwind imports
├── metadata.json       # App metadata (name, description)
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

---

## 4. Key Features & Pages

### Core Pages
- **Home (`/`):** High-impact hero section with horizontal storytelling and ASCII visual elements.
- **About (`/about`):** Detailed background and personal mission.
- **My Story (`/my-story`):** Narrative-driven background.
- **My Approach (`/my-approach`):** Strategic methodology breakdown.
- **Services (`/services`):** Service offerings and pricing/packages.
- **Portfolio (`/portfolio`):** Automation case studies and past client work. Accessible via "Portfolio → Automation Case Studies" dropdown in the header.
- **Writing & SEO Portfolio (`/writing-portfolio`):** Dedicated landing page targeting content writing and SEO job applications. Features: hero with stats, brand logo strip (StoryChief, Herbvity, Scoove Africa, Emergency Response Africa, TechFlow Solutions), featured article showcase, writing samples grid with editorial cover images, about/bio section, expertise pillars, skills & tools, results wall, client testimonials (Sarah Mitchell, Olaylide Bolaji-Daniel, Paul Olaniyi), 35+ article archive, and a "Send a Brief" CTA. Accessible via "Portfolio → Writing & SEO Portfolio" dropdown in the header.
- **Blog (`/blog`):** Content hub with filtering and search capabilities.

### Growth Intelligence Lab (`/growth-intelligence-lab`)
A collection of interactive tools designed to provide immediate value to potential clients:
- **Automation Radar™ (`/tools/automation-radar`):** A diagnostic tool that generates a radar chart of automation opportunities.
- **Autopilot Score:** Evaluates business efficiency.
- **ROI Time Machine:** Calculates potential returns on automation.
- **Growth Simulator:** Projects business growth based on various inputs.

---

## 5. Development & Maintenance

### Running Locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` in your browser.

### Adding a New Blog Post
Blog posts are currently managed as a static array in `src/pages/Blog.tsx`. To add a new post:
1. Open `src/pages/Blog.tsx`.
2. Add a new object to the `blogPosts` array.
3. Ensure the `id` is unique.
4. Images should be high-quality URLs (Unsplash is recommended).

### Updating Tools
The logic for tools like the **Automation Radar** is contained within their respective files in `src/pages/tools/`. 
- **Scoring Logic:** Located in the `useMemo` block within the component.
- **UI/UX:** Built using Tailwind and Motion for a "premium" feel.

---

## 6. Deployment
The application is configured for deployment on **Cloud Run** via the AI Studio Build environment.
- **Build Command:** `npm run build`
- **Output Directory:** `dist/`
- **Port:** 3000 (Hardcoded for the environment)

---

## 7. Future Roadmap Recommendations
- **CMS Integration:** Migrate the static blog array to a headless CMS (e.g., Contentful or Sanity) for easier content management.
- **Backend Integration:** Connect the "Unlock Report" forms in tools to an email marketing service (e.g., Mailchimp or ConvertKit) via a server-side function.
- **AI Personalization:** Utilize the `@google/genai` dependency to provide AI-generated insights within the Growth Simulator.

---

**Handover Date:** March 23, 2026
**Prepared by:** AI Build Assistant
