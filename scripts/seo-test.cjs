#!/usr/bin/env node

/**
 * 🔍 FACTUREA SEO TESTING SUITE
 * Herramienta completa para testear SEO en desarrollo y producción
 */

const fs = require('fs');
const path = require('path');

// Configuración de URLs para testing
const URLS = {
  development: 'http://localhost:4321',
  production: 'https://facturea.io'
};

// Páginas a testear
const PAGES = [
  { path: '/', name: 'Inicio' },
  { path: '/terminos', name: 'Términos ES' },
  { path: '/privacidad', name: 'Privacidad ES' },
  { path: '/es/terminos', name: 'Términos ES (ruta es/)' },
  { path: '/es/privacidad', name: 'Privacidad ES (ruta es/)' },
  { path: '/en/terms', name: 'Terms EN' },
  { path: '/en/privacy', name: 'Privacy EN' }
];

// Configuración de tests SEO
const SEO_TESTS = {
  title: {
    required: true,
    minLength: 30,
    maxLength: 60,
    shouldContain: ['Facturea']
  },
  description: {
    required: true,
    minLength: 120,
    maxLength: 160,
    shouldContain: ['Paraguay', 'facturas']
  },
  keywords: {
    required: true,
    shouldContain: ['factoring', 'Paraguay']
  },
  openGraph: {
    required: ['og:title', 'og:description', 'og:type', 'og:url'],
    optional: ['og:image', 'og:site_name']
  },
  technical: {
    lang: true,
    viewport: true,
    charset: true,
    canonical: false // No requerido para sitio estático simple
  }
};

class FactureaSEOTester {
  constructor(environment = 'development') {
    this.baseUrl = URLS[environment];
    this.environment = environment;
    this.results = {};
    this.errors = [];
    this.warnings = [];
  }

  /**
   * 🎯 MÉTODO PRINCIPAL - Ejecutar todos los tests
   */
  async runAllTests() {
    console.log(`\n🔍 INICIANDO TESTS SEO PARA FACTUREA (${this.environment.toUpperCase()})`);
    console.log(`📍 Base URL: ${this.baseUrl}`);
    console.log('=' .repeat(60));

    for (const page of PAGES) {
      console.log(`\n📄 Testeando: ${page.name} (${page.path})`);
      
      try {
        const result = await this.testPage(page);
        this.results[page.path] = result;
        this.printPageResults(page, result);
      } catch (error) {
        console.error(`❌ Error testeando ${page.path}:`, error.message);
        this.errors.push(`${page.path}: ${error.message}`);
      }
    }

    this.printSummary();
    return this.generateReport();
  }

  /**
   * 🧪 Testear una página específica
   */
  async testPage(page) {
    const url = `${this.baseUrl}${page.path}`;
    
    try {
      // Para testing local, leer archivos directamente
      if (this.environment === 'development') {
        return this.testLocalPage(page);
      } else {
        return this.testRemotePage(url);
      }
    } catch (error) {
      throw new Error(`No se pudo testear ${url}: ${error.message}`);
    }
  }

  /**
   * 📁 Testear página local (desarrollo)
   */
  testLocalPage(page) {
    const filePaths = this.getLocalFilePaths(page.path);
    let content = '';
    
    for (const filePath of filePaths) {
      if (fs.existsSync(filePath)) {
        content = fs.readFileSync(filePath, 'utf8');
        break;
      }
    }

    if (!content) {
      throw new Error(`No se encontró archivo para ${page.path}`);
    }

    return this.analyzeSEO(content, page);
  }

  /**
   * 🌐 Testear página remota (producción)
   */
  async testRemotePage(url) {
    // Para Node.js nativo, usamos fetch si está disponible o sugerimos alternativas
    if (typeof fetch === 'undefined') {
      console.log('⚠️  Para testing de producción, instala node-fetch: npm install node-fetch');
      console.log(`🔗 Testea manualmente: ${url}`);
      return this.createMockResult('No se pudo hacer fetch automático');
    }

    const response = await fetch(url);
    const content = await response.text();
    return this.analyzeSEO(content, { path: url });
  }

