// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  build: {
    // Habilitar minificación ultra-agresiva
    inlineStylesheets: 'auto'
  },
  vite: {
    preview: {
      allowedHosts: ['facturea-landing.nataliadelgado.dev']
    },
    server: {
      allowedHosts: ['facturea-landing.nataliadelgado.dev']
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
      // Optimizaciones de build ultra-agresivas
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
          passes: 3, // Aumentado de 2
          unsafe: true,
          unsafe_comps: true,
          unsafe_Function: true,
          unsafe_math: true,
          unsafe_proto: true,
          unsafe_regexp: true,
          unsafe_undefined: true,
          dead_code: true,
          evaluate: true,
          hoist_funs: true,
          hoist_props: true,
          hoist_vars: true,
          if_return: true,
          join_vars: true,
          loops: true,
          properties: true,
          sequences: true,
          side_effects: true,
          toplevel: true,
          typeofs: true,
          unused: true
        },
        mangle: {
          toplevel: true,
          eval: true,
          keep_fnames: false,
          reserved: []
        },
        format: {
          comments: false,
          beautify: false
        }
      },
      // Optimizaciones de chunking
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            // Separar librerías grandes
            gsap: ['gsap'],
            lenis: ['lenis'],
            // Separar componentes por funcionalidad
            animations: ['/src/scripts/optimized-animations.js'],
            progressive: ['/src/scripts/progressive-reveal.js']
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
    },
    esbuild: {
      drop: ['console', 'debugger'],
      legalComments: 'none',
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true
    }
  }
});