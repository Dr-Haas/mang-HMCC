"use client";

import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function TestimonialsSection() {
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
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-24 bg-neutral-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-100 rounded-full blur-3xl opacity-30 -z-10"></div>

      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 text-sm font-medium text-neutral-900 mb-6"
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
            className="text-neutral-600 font-light text-lg max-w-2xl mx-auto"
          >
            Découvrez les retours d&apos;expérience de nos clients et ce qu&apos;ils apprécient dans notre accompagnement au quotidien
          </motion.p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Testimonial Card */}
          <div className="relative min-h-[400px] md:min-h-[450px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="bg-white rounded-3xl p-8 md:p-12 border border-neutral-200 shadow-xl h-full flex flex-col">
                  {/* Quote icon */}
                  <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
                    <Quote className="text-red-600" size={32} />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-yellow-400" size={20} />
                    ))}
                  </div>

                  {/* Testimonial text */}
                  <p className="text-neutral-700 font-light leading-relaxed text-lg mb-8 flex-grow italic">
                    &quot;{currentTestimonial.text}&quot;
                  </p>

                  {/* Author info */}
                  <div className="pt-6 border-t border-neutral-100">
                    <p className="font-semibold text-neutral-900 text-xl mb-2">{currentTestimonial.name}</p>
                    <p className="text-neutral-600 mb-1">{currentTestimonial.role}</p>
                    <p className="font-medium text-red-600">{currentTestimonial.company}</p>
                    <p className="text-sm text-neutral-400 mt-1">{currentTestimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 w-12 h-12 bg-white border-2 border-neutral-200 rounded-full flex items-center justify-center hover:bg-neutral-50 hover:border-red-200 transition-all shadow-lg group"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="text-neutral-600 group-hover:text-red-600 transition-colors" size={24} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 w-12 h-12 bg-white border-2 border-neutral-200 rounded-full flex items-center justify-center hover:bg-neutral-50 hover:border-red-200 transition-all shadow-lg group"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="text-neutral-600 group-hover:text-red-600 transition-colors" size={24} />
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
          <span className="text-sm text-neutral-500 font-light">
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
            <div className="text-sm text-neutral-600 font-light">Clients accompagnés</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-neutral-200 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">25+</div>
            <div className="text-sm text-neutral-600 font-light">Années d&apos;expérience</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-neutral-200 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">98%</div>
            <div className="text-sm text-neutral-600 font-light">Clients satisfaits</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-neutral-200 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">2</div>
            <div className="text-sm text-neutral-600 font-light">Bureaux en IDF</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
