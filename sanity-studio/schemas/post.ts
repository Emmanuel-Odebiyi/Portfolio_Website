import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Blog Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Post Title',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'The headline of your article (e.g. "How I Save 15 Hours Every Week With Content Automation").',
    }),
    defineField({
      name: 'slug',
      title: 'URL Path Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
      description: 'The unique URL path name (e.g. "how-i-save-15-hours"). Click Generate to auto-build from title.',
    }),
    defineField({
      name: 'date',
      title: 'Publish Date',
      type: 'date',
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
      initialValue: 'Emmanuel Odebiyi',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'authorImage',
      title: 'Author Avatar Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Upload your avatar or use a hosted URL field. Defaults to your corporate avatar.',
    }),
    defineField({
      name: 'authorBio',
      title: 'Author Biography',
      type: 'text',
      rows: 3,
      initialValue: 'Emmanuel is a Content Strategist and AI Automation Expert dedicated to helping B2B SaaS companies scale their organic growth through data-driven storytelling and systematic workflows.',
    }),
    defineField({
      name: 'readTime',
      title: 'Estimated Read Time',
      type: 'string',
      initialValue: '5 min read',
      validation: Rule => Rule.required(),
      description: 'e.g. "6 min read" or "10 min read".',
    }),
    defineField({
      name: 'excerpt',
      title: 'Listing Excerpt Summary',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.required(),
      description: 'A 1-2 sentence compelling summary displayed on your blog listing grid cards.',
    }),
    defineField({
      name: 'image',
      title: 'Card Listing Image',
      type: 'image',
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
      options: {
        hotspot: true,
      },
      description: 'Optional. The high-resolution banner image displayed at the very top of the article. Defaults to card image.',
    }),
    defineField({
      name: 'tags',
      title: 'Topic Tags',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['Automation'],
      description: 'Topic categories associated with this article (e.g. "Automation", "SEO", "Systems").',
    }),
    defineField({
      name: 'hook',
      title: 'Opening Hook Intro',
      type: 'text',
      rows: 3,
      description: 'The italicized hook / opening paragraph displayed right before the table of contents.',
    }),
    defineField({
      name: 'takeaways',
      title: 'Quick Core Takeaways',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'A list of 3-4 bulleted highlights displayed in the prominent golden "Core Takeaways" banner.',
    }),
    defineField({
      name: 'sections',
      title: 'Article Editorial Chapters',
      type: 'array',
      of: [{ type: 'blogSection' }],
      description: 'Build your article structure! Add, reorder, and visually style sections with custom Gutenberg block attachments.',
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
