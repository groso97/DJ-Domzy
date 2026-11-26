import { CONSENT_STORAGE_KEY } from "@/config/constants";

export type ConsentValue = "granted" | "denied";

export type ConsentState = {
  analytics_storage: ConsentValue;
  ad_storage: ConsentValue;
  ad_user_data: ConsentValue;
  ad_personalization: ConsentValue;
};

/** Builds a Consent Mode v2 state from the two user-facing categories. */
export function buildConsent(analytics: boolean, ads: boolean): ConsentState {
  const a: ConsentValue = analytics ? "granted" : "denied";
  const m: ConsentValue = ads ? "granted" : "denied";
  return {
    analytics_storage: a,
    ad_storage: m,
    ad_user_data: m,
    ad_personalization: m,
  };
}

function isConsentState(value: unknown): value is ConsentState {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    ["analytics_storage", "ad_storage", "ad_user_data", "ad_personalization"] as const
  ).every((k) => v[k] === "granted" || v[k] === "denied");
}

/** Reads the saved decision; null = user has not decided yet (or storage unavailable). */
export function getSavedConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isConsentState(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Persists the decision, tells Google (Consent Mode v2) and notifies the UI.
 * Works even if localStorage is blocked – the decision then lasts for this page view only.
 */
export function saveConsent(state: ConsentState) {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage blocked (private mode etc.) – continue without persisting.
  }
  // Typed locally: @next/third-parties already declares Window.dataLayer with a different type.
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };
  w.dataLayer = w.dataLayer || [];
  const layer = w.dataLayer;
  if (typeof w.gtag !== "function") {
    // Normally defined by the inline consent script in <head>. GTM only understands
    // gtag commands pushed as an `arguments` object, not as a plain array.
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      layer.push(arguments);
    };
  }
  w.gtag("consent", "update", state);
  layer.push({ event: "consent_update" });
  window.dispatchEvent(new Event("consent-saved"));
}
