"use client";

import { cn } from "@/lib/utils";

interface SectionBadgeProps {
  text: string;
  className?: string;
}

export function SectionBadge({ text, className }: SectionBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full px-4 py-1.5",
        "bg-[#020202] border-2 border-[#2563EB]/30 text-[#2563EB]",
        "font-semibold text-xs uppercase tracking-wider",
        "animate-pulse-glow-badge shadow-[0_0_15px_rgba(37,99,235,0.3)]",
        "drop-shadow-[0_0_8px_rgba(37,99,235,0.8)]",
        className
      )}
    >
      {text}
    </div>
  );
}
