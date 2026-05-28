import fs from 'fs';
import path from 'path';

// Copied parsing logic from src/data/blogLoader.ts to test it locally
interface BlogSection {
  heading: string;
  content: string;
  example?: string;
  highlight?: string;
  simplification?: { label?: string; text?: string } | null;
  list?: string[];
  quote?: { text?: string; author?: string } | null;
  table?: {
    headers?: string[];
    rows?: string[][];
  } | null;
}

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
      
      console.log(`Matched tag: ${tagName}`, attrs);
      
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

function parseFrontmatter(raw: string): { frontmatter: Record<string, unknown>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { frontmatter: {}, body: raw };

  const yamlStr = match[1];
  const body = raw.slice(match[0].length).trim();

  return { frontmatter: {}, body };
}

const mdPath = path.resolve('c:/Users/HP/Documents/Portfolio_Website/content/blog/how-i-save-15-hours-every-week-with-content-automation.md');
const rawContent = fs.readFileSync(mdPath, 'utf-8');
const { body } = parseFrontmatter(rawContent);
const sections = parseMarkdownBodyToSections(body);

console.log("\nParsed Sections structure:");
console.log(JSON.stringify(sections, null, 2));
