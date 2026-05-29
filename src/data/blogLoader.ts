/**
 * Blog Content Loader
 * 
 * Dynamically queries Sanity CMS's fast edge CDN at runtime if credentials are present,
 * and gracefully falls back to local pre-compiled Markdown files (.md/.mdx) if offline or
 * in local-only development mode.
 * 
 * This gives you a premium, WordPress-like visual publishing experience while preserving
 * 100% of your Vite portfolio performance, GSAP animations, and 3D scenes.
 */

import { BlogPostType, BlogSection, blogPosts as legacyPosts } from './blogData';

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
}

// ── Parse a CMS section into the existing BlogSection interface ────────────────
function parseCMSSection(raw: CMSSection): BlogSection {
  const section: BlogSection = {
    heading: raw.heading,
    content: raw.content,
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
        return String(row).split(',').map(cell => cell.trim());
      }),
    };
  }

  return section;
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

function parseMarkdownBodyToSections(body: string): BlogSection[] {
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

    const tagMatch = trimmed.match(/^<([A-Z]\w+)\s+([\s\S]*?)\/>$/);
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

function parseCMSPost(frontmatter: CMSFrontmatter, body: string, slug: string): BlogPostType {
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
    date: frontmatter.date,
    readTime: frontmatter.readTime,
    excerpt: frontmatter.excerpt,
    image: frontmatter.image,
    heroImage: frontmatter.heroImage,
    tags: frontmatter.tags || [],
    hook: frontmatter.hook,
    sections: parsedSections,
    takeaways: frontmatter.takeaways || [],
  };
}

// ── Frontmatter Parser for Local Markdown Files ───────────────────────────────
function parseFrontmatter(raw: string): { frontmatter: Record<string, unknown>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { frontmatter: {}, body: raw };

  const yamlStr = match[1];
  const body = raw.slice(match[0].length).trim();
  const frontmatter = parseSimpleYAML(yamlStr);

  return { frontmatter, body };
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
const markdownModules = import.meta.glob('/content/blog/*.{md,mdx}', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function loadLocalCMSPosts(): BlogPostType[] {
  const posts: BlogPostType[] = [];
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

// ── Sanity CDN Fetch Layer ───────────────────────────────────────────────────
async function fetchSanityPosts(): Promise<BlogPostType[]> {
  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
  const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

  if (!projectId) {
    return loadLocalCMSPosts();
  }

  try {
    const query = `*[_type == "post"] | order(date desc) {
      "id": slug.current,
      title,
      author,
      authorBio,
      authorImage,
      readTime,
      excerpt,
      "image": image.asset->url,
      "heroImage": heroImage.asset->url,
      tags,
      hook,
      takeaways,
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
          "rows": rows[]
        }
      }
    }`;

    const url = `https://${projectId}.apicdn.sanity.io/v2021-10-21/data/query/${dataset}?query=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    const result = await response.json();

    if (result.result && Array.isArray(result.result)) {
      return result.result.map((post: any) => ({
        id: post.id,
        title: post.title || 'Untitled Post',
        author: post.author || 'Emmanuel Odebiyi',
        authorImage: post.authorImage || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel',
        authorBio: post.authorBio || '',
        date: post.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        readTime: post.readTime || '5 min read',
        excerpt: post.excerpt || '',
        image: post.image || '/images/blog/placeholder.jpg',
        heroImage: post.heroImage || post.image || '/images/blog/placeholder.jpg',
        tags: post.tags || [],
        hook: post.hook || '',
        takeaways: post.takeaways || [],
        sections: (post.sections || []).map((sec: any) => parseCMSSection(sec)),
      }));
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
const finalPostsList = [...cmsPosts, ...uniqueLegacyPosts];

// Sort final array by date (newest first)
finalPostsList.sort((a, b) => {
  const dateA = new Date(a.date).getTime();
  const dateB = new Date(b.date).getTime();
  if (isNaN(dateA) || isNaN(dateB)) return 0;
  return dateB - dateA;
});

/** All blog posts — Cloud Sanity CMS + Local Markdown fallback + Legacy hardcoded */
export const allBlogPosts: BlogPostType[] = finalPostsList;
