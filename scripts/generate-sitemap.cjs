#!/usr/bin/env node

/**
 * 🗺️ GENERADOR DE SITEMAP PARA FACTUREA
 * Genera automáticamente sitemap.xml basado en las páginas del sitio
 */

const fs = require('fs');
const path = require('path');

// Configuración del sitemap
const SITE_CONFIG = {
  baseUrl: 'https://facturea.io',
  defaultChangefreq: 'monthly',
  defaultPriority: '0.7'
};

// Páginas estáticas del sitio
const STATIC_PAGES = [
  {
    url: '/',
    changefreq: 'weekly',
    priority: '1.0',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/terminos',
    changefreq: 'monthly',
    priority: '0.3',
    lastmod: '2024-01-01'
  },
  {
    url: '/privacidad', 
    changefreq: 'monthly',
    priority: '0.3',
    lastmod: '2024-01-01'
  },
  {
    url: '/es/terminos',
    changefreq: 'monthly',
    priority: '0.3',
    lastmod: '2024-01-01'
  },
  {
    url: '/es/privacidad',
    changefreq: 'monthly', 
    priority: '0.3',
    lastmod: '2024-01-01'
  },
  {
    url: '/en/terms',
    changefreq: 'monthly',
    priority: '0.5',
    lastmod: '2024-01-01'
  },
  {
    url: '/en/privacy',
    changefreq: 'monthly',
    priority: '0.5', 
    lastmod: '2024-01-01'
  }
];

class SitemapGenerator {
  constructor() {
    this.pages = [...STATIC_PAGES];
  }

  /**
   * 🚀 Generar sitemap completo
   */
  generate() {
    console.log('🗺️ Generando sitemap para Facturea...');
    
    const sitemap = this.buildSitemapXML();
    const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
    
    fs.writeFileSync(outputPath, sitemap, 'utf8');
    
    console.log(`✅ Sitemap generado exitosamente: ${outputPath}`);
    console.log(`📄 ${this.pages.length} páginas incluidas`);
    
    // Generar también un index de sitemap legible
    this.generateSitemapIndex();
    
    return outputPath;
  }

  /**
   * 🏗️ Construir XML del sitemap
   */
  buildSitemapXML() {
    const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

    const urls = this.pages.map(page => this.buildURLEntry(page)).join('\n');
    
    const footer = `</urlset>`;
    
    return `${header}\n${urls}\n${footer}`;
  }

  /**
   * 🔗 Construir entrada individual de URL
   */
  buildURLEntry(page) {
    const url = `${SITE_CONFIG.baseUrl}${page.url}`;
    const lastmod = page.lastmod || new Date().toISOString().split('T')[0];
    const changefreq = page.changefreq || SITE_CONFIG.defaultChangefreq;
    const priority = page.priority || SITE_CONFIG.defaultPriority;
    
    let entry = `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>`;

    // Agregar hreflang para páginas multiidioma
    if (this.hasAlternateLanguages(page.url)) {
      entry += this.buildHreflangEntries(page.url);
    }

    entry += '\n  </url>';
    
    return entry;
  }

  /**
   * 🌐 Verificar si la página tiene versiones en otros idiomas
   */
  hasAlternateLanguages(url) {
    // Lógica para detectar si hay versiones en otros idiomas
    if (url === '/') return true; // Página principal tiene versiones
    if (url.startsWith('/es/')) return true;
    if (url.startsWith('/en/')) return true;
    
    // Verificar si existe equivalente en otros idiomas
    const hasES = this.pages.some(p => p.url === `/es${url}` || p.url === url.replace('/en/', '/es/'));
    const hasEN = this.pages.some(p => p.url === `/en${url}` || p.url === url.replace('/es/', '/en/'));
    
    return hasES || hasEN;
  }

  /**
   * 🔄 Construir entradas hreflang
   */
  buildHreflangEntries(url) {
    let hreflang = '';
    
    // Para la página principal
    if (url === '/') {
      hreflang += `\n    <xhtml:link rel="alternate" hreflang="es" href="${SITE_CONFIG.baseUrl}/" />`;
      hreflang += `\n    <xhtml:link rel="alternate" hreflang="en" href="${SITE_CONFIG.baseUrl}/en" />`;
      hreflang += `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_CONFIG.baseUrl}/" />`;
    }
    
    // Para páginas en español
    if (url.startsWith('/es/')) {
      const basePath = url.replace('/es', '');
      hreflang += `\n    <xhtml:link rel="alternate" hreflang="es" href="${SITE_CONFIG.baseUrl}${url}" />`;
      hreflang += `\n    <xhtml:link rel="alternate" hreflang="en" href="${SITE_CONFIG.baseUrl}/en${basePath}" />`;
    }
    
    // Para páginas en inglés
    if (url.startsWith('/en/')) {
      const basePath = url.replace('/en', '');
      hreflang += `\n    <xhtml:link rel="alternate" hreflang="en" href="${SITE_CONFIG.baseUrl}${url}" />`;
      hreflang += `\n    <xhtml:link rel="alternate" hreflang="es" href="${SITE_CONFIG.baseUrl}/es${basePath}" />`;
    }
    
    return hreflang;
  }

  /**
   * 📋 Generar índice legible del sitemap
   */
  generateSitemapIndex() {
    const indexContent = `# FACTUREA SITEMAP INDEX
# Generado automáticamente: ${new Date().toISOString()}

## Páginas incluidas en sitemap.xml:

${this.pages.map((page, index) => {
  const url = `${SITE_CONFIG.baseUrl}${page.url}`;
  return `${index + 1}. ${url}
   - Prioridad: ${page.priority}
   - Frecuencia: ${page.changefreq}
   - Última modificación: ${page.lastmod}`;
}).join('\n\n')}

## Información adicional:
- Total de páginas: ${this.pages.length}
- Sitemap URL: ${SITE_CONFIG.baseUrl}/sitemap.xml
- Robots.txt: ${SITE_CONFIG.baseUrl}/robots.txt

## Para desarrollo:
- Ejecutar: node scripts/generate-sitemap.cjs
- Validar sitemap: https://www.xml-sitemaps.com/validate-xml-sitemap.html
`;

    const indexPath = path.join(__dirname, 'sitemap-index.md');
    fs.writeFileSync(indexPath, indexContent, 'utf8');
    
    console.log(`📋 Índice del sitemap: ${indexPath}`);
  }
}

// 🚀 EJECUTAR GENERADOR
async function main() {
  const generator = new SitemapGenerator();
  
  generator.generate();
  
  console.log('\n✅ Sitemap generado exitosamente!');
  console.log('📝 Próximos pasos:');
  console.log('   1. Revisar public/sitemap.xml');
  console.log('   2. Subir a producción');
  console.log('   3. Enviar a Google Search Console');
  console.log('   4. Validar en: https://www.xml-sitemaps.com/validate-xml-sitemap.html');
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main().catch(console.error);
}

module.exports = SitemapGenerator;
