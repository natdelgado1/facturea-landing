export const error404Data = {
  title: "¡Ups! Página no encontrada",
  subtitle: "La página que buscas no existe o ha sido movida",
  description: "No te preocupes, esto le pasa a todos. Puedes volver al inicio o explorar nuestras secciones principales.",
  
  // Información del error
  errorCode: "404",
  errorMessage: "Página no encontrada",
  
  // Botones de acción
  actions: {
    primary: {
      text: "Volver al inicio",
      href: "/",
      icon: "home"
    },
    secondary: {
      text: "Contactar soporte",
      href: "#contacto",
      icon: "help"
    }
  },
  
  // Enlaces rápidos útiles
  quickLinks: [
    {
      title: "¿Por qué Facturea?",
      description: "Conoce las ventajas de nuestra plataforma",
      href: "#por-que-facturea",
      icon: "star"
    },
    {
      title: "¿Cómo funciona?",
      description: "Aprende sobre nuestro proceso",
      href: "#como-funciona",
      icon: "play"
    },
    {
      title: "Preguntas frecuentes",
      description: "Encuentra respuestas rápidas",
      href: "#faq",
      icon: "help-circle"
    },
    {
      title: "Contacto",
      description: "Habla con nuestro equipo",
      href: "#contacto",
      icon: "message-circle"
    }
  ],
  
  // Mensaje de ayuda
  helpMessage: "¿Necesitas ayuda? Nuestro equipo está aquí para asistirte.",
  
  // SEO
  seo: {
    title: "404 - Página no encontrada | Facturea.io",
    description: "La página que buscas no existe. Vuelve al inicio de Facturea.io para adelantar facturas electrónicas en Paraguay.",
    keywords: "404, página no encontrada, error, Facturea, Paraguay"
  }
}; 