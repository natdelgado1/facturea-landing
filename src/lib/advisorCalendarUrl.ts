/** URL por defecto del calendario de asesoría (Google Calendar scheduling). */
export const DEFAULT_ADVISOR_CALENDAR_URL =
  "https://calendar.app.google/Ybw5yTj1PQ3wPKpW7";

export function getAdvisorCalendarBaseUrl(): string {
  const fromEnv = import.meta.env.PUBLIC_ADVISOR_CALENDAR_URL;
  if (typeof fromEnv === "string" && fromEnv.trim().length > 0) {
    return fromEnv.trim();
  }
  return DEFAULT_ADVISOR_CALENDAR_URL;
}

/**
 * Añade UTM para atribución en GA4 / informes de adquisición.
 * `utmContent` identifica la ubicación del CTA (hero, about, demo_column, etc.).
 */
export function buildAdvisorCalendarUrl(utmContent: string): string {
  const base = getAdvisorCalendarBaseUrl();
  const params = new URLSearchParams({
    utm_source: "facturea_io",
    utm_medium: "web",
    utm_campaign: "advisor_calendar",
    utm_content: utmContent,
  });
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}${params.toString()}`;
}
