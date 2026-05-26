/**
 * Blog Content Loader
 * 
 * Bridges Decap CMS Markdown content with the existing blogData interface.
 * 
 * At build time, Vite's import.meta.glob eagerly loads every .md file from
 * /content/blog/. We parse the YAML frontmatter and merge it with the
 * hardcoded legacy posts from blogData.ts, producing a single unified array
 * that Blog.tsx and BlogPost.tsx already know how to render.
 * 
 * New CMS-authored posts get a slug-based ID derived from the filename, so
 * routes like /blog/my-new-article work out of the box.
 */

import { BlogPostType, BlogSection, blogPosts as legacyPosts } from './blogData';

// ── Frontmatter shape coming out of the CMS YAML ──────────────────────────────
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
    rows?: string[];  // Decap stores each row as a comma-separated string
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
      // Decap CMS stores rows as comma-separated strings; split them into arrays
      rows: raw.table.rows.map(row => row.split(',').map(cell => cell.trim())),
    };
  }

  return section;
}

// ── Parse MDX inline components and build sections list (Approach 2) ──────────
function parseAttributes(attrStr: string): Record<string, any> {
  const attrs: Record<string, any> = {};
  
  // Match string attributes: key="value" or key='value'
  const strRegex = /(\w+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
  let match;
  while ((match = strRegex.exec(attrStr)) !== null) {
    attrs[match[1]] = match[2] || match[3];
  }
  
  // Match array/expression attributes: key={["a", "b"]}
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
  const lines = body.split('\n');
  
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
    
    // Check if it is a heading (## Heading or ### Heading or # Heading)
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
    
    // If we haven't encountered a heading yet, start a default intro section
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
    
    // Check if it is a list item: - Item or * Item
    const listMatch = line.match(/^(\s*)(?:-|\*)\s+(.+)$/);
    if (listMatch) {
      listBuffer.push(listMatch[2].trim());
      continue;
    }
    
    // Check if it's a custom MDX tag
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
    
    // Otherwise it's a standard text line
    if (trimmed !== '' || contentBuffer.length > 0) {
      contentBuffer.push(line);
    }
  }
  
  flushBuffers();
  return sections;
}

// ── Parse a single frontmatter object into BlogPostType ───────────────────────
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

// ── Vite glob import: eagerly load all .md frontmatter at build time ──────────
// This uses Vite's built-in glob import with the `eager` flag.
// Each module exposes a `frontmatter` property via the ?raw is not needed —
// we parse YAML frontmatter ourselves since Vite doesn't do that natively.
//
// We use a simple frontmatter parser below instead of adding a dependency.

function parseFrontmatter(raw: string): { frontmatter: Record<string, unknown>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { frontmatter: {}, body: raw };

  const yamlStr = match[1];
  const body = raw.slice(match[0].length).trim();

  // Simple YAML parser for flat + nested structures
  // Handles: strings, lists (with - prefix), and nested objects
  const frontmatter = parseSimpleYAML(yamlStr);

  return { frontmatter, body };
}

/**
 * A lightweight YAML parser that handles the specific structures used
 * in our blog frontmatter. Not a general-purpose YAML parser.
 */
