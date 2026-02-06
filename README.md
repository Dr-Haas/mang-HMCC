# HMCC

Projet [Next.js](https://nextjs.org) avec une configuration optimisée pour l’**indexation Google** (SEO).

## Démarrage

Lancer le serveur de développement :

```bash
npm run dev
```

Puis ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

Vous pouvez modifier la page d’accueil dans `src/app/page.tsx`. Les changements sont rechargés à la volée.

Ce projet utilise [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) pour charger la police [Geist](https://vercel.com/font).

## Configuration SEO (indexation Google)

Le projet est configuré pour une bonne indexation par Google et les autres moteurs de recherche :

| Élément | Fichier | Rôle |
|--------|---------|------|
| **Metadata** | `src/app/layout.tsx` | Titre, description, Open Graph, Twitter Card, canonical, `metadataBase` |
| **robots.txt** | `src/app/robots.ts` | Autorise les crawlers et indique l’URL du sitemap |
| **sitemap.xml** | `src/app/sitemap.ts` | Liste des URLs à indexer (à enrichir au fil des pages) |
| **URL de base** | `src/app/lib/constants.ts` | Utilisée pour les liens absolus (canonical, sitemap, OG) |

### À faire en production

1. **Définir l’URL du site**  
   Créez un fichier `.env.local` (ou configurez les variables sur votre hébergeur) avec :
   ```bash
   NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
   ```

2. **Google Search Console**  
   Une fois le site en ligne, ajoutez la propriété dans [Google Search Console](https://search.google.com/search-console) et, si besoin, décommentez `metadata.verification.google` dans `src/app/layout.tsx` avec votre code de vérification.

3. **Enrichir le sitemap**  
   Dans `src/app/sitemap.ts`, ajoutez les URLs de toutes les pages importantes (priorité et `changeFrequency` selon le type de contenu).

### Bonnes pratiques déjà en place

- **App Router** : rendu côté serveur par défaut (meilleur pour le crawl).
- **metadataBase** : URLs absolues correctes pour les partages et le canonical.
- **lang="fr"** : langue déclarée pour le HTML.
- **robots** : `index, follow` pour Google.
- **Template de titre** : `%s | HMCC` pour des titres cohérents sur toutes les pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
