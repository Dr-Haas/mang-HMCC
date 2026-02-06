# HMCC

Site vitrine **HMCC** (cabinet d’expertise comptable et de conseil) construit avec **Next.js 16** (App Router), **React 19** et **Tailwind CSS v4**. Le projet est pensé pour le **SEO** et l’indexation Google.

---

## Sommaire

- [Stack technique](#stack-technique)
- [Architecture du projet](#architecture-du-projet)
- [Démarrage](#démarrage)
- [Pages et routes](#pages-et-routes)
- [Composants](#composants)
- [Design et thème](#design-et-thème)
- [Configuration SEO](#configuration-seo)
- [Variables d’environnement](#variables-denvironnement)
- [Scripts disponibles](#scripts-disponibles)

---

## Stack technique

| Technologie   | Version   | Rôle                          |
|---------------|-----------|-------------------------------|
| **Next.js**   | 16.x      | Framework React, App Router   |
| **React**     | 19.x      | UI                            |
| **TypeScript**| 5.x       | Typage                        |
| **Tailwind CSS** | 4.x   | Styles (utility-first)        |
| **Polices**   | Geist     | `next/font` (Geist, Geist Mono)|

Le rendu est **côté serveur par défaut** (SSR) pour un meilleur référencement.

---

## Architecture du projet

```
HMCC/
├── public/                    # Assets statiques
│   └── images/               # Images par section (hero, section2, section4, section5…)
├── src/
│   ├── app/                  # App Router (Next.js)
│   │   ├── layout.tsx        # Layout racine, metadata, polices
│   │   ├── page.tsx          # Page d’accueil
│   │   ├── globals.css       # Styles globaux + thème Tailwind
│   │   ├── lib/
│   │   │   └── constants.ts  # SITE_URL, SITE_NAME (SEO / partage)
│   │   ├── robots.ts         # Génération de robots.txt
│   │   ├── sitemap.ts        # Génération du sitemap.xml
│   │   ├── services/        # Route /services
│   │   │   └── page.tsx
│   │   └── nos-bureaux/      # Route /nos-bureaux
│   │       └── page.tsx
│   └── components/          # Composants React
│       ├── Header.tsx        # En-tête + navigation (client)
│       ├── ContactForm.tsx   # Formulaire de contact
│       ├── Footer.tsx        # (si utilisé ailleurs)
│       └── home/             # Sections de la page d’accueil
│           ├── HeroSection.tsx
│           ├── QuiSommesNousSection.tsx
│           ├── NousProposonsSection.tsx
│           ├── TitreEtCompetencesSection.tsx
│           ├── ServicesCardsSection.tsx
│           ├── BlocsChiffresSection.tsx
│           └── FooterSection.tsx
├── docs/                     # Documentation (ex. ASSETS_FIGMA.md)
├── next.config.ts
├── package.json
└── tsconfig.json
```

- **Routes** : définies par les dossiers sous `src/app/` (App Router).
- **Composants partagés** : `Header`, `FooterSection`, `ContactForm` utilisés sur plusieurs pages.
- **Page d’accueil** : assemblage de sections dans `src/app/page.tsx`, chaque section dans `src/components/home/`.

---

## Démarrage

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

- **Build** : `npm run build`
- **Production** : `npm run start`

---

## Pages et routes

| Route            | Fichier                    | Description                                      |
|------------------|----------------------------|--------------------------------------------------|
| `/`              | `src/app/page.tsx`         | Page d’accueil (sections hero, services, contact)|
| `/services`      | `src/app/services/page.tsx`| Présentation des services (comptabilité, conseil, paie, création) |
| `/nos-bureaux`   | `src/app/nos-bureaux/page.tsx` | Liste des bureaux (adresses, horaires, contact) |

Chaque page définit son propre `metadata` (titre, description) pour le SEO. Le layout racine fournit le template de titre `%s | HMCC` et les métadonnées communes.

---

## Composants

### Layout global

- **`Header`** (`src/components/Header.tsx`) : bandeau sticky, logo HMCC, navigation (Services, Facturation, Nos bureaux, Contact), menu mobile. Composant **client** (`"use client"`) pour `usePathname` et état du menu.
- **`FooterSection`** (`src/components/home/FooterSection.tsx`) : pied de page utilisé sur l’accueil, Services et Nos bureaux.

### Page d’accueil (`src/app/page.tsx`)

Ordre des sections :

1. **HeroSection** – Bandeau d’accroche principal
2. **QuiSommesNousSection** – Présentation du cabinet
3. **NousProposonsSection** – Ce que propose HMCC
4. **TitreEtCompetencesSection** – Titre + blocs de compétences
5. **ServicesCardsSection** – Cartes des services
6. **BlocsChiffresSection** – Chiffres clés / statistiques
7. **ContactForm** – Formulaire de contact (ancre `#contact`)

Les images de la homepage sont dans `public/images/` (sous-dossiers par section : `homepage-hero/`, `homepage-section2/`, etc.).

### Autres composants

- **ContactForm** : formulaire de contact (ancre `#contact`).
- Composants dans `src/components/` (ex. `FAQSection`, `PricingSection`, etc.) sont disponibles pour réutilisation ou pages futures.

---

## Design et thème

- **Couleurs** (définies dans `src/app/globals.css` et utilisées en Tailwind) :
  - Fond : `#ffffff`
  - Texte principal : `#2a2a2a`
  - Accent HMCC : `#e61d2b` (rouge), variante foncée `#b81a25`
- **Polices** : Geist Sans et Geist Mono via `next/font`.
- **Styles** : Tailwind v4 avec variables CSS dans `:root` et `@theme inline` pour couleurs et polices.
- **Animations** : keyframes dans `globals.css` (ex. `hero-float-*`) pour les éléments du hero.

Les pages utilisent une structure commune : fond blanc, texte `#2a2a2a`, boutons/liens en rouge HMCC et sections CTA en fond rouge.

---

## Configuration SEO

| Élément        | Fichier / lieu        | Rôle |
|----------------|------------------------|------|
| **Metadata**   | `src/app/layout.tsx`  | Titre, description, Open Graph, Twitter Card, `metadataBase`, canonical, `robots` |
| **Constantes** | `src/app/lib/constants.ts` | `SITE_URL`, `SITE_NAME` (utilisés pour canonical, sitemap, OG) |
| **robots.txt** | `src/app/robots.ts`   | Autorisation des crawlers + URL du sitemap |
| **sitemap.xml**| `src/app/sitemap.ts`  | URLs à indexer (à compléter selon les pages) |
| **Langue**     | `<html lang="fr">`     | Langue déclarée pour le HTML |

En production, définir `NEXT_PUBLIC_SITE_URL` pour que les URLs absolues (canonical, sitemap, partage) soient correctes. Optionnel : remplir `metadata.verification.google` dans `layout.tsx` avec le code Google Search Console.

---

## Variables d’environnement

| Variable                 | Obligatoire | Description |
|--------------------------|------------|-------------|
| `NEXT_PUBLIC_SITE_URL`   | En prod    | URL publique du site (ex. `https://www.hmcc.fr`) pour SEO et partage. En dev, défaut `http://localhost:3000` ou URL Vercel si définie. |

Créer un fichier `.env.local` à la racine pour le développement ou configurer les variables sur l’hébergeur (ex. Vercel).

---

## Scripts disponibles

| Commande        | Description                |
|-----------------|----------------------------|
| `npm run dev`   | Serveur de développement  |
| `npm run build` | Build de production        |
| `npm run start` | Démarrer le build en mode production |
| `npm run lint`  | Lancer ESLint             |

---

## Aller plus loin

- [Documentation Next.js](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Google Search Console](https://search.google.com/search-console) pour suivre l’indexation une fois le site en ligne.

Pour déployer sur **Vercel** : connecter le dépôt et définir `NEXT_PUBLIC_SITE_URL` dans les variables d’environnement du projet.
