import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center gap-2 transition-opacity duration-200",
        className
      )}
      aria-label="DJ Domza - Početna"
    >
      <Image
        src="/logo-djdomza.svg"
        alt="DJ Domza"
        width={200}
        height={40}
        className="h-8 w-auto md:h-10"
        priority
      />
    </Link>
  );
}
