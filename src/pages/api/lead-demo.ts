import type { APIRoute } from "astro";

import {
  buildLeadDemoConfirmationEmail,
  buildLeadDemoNotificationEmail,
} from "../../lib/emails/lead-demo-emails";

export const prerender = false;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const rateLimitStore = new Map<string, RateLimitEntry>();

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  return realIp || "unknown-ip";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const current = rateLimitStore.get(ip);
  if (!current || now > current.resetAt) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  current.count += 1;
  rateLimitStore.set(ip, current);
  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

function splitName(fullName: string): { firstName: string; lastName: string } {
  const normalized = fullName.trim().replace(/\s+/g, " ");
  const parts = normalized.split(" ");
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: "" };
  }
  return {
    firstName: parts.slice(0, -1).join(" "),
    lastName: parts.slice(-1).join(""),
  };
}

function jsonResponse(status: number, payload: Record<string, unknown>) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

function getEmailMeta(emailValue: string) {
  return {
    length: emailValue.length,
    hasAt: emailValue.includes("@"),
    hasWhitespace: /\s/.test(emailValue),
    hasUppercase: /[A-Z]/.test(emailValue),
    hasNonAscii: /[^\x00-\x7F]/.test(emailValue),
    atCount: (emailValue.match(/@/g) || []).length,
  };
}

async function verifyRecaptcha(
  token: string,
  clientIp: string,
  secret: string,
): Promise<{ success: boolean; score?: number }> {
  const body = new URLSearchParams({
    secret,
    response: token,
    remoteip: clientIp,
  });

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    return { success: false };
  }

  const result = (await response.json()) as { success: boolean; score?: number };
  return result;
}

