import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Bookmark,
  CheckCircle2,
  Lightbulb,
  ArrowUpRight,
  Check,
  ChevronRight,
  BookOpen,
  Copy,
  ArrowDown,
  ChevronDown,
  HelpCircle
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { allBlogPosts as blogPosts, type ExtendedBlogPostType, type PortableTextNode, type PortableTextBlock, type PortableTextSpan, type FAQType } from '../data/blogLoader';

// ── Custom Monospace Terminal Code Block with Copy Action ─────────────────────
interface TerminalCodeBlockProps {
  code: string;
  lang: string;
}

const TerminalCodeBlock: React.FC<TerminalCodeBlockProps> = ({ code, lang }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 rounded-2xl border shadow-2xl overflow-hidden text-left font-mono" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b select-none" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <span className="text-[10px] font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{lang || 'code'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[10px] transition-colors cursor-pointer"
          style={{ color: 'var(--text-muted)' }}
        >
          {copied ? <Check size={10} /> : <Copy size={10} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre className="p-5 overflow-x-auto text-sm leading-relaxed font-light select-text" style={{ color: 'var(--text-body)' }}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

// ── Custom Flowchart & Diagram Renderer ──────────────────────────────────────
interface FlowchartRendererProps {
  code: string;
}

interface FlowNode {
  id: string;
  text: string;
}

interface FlowConnection {
  from: string;
  to: string;
}

const FlowchartRenderer: React.FC<FlowchartRendererProps> = ({ code }) => {
  const nodes: FlowNode[] = [];
  const connections: FlowConnection[] = [];
  const nodeMap = new Map<string, string>();

  // Strip out comment lines starting with % before scanning
  const cleanCode = code
    .split('\n')
    .filter(line => !line.trim().startsWith('%'))
    .join('\n');

  // Pass 1: Extract all inline and explicit node definitions globally using regex on clean code
  const nodeRegex = /(\w+)\s*(?:\(\s*"([^"]+)"\s*\)|\(\s*([^)]+)\s*\)|\[\s*"([^"]+)"\s*\]|\[\s*([^\]]+)\s*\])/g;
  let match;
  while ((match = nodeRegex.exec(cleanCode)) !== null) {
    const id = match[1];
    const text = match[2] || match[3] || match[4] || match[5] || id;
    if (!nodeMap.has(id)) {
      nodeMap.set(id, text);
      nodes.push({ id, text });
    }
  }

  // Pass 2: Tracing structural connection arrows for relational links
  const lines = code.split('\n');
  lines.forEach(line => {
    const parts = line.split('-->');
    if (parts.length > 1) {
      for (let p = 0; p < parts.length - 1; p++) {
        const fromPart = parts[p].trim();
        const toPart = parts[p + 1].trim();

        const fromMatch = fromPart.match(/(\w+)\s*$/) || fromPart.match(/^(\w+)/);
        const toMatch = toPart.match(/^(\w+)/);

        let fromId = fromMatch ? fromMatch[1] : null;
        const toId = toMatch ? toMatch[1] : null;

        if (!fromId && nodes.length > 0) {
          fromId = nodes[nodes.length - 1].id;
        }

        if (fromId && toId) {
          if (!nodeMap.has(fromId)) {
            nodeMap.set(fromId, fromId);
            nodes.push({ id: fromId, text: fromId });
          }
          if (!nodeMap.has(toId)) {
            nodeMap.set(toId, toId);
            nodes.push({ id: toId, text: toId });
          }
          connections.push({ from: fromId, to: toId });
        }
      }
    }
  });

  if (nodes.length === 0) {
    return (
      <div 
        className="p-4 rounded-xl border text-xs text-center select-text"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
      >
        [Flowchart Definition Empty or Invalid]
      </div>
    );
  }

  return (
    <div 
      className="my-12 p-8 md:p-12 rounded-[2rem] border shadow-2xl relative overflow-hidden text-center max-w-2xl mx-auto select-none"
      style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
    >
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="space-y-1.5 mb-2">
          <span className="text-[9px] font-sans font-bold tracking-[0.3em] uppercase block" style={{ color: 'var(--accent-amber)' }}>Growth Pipeline</span>
          <h4 className="text-xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>System Workflow Diagram</h4>
        </div>

        {nodes.map((node, index) => {
          const isLast = index === nodes.length - 1;
          
          return (
            <React.Fragment key={node.id}>
              <div 
                className="w-full p-6 md:p-8 rounded-2xl border shadow-xl transition-all duration-500 group relative overflow-hidden select-text"
                style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
              >
                <div className="flex items-center gap-4 text-left">
                  <div 
                    className="w-8 h-8 rounded-lg border text-xs flex items-center justify-center flex-shrink-0 transition-all duration-300 select-none font-bold"
                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--accent-amber)' }}
                  >
                    {index + 1}
                  </div>
                  <p className="text-base font-light leading-relaxed transition-colors duration-300" style={{ color: 'var(--text-body)' }}>
                    {node.text}
                  </p>
                </div>
              </div>

              {!isLast && (
                <div className="flex flex-col items-center gap-1.5 my-1">
                  <div className="w-[1.5px] h-12" style={{ backgroundColor: 'var(--border-card)' }} />
                  <ArrowDown size={14} style={{ color: 'var(--accent-amber)' }} />
                  <div className="w-[1.5px] h-12" style={{ backgroundColor: 'var(--border-card)' }} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

// ── Recursive Inline Markdown Parser (Bold, Italic, Link, Inline Code) ─────────
function renderInlineMarkdown(text: string): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  let remaining = text;
  let keyIndex = 0;

  while (remaining) {
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
    const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
    const italicMatch = remaining.match(/\*([^*]+)\*/);
    const codeMatch = remaining.match(/`([^`]+)`/);

    let earliest: { index: number; length: number; render: () => React.ReactNode } | null = null;

    if (linkMatch && linkMatch.index !== undefined) {
      if (!earliest || linkMatch.index < earliest.index) {
        earliest = {
          index: linkMatch.index,
          length: linkMatch[0].length,
          render: () => (
            <a
              key={`link-${keyIndex++}`}
              href={linkMatch[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-all font-medium select-text"
              style={{ color: 'var(--accent-amber)', textDecorationColor: 'var(--border-card)' }}
            >
              {linkMatch[1]}
            </a>
          )
        };
      }
    }

    if (boldMatch && boldMatch.index !== undefined) {
      if (!earliest || boldMatch.index < earliest.index) {
        earliest = {
          index: boldMatch.index,
          length: boldMatch[0].length,
          render: () => (
            <strong key={`bold-${keyIndex++}`} className="font-semibold select-text" style={{ color: 'var(--text-body)' }}>
              {boldMatch[1]}
            </strong>
          )
        };
      }
    }

    if (italicMatch && italicMatch.index !== undefined) {
      if (!earliest || italicMatch.index < earliest.index) {
        earliest = {
          index: italicMatch.index,
          length: italicMatch[0].length,
          render: () => (
            <em key={`italic-${keyIndex++}`} className="italic select-text" style={{ color: 'var(--text-muted)' }}>
              {italicMatch[1]}
            </em>
          )
        };
      }
    }

    if (codeMatch && codeMatch.index !== undefined) {
      if (!earliest || codeMatch.index < earliest.index) {
        earliest = {
          index: codeMatch.index,
          length: codeMatch[0].length,
          render: () => (
            <code
              key={`code-${keyIndex++}`}
              className="px-1.5 py-0.5 rounded font-mono text-sm font-light select-text border"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--accent-amber)' }}
            >
              {codeMatch[1]}
            </code>
          )
        };
      }
    }

    if (earliest) {
      if (earliest.index > 0) {
        elements.push(remaining.substring(0, earliest.index));
      }
      elements.push(earliest.render());
      remaining = remaining.substring(earliest.index + earliest.length);
    } else {
      elements.push(remaining);
      break;
    }
  }

  return elements.length > 0 ? elements : [text];
}

// ── Dynamic Markdown Block Renderer ──────────────────────────────────────────
interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const blocks: React.ReactNode[] = [];
  const lines = (content || '').split('\n');

  let currentBlockType: 'paragraph' | 'code' | null = null;
  let codeBuffer: string[] = [];
  let codeLang = '';
  let paragraphBuffer: string[] = [];
  let blockKeyIndex = 0;

  const flushParagraph = () => {
    if (paragraphBuffer.length > 0) {
      const text = paragraphBuffer.join('\n').trim();
      if (text) {
        blocks.push(
          <p key={`p-${blockKeyIndex++}`} className="leading-relaxed font-light text-base md:text-lg text-left select-text" style={{ color: 'var(--text-body)' }}>
            {renderInlineMarkdown(text)}
          </p>
        );
      }
      paragraphBuffer = [];
    }
  };

  const flushCodeBlock = () => {
    if (codeBuffer.length > 0) {
      const codeText = codeBuffer.join('\n').trim();
      const isFlowchart = 
        codeLang === 'mermaid' || 
        codeLang === 'arduino' || 
        codeText.includes('flowchart') || 
        codeText.includes('graph') || 
        codeText.includes('-->');

      if (isFlowchart) {
        blocks.push(<FlowchartRenderer key={`flow-${blockKeyIndex++}`} code={codeText} />);
      } else {
        blocks.push(<TerminalCodeBlock key={`code-${blockKeyIndex++}`} code={codeText} lang={codeLang} />);
      }
      
      codeBuffer = [];
      codeLang = '';
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (line.startsWith('```')) {
      if (currentBlockType === 'code') {
        flushCodeBlock();
        currentBlockType = null;
      } else {
        flushParagraph();
        currentBlockType = 'code';
        codeLang = line.substring(3).trim();
      }
      continue;
    }

    if (currentBlockType === 'code') {
      codeBuffer.push(line);
      continue;
    }

    if (trimmed === '') {
      flushParagraph();
    } else {
      paragraphBuffer.push(line);
    }
  }

  flushParagraph();
  flushCodeBlock();

  return <div className="space-y-6">{blocks}</div>;
};

// ── Portable Text (WYSIWYG) Rich Block Renderer ──────────────────────────────
function renderPortableSpan(span: PortableTextSpan, markDefs: { _key: string; _type: string; href?: string; blank?: boolean }[], keyPrefix: string): React.ReactNode {
  let content: React.ReactNode = span.text;
  const marks = span.marks || [];

  for (const mark of marks) {
    if (mark === 'strong') {
      content = <strong key={`${keyPrefix}-strong`} className="font-semibold" style={{ color: 'var(--text-body)' }}>{content}</strong>;
    } else if (mark === 'em') {
      content = <em key={`${keyPrefix}-em`} className="italic" style={{ color: 'var(--text-muted)' }}>{content}</em>;
    } else if (mark === 'underline') {
      content = <span key={`${keyPrefix}-u`} className="underline" style={{ textDecorationColor: 'var(--border-card)' }}>{content}</span>;
    } else if (mark === 'code') {
      content = <code key={`${keyPrefix}-code`} className="px-1.5 py-0.5 rounded font-mono text-sm font-light border" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--accent-amber)' }}>{content}</code>;
    } else if (mark === 'strike-through') {
      content = <s key={`${keyPrefix}-s`} style={{ color: 'var(--text-muted)' }}>{content}</s>;
    } else {
      const def = markDefs.find(d => d._key === mark);
      if (def && def._type === 'link' && def.href) {
        content = (
          <a 
            key={`${keyPrefix}-link`} 
            href={def.href} 
            target={def.blank !== false ? '_blank' : '_self'} 
            rel="noopener noreferrer" 
            className="underline transition-all font-medium"
            style={{ color: 'var(--accent-amber)', textDecorationColor: 'var(--border-card)' }}
          >
            {content}
          </a>
        );
      }
    }
  }
  return content;
}

function renderPortableBlock(block: PortableTextBlock, keyPrefix: string): React.ReactNode {
  const markDefs = block.markDefs || [];
  const children = (block.children || []).map((span, si) =>
    renderPortableSpan(span, markDefs, `${keyPrefix}-s${si}`)
  );

  const style = block.style || 'normal';

  if (style === 'h2') {
    return (
      <h2
        key={keyPrefix}
        className="flex items-center gap-3 font-bold font-display mt-12 mb-4 pb-3 border-b"
        style={{ color: 'var(--text-body)', borderColor: 'var(--border-card)', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
      >
        <span className="flex-shrink-0 w-1.5 h-7 rounded-full" style={{ backgroundColor: 'var(--accent-amber)' }} />
        {children}
      </h2>
    );
  }
  if (style === 'h3') {
    return (
      <h3
        key={keyPrefix}
        className="font-bold font-display mt-9 mb-3"
        style={{ color: 'var(--accent-amber)', fontSize: 'clamp(1.2rem, 2.4vw, 1.65rem)' }}
      >
        {children}
      </h3>
    );
  }
  if (style === 'h4') {
    return (
      <h4
        key={keyPrefix}
        className="font-semibold font-display mt-7 mb-2"
        style={{ color: 'var(--text-body)', opacity: 0.9, fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', letterSpacing: '0.01em' }}
      >
        {children}
      </h4>
    );
  }
  if (style === 'blockquote') {
    return (
      <blockquote key={keyPrefix} className="py-6 pl-8 border-l-4 text-xl md:text-2xl font-light italic leading-relaxed" style={{ borderLeftColor: 'var(--accent-amber)', color: 'var(--text-body)' }}>
        {children}
      </blockquote>
    );
  }

  if (block.listItem === 'bullet') {
    return (
      <li key={keyPrefix} className="flex items-start gap-3.5 group">
        <div className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--accent-amber)' }} />
        <span className="text-base md:text-lg font-light leading-relaxed" style={{ color: 'var(--text-body)' }}>{children}</span>
      </li>
    );
  }
  if (block.listItem === 'number') {
    return (
      <li key={keyPrefix} className="text-base md:text-lg font-light leading-relaxed list-decimal ml-6" style={{ color: 'var(--text-body)' }}>
        {children}
      </li>
    );
  }

  return <p key={keyPrefix} className="leading-relaxed font-light text-base md:text-lg text-left select-text" style={{ color: 'var(--text-body)' }}>{children}</p>;
}

interface PortableTextRendererProps {
  blocks: PortableTextNode[];
}

const PortableTextRenderer: React.FC<PortableTextRendererProps> = ({ blocks }) => {
  const elements: React.ReactNode[] = [];
  let listBuffer: React.ReactNode[] = [];
  let listType: 'bullet' | 'number' | null = null;
  let sectionIndex = 0;

  const flushList = () => {
    if (listBuffer.length > 0) {
      const Tag = listType === 'number' ? 'ol' : 'ul';
      const cls = listType === 'number' ? 'space-y-2 pt-2 pl-2' : 'space-y-3.5 pt-2 pl-2';
      elements.push(<Tag key={`list-${elements.length}`} className={cls}>{listBuffer}</Tag>);
      listBuffer = [];
      listType = null;
    }
  };

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const key = `pt-${i}`;

    if (block._type === 'block') {
      const textBlock = block as PortableTextBlock;

      if (textBlock.listItem) {
        if (listType && listType !== textBlock.listItem) flushList();
        listType = textBlock.listItem;
        listBuffer.push(renderPortableBlock(textBlock, key));
        continue;
      }

      flushList();

      if (textBlock.style === 'h2' || textBlock.style === 'h3' || textBlock.style === 'h4') {
        const headingText = (textBlock.children || []).map(c => c.text).join('');

        let headingEl: React.ReactNode;
        if (textBlock.style === 'h2') {
          headingEl = (
            <h2
              className="flex items-center gap-3 font-bold font-display mt-12 mb-4 pb-3 border-b block"
              style={{ color: 'var(--text-body)', borderColor: 'var(--border-card)', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
            >
              <span className="flex-shrink-0 w-1.5 h-7 rounded-full" style={{ backgroundColor: 'var(--accent-amber)' }} />
              {headingText}
            </h2>
          );
        } else if (textBlock.style === 'h3') {
          headingEl = (
            <h3
              className="font-bold font-display mt-9 mb-3 block"
              style={{ color: 'var(--accent-amber)', fontSize: 'clamp(1.2rem, 2.4vw, 1.65rem)' }}
            >
              {headingText}
            </h3>
          );
        } else {
          headingEl = (
            <h4
              className="font-semibold font-display mt-7 mb-2 block"
              style={{ color: 'var(--text-body)', opacity: 0.9, fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', letterSpacing: '0.01em' }}
            >
              {headingText}
            </h4>
          );
        }

        elements.push(
          <div key={key} id={`section-${sectionIndex}`} className="scroll-mt-24">
            {headingEl}
          </div>
        );
        sectionIndex++;
        continue;
      }

      elements.push(renderPortableBlock(textBlock, key));
      continue;
    }

    flushList();

    if (block._type === 'terminalEmbed') {
      const b = block as any;
      elements.push(<TerminalCodeBlock key={key} code={b.code || ''} lang={b.language || 'bash'} />);
    } else if (block._type === 'flowchartEmbed') {
      const b = block as any;
      elements.push(<FlowchartRenderer key={key} code={b.code || ''} />);
    } else if (block._type === 'exampleEmbed') {
      const b = block as any;
      elements.push(
        <div 
          key={key} 
          className="p-8 rounded-[2rem] border shadow-lg space-y-3 relative overflow-hidden"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
        >
          <div className="flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--accent-amber)' }}>
            <Lightbulb size={14} /><span>Example Playbook</span>
          </div>
          <p className="text-base font-light leading-relaxed italic" style={{ color: 'var(--text-body)' }}>"{b.text}"</p>
        </div>
      );
    } else if (block._type === 'highlightEmbed') {
      const b = block as any;
      elements.push(
        <div 
          key={key} 
          className="p-8 rounded-[2rem] border shadow-lg space-y-2"
          style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)' }}
        >
          <p className="text-lg md:text-xl font-medium leading-snug" style={{ color: 'var(--text-body)' }}>{b.text}</p>
        </div>
      );
    } else if (block._type === 'simplificationEmbed') {
      const b = block as any;
      elements.push(
        <div 
          key={key} 
          className="p-8 rounded-[2rem] border space-y-4 relative overflow-hidden"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
        >
          <div className="relative z-10 space-y-2">
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest block" style={{ color: 'var(--accent-amber)' }}>{b.label || 'In Plain Terms'}</span>
            <p className="text-base md:text-lg font-light leading-relaxed" style={{ color: 'var(--text-body)' }}>{b.text}</p>
          </div>
        </div>
      );
    } else if (block._type === 'quoteEmbed') {
      const b = block as any;
      elements.push(
        <div key={key} className="py-10 border-y my-10 relative" style={{ borderColor: 'var(--border-card)' }}>
          <p className="text-2xl md:text-3xl font-display italic leading-relaxed text-center max-w-2xl mx-auto" style={{ color: 'var(--text-body)' }}>"{b.text}"</p>
          <p className="text-center mt-4 font-sans font-bold text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>— {b.author || 'Unknown'}</p>
        </div>
      );
    } else if (block._type === 'tableEmbed') {
      const b = block as any;
      const headers: string[] = b.headers || [];
      const rows: string[][] = (b.rows || []).map((r: any) => {
        if (Array.isArray(r)) return r.map((c: any) => String(c));
        if (r && r.cells) return r.cells.map((c: any) => String(c));
        return [];
      });
      elements.push(
        <div className="my-8 overflow-x-auto rounded-2xl border shadow-2xl" style={{ borderColor: 'var(--border-card)' }}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
                {headers.map((h, hi) => (
                  <th key={hi} className="px-6 py-4.5 text-[10px] font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className="border-b last:border-0 transition-colors" style={{ borderColor: 'var(--border-card)' }}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-6 py-5 text-sm font-light leading-relaxed" style={{ color: 'var(--text-body)' }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (block._type === 'table') {
      const b = block as any;
      const rows: string[][] = (b.rows || []).map((r: any) => {
        if (Array.isArray(r)) return r.map((c: any) => String(c));
        if (r && r.cells) return r.cells.map((c: any) => String(c));
        return [];
      });
      if (rows.length > 0) {
        const headers = rows[0];
        const bodyRows = rows.slice(1);
        elements.push(
          <div key={key} className="my-8 overflow-x-auto rounded-2xl border shadow-2xl" style={{ borderColor: 'var(--border-card)' }}>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
                  {headers.map((h, hi) => (
                    <th key={hi} className="px-6 py-4.5 text-[10px] font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, ri) => (
                  <tr key={ri} className="border-b last:border-0 transition-colors hover:bg-[var(--bg-surface-alt)]" style={{ borderColor: 'var(--border-card)' }}>
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-6 py-5 text-sm font-light leading-relaxed" style={{ color: 'var(--text-body)' }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
    } else if (block._type === 'image') {
      const b = block as any;
      const imgUrl = b.asset?.url || '';
      if (imgUrl) {
        elements.push(
          <figure key={key} className="my-10">
            <img src={imgUrl} alt={b.alt || 'Blog Post Content Illustration'} width={640} height={360} className="w-full rounded-2xl border shadow-xl" style={{ borderColor: 'var(--border-card)' }} loading="lazy" referrerPolicy="no-referrer" />
            {b.caption && <figcaption className="text-center mt-3 text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{b.caption}</figcaption>}
          </figure>
        );
      }
    }
  }

  flushList();
  return <div className="space-y-6">{elements}</div>;
};

// ── FAQ Accordion Components ──────────────────────────────────────────────────
interface FAQItemProps {
  faq: FAQType;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const FAQAccordionItem: React.FC<FAQItemProps> = ({ faq, isOpen, onToggle, index }) => {
  return (
    <div 
      className="border rounded-2xl overflow-hidden transition-all duration-300"
      style={{ 
        backgroundColor: isOpen ? 'var(--bg-surface-alt)' : 'var(--bg-surface)', 
        borderColor: isOpen ? 'var(--accent-amber)' : 'var(--border-card)' 
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none transition-colors group cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-4">
          <span 
            className="text-sm font-sans font-bold select-none mt-0.5" 
            style={{ color: isOpen ? 'var(--accent-amber)' : 'var(--text-muted)' }}
          >
            {index < 9 ? `0${index + 1}` : index + 1}
          </span>
          <h3 
            className="text-base md:text-lg font-bold font-display transition-colors group-hover:text-[var(--accent-amber)]" 
            style={{ color: 'var(--text-body)' }}
          >
            {faq.question}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0 ml-4"
          style={{ color: isOpen ? 'var(--accent-amber)' : 'var(--text-muted)' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 pt-1 border-t pl-[3.5rem] md:pl-[3.5rem]" style={{ borderColor: 'var(--border-card)' }}>
              <p className="text-sm md:text-base font-light leading-relaxed select-text" style={{ color: 'var(--text-muted)' }}>
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface FAQAccordionProps {
  faqs: FAQType[];
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open the first FAQ by default

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <FAQAccordionItem
          key={index}
          faq={faq}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          index={index}
        />
      ))}
    </div>
  );
};

const DEFAULT_FAQS: FAQType[] = [
  {
    question: "What is content marketing automation?",
    answer: "Content marketing automation involves using specialized software systems (such as n8n, Zapier, or custom APIs) to execute repetitive task flows, including drafts structuring, social media distribution, and formatting. Rather than replacing human creativity, it frees up time for strategy and high-fidelity editing."
  },
  {
    question: "How does automation help in B2B SaaS growth?",
    answer: "B2B SaaS requires consistent, high-quality, authoritative content. Automation ensures that you can repurpose a single major piece of content (like a whitepaper or long-form blog) into dozens of social snippets, email drafts, and cross-channel posts automatically, significantly increasing your brand presence with minimal manual overhead."
  },
  {
    question: "Does automated distribution affect search engine rankings?",
    answer: "No. Search engines rank content based on 'Information Gain,' unique perspective, and user engagement signals (like dwell time). Automated distribution merely speeds up how quickly you syndicate your posts to LinkedIn, X, newsletters, and other channels, helping you build faster organic authority."
  },
  {
    question: "How do you maintain the 'human spark' when automating content?",
    answer: "We advocate for a strict 'Human-in-the-Loop' editorial pipeline. Automation handles outline structuring, competitive research gathering, and syndication channels, but the ideation, key insights, personal stories, and final editorial edits are always executed by a human expert."
  },
  {
    question: "How do I get started with a content automation tech stack?",
    answer: "You don't need a five-figure enterprise budget. You can build a robust, modular content engine using affordable tools like Notion for planning, OpenAI/Claude APIs for drafting assistance, and n8n or Zapier for connecting pipelines, all for under $500/month."
  }
];

export default function BlogPost() {
  const { id } = useParams();
  
  const post = (blogPosts.find(p => p.id === id) || blogPosts[0]) as ExtendedBlogPostType;
  const hasPortableContent = !!(post.portableContent && post.portableContent.length > 0);
  const faqs = (post.faqs && post.faqs.length > 0) ? post.faqs : DEFAULT_FAQS;

  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem('blog_bookmarks');
      if (saved) {
        const list = JSON.parse(saved) as string[];
        setIsBookmarked(list.includes(post.id));
      }
    } catch (e) {
      console.warn("Storage access not allowed:", e);
    }
  }, [post.id]);

  const toggleBookmark = () => {
    try {
      const saved = localStorage.getItem('blog_bookmarks');
      let list = saved ? (JSON.parse(saved) as string[]) : [];
      if (list.includes(post.id)) {
        list = list.filter(item => item !== post.id);
        setIsBookmarked(false);
        triggerToast("Removed from bookmarks");
      } else {
        list.push(post.id);
        setIsBookmarked(true);
        triggerToast("Saved to bookmarks! 🔖");
      }
      localStorage.setItem('blog_bookmarks', JSON.stringify(list));
    } catch (e) {
      triggerToast("Could not save bookmark");
    }
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        triggerToast("Link copied to clipboard! 📋");
      })
      .catch(() => {
        triggerToast("Failed to copy link");
      });
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollPercent(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 180;
      post.sections.forEach((_, idx) => {
        const el = document.getElementById(`section-${idx}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(idx);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScrollSpy);
    setTimeout(handleScrollSpy, 200);

    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [post.sections]);

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id)
    .map(p => {
      let score = 0;
      p.tags.forEach(tag => {
        if (post.tags.includes(tag)) score += 2;
      });
      return { ...p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)' }}>
      <SEO 
        title={`${post.title} | Emmanuel Odebiyi`}
        description={post.metaDescription || post.excerpt}
        keywords={post.tags.join(", ")}
        ogImage={post.image}
        faqSchema={faqs}
      />

      {/* Floating Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 animate-pulse" style={{ backgroundColor: 'var(--border-card)' }}>
        <div 
          className="h-full transition-all duration-75 animate-none"
          style={{ width: `${scrollPercent}%`, backgroundColor: 'var(--accent-amber)' }}
        />
      </div>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 border px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
          >
            <Check size={16} style={{ color: 'var(--accent-amber)' }} />
            <span className="text-sm font-sans font-bold uppercase tracking-widest">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Article Hero Banner */}
      <section className="relative h-[80vh] w-full overflow-hidden border-b" style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-page)' }}>
        <motion.div 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src={post.heroImage} 
            alt={post.title}
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />

          {/* ── Pure Colorless Transparent Glass Blur (Frosted 12px) ── */}
          {/* Zero color pigment / pure optical glass blur localized to text area */}
          <div 
            className="absolute inset-0 pointer-events-none z-10 backdrop-blur-md [mask-image:linear-gradient(to_right,black_0%,black_35%,transparent_70%)] [-webkit-mask-image:linear-gradient(to_right,black_0%,black_35%,transparent_70%)] max-md:[mask-image:linear-gradient(to_top,black_0%,black_50%,transparent_85%)] max-md:[-webkit-mask-image:linear-gradient(to_top,black_0%,black_50%,transparent_85%)]" 
          />
        </motion.div>

        {/* Absolute content overlay with top padding constraint to prevent navbar overlap */}
        <div className="absolute inset-0 flex flex-col justify-end pt-32 pb-10 md:pt-36 md:pb-16 px-6 md:px-20 max-w-7xl mx-auto w-full z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-6 max-w-4xl text-left"
          >
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 transition-colors mb-2 group font-sans text-xs font-bold uppercase tracking-widest hover:underline text-[#0E1C2A] dark:text-[#F5F1EA] hero-light-stroke"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform text-[#0E1C2A] dark:text-[#F5F1EA]" />
              <span>Back to Insights</span>
            </Link>
            
            {/* Title sized dynamically (balanced maximum at text-6xl) to prevent screen overcrowding */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] font-display text-[#0E1C2A] dark:text-[#F5F1EA] hero-light-stroke">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-3">
                <img 
                  src={post.authorImage} 
                  alt={post.author} 
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full border shadow-sm border-[var(--border-card)]" 
                />
                <div>
                  <p className="font-bold text-sm leading-none text-[#0E1C2A] dark:text-[#F5F1EA] hero-light-stroke">{post.author}</p>
                  <p className="text-[10px] font-sans font-bold uppercase tracking-widest mt-1 text-[#0E1C2A] dark:text-[#F5F1EA] hero-light-stroke">{post.date}</p>
                </div>
              </div>
              
              <div className="h-4 w-px hidden sm:block bg-[var(--border-card)]" />

              <div className="flex items-center gap-6 text-xs font-sans font-bold uppercase tracking-widest text-[#0E1C2A] dark:text-[#F5F1EA] hero-light-stroke">
                <span className="flex items-center gap-1.5"><Clock size={13} className="text-[#0E1C2A] dark:text-[#F5F1EA]" /> {post.readTime}</span>
                <button 
                  onClick={copyShareLink}
                  className="flex items-center gap-1.5 transition-colors focus:outline-none cursor-pointer hover:opacity-80 text-[#0E1C2A] dark:text-[#F5F1EA] hero-light-stroke"
                  title="Share Link"
                >
                  <Share2 size={13} className="text-[#0E1C2A] dark:text-[#F5F1EA]" /> Share
                </button>
                <button 
                  onClick={toggleBookmark}
                  className="flex items-center gap-1.5 transition-colors focus:outline-none cursor-pointer hover:opacity-80 text-[#0E1C2A] dark:text-[#F5F1EA] hero-light-stroke"
                  style={{ color: isBookmarked ? 'var(--accent-amber)' : undefined }}
                  title="Bookmark post"
                >
                  <Bookmark size={13} style={{ color: isBookmarked ? 'var(--accent-amber)' : 'inherit', fill: isBookmarked ? 'var(--accent-amber)' : 'none' }} /> Bookmark
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sticky Left Table of Contents */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 h-fit space-y-8 text-left border-r pr-6" style={{ borderColor: 'var(--border-card)' }}>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                <BookOpen size={12} />
                <span>Reading Guide</span>
              </div>
              <h4 className="text-sm font-bold font-sans" style={{ color: 'var(--text-body)' }}>Core Framework</h4>
            </div>
            
            <nav className="flex flex-col gap-2 relative">
              {post.sections.map((sec, idx) => (
                <a
                  key={idx}
                  href={`#section-${idx}`}
                  className="text-sm font-light py-2 pl-4 border-l transition-all duration-300"
                  style={{
                    color: activeSection === idx ? 'var(--accent-amber)' : 'var(--text-muted)',
                    borderLeftColor: activeSection === idx ? 'var(--accent-amber)' : 'var(--border-card)',
                    fontWeight: activeSection === idx ? 'bold' : 'normal'
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(`section-${idx}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                >
                  {sec.heading}
                </a>
              ))}
            </nav>

            {/* Quick Actions Panel */}
            <div className="pt-8 border-t space-y-4" style={{ borderColor: 'var(--border-card)' }}>
              <button 
                onClick={copyShareLink}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-xs font-sans font-bold uppercase tracking-widest"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
              >
                <span>Share Insight</span>
                <Share2 size={12} />
              </button>
              <button 
                onClick={toggleBookmark}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-xs font-sans font-bold uppercase tracking-widest"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
              >
                <span>{isBookmarked ? "Bookmarked" : "Bookmark Insight"}</span>
                <Bookmark size={12} style={{ color: isBookmarked ? 'var(--accent-amber)' : 'inherit', fill: isBookmarked ? 'var(--accent-amber)' : 'none' }} />
              </button>
            </div>
          </aside>

          {/* Article Central Column */}
          <article className="col-span-1 lg:col-span-8 lg:pl-6 text-left">
            
            {/* Hook / Introduction */}
            <section className="mb-16">
              <p className="text-2xl md:text-3xl font-light leading-relaxed italic border-l-4 pl-8 font-sans" style={{ borderLeftColor: 'var(--accent-amber)', color: 'var(--text-body)' }}>
                "{post.hook}"
              </p>
            </section>

            {/* Content Body — WYSIWYG Portable Text or Legacy Sections */}
            {hasPortableContent ? (
              <div className="space-y-6">
                <PortableTextRenderer blocks={post.portableContent!} />
              </div>
            ) : (
              <div className="space-y-20">
                {post.sections.map((section, index) => (
                  <section 
                    key={index} 
                    id={`section-${index}`} 
                    className="space-y-6 scroll-mt-24 transition-opacity"
                  >
                    <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight pb-2 border-b border-[var(--border-card)]" style={{ color: 'var(--text-body)' }}>
                      {section.heading}
                    </h2>
                    
                    <div className="prose prose-invert max-w-none font-light text-base md:text-lg leading-relaxed space-y-4" style={{ color: 'var(--text-body)' }}>
                      <MarkdownRenderer content={section.content} />
                    </div>

                    {section.example && (
                      <div 
                        className="p-8 rounded-[2rem] border shadow-lg space-y-3 relative overflow-hidden"
                        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
                      >
                        <div className="flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--accent-amber)' }}>
                          <Lightbulb size={14} />
                          <span>Example Playbook</span>
                        </div>
                        <p className="text-base font-light leading-relaxed italic" style={{ color: 'var(--text-body)' }}>
                          "{section.example}"
                        </p>
                      </div>
                    )}

                    {section.highlight && (
                      <div 
                        className="p-8 rounded-[2rem] border shadow-lg space-y-2"
                        style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)' }}
                      >
                        <p className="text-lg md:text-xl font-medium leading-snug" style={{ color: 'var(--text-body)' }}>
                          {section.highlight}
                        </p>
                      </div>
                    )}

                    {section.simplification && (
                      <div 
                        className="p-8 rounded-[2rem] border space-y-4 relative overflow-hidden"
                        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
                      >
                        <div className="relative z-10 space-y-2">
                          <span className="text-[10px] font-sans font-bold uppercase tracking-widest block" style={{ color: 'var(--accent-amber)' }}>
                            {section.simplification.label}
                          </span>
                          <p className="text-base md:text-lg font-light leading-relaxed" style={{ color: 'var(--text-body)' }}>
                            {section.simplification.text}
                          </p>
                        </div>
                      </div>
                    )}

                    {section.list && (
                      <ul className="space-y-3.5 pt-2 pl-2">
                        {section.list.map((item, i) => (
                          <li key={i} className="flex items-start gap-3.5 group">
                            <div className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--accent-amber)' }} />
                            <span className="text-base md:text-lg font-light leading-relaxed" style={{ color: 'var(--text-body)' }}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.quote && (
                      <div key={index} className="py-10 border-y my-10 relative" style={{ borderColor: 'var(--border-card)' }}>
                        <p className="text-2xl md:text-3xl font-display italic leading-relaxed text-center max-w-2xl mx-auto" style={{ color: 'var(--text-body)' }}>
                          "{section.quote.text}"
                        </p>
                        <p className="text-center mt-4 font-sans font-bold text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                          — {section.quote.author}
                        </p>
                      </div>
                    )}

                    {section.table && (
                      <div className="my-8 overflow-x-auto rounded-2xl border shadow-2xl" style={{ borderColor: 'var(--border-card)' }}>
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b font-sans text-[10px] font-bold uppercase tracking-widest" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
                              {section.table.headers.map((header, i) => (
                                <th key={i} className="px-6 py-4.5" style={{ color: 'var(--text-muted)' }}>
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {section.table.rows.map((row, i) => (
                              <tr key={i} className="border-b last:border-0 transition-colors" style={{ borderColor: 'var(--border-card)' }}>
                                {row.map((cell, j) => (
                                  <td key={j} className="px-6 py-5 text-sm font-light leading-relaxed" style={{ color: 'var(--text-body)' }}>
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </section>
                ))}
              </div>
            )}

            {/* Divider Element */}
            <div className="my-24 flex items-center justify-center gap-3">
              <div className="h-px w-10" style={{ backgroundColor: 'var(--border-card)' }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-amber)' }} />
              <div className="h-px w-10" style={{ backgroundColor: 'var(--border-card)' }} />
            </div>

            {/* Key Takeaways Section */}
            <section 
              className="p-8 md:p-16 rounded-[2.5rem] border shadow-xl space-y-10"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <div className="space-y-3">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest block" style={{ color: 'var(--text-muted)' }}>Executive Summary</span>
                <h2 className="text-3xl font-bold font-display" style={{ color: 'var(--text-body)' }}>Key Insights</h2>
              </div>
              
              <ul className="space-y-5">
                {post.takeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <div 
                      className="mt-1.5 w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--accent-amber)' }}
                    >
                      <CheckCircle2 size={12} />
                    </div>
                    <span className="text-base md:text-lg font-light leading-relaxed" style={{ color: 'var(--text-body)' }}>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* FAQs Section */}
            <section className="mt-24 space-y-10 text-left">
              <div className="space-y-3">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest block" style={{ color: 'var(--text-muted)' }}>Help & Context</span>
                <h2 className="text-3xl font-bold font-display" style={{ color: 'var(--text-body)' }}>Frequently Asked Questions</h2>
              </div>
              <FAQAccordion faqs={faqs} />
            </section>

            {/* Dynamic Author Bio Card */}
            <section className="mt-24 pt-12 border-t" style={{ borderColor: 'var(--border-card)' }}>
              <div 
                className="flex flex-col md:flex-row items-start md:items-center gap-6 border p-8 rounded-3xl backdrop-blur-sm"
                style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)' }}
              >
                <img 
                  src={post.authorImage} 
                  alt={post.author} 
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full border object-cover shadow-lg" 
                  style={{ borderColor: 'var(--border-card)' }}
                />
                <div className="space-y-3 flex-1 text-left">
                  <div>
                    <p className="text-xl font-bold leading-none" style={{ color: 'var(--text-body)' }}>{post.author}</p>
                    <p className="text-xs font-sans font-bold uppercase tracking-widest mt-1" style={{ color: 'var(--text-muted)' }}>{post.date} • Author</p>
                  </div>
                  <p className="text-sm md:text-base font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {post.authorBio}
                  </p>
                </div>
              </div>
            </section>

            {/* Bottom Actions Router */}
            <section className="mt-16 p-8 border-t text-zinc-400 font-light text-sm text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-6" style={{ borderColor: 'var(--border-card)' }}>
              <p className="max-w-md" style={{ color: 'var(--text-muted)' }}>
                Want to build automated pipelines like these for your business? Explore my solutions or reach out.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/portfolio" className="hover:text-[var(--accent-amber)] font-bold font-sans text-xs uppercase tracking-widest transition-colors" style={{ color: 'var(--text-body)' }}>
                  Case Studies <ArrowUpRight size={14} />
                </Link>
                <span className="hidden md:inline" style={{ color: 'var(--border-card)' }}>|</span>
                <Link to="/contact" className="hover:text-[var(--accent-amber)] font-bold font-sans text-xs uppercase tracking-widest transition-colors" style={{ color: 'var(--accent-amber)' }}>
                  Let's Connect <ArrowUpRight size={14} />
                </Link>
              </div>
            </section>

          </article>
        </div>

        {/* Dynamic Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="mt-32 pt-20 border-t space-y-10 text-left" style={{ borderColor: 'var(--border-card)' }}>
            <div className="space-y-3">
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest block" style={{ color: 'var(--text-muted)' }}>Next Up</span>
              <h2 className="text-3xl md:text-4xl font-bold font-display" style={{ color: 'var(--text-body)' }}>Related Insights</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((related) => (
                <Link 
                  key={related.id} 
                  to={`/blog/${related.id}`}
                  className="group border rounded-3xl p-6 block transition-all duration-300"
                  style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
                >
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden relative mb-6">
                    <img 
                      src={related.image} 
                      alt={related.title} 
                      width={380}
                      height={240}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#0a0f1e]/40 pointer-events-none" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {related.tags.slice(0, 2).map(tag => (
                        <span 
                          key={tag} 
                          className="text-[8px] font-sans font-bold uppercase tracking-widest border px-2 py-0.5 rounded"
                          style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold font-display leading-snug transition-colors group-hover:text-[var(--accent-amber)] line-clamp-2" style={{ color: 'var(--text-body)' }}>
                      {related.title}
                    </h3>
                    <div className="flex items-center justify-between text-[10px] font-sans font-bold uppercase tracking-widest pt-3 border-t" style={{ borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}>
                      <span>{related.date}</span>
                      <span className="flex items-center gap-1 group-hover:text-[var(--text-body)] transition-colors">
                        Read
                        <ChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </section>

      {/* Embedded unified bottom newsletter to match footer flow */}
      <section className="border-t py-24 px-6 overflow-hidden relative" style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)' }}>
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <div className="space-y-3">
            <span className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Organic Scale Insights</span>
            <h2 className="text-3xl md:text-5xl font-bold font-display" style={{ color: 'var(--text-body)' }}>
              Join the Growth Lab
            </h2>
            <p className="font-light max-w-xl mx-auto text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Get raw automated workflows, operational templates, and technical SEO frameworks delivered weekly. No spam, only engineering-grade growth strategy.
            </p>
          </div>

          <div className="max-w-md mx-auto relative group">
            <div 
              className="relative flex border p-2 rounded-xl"
              style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
            >
              <input 
                type="email" 
                placeholder="Enter email address" 
                className="flex-1 bg-transparent px-4 text-xs focus:outline-none placeholder-zinc-500"
                style={{ color: 'var(--text-body)' }}
                disabled
              />
              <Link
                to="/blog"
                className="text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all font-bold text-[10px] uppercase tracking-widest font-sans shadow-md"
                style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)' }}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
