import { Hero } from "@/components/features/hero";
import { Services } from "@/components/features/services";
import { About } from "@/components/features/about";
import { Gallery } from "@/components/features/gallery";
import { Testimonials } from "@/components/features/testimonials";
import { CTA } from "@/components/features/cta";
import { Contact } from "@/components/features/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Gallery />
      <Testimonials />
      <CTA />
      <Contact />
    </>
  );
}
