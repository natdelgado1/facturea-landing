/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly EMAILJS_SERVICE_ID: string;
  readonly EMAILJS_TEMPLATE_ID: string;
  readonly EMAILJS_PUBLIC_KEY: string;
  readonly RECAPTCHA_SITE_KEY: string;
  // Variables públicas para Analytics (prefijo PUBLIC_)
  readonly PUBLIC_GA_MEASUREMENT_ID: string;
  readonly PUBLIC_GTM_ID: string;
  readonly PUBLIC_HOTJAR_ID: string;
  readonly PUBLIC_FACEBOOK_PIXEL_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Tipos globales para Analytics
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    trackEvent: (eventName: string, eventCategory: string, eventLabel: string, eventValue?: number) => void;
    grecaptcha: any;
    emailjs: any;
    onRecaptchaCallback: () => void;
    onRecaptchaExpired: () => void;
  }
} 