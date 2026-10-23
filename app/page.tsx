import { Hero } from "@/components/features/hero";
import { Services } from "@/components/features/services";
import { Mixes } from "@/components/features/mixes";
import { FeaturesCarousel } from "@/components/features/features-carousel";
import { About } from "@/components/features/about";
import { Gallery } from "@/components/features/gallery";
import { Testimonials } from "@/components/features/testimonials";
import { CTA } from "@/components/features/cta";
import { Contact } from "@/components/features/contact";

export default function HomePage() {
  return (
    <>
      {/* Hero - Party background */}
      <div className="bg-section-party relative">
        <div className="party-glow-extra" />
        <Hero />
      </div>
      
      {/* Services - Solid background */}
      <div className="bg-section-solid">
        <Services />
      </div>
      
      {/* Mixes - Party background */}
      <div className="bg-section-party relative">
        <div className="party-glow-extra" />
        <Mixes />
      </div>

      {/* Features Carousel - Solid background */}
      <FeaturesCarousel />
      
      {/* About - Party background */}
      <div className="bg-section-party relative">
        <div className="party-glow-extra" />
        <About />
      </div>
      
      {/* Gallery - Solid background */}
      <div className="bg-section-solid">
        <Gallery />
      </div>

      {/* Testimonials - Party background */}
      <div className="bg-section-party relative">
        <div className="party-glow-extra" />
        <Testimonials />
      </div>
      
      {/* CTA - Solid background */}
      <div className="bg-section-solid">
        <CTA />
      </div>
      
      {/* Contact - Party background */}
      <div className="bg-section-party relative">
        <div className="party-glow-extra" />
        <Contact />
      </div>
    </>
  );
}
