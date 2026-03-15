// GA4 event tracking utilities
// Replace GA_MEASUREMENT_ID with actual ID in production

type EventName =
  | "view_product"
  | "begin_quote"
  | "view_pricing"
  | "select_provider"
  | "begin_checkout"
  | "purchase"
  | "drop_off"
  | "click_cta";

interface EventParams {
  product?: string;
  type?: string;
  provider?: string;
  tier?: string;
  premium?: number;
  step?: string;
  source?: string;
  [key: string]: string | number | undefined;
}

export function trackEvent(name: EventName, params: EventParams = {}): void {
  if (typeof window === "undefined") return;

  // GA4
  const gtag = (window as unknown as Record<string, unknown>).gtag as
    | ((...args: unknown[]) => void)
    | undefined;
  if (gtag) {
    gtag("event", name, {
      ...params,
      event_category: "insurance",
      timestamp: Date.now(),
    });
  }

  // Console log in dev
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${name}`, params);
  }
}

export function trackPageView(path: string, title: string): void {
  if (typeof window === "undefined") return;

  const gtag = (window as unknown as Record<string, unknown>).gtag as
    | ((...args: unknown[]) => void)
    | undefined;
  if (gtag) {
    gtag("event", "page_view", {
      page_path: path,
      page_title: title,
    });
  }
}
