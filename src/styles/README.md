# Estructura de CSS del Hero Section

## 📁 Archivos CSS Organizados por Prioridad

### 🚨 **CSS Crítico** (`hero-critical.css`)
- **Propósito**: Estilos esenciales para el renderizado inicial
- **Carga**: Inline en el HTML
- **Contenido**:
  - Tamaños básicos de `.hero-animation`
  - Keyframes críticos (`fadeInUp`)
  - Animaciones de entrada (`.fade-in-text`, `.fade-in-button`)
  - Hardware acceleration básico
  - Responsive crítico (móvil)

### ⚙️ **CSS de Configuración** (`hero-config.css`)
- **Propósito**: Configuraciones según dispositivo y preferencias del usuario
- **Carga**: Importado en el frontmatter
- **Contenido**:
  - Media queries para `prefers-reduced-motion`
  - Configuraciones para dispositivos táctiles
  - Optimizaciones para alta resolución
  - Configuraciones para conexiones lentas
  - Preparación para modo oscuro

### 🎨 **CSS No Crítico** (`hero.css`)
- **Propósito**: Estilos adicionales y responsive completo
- **Carga**: Asíncrona con preload
- **Contenido**:
  - Responsive design completo
  - Efectos hover y animaciones avanzadas
  - Optimizaciones de performance
  - Elementos decorativos

### ⌨️ **CSS Typewriter** (`hero-typewriter.css`)
- **Propósito**: Animaciones específicas del efecto typewriter
- **Carga**: Condicional (solo si se necesita)
- **Contenido**:
  - Efecto cursor parpadeante
  - Animaciones de escritura
  - Estados de carga
  - Optimizaciones para accesibilidad

## 🔄 Estrategia de Carga

```
1. CSS Crítico (inline) → Carga inmediata
2. CSS Configuración → Carga en frontmatter
3. CSS No Crítico → Carga asíncrona
4. CSS Typewriter → Carga condicional
```

## 📱 Responsive Design

- **320px**: Móvil pequeño
- **768px**: Tablet
- **1024px**: Desktop pequeño
- **1280px**: Desktop mediano
- **1536px**: Desktop grande
- **1920px+**: Pantallas ultra anchas

## ⚡ Optimizaciones de Performance

- **Hardware Acceleration**: `transform: translateZ(0)`
- **Will-change**: Para elementos animados
- **Reducción de elementos**: En móvil para mejor performance
- **Carga condicional**: Según preferencias del usuario
- **Preload**: Para recursos críticos

## 🎯 Beneficios

- **LCP mejorado**: CSS crítico inline
- **FID optimizado**: Carga asíncrona de CSS no crítico
- **CLS reducido**: Tamaños definidos desde el inicio
- **Accesibilidad**: Respeto por `prefers-reduced-motion`
- **Performance**: Carga según capacidades del dispositivo 