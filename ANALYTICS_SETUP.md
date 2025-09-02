# Configuración de Analytics y Variables de Entorno

## 📊 Configuración de Analytics

### 1. Variables de Entorno Requeridas

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# EmailJS Configuration (Privadas)
EMAILJS_SERVICE_ID=service_2gdbb99
EMAILJS_TEMPLATE_ID=template_3slbphu
EMAILJS_PUBLIC_KEY=BvvEV8af1yn8A78N9

# reCAPTCHA Configuration (Privadas)
RECAPTCHA_SITE_KEY=6LclW40rAAAAAFHw8WO0Tht32rv7o4os-9PJa85M

# Google Analytics 4 (Públicas - prefijo PUBLIC_)
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Tag Manager (Públicas)
PUBLIC_GTM_ID=GTM-XXXXXXX

# Hotjar (Opcional - Públicas)
PUBLIC_HOTJAR_ID=1234567

# Facebook Pixel (Opcional - Públicas)
PUBLIC_FACEBOOK_PIXEL_ID=123456789012345
```

### 2. Configuración en Vercel

#### Paso 1: Configurar Variables en Vercel Dashboard

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Navega a **Settings** → **Environment Variables**
3. Agrega cada variable:

| Variable | Valor | Environment |
|----------|-------|-------------|
| `EMAILJS_SERVICE_ID` | `service_2gdbb99` | Production, Preview |
| `EMAILJS_TEMPLATE_ID` | `template_3slbphu` | Production, Preview |
| `EMAILJS_PUBLIC_KEY` | `BvvEV8af1yn8A78N9` | Production, Preview |
| `RECAPTCHA_SITE_KEY` | `6LclW40rAAAAAFHw8WO0Tht32rv7o4os-9PJa85M` | Production, Preview |
| `PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` | Production, Preview |
| `PUBLIC_GTM_ID` | `GTM-XXXXXXX` | Production, Preview |

#### Paso 2: Usar Vercel CLI (Alternativo)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Agregar variables de entorno
vercel env add EMAILJS_SERVICE_ID
vercel env add EMAILJS_TEMPLATE_ID
vercel env add EMAILJS_PUBLIC_KEY
vercel env add RECAPTCHA_SITE_KEY
vercel env add PUBLIC_GA_MEASUREMENT_ID
vercel env add PUBLIC_GTM_ID
```

### 3. Implementación en el Código

#### Paso 1: Importar el Componente Analytics

En tu `src/pages/index.astro` o layout principal:

```astro
---
import Analytics from '../components/Analytics.astro';
---

<html>
  <head>
    <!-- ... otros elementos ... -->
  </head>
  <body>
    <!-- ... contenido ... -->
    
    <!-- Analytics al final del body -->
    <Analytics />
  </body>
</html>
```

#### Paso 2: Tracking Personalizado

```javascript
// En cualquier script, puedes usar:
window.trackEvent('evento_personalizado', 'Categoría', 'Etiqueta', 1);

// Ejemplo en formulario de contacto:
document.getElementById('contactForm').addEventListener('submit', function() {
  window.trackEvent('form_submit', 'Contact', 'Contact Form', 1);
});
```

### 4. Configuración de Google Analytics 4

#### Paso 1: Crear Propiedad en GA4

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Crea una nueva propiedad
3. Copia el **Measurement ID** (formato: G-XXXXXXXXXX)

#### Paso 2: Configurar Eventos Personalizados

Los siguientes eventos se trackean automáticamente:

- **Core Web Vitals**: LCP, FID, CLS
- **Formularios**: Envío de formulario de contacto
- **Engagement**: Clicks en botones CTA, scroll depth, tiempo en página
- **Navegación**: Page views

### 5. Configuración de Google Tag Manager

#### Paso 1: Crear Contenedor GTM

1. Ve a [Google Tag Manager](https://tagmanager.google.com/)
2. Crea un nuevo contenedor
3. Copia el **Container ID** (formato: GTM-XXXXXXX)

#### Paso 2: Configurar Tags

En GTM, puedes crear tags para:

- **Google Analytics 4**: Para métricas avanzadas
- **Facebook Pixel**: Para remarketing
- **Hotjar**: Para heatmaps y grabaciones
- **Eventos personalizados**: Para tracking específico

### 6. Verificación de Configuración

#### Paso 1: Verificar Variables de Entorno

```bash
# En desarrollo
npm run dev

# Verificar en consola del navegador
console.log(import.meta.env.PUBLIC_GA_MEASUREMENT_ID);
```

#### Paso 2: Verificar Analytics

1. Abre las herramientas de desarrollador
2. Ve a la pestaña **Network**
3. Busca requests a:
   - `googletagmanager.com` (GTM)
   - `google-analytics.com` (GA4)
   - `hotjar.com` (si está configurado)

#### Paso 3: Verificar en Vercel

```bash
# Deploy a Vercel
vercel --prod

# Verificar variables en producción
vercel env ls
```

### 7. Troubleshooting

#### Problema: Variables no accesibles

**Solución:**
- Verifica que las variables públicas tengan el prefijo `PUBLIC_`
- Asegúrate de que estén configuradas en Vercel
- Reinicia el servidor de desarrollo

#### Problema: Analytics no carga

**Solución:**
- Verifica que los IDs sean correctos
- Revisa la consola del navegador para errores
- Asegúrate de que no haya bloqueadores de anuncios

#### Problema: Formulario no envía emails

**Solución:**
- Verifica las credenciales de EmailJS
- Revisa que reCAPTCHA esté funcionando
- Consulta los logs de Vercel

### 8. Métricas Disponibles

#### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

#### Engagement
- **Tiempo en página**: Segundos promedio
- **Scroll depth**: Porcentaje de scroll
- **Formularios completados**: Conversiones

#### Performance
- **Page load time**: Tiempo de carga
- **Bundle size**: Tamaño de JavaScript
- **Network requests**: Número de requests

### 9. Optimizaciones Recomendadas

1. **Lazy Loading**: Cargar analytics solo cuando sea necesario
2. **Performance Monitoring**: Trackear métricas de performance
3. **Error Tracking**: Implementar tracking de errores
4. **A/B Testing**: Configurar experimentos
5. **Conversion Tracking**: Seguimiento de objetivos

### 10. Seguridad

- ✅ Las variables públicas (`PUBLIC_*`) son seguras para el cliente
- ✅ Las variables privadas no se exponen al cliente
- ✅ reCAPTCHA protege contra spam
- ✅ EmailJS maneja la seguridad del envío de emails

---

## 🚀 Comandos Útiles

```bash
# Desarrollo local
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Deploy a Vercel
vercel --prod

# Ver variables de entorno
vercel env ls

# Agregar variable de entorno
vercel env add VARIABLE_NAME
``` 