import { useEffect } from 'react';
import { FAQType } from '../data/blogData';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  type?: 'website' | 'article' | 'profile';
  canonical?: string;
  /** Pass true on the Home and About pages to inject JSON-LD Person schema */
  withPersonSchema?: boolean;
  faqSchema?: FAQType[];
}

const BASE_URL = 'https://emmanuelodebiyi.name.ng';
const DEFAULT_IMAGE = `${BASE_URL}/og-social.png`;

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let meta = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attr, key);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function setJsonLd(id: string, data: object) {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Emmanuel Odebiyi',
  url: BASE_URL,
  jobTitle: 'Content Marketing Automation Specialist & SEO Strategist',
  description:
    'I build automated content marketing systems and technical SEO strategies for high-growth B2B SaaS and agency brands to scale organic traffic and reclaim hours.',
  sameAs: [
    'https://x.com/emmanuelodebiy',
    'https://www.linkedin.com/in/emmanuel-odebiyi/',
    'https://www.instagram.com/emmanuel_odebiyi/',
  ],
  knowsAbout: [
    'Content Marketing Automation',
    'Search Engine Optimization (SEO)',
    'Workflow Automation',
    'B2B SaaS Growth',
    'Generative Engine Optimization (GEO)',
    'API Integration',
  ],
  image: DEFAULT_IMAGE,
};

export function SEO({
  title,
  description,
  keywords,
  ogImage = DEFAULT_IMAGE,
  ogUrl,
  type = 'website',
  canonical,
  withPersonSchema = false,
  faqSchema,
}: SEOProps) {
  useEffect(() => {
    const pageUrl = ogUrl ?? `${BASE_URL}${window.location.pathname}`;
    const canonicalUrl = canonical ?? pageUrl;

    // ── Primary ──────────────────────────────────────────────────────────────
    document.title = title;
    setMeta('name', 'description', description);
    if (keywords) setMeta('name', 'keywords', keywords);

    // ── Canonical ─────────────────────────────────────────────────────────────
    setLink('canonical', canonicalUrl);

    // ── Open Graph ───────────────────────────────────────────────────────────
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:url', pageUrl);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:site_name', 'Emmanuel Odebiyi');
    setMeta('property', 'og:locale', 'en_US');

    // ── Twitter Card ─────────────────────────────────────────────────────────
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:site', '@emmanuelodebiy');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);

    // ── JSON-LD ──────────────────────────────────────────────────────────────
    if (withPersonSchema) {
      setJsonLd('json-ld-person', PERSON_SCHEMA);
    }

    if (faqSchema && faqSchema.length > 0) {
      const faqLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqSchema.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      };
      setJsonLd('json-ld-faq', faqLd);
    } else {
      const existing = document.getElementById('json-ld-faq');
      if (existing) existing.remove();
    }
  }, [title, description, keywords, ogImage, ogUrl, type, canonical, withPersonSchema, faqSchema]);

  return null;
}
