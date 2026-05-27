import { defineConfig } from "tinacms";

// Detect local vs. cloud mode
const branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "master";

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || "dummy", // Provided by Tina Cloud (tina.io)
  token: process.env.TINA_TOKEN || "dummy",       // Provided by Tina Cloud
  
  build: {
    publicFolder: "public",
    outputFolder: "admin", // Compiles the Tina editor dashboard to public/admin, replacing Decap CMS!
  },
  
  media: {
    tina: {
      mediaRoot: "images/blog",
      publicFolder: "public",
    },
  },
  
  schema: {
    collections: [
      {
        name: "blog",
        label: "Blog Posts",
        path: "content/blog",
        format: "mdx",
        defaultItem: () => {
          return {
            author: "Emmanuel Odebiyi",
            authorBio: "Emmanuel is a Content Strategist and AI Automation Expert dedicated to helping B2B SaaS companies scale their organic growth through data-driven storytelling and systematic workflows.",
            authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel",
            readTime: "5 min read",
            tags: ["Automation"],
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Publish Date",
            ui: {
              dateFormat: "MMMM DD, YYYY",
            },
          },
          {
            type: "string",
            name: "author",
            label: "Author",
          },
          {
            type: "string",
            name: "authorBio",
            label: "Author Bio",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "authorImage",
            label: "Author Image",
          },
          {
            type: "string",
            name: "readTime",
            label: "Read Time",
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            description: "A 1-2 sentence summary shown on blog listing cards",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "image",
            label: "Listing Image",
          },
          {
            type: "image",
            name: "heroImage",
            label: "Hero Image",
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "string",
            name: "hook",
            label: "Hook",
            description: "The opening hook / italic introduction paragraph",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "takeaways",
            label: "Takeaways",
            list: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body (Visual Gutenberg Blocks)",
            isBody: true,
            templates: [
              {
                name: "Example",
                label: "Example Playbook",
                fields: [
                  {
                    type: "string",
                    name: "text",
                    label: "Example Text",
                    ui: {
                      component: "textarea",
                    },
                  },
                ],
              },
              {
                name: "Highlight",
                label: "Highlight Box",
                fields: [
                  {
                    type: "string",
                    name: "text",
                    label: "Highlight Text",
                    ui: {
                      component: "textarea",
                    },
                  },
                ],
              },
              {
                name: "Simplification",
                label: "Simplification Card",
                fields: [
                  {
                    type: "string",
                    name: "label",
                    label: "Label (e.g., 'In plain terms')",
                  },
                  {
                    type: "string",
                    name: "text",
                    label: "Simplified Text",
                    ui: {
                      component: "textarea",
                    },
                  },
                ],
              },
              {
                name: "Quote",
                label: "Quote Card",
                fields: [
                  {
                    type: "string",
                    name: "text",
                    label: "Quote Text",
                    ui: {
                      component: "textarea",
                    },
                  },
                  {
                    type: "string",
                    name: "author",
                    label: "Author Name",
                  },
                ],
              },
              {
                name: "Table",
                label: "Table Block",
                fields: [
                  {
                    type: "string",
                    name: "headers",
                    label: "Headers",
                    list: true,
                  },
                  {
                    type: "string",
                    name: "rows",
                    label: "Rows (comma-separated values)",
                    list: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN || "",
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
});
