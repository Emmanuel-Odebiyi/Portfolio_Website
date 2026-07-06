/**
 * Blog Content Loader
 * 
 * Dynamically queries Sanity CMS's fast edge CDN at runtime if credentials are present,
 * and gracefully falls back to local pre-compiled Markdown files (.md/.mdx) if offline or
 * in local-only development mode.
 * 
 * Supports BOTH the new Portable Text (WordPress-style WYSIWYG) content format AND the
 * legacy segmented "sections" array format for full backward compatibility.
 * 
 * This gives you a premium, WordPress-like visual publishing experience while preserving
 * 100% of your Vite portfolio performance, GSAP animations, and 3D scenes.
 */

import { BlogPostType, BlogSection, FAQType, blogPosts as legacyPosts } from './blogData';
export type { FAQType };
import { fetchSanityQuery } from './sanityClient';

// ── Portable Text block types from the new WYSIWYG editor ─────────────────────
export interface PortableTextSpan {
  _type: 'span';
  _key?: string;
  text: string;
  marks?: string[];
}

export interface PortableTextMarkDef {
  _key: string;
  _type: string;
  href?: string;
  blank?: boolean;
}

export interface PortableTextBlock {
  _type: 'block';
  _key?: string;
  style?: string;  // 'normal' | 'h2' | 'h3' | 'h4' | 'blockquote'
  children?: PortableTextSpan[];
  markDefs?: PortableTextMarkDef[];
  listItem?: 'bullet' | 'number';
  level?: number;
}

export interface TerminalEmbedBlock {
  _type: 'terminalEmbed';
  _key?: string;
  code: string;
  language?: string;
}

export interface FlowchartEmbedBlock {
  _type: 'flowchartEmbed';
  _key?: string;
  code: string;
  title?: string;
}

export interface ExampleEmbedBlock {
  _type: 'exampleEmbed';
  _key?: string;
  text: string;
}

export interface HighlightEmbedBlock {
  _type: 'highlightEmbed';
  _key?: string;
  text: string;
}

export interface SimplificationEmbedBlock {
  _type: 'simplificationEmbed';
  _key?: string;
  label?: string;
  text: string;
}

export interface QuoteEmbedBlock {
  _type: 'quoteEmbed';
  _key?: string;
  text: string;
  author?: string;
}

export interface TableEmbedBlock {
  _type: 'tableEmbed';
  _key?: string;
  headers?: string[];
  rows?: { cells?: string[] }[] | string[][];
}

export interface ImageBlock {
  _type: 'image';
  _key?: string;
  asset?: { url?: string };
  alt?: string;
  caption?: string;
}

export type PortableTextNode =
  | PortableTextBlock
  | TerminalEmbedBlock
  | FlowchartEmbedBlock
  | ExampleEmbedBlock
  | HighlightEmbedBlock
  | SimplificationEmbedBlock
  | QuoteEmbedBlock
  | TableEmbedBlock
  | ImageBlock;

// ── Extended BlogPost type with optional Portable Text content ────────────────
export interface ExtendedBlogPostType extends BlogPostType {
  /** New Portable Text content from WYSIWYG editor (takes priority if present) */
  portableContent?: PortableTextNode[];
}

// ── Frontmatter shape coming out of the CMS YAML / Sanity API ─────────────────
interface CMSSection {
  heading: string;
  content: string;
  example?: string;
  highlight?: string;
  simplification?: { label?: string; text?: string } | null;
  list?: string[];
  quote?: { text?: string; author?: string } | null;
  table?: {
    headers?: string[];
    rows?: string[] | string[][];
  } | null;
}

interface CMSFrontmatter {
  title: string;
  date: string;
  author: string;
  authorBio: string;
  authorImage: string;
  readTime: string;
  excerpt: string;
  image: string;
  heroImage: string;
  tags: string[];
  hook: string;
  takeaways: string[];
  sections: CMSSection[];
  metaDescription?: string;
  faqs?: FAQType[];
}

// ── Parse a CMS section into the existing BlogSection interface ────────────────
function parseCMSSection(raw: CMSSection): BlogSection {
  if (!raw) {
    return { heading: '', content: '' };
  }
  const section: BlogSection = {
    heading: raw.heading || '',
    content: raw.content || '',
  };

  if (raw.example) section.example = raw.example;
  if (raw.highlight) section.highlight = raw.highlight;

  if (raw.simplification && raw.simplification.label && raw.simplification.text) {
    section.simplification = {
      label: raw.simplification.label,
      text: raw.simplification.text,
    };
  }

  if (raw.list && raw.list.length > 0) {
    section.list = raw.list;
  }

  if (raw.quote && raw.quote.text && raw.quote.author) {
    section.quote = {
      text: raw.quote.text,
      author: raw.quote.author,
    };
  }

  if (raw.table && raw.table.headers && raw.table.rows) {
    section.table = {
      headers: raw.table.headers,
      rows: raw.table.rows.map(row => {
        if (Array.isArray(row)) {
          return row.map(cell => String(cell).trim());
        }
        if (row && typeof row === 'object' && 'cells' in row && Array.isArray((row as any).cells)) {
          return (row as any).cells.map((cell: any) => String(cell).trim());
        }
        return String(row).split(',').map(cell => cell.trim());
      }),
    };
  }

  return section;
}

