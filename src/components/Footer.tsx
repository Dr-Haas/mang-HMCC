import Link from "next/link";
import { Linkedin, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_ADDRESS_PARIS } from "@/app/lib/constants";

export function Footer() {
  return (
    <footer className="bg-neutral-50 pt-20 pb-10 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block font-bold text-2xl tracking-tighter text-neutral-900 mb-6">
              HMCC<span className="text-red-600">.</span>
            </Link>
            <p className="text-neutral-500 text-sm leading-relaxed mb-6">
              Cabinet d&apos;expertise comptable inscrit à l&apos;Ordre de Paris Île-de-France. L&apos;accompagnement moderne pour les entrepreneurs.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-neutral-400 hover:text-red-600 transition-colors" aria-label="LinkedIn">
                <Linkedin size={24} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-red-600 transition-colors" aria-label="Twitter">
                <Twitter size={24} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-6">Services</h4>
            <ul className="space-y-4 text-sm text-neutral-500">
              <li>
                <Link href="/services" className="hover:text-red-600 transition-colors">
                  Création d&apos;entreprise
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-red-600 transition-colors">
                  Comptabilité
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-red-600 transition-colors">
                  Gestion Sociale
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-red-600 transition-colors">
                  Juridique
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-red-600 transition-colors">
                  Audit (CAC)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-6">Cabinet</h4>
            <ul className="space-y-4 text-sm text-neutral-500">
              <li>
                <Link href="/cabinet" className="hover:text-red-600 transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/cabinet" className="hover:text-red-600 transition-colors">
                  L&apos;équipe
                </Link>
              </li>
              <li>
                <Link href="/carriere" className="hover:text-red-600 transition-colors">
                  Carrières
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-red-600 transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-neutral-500">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 text-red-600 flex-shrink-0" size={18} />
                <span>{CONTACT_ADDRESS_PARIS}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-red-600 flex-shrink-0" size={18} />
                <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className="hover:text-red-600 transition-colors">
                  {CONTACT_PHONE}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-red-600 flex-shrink-0" size={18} />
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-red-600 transition-colors">
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-400">
            © {new Date().getFullYear()} HMCC Expertise. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-xs text-neutral-400">
            <Link href="/mentions-legales" className="hover:text-neutral-600">
              Mentions légales
            </Link>
            <a href="#" className="hover:text-neutral-600">
              Confidentialité
            </a>
            <a href="#" className="hover:text-neutral-600">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
