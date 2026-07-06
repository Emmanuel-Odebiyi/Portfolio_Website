import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { table } from '@sanity/table';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'default',
  title: 'Emmanuel Growth Lab CMS',

  // Replace these placeholders with your actual Sanity Project ID and dataset
  // once you sign up for your free account at sanity.io/manage
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '96ilx2qv',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [structureTool(), table()],

  schema: {
    types: schemaTypes,
  },
});
