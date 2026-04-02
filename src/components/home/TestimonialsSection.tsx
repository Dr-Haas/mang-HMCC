"use client";

import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function TestimonialsSection({
  transparentBg = false,
}: {
  transparentBg?: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      name: "M. P Joannis",
      role: "Directeur Général",
      company: "5 fois 5",
      location: "Leuville-Sur-Orge, Essonne",
      text: "Au-delà de la prestation, ce que j'apprécie vraiment avec Alan et son équipe c'est d'avoir des interlocuteurs ouverts, pas du tout le stéréotype du comptable, ils cherchent toujours à s'adapter plutôt qu'à m'imposer des règles. J'ai fréquenté d'autres comptables dans ma vie d'entrepreneur, pour moi c'est vraiment une nouvelle génération plus créative, ouverte et avec lesquels il est possible d'avoir une relation pas seulement technique, mais humaine, une vraie relation de conseil, riche et précieuse pour mon entreprise.",
      rating: 5,
    },
    {
      name: "M. G de France",
      role: "Directeur Général",
      company: "EFP Ile de France",
      location: "Paris",
      text: "Très disponible, joignable au téléphone à n'importe quel moment. Ils sont jeunes et connectés, ils savent s'adapter à notre fonctionnement et notre génération.",
      rating: 5,
    },
    {
      name: "M. T Charvet",
      role: "Gérant",
      company: "Les compagnons de l'habitat",
      location: "Buc, Yvelines",
      text: "Conseils variés et de très bonnes idées. Ils sont très réactif, répondent tout de suite quand j'ai besoin d'eux",
      rating: 5,
    },
    {
      name: "M. F Maret",
      role: "Co-fondateur",
      company: "Le salon et vous",
      location: "Paris",
      text: "Un travail très professionnel. On était novice dans la création d'entreprise et il y a eu vraiment un coaching avant qu'on démarre l'activité sur le montage des statuts et sur comment cela ce passait dans une entreprise. Alan a monté le dossier financier et est venu avec nous rencontrer les banques. J'appelle régulièrement Alan pour tout le développement de la boîte. Il y a un côté familial, c'est humain et c'est cela que j'aime bien.",
      rating: 5,
    },
    {
      name: "M. P Faure",
      role: "Dirigeant",
      company: "Endless Project",
      location: "Paris",
      text: "Vendre un film, c'est pas comme vendre une baguette de pain. Il a adapté sa manière de travailler par rapport à ça. On a été particulièrement bien accompagné par le cabinet, quand on a eu des problèmes avec le RSI. Il était là, nous y a accompagner et n'a pas lâché l'affaire. C'est un réel plus",
      rating: 5,
    },
    {
      name: "M. H Pronier",
      role: "Gérant",
      company: "La Marine",
      location: "Paris",
      text: "Cela fait 13 ans qu'on travail ensemble, Alan Miniou est quelqu'un que j'estime beaucoup, il est toujours disponible. A chaque fois que j'ai besoin de quelque chose, il répond toujours présent et je ne suis pas toujours un client facile parce que j'ai toujours plein de projets et pleins de choses à demander. La personne attitrée à mes entreprise est très performante, professionnelle",
      rating: 5,
    },
  ];

  // Auto-play carousel
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000); // Change every 6 seconds

    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      className={`py-24 ${
        transparentBg ? "bg-transparent" : "bg-white"
      } relative overflow-hidden`}
    >
      {/* Blur overlay, mais le background reste sur la section */}
      {!transparentBg && (
        <div className="absolute inset-0 z-0 pointer-events-none backdrop-blur-lg bg-white/30" />
      )}
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-100 rounded-full blur-3xl opacity-30 -z-10"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 text-lg font-medium text-neutral-900 mb-6"
          >
            <Quote size={16} className="text-red-600" />
            Témoignages clients
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-semibold tracking-tight text-red-600 mb-4"
          >
            Ils nous font confiance
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neutral-900 font-medium text-xl max-w-2xl mx-auto"
          >
            Découvrez les retours d'expérience de nos clients et ce
            qu'ils apprécient dans notre accompagnement au quotidien
          </motion.p>
        </div>

        {/* Carousel Container — overflow-x-hidden évite le scroll horizontal (flèches, texte long) */}
        <div
          className="relative overflow-x-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Espace latéral pour les flèches sans déborder ni recouvrir le texte */}
          <div className="relative mx-auto w-full max-w-full px-11 sm:px-12 md:px-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="w-full min-w-0"
              >
                <div className="flex min-w-0 flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white p-5 shadow-xl sm:p-8 md:p-12">
                  {/* Quote icon */}
                  <div className="mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-50 sm:mb-6 sm:h-16 sm:w-16">
                    <Quote className="text-red-600" size={28} />
                  </div>

                  {/* Stars */}
                  <div className="mb-4 flex flex-wrap gap-1 sm:mb-6">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="text-yellow-400 fill-yellow-400"
                        size={18}
                      />
                    ))}
                  </div>

                  {/* Testimonial text — break-words + taille responsive pour éviter tout débordement */}
                  <p className="mb-6 min-w-0 break-words text-base font-medium italic leading-relaxed text-neutral-900 sm:mb-8 sm:text-lg md:text-xl">
                    &quot;{currentTestimonial.text}&quot;
                  </p>

                  {/* Author info */}
                  <div className="min-w-0 border-t border-neutral-100 pt-4 sm:pt-6">
                    <p className="mb-1 break-words text-lg font-semibold text-neutral-900 sm:text-xl">
                      {currentTestimonial.name}
                    </p>
                    <p className="mb-1 break-words text-sm font-medium text-neutral-900 sm:text-base">
                      {currentTestimonial.role}
                    </p>
                    <p className="break-words font-medium text-red-600">
                      {currentTestimonial.company}
                    </p>
                    <p className="mt-1 break-words text-sm font-medium text-neutral-900 sm:text-base">
                      {currentTestimonial.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows — positionnées dans la zone visible sur mobile */}
          <button
            type="button"
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-neutral-200 bg-white shadow-lg transition-all hover:border-red-200 hover:bg-neutral-50 group sm:h-12 sm:w-12 md:-translate-x-2 lg:-translate-x-4"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft
              className="text-neutral-900 transition-colors group-hover:text-red-600"
              size={22}
            />
          </button>

          <button
            type="button"
            onClick={goToNext}
            className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-neutral-200 bg-white shadow-lg transition-all hover:border-red-200 hover:bg-neutral-50 group sm:h-12 sm:w-12 md:translate-x-2 lg:translate-x-4"
            aria-label="Témoignage suivant"
          >
            <ChevronRight
              className="text-neutral-900 transition-colors group-hover:text-red-600"
              size={22}
            />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all ${
                index === currentIndex
                  ? "w-8 h-2 bg-red-600"
                  : "w-2 h-2 bg-neutral-300 hover:bg-neutral-400"
              } rounded-full`}
              aria-label={`Aller au témoignage ${index + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="text-center mt-6">
          <span className="text-base text-neutral-900 font-medium">
            {currentIndex + 1} / {testimonials.length}
          </span>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="bg-white rounded-2xl p-6 border border-neutral-200 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">500+</div>
            <div className="text-base text-neutral-900 font-medium">
              Clients accompagnés
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-neutral-200 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">25+</div>
            <div className="text-base text-neutral-900 font-medium">
              Années d'expérience
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-neutral-200 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">98%</div>
            <div className="text-base text-neutral-900 font-medium">
              Clients satisfaits
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-neutral-200 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">2</div>
            <div className="text-base text-neutral-900 font-medium">
              Bureaux en IDF
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
