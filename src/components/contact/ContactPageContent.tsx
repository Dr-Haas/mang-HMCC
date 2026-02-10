"use client";

import { Send, Mail, Phone, MapPin, Check } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_ADDRESS_PARIS } from "@/app/lib/constants";
import Link from "next/link";

export function ContactPageContent() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    societe: "",
    type: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message envoyé ! Nous vous recontacterons rapidement.");
    setFormData({ nom: "", email: "", societe: "", type: "", message: "" });
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden hero-gradient">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-red-600 mb-6 leading-[1.1]">
              Contactez-nous
            </h1>
            <p className="text-lg md:text-xl text-neutral-500 font-light leading-relaxed">
              Notre équipe est à votre disposition pour répondre à toutes vos questions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-b from-white to-neutral-50 relative overflow-hidden">
        {/* Animated Filaments Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Gradient Orbs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-100 rounded-full blur-3xl opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Side - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 text-sm font-medium text-neutral-900 mb-6"
                >
                  <Mail size={16} className="text-red-600" />
                  Contact
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-red-600 mb-6 leading-[1.1]">
                  Parlons de votre projet
                </h2>
                <p className="text-neutral-600 font-light text-lg leading-relaxed mb-8">
                  Le premier rendez-vous de conseil est offert. Discutons de vos besoins autour d&apos;un café ou en visio.
                </p>

                {/* Quick Info Cards */}
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl p-6 border border-neutral-200 hover:border-red-200 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-100 transition-colors">
                        <Mail className="text-red-600" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900 mb-1">Email</h3>
                        <a href={`mailto:${CONTACT_EMAIL}`} className="text-neutral-600 hover:text-red-600 transition-colors">
                          {CONTACT_EMAIL}
                        </a>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl p-6 border border-neutral-200 hover:border-red-200 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-100 transition-colors">
                        <Phone className="text-red-600" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900 mb-1">Téléphone</h3>
                        <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className="text-neutral-600 hover:text-red-600 transition-colors">
                          {CONTACT_PHONE}
                        </a>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl p-6 border border-neutral-200 hover:border-red-200 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-100 transition-colors">
                        <MapPin className="text-red-600" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900 mb-1">Nos bureaux</h3>
                        <Link href="/nos-bureaux" className="text-neutral-600 hover:text-red-600 transition-colors text-sm">
                          Paris 12ème & Arpajon (91)
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Benefits */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 space-y-3"
                >
                  {["Réponse sous 24h", "Premier RDV offert", "Devis personnalisé gratuit", "Accompagnement sur-mesure"].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-red-50 rounded-full flex items-center justify-center">
                        <Check size={14} className="text-red-600" />
                      </div>
                      <span className="text-neutral-700 font-light">{benefit}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 md:p-10 border border-neutral-200 shadow-xl shadow-neutral-200/50"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="nom" className="text-sm font-medium text-neutral-700">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="nom"
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      required
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all placeholder:text-neutral-400"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-neutral-700">
                      Email professionnel *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all placeholder:text-neutral-400"
                      placeholder="jean@societe.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="societe" className="text-sm font-medium text-neutral-700">
                    Société
                  </label>
                  <input
                    type="text"
                    id="societe"
                    value={formData.societe}
                    onChange={(e) => setFormData({ ...formData, societe: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all placeholder:text-neutral-400"
                    placeholder="Nom de votre entreprise"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-neutral-700">Type de besoin</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Création", "Comptabilité", "Social", "Audit", "Juridique", "Fiscalité"].map((type) => (
                      <label key={type} className="cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value={type}
                          checked={formData.type === type}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                          className="peer sr-only"
                        />
                        <div className="rounded-xl border-2 border-neutral-200 px-4 py-3 text-center text-sm font-medium text-neutral-600 hover:bg-neutral-50 hover:border-neutral-300 peer-checked:border-red-600 peer-checked:text-red-600 peer-checked:bg-red-50 transition-all">
                          {type}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-neutral-700">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all resize-none placeholder:text-neutral-400"
                    placeholder="Dites-nous en plus sur votre projet..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white font-semibold text-lg px-8 py-4 rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-red-600/40 hover:scale-[1.02] flex items-center justify-center gap-2 group"
                >
                  Envoyer la demande
                  <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-xs text-neutral-500 text-center">
                  En envoyant ce formulaire, vous acceptez notre politique de confidentialité
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
