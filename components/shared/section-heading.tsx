import { cn } from "@/lib/utils";
import { SectionBadge } from "@/components/shared/section-badge";

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
    <div className={cn(centered ? "text-center" : "text-left", "mb-14 md:mb-20", className)}>
      {/* Badge above title */}
      <div className={cn("flex mb-6", centered ? "justify-center" : "justify-start")}>
        <SectionBadge text={badge} />
      </div>

      {/* Title with proper size hierarchy */}
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
        {title}
      </h2>
      
      {/* Subtitle with proper color */}
      {subtitle && (
        <p className={cn("mt-5 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed", centered ? "mx-auto" : "")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
