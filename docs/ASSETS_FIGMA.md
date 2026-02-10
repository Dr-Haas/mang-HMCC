# Récupérer les assets depuis Figma

Le site a été refondu à partir du nouveau Figma **[HMCC-Webside](https://www.figma.com/design/30LtbNha2wozffWnJVHQGp/HMCC-Webside?node-id=1-3)**. Les images et icônes du design sont à exporter depuis Figma et à intégrer dans le projet.

## Pourquoi les assets ne viennent pas du MCP Figma

Le **Figma MCP** a une limite d’appels selon le type de compte. Quand la limite est atteinte, il n’est plus possible de récupérer le contexte de design ou les URLs d’export via le MCP. Tu peux réessayer plus tard ou exporter les assets à la main depuis Figma.

## Où mettre les assets dans le projet

- **Images (photos, illustrations)** : dans `public/images/` (ex. `public/images/home/hero.jpg`, `public/images/services/card-1.jpg`). Créer des sous-dossiers par page ou section si besoin.
- **Icônes (SVG/PNG)** : dans `public/icons/` ou `src/components/icons/`.
- Ensuite, utiliser `next/image` avec `src="/images/..."` ou importer les SVG en composants React.

## Export depuis Figma

1. Ouvrir le fichier [HMCC-Webside](https://www.figma.com/design/30LtbNha2wozffWnJVHQGp/HMCC-Webside?node-id=1-3) et parcourir les frames (desktop et responsive).
2. Sélectionner le frame ou le groupe contenant l’icône/image.
3. Clic droit → **Export** (ou panneau Design → Export).
4. Choisir le format (PNG, SVG, JPG selon l’usage).
5. Enregistrer dans le dossier adapté du projet (voir ci‑dessus).

Une fois les fichiers en place, remplacer les placeholders dans les composants par ces assets (via `next/image` ou composants SVG).
