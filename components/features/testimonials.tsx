"use client";

import React, { useState, useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { testimonials } from "@/config/constants";
import { useIntersectionObserver } from "@/hooks";

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sectionRef, isSectionVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.2, triggerOnce: true });
  const autoSlideRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  // Auto-slide only - no user control
  useEffect(() => {
    if (isSectionVisible) {
      autoSlideRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [isSectionVisible]);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      <div className="content-width">
        <SectionHeading
          badge="Recenzije"
          title="Što kažu klijenti"
          subtitle="Recenzije zadovoljnih klijenata su moja najveća nagrada"
          centered={false}
        />

        {/* Carousel - auto only, no arrows */}
        <div className="relative mt-12 overflow-hidden">
          <div 
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / 3)}%)`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className={`relative shrink-0 w-full md:w-[calc(33.333%-1rem)] ${
                  isSectionVisible ? 'animate-carousel-slide' : 'opacity-0'
                }`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  willChange: 'transform, opacity'
                }}
              >
                <CardContent className="pt-8 pl-8 pr-8 pb-8 relative">
                  <Quote className="absolute left-6 top-6 h-10 w-10 text-primary/20" aria-hidden />
                  {/* Stars - fill one by one, blue, stay visible - moved to right */}
                  <div className="flex gap-1 mb-5 justify-end">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-primary fill-primary animate-star-fill-one opacity-0"
                        style={{ 
                          animationDelay: `${0.4 + i * 0.15}s`,
                          animationFillMode: 'forwards',
                        }}
                      />
                    ))}
                  </div>

                  <blockquote className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>

                  <div className="flex items-center gap-4 pt-5 border-t border-border">
                    <div className="h-12 w-12 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-base">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
