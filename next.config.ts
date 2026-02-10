import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Export statique : génère le dossier `out/` à la racine du projet. À envoyer sur le FTP = uniquement le contenu de `out/`. */
  output: "export",
  /** Désactive l'optimisation d'image car elle nécessite un serveur Next.js (non disponible en mode export statique) */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
