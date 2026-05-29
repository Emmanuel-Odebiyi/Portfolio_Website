import { defineType, defineField } from 'sanity';

// ── 1. Example Playbook Block ────────────────────────────────────────────────
export const exampleBlock = defineType({
  name: 'exampleBlock',
  title: 'Example Playbook',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Playbook Text',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required(),
      description: 'The step-by-step example content displayed inside the blue code/console panel.',
    }),
  ],
});

// ── 2. Highlight Box Block ───────────────────────────────────────────────────
export const highlightBlock = defineType({
  name: 'highlightBlock',
  title: 'Highlight Box',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Highlight Text',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
      description: 'An important takeaway or callout displayed in a styled background frame.',
    }),
  ],
});

// ── 3. Plain Terms Simplification Block ──────────────────────────────────────
export const simplificationBlock = defineType({
  name: 'simplificationBlock',
  title: 'Simplification Card',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label Accent',
      type: 'string',
      initialValue: 'In Plain Terms',
      description: 'The small capsule label text (e.g. "In Plain Terms" or "The Bottom Line").',
    }),
    defineField({
      name: 'text',
      title: 'Simplified Text',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
      description: 'A simplified breakdown of a complex concept.',
    }),
  ],
});

// ── 4. Premium Quote Card Block ──────────────────────────────────────────────
export const quoteBlock = defineType({
  name: 'quoteBlock',
  title: 'Quote Card',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Quote Text',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
      description: 'The quote text that will be displayed in oversized font with accent marks.',
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      initialValue: 'Emmanuel Odebiyi',
      description: 'Name of the person who said this quote.',
    }),
  ],
});

// ── 5. Standard Table Block ──────────────────────────────────────────────────
export const tableBlock = defineType({
  name: 'tableBlock',
  title: 'Structured Table',
  type: 'object',
  fields: [
    defineField({
      name: 'headers',
      title: 'Table Headers',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of headers for the table columns (e.g. "Step", "Action", "Result").',
    }),
    defineField({
      name: 'rows',
      title: 'Table Rows',
      type: 'array',
      of: {
        type: 'object',
        name: 'tableRow',
        title: 'Row Cells',
        fields: [
          defineField({
            name: 'cells',
            title: 'Cells (Ordered)',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Provide cell values in column order.',
          })
        ]
      },
      description: 'The rows containing ordered column values.',
    }),
  ],
});
