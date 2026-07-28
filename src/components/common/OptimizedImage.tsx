import React from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  fetchPriority?: 'high' | 'low' | 'auto';
  decoding?: 'async' | 'auto' | 'sync';
  loading?: 'lazy' | 'eager';
}

/**
 * OptimizedImage component that serves:
 * 1. AVIF format (forefront - best compression)
 * 2. WebP format (fallback)
 * 3. Original PNG/JPG/JPEG (fallback of fallback)
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  fetchPriority,
  decoding = 'async',
  loading,
  ...props
}) => {
  // Extract base path without extension
  const match = src.match(/^(.*)\.(png|jpg|jpeg)$/i);

  if (!match) {
    // If not png/jpg/jpeg (e.g. svg), render standard img tag
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        fetchPriority={fetchPriority}
        decoding={decoding}
        loading={loading}
        {...props}
      />
    );
  }

  const basePath = match[1];
  const avifSrc = `${basePath}.avif`;
  const webpSrc = `${basePath}.webp`;

  return (
    <picture>
      <source srcSet={avifSrc} type="image/avif" />
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        fetchPriority={fetchPriority}
        decoding={decoding}
        loading={loading}
        {...props}
      />
    </picture>
  );
};
