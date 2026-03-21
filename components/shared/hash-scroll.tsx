"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const HEADER_SCROLL_OFFSET = 96;

function scrollToHash() {
  const hash = window.location.hash;
  if (!hash || hash.length < 2) return;
  const id = decodeURIComponent(hash.slice(1));
  const el = document.getElementById(id);
  if (!el) return;
  const top =
    el.getBoundingClientRect().top + window.scrollY - HEADER_SCROLL_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

/**
 * After navigating to `/` with a hash (e.g. from footer on another page),
 * scroll to the target section once the home layout is mounted.
 */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    scrollToHash();
    const t1 = window.setTimeout(scrollToHash, 50);
    const t2 = window.setTimeout(scrollToHash, 200);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [pathname]);

  return null;
}
