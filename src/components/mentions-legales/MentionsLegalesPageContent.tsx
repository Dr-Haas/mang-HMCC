"use client";

import { FileText } from "lucide-react";
import { motion } from "framer-motion";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_ADDRESS_PARIS_12 } from "@/app/lib/constants";

export function MentionsLegalesPageContent() {
  const sections = [
    {
      number: 1,
      title: "Mentions légales",
      content: [
        {
          subtitle: "1.1 Site (ci-après « le site »)",
          text: "www.hmcc.fr",
        },
        {
          subtitle: "1.2 Éditeur (ci-après « l'éditeur »)",
          text: `HMCC (Hervé Miniou Conseil Comptabilité) SARL au capital de 227 911 €\n\nSiège social : ${CONTACT_ADDRESS_PARIS_12}\n\nReprésentée par Alan et Hervé MINIOU, en leur qualité d'associés\n\nImmatriculée au RCS de Paris 419 753 736\n\nTéléphone : ${CONTACT_PHONE}\n\nEmail : ${CONTACT_EMAIL}\n\nDirecteur de la publication : Alan MINIOU`,
        },
        {
          subtitle: "1.3 Hébergeur (ci-après « l'hébergeur »)",
          text: "www.hmcc.fr est hébergé par Wee Technology, dont le siège social est situé 13 avenue Joseph Kessel 78180 Montigny-le-Bretonneux.",
        },
      ],
    },
    {
      number: 2,
      title: "Accès au site",
      content: [
        {
          text: "L'accès au site et son utilisation sont réservés à un usage professionnel. Vous vous engagez à ne pas utiliser ce site et les informations ou données qui y figurent à l'envoi de courriers électroniques non sollicités.",
        },
      ],
    },
    {
      number: 3,
      title: "Contenu du site",
      content: [
        {
          text: "Toutes les marques, photographies, textes, commentaires, illustrations, images animées ou non, séquences vidéo, sons, ainsi que toutes les applications informatiques qui pourraient être utilisées pour faire fonctionner ce site et plus généralement tous les éléments reproduits ou utilisés sur le site sont protégés par les lois en vigueur au titre de la propriété intellectuelle.",
        },
        {
          text: "Les visuels utilisés sur ce site sont la propriété de pixabay.com, fotofolia.com ou ont été pris par les équipes de HMCC.",
        },
        {
          text: "Ils sont la propriété pleine et entière de l'éditeur ou de ses partenaires. Toute reproduction, représentation, utilisation ou adaptation, sous quelque forme que ce soit, de tout ou partie de ces éléments, y compris les applications informatiques, sans l'accord préalable et écrit de l'éditeur, sont strictement interdites. Le fait pour l'éditeur de ne pas engager de procédure dès la prise de connaissance de ces utilisations non autorisées ne vaut pas acceptation desdites utilisations et renonciation aux poursuites.",
        },
      ],
    },
    {
      number: 4,
      title: "Gestion du site",
      content: [
        {
          text: "Pour la bonne gestion du site, l'éditeur pourra à tout moment :",
        },
        {
          list: [
            "Suspendre, interrompre ou limiter l'accès à tout ou partie du site, réserver l'accès au site, ou à certaines parties du site, à une catégorie déterminée d'internautes",
            "Supprimer toute information pouvant en perturber le fonctionnement ou entrant en contravention avec les lois nationales ou internationales",
            "Suspendre le site afin de procéder à des mises à jour",
          ],
        },
      ],
    },
    {
      number: 5,
      title: "Responsabilités",
      content: [
        {
          text: "La responsabilité de l'éditeur ne peut être engagée en cas de défaillance, panne, difficulté ou interruption de fonctionnement, empêchant l'accès au site ou à une de ses fonctionnalités.",
        },
        {
          text: "Le matériel de connexion au site que vous utilisez est sous votre entière responsabilité. Vous devez prendre toutes les mesures appropriées pour protéger votre matériel et vos propres données notamment d'attaques virales par Internet. Vous êtes par ailleurs seul responsable des sites et données que vous consultez.",
        },
        {
          text: "L'éditeur ne pourra être tenu responsable en cas de poursuites judiciaires à votre encontre :",
        },
        {
          list: ["Du fait de l'usage du site ou de tout service accessible via Internet", "Du fait du non-respect par vous des présentes conditions générales"],
        },
        {
          text: "L'éditeur n'est pas responsable des dommages causés à vous-même, à des tiers et/ou à votre équipement du fait de votre connexion ou de votre utilisation du site et vous renoncez à toute action contre lui de ce fait.",
        },
        {
          text: "Si l'éditeur venait à faire l'objet d'une procédure amiable ou judiciaire en raison de votre utilisation du site, il pourra se retourner contre vous pour obtenir l'indemnisation de tous les préjudices, sommes, condamnations et frais qui pourraient découler de cette procédure.",
        },
      ],
    },
    {
      number: 6,
      title: "Liens hypertextes",
      content: [
        {
          text: "La mise en place par les utilisateurs de tous liens hypertextes vers tout ou partie du site est strictement interdite, sauf autorisation préalable et écrite de l'éditeur.",
        },
        {
          text: "L'éditeur est libre de refuser cette autorisation sans avoir à justifier de quelque manière que ce soit sa décision. Dans le cas où l'éditeur accorderait son autorisation, celle-ci n'est dans tous les cas que temporaire et pourra être retirée à tout moment, sans obligation de justification à la charge de l'éditeur.",
        },
      ],
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-sm font-medium text-red-600 mb-8"
            >
              <FileText size={16} />
              Informations légales
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-semibold tracking-tight text-neutral-900 mb-6 leading-[1.1]"
            >
              Mentions légales
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-12">
            {sections.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
                className="bg-white rounded-3xl p-8 md:p-10 border border-neutral-200"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600">
                    <span className="text-xl font-bold">{section.number}</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-neutral-900">{section.title}</h2>
                </div>

                <div className="space-y-6">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex} className="space-y-3">
                      {"subtitle" in item && item.subtitle && (
                        <h3 className="text-lg font-semibold text-neutral-900">{item.subtitle}</h3>
                      )}
                      {"text" in item && item.text && (
                        <p className="text-neutral-600 font-light leading-relaxed whitespace-pre-line">
                          {item.text}
                        </p>
                      )}
                      {"list" in item && item.list && (
                        <ul className="list-disc list-inside space-y-2 text-neutral-600 font-light">
                          {item.list.map((listItem, listIndex) => (
                            <li key={listIndex}>{listItem}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