// ── Convert Portable Text blocks into legacy sections (for sidebar TOC) ───────
function portableTextToSections(blocks: PortableTextNode[]): BlogSection[] {
  const sections: BlogSection[] = [];
  let currentSection: BlogSection | null = null;
  let contentBuffer: string[] = [];

  const flushContent = () => {
    if (currentSection && contentBuffer.length > 0) {
      currentSection.content = contentBuffer.join('\n\n').trim();
      contentBuffer = [];
    }
  };

  for (const block of blocks) {
    if (block._type === 'block') {
      const textBlock = block as PortableTextBlock;
      const text = (textBlock.children || []).map(c => c.text).join('');

      if (textBlock.style === 'h2' || textBlock.style === 'h3') {
        // Flush the previous section
        flushContent();
        // Start a new section
        currentSection = { heading: text, content: '' };
        sections.push(currentSection);
      } else if (currentSection) {
        contentBuffer.push(text);
      } else {
        // Text before any heading — create an intro section
        currentSection = { heading: 'Introduction', content: '' };
        sections.push(currentSection);
        contentBuffer.push(text);
      }
    }
  }

  flushContent();
  return sections;
}

// ── Parse MDX inline components and build sections list for Local Files ───────
function parseAttributes(attrStr: string): Record<string, any> {
  const attrs: Record<string, any> = {};
  const strRegex = /(\w+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
  let match;
  while ((match = strRegex.exec(attrStr)) !== null) {
    attrs[match[1]] = match[2] || match[3];
  }
  const exprRegex = /(\w+)\s*=\s*\{([\s\S]*?)\}/g;
  while ((match = exprRegex.exec(attrStr)) !== null) {
    const key = match[1];
    const valStr = match[2].trim();
    try {
      if (valStr.startsWith('[') && valStr.endsWith(']')) {
        const jsonStr = valStr.replace(/'/g, '"');
        attrs[key] = JSON.parse(jsonStr);
      } else {
        attrs[key] = valStr;
      }
    } catch (e) {
      const strMatches = [...valStr.matchAll(/"([^"]*)"|'([^']*)'/g)].map(m => m[1] || m[2]);
      attrs[key] = strMatches;
    }
  }
  return attrs;
}

export function parseMarkdownBodyToSections(body: string): BlogSection[] {
  const sections: BlogSection[] = [];
  const lines = body.split('\n').map(line => line.replace(/\r$/, ''));
  let currentSection: BlogSection | null = null;
  let contentBuffer: string[] = [];
  let listBuffer: string[] = [];

  const flushBuffers = () => {
    if (currentSection) {
      if (contentBuffer.length > 0) {
        currentSection.content = contentBuffer.join('\n').trim();
        contentBuffer = [];
      }
      if (listBuffer.length > 0) {
        currentSection.list = [...listBuffer];
        listBuffer = [];
      }
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    const headingMatch = line.match(/^(?:#{1,6})\s+(.+)$/);
    if (headingMatch) {
      flushBuffers();
      currentSection = {
        heading: headingMatch[1].trim(),
        content: ""
      };
      sections.push(currentSection);
      continue;
    }

    if (!currentSection) {
      if (trimmed !== '' && !trimmed.startsWith('<')) {
        currentSection = {
          heading: "Introduction",
          content: ""
        };
        sections.push(currentSection);
      }
    }

    if (!currentSection) continue;

    const listMatch = line.match(/^(\s*)(?:-|\*)\s+(.+)$/);
    if (listMatch) {
      listBuffer.push(listMatch[2].trim());
      continue;
    }

    const tagMatch = trimmed.match(/^<([A-Z]\w+)\s+([\s\S]*?)\/\>$/);
    if (tagMatch) {
      const tagName = tagMatch[1];
      const attrStr = tagMatch[2];
      const attrs = parseAttributes(attrStr);

      if (tagName === 'Example' && attrs.text) {
        currentSection.example = attrs.text;
      } else if (tagName === 'Highlight' && attrs.text) {
        currentSection.highlight = attrs.text;
      } else if (tagName === 'Simplification' && attrs.text) {
        currentSection.simplification = {
          label: attrs.label || "Simplification",
          text: attrs.text
        };
      } else if (tagName === 'Quote' && attrs.text) {
        currentSection.quote = {
          text: attrs.text,
          author: attrs.author || "Unknown"
        };
      } else if (tagName === 'Table' && attrs.headers && attrs.rows) {
        currentSection.table = {
          headers: attrs.headers,
          rows: attrs.rows.map((row: string) => row.split(',').map((cell: string) => cell.trim()))
        };
      }
      continue;
    }

    if (trimmed !== '' || contentBuffer.length > 0) {
      contentBuffer.push(line);
    }
  }

  flushBuffers();
  return sections;
}

// Helper to format ISO or raw date strings into "Month Day, Year"
function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    });
  } catch {
    return dateStr;
  }
}

function parseCMSPost(frontmatter: CMSFrontmatter, body: string, slug: string): ExtendedBlogPostType {
  let parsedSections: BlogSection[] = [];
  if (frontmatter.sections && frontmatter.sections.length > 0) {
    parsedSections = frontmatter.sections.map(parseCMSSection);
  } else {
    parsedSections = parseMarkdownBodyToSections(body);
  }

  return {
    id: slug,
    title: frontmatter.title,
    author: frontmatter.author,
    authorImage: frontmatter.authorImage,
    authorBio: frontmatter.authorBio,
    date: formatDate(frontmatter.date),
    readTime: frontmatter.readTime,
    excerpt: frontmatter.excerpt,
    image: frontmatter.image,
    heroImage: frontmatter.heroImage,
    tags: frontmatter.tags || [],
    hook: frontmatter.hook,
    sections: parsedSections,
    takeaways: frontmatter.takeaways || [],
    metaDescription: frontmatter.metaDescription,
    faqs: frontmatter.faqs || [],
  };
}

// ── Frontmatter Parser for Local Markdown Files ───────────────────────────────
export function parseFrontmatter(raw: string): { frontmatter: Record<string, unknown>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { frontmatter: {}, body: raw };

  const yamlStr = match[1];
  const body = raw.slice(match[0].length).trim();
  const frontmatter = parseSimpleYAML(yamlStr);

  return { frontmatter, body };
}

function getIndent(line: string): number {
  const match = line.match(/^(\s*)/);
  return match ? match[1].length : 0;
}

function parseBlock(lines: string[], startIndex: number, baseIndent: number): { value: any; nextIndex: number } {
  const values: string[] = [];
  let i = startIndex;

  while (i < lines.length) {
    const line = lines[i];
    const indent = getIndent(line);
    
    if (line.trim() === '') {
      i++;
      continue;
    }
    
    if (indent < baseIndent) {
      break;
    }

    const trimmed = line.trim();
    if (trimmed.startsWith('- ')) {
      let val = trimmed.slice(2).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      values.push(val);
    } else {
      values.push(trimmed);
    }
    i++;
  }

  return { value: values, nextIndex: i };
}

function parseSimpleYAML(yaml: string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const lines = yaml.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trimEnd();
    if (trimmed.trim() === '' || trimmed.trim().startsWith('#')) {
      i++;
      continue;
    }

    const kvMatch = trimmed.match(/^(\w[\w\s]*\w|\w+):\s*(.+)$/);
    if (kvMatch) {
      const key = kvMatch[1].trim();
      let value: string = kvMatch[2].trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      result[key] = value;
      i++;
      continue;
    }

    const blockKeyMatch = trimmed.match(/^(\w[\w\s]*\w|\w+):$/);
    if (blockKeyMatch) {
      const key = blockKeyMatch[1].trim();
      i++;
      const { value, nextIndex } = parseBlock(lines, i, getIndent(lines[i] || ''));
      result[key] = value;
      i = nextIndex;
      continue;
    }
    i++;
  }
  return result;
}

