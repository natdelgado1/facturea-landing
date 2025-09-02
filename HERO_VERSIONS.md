# 🎨 Versiones del Hero - Facturea.io

Este proyecto incluye **2 versiones diferentes del Hero Section** para presentar opciones al equipo.

## 📋 Versiones Disponibles

### **Versión 1: Layout Horizontal** (`Hero.astro`) ✅ *ACTIVA*
- **Diseño**: Dos columnas (texto izquierda, imagen derecha)
- **Estilo**: Moderno con múltiples elementos flotantes
- **Métricas**: 3 estadísticas en grid horizontal
- **Elementos**: Tarjetas flotantes con rotación y efectos dinámicos

### **Versión 2: Layout Centrado** (`HeroVersion2.astro`)
- **Diseño**: Todo centrado verticalmente
- **Estilo**: Minimalista y elegante
- **Métricas**: 4 estadísticas en fila horizontal más grandes
- **Elementos**: Un solo badge flotante, más limpio

---

## 🔄 Cómo Cambiar de Versión

Para cambiar entre las versiones del hero, edita el archivo `src/pages/index.astro`:

### **Para usar Versión 1 (Horizontal):**
```astro
---
import Hero from '../components/Hero.astro';
---

<!-- En el body -->
<Hero />
```

### **Para usar Versión 2 (Centrada):**
```astro
---
import HeroVersion2 from '../components/HeroVersion2.astro';
---

<!-- En el body -->
<HeroVersion2 />
```

---

## 🎯 Recomendaciones para Presentación

### **Versión 1 - Hero Horizontal:**
- ✅ **Mejor para**: Mostrar más información de forma organizada
- ✅ **Audiencia**: Empresarios que quieren detalles
- ✅ **Fortalezas**: Más elementos visuales, sensación de actividad

### **Versión 2 - Hero Centrado:**
- ✅ **Mejor para**: Impacto visual inmediato
- ✅ **Audiencia**: Inversores y C-level executives
- ✅ **Fortalezas**: Más limpio, enfoque en el mensaje principal

---

## 🚀 Próximos Pasos

1. **Probar ambas versiones** con usuarios reales
2. **A/B testing** en producción
3. **Crear versión 3** combinando lo mejor de ambas
4. **Optimizar conversión** basado en métricas

---

## 📁 Estructura de Archivos

```
src/
├── components/
│   ├── Hero.astro           ← Versión 1 (Horizontal)
│   └── HeroVersion2.astro   ← Versión 2 (Centrada)
├── pages/
│   └── index.astro          ← Página principal
└── assets/
    └── hero.png             ← Imagen compartida
```

---

*Última actualización: Enero 2025* 