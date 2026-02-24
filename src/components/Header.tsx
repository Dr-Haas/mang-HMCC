"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { gsap } from "gsap";

interface NavLinkProps {
  href: string;
  isActive: boolean;
  children: string;
}

function NavLink({ href, isActive, children }: NavLinkProps) {
  const textWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = textWrapperRef.current;
    if (!wrapper) return;

    const handleMouseEnter = () => {
      gsap.to(wrapper, {
        y: "-50%",
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(wrapper, {
        y: "0%",
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const linkElement = wrapper.parentElement;
    if (linkElement) {
      linkElement.addEventListener("mouseenter", handleMouseEnter);
      linkElement.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        linkElement.removeEventListener("mouseenter", handleMouseEnter);
        linkElement.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors relative overflow-hidden inline-block h-[20px] ${
        isActive ? "text-red-600" : "text-neutral-600"
      }`}
    >
      <div ref={textWrapperRef} className="inline-block">
        <span className="block">{children}</span>
        <span className="block text-red-600">{children}</span>
      </div>
    </Link>
  );
}

function Logo() {
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    const link = linkRef.current;
    if (!link) return;

    const handleMouseEnter = () => {
      if (isAnimating.current) return;
      
      isAnimating.current = true;
      
      letterRefs.current.forEach((letter, index) => {
        if (!letter) return;
        
        gsap.to(letter, {
          rotateY: "+=360",
          duration: 0.6,
          delay: index * 0.08,
          ease: "power2.out",
        });
      });

      // Débloquer après la fin de l'animation (duration + dernier delay)
      setTimeout(() => {
        isAnimating.current = false;
      }, 600 + 3 * 80 + 100);
    };

    link.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      link.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <Link ref={linkRef} href="/" className="flex items-center gap-1 group">
      <div className="font-bold text-2xl tracking-tighter text-neutral-900 flex" style={{ perspective: "1000px" }}>
        {["H", "M", "C", "C"].map((letter, index) => (
          <span
            key={index}
            ref={(el) => {
              letterRefs.current[index] = el;
            }}
            className="inline-block"
            style={{ transformStyle: "preserve-3d" }}
          >
            {letter}
          </span>
        ))}
        <span className="text-red-600">.</span>
      </div>
    </Link>
  );
}

function ButtonLink({ href, children }: { href: string; children: string }) {
  const textRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const text = textRef.current;
    const arrow = arrowRef.current;
    const link = linkRef.current;
    if (!text || !arrow || !link) return;

    const handleMouseEnter = () => {
      gsap.to(text, {
        x: -4,
        duration: 0.4,
        ease: "power2.out",
      });
      
      gsap.to(arrow, {
        x: 6,
        scale: 1.15,
        rotation: -45,
        duration: 0.4,
        ease: "back.out(2)",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(text, {
        x: 0,
        duration: 0.4,
        ease: "power2.out",
      });
      
      gsap.to(arrow, {
        x: 0,
        scale: 1,
        rotation: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    link.addEventListener("mouseenter", handleMouseEnter);
    link.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      link.removeEventListener("mouseenter", handleMouseEnter);
      link.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Link
      ref={linkRef}
      href={href}
      className="bg-red-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-red-700 transition-colors shadow-sm shadow-red-200 hover:shadow-red-300 inline-flex items-center gap-2"
    >
      <span ref={textRef} className="inline-block">{children}</span>
      <div ref={arrowRef} className="inline-block">
        <ArrowRight size={18} />
      </div>
    </Link>
  );
}

const navItems = [
  { id: "accueil", label: "Accueil", href: "/" },
  { id: "services", label: "Services", href: "/services" },
  { id: "cabinet", label: "Le Cabinet", href: "/cabinet" },
  { id: "blog", label: "Blog", href: "/blog" },
  { id: "facturation", label: "Facturation Électronique", href: "/facturation" },
  { id: "domiciliation", label: "Domiciliation", href: "/domiciliation" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-neutral-100 bg-white/95 transition-all duration-300 md:bg-white/80 md:backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Modern Logo */}
        <Logo />

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              href={item.href}
              isActive={isActive(item.href)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="bg-red-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-red-700 transition-all shadow-sm shadow-red-200 hover:shadow-red-300"
          >
            Prendre RDV
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-neutral-900"
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-neutral-100 bg-white">
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block w-full text-left text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-red-600"
                    : "text-neutral-600 hover:text-red-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