async function parseJsonSafe(response: Response): Promise<Record<string, unknown> | null> {
  try {
    return (await response.json()) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export const POST: APIRoute = async ({ request }) => {
  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return jsonResponse(429, {
      ok: false,
      errorCode: "rate_limited",
      message: "Demasiadas solicitudes, intenta de nuevo en un minuto.",
    });
  }

  let payload: {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    ctaOrigin?: string;
    recaptchaToken?: string;
  };

  try {
    payload = await request.json();
  } catch {
    return jsonResponse(400, {
      ok: false,
      errorCode: "invalid_json",
      message: "No pudimos procesar la solicitud.",
    });
  }

  const name = (payload.name || "").trim();
  const email = (payload.email || "").trim().toLowerCase();
  const phone = (payload.phone || "").trim();
  const company = (payload.company || "").trim();
  const ctaOrigin = (payload.ctaOrigin || "direct").trim();
  const recaptchaToken = (payload.recaptchaToken || "").trim();
  // #region agent log
  fetch("http://127.0.0.1:7242/ingest/3ef5af8d-605d-41e3-b801-a0bfdb9a1b25", { method: "POST", headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "3ffb4b" }, body: JSON.stringify({ sessionId: "3ffb4b", runId: "pre-fix", hypothesisId: "H1_H2", location: "src/pages/api/lead-demo.ts:payload:normalized", message: "Payload normalizado en API", data: { hasName: !!name, emailMeta: getEmailMeta(email), phoneLength: phone.length, hasRecaptchaToken: !!recaptchaToken, hasCompany: !!company, hasCtaOrigin: !!ctaOrigin }, timestamp: Date.now() }) }).catch(() => {});
  // #endregion

  if (!name || !email || !phone || !recaptchaToken) {
    // #region agent log
    fetch("http://127.0.0.1:7242/ingest/3ef5af8d-605d-41e3-b801-a0bfdb9a1b25", { method: "POST", headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "3ffb4b" }, body: JSON.stringify({ sessionId: "3ffb4b", runId: "pre-fix", hypothesisId: "H2", location: "src/pages/api/lead-demo.ts:validation:missing_required", message: "Validacion required_fields fallida", data: { hasName: !!name, hasEmail: !!email, hasPhone: !!phone, hasRecaptchaToken: !!recaptchaToken }, timestamp: Date.now() }) }).catch(() => {});
    // #endregion
    return jsonResponse(400, {
      ok: false,
      errorCode: "missing_required_fields",
      message: "Faltan campos requeridos.",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[0-9\s\-()]{8,20}$/;
  if (!emailRegex.test(email)) {
    // #region agent log
    fetch("http://127.0.0.1:7242/ingest/3ef5af8d-605d-41e3-b801-a0bfdb9a1b25", { method: "POST", headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "3ffb4b" }, body: JSON.stringify({ sessionId: "3ffb4b", runId: "pre-fix", hypothesisId: "H1_H4", location: "src/pages/api/lead-demo.ts:validation:invalid_email", message: "Email rechazado por regex", data: { emailMeta: getEmailMeta(email), sampleShape: email.replace(/[a-zA-Z0-9]/g, "x").slice(0, 40) }, timestamp: Date.now() }) }).catch(() => {});
    // #endregion
    return jsonResponse(400, {
      ok: false,
      errorCode: "invalid_email_format",
      message: "El correo no tiene un formato valido.",
    });
  }

  if (!phoneRegex.test(phone)) {
    return jsonResponse(400, {
      ok: false,
      errorCode: "invalid_phone_format",
      message: "El celular no tiene un formato valido.",
    });
  }

  const recaptchaSecret = import.meta.env.RECAPTCHA_SECRET;
  const brevoApiKey = import.meta.env.BREVO_API_KEY;
  const brevoListRaw = import.meta.env.BREVO_LIST_ID;

  const missingEnv: string[] = [];
  if (!recaptchaSecret) missingEnv.push("RECAPTCHA_SECRET");
  if (!brevoApiKey) missingEnv.push("BREVO_API_KEY");
  if (!brevoListRaw) missingEnv.push("BREVO_LIST_ID");

  if (missingEnv.length > 0) {
    return jsonResponse(500, {
      ok: false,
      errorCode: "missing_server_env",
      missingEnv,
      message: "Falta configuracion del servidor para procesar la solicitud.",
    });
  }

  const brevoListId = Number.parseInt(brevoListRaw, 10);
  if (!Number.isInteger(brevoListId)) {
    return jsonResponse(500, {
      ok: false,
      errorCode: "invalid_brevo_list_id",
      message: "La lista de Brevo no esta configurada correctamente.",
    });
  }

  const recaptchaResult = await verifyRecaptcha(recaptchaToken, clientIp, recaptchaSecret);
  if (!recaptchaResult.success || (recaptchaResult.score ?? 0) < 0.5) {
    return jsonResponse(403, {
      ok: false,
      errorCode: "recaptcha_failed",
      message: "No pudimos validar la seguridad de la solicitud.",
    });
  }

  const { firstName, lastName } = splitName(name);

  async function brevoApiRequest(path: string, init: RequestInit) {
    const response = await fetch(`https://api.brevo.com/v3${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "api-key": brevoApiKey,
        ...(init.headers || {}),
      },
    });
    const payload = await parseJsonSafe(response);
    return { response, payload };
  }

  const brevoSenderEmail = import.meta.env.BREVO_SENDER_EMAIL || "no-reply@facturea.io";
  const brevoSenderName = import.meta.env.BREVO_SENDER_NAME || "Facturea";
  const brevoNotificationEmail = import.meta.env.BREVO_NOTIFICATION_EMAIL || "";

  async function sendTransactionalEmail(params: {
    to: { email: string; name?: string }[];
    subject: string;
    htmlContent: string;
  }) {
    await brevoApiRequest("/smtp/email", {
      method: "POST",
      body: JSON.stringify({
        sender: { name: brevoSenderName, email: brevoSenderEmail },
        to: params.to,
        subject: params.subject,
        htmlContent: params.htmlContent,
      }),
    });
  }

  const baseAttributes = {
    FIRSTNAME: firstName,
    LASTNAME: lastName,
    PHONE: phone,
    SMS: phone,
    COMPANY: company || undefined,
    SOURCE: "landing_solicitar_demo",
    CTA_ORIGIN: ctaOrigin,
  };

  async function sendToBrevo(attributes: Record<string, unknown>) {
    const { response, payload } = await brevoApiRequest("/contacts", {
      method: "POST",
      body: JSON.stringify({
        email,
        updateEnabled: true,
        listIds: [brevoListId],
        attributes,
      }),
    });
    return { response, payload };
  }

  let { response: brevoResponse, payload: brevoPayload } = await sendToBrevo(baseAttributes);

  if (!brevoResponse.ok) {
    const errorPayload = (brevoPayload || {}) as {
      code?: string;
      message?: string;
      metadata?: { duplicate_identifiers?: string[] };
      [key: string]: unknown;
    };

    const duplicateIdentifiers = errorPayload?.metadata?.duplicate_identifiers || [];
    const hasSmsDuplicate = errorPayload?.code === "duplicate_parameter" && duplicateIdentifiers.includes("SMS");

    if (hasSmsDuplicate) {
      const retryAttributes = {
        FIRSTNAME: firstName,
        LASTNAME: lastName,
        PHONE: phone,
        COMPANY: company || undefined,
        SOURCE: "landing_solicitar_demo",
        CTA_ORIGIN: ctaOrigin,
      };
      const retry = await sendToBrevo(retryAttributes);
      brevoResponse = retry.response;
      brevoPayload = retry.payload;
    }
  }

  if (!brevoResponse.ok) {
    const finalErrorPayload = (brevoPayload || {}) as {
      code?: string;
      message?: string;
      [key: string]: unknown;
    };
    const brevoError = finalErrorPayload?.code || "brevo_request_failed";
    const brevoMessage = typeof finalErrorPayload?.message === "string" ? finalErrorPayload.message : null;

    return jsonResponse(502, {
      ok: false,
      errorCode: brevoError,
      brevoMessage,
      brevoStatus: brevoResponse.status,
      brevoPayload: finalErrorPayload,
      sentAttributes: {
        hasFirstName: !!firstName,
        hasLastName: !!lastName,
        hasPhone: !!phone,
        hasSms: true,
        hasCompany: !!company,
        hasSource: true,
        hasCtaOrigin: !!ctaOrigin,
      },
      message: "No pudimos guardar el lead en Brevo.",
    });
  }

  // ── Background: company linking + emails (no bloquean la respuesta) ─────────
  // Se lanzan sin await para que el usuario reciba el 200 de inmediato.
  // En Node.js las promesas pendientes siguen ejecutándose tras enviar la respuesta.

  async function linkCompanyBackground() {
    if (!company) return;
    const contactLookup = await brevoApiRequest(
      `/contacts/${encodeURIComponent(email)}?identifierType=email_id`,
      { method: "GET" },
    );
    if (!contactLookup.response.ok) return;

    const contactIdRaw = contactLookup.payload?.id;
    const contactId =
      typeof contactIdRaw === "number"
        ? contactIdRaw
        : typeof contactIdRaw === "string"
          ? Number.parseInt(contactIdRaw, 10)
          : Number.NaN;
    if (!Number.isFinite(contactId)) return;

    const companyFilter = encodeURIComponent(
      JSON.stringify({ "attributes.name": company }),
    );
    const companySearch = await brevoApiRequest(
      `/companies?filters=${companyFilter}&limit=1`,
      { method: "GET" },
    );

    let existingCompanyId: string | null = null;
    if (companySearch.response.ok) {
      const items = companySearch.payload?.items;
      if (Array.isArray(items) && items.length > 0) {
        const first = items[0] as { id?: string };
        if (typeof first?.id === "string" && first.id) {
          existingCompanyId = first.id;
        }
      }
    }

    if (existingCompanyId) {
      await brevoApiRequest(`/companies/link-unlink/${existingCompanyId}`, {
        method: "PATCH",
        body: JSON.stringify({ linkContactIds: [contactId] }),
      });
    } else {
      await brevoApiRequest("/companies", {
        method: "POST",
        body: JSON.stringify({ name: company, linkedContactsIds: [contactId] }),
      });
    }
  }

  // ── Fire-and-forget: emails + company linking en paralelo ───────────────────
  // La respuesta 200 se devuelve ANTES de que terminen estas tareas.
  const confirmationEmailHtml = buildLeadDemoConfirmationEmail({ firstName });
  const notificationEmailHtml = buildLeadDemoNotificationEmail({
    name,
    email,
    phone,
    company,
    ctaOrigin,
  });

  // Fire-and-forget: emails + company linking en paralelo
  // La respuesta 200 se devuelve ANTES de que terminen estas tareas
  Promise.allSettled([
    linkCompanyBackground(),
    sendTransactionalEmail({
      to: [{ email, name: firstName }],
      subject: `${firstName}, recibimos tu solicitud ✓`,
      htmlContent: confirmationEmailHtml,
    }),
    ...(brevoNotificationEmail
      ? [sendTransactionalEmail({
          to: [{ email: brevoNotificationEmail, name: "Facturea Equipo" }],
          subject: `Nueva solicitud de demo — ${name}`,
          htmlContent: notificationEmailHtml,
        })]
      : []),
  ]).catch(() => {});

  return jsonResponse(200, {
    ok: true,
    message: "Lead registrado correctamente.",
  });
};
