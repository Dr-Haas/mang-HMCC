# Design system HMCC

Référence des tokens utilisés dans le projet. À aligner avec la maquette Figma [HMCC-Webside](https://www.figma.com/design/30LtbNha2wozffWnJVHQGp/HMCC-Webside?node-id=1-3) lorsque les variables sont disponibles (Figma Variables ou inspection manuelle).

## Couleurs

| Nom        | Variable CSS   | Valeur   | Usage principal        |
|-----------|----------------|----------|-------------------------|
| Background| `--background` | `#ffffff`| Fond de page            |
| Foreground| `--foreground` | `#2a2a2a`| Texte principal         |
| HMCC Red  | `--hmcc-red`   | `#e61d2b`| CTA, liens actifs, accent |
| HMCC Red Dark | `--hmcc-red-dark` | `#b81a25` | Hover boutons |
| HMCC Dark | `--hmcc-dark`  | `#2a2a2a`| Titres, texte sombre    |

Tailwind : `bg-background`, `text-foreground`, `bg-hmcc-red`, `text-hmcc-red`, etc. (voir `globals.css` `@theme inline`).

## Typographie

- **Sans** : Geist Sans (`--font-geist-sans`), fallback `system-ui, sans-serif`
- **Mono** : Geist Mono (`--font-geist-mono`)

Polices chargées dans `src/app/layout.tsx`. À ajuster si le Figma impose d’autres familles.

## Espacements et breakpoints

Utiliser les utilitaires Tailwind par défaut (padding, margin, gap). Breakpoints standard :

- `sm`: 640px  
- `md`: 768px  
- `lg`: 1024px  
- `xl`: 1280px  
- `2xl`: 1536px  

Adapter si le Figma définit d’autres largeurs de frame (ex. 375px, 1440px).

## Bordures et rayons

À définir selon le Figma. En attendant : `rounded-md` (6px), `rounded-lg` (8px) pour boutons et cartes.
