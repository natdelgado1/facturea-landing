#!/usr/bin/env node

/**
 * Script para verificar la configuración de variables de entorno
 * Uso: node scripts/check-env.js
 */

const fs = require('fs');
const path = require('path');

// Variables requeridas
const requiredVars = {
  // Variables privadas (solo servidor)
  private: [
    'EMAILJS_SERVICE_ID',
    'EMAILJS_TEMPLATE_ID', 
    'EMAILJS_PUBLIC_KEY',
    'RECAPTCHA_SITE_KEY'
  ],
  // Variables públicas (cliente)
  public: [
    'PUBLIC_GA_MEASUREMENT_ID',
    'PUBLIC_GTM_ID'
  ],
  // Variables opcionales
  optional: [
    'PUBLIC_HOTJAR_ID',
    'PUBLIC_FACEBOOK_PIXEL_ID'
  ]
};

// Colores para consola
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkEnvFile() {
  const envPath = path.join(process.cwd(), '.env');
  
  if (!fs.existsSync(envPath)) {
    log('❌ Archivo .env no encontrado', 'red');
    log('📝 Creando archivo .env de ejemplo...', 'yellow');
    
    const exampleEnv = `# EmailJS Configuration
EMAILJS_SERVICE_ID=service_2gdbb99
EMAILJS_TEMPLATE_ID=template_3slbphu
EMAILJS_PUBLIC_KEY=BvvEV8af1yn8A78N9

# reCAPTCHA Configuration
RECAPTCHA_SITE_KEY=6LclW40rAAAAAFHw8WO0Tht32rv7o4os-9PJa85M

# Google Analytics 4 (Reemplaza con tu ID real)
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Tag Manager (Reemplaza con tu ID real)
PUBLIC_GTM_ID=GTM-XXXXXXX

# Hotjar (Opcional)
# PUBLIC_HOTJAR_ID=1234567

# Facebook Pixel (Opcional)
# PUBLIC_FACEBOOK_PIXEL_ID=123456789012345
`;
    
    fs.writeFileSync(envPath, exampleEnv);
    log('✅ Archivo .env creado con valores de ejemplo', 'green');
    return false;
  }
  
  log('✅ Archivo .env encontrado', 'green');
  return true;
}

function checkVariables() {
  const envPath = path.join(process.cwd(), '.env');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};
  
  // Parsear variables del archivo .env
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, value] = trimmed.split('=');
      if (key && value) {
        envVars[key.trim()] = value.trim();
      }
    }
  });
  
  log('\n📋 Verificando variables de entorno:', 'bold');
  
  // Verificar variables privadas
  log('\n🔒 Variables Privadas (Solo Servidor):', 'blue');
  let privateMissing = 0;
  requiredVars.private.forEach(varName => {
    if (envVars[varName]) {
      log(`  ✅ ${varName}`, 'green');
    } else {
      log(`  ❌ ${varName} - FALTANTE`, 'red');
      privateMissing++;
    }
  });
  
  // Verificar variables públicas
  log('\n🌐 Variables Públicas (Cliente):', 'blue');
  let publicMissing = 0;
  requiredVars.public.forEach(varName => {
    if (envVars[varName]) {
      const value = envVars[varName];
      if (value.includes('XXXXXXX') || value.includes('XXXXXXXXXX')) {
        log(`  ⚠️  ${varName} - Configurado con valor de ejemplo`, 'yellow');
        publicMissing++;
      } else {
        log(`  ✅ ${varName}`, 'green');
      }
    } else {
      log(`  ❌ ${varName} - FALTANTE`, 'red');
      publicMissing++;
    }
  });
  
  // Verificar variables opcionales
  log('\n🔧 Variables Opcionales:', 'blue');
  requiredVars.optional.forEach(varName => {
    if (envVars[varName]) {
      log(`  ✅ ${varName}`, 'green');
    } else {
      log(`  ⚪ ${varName} - No configurado (opcional)`, 'reset');
    }
  });
  
  return { privateMissing, publicMissing };
}

function checkVercelConfig() {
  const vercelPath = path.join(process.cwd(), 'vercel.json');
  
  if (!fs.existsSync(vercelPath)) {
    log('\n❌ Archivo vercel.json no encontrado', 'red');
    return false;
  }
  
  try {
    const vercelConfig = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
    
    if (vercelConfig.env || vercelConfig.build?.env) {
      log('\n✅ Configuración de variables en vercel.json encontrada', 'green');
      return true;
    } else {
      log('\n⚠️  vercel.json no tiene configuración de variables de entorno', 'yellow');
      return false;
    }
  } catch (error) {
    log('\n❌ Error al leer vercel.json', 'red');
    return false;
  }
}

function generateVercelCommands() {
  log('\n🚀 Comandos para configurar en Vercel:', 'bold');
  log('\n# Instalar Vercel CLI:', 'blue');
  log('npm i -g vercel', 'reset');
  
  log('\n# Login en Vercel:', 'blue');
  log('vercel login', 'reset');
  
  log('\n# Agregar variables de entorno:', 'blue');
  log('vercel env add EMAILJS_SERVICE_ID', 'reset');
  log('vercel env add EMAILJS_TEMPLATE_ID', 'reset');
  log('vercel env add EMAILJS_PUBLIC_KEY', 'reset');
  log('vercel env add RECAPTCHA_SITE_KEY', 'reset');
  log('vercel env add PUBLIC_GA_MEASUREMENT_ID', 'reset');
  log('vercel env add PUBLIC_GTM_ID', 'reset');
  
  log('\n# Verificar variables configuradas:', 'blue');
  log('vercel env ls', 'reset');
  
  log('\n# Deploy a producción:', 'blue');
  log('vercel --prod', 'reset');
}

function main() {
  log('🔍 Verificador de Variables de Entorno', 'bold');
  log('=====================================\n', 'reset');
  
  // Verificar archivo .env
  const envExists = checkEnvFile();
  
  if (envExists) {
    // Verificar variables
    const { privateMissing, publicMissing } = checkVariables();
    
    // Verificar configuración de Vercel
    const vercelConfigured = checkVercelConfig();
    
    // Resumen
    log('\n📊 Resumen:', 'bold');
    if (privateMissing === 0 && publicMissing === 0) {
      log('✅ Todas las variables requeridas están configuradas', 'green');
    } else {
      log(`⚠️  Faltan ${privateMissing + publicMissing} variables requeridas`, 'yellow');
    }
    
    if (!vercelConfigured) {
      log('⚠️  Configuración de Vercel incompleta', 'yellow');
    }
    
    // Mostrar comandos de Vercel si es necesario
    if (privateMissing > 0 || publicMissing > 0 || !vercelConfigured) {
      generateVercelCommands();
    }
  } else {
    log('\n📝 Por favor, edita el archivo .env con tus valores reales', 'yellow');
    log('📖 Consulta ANALYTICS_SETUP.md para más información', 'blue');
  }
  
  log('\n✨ Verificación completada', 'green');
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = { checkEnvFile, checkVariables, checkVercelConfig }; 