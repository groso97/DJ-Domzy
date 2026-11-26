/** Pushes a custom event to the GTM dataLayer (no-op on the server). */
export function trackEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  // Typed locally: @next/third-parties already declares Window.dataLayer with a different type.
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}

/**
 * Normalises a phone number to E.164 without spaces (e.g. +385991234567)
 * for Google Ads enhanced conversions. Returns undefined if it looks invalid.
 */
export function normalizePhone(phone?: string) {
  if (!phone) return undefined;
  let p = phone.replace(/[^\d+]/g, "");
  if (p.startsWith("00")) p = "+" + p.slice(2);
  else if (p.startsWith("0")) p = "+385" + p.slice(1);
  else if (!p.startsWith("+")) p = "+" + p;
  return p.length >= 10 ? p : undefined;
}
