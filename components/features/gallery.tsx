"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { galleryImages } from "@/config/constants";

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="galerija" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Galerija"
          subtitle="Pogledajte atmosferu s nekih od mojih nastupa"
        />

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(index)}
              className={`group relative overflow-hidden rounded-2xl aspect-square ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              {/* Placeholder gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-accent/40 to-secondary/60 transition-transform duration-500 group-hover:scale-110" />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <Play className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* Image label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white text-sm font-medium">{image.alt}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Video Section */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-card border">
            <div className="flex items-center gap-2 text-[#A855F7]">
              <Play className="h-6 w-6" />
              <span className="font-semibold">Video sadržaj</span>
            </div>
            <p className="text-muted-foreground max-w-md">
              Pogledajte snimke s mojih nastupa i osjetite energiju uživo!
            </p>
            <Button variant="secondary" asChild>
              <a
                href="https://youtube.com/@djdomzy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Posjetite YouTube kanal
              </a>
            </Button>
          </div>
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </Button>
            <div className="relative max-w-4xl w-full aspect-video rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-accent/40 to-secondary/60 flex items-center justify-center">
                <p className="text-white text-xl font-medium">
                  {galleryImages[selectedImage].alt}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
