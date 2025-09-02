# 📄 Páginas de Términos y Condiciones y Políticas de Privacidad

Este documento describe las páginas de términos y condiciones, y políticas de privacidad implementadas en el proyecto Facturea.io.

## 🗂️ Estructura de Archivos

```
src/pages/
├── terminos.astro              # Página principal de términos en español
├── privacidad.astro            # Página principal de políticas de privacidad en español
├── en/
│   ├── terms.astro             # Página de términos en inglés
│   └── privacy.astro           # Página de políticas de privacidad en inglés
└── es/
    ├── terminos.astro          # Página de términos en español (carpeta es)
    └── privacidad.astro        # Página de políticas de privacidad en español (carpeta es)

data/
├── terms.js                    # Datos de términos y condiciones
└── privacy.js                  # Datos de políticas de privacidad
```

## 🌐 URLs de Acceso

### Términos y Condiciones:
- **Español (principal)**: `/terminos`
- **Español (carpeta es)**: `/es/terminos`
- **Inglés**: `/en/terms`

### Políticas de Privacidad:
- **Español (principal)**: `/privacidad`
- **Español (carpeta es)**: `/es/privacidad`
- **Inglés**: `/en/privacy`

## ✨ Características Implementadas

### 🎨 Diseño y UX
- **Header fijo** con navegación
- **Hero section** con título destacado
- **Navegación sticky** con índice de secciones
- **Scroll suave** entre secciones
- **Botón de regreso** al inicio
- **Footer** con información de contacto

### 📱 Responsive Design
- Diseño adaptativo para móviles, tablets y desktop
- Navegación de secciones con scroll horizontal en móviles
- Tipografía escalable según el dispositivo

### 🔧 Funcionalidades
- **Navegación interna** con enlaces a secciones
- **Scroll automático** a secciones al hacer clic
- **Fecha de actualización** dinámica
- **SEO optimizado** con meta tags
- **Open Graph** para redes sociales

## 📋 Contenido

### Términos y Condiciones:
Las páginas utilizan la data del archivo `data/terms.js` que contiene:

- **13 secciones** principales de términos
- **Contenido estructurado** por párrafos
- **IDs únicos** para navegación
- **Títulos descriptivos** para cada sección

#### Secciones Incluidas:
1. Introducción - Partes y Servicio
2. Usuario
3. Consentimiento
4. Servicio
5. Responsabilidades y Garantías
6. Autorización y Mandato
7. Derechos
8. Políticas Generales
9. Políticas de Datos
10. Contacto
11. Legal
12. Aprobación
13. Definiciones

### Políticas de Privacidad:
Las páginas utilizan la data del archivo `data/privacy.js` que contiene:

- **2 secciones** principales de políticas de privacidad
- **Contenido estructurado** por párrafos
- **IDs únicos** para navegación
- **Títulos descriptivos** para cada sección

#### Secciones Incluidas:
1. Consentimiento y Protección de Datos
   - Generalidades
   - Mandato
   - Información de cuentas a terceros
   - Autorizaciones
   - Relevo de responsabilidad

2. Políticas de Datos
   - Información que recopilamos y cómo la usamos
   - Cookies y web beacons
   - Enlaces
   - Menores
   - Intercambio de información
   - Seguridad de la Información
   - Integridad de los Datos
   - Cumplimiento
   - Cambios a esta Política
   - Precisión de la información
   - Consentimiento para el procesamiento
   - Hackeo
   - Comunicaciones

## 🛠️ Tecnologías Utilizadas

- **Astro** - Framework principal
- **Tailwind CSS** - Estilos y responsive design
- **TypeScript** - Tipado estático
- **JavaScript** - Interactividad del lado del cliente

## 🎯 SEO y Performance

### Meta Tags Incluidos:
- Título optimizado para cada idioma
- Descripción específica del contenido
- Keywords relevantes
- Open Graph para redes sociales
- URLs canónicas

### Performance:
- **Preload de fuentes** para mejor rendimiento
- **CSS optimizado** con Tailwind
- **JavaScript mínimo** y eficiente
- **Imágenes optimizadas** (si las hubiera)

## 🔗 Integración con el Proyecto

### Componentes Reutilizados:
- `NavBar.astro` - Navegación principal
- `ScrollToTop.astro` - Botón de scroll al inicio
- Estilos globales del proyecto

### Consistencia Visual:
- Misma paleta de colores (`text-primary`, etc.)
- Tipografía Visby CF
- Espaciado y layout consistentes
- Componentes de UI reutilizables

## 📝 Uso y Mantenimiento

### Para Actualizar Contenido:
1. **Términos y Condiciones**: Editar el archivo `data/terms.js`
2. **Políticas de Privacidad**: Editar el archivo `data/privacy.js`
3. Los cambios se reflejarán automáticamente en todas las páginas
4. No es necesario modificar los archivos .astro

### Para Agregar Nuevos Idiomas:
1. Crear carpeta del idioma en `src/pages/`
2. Copiar estructura de `terminos.astro`
3. Traducir contenido y meta tags
4. Actualizar enlaces de navegación

### Para Modificar Estilos:
- Editar las clases de Tailwind en los archivos .astro
- Los estilos específicos están en la sección `<style>`
- Mantener consistencia con el diseño del proyecto

## 🚀 Despliegue

Las páginas se generan automáticamente durante el build de Astro y estarán disponibles en:

### Términos y Condiciones:
- **Desarrollo**: `http://localhost:4321/terminos`
- **Producción**: `https://facturea.io/terminos`

### Políticas de Privacidad:
- **Desarrollo**: `http://localhost:4321/privacidad`
- **Producción**: `https://facturea.io/privacidad`

## 📞 Soporte

Para consultas sobre estas páginas o modificaciones, contactar a:
- **Email**: info@facturea.io
- **Documentación**: Este archivo README 