"use client";

import React, { useState, useEffect, useRef } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { testimonials } from "@/config/constants";
import { useIntersectionObserver } from "@/hooks";
import { Button } from "@/components/ui/button";

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [sectionRef, isSectionVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.2, triggerOnce: true });
  const autoSlideRef = useRef<ReturnType<typeof setInterval>>();

  // Auto-slide every 5 seconds
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

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }
    if (isRightSwipe) {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Što kažu klijenti"
          subtitle="Recenzije zadovoljnih klijenata su moja najveća nagrada"
        />

        {/* Carousel Container */}
        <div className="relative mt-12 overflow-hidden">
          {/* Cards Container */}
          <div 
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              transform: `translateX(-${currentIndex * (100 / 3)}%)`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className={`relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover-scale optimize-animation flex-shrink-0 w-full md:w-[calc(33.333%-1rem)] ${
                  isSectionVisible ? 'animate-carousel-slide' : 'opacity-0'
                }`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  willChange: 'transform, opacity'
                }}
              >
                {/* Quote icon */}
                <Quote className="absolute top-4 right-4 h-12 w-12 text-primary/10" />
                
                <CardContent className="pt-6">
                  {/* Rating - Sparkle effect */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 fill-yellow-500 text-yellow-500 optimize-animation ${
                          isSectionVisible ? 'animate-star-sparkle' : ''
                        }`}
                        style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-muted-foreground leading-relaxed mb-6 font-serif">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>

                  {/* Author */}
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

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="hover-scale"
              aria-label="Prethodna recenzija"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'w-8 bg-[#A855F7]' 
                      : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="hover-scale"
              aria-label="Sljedeća recenzija"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
