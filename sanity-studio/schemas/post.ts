import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Blog Article',
  type: 'document',
  groups: [
    { name: 'main', title: 'Article', default: true },
    { name: 'meta', title: 'Metadata' },
    { name: 'legacy', title: 'Legacy Sections', hidden: true },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Post Title',
      type: 'string',
      group: 'main',
      validation: Rule => Rule.required()
        .min(10).error('Title must be at least 10 characters.')
        .max(120).warning('Title is getting long — aim for under 120 characters.')
        .custom((title: string | undefined) => {
          if (!title) return true;
          // Flag trailing punctuation artefacts: )  .  "  '  ]  ;
          if (/[)"\]'.;]+$/.test(title.trim())) {
            return '⚠️ Title ends with stray punctuation — remove trailing characters like ) " \' . ] before publishing.';
          }
          // Flag unbalanced parentheses/brackets
          const open = (title.match(/\(/g) || []).length;
          const close = (title.match(/\)/g) || []).length;
          if (open !== close) {
            return '⚠️ Title has unbalanced parentheses — check for stray ( or ) characters.';
          }
          return true;
        }),
      description: 'The headline of your article (e.g. "How I Save 15 Hours Every Week With Content Automation").',
    }),
    defineField({
      name: 'slug',
      title: 'URL Path Slug',
      type: 'slug',
      group: 'main',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_]+/g, '-')
            .replace(/-{2,}/g, '-')
            .replace(/^-+|-+$/g, '')
            .slice(0, 96),
      },
      validation: Rule => Rule.required()
        .custom((slug: { current?: string } | undefined) => {
          if (!slug?.current) return true;
          const s = slug.current;
          if (/[A-Z]/.test(s)) {
            return '⚠️ Slug contains uppercase letters — click Generate to fix.';
          }
          if (/\s/.test(s)) {
            return '⚠️ Slug contains spaces — click Generate to create a proper URL slug.';
          }
          if (/[^a-z0-9-]/.test(s)) {
            return '⚠️ Slug contains special characters — only lowercase letters, numbers, and hyphens are allowed.';
          }
          if (s.length < 5) {
            return '⚠️ Slug is too short — click Generate to rebuild from the title.';
          }
          return true;
        }),
      description: 'The unique URL path name (e.g. "how-i-save-15-hours"). Click Generate to auto-build from title.',
    }),
    defineField({
      name: 'date',
      title: 'Publish Date',
      type: 'date',
      group: 'meta',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: Rule => Rule.required(),
      description: 'The date this article is marked as published.',
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      group: 'meta',
      initialValue: 'Emmanuel Odebiyi',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'authorImage',
      title: 'Author Avatar Image',
      type: 'image',
      group: 'meta',
      options: {
        hotspot: true,
      },
      description: 'Upload your avatar or use a hosted URL field. Defaults to your corporate avatar.',
    }),
    defineField({
      name: 'authorBio',
      title: 'Author Biography',
      type: 'text',
      group: 'meta',
      rows: 3,
      initialValue: 'Emmanuel is a Content Strategist and AI Automation Expert dedicated to helping B2B SaaS companies scale their organic growth through data-driven storytelling and systematic workflows.',
    }),
    defineField({
      name: 'readTime',
      title: 'Estimated Read Time',
      type: 'string',
      group: 'meta',
      initialValue: '5 min read',
      validation: Rule => Rule.required(),
      description: 'e.g. "6 min read" or "10 min read".',
    }),
    defineField({
      name: 'excerpt',
      title: 'Listing Excerpt Summary',
      type: 'text',
      group: 'main',
      rows: 2,
      validation: Rule => Rule.required()
        .min(20).error('Excerpt must be at least 20 characters — write a compelling summary.')
        .max(300).warning('Excerpt is getting long — keep it under 300 characters for card layouts.')
        .custom((text: string | undefined) => {
          if (!text) return true;
          if (/[)"\]'.;]+$/.test(text.trim())) {
            return '⚠️ Excerpt ends with stray punctuation — clean up trailing ) " \' . ] characters.';
          }
          return true;
        }),
      description: 'A 1-2 sentence compelling summary displayed on your blog listing grid cards.',
    }),
    defineField({
      name: 'image',
      title: 'Card Listing Image',
      type: 'image',
      group: 'main',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
      description: 'The cover image displayed on cards, social cards, and mobile screens.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Cinematic Hero Banner Image',
      type: 'image',
      group: 'main',
      options: {
        hotspot: true,
      },
      description: 'Optional. The high-resolution banner image displayed at the very top of the article. Defaults to card image.',
    }),
    defineField({
      name: 'tags',
      title: 'Topic Tags',
      type: 'array',
      group: 'meta',
      of: [{ type: 'string' }],
      initialValue: ['Automation'],
      description: 'Topic categories associated with this article (e.g. "Automation", "SEO", "Systems").',
    }),
    defineField({
      name: 'hook',
      title: 'Opening Hook Intro',
      type: 'text',
      group: 'main',
      rows: 3,
      description: 'The italicized hook / opening paragraph displayed right before the article body.',
    }),
    defineField({
      name: 'takeaways',
      title: 'Quick Core Takeaways',
      type: 'array',
      group: 'main',
      of: [{ type: 'string' }],
      description: 'A list of 3-4 bulleted highlights displayed in the prominent "Key Insights" banner at the end.',
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Meta Description',
      type: 'text',
      group: 'meta',
      rows: 2,
      description: 'Optional. A search-optimized description for Google & search engine results (Recommended: 120-160 characters). If left blank, listing excerpt will be used.',
      validation: Rule => Rule.max(160),
    }),

    // ── NEW: WordPress-style Visual Rich Text Editor ─────────────────────────
    defineField({
      name: 'content',
      title: '📝 Article Body (Visual Editor)',
      type: 'blockContent',
      group: 'main',
      description: 'Write your full article here. Ctrl+B bold · Ctrl+I italic · Ctrl+K link · Ctrl+\' code. ⚠️ Windows: Ctrl+Alt shortcuts are blocked — use Markdown instead: ## + space = H2 · ### + space = H3 · > + space = Quote · - + space = Bullet. Or use the Style dropdown. Click + to insert embeds.',
    }),

    // ── LEGACY: Old segmented sections (hidden, kept for backward compat) ───
    defineField({
      name: 'sections',
      title: 'Article Editorial Chapters (Legacy)',
      type: 'array',
      group: 'legacy',
      of: [{ type: 'blogSection' }],
      description: '⚠️ Legacy field — use the new visual "Article Body" editor above instead. This field is preserved for older articles.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'image',
    },
    prepare(selection) {
      const { title, author, media } = selection;
      return {
        title: title,
        subtitle: `by ${author}`,
        media: media,
      };
    },
  },
});
