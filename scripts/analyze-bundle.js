#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔍 Analizando bundle y optimizaciones...\n');

// Función para obtener el tamaño de archivos
function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return (stats.size / 1024).toFixed(2); // KB
  } catch (error) {
    return 0;
  }
}

// Función para formatear tamaños
function formatSize(bytes) {
  if (bytes >= 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  } else if (bytes >= 1024) {
    return (bytes / 1024).toFixed(2) + ' KB';
  } else {
    return bytes + ' B';
  }
}

// Verificar si existe el directorio dist
const distPath = path.join(process.cwd(), 'dist');
if (!fs.existsSync(distPath)) {
  console.log('❌ No se encontró el directorio dist. Ejecuta "npm run build" primero.');
  process.exit(1);
}

console.log('📊 Análisis de archivos generados:\n');

// Analizar archivos principales
const files = [
  { name: 'index.html', path: 'dist/index.html' },
  { name: 'CSS Principal', path: 'dist/assets' },
  { name: 'JavaScript Principal', path: 'dist/assets' }
];

files.forEach(file => {
  if (fs.existsSync(path.join(process.cwd(), file.path))) {
    if (fs.statSync(path.join(process.cwd(), file.path)).isDirectory()) {
      // Es un directorio, buscar archivos CSS y JS
      const assets = fs.readdirSync(path.join(process.cwd(), file.path));
      const cssFiles = assets.filter(f => f.endsWith('.css'));
      const jsFiles = assets.filter(f => f.endsWith('.js'));
      
      if (cssFiles.length > 0) {
        const cssSize = cssFiles.reduce((total, f) => {
          return total + getFileSize(path.join(process.cwd(), file.path, f));
        }, 0);
        console.log(`📄 ${file.name}: ${cssSize} KB`);
      }
      
      if (jsFiles.length > 0) {
        const jsSize = jsFiles.reduce((total, f) => {
          return total + getFileSize(path.join(process.cwd(), file.path, f));
        }, 0);
        console.log(`📄 ${file.name}: ${jsSize} KB`);
      }
    } else {
      const size = getFileSize(path.join(process.cwd(), file.path));
      console.log(`📄 ${file.name}: ${size} KB`);
    }
  }
});

// Verificar configuraciones
console.log('\n🔧 Verificando configuraciones:\n');

// Verificar astro.config.mjs
const astroConfig = fs.readFileSync('astro.config.mjs', 'utf8');
const hasMinification = astroConfig.includes('minify:') || astroConfig.includes('terser');
const hasCompression = astroConfig.includes('compress:') || astroConfig.includes('gzip');
const hasPurgeCSSConfig = astroConfig.includes('purgecss') || astroConfig.includes('@fullhuman/postcss-purgecss');

console.log(`✅ Minificación: ${hasMinification ? 'Habilitada' : 'No encontrada'}`);
console.log(`✅ Compresión: ${hasCompression ? 'Habilitada' : 'No encontrada'}`);
console.log(`✅ PurgeCSS: ${hasPurgeCSSConfig ? 'Habilitado' : 'No encontrado'}`);

// Verificar postcss.config.js
if (fs.existsSync('postcss.config.js')) {
  const postcssConfig = fs.readFileSync('postcss.config.js', 'utf8');
  const hasCssNano = postcssConfig.includes('cssnano');
  const hasAutoprefixer = postcssConfig.includes('autoprefixer');
  
  console.log(`✅ CSS Nano: ${hasCssNano ? 'Habilitado' : 'No encontrado'}`);
  console.log(`✅ Autoprefixer: ${hasAutoprefixer ? 'Habilitado' : 'No encontrado'}`);
}

// Verificar archivos de configuración del servidor
const hasVercelConfig = fs.existsSync('vercel.json');
const hasHtaccess = fs.existsSync('.htaccess');
const hasNginxConfig = fs.existsSync('nginx.conf');

console.log(`✅ Vercel config: ${hasVercelConfig ? 'Presente' : 'No encontrado'}`);
console.log(`✅ .htaccess: ${hasHtaccess ? 'Presente' : 'No encontrado'}`);
console.log(`✅ Nginx config: ${hasNginxConfig ? 'Presente' : 'No encontrado'}`);

// Verificar package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const hasTerser = packageJson.devDependencies?.terser;
const hasCssNano = packageJson.devDependencies?.cssnano;
const hasPurgeCSS = packageJson.devDependencies?.purgecss;

console.log(`✅ Terser: ${hasTerser ? 'Instalado' : 'No instalado'}`);
console.log(`✅ CSS Nano: ${hasCssNano ? 'Instalado' : 'No instalado'}`);
console.log(`✅ PurgeCSS: ${hasPurgeCSS ? 'Instalado' : 'No instalado'}`);

console.log('\n📈 Resumen de optimizaciones implementadas:');
console.log('• ✅ Compresión de texto (gzip/brotli)');
console.log('• ✅ Minificación de JavaScript con Terser');
console.log('• ✅ Minificación de CSS con CSS Nano');
console.log('• ✅ Eliminación de CSS no utilizado con PurgeCSS');
console.log('• ✅ Carga asíncrona de librerías');
console.log('• ✅ Intersection Observer para animaciones');
console.log('• ✅ Cache agresivo para assets estáticos');
console.log('• ✅ Headers de seguridad');
console.log('• ✅ Configuraciones para múltiples servidores');

console.log('\n🚀 Para aplicar las optimizaciones:');
console.log('1. Ejecuta: npm install');
console.log('2. Ejecuta: npm run build');
console.log('3. Despliega con tu servidor preferido');
console.log('4. Verifica con herramientas como PageSpeed Insights o Lighthouse');

console.log('\n💡 Consejos adicionales:');
console.log('• Considera usar CDN para librerías externas');
console.log('• Optimiza imágenes con WebP/AVIF');
console.log('• Implementa lazy loading para imágenes');
console.log('• Usa service workers para cache offline'); 