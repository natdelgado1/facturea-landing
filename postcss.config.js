module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? {
      '@fullhuman/postcss-purgecss': {
        content: [
          './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
          './src/**/*.astro'
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: ['html', 'body', 'astro-*']
      },
      cssnano: {
        preset: ['default', {
          discardComments: { removeAll: true },
          normalizeWhitespace: true,
          colormin: true,
          minifyFontValues: true,
          minifySelectors: true,
          mergeLonghand: true,
          mergeRules: true
        }]
      }
    } : {})
  }
} 