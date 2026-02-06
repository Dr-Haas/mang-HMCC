"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Facturation", href: "/#facturation" },
  { label: "Nos bureaux", href: "/nos-bureaux" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#2a2a2a]/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-0" aria-label="HMCC Accueil">
          <span className="text-xl font-bold text-[#2a2a2a] sm:text-2xl">HM</span>
          <span className="text-xl font-bold text-[#e61d2b] sm:text-2xl">CC</span>
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-6 lg:gap-8">
          {navLinks.map((link) => {
            const isActive =
              (link.href === "/services" && pathname === "/services") ||
              (link.href === "/nos-bureaux" && pathname === "/nos-bureaux") ||
              (link.href === "/#contact" && pathname === "/");
            return (
              <Link
                key={link.href + link.label}
                href={link.href}
                className={`transition hover:text-[#e61d2b] ${
                  isActive
                    ? "text-[#e61d2b] underline decoration-[#e61d2b] underline-offset-4"
                    : "text-[#2a2a2a]/70"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            className="rounded-md bg-[#e61d2b] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#b81a25]"
          >
            Je suis intéressé
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            <span className="block h-0.5 w-6 rounded bg-[#2a2a2a]" />
            <span className="block h-0.5 w-6 rounded bg-[#2a2a2a]" />
            <span className="block h-0.5 w-6 rounded bg-[#2a2a2a]" />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[#2a2a2a]/10 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="py-2 text-[#2a2a2a]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
