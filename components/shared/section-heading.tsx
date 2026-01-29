import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  badge = "DJ Domza",
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered ? "text-center" : "text-left", "mb-12 md:mb-16", className)}>
      {/* Badge above title - pill style like reference */}
      <div className={cn("mb-6 flex", centered ? "justify-center" : "justify-start")}>
        <div className="relative inline-flex items-center gap-2 rounded-full border-2 border-primary bg-[#0C0F15] px-5 py-2 sm:px-6 sm:py-2.5">
          <span className="relative flex h-2 w-2 rounded-full bg-primary shrink-0" />
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">{badge}</span>
        </div>
      </div>
      
      {/* Title with white text */}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-white">
        {title}
      </h2>
      
      {/* Subtitle */}
      {subtitle && (
        <p className={cn("mt-4 text-lg text-white max-w-2xl", centered ? "mx-auto" : "")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
