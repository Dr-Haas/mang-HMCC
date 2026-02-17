"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

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
        <Link href="/" className="flex items-center gap-1 group">
          <div className="font-bold text-2xl tracking-tighter text-neutral-900 group-hover:opacity-80 transition-opacity">
            HMCC<span className="text-red-600">.</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "text-red-600"
                  : "text-neutral-600 hover:text-red-600"
              }`}
            >
              {item.label}
            </Link>
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
