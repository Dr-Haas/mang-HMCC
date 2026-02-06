# Récupérer les assets depuis Figma

La home a été construite d’après les maquettes Figma. Les **icônes et images 3D** du design ne sont pas encore exportées : des emplacements (texte, emojis ou blocs vides) sont utilisés en attendant.

## Pourquoi les assets ne viennent pas du MCP Figma

Le **Figma MCP** a une limite d’appels selon le type de compte. Quand la limite est atteinte, il n’est plus possible de récupérer le contexte de design ou les URLs d’export via le MCP. Tu peux réessayer plus tard ou exporter les assets à la main depuis Figma.

## Où mettre les assets dans le projet

- **Images (photos, illustrations)** : dans `public/images/` (ex. `public/images/hero.jpg`, `public/images/card-1.jpg`).
- **Icônes (SVG/PNG)** : dans `public/icons/` ou `src/components/icons/`.
- Ensuite, utilise `next/image` avec `src="/images/..."` ou importe les SVG en composants React.

## Éléments à exporter depuis Figma (par section)

1. **Hero (Home_Page_1)**  
   Icônes : $, €, toggle à pièce, carte, documents empilés, portefeuille, curseur souris.

2. **Qui sommes-nous (Home_Page_2)**  
   Icônes 3D : smartphone/graphique, deux profils, pin de localisation ; décor : étoile, documents, drapeau, cadenas, puzzle, carte, compas.

3. **Nous proposons (Home_Page_3)**  
   Icônes 3D : curseur, montre, carte, puzzle, cadenas.

4. **Titre + compétences (Home_Page_4)**  
   Icônes 3D : dossiers, bulle de chat, bouclier ; formes décoratives (carrés rose/gris).

5. **5 cartes services (Home_Page_5)**  
   Images de fond des cartes (architecture) ; icône type Wi‑Fi/check en bas de section.

6. **3 blocs chiffres (Home_Page_6)**  
   3 photos (architecture) pour chaque bloc ; formes décoratives.

7. **Footer**  
   Aucun asset spécifique (texte + liens uniquement).

## Export depuis Figma

1. Sélectionne le frame ou le groupe contenant l’icône/image.
2. Clic droit → **Export** (ou panneau Design → Export).
3. Choisis le format (PNG, SVG, JPG selon l’usage).
4. Enregistre dans le dossier adapté du projet (voir ci‑dessus).

Une fois les fichiers en place, on peut remplacer les placeholders dans les composants par ces assets.
