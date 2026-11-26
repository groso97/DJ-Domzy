"use client";

import type { ReactNode } from "react";

/** Re-opens the cookie banner so the user can change / withdraw consent. */
export function CookieSettingsButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
    >
      {children}
    </button>
  );
}
