# 📧 CONFIGURACIÓN EMAILJS - PASO A PASO

## 🎯 **Paso 1: Crear Cuenta en EmailJS**

1. **Ir a:** [www.emailjs.com](https://www.emailjs.com)
2. **Hacer clic:** "Get Started Free"
3. **Registrarse** con tu email corporativo
4. **Verificar** tu cuenta de email

## 🎯 **Paso 2: Configurar Email Service**

### **Opción A: Gmail (Recomendado para empezar)**
1. **Dashboard** → **Email Services**
2. **Hacer clic:** "Add New Service"
3. **Seleccionar:** "Gmail"
4. **Conectar** tu cuenta de Gmail
5. **Autorizar** el acceso
6. **Guardar** el Service ID

### **Opción B: Email Corporativo**
1. **Dashboard** → **Email Services**
2. **Hacer clic:** "Add New Service"
3. **Seleccionar:** "Custom SMTP"
4. **Configurar:**
   - **SMTP Host:** smtp.gmail.com (o tu servidor)
   - **SMTP Port:** 587
   - **Username:** tu-email@facturea.io
   - **Password:** contraseña de aplicación
5. **Guardar** el Service ID

## 🎯 **Paso 3: Crear Email Template**

1. **Dashboard** → **Email Templates**
2. **Hacer clic:** "Create New Template"
3. **Configurar:**

### **Template HTML Completo (Copiar y Pegar):**

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo Mensaje de Contacto</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: #f8fafc; line-height: 1.6;">
    
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8fafc; padding: 20px 0;">
        <tr>
            <td align="center">
                
                <!-- Container Principal -->
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 20px rgba(99, 86, 229, 0.15); overflow: hidden; border: 1px solid rgba(99, 86, 229, 0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #6356e5 0%, #7c69ef 100%); background-color: #6356e5; padding: 40px 30px; text-align: center; position: relative;">
                            
                            <!-- Badge Nuevo Contacto -->
                            <div style="display: inline-block; background-color: rgba(255,255,255,0.2); color: #ffffff; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.3);">
                                🌟 Nuevo Contacto
                            </div>
                            
                            <h1 style="color: #ffffff; font-size: 28px; font-weight: 600; margin: 0; letter-spacing: -0.5px; text-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                                Nuevo Mensaje de Contacto
                            </h1>
                            
                           
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            
                            <!-- Campo: Nombre -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 24px; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; background-color: #fafbfc;">
                                <tr>
                                    <td style="background: linear-gradient(135deg, #6356e5 0%, #7c69ef 100%); background-color: #6356e5; color: #ffffff; padding: 12px 20px; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                        Nombre del contacto
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px; font-size: 16px; color: #2d3748; font-weight: 500; background-color: #ffffff; word-wrap: break-word;">
                                        {{fullName}}
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Campo: Email -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 24px; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; background-color: #fafbfc;">
                                <tr>
                                    <td style="background: linear-gradient(135deg, #6356e5 0%, #7c69ef 100%); background-color: #6356e5; color: #ffffff; padding: 12px 20px; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                        Dirección de email
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px; font-size: 16px; color: #2d3748; font-weight: 500; background-color: #ffffff; word-wrap: break-word;">
                                        <a href="mailto:{{email}}" style="color: #6356e5; text-decoration: none;">{{email}}</a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Campo: Tipo Usuario -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 24px; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; background-color: #fafbfc;">
                                <tr>
                                    <td style="background: linear-gradient(135deg, #6356e5 0%, #7c69ef 100%); background-color: #6356e5; color: #ffffff; padding: 12px 20px; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                        Tipo de usuario
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px; font-size: 16px; color: #2d3748; font-weight: 500; background-color: #ffffff; word-wrap: break-word;">
                                        <span style="background-color: rgba(99, 86, 229, 0.1); color: #6356e5; padding: 4px 12px; border-radius: 16px; font-size: 14px; font-weight: 600;">{{userType}}</span>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Campo: Mensaje -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 24px; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; background-color: #fafbfc;">
                                <tr>
                                    <td style="background: linear-gradient(135deg, #6356e5 0%, #7c69ef 100%); background-color: #6356e5; color: #ffffff; padding: 12px 20px; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                        Mensaje
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px; font-size: 16px; color: #4a5568; line-height: 1.8; background-color: #ffffff; white-space: pre-wrap; word-wrap: break-word; border-left: 4px solid #6356e5; background: linear-gradient(135deg, rgba(99, 86, 229, 0.02) 0%, rgba(124, 105, 239, 0.02) 100%); background-color: rgba(99, 86, 229, 0.02);">
                                        {{message}}
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Botón de Respuesta -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 32px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="mailto:{{email}}" style="display: inline-block; background: linear-gradient(135deg, #6356e5 0%, #7c69ef 100%); background-color: #6356e5; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 16px; letter-spacing: 0.5px;">
                                            📧 Responder Mensaje
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                            <p style="color: #718096; font-size: 14px; margin: 0; line-height: 1.6; font-style: italic;">
                                Este mensaje fue enviado desde el formulario de contacto de tu sitio web.
                            </p>
                            <p style="margin-top: 10px; font-size: 12px; color: #a0aec0; margin-bottom: 0;">
                                Sistema de notificaciones automáticas • No responder a este email
                            </p>
                            
                            <!-- Información adicional -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 20px;">
                                <tr>
                                    <td align="center">
                                       
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                
            </td>
        </tr>
    </table>
    
</body>
</html>
```

### **Variables del Template:**
- `{{fullName}}` - Nombre completo del usuario
- `{{email}}` - Email del usuario
- `{{userType}}` - Tipo de usuario (ej: "Empresa", "Inversor")
- `{{message}}` - Mensaje del usuario

4. **Guardar** el Template ID

## 🎯 **Paso 4: Obtener API Key**

1. **Dashboard** → **Account** → **API Keys**
2. **Copiar** la Public Key
3. **Guardar** en lugar seguro

## 🎯 **Paso 5: Enviar estos datos**

  serviceId: 'service_xxxxxxx', // Tu Service ID
  templateId: 'template_xxxxxxx', // Tu Template ID
  publicKey: 'user_xxxxxxxxxxxxxxxxxxxx' // Tu Public Key


## 🎯 **Paso 6: Configurar Emails de Destino**

### **Email Principal:**
- **Para:** hola@facturea.io o contacto@facturea.io
- **Asunto:** Nuevo Lead - Facturea.io

### **Email CC (Desarrollo):**
- **CC:** devs@facturea.io (si tenemos)
- **Para seguimiento técnico**

## 🎯 **Paso 7: Probar Configuración**

1. **Ir a la landing page**
2. **Completar formulario de prueba**
3. **Verificar** que llega el email
4. **Revisar** datos en EmailJS Dashboard

## 🔑 **CREDENCIALES QUE NECESITAS OBTENER**

### **1. Service ID**
- **Formato:** `service_xxxxxxx`
- **Dónde obtener:** Dashboard → Email Services → Tu servicio
- **Ejemplo:** `service_facturea_gmail`

### **2. Template ID**
- **Formato:** `template_xxxxxxx`
- **Dónde obtener:** Dashboard → Email Templates → Tu template
- **Ejemplo:** `template_facturea_contact`

### **3. Public Key**
- **Formato:** `user_xxxxxxxxxxxxxxxxxxxx`
- **Dónde obtener:** Dashboard → Account → API Keys
- **Ejemplo:** `user_a1b2c3d4e5f6g7h8i9j0`

### **4. Email de Servicio**
- **Opciones:**
  - **Gmail:** tu-email@gmail.com
  - **Corporativo:** contacto@facturea.io
  - **SMTP personalizado:** Tu servidor de email

## 📊 **Monitoreo de Uso**

### **Plan Gratuito:**
- **200 emails/mes**
- **Dashboard básico**
- **Soporte por email**

