# Configuración de Variables de Entorno

## Configuración de EmailJS y reCAPTCHA

Para mantener las claves privadas seguras, necesitas crear un archivo `.env` en la raíz del proyecto.

### Pasos para configurar:

1. **Crear archivo `.env`** en la raíz del proyecto (`facturea-landing/verdant-visual/.env`)

2. **Agregar las siguientes variables:**

```env
# EmailJS Configuration
EMAILJS_SERVICE_ID=service_2gdbb99
EMAILJS_TEMPLATE_ID=template_3slbphu
EMAILJS_PUBLIC_KEY=BvvEV8af1yn8A78N9

# reCAPTCHA Configuration
RECAPTCHA_SITE_KEY=6LclW40rAAAAAFHw8WO0Tht32rv7o4os-9PJa85M
```

3. **Agregar `.env` a `.gitignore`** para mantener las claves privadas:

```gitignore
# Variables de entorno
.env
.env.local
.env.production
```

### Valores actuales configurados:

- **EmailJS Service ID**: `service_2gdbb99`
- **EmailJS Template ID**: `template_3slbphu`
- **EmailJS Public Key**: `BvvEV8af1yn8A78N9`
- **reCAPTCHA Site Key**: `6LclW40rAAAAAFHw8WO0Tht32rv7o4os-9PJa85M`

### Notas importantes:

- Las variables están configuradas con valores por defecto en `astro.config.mjs`
- Si no se encuentra el archivo `.env`, se usarán los valores por defecto
- Para producción, asegúrate de configurar las variables de entorno en tu servidor
- Nunca subas el archivo `.env` al repositorio

### Para desarrollo:

```bash
npm run dev
```

### Para producción:

```bash
npm run build
npm run preview
``` 