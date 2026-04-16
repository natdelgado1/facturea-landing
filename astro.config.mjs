// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [tailwind()],
  build: {
    // Habilitar minificación ultra-agresiva
    // Inline CSS pequeño automáticamente, archivos grandes se cargan normalmente
    inlineStylesheets: 'auto'
  },
  vite: {
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname
      }
    },
    preview: {
      allowedHosts: ['facturea-landing.nataliadelgado.dev',"facturea.io","www.facturea.io"]
    },
    server: {
      allowedHosts: ['facturea-landing.nataliadelgado.dev',"facturea.io","www.facturea.io"]
    },
    css: {
      // Optimización de CSS ultra-agresiva
      postcss: {
        plugins: [
          autoprefixer,
          cssnano({
            preset: ['default', {
              discardComments: {
                removeAll: true,
              },
              normalizeWhitespace: true,
              colormin: true,
              minifyFontValues: true,
              minifySelectors: true,
              mergeRules: true,
              mergeLonghand: true,
              mergeIdents: true,
              zindex: false,
              discardUnused: true,
              discardDuplicates: true,
              discardEmpty: true,
              reduceIdents: false,
              reduceInitial: true,
              reduceTransforms: true,
              uniqueSelectors: true,
              // Optimizaciones adicionales ultra-agresivas
              discardOverridden: true,
              normalizeCharset: true,
              normalizeDisplayValues: true,
              normalizePositions: true,
              normalizeRepeatStyle: true,
              normalizeString: true,
              normalizeTimingFunctions: true,
              normalizeUnicode: true,
              normalizeUrl: true,
              orderedValues: true
            }]
          })
        ]
      }
    },
    build: {
      // Mantener optimizaciones seguras para evitar romper el bundle server
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            // Separar librerías grandes
            gsap: ['gsap'],
            lenis: ['lenis']
            // Nota: Los scripts en public/scripts/ se sirven como archivos estáticos
            // y no necesitan ser incluidos en manualChunks
          }
        }
      }
    },
    optimizeDeps: {
      // Optimizar dependencias ultra-agresivamente
      include: ['gsap', 'lenis'],
      exclude: ['astro'],
      force: true
    },
    // Optimizaciones adicionales
    define: {
      'process.env.NODE_ENV': '"production"'
    }
  }
});