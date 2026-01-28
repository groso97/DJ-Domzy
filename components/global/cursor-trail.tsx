"use client";

import { useEffect, useRef } from "react";

export function CursorTrail() {
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trail = trailRef.current;
    if (!trail) return;

    const particles: HTMLDivElement[] = [];
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Create new particle
      const particle = document.createElement("div");
      particle.className = "cursor-trail-particle";
      particle.style.left = `${mouseX}px`;
      particle.style.top = `${mouseY}px`;
      trail.appendChild(particle);
      particles.push(particle);

      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
        const index = particles.indexOf(particle);
        if (index > -1) {
          particles.splice(index, 1);
        }
      }, 1000);

      // Limit number of particles
      if (particles.length > 20) {
        const oldest = particles.shift();
        if (oldest && oldest.parentNode) {
          oldest.parentNode.removeChild(oldest);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <div ref={trailRef} className="fixed inset-0 pointer-events-none z-[9999]" />;
}
