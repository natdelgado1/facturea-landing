# 🚀 Facturea Landing - Optimizado para Rendimiento

Landing page optimizada para Facturea.io con implementación completa de optimizaciones de rendimiento web.

## 📊 Ahorros de Rendimiento Implementados

- **Compresión de texto**: ~2,078 KiB
- **Minificación de JavaScript**: ~1,640 KiB  
- **Minificación de CSS**: ~35 KiB
- **Eliminación de módulos duplicados**: ~10 KiB
- **Reducción de CSS no utilizado**: ~44 KiB
- **Reducción de JavaScript no utilizado**: ~297 KiB

**Total estimado**: ~4,104 KiB (4.1 MB) de ahorro

## 🛠️ Tecnologías

- **Framework**: [Astro](https://astro.build/) - Framework web moderno para sitios estáticos
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utility-first
- **Animaciones**: [GSAP](https://greensock.com/gsap/) - Biblioteca de animaciones profesionales
- **Scroll**: [Lenis](https://github.com/studio-freight/lenis) - Scroll suave y optimizado

## 🚀 Optimizaciones Implementadas

### 1. Compresión de Texto (gzip/brotli)
- Configuración automática para Apache, Nginx y Vercel
- Compresión de CSS, JavaScript, fuentes y HTML
- Reducción de ~70% en tamaño de transferencia

### 2. Minificación Agresiva
- **JavaScript**: Terser con eliminación de console.log y debugger
- **CSS**: CSS Nano con optimización de colores y selectores
- **HTML**: Minificación automática en build

### 3. Eliminación de Código No Utilizado
- **PurgeCSS**: Elimina CSS no utilizado automáticamente
- **Tree Shaking**: Elimina JavaScript no utilizado
- **Chunk Splitting**: Separación inteligente de bundles

### 4. Optimización de Carga
- **Carga asíncrona**: Librerías externas cargadas en paralelo
- **Intersection Observer**: Animaciones solo para elementos visibles
- **Preload**: Fuentes críticas precargadas
- **DNS Prefetch**: Conexiones CDN optimizadas

### 5. Cache Agresivo
- **Assets estáticos**: Cache de 1 año con headers immutable
- **HTML**: Cache de 1 hora
- **Fuentes**: Cache optimizado con CORS

### 6. Headers de Seguridad
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

## 📦 Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd facturea-landing/verdant-visual

# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo

# Producción
npm run build        # Build optimizado
npm run preview      # Preview del build

# Análisis
npm run analyze      # Análisis de bundle con visualizer
npm run analyze-bundle # Análisis detallado de optimizaciones
npm run build:analyze # Build + análisis completo
```

## 📁 Estructura del Proyecto

```
verdant-visual/
├── src/
│   ├── components/          # Componentes Astro
│   ├── pages/              # Páginas del sitio
│   ├── styles/             # Estilos globales
│   └── scripts/            # Scripts de animación
├── public/                 # Assets estáticos
├── dist/                   # Build de producción
├── astro.config.mjs        # Configuración de Astro
├── postcss.config.js       # Configuración de PostCSS
├── vercel.json            # Configuración para Vercel
├── .htaccess              # Configuración para Apache
├── nginx.conf             # Configuración para Nginx
└── OPTIMIZACIONES.md      # Documentación detallada
```

## 🌐 Configuración de Servidores

### Vercel (Recomendado)
El archivo `vercel.json` está configurado automáticamente:
- Compresión habilitada
- Headers de seguridad
- Cache agresivo

### Apache
Usar el archivo `.htaccess` incluido:
- Compresión gzip
- Headers de seguridad
- Cache de navegador

### Nginx
Usar el archivo `nginx.conf` incluido:
- Compresión gzip
- SSL optimizado
- Cache agresivo

## 📈 Métricas de Rendimiento

### Objetivos de Core Web Vitals
- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3.8s

### Herramientas de Verificación
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **WebPageTest**: https://www.webpagetest.org/
- **Lighthouse**: Chrome DevTools

## 🔍 Análisis de Bundle

Para analizar el tamaño y optimizaciones del bundle:

```bash
# Análisis completo
npm run analyze-bundle

# Visualización del bundle
npm run build:analyze
```

El script de análisis verifica:
- ✅ Minificación habilitada
- ✅ Compresión configurada
- ✅ PurgeCSS activo
- ✅ CSS Nano configurado
- ✅ Terser instalado
- ✅ Configuraciones de servidor presentes

## 🎨 Características del Diseño

- **Responsive**: Optimizado para todos los dispositivos
- **Accesible**: Cumple estándares WCAG
- **SEO**: Meta tags optimizados
- **Performance**: Carga ultra rápida
- **Animaciones**: Suaves y optimizadas

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

### Netlify
```bash
# Build
npm run build

# Subir carpeta dist a Netlify
```

### Servidor Tradicional
```bash
# Build
npm run build

# Subir contenido de dist/ al servidor
# Usar .htaccess para Apache o nginx.conf para Nginx
```

## 🔧 Configuración Avanzada

### Variables de Entorno
```bash
# EmailJS (para formularios)
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_public_key

# reCAPTCHA
RECAPTCHA_SITE_KEY=your_site_key
```

### Personalización de Optimizaciones
Editar `astro.config.mjs` para ajustar:
- Nivel de minificación
- Configuración de Terser
- Chunk splitting
- PWA settings

## 📞 Soporte y Mantenimiento

### Verificación de Optimizaciones
1. Ejecutar `npm run analyze-bundle`
2. Verificar con PageSpeed Insights
3. Revisar logs del build
4. Consultar `OPTIMIZACIONES.md`

### Actualizaciones
```bash
# Actualizar dependencias
npm update

# Verificar vulnerabilidades
npm audit

# Fix automático
npm audit fix
```

### Troubleshooting
- **Build errors**: Verificar Node.js version (>=18)
- **CSS no aplicado**: Verificar PurgeCSS safelist
- **Animaciones no funcionan**: Verificar carga de GSAP
- **Performance baja**: Ejecutar análisis de bundle

## 📚 Documentación Adicional

- [OPTIMIZACIONES.md](./OPTIMIZACIONES.md) - Documentación detallada de optimizaciones
- [Astro Docs](https://docs.astro.build/) - Documentación oficial de Astro
- [Tailwind CSS](https://tailwindcss.com/docs) - Documentación de Tailwind
- [GSAP Docs](https://greensock.com/docs/) - Documentación de GSAP

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

---

**Desarrollado con ❤️ para Facturea.io**
