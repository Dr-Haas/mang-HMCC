import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Conserve les images non optimisées pour rester compatible avec un hébergement Node simple sans optimizer dédié. */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