function parseSimpleYAML(yaml: string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const lines = yaml.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trimEnd();

    // Skip empty lines
    if (trimmed.trim() === '' || trimmed.trim().startsWith('#')) {
      i++;
      continue;
    }

    // Top-level key-value: key: value or key: "value"
    const kvMatch = trimmed.match(/^(\w[\w\s]*\w|\w+):\s*(.+)$/);
    if (kvMatch) {
      const key = kvMatch[1].trim();
      let value: string = kvMatch[2].trim();
      // Remove surrounding quotes
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      result[key] = value;
      i++;
      continue;
    }

    // Key followed by block (list or nested object): key:
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

function getIndent(line: string): number {
  const match = line.match(/^(\s*)/);
  return match ? match[1].length : 0;
}

function parseBlock(lines: string[], startIndex: number, baseIndent: number): { value: unknown; nextIndex: number } {
  if (startIndex >= lines.length) return { value: null, nextIndex: startIndex };

  const firstLine = lines[startIndex];
  const firstTrimmed = firstLine.trimStart();

  // It's a list (starts with -)
  if (firstTrimmed.startsWith('- ')) {
    return parseList(lines, startIndex, baseIndent);
  }

  // It's a nested object
  return parseNestedObject(lines, startIndex, baseIndent);
}

function parseList(lines: string[], startIndex: number, baseIndent: number): { value: unknown[]; nextIndex: number } {
  const result: unknown[] = [];
  let i = startIndex;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trimEnd();

    if (trimmed.trim() === '') { i++; continue; }

    const currentIndent = getIndent(line);
    if (currentIndent < baseIndent) break;

    const listMatch = trimmed.trimStart().match(/^-\s+(.*)$/);
    if (listMatch && currentIndent === baseIndent) {
      const itemContent = listMatch[1].trim();

      // Check if item is a key-value: - heading: "value"
      // Or if it's a nested object starting with a key
      const itemKVMatch = itemContent.match(/^(\w[\w\s]*\w|\w+):\s*(.+)$/);
      if (itemKVMatch) {
        // This list item starts an object — collect all subsequent indented lines as part of it
        const obj: Record<string, unknown> = {};
        const key = itemKVMatch[1].trim();
        let val: string = itemKVMatch[2].trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        obj[key] = val;
        i++;

        // Read additional keys for this object at deeper indent
        const objIndent = baseIndent + 2;
        while (i < lines.length) {
          const objLine = lines[i];
          const objTrimmed = objLine.trimEnd();
          if (objTrimmed.trim() === '') { i++; continue; }
          const objCurrentIndent = getIndent(objLine);
          if (objCurrentIndent < objIndent) break;

          const objKVMatch = objTrimmed.trimStart().match(/^(\w[\w\s]*\w|\w+):\s*(.+)$/);
          if (objKVMatch) {
            const oKey = objKVMatch[1].trim();
            let oVal: string = objKVMatch[2].trim();
            if ((oVal.startsWith('"') && oVal.endsWith('"')) || (oVal.startsWith("'") && oVal.endsWith("'"))) {
              oVal = oVal.slice(1, -1);
            }
            obj[oKey] = oVal;
            i++;
            continue;
          }

          // Block key for nested
          const objBlockMatch = objTrimmed.trimStart().match(/^(\w[\w\s]*\w|\w+):$/);
          if (objBlockMatch) {
            const bKey = objBlockMatch[1].trim();
            i++;
            const { value: bVal, nextIndex } = parseBlock(lines, i, objCurrentIndent + 2);
            obj[bKey] = bVal;
            i = nextIndex;
            continue;
          }

          i++;
        }

        result.push(obj);
        continue;
      }

      // Check if it's a block key (object starting): - heading:
      const itemBlockMatch = itemContent.match(/^(\w[\w\s]*\w|\w+):$/);
      if (itemBlockMatch) {
        // Nested object inside list
        const obj: Record<string, unknown> = {};
        const key = itemBlockMatch[1].trim();
        i++;
        const { value: bVal, nextIndex } = parseBlock(lines, i, baseIndent + 4);
        obj[key] = bVal;
        i = nextIndex;
        result.push(obj);
        continue;
      }

      // Simple string value
      let value = itemContent;
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      result.push(value);
      i++;
      continue;
    }

    // Not a list item at this indent — stop
    if (currentIndent <= baseIndent && !trimmed.trimStart().startsWith('-')) break;

    i++;
  }

  return { value: result, nextIndex: i };
}

function parseNestedObject(lines: string[], startIndex: number, baseIndent: number): { value: Record<string, unknown>; nextIndex: number } {
  const result: Record<string, unknown> = {};
  let i = startIndex;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trimEnd();

    if (trimmed.trim() === '') { i++; continue; }

    const currentIndent = getIndent(line);
    if (currentIndent < baseIndent) break;

    const kvMatch = trimmed.trimStart().match(/^(\w[\w\s]*\w|\w+):\s*(.+)$/);
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

    const blockMatch = trimmed.trimStart().match(/^(\w[\w\s]*\w|\w+):$/);
    if (blockMatch) {
      const key = blockMatch[1].trim();
      i++;
      const nextLineIndent = i < lines.length ? getIndent(lines[i]) : baseIndent;
      const { value, nextIndex } = parseBlock(lines, i, nextLineIndent);
      result[key] = value;
      i = nextIndex;
      continue;
    }

    i++;
  }

  return { value: result, nextIndex: i };
}

// ── Load all CMS posts from /content/blog/ ────────────────────────────────────
const markdownModules = import.meta.glob('/content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function loadCMSPosts(): BlogPostType[] {
  const posts: BlogPostType[] = [];

  for (const [path, rawContent] of Object.entries(markdownModules)) {
    try {
      // Extract slug from filename: /content/blog/my-post.md → my-post
      const slug = path.split('/').pop()?.replace('.md', '') || '';

      const { frontmatter, body } = parseFrontmatter(rawContent);
      const cmsFM = frontmatter as unknown as CMSFrontmatter;

      // Validate minimum required fields
      if (!cmsFM.title || !cmsFM.date) continue;

      posts.push(parseCMSPost(cmsFM, body, slug));
    } catch (err) {
      console.warn(`[BlogLoader] Failed to parse ${path}:`, err);
    }
  }

  // Sort by date (newest first)
  posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    // If dates can't be parsed, keep original order
    if (isNaN(dateA) || isNaN(dateB)) return 0;
    return dateB - dateA;
  });

  return posts;
}

// ── Unified export: CMS posts first, then legacy hardcoded posts ──────────────
// CMS posts take priority. If a CMS post has the same title as a legacy post,
// the CMS version wins (so you can migrate legacy posts to CMS over time).
const cmsPosts = loadCMSPosts();

const legacyTitles = new Set(cmsPosts.map(p => p.title.toLowerCase()));
const uniqueLegacyPosts = legacyPosts.filter(p => !legacyTitles.has(p.title.toLowerCase()));

/** All blog posts — CMS-authored + legacy hardcoded (deduplicated) */
export const allBlogPosts: BlogPostType[] = [...cmsPosts, ...uniqueLegacyPosts];
