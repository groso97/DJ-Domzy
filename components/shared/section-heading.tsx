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
  badge = "DJ Domzy",
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && "text-center", "mb-12 md:mb-16", className)}>
      {/* Badge above title */}
      <div className="mb-6 flex justify-center">
        <div className="relative inline-block">
          {/* Pulsing purple glow outside badge only */}
          <div className="absolute inset-0 rounded-full bg-[#A855F7] blur-md badge-glow-inner"></div>
          <div className="absolute inset-0 rounded-full bg-[#A855F7] blur-xl badge-glow-outer"></div>
          
          {/* Badge with dark background */}
          <div className="relative inline-flex items-center gap-3 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border-2 border-[#A855F7] bg-[#1a0d2e] text-white text-sm sm:text-base font-semibold badge-glow-shadow">
            {/* Dot */}
            <span className="relative flex h-2.5 w-2.5 z-10">
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#A855F7]"></span>
            </span>
            
            {/* Badge text */}
            <span className="relative z-10">{badge}</span>
          </div>
        </div>
      </div>
      
      {/* Title with white text */}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-white">
        {title}
      </h2>
      
      {/* Subtitle */}
      {subtitle && (
        <p className="mt-4 text-lg text-white max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
