# 🔥 CONFIGURACIÓN HOTJAR - PASO A PASO

## 🎯 **Paso 1: Crear Cuenta en Hotjar**

1. **Ir a:** [www.hotjar.com](https://www.hotjar.com)
2. **Hacer clic:** "Start Free Trial"
3. **Registrarse** con tu email corporativo
4. **Verificar** tu cuenta de email

## 🎯 **Paso 2: Crear Nuevo Sitio**

1. **Dashboard** → **Sites**
2. **Hacer clic:** "Add new site"
3. **Configurar:**
   - **Site name:** Facturea.io
   - **Site URL:** https://facturea.io
   - **Industry:** Financial Services
4. **Guardar** el sitio

## 🎯 **Paso 3: Obtener Site ID**

1. **Dashboard** → **Sites** → **Facturea.io**
2. **Copiar** el Site ID (formato: `XXXXXXX`)
3. **Guardar** en lugar seguro

## 🎯 **Paso 4: Instalar Tracking Code**

### **Opción A: Google Tag Manager (Recomendado)**
1. **GTM** → **Tags** → **New**
2. **Tag Type:** Custom HTML
3. **HTML Code:**
```html
<!-- Hotjar Tracking Code for https://facturea.io -->
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:XXXXXXX,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>
```
4. **Trigger:** All Pages
5. **Publicar** el container

### **Opción B: Código Directo**
1. **Dashboard** → **Sites** → **Tracking Code**
2. **Copiar** el código completo
3. **Pegar** en el `<head>` de tu sitio

## 🎯 **Paso 5: Configurar Heatmaps**

1. **Dashboard** → **Heatmaps**
2. **Hacer clic:** "Create heatmap"
3. **Configurar:**
   - **Page URL:** https://facturea.io
   - **Device:** Desktop, Tablet, Mobile
   - **Duration:** 7 days
4. **Crear** el heatmap

## 🎯 **Paso 6: Configurar Recordings**

1. **Dashboard** → **Recordings**
2. **Hacer clic:** "Start recording"
3. **Configurar:**
   - **Page URL:** https://facturea.io
   - **Device:** All devices
   - **Duration:** 7 days
4. **Iniciar** grabación

## 🎯 **Paso 7: Configurar Funnels (Opcional)**

1. **Dashboard** → **Funnels**
2. **Hacer clic:** "Create funnel"
3. **Configurar pasos:**
   - **Paso 1:** Visita a la página
   - **Paso 2:** Scroll > 50%
   - **Paso 3:** Click en formulario
   - **Paso 4:** Envío de formulario
4. **Guardar** el funnel

## 🎯 **Paso 8: Configurar Surveys (Opcional)**

1. **Dashboard** → **Surveys**
2. **Hacer clic:** "Create survey"
3. **Configurar preguntas:**
   - "¿Qué te trajo a nuestra página?"
   - "¿Encontraste lo que buscabas?"
   - "¿Recomendarías nuestro servicio?"
4. **Configurar** triggers y timing
5. **Publicar** la encuesta

## 📊 **Monitoreo de Uso**

### **Plan Gratuito:**
- **1,050 pageviews/día**
- **Heatmaps básicos**
- **Recordings limitadas**
- **Surveys básicas**

### **Cuándo Actualizar a Pago:**
- **Superar 1,050 pageviews/día**
- **Necesitar más grabaciones**
- **Funciones avanzadas**

## 🔧 **Configuraciones Recomendadas**

### **Exclusiones de Privacidad:**
1. **Dashboard** → **Settings** → **Privacy**
2. **Configurar:**
   - **Exclude form inputs:** Sí
   - **Exclude specific elements:** Elementos sensibles
   - **GDPR compliance:** Habilitar

### **Alertas:**
1. **Dashboard** → **Settings** → **Alerts**
2. **Configurar:**
   - **High bounce rate:** >80%
   - **Low conversion:** <1%
   - **Technical errors:** Sí

## 📈 **Métricas Clave a Monitorear**

### **Heatmaps:**
- **Click maps:** Dónde hacen clic los usuarios
- **Move maps:** Dónde mueven el mouse
- **Scroll maps:** Hasta dónde scrollean

### **Recordings:**
- **User journeys:** Cómo navegan
- **Friction points:** Dónde se confunden
- **Conversion paths:** Cómo convierten

### **Funnels:**
- **Drop-off rates:** Dónde abandonan
- **Conversion rates:** Tasa de conversión
- **Optimization opportunities:** Oportunidades

## 🔧 **Solución de Problemas**

### **No aparecen datos:**
- Verificar Site ID
- Comprobar que el código esté instalado
- Esperar 24-48 horas para primeros datos

### **Error en recordings:**
- Verificar configuración de privacidad
- Comprobar que no haya bloqueadores
- Revisar configuración de triggers

## 📞 **Soporte Hotjar**
- **Documentación:** [help.hotjar.com](https://help.hotjar.com)
- **Soporte:** [support.hotjar.com](https://support.hotjar.com)
- **Comunidad:** [community.hotjar.com](https://community.hotjar.com)

---

> **💡 TIP:** Hotjar es especialmente útil para entender por qué los usuarios no completan el formulario 