# 🚀 Emmanuel Odebiyi Portfolio — Sanity CMS Integration Guide

This directory contains the visual schema definitions for **Sanity Studio**, your new premium, WordPress-style headless CMS. 

It is completely decoupled from your Vite React SPA—meaning **zero background servers, zero port conflicts, and 100% stable local development.**

---

## 🛠️ Step 1: Create Your Free Sanity Project
Sanity's developer tier is completely free and provides massive limits (more than enough to power your portfolio forever at zero cost).

1. Go to **[sanity.io/manage](https://www.sanity.io/manage)** and sign in (using GitHub or Google).
2. Click **Create new project**.
3. Choose a name (e.g. `Emmanuel Portfolio Blog`).
4. Select the **Production** dataset (default).
5. Once created, copy your **Project ID** from the dashboard.

---

## ⚡ Step 2: Connect Your Vite SPA (Local & Production)

To tell your portfolio's blog loader where to fetch content, you need to expose your project ID.

### A. Local Development:
Create or edit your `.env` file in the root folder of your website and add:
```env
VITE_SANITY_PROJECT_ID=your_sanity_project_id_here
VITE_SANITY_DATASET=production
```
*(Your blog loader will automatically fetch posts from Sanity's global CDN at runtime. If you are offline, or if these keys are missing, the loader automatically falls back to your local files in `/content/blog/` so the site never breaks!)*

### B. Production (Cloudflare Pages):
1. Open your **Cloudflare Dashboard** and navigate to your Pages project.
2. Go to **Settings** ➔ **Environment Variables**.
3. Add `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET=production` as environment variables.
4. Save and trigger a redeploy.

---

## 🎨 Step 3: Deploy Your WordPress-Like Studio (Free Hosted Admin Panel)

You don't need to run the editor on your computer! Sanity hosts your administration dashboard for free on their global CDN.

1. Open your terminal in the `/sanity-studio` directory.
2. Install the Sanity CLI globally (or run via npx):
   ```bash
   npm install -g sanity
   ```
3. Run the login command to authenticate:
   ```bash
   sanity login
   ```
4. Update `sanity.config.ts` in the studio folder:
   Replace `'your-project-id'` on line 10 with your actual Sanity Project ID.
5. Deploy your studio directly to Sanity's free hosting:
   ```bash
   sanity deploy
   ```
6. You will be asked to choose a unique studio URL (e.g., `emmanuel-growth-lab.sanity.studio`).
7. Open that URL, sign in, and you will see your gorgeous, WordPress-like block editor! You can create, drag-and-drop sections, add comparison tables, pull quotes, and publish instantly.

---

## 🔄 Step 4: Configure Cloudflare Auto-Publishing Webhook

Whenever you edit or publish a post inside your studio, you want Cloudflare Pages to rebuild and publish it live instantly.

### A. Get Cloudflare Build Hook:
1. In the Cloudflare Pages dashboard under your project, go to **Settings** ➔ **Builds & Deployments**.
2. Scroll down to **Deploy Hooks**.
3. Click **Add deploy hook**.
4. Give it a name (e.g., `Sanity Publish Hook`) and select your branch (e.g., `master` or `main`).
5. Copy the unique URL generated (looks like `https://api.cloudflare.com/client/v4/pages/...`).

### B. Add Webhook to Sanity:
1. Go to **[sanity.io/manage](https://www.sanity.io/manage)** and select your project.
2. Go to the **API** tab ➔ **Webhooks**.
3. Click **Create webhook**.
4. Configure the webhook:
   * **Name:** `Cloudflare Deploy`
   * **URL:** Paste your Cloudflare Deploy Hook URL.
   * **Dataset:** `production`
   * **Trigger on:** `Create`, `Update`, `Delete` (Check "Publish" actions only if prompted, or leave default).
   * **Filter:** `_type == "post"`
5. Save the webhook!

**🎉 You are now fully live!** The moment you hit "Publish" in your gorgeous browser-based editor, Sanity tells Cloudflare to rebuild your Vite SPA. Your build-time fetch pulls the new articles, compiles everything into lightning-fast static assets, and deploys it worldwide in under 60 seconds!
