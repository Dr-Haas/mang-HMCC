import Link from "next/link";

/**
 * Footer (Figma Footer).
 * Fond rouge foncé, texte promo à gauche, 3 colonnes Navigation, HMCC en filigrane en bas.
 */
const navColumns = [
  [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Nos bureaux", href: "/nos-bureaux" },
    { label: "Contact", href: "/contact" },
    { label: "Mentions légales", href: "/mentions-legales" },
  ],
  [
    { label: "Services", href: "/services" },
    { label: "Facturation", href: "/facturation" },
    { label: "Nos bureaux", href: "/nos-bureaux" },
    { label: "Contact", href: "/contact" },
    { label: "CGV", href: "/cgv" },
  ],
  [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Nos bureaux", href: "/nos-bureaux" },
    { label: "Contact", href: "/contact" },
    { label: "Politique de confidentialité", href: "/confidentialite" },
  ],
];

export function FooterSection() {
  return (
    <footer className="bg-[#b81a25]">
      <div className="border-b border-white/20 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:justify-between">
          <p className="max-w-md text-lg font-semibold leading-relaxed text-white">
            Des solutions comptables claires et adaptées à votre activité, pour
            vous accompagner
          </p>
          <div className="flex flex-wrap gap-12 sm:gap-16">
            {navColumns.map((column, i) => (
              <nav key={i} className="min-w-[140px]">
                <p className="font-bold text-white">Navigation</p>
                <ul className="mt-4 space-y-2">
                  {column.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        target="_self"
                        className="text-white/90 transition hover:text-white hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center px-4 py-16">
        <span className="select-none text-6xl font-bold tracking-wider text-white/20 sm:text-7xl lg:text-8xl">
          HMCC
        </span>
      </div>
    </footer>
  );
}
