import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2",
        className
      )}
    >
      <Image
        src="/logo-djdomza.svg"
        alt="DJ Domza"
        width={200}
        height={40}
        className="h-8 w-auto md:h-10"
        priority
      />
    </div>
  );
}
