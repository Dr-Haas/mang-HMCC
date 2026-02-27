import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Pas de slash final : /services et non /services/ pour cohérence et SEO. */
  trailingSlash: false,
  /** Conserve les images non optimisées pour rester compatible avec un hébergement Node simple sans optimizer dédié. */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
