import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'blogSection',
  title: 'Blog Section Segment',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'The title/heading of this section (e.g. "## 1. Map Out Your Target Keywords").',
    }),
    defineField({
      name: 'content',
      title: 'Section Body Content',
      type: 'text',
      rows: 6,
      description: 'The main paragraph text of this section. Supports clean markdown syntax for bold (**), italics (*), links, and inline code.',
    }),
    defineField({
      name: 'list',
      title: 'Bullet Points',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Optional list of bullet points to display underneath the section body.',
    }),
    
    // ── Optional visual component attachments ──────────────────────────────────
    defineField({
      name: 'example',
      title: 'Playbook Callout (Console)',
      type: 'text',
      rows: 3,
      description: 'Attach a blue code-console playbook example block to this section.',
    }),
    defineField({
      name: 'highlight',
      title: 'Highlight Callout',
      type: 'text',
      rows: 3,
      description: 'Attach a gold highlighted callout panel to this section.',
    }),
    defineField({
      name: 'simplification',
      title: 'Plain Terms Simplification Card',
      type: 'simplificationBlock',
      description: 'Attach an Ivory card translating complex strategies into plain terms.',
    }),
    defineField({
      name: 'quote',
      title: 'Pull Quote Card',
      type: 'quoteBlock',
      description: 'Attach a prominent pull-quote to this section.',
    }),
    defineField({
      name: 'table',
      title: 'Structured Comparison Table',
      type: 'tableBlock',
      description: 'Attach a data comparison grid to this section.',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'content',
    },
  },
});
