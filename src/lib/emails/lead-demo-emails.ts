type ConfirmationEmailParams = {
  firstName: string;
};

type NotificationEmailParams = {
  name: string;
  email: string;
  phone: string;
  company: string;
  ctaOrigin: string;
};

function wrapEmailLayout(subject: string, content: string): string {
  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${subject}</title>
  </head>
  <body
    style="
      font-family: Arial, sans-serif;
      background-color: #ffffff;
      padding: 2.5rem 0;
      width: 100%;
      text-align: start;
      color: #111827;
      margin: 0;
    "
  >
    <div
      style="
        background-color: white;
        border-radius: 0.5rem;
        max-width: 28rem;
        width: 100%;
        margin: auto;
      "
    >
      

      ${content}

      <div
        style="
          background-color: #f3f4f6;
          padding: 1rem 1.5rem;
          text-align: center;
          font-size: 0.875rem;
          color: #6b7280;
          margin-top: 1rem;
          border-radius: 0.5rem;
        "
      >
        <div style="text-align: center;">
          <img
            src="https://app.facturea.io/assets/icons/logo_primary_color.png"
            alt="Logo Facturea"
            style="height: 30px; margin-bottom: 0.5rem;"
          />
          <a
            href="https://facturea.io"
            style="
              color: #2563eb;
              text-decoration: none;
              display: block;
              margin-bottom: 0.5rem;
            "
          >
            www.facturea.io
          </a>
        </div>
      </div>
    </div>
  </body>
</html>`;
}

export function buildLeadDemoConfirmationEmail({
  firstName,
}: ConfirmationEmailParams): string {
  return wrapEmailLayout(
    "Recibimos tu solicitud — Facturea",
    `<div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        padding: 1rem 1.5rem;
        border: 1px solid #e5e7eb;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        border-radius: 0.5rem;
        margin-top: 1rem;
      "
    >
      <h1
        style="
          font-size: 1.125rem;
          font-weight: 600;
          color: black;
          line-height: 24px;
          margin: 0;
        "
      >
        Ya recibimos tu solicitud
      </h1>
    </div>

    <div
      style="
        background-color: white;
        padding: 1rem 1.5rem;
        border: 1px solid #e5e7eb;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        border-radius: 0.5rem;
        color: black;
        margin-top: 1rem;
      "
    >
      <p>Hola ${firstName},</p>
      <p>Gracias por escribirnos y por considerar a Facturea para mover tu flujo de caja con más velocidad y menos fricción.</p>
      <p>Ya recibimos tu solicitud y nuestro equipo la va a revisar con atención para entender mejor tu perfil y lo que necesitás en este momento.</p>
      <p>En breve uno de nuestros asesores se va a comunicar con vos para orientarte, responder tus dudas y ayudarte a ver si Facturea es una buena opción para tu operación.</p>
      <p style="margin-bottom: 0;">Si preferís avanzar más rápido, también podés escribirnos directamente por WhatsApp.</p>
      <a
        href="https://wa.me/595973481855"
        style="
          display: inline-block;
          background-color: #2563eb;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          border: none;
          margin-top: 1rem;
        "
        target="_blank"
      >
        Hablar con un asesor ahora
      </a>
      <div style="margin-top: 1rem;">
        <p style="margin: 0;">Gracias por confiar en nosotros,</p>
        <p style="margin: 0.25rem 0 0;">Equipo Facturea</p>
      </div>
    `,
  );
}

export function buildLeadDemoNotificationEmail({
  name,
  email,
  phone,
  company,
  ctaOrigin,
}: NotificationEmailParams): string {
  return wrapEmailLayout(
    "Nueva solicitud de demo — Facturea",
    `<div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        padding: 1rem 1.5rem;
        border: 1px solid #e5e7eb;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        border-radius: 0.5rem;
        margin-top: 1rem;
      "
    >
      <h1
        style="
          font-size: 1.125rem;
          font-weight: 600;
          color: black;
          line-height: 24px;
          margin: 0;
        "
      >
        Nueva solicitud de demo
      </h1>
    </div>

    <div
      style="
        background-color: white;
        padding: 1rem 1.5rem;
        border: 1px solid #e5e7eb;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        border-radius: 0.5rem;
        color: black;
        margin-top: 1rem;
      "
    >
      <p>Hola equipo,</p>
      <p>Se registró una nueva solicitud desde la landing.</p>
      <h3 style="font-weight: 600;">Datos del contacto</h3>
      <ul style="margin-top: 0.5rem; list-style: none; padding-left: 0; margin-bottom: 0.5rem;">
        <li>Nombre: ${name}</li>
        <li>Email: ${email}</li>
        <li>Celular: ${phone}</li>
        ${company ? `<li>Empresa: ${company}</li>` : ""}
        <li>Origen CTA: ${ctaOrigin}</li>
        <li>Empresa en Brevo: procesando en background</li>
      </ul>
      <a
        href="https://wa.me/${phone.replace(/\D/g, "")}"
        style="
          display: inline-block;
          background-color: #2563eb;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          border: none;
          margin-top: 1rem;
          margin-right: 0.5rem;
        "
        target="_blank"
      >
        WhatsApp
      </a>
      <a
        href="mailto:${email}"
        style="
          display: inline-block;
          background-color: #2563eb;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          border: none;
          margin-top: 1rem;
        "
        target="_blank"
      >
        Escribir email
      </a>
      <a
        href="https://app.brevo.com/contact/list"
        style="
          display: inline-block;
          background-color: #2563eb;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          border: none;
          margin-top: 1rem;
          margin-left: 0.5rem;
        "
        target="_blank"
      >
        Ver perfil en Brevo
      </a>
      <p style="margin-top: 1rem; margin-bottom: 0; color: #6b7280; font-size: 14px;">
        Buscalo en Brevo con este correo: <strong>${email}</strong>
      </p>
    </div>
    `,

  );
}
