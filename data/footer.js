export const footer = {
  // Logo (solo referencia, el import se hace en el componente)
  logoAlt: "Logo de Facturea.io",

  // Descripción principal
  description: "La primera fintech de adelanto de facturas electrónicas en Paraguay. Conectamos PYMEs que necesitan liquidez con inversores que buscan rentabilidad.",

  // Redes sociales
  socialMedia: [
    {
      label: "twitter",
      icon: `<svg fill=\"currentColor\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z\" /></svg>`,
      href: "https://www.instagram.com/facturea.io/",
    },
    {
      label: "linkedin",
      icon: `<svg fill=\"currentColor\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z\" /></svg>`,
      href: "https://www.linkedin.com/company/facturea.io/",
    },
    {
      label: "facebook",
      icon: `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-facebook\"><path d=\"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z\" /></svg>`,
      href: "https://www.facebook.com/facturea.io/",
    },
    {
      label: "instagram",
      icon: `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-instagram\"><path d=\"M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5Z\" /><path d=\"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z\" /><circle cx=\"12\" cy=\"12\" r=\"3\" /></svg>`,
      href: "https://www.instagram.com/facturea.io/",
    },
  ],

  // Enlaces rápidos
  quickLinks: [
    { label: "Beneficios", href: "#por-que-facturea" },
    { label: "Cómo funciona", href: "#como-funciona" },
    { label: "FAQ", href: "#faq" },
  ],
  contact: {
    label: "Contacto",
    items: [
      {
        type: "email",
        label: "Email",
        value: "hola@facturea.io",
        href: "mailto:hola@facturea.io",
        icon: `<svg class=\"w-5 h-5 text-primary\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z\" /></svg>`
      },
      {
        type: "location",
        label: "Ubicación",
        value: "Asunción, Paraguay",
        href: "https://www.google.com/maps/place/Asunci%C3%B3n,+Paraguay",
        icon: `<svg class=\"w-5 h-5 text-accent\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z\" /><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15 11a3 3 0 11-6 0 3 3 0 016 0z\"></svg>`
      }
    ]
  },   

  // Enlaces legales
  legalLinks: [
    { label: "Términos y Condiciones", href: "/terminos" },
    { label: "Política de Privacidad", href: "/privacidad" },
  ],

  // Copyright
  copyright: "© 2025 Facturea.io. Todos los derechos reservados."
};
