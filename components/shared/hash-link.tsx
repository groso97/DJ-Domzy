"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

/** Fixed header is h-20 (80px); extra padding so title clears the bar */
const HEADER_SCROLL_OFFSET = 96;

function scrollToSectionId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top =
    el.getBoundingClientRect().top + window.scrollY - HEADER_SCROLL_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

type HashLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

/**
 * Same as Next Link, but for `/#sectionId` hrefs: if the CURRENT page already contains an
 * element with that id (home page, but also every landing page with its own #kontakt form),
 * it scrolls there instead of navigating to `/`. Otherwise the normal navigation happens
 * and HashScroll scrolls after arriving on the home page.
 * Forwards all other props (incl. ref), so it works as a child of `<Button asChild>`.
 */
export function HashLink({ href, onClick, ...props }: HashLinkProps) {
  const hashMatch = /^\/#(.+)$/.exec(href);

  if (!hashMatch) {
    return <Link href={href} onClick={onClick} {...props} />;
  }

  const sectionId = hashMatch[1];

  return (
    <Link
      href={href}
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (!document.getElementById(sectionId)) return;
        e.preventDefault();
        window.history.pushState(null, "", `#${sectionId}`);
        scrollToSectionId(sectionId);
      }}
    />
  );
}
