import Link from "next/link";
import { Disc3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center gap-2 transition-opacity duration-200",
        className
      )}
      aria-label="DJ Domza - Početna"
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-accent to-secondary opacity-0 blur-lg group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
          <Disc3 className="h-6 w-6 text-white group-hover:rotate-180 transition-transform duration-500" />
        </div>
      </div>
      {showText && (
        <span className="text-2xl font-bold tracking-tight">
          <span className="gradient-text">DJ</span>
          <span className="text-foreground"> Domza</span>
        </span>
      )}
    </Link>
  );
}
