"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Fixed header is h-20 (80px); extra padding so title clears the bar */
const HEADER_SCROLL_OFFSET = 96;

function scrollToSectionId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top =
    el.getBoundingClientRect().top + window.scrollY - HEADER_SCROLL_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

interface HashLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

/**
 * Same as Next Link, but when already on `/` and href is `/#sectionId`,
 * scrolls to the element instead of relying on default behavior (often a no-op).
 */
export function HashLink({ href, className, children }: HashLinkProps) {
  const pathname = usePathname();
  const hashMatch = /^\/#(.+)$/.exec(href);

  if (!hashMatch) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  const sectionId = hashMatch[1];

  return (
    <Link
      href={href}
      className={className}
      onClick={(e) => {
        if (pathname !== "/") return;
        e.preventDefault();
        window.history.pushState(null, "", href);
        scrollToSectionId(sectionId);
      }}
    >
      {children}
    </Link>
  );
}
