#!/usr/bin/env node

/**
 * 🚨 LIGHTHOUSE SEO AUTOMATION PARA FACTUREA
 * Script para ejecutar auditorías de Lighthouse automáticamente
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuración de Lighthouse
const LIGHTHOUSE_CONFIG = {
  output: ['html', 'json'],
  onlyCategories: ['seo', 'performance', 'accessibility'],
  chromeFlags: ['--headless', '--no-sandbox'],
  skipAudits: ['uses-http2'] // Auditorías que pueden no ser relevantes
};

// URLs a testear
const TEST_URLS = [
  { url: 'http://localhost:4321', name: 'home-dev' },
  { url: 'http://localhost:4321/terminos', name: 'terminos-dev' },
  { url: 'http://localhost:4321/privacidad', name: 'privacidad-dev' },
  { url: 'https://facturea.io', name: 'home-prod' },
  { url: 'https://facturea.io/terminos', name: 'terminos-prod' }
];

class LighthouseSEOTester {
  constructor() {
    this.outputDir = path.join(__dirname, '..', 'lighthouse-reports');
    this.ensureOutputDir();
  }

  /**
   * 📁 Asegurar que el directorio de reportes existe
   */
  ensureOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * 🚀 Ejecutar todos los tests
   */
  async runAllTests(environment = 'dev') {
    console.log('🚨 INICIANDO AUDITORÍAS LIGHTHOUSE PARA FACTUREA');
    console.log('=' .repeat(60));

    const urlsToTest = TEST_URLS.filter(item => 
      environment === 'dev' ? item.name.includes('dev') : item.name.includes('prod')
    );

    for (const testCase of urlsToTest) {
      console.log(`\n🔍 Analizando: ${testCase.url}`);
      
      try {
        await this.runLighthouse(testCase);
      } catch (error) {
        console.error(`❌ Error en ${testCase.url}:`, error.message);
      }
    }

    this.generateSummary();
  }

  /**
   * 🚨 Ejecutar Lighthouse para una URL
   */
  async runLighthouse(testCase) {
    return new Promise((resolve, reject) => {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const outputFile = path.join(this.outputDir, `${testCase.name}-${timestamp}`);
      
      const args = [
        testCase.url,
        '--output=html,json',
        `--output-path=${outputFile}`,
        '--only-categories=seo,performance,accessibility',
        '--chrome-flags="--headless --no-sandbox"',
        '--quiet'
      ];

      console.log(`   📊 Ejecutando Lighthouse...`);
      
      const lighthouse = spawn('npx', ['lighthouse', ...args], {
        stdio: ['inherit', 'pipe', 'pipe']
      });

      let output = '';
      let error = '';

      lighthouse.stdout.on('data', (data) => {
        output += data.toString();
      });

      lighthouse.stderr.on('data', (data) => {
        error += data.toString();
      });

      lighthouse.on('close', (code) => {
        if (code === 0) {
          console.log(`   ✅ Reporte generado: ${outputFile}.html`);
          this.parseLighthouseResults(`${outputFile}.json`, testCase);
          resolve();
        } else {
          console.error(`   ❌ Lighthouse falló con código: ${code}`);
          if (error) console.error(`   Error: ${error}`);
          reject(new Error(`Lighthouse failed with code ${code}`));
        }
      });

      lighthouse.on('error', (err) => {
        console.error(`   ❌ Error ejecutando Lighthouse: ${err.message}`);
        reject(err);
      });
    });
  }

  /**
   * 📊 Parsear resultados de Lighthouse
   */
  parseLighthouseResults(jsonPath, testCase) {
    try {
      if (!fs.existsSync(jsonPath)) {
        console.log(`   ⚠️ Archivo JSON no encontrado: ${jsonPath}`);
        return;
      }

      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      const categories = data.categories;

      console.log('   📈 Resultados:');
      
      if (categories.seo) {
        const seoScore = Math.round(categories.seo.score * 100);
        console.log(`      🔍 SEO: ${seoScore}%`);
      }
      
      if (categories.performance) {
        const perfScore = Math.round(categories.performance.score * 100);
        console.log(`      ⚡ Performance: ${perfScore}%`);
      }
      
      if (categories.accessibility) {
        const a11yScore = Math.round(categories.accessibility.score * 100);
        console.log(`      ♿ Accessibility: ${a11yScore}%`);
      }

      // Mostrar auditorías SEO específicas
      this.showSEOAudits(data);

    } catch (error) {
      console.error(`   ❌ Error parseando resultados: ${error.message}`);
    }
  }

  /**
   * 🔍 Mostrar auditorías SEO específicas
   */
  showSEOAudits(data) {
    const seoAudits = [
      'document-title',
      'meta-description', 
      'meta-viewport',
      'structured-data',
      'robots-txt',
      'canonical',
      'hreflang'
    ];

    console.log('   🔍 Auditorías SEO detalladas:');
    
    for (const auditId of seoAudits) {
      const audit = data.audits[auditId];
      if (audit) {
        const status = audit.score === 1 ? '✅' : audit.score === 0 ? '❌' : '⚠️';
        console.log(`      ${status} ${audit.title}`);
        
        if (audit.score !== 1 && audit.description) {
          console.log(`         💡 ${audit.description}`);
        }
      }
    }
  }

  /**
   * 📋 Generar resumen de todos los reportes
   */
  generateSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('📋 RESUMEN DE AUDITORÍAS LIGHTHOUSE');
    console.log('='.repeat(60));

    const reportFiles = fs.readdirSync(this.outputDir)
      .filter(file => file.endsWith('.html'))
      .sort()
      .slice(-10); // Últimos 10 reportes

    console.log(`📁 Reportes disponibles en: ${this.outputDir}`);
    console.log(`📊 Últimos reportes generados:`);
    
    reportFiles.forEach((file, index) => {
      console.log(`   ${index + 1}. ${file}`);
    });

    console.log('\n💡 RECOMENDACIONES:');
    console.log('1. 📊 Revisar reportes HTML para detalles completos');
    console.log('2. 🎯 Enfocar en auditorías SEO fallidas');
    console.log('3. ⚡ Optimizar métricas de performance que afectan SEO');
    console.log('4. 📱 Verificar responsive design y accessibility');
    console.log('5. 🔄 Ejecutar auditorías regularmente');

    // Crear script helper para abrir reportes
    this.createOpenReportsScript();
  }

  /**
   * 🖥️ Crear script para abrir reportes fácilmente
   */
  createOpenReportsScript() {
    const scriptContent = `#!/bin/bash

# Script para abrir reportes Lighthouse
# Uso: ./open-reports.sh [número] o ./open-reports.sh latest

REPORTS_DIR="${this.outputDir}"

if [ "$1" = "latest" ]; then
    LATEST=$(ls -t "$REPORTS_DIR"/*.html | head -n 1)
    echo "Abriendo reporte más reciente: $LATEST"
    open "$LATEST" 2>/dev/null || xdg-open "$LATEST" 2>/dev/null || start "$LATEST"
elif [ -n "$1" ]; then
    REPORT=$(ls -t "$REPORTS_DIR"/*.html | sed -n "${1}p")
    if [ -n "$REPORT" ]; then
        echo "Abriendo reporte #$1: $REPORT"
        open "$REPORT" 2>/dev/null || xdg-open "$REPORT" 2>/dev/null || start "$REPORT"
    else
        echo "Reporte #$1 no encontrado"
    fi
else
    echo "Reportes disponibles:"
    ls -t "$REPORTS_DIR"/*.html | nl
    echo ""
    echo "Uso: $0 [número] o $0 latest"
fi
`;

    const scriptPath = path.join(__dirname, 'open-reports.sh');
    fs.writeFileSync(scriptPath, scriptContent);
    
    // Hacer el script ejecutable en sistemas Unix
    try {
      fs.chmodSync(scriptPath, '755');
    } catch (e) {
      // Ignorar errores de chmod en Windows
    }

    console.log(`\n🖥️ Script creado: ${scriptPath}`);
    console.log('   Uso: ./scripts/open-reports.sh latest');
  }
}

// 🚀 EJECUTAR TESTS
async function main() {
  // Verificar si Lighthouse está instalado
  try {
    const { spawn } = require('child_process');
    const check = spawn('npx', ['lighthouse', '--version'], { stdio: 'ignore' });
    
    check.on('error', () => {
      console.error('❌ Lighthouse no está instalado');
      console.log('📦 Instalar con: npm install -g @lhci/cli lighthouse');
      process.exit(1);
    });
  } catch (error) {
    console.error('❌ Error verificando Lighthouse:', error.message);
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const environment = args.includes('--prod') ? 'prod' : 'dev';
  
  console.log('🚨 FACTUREA LIGHTHOUSE SEO TESTER');
  console.log('Uso: node lighthouse-seo.js [--prod]');
  console.log('  --prod: Testear en producción');
  console.log('  (default): Testear en desarrollo (localhost:4321)');
  
  if (environment === 'dev') {
    console.log('\n⚠️ Asegúrate de que el servidor de desarrollo esté corriendo:');
    console.log('   npm run dev');
  }

  const tester = new LighthouseSEOTester();
  await tester.runAllTests(environment);
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main().catch(console.error);
}

module.exports = LighthouseSEOTester;
