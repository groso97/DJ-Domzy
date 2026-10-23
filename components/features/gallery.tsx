"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { galleryImages } from "@/config/constants";
import { useIntersectionObserver } from "@/hooks";

export function Gallery() {
  const [sectionRef, isSectionVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1, triggerOnce: true });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const isOpen = activeIndex !== null;
  const total = galleryImages.length;

  const open = (index: number, trigger: HTMLElement) => {
    lastTriggerRef.current = trigger;
    setActiveIndex(index);
  };

  const close = useCallback(() => {
    setActiveIndex(null);
    lastTriggerRef.current?.focus();
  }, []);

  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i - 1 + total) % total)),
    [total]
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % total)),
    [total]
  );

  // Keyboard controls + scroll lock while the lightbox is open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") showPrev();
      else if (e.key === "ArrowRight") showNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, close, showPrev, showNext]);

  const activeImage = activeIndex !== null ? galleryImages[activeIndex] : null;

  return (
    <section ref={sectionRef} id="galerija" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#2563EB]/5 rounded-full blur-3xl" />
      </div>

      <div className="content-width relative z-10">
        <SectionHeading
          badge="Galerija"
          title="Trenuci s nastupa"
          subtitle="Mali pogled iza DJ pulta – eventi, atmosfera i energija koja se pamti"
          centered={false}
        />

        {/*
          Bento layout: the first (landscape) photo spans two columns, the portrait
          photos fill the rest. Row height comes from the 3:4 portrait tiles.
        */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={(e) => open(index, e.currentTarget)}
              aria-label={`Povećaj fotografiju ${index + 1} od ${total}: ${image.alt}`}
              className={`group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0C0F15]/80 text-left transition-[border-color,box-shadow] duration-300 hover:border-primary/50 hover:shadow-[0_0_32px_rgba(37,99,235,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                index === 0 ? "col-span-2 aspect-[3/2] lg:aspect-auto" : "aspect-[3/4]"
              } ${isSectionVisible ? "animate-section-reveal" : "opacity-0"}`}
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={index === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"}
                className="object-cover object-[50%_20%] transition-transform duration-500 ease-out group-hover:scale-105"
              />
              {/* Brand-tinted overlay + zoom hint */}
              <div className="absolute inset-0 bg-linear-to-t from-[#0A111F]/80 via-[#2563EB]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
              <div className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary/90 text-white opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0">
                <ZoomIn className="h-5 w-5" aria-hidden />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {activeImage && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Pregled fotografije"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0A111F]/95 backdrop-blur-sm animate-fade-in"
          onClick={close}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            aria-label="Zatvori galeriju"
            className="absolute right-4 top-4 md:right-8 md:top-8 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#0C0F15]/80 text-white transition-colors hover:border-primary/60 hover:bg-primary/20"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Prethodna fotografija"
            className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#0C0F15]/80 text-white transition-colors hover:border-primary/60 hover:bg-primary/20"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Sljedeća fotografija"
            className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#0C0F15]/80 text-white transition-colors hover:border-primary/60 hover:bg-primary/20"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <figure className="flex max-h-full max-w-full flex-col items-center px-16 py-16 md:px-28" onClick={(e) => e.stopPropagation()}>
            <Image
              key={activeImage.src}
              src={activeImage.src}
              alt={activeImage.alt}
              width={activeImage.width}
              height={activeImage.height}
              sizes="90vw"
              priority
              className="h-auto max-h-[78vh] w-auto max-w-full rounded-xl border border-white/10 object-contain shadow-2xl shadow-black/60"
            />
            <figcaption className="mt-4 text-sm text-muted-foreground">
              {activeIndex + 1} / {total}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
