# 🧪 Guía de Pruebas del Formulario de Contacto

## ✅ Estado Actual

El formulario de contacto está **completamente implementado** con:

### **EmailJS**
- ✅ CDN incluido
- ✅ Configuración con claves del archivo `env.config.js`
- ✅ Función de envío implementada
- ✅ Manejo de errores

### **reCAPTCHA**
- ✅ Clave configurada: `6LclW40rAAAAAFHw8WO0Tht32rv7o4os-9PJa85M`
- ✅ Callbacks implementados
- ✅ Validación antes del envío

### **Formulario**
- ✅ IDs y names correctos
- ✅ Validación de campos
- ✅ Mensajes de estado
- ✅ Estado de carga

## 🚀 Cómo Probar

### 1. **Acceder al formulario**
```
http://localhost:4321
```

### 2. **Pasos de prueba**

1. **Completar el formulario:**
   - Seleccionar tipo de usuario (Facturador o Inversor)
   - Llenar nombre completo
   - Llenar email
   - Opcional: agregar mensaje

2. **Completar reCAPTCHA:**
   - Hacer clic en el checkbox de reCAPTCHA
   - Esperar a que se complete la verificación

3. **Enviar formulario:**
   - Hacer clic en "Enviar Mensaje"
   - Verificar que aparezca el estado de carga
   - Esperar la respuesta

### 3. **Verificar en consola del navegador**

Abrir las herramientas de desarrollador (F12) y verificar:

```javascript
// Deberías ver estos logs:
"reCAPTCHA completado"
"Email enviado exitosamente: [objeto de respuesta]"
```

## 🔧 Configuración Actual

### **EmailJS**
```javascript
serviceId: 'service_2gdbb99'
templateId: 'template_3slbphu'
publicKey: 'BvvEV8af1yn8A78N9'
```

### **reCAPTCHA**
```javascript
siteKey: '6LclW40rAAAAAFHw8WO0Tht32rv7o4os-9PJa85M'
```

## 📧 Template de EmailJS

El template debe tener estas variables:
- `{{userType}}` - Tipo de usuario seleccionado
- `{{fullName}}` - Nombre completo
- `{{email}}` - Email del usuario
- `{{message}}` - Mensaje (opcional)

## 🐛 Solución de Problemas

### **reCAPTCHA no aparece**
- Verificar que la clave sea correcta
- Asegurarse de estar en `localhost` o dominio configurado

### **Email no se envía**
- Verificar las claves de EmailJS
- Revisar la consola del navegador para errores
- Verificar que el template tenga las variables correctas

### **Errores de validación**
- Asegurarse de completar todos los campos requeridos
- Verificar que el reCAPTCHA esté completado

## 🎯 Próximos Pasos

1. **Probar en producción** con dominio real
2. **Configurar template de EmailJS** con las variables correctas
3. **Personalizar mensajes** de éxito/error
4. **Agregar analytics** para tracking de envíos

---

**¡El formulario está listo para usar! 🎉** 