  /**
   * 📂 Obtener rutas de archivos locales
   */
  getLocalFilePaths(pagePath) {
    const basePath = path.join(__dirname, '..', 'src', 'pages');
    
    if (pagePath === '/') {
      return [path.join(basePath, 'index.astro')];
    }

    const cleanPath = pagePath.replace(/^\//, '').replace(/\/$/, '');
    
    return [
      path.join(basePath, `${cleanPath}.astro`),
      path.join(basePath, cleanPath, 'index.astro'),
      path.join(basePath, `${cleanPath}`, `${path.basename(cleanPath)}.astro`)
    ];
  }

  /**
   * 🔬 Analizar SEO del contenido HTML
   */
  analyzeSEO(html, page) {
    const result = {
      page: page.path,
      score: 0,
      maxScore: 0,
      tests: {},
      issues: [],
      recommendations: []
    };

    // Test: Title
    result.tests.title = this.testTitle(html);
    
    // Test: Meta Description
    result.tests.description = this.testDescription(html);
    
    // Test: Keywords
    result.tests.keywords = this.testKeywords(html);
    
    // Test: Open Graph
    result.tests.openGraph = this.testOpenGraph(html);
    
    // Test: Technical SEO
    result.tests.technical = this.testTechnical(html);

    // Calcular score
    this.calculateScore(result);
    
    return result;
  }

  /**
   * 📝 Test: Title Tag
   */
  testTitle(html) {
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/is);
    const title = titleMatch ? titleMatch[1].trim().replace(/\s+/g, ' ') : '';

    const test = {
      name: 'Title Tag',
      passed: false,
      score: 0,
      maxScore: 20,
      details: {}
    };

    if (!title) {
      test.details.error = 'No se encontró title tag';
      return test;
    }

    test.details.title = title;
    test.details.length = title.length;

    // Verificaciones
    const checks = {
      exists: title.length > 0,
      minLength: title.length >= SEO_TESTS.title.minLength,
      maxLength: title.length <= SEO_TESTS.title.maxLength,
      containsKeywords: SEO_TESTS.title.shouldContain.some(keyword => 
        title.toLowerCase().includes(keyword.toLowerCase())
      )
    };

    test.details.checks = checks;
    
    const passedChecks = Object.values(checks).filter(Boolean).length;
    test.score = Math.round((passedChecks / Object.keys(checks).length) * test.maxScore);
    test.passed = passedChecks === Object.keys(checks).length;

    return test;
  }

  /**
   * 📄 Test: Meta Description
   */
  testDescription(html) {
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*?)["']/i);
    const description = descMatch ? descMatch[1].trim() : '';

    const test = {
      name: 'Meta Description',
      passed: false,
      score: 0,
      maxScore: 20,
      details: {}
    };

    if (!description) {
      test.details.error = 'No se encontró meta description';
      return test;
    }

    test.details.description = description;
    test.details.length = description.length;

    const checks = {
      exists: description.length > 0,
      minLength: description.length >= SEO_TESTS.description.minLength,
      maxLength: description.length <= SEO_TESTS.description.maxLength,
      containsKeywords: SEO_TESTS.description.shouldContain.some(keyword => 
        description.toLowerCase().includes(keyword.toLowerCase())
      )
    };

    test.details.checks = checks;
    
    const passedChecks = Object.values(checks).filter(Boolean).length;
    test.score = Math.round((passedChecks / Object.keys(checks).length) * test.maxScore);
    test.passed = passedChecks === Object.keys(checks).length;

    return test;
  }

  /**
   * 🏷️ Test: Keywords
   */
  testKeywords(html) {
    const keywordsMatch = html.match(/<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']*?)["']/i);
    const keywords = keywordsMatch ? keywordsMatch[1].trim() : '';

    const test = {
      name: 'Meta Keywords',
      passed: false,
      score: 0,
      maxScore: 10,
      details: {}
    };

    if (!keywords) {
      test.details.warning = 'Meta keywords no encontrado (opcional en SEO moderno)';
      test.score = 5; // Puntuación parcial ya que no es crítico
      return test;
    }

    test.details.keywords = keywords;
    
    const checks = {
      exists: keywords.length > 0,
      containsRequired: SEO_TESTS.keywords.shouldContain.every(keyword => 
        keywords.toLowerCase().includes(keyword.toLowerCase())
      )
    };

    test.details.checks = checks;
    
    const passedChecks = Object.values(checks).filter(Boolean).length;
    test.score = Math.round((passedChecks / Object.keys(checks).length) * test.maxScore);
    test.passed = passedChecks === Object.keys(checks).length;

