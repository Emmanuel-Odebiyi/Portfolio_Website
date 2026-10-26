import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,svg,woff2}'],
          globIgnores: ['**/admin/**', 'admin/**'],
          runtimeCaching: [
            {
              urlPattern: /\.(?:webp|png|jpg|jpeg|gif)$/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'case-study-media',
                expiration: {
                  maxEntries: 60,
                  maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                },
              },
            },
            {
              urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'unsplash-images',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        manifest: {
          name: 'Emmanuel Odebiyi Portfolio',
          short_name: 'Emmanuel',
          description: 'Automated Content Marketing Systems',
          theme_color: '#f8fafc'
        }
      })
    ],
    publicDir: 'public',
    build: {
      target: 'esnext',
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-motion': ['framer-motion'],
            'vendor-charts': ['recharts'],
            'vendor-router': ['react-router-dom'],
            'vendor-icons': ['lucide-react', 'react-icons', '@heroicons/react'],
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
        'motion/react': 'framer-motion',
      },
      dedupe: ['react', 'react-dom', 'framer-motion'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'framer-motion', 'react-router-dom'],
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
