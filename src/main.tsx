import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Handle dynamic import failures (ChunkLoadError) gracefully on new deploys
window.addEventListener('vite:preloadError', (event) => {
  console.warn('[App] Dynamic asset load failed (new deploy detected). Reloading page...', event);
  window.location.reload();
});

// Register service worker for PWA support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register('/sw.js');
    } catch (err) {
      console.warn('[App] Service worker registration failed:', err);
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
