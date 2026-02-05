#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data');

// Crear carpeta data si no existe
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('✅ Carpeta data creada');
}

// Archivos JSON a crear
const files = {
  'hero.json': {
    text1: "Obtener",
    text2: "Liquidez",
    text3: "con tus",
    text4: "Facturas",
    text5: "Líder en Factoring Electrónico en Paraguay.",
    text6: "Conectamos PYMEs con inversores para acelerar tu flujo de caja.",
    text7: "Explorar Factoring"
  },
  'about.json': {
    badgeText: "Fintech Líder en Factoring Electrónico en Paraguay",
    title: "¿Por qué elegir ",
    titleBold: "Facturea?",
    description: "Revolucionamos el flujo de caja en Paraguay conectando",
    descriptionBold: "PYMEs que necesitan liquidez",
    description2: "con",
    descriptionBold2: "inversores que buscan rentabilidad",
    items: [
      {
        title: "Liquidez Inmediata",
        description: "Convertí tus facturas en efectivo en menos de 24 horas. Solo necesitás R.U.C y cuenta bancaria, sin historial crediticio.",
        counterValue: 48,
        counterSuffix: "h"
      },
      {
        title: "Proceso Digital",
        description: "Subí tu factura desde cualquier dispositivo. Plataforma completamente digital, rápida y segura con verificación automática.",
        counterValue: 5,
        counterSuffix: "min"
      },
      {
        title: "Ingresos Pasivos",
        description: "Invertí en facturas verificadas y generá ingresos constantes. Diversificá tu portafolio con activos reales de corto plazo.",
        counterValue: 15,
        counterSuffix: "%"
      }
    ],
    textPrimaryButton: "Empezá Ahora",
    linkPrimaryButton: "https://app.facturea.io/",
    textSecondaryButton: "Solicitar Demo",
    linkSecondaryButton: "https://app.facturea.io/"
  }
};

// Crear archivos
Object.entries(files).forEach(([filename, data]) => {
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`✅ ${filename} creado`);
});

console.log('\n🎉 Archivos JSON recreados exitosamente!');
console.log('⚠️  Nota: Los archivos grandes (terms.json, privacy.json, faq.json, contact.json, 404.json, HowItWorks.json, footer.json)');
console.log('    necesitan ser recreados manualmente o desde un backup.');
