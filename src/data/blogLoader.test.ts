import { describe, it, expect } from 'vitest';
import {
  slugify,
  sanitizeTitle,
  parseFrontmatter,
  parseMarkdownBodyToSections,
  allBlogPosts,
} from './blogLoader';

describe('Blog Ingestion & Loader Tests', () => {
  describe('slugify()', () => {
    it('should convert strings to lowercase kebab case', () => {
      expect(slugify('Hello World')).toBe('hello-world');
      expect(slugify('  Vite  React 19 & Tailwind v4 ')).toBe('vite-react-19-tailwind-v4');
    });

    it('should strip special character punctuation and clean hyphens', () => {
      expect(slugify('Title with some @symbols!!!')).toBe('title-with-some-symbols');
      expect(slugify('---leading-trailing---')).toBe('leading-trailing');
    });
  });

  describe('sanitizeTitle()', () => {
    it('should strip common Sanity editor trailing artefacts', () => {
      expect(sanitizeTitle('This is a title".')).toBe('This is a title');
      expect(sanitizeTitle('Automation is Key).')).toBe('Automation is Key');
      expect(sanitizeTitle('Simple clean title')).toBe('Simple clean title');
    });
  });

  describe('parseFrontmatter()', () => {
    it('should parse valid YAML-like frontmatter blocks', () => {
      const rawContent = `---
title: "My Markdown Post"
date: 2026-06-03
author: Test Writer
tags:
  - Automation
  - SaaS
---
This is the post body.`;
      
      const { frontmatter, body } = parseFrontmatter(rawContent);
      expect(frontmatter.title).toBe('My Markdown Post');
      expect(frontmatter.author).toBe('Test Writer');
      expect(frontmatter.tags).toEqual(['Automation', 'SaaS']);
      expect(body).toBe('This is the post body.');
    });

    it('should return empty frontmatter if separators are missing', () => {
      const rawContent = 'Just pure body text without frontmatter';
      const { frontmatter, body } = parseFrontmatter(rawContent);
      expect(frontmatter).toEqual({});
      expect(body).toBe(rawContent);
    });
  });

  describe('parseMarkdownBodyToSections()', () => {
    it('should parse markdown headers and custom React component embeds', () => {
      const body = `## Introduction
This is an intro line.

* Bullet 1
* Bullet 2

<Example text="Visual code automation example" />
<Highlight text="Crucial takeaway text" />`;

      const sections = parseMarkdownBodyToSections(body);
      expect(sections.length).toBe(1);
      expect(sections[0].heading).toBe('Introduction');
      expect(sections[0].content).toContain('This is an intro line.');
      expect(sections[0].list).toEqual(['Bullet 1', 'Bullet 2']);
      expect(sections[0].example).toBe('Visual code automation example');
      expect(sections[0].highlight).toBe('Crucial takeaway text');
    });
  });

  describe('allBlogPosts list load validation', () => {
    it('should load list of posts containing default elements', () => {
      expect(allBlogPosts.length).toBeGreaterThan(0);
      const post = allBlogPosts[0];
      expect(post).toHaveProperty('id');
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('author');
      expect(post).toHaveProperty('date');
    });
  });
});
