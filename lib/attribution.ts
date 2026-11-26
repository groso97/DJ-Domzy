const KEY = "djdomza-attribution";
const PARAMS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

/**
 * Stores ad click id / UTM parameters from the current URL for this session,
 * so they can be sent along with the contact form. Never overwrites with empty data.
 */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    const url = new URL(window.location.href);
    const found: Record<string, string> = {};
    PARAMS.forEach((p) => {
      const v = url.searchParams.get(p);
      if (v) found[p] = v.slice(0, 200);
    });
    if (Object.keys(found).length) {
      found.landing_page = url.pathname;
      found.captured_at = new Date().toISOString();
      sessionStorage.setItem(KEY, JSON.stringify(found));
    }
  } catch {
    // Storage blocked – attribution is simply skipped.
  }
}

export function getAttribution(): Record<string, string> {
  try {
    const parsed: unknown = JSON.parse(sessionStorage.getItem(KEY) || "{}");
    if (!parsed || typeof parsed !== "object") return {};
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(parsed)) {
      if (typeof v === "string") out[k] = v;
    }
    return out;
  } catch {
    return {};
  }
}
