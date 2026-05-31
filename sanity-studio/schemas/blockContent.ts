import { defineType, defineArrayMember } from 'sanity';

/**
 * Block Content — WordPress-style Visual Rich Text Editor
 * 
 * This schema defines a single, unified rich text canvas that replaces the old
 * segmented "sections" array. Authors write their entire article in one visual
 * stream with full WYSIWYG formatting:
 * 
 *   • Ctrl+B  → Bold
 *   • Ctrl+I  → Italic
 *   • Ctrl+U  → Underline
 *   • Ctrl+K  → Insert Link
 *   • "/"     → Insert custom embed block (Terminal, Flowchart, Quote, etc.)
 * 
 * Custom visual embeds (terminal consoles, flowcharts, callout cards, tables)
 * are inserted as block-level objects between paragraphs — only when needed,
 * not forced on every section.
 */
export default defineType({
  name: 'blockContent',
  title: 'Rich Article Content',
  type: 'array',
  of: [
    // ── Standard Rich Text Block ─────────────────────────────────────────────
    defineArrayMember({
      type: 'block',
      title: 'Text',
      // Heading styles available in the toolbar dropdown
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Heading 4', value: 'h4' },
        { title: 'Block Quote', value: 'blockquote' },
      ],
      // List types
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      // Inline text decorators — these respond to keyboard shortcuts
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },         // Ctrl+B
          { title: 'Italic', value: 'em' },            // Ctrl+I
          { title: 'Underline', value: 'underline' },  // Ctrl+U
          { title: 'Code', value: 'code' },
          { title: 'Strike', value: 'strike-through' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',                              // Ctrl+K
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (Rule: any) => Rule.uri({
                  allowRelative: true,
                  scheme: ['http', 'https', 'mailto', 'tel'],
                }),
              },
              {
                name: 'blank',
                type: 'boolean',
                title: 'Open in new tab?',
                initialValue: true,
              },
            ],
          },
        ],
      },
    }),

    // ── Inline Image Block ───────────────────────────────────────────────────
    defineArrayMember({
      type: 'image',
      title: 'Image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Important for SEO and accessibility.',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional caption displayed below the image.',
        },
      ],
    }),

    // ── Custom Embed: Terminal / Code Console ────────────────────────────────
    defineArrayMember({
      type: 'object',
      name: 'terminalEmbed',
      title: '💻 Code Console',
      fields: [
        {
          name: 'code',
          type: 'text',
          title: 'Code',
          rows: 8,
          description: 'Paste your code snippet here.',
        },
        {
          name: 'language',
          type: 'string',
          title: 'Language',
          initialValue: 'bash',
          options: {
            list: [
              'bash', 'javascript', 'typescript', 'python', 'json',
              'html', 'css', 'yaml', 'sql', 'graphql', 'markdown',
            ],
          },
        },
      ],
      preview: {
        select: { code: 'code', language: 'language' },
        prepare({ code, language }: { code?: string; language?: string }) {
          return {
            title: `Code: ${language || 'snippet'}`,
            subtitle: code ? code.substring(0, 60) + '…' : 'Empty code block',
          };
        },
      },
    }),

    // ── Custom Embed: Workflow Flowchart ─────────────────────────────────────
    defineArrayMember({
      type: 'object',
      name: 'flowchartEmbed',
      title: '🔀 Workflow Diagram',
      fields: [
        {
          name: 'code',
          type: 'text',
          title: 'Flowchart Definition',
          rows: 10,
          description: 'Define nodes and connections using arrow syntax, e.g.: nodeA("Step One") --> nodeB("Step Two")',
        },
        {
          name: 'title',
          type: 'string',
          title: 'Diagram Title',
          initialValue: 'System Workflow Diagram',
        },
      ],
      preview: {
        select: { title: 'title' },
        prepare({ title }: { title?: string }) {
          return { title: `Flowchart: ${title || 'Untitled'}` };
        },
      },
    }),

    // ── Custom Embed: Example Playbook ──────────────────────────────────────
    defineArrayMember({
      type: 'object',
      name: 'exampleEmbed',
      title: '💡 Example Playbook',
      fields: [
        {
          name: 'text',
          type: 'text',
          title: 'Playbook Text',
          rows: 4,
          description: 'Step-by-step example displayed in a styled callout panel.',
        },
      ],
      preview: {
        select: { text: 'text' },
        prepare({ text }: { text?: string }) {
          return {
            title: 'Example Playbook',
            subtitle: text ? text.substring(0, 60) + '…' : '',
          };
        },
      },
    }),

    // ── Custom Embed: Highlight Callout ──────────────────────────────────────
    defineArrayMember({
      type: 'object',
      name: 'highlightEmbed',
      title: '✨ Highlight Callout',
      fields: [
        {
          name: 'text',
          type: 'text',
          title: 'Highlight Text',
          rows: 3,
          description: 'An important takeaway displayed in a prominent callout panel.',
        },
      ],
      preview: {
        select: { text: 'text' },
        prepare({ text }: { text?: string }) {
          return {
            title: 'Highlight',
            subtitle: text ? text.substring(0, 60) + '…' : '',
          };
        },
      },
    }),

    // ── Custom Embed: Plain Terms Simplification ────────────────────────────
    defineArrayMember({
      type: 'object',
      name: 'simplificationEmbed',
      title: '🧩 Plain Terms Card',
      fields: [
        {
          name: 'label',
          type: 'string',
          title: 'Label',
          initialValue: 'In Plain Terms',
        },
        {
          name: 'text',
          type: 'text',
          title: 'Simplified Text',
          rows: 3,
          description: 'A simplified breakdown of a complex concept.',
        },
      ],
      preview: {
        select: { label: 'label', text: 'text' },
        prepare({ label, text }: { label?: string; text?: string }) {
          return {
            title: label || 'Simplification',
            subtitle: text ? text.substring(0, 60) + '…' : '',
          };
        },
      },
    }),

    // ── Custom Embed: Pull Quote ────────────────────────────────────────────
    defineArrayMember({
      type: 'object',
      name: 'quoteEmbed',
      title: '💬 Pull Quote',
      fields: [
        {
          name: 'text',
          type: 'text',
          title: 'Quote Text',
          rows: 3,
        },
        {
          name: 'author',
          type: 'string',
          title: 'Author',
          initialValue: 'Emmanuel Odebiyi',
        },
      ],
      preview: {
        select: { text: 'text', author: 'author' },
        prepare({ text, author }: { text?: string; author?: string }) {
          return {
            title: `Quote — ${author || 'Unknown'}`,
            subtitle: text ? `"${text.substring(0, 50)}…"` : '',
          };
        },
      },
    }),

    // ── Custom Embed: Structured Table ──────────────────────────────────────
    defineArrayMember({
      type: 'object',
      name: 'tableEmbed',
      title: '📊 Comparison Table',
      fields: [
        {
          name: 'headers',
          type: 'array',
          title: 'Column Headers',
          of: [{ type: 'string' }],
          description: 'Column header names (e.g. "Tool", "Price", "Features").',
        },
        {
          name: 'rows',
          type: 'array',
          title: 'Table Rows',
          of: [
            {
              type: 'object',
              name: 'tableRow',
              title: 'Row',
              fields: [
                {
                  name: 'cells',
                  type: 'array',
                  title: 'Cells',
                  of: [{ type: 'string' }],
                  description: 'Cell values in column order.',
                },
              ],
              preview: {
                select: { cells: 'cells' },
                prepare({ cells }: { cells?: string[] }) {
                  return {
                    title: cells ? cells.join(' | ') : 'Empty row',
                  };
                },
              },
            },
          ],
        },
      ],
      preview: {
        select: { headers: 'headers' },
        prepare({ headers }: { headers?: string[] }) {
          return {
            title: 'Table',
            subtitle: headers ? headers.join(' · ') : 'No headers',
          };
        },
      },
    }),
  ],
});
