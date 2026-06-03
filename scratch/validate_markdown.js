import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getIndent(line) {
  const match = line.match(/^(\s*)/);
  return match ? match[1].length : 0;
}

function parseBlock(lines, startIndex, baseIndent) {
  const values = [];
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

function parseSimpleYAML(yaml) {
  const result = {};
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
      let value = kvMatch[2].trim();
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

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { frontmatter: {}, body: raw };

  const yamlStr = match[1];
  const body = raw.slice(match[0].length).trim();
  const frontmatter = parseSimpleYAML(yamlStr);

  return { frontmatter, body };
}

const blogDir = path.join(__dirname, '..', 'content', 'blog');
if (!fs.existsSync(blogDir)) {
  console.error(`Blog directory not found: ${blogDir}`);
  process.exit(1);
}

const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
console.log(`Found ${files.length} markdown file(s) to validate.`);

let hasError = false;

files.forEach(file => {
  const filePath = path.join(blogDir, file);
  const rawContent = fs.readFileSync(filePath, 'utf8');
  
  try {
    const { frontmatter, body } = parseFrontmatter(rawContent);
    
    console.log(`\nValidating ${file}...`);
    console.log(`  Title: ${frontmatter.title}`);
    console.log(`  Date: ${frontmatter.date}`);
    console.log(`  Author: ${frontmatter.author}`);
    console.log(`  Read Time: ${frontmatter.readTime}`);
    
    if (!frontmatter.title) {
      console.error(`  [ERROR] Missing 'title' key in frontmatter`);
      hasError = true;
    }
    if (!frontmatter.date) {
      console.error(`  [ERROR] Missing 'date' key in frontmatter`);
      hasError = true;
    }
  } catch (err) {
    console.error(`  [ERROR] Exception during parsing:`, err);
    hasError = true;
  }
});

if (hasError) {
  console.error('\nValidation failed with errors.');
  process.exit(1);
} else {
  console.log('\nValidation successful! All files matched the required schema.');
  process.exit(0);
}