// Eager glob import of local markdown content as the baseline fallback
const markdownModules = import.meta.glob('../content/blog/*.{md,mdx}', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function loadLocalCMSPosts(): ExtendedBlogPostType[] {
  const posts: ExtendedBlogPostType[] = [];
  for (const [path, rawContent] of Object.entries(markdownModules)) {
    try {
      const slug = path.split('/').pop()?.replace(/\.mdx?$/, '') || '';
      const { frontmatter, body } = parseFrontmatter(rawContent);
      const cmsFM = frontmatter as unknown as CMSFrontmatter;

      if (!cmsFM.title || !cmsFM.date) continue;
      posts.push(parseCMSPost(cmsFM, body, slug));
    } catch (err) {
      console.warn(`[BlogLoader] Failed to parse local post ${path}:`, err);
    }
  }
  return posts;
}

// ── Slug & Title Sanitizers ─────────────────────────────────────────────────
/**
 * Converts any string into a valid URL slug.
 * Handles broken Sanity slugs that contain spaces, capital letters, or
 * trailing punctuation artefacts (e.g. "Week With Content Automation").
 */
export function slugify(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')   // strip non-word chars except spaces & hyphens
    .replace(/[\s_]+/g, '-')    // spaces / underscores → hyphens
    .replace(/-{2,}/g, '-')     // collapse multiple hyphens
    .replace(/^-+|-+$/g, '');   // trim leading/trailing hyphens
}

/**
 * Strips common Sanity placeholder artefacts from titles.
 * e.g. 'How I Save 15 Hours Every Week With Content Automation").'
 *   → 'How I Save 15 Hours Every Week With Content Automation'
 */
export function sanitizeTitle(raw: string): string {
  return raw
    .replace(/["')\].]+$/, '')  // strip trailing quote / bracket / dot chars
    .trim();
}

// ── Sanity CDN Fetch Layer ───────────────────────────────────────────────────
async function fetchSanityPosts(): Promise<ExtendedBlogPostType[]> {
  try {
    // Query supports BOTH new Portable Text content AND legacy sections
    const query = `*[_type == "post"] | order(date desc) {
      "id": slug.current,
      title,
      author,
      authorBio,
      readTime,
      excerpt,
      "image": image.asset->url,
      "heroImage": heroImage.asset->url,
      "authorImage": authorImage.asset->url,
      tags,
      hook,
      takeaways,
      date,
      metaDescription,
      faqs,
      // New Portable Text content (WYSIWYG editor)
      content[] {
        ...,
        _type == "image" => {
          ...,
          "asset": asset->{url}
        },
        _type == "tableEmbed" => {
          ...,
          "rows": rows[] { cells }
        }
      },
      // Legacy sections (backward compatibility)
      sections[] {
        heading,
        content,
        example,
        highlight,
        simplification {
          label,
          text
        },
        list,
        quote {
          text,
          author
        },
        table {
          headers,
          "rows": rows[].cells
        }
      }
    }`;

    const result = await fetchSanityQuery<any[]>(query);

    if (result && Array.isArray(result)) {
      return result.map((post: any) => {
        const hasPortableContent = post.content && Array.isArray(post.content) && post.content.length > 0;
        const hasLegacySections = post.sections && Array.isArray(post.sections) && post.sections.length > 0;

        // Build legacy sections from Portable Text if only new content exists (for TOC sidebar)
        let sections: BlogSection[] = [];
        if (hasLegacySections) {
          sections = (post.sections || []).map((sec: any) => parseCMSSection(sec));
        } else if (hasPortableContent) {
          sections = portableTextToSections(post.content);
        }

        // ── Sanitize slug: use the CMS slug if it's already a valid kebab-case
        // slug, otherwise derive one from the title so the article always has a
        // routable URL regardless of how the editor filled in the Slug field.
        const rawSlug: string = post.id || '';
        const cleanTitle = sanitizeTitle(post.title || 'Untitled Post');
        const isValidSlug = /^[a-z0-9]+(-[a-z0-9]+)*$/.test(rawSlug);
        const id = isValidSlug ? rawSlug : slugify(cleanTitle);

        return {
          id,
          title: cleanTitle,
          author: post.author || 'Emmanuel Odebiyi',
          authorImage: post.authorImage || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel',
          authorBio: post.authorBio || '',
          date: formatDate(post.date) || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          readTime: post.readTime || '5 min read',
          excerpt: post.excerpt || '',
          image: post.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
          heroImage: post.heroImage || post.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
          tags: post.tags || [],
          hook: post.hook || '',
          takeaways: post.takeaways || [],
          sections,
          metaDescription: post.metaDescription,
          faqs: post.faqs || [],
          // Attach the raw Portable Text blocks for the new renderer
          portableContent: hasPortableContent ? post.content : undefined,
        } as ExtendedBlogPostType;
      });
    }
    
    return loadLocalCMSPosts();
  } catch (err) {
    console.warn('[BlogLoader] Sanity CDN fetch failed, falling back to local files:', err);
    return loadLocalCMSPosts();
  }
}

// ── Top-Level Await Execution ────────────────────────────────────────────────
const cmsPosts = await fetchSanityPosts();

const legacyTitles = new Set(cmsPosts.map(p => p.title.toLowerCase()));
const uniqueLegacyPosts = legacyPosts.filter(p => !legacyTitles.has(p.title.toLowerCase()));

// Deduplicate legacy posts and modern CMS posts
const finalPostsList: ExtendedBlogPostType[] = [...cmsPosts, ...uniqueLegacyPosts];

// Sort final array by date (newest first)
finalPostsList.sort((a, b) => {
  const dateA = new Date(a.date).getTime();
  const dateB = new Date(b.date).getTime();
  if (isNaN(dateA) || isNaN(dateB)) return 0;
  return dateB - dateA;
});

/** All blog posts — Cloud Sanity CMS + Local Markdown fallback + Legacy hardcoded */
export const allBlogPosts: ExtendedBlogPostType[] = finalPostsList;
