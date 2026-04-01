/**
 * SkipLink — accessibility component that lets keyboard users skip
 * straight to the main content, bypassing the navigation.
 *
 * Usage: render <SkipLink /> as the very first child of <body> (i.e. at the
 * top of App.tsx), and add id="main-content" to your <main> element.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
      style={{
        position: 'fixed',
        top: '-100%',
        left: '1rem',
        zIndex: 9999,
        padding: '0.75rem 1.5rem',
        background: '#0a0a0a',
        color: '#f8f8f6',
        borderRadius: '0 0 8px 8px',
        fontWeight: 600,
        fontSize: '0.9rem',
        textDecoration: 'none',
        transition: 'top 0.2s ease',
        outline: '2px solid #3b82f6',
        outlineOffset: '2px',
      }}
      onFocus={(e) => {
        (e.currentTarget as HTMLElement).style.top = '0';
      }}
      onBlur={(e) => {
        (e.currentTarget as HTMLElement).style.top = '-100%';
      }}
    >
      Skip to main content
    </a>
  );
}
