#!/usr/bin/env node
/**
 * Script para convertir archivos .js de datos a .json
 * Mantiene exactamente los mismos datos, solo cambia el formato
 */

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data');
const files = [
  'hero.js',
  'about.js',
  'faq.js',
  'contact.js',
  '404.js',
  'HowItWorks.js',
  'footer.js',
  'terms.js',
  'privacy.js'
];

console.log('🔄 Convirtiendo archivos .js a .json...\n');

files.forEach(filename => {
  const jsPath = path.join(dataDir, filename);
  const jsonPath = path.join(dataDir, filename.replace('.js', '.json'));
  
  if (!fs.existsSync(jsPath)) {
    console.log(`⚠️  ${filename} no encontrado, saltando...`);
    return;
  }
  
  // Si el JSON ya existe, saltarlo
  if (fs.existsSync(jsonPath)) {
    console.log(`⏭️  ${filename.replace('.js', '.json')} ya existe, saltando...`);
    return;
  }
  
  try {
    // Leer el archivo JS
    const jsContent = fs.readFileSync(jsPath, 'utf8');
    
    // Extraer el objeto exportado
    const exportMatch = jsContent.match(/export const (\w+) = ({[\s\S]*});?\s*$/);
    if (!exportMatch) {
      console.log(`❌ No se pudo parsear ${filename}`);
      return;
    }
    
    let objStr = exportMatch[2].trim();
    
    // Remover comentarios de línea (//) - pero mantenerlos si están dentro de strings
    objStr = objStr.replace(/\/\/[^\n]*/g, '');
    
    // Convertir template literals a strings JSON
    objStr = objStr.replace(/`([^`]*)`/g, (match, content) => {
      // Escapar comillas y saltos de línea para JSON
      return JSON.stringify(content);
    });
    
    // Remover comas finales antes de }
    objStr = objStr.replace(/,(\s*[}\]])/g, '$1');
    
    // Evaluar el objeto (cuidado: solo para datos estáticos)
    const obj = eval('(' + objStr + ')');
    
    // Escribir como JSON
    fs.writeFileSync(jsonPath, JSON.stringify(obj, null, 2), 'utf8');
    
    console.log(`✅ ${filename} → ${filename.replace('.js', '.json')}`);
  } catch (error) {
    console.error(`❌ Error procesando ${filename}:`, error.message);
    // Intentar método alternativo para about.js y footer.js
    if (filename === 'about.js' || filename === 'footer.js') {
      try {
        // Método alternativo: usar un contexto aislado
        const vm = require('vm');
        const context = {};
        vm.createContext(context);
        const code = jsContent.replace('export const', 'context.');
        vm.runInContext(code, context);
        const obj = context[filename.replace('.js', '')];
        if (obj) {
          fs.writeFileSync(jsonPath, JSON.stringify(obj, null, 2), 'utf8');
          console.log(`✅ ${filename} → ${filename.replace('.js', '.json')} (método alternativo)`);
        }
      } catch (e2) {
        console.error(`❌ Error en método alternativo para ${filename}:`, e2.message);
      }
    }
  }
});

console.log('\n🎉 Conversión completada!');
