"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/shared/logo";
import { navLinks } from "@/config/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>("");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Function to detect active section
  const detectActiveSection = React.useCallback(() => {
    const sections = navLinks
      .filter(link => link.href.startsWith('#'))
      .map(link => ({
        id: link.href.substring(1),
        href: link.href
      }));
    
    // Check if we're at the top (home)
    if (window.scrollY < 200) {
      setActiveSection("/");
      return;
    }
    
    // Find the section that is closest to the top of the viewport
    let currentSection = null;
    let minDistance = Infinity;
    
    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (!element) continue;
      const rect = element.getBoundingClientRect();
      
      // Calculate distance from top of viewport
      const distanceFromTop = Math.abs(rect.top - 150); // 150px offset for header
      
      // Section is in viewport and closer to top
      if (rect.top <= 400 && rect.bottom >= 0 && distanceFromTop < minDistance) {
        minDistance = distanceFromTop;
        currentSection = section.href;
      }
    }
    
    if (currentSection) {
      setActiveSection(currentSection);
    } else if (window.scrollY >= 200) {
      // If we scrolled but no section found, check last section
      const lastSection = sections[sections.length - 1];
      const element = document.getElementById(lastSection.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          setActiveSection(lastSection.href);
        }
      }
    }
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      detectActiveSection();
    };

    detectActiveSection(); // Initial check
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [detectActiveSection]);

  // Update active section when menu opens
  React.useEffect(() => {
    if (isOpen) {
      detectActiveSection();
    }
  }, [isOpen, detectActiveSection]);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const menuContent = isOpen ? (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Navigacijski izbornik">
      {/* Background with expand animation and gradient - Opaque */}
      <div 
        className="absolute inset-0 bg-[#0A111F]"
        style={{
          backgroundImage: "radial-gradient(ellipse at center, rgba(37, 99, 235, 0.3) 0%, rgba(37, 99, 235, 0.2) 30%, rgba(37, 99, 235, 0.1) 50%, transparent 80%)",
          animation: "menuExpand 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards"
        }}
      />

      {/* Content - same layout as main header (content-width, h-20) */}
      <div className="relative h-full w-full flex flex-col z-[101]">
        {/* Header with Logo and Close Button - same position as main header */}
        <div className="content-width flex h-20 items-center justify-between">
          <Logo />
          {/* Close Button (X) */}
          <button
            onClick={() => setIsOpen(false)}
            className="relative w-10 h-10 flex items-center justify-center hover:opacity-70 transition-opacity z-[110]"
            aria-label="Zatvori izbornik"
            type="button"
          >
            <div className="w-6 h-6 relative">
              <span className="absolute top-1/2 left-0 w-full h-0.5 bg-white rounded-full rotate-45 transform -translate-y-1/2"></span>
              <span className="absolute top-1/2 left-0 w-full h-0.5 bg-white rounded-full -rotate-45 transform -translate-y-1/2"></span>
            </div>
          </button>
        </div>

        {/* Navigation - same width as page content */}
        <div className="flex-1 flex items-center">
          <div className="content-width w-full">
            <div className="text-sm tracking-widest text-primary mb-8 font-body uppercase">NAVIGACIJA</div>
            <nav className="space-y-6">
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href || (link.href === "/" && activeSection === "/");
                return (
                  <div
                    key={`${link.href}-${index}`}
                    className="menu-link-wrapper"
                    style={{
                      animation: `menuItemFadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
                      animationDelay: `${0.3 + index * 0.1}s`,
                      opacity: 0
                    }}
                  >
                    <Link
                      href={link.href.startsWith("#") && !isHomePage ? `/${link.href}` : link.href}
                      onClick={(e) => {
                        setIsOpen(false);
                        // On home: Početna = scroll to top; hash links = scroll to section
                        if (link.href === "/" && isHomePage) {
                          e.preventDefault();
                          window.scrollTo({ top: 0, behavior: "smooth" });
                          setActiveSection("/");
                          return;
                        }
                        if (link.href.startsWith("#") && isHomePage) {
                          e.preventDefault();
                          setTimeout(() => {
                            const element = document.querySelector(link.href);
                            if (element) {
                              element.scrollIntoView({ behavior: "smooth", block: "start" });
                              setTimeout(() => detectActiveSection(), 800);
                            }
                          }, 100);
                        } else if (link.href === "/") {
                          setActiveSection("/");
                        }
                      }}
                      className={cn(
                        "inline-block text-5xl md:text-6xl lg:text-7xl font-display cursor-pointer menu-link-hover",
                        isActive 
                          ? "text-primary" 
                          : "text-white hover:text-primary"
                      )}
                    >
                      {link.label}
                    </Link>
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300 animate-navbar-slide-down",
          isScrolled
            ? "bg-background/80 backdrop-blur-lg border-b shadow-lg"
            : "bg-transparent"
        )}
      >
        <div className="content-width">
          <nav className="flex h-20 items-center justify-between">
            <Logo />

            {/* Hamburger Menu Button - Always visible, no animation */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-10 h-10 flex items-center justify-center hover:opacity-70 transition-opacity z-[110]"
              aria-label={isOpen ? "Zatvori izbornik" : "Otvori izbornik"}
              type="button"
            >
              {isOpen ? (
                <div className="w-6 h-6 relative">
                  <span className="absolute top-1/2 left-0 w-full h-0.5 bg-white rounded-full rotate-45 transform -translate-y-1/2"></span>
                  <span className="absolute top-1/2 left-0 w-full h-0.5 bg-white rounded-full -rotate-45 transform -translate-y-1/2"></span>
                </div>
              ) : (
                <div className="w-6 h-5 relative flex flex-col justify-between">
                  <span className="w-full h-0.5 bg-white rounded-full"></span>
                  <span className="w-full h-0.5 bg-white rounded-full"></span>
                  <span className="w-full h-0.5 bg-white rounded-full"></span>
                </div>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Full-Screen Menu Overlay - Portal for proper z-index */}
      {mounted && createPortal(menuContent, document.body)}
    </>
  );
}
