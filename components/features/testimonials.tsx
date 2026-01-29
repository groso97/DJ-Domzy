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
    <section ref={sectionRef} className="py-20 md:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
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
                className={`relative flex-shrink-0 w-full md:w-[calc(33.333%-1rem)] ${
                  isSectionVisible ? 'animate-carousel-slide' : 'opacity-0'
                }`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  willChange: 'transform, opacity'
                }}
              >
                <Quote className="absolute top-4 right-4 h-12 w-12 text-primary/10" />
                
                <CardContent className="pt-6">
                  {/* Stars - fill one by one, blue, stay visible */}
                  <div className="flex gap-1 mb-4">
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

                  <blockquote className="text-muted-foreground leading-relaxed mb-6 font-serif">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>

                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dots indicator only (no click, no arrows) */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <span
                key={index}
                className={`h-2 rounded-full transition-all duration-300 pointer-events-none ${
                  index === currentIndex 
                    ? 'w-8 bg-primary' 
                    : 'w-2 bg-muted-foreground/30'
                }`}
                aria-hidden
              />
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
