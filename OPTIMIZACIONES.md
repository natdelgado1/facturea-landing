# 🚀 Optimizaciones de Rendimiento - Facturea Landing

Este documento describe todas las optimizaciones implementadas para mejorar el rendimiento del sitio web.

## 📊 Ahorros Esperados

- **Compresión de texto**: ~2,078 KiB
- **Minificación de JavaScript**: ~1,640 KiB  
- **Minificación de CSS**: ~35 KiB
- **Eliminación de módulos duplicados**: ~10 KiB
- **Reducción de CSS no utilizado**: ~44 KiB
- **Reducción de JavaScript no utilizado**: ~297 KiB

**Total estimado**: ~4,104 KiB (4.1 MB)

## 🔧 Optimizaciones Implementadas

### 1. Compresión de Texto (gzip/brotli)

#### Configuración de Servidores:

**Apache (.htaccess)**:
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE font/woff
    AddOutputFilterByType DEFLATE font/woff2
</IfModule>
```

**Nginx (nginx.conf)**:
```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_comp_level 6;
gzip_types text/css application/javascript font/woff font/woff2;
```

**Vercel (vercel.json)**:
```json
{
  "compress": true
}
```

### 2. Minificación de JavaScript

**Configuración en astro.config.mjs**:
```javascript
build: {
  minify: 'terser',
  terserOptions: {
    compress: {
      drop_console: true,
      drop_debugger: true,
      pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
    },
    mangle: true
  }
}
```

### 3. Minificación de CSS

**Configuración en postcss.config.js**:
```javascript
cssnano: {
  preset: ['default', {
    discardComments: { removeAll: true },
    normalizeWhitespace: true,
    colormin: true,
    minifyFontValues: true,
    minifySelectors: true
  }]
}
```

### 4. Eliminación de CSS No Utilizado (PurgeCSS)

**Configuración en postcss.config.js**:
```javascript
'@fullhuman/postcss-purgecss': {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'
  ],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
  safelist: ['html', 'body', 'astro-*']
}
```

### 5. Optimización de Carga de JavaScript

**Carga asíncrona de librerías**:
```javascript
// Cargar librerías en paralelo
Promise.all([
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'),
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js'),
  loadScript('https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js')
]).then(() => {
  initAnimations();
}).catch(() => {
  initBasicFunctionality(); // Fallback
});
```

**Intersection Observer para animaciones**:
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Solo animar elementos visibles
      animateElement(entry.target);
      observer.unobserve(entry.target); // Dejar de observar
    }
  });
});
```

### 6. Cache Agresivo

**Headers de cache para assets estáticos**:
```
Cache-Control: public, max-age=31536000, immutable
```

**Configuración por tipo de archivo**:
- CSS/JS: 1 año
- Imágenes: 1 año  
- Fuentes: 1 año
- HTML: 1 hora

### 7. Optimización de Fuentes

**Preload de fuentes críticas**:
```html
<link 
  rel="preload" 
  href="/src/assets/fonts/visbycf-regular.woff2" 
  as="font" 
  type="font/woff2" 
  crossorigin
/>
```

### 8. Headers de Seguridad

```http
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

## 📦 Dependencias Agregadas

```json
{
  "devDependencies": {
    "terser": "^5.43.1",
    "cssnano": "^6.0.5",
    "purgecss": "^5.0.0",
    "@fullhuman/postcss-purgecss": "^5.0.0",
    "vite-plugin-pwa": "^0.19.0",
    "workbox-window": "^7.0.0"
  }
}
```

## 🚀 Comandos de Uso

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm run dev
```

### Build de producción
```bash
npm run build
```

### Análisis del bundle
```bash
npm run analyze-bundle
```

### Build + Análisis
```bash
npm run build:analyze
```

## 📈 Verificación de Optimizaciones

### 1. Análisis Local
```bash
npm run analyze-bundle
```

### 2. Herramientas Online
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **WebPageTest**: https://www.webpagetest.org/

### 3. Lighthouse
```bash
# En Chrome DevTools
# Performance > Lighthouse > Generate report
```

## 🔍 Métricas a Monitorear

- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3.8s

## 🛠️ Configuración por Servidor

### Vercel
El archivo `vercel.json` ya está configurado con:
- Compresión habilitada
- Headers de seguridad
- Cache agresivo

### Apache
Usar el archivo `.htaccess` que incluye:
- Compresión gzip
- Headers de seguridad
- Cache de navegador

### Nginx
Usar el archivo `nginx.conf` que incluye:
- Compresión gzip
- SSL optimizado
- Cache agresivo
- Headers de seguridad

## 🎯 Próximas Optimizaciones

1. **Imágenes WebP/AVIF**: Convertir imágenes a formatos modernos
2. **Lazy Loading**: Implementar carga diferida para imágenes
3. **Service Worker**: Cache offline y actualizaciones automáticas
4. **CDN**: Usar CDN para librerías externas
5. **Critical CSS**: Inline CSS crítico
6. **Resource Hints**: Preconnect, prefetch, preload

## 📞 Soporte

Para problemas o preguntas sobre las optimizaciones:
1. Revisa los logs del build
2. Ejecuta `npm run analyze-bundle`
3. Verifica con herramientas de análisis online
4. Consulta la documentación de Astro y Vite 