    return test;
  }

  /**
   * 📱 Test: Open Graph
   */
  testOpenGraph(html) {
    const test = {
      name: 'Open Graph Tags',
      passed: false,
      score: 0,
      maxScore: 15,
      details: { found: {}, missing: [] }
    };

    for (const ogTag of SEO_TESTS.openGraph.required) {
      const pattern = new RegExp(`<meta[^>]*property=["']${ogTag}["'][^>]*content=["']([^"']*?)["']`, 'i');
      const match = html.match(pattern);
      
      if (match) {
        test.details.found[ogTag] = match[1];
      } else {
        test.details.missing.push(ogTag);
      }
    }

    const foundCount = Object.keys(test.details.found).length;
    const totalRequired = SEO_TESTS.openGraph.required.length;
    
    test.score = Math.round((foundCount / totalRequired) * test.maxScore);
    test.passed = foundCount === totalRequired;

    return test;
  }

  /**
   * ⚙️ Test: Technical SEO
   */
  testTechnical(html) {
    const test = {
      name: 'Technical SEO',
      passed: false,
      score: 0,
      maxScore: 15,
      details: { checks: {} }
    };

    // Check lang attribute
    test.details.checks.lang = /<html[^>]*lang=["'][^"']+["']/i.test(html);
    
    // Check viewport
    test.details.checks.viewport = /<meta[^>]*name=["']viewport["']/i.test(html);
    
    // Check charset
    test.details.checks.charset = /<meta[^>]*charset=/i.test(html);

    const passedChecks = Object.values(test.details.checks).filter(Boolean).length;
    const totalChecks = Object.keys(test.details.checks).length;
    
    test.score = Math.round((passedChecks / totalChecks) * test.maxScore);
    test.passed = passedChecks === totalChecks;

    return test;
  }

  /**
   * 📊 Calcular score total
   */
  calculateScore(result) {
    result.score = Object.values(result.tests).reduce((total, test) => total + test.score, 0);
    result.maxScore = Object.values(result.tests).reduce((total, test) => total + test.maxScore, 0);
    result.percentage = Math.round((result.score / result.maxScore) * 100);
  }

  /**
   * 🖨️ Imprimir resultados de página
   */
  printPageResults(page, result) {
    const percentage = result.percentage;
    let emoji = '❌';
    if (percentage >= 90) emoji = '🟢';
    else if (percentage >= 70) emoji = '🟡';
    else if (percentage >= 50) emoji = '🟠';

    console.log(`${emoji} Score: ${result.score}/${result.maxScore} (${percentage}%)`);
    
    for (const [testName, test] of Object.entries(result.tests)) {
      const icon = test.passed ? '✅' : '❌';
      console.log(`  ${icon} ${test.name}: ${test.score}/${test.maxScore}`);
      
      if (test.details.error) {
        console.log(`    ⚠️  ${test.details.error}`);
      }
      if (test.details.warning) {
        console.log(`    ⚡ ${test.details.warning}`);
      }
    }
  }

  /**
   * 📋 Imprimir resumen final
   */
  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 RESUMEN FINAL');
    console.log('='.repeat(60));

    const totalPages = Object.keys(this.results).length;
    const scores = Object.values(this.results).map(r => r.percentage);
    const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;

    console.log(`📄 Páginas analizadas: ${totalPages}`);
    console.log(`📊 Score promedio: ${Math.round(averageScore)}%`);
    
    if (this.errors.length > 0) {
      console.log(`❌ Errores: ${this.errors.length}`);
      this.errors.forEach(error => console.log(`  - ${error}`));
    }

    // Recomendaciones generales
    console.log('\n💡 RECOMENDACIONES PRINCIPALES:');
    console.log('1. 🔗 Implementar sitemap.xml ✅ (Ya implementado)');
    console.log('2. 🤖 Agregar robots.txt ✅ (Ya implementado)');
    console.log('3. 🖼️  Agregar og:image para mejor compartir en redes');
    console.log('4. 📱 Verificar que todas las páginas tengan hreflang (sitio multiidioma)');
    console.log('5. 🚀 Configurar Google Search Console');
  }

  /**
   * 📄 Generar reporte en archivo
   */
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      environment: this.environment,
      baseUrl: this.baseUrl,
      summary: {
        totalPages: Object.keys(this.results).length,
        averageScore: Math.round(
          Object.values(this.results).reduce((sum, r) => sum + r.percentage, 0) / 
          Object.keys(this.results).length
        ),
        errors: this.errors.length,
        warnings: this.warnings.length
      },
      results: this.results,
      errors: this.errors,
      warnings: this.warnings
    };

    const reportPath = path.join(__dirname, `seo-report-${this.environment}-${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log(`\n📁 Reporte guardado en: ${reportPath}`);
    
    return report;
  }

  /**
   * 🔧 Crear resultado mock para casos donde no se puede hacer fetch
   */
  createMockResult(reason) {
    return {
      page: 'N/A',
      score: 0,
      maxScore: 100,
      tests: {},
      issues: [reason],
      recommendations: ['Instalar node-fetch para testing automático de producción']
    };
  }
}

// 🚀 EJECUTAR TESTS
async function main() {
  const args = process.argv.slice(2);
  const environment = args.includes('--prod') ? 'production' : 'development';
  
  console.log('🔍 FACTUREA SEO TESTER');
  console.log('Uso: node seo-test.cjs [--prod]');
  console.log('  --prod: Testear en producción (requiere sitio desplegado)');
  
  const tester = new FactureaSEOTester(environment);
  await tester.runAllTests();
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main().catch(console.error);
}

module.exports = FactureaSEOTester;
