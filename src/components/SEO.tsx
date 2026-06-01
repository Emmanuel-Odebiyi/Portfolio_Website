import { useEffect } from 'react';

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
  jobTitle: 'Content Marketing Strategist',
  description:
    'I build automated content marketing systems for growing businesses — so you can publish consistently, rank higher, and generate revenue without burning out.',
  sameAs: [
    'https://twitter.com/emmanuelodebiyi',
    'https://linkedin.com/in/emmanuel-odebiyi',
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
    setMeta('name', 'twitter:site', '@emmanuelo_dev');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);

    // ── JSON-LD ──────────────────────────────────────────────────────────────
    if (withPersonSchema) {
      setJsonLd('json-ld-person', PERSON_SCHEMA);
    }
  }, [title, description, keywords, ogImage, ogUrl, type, canonical, withPersonSchema]);

  return null;
}
