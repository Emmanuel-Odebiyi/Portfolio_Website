import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'default',
  title: 'Emmanuel Growth Lab CMS',

  // Replace these placeholders with your actual Sanity Project ID and dataset
  // once you sign up for your free account at sanity.io/manage
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'ytfufk96',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
