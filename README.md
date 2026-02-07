# Carmelo Zambelli — Site Vitrine

## Stack
- React 19 + Vite 7
- Inline CSS (pas de framework CSS)
- Google Fonts : Oswald + Inter
- FormSpree (contact)
- SVG inline + PNG custom (icones)

## Commandes
```bash
npm run dev     # localhost:5173
npm run build   # dist/
```

---

## Structure du site

```
1. Hero           [nav: Accueil]      — Photo cage, stats, CTA, badge FFK
2. Karate Mix     [nav: Discipline]   — Explication du sport, 3 piliers PNG custom, video YouTube FFK
3. Parcours       [nav: Parcours]     — Bio 3 paragraphes, stats, methodes de victoire, drapeau FR
4. Galerie        [nav: Galerie]      — Carrousel photos avec auto-rotate
5. Palmares       [nav: Palmares]     — Timeline doree, medailles, drapeaux FR, classements
6. Evenements     [nav: Evenements]   — Calendrier competitions a venir
7. Coach          [nav: L'Equipe]     — Maitre Philippe Rollin (photo cercle dore), APRAM, qualifications
8. Sponsors       [nav: Sponsors]     — Diagramme combattant SVG (zones placement logo), tiers Or/Argent/Bronze
9. Contact        [nav: Contact]      — Formulaire FormSpree
```

## Composants flottants
- **FloatingBio** : Carte fixe a droite avec portrait, drapeau FR, bio courte, stats, CTA "Devenir Partenaire" (masquee sur Hero et Contact, masquee sur mobile <768px, reduite <1280px)
- **ScrollProgress** : Barre de progression doree en haut
- **ScrollToTop** : Bouton retour en haut apres 600px de scroll
- **SponsorMarquee** : Banniere defilante de logos sponsors dans le footer

## Assets

| Fichier | Usage |
|---------|-------|
| `public/images/portrait-carmelo.png` | Portrait dans la carte flottante + tete sur silhouettes sponsors |
| `public/images/logo-ffk.svg` | Logo Federation Francaise de Karate |
| `public/images/combat-cage.jpg` | Hero background |
| `public/images/podium-championnat.jpg` | Galerie |
| `public/images/soumission.jpg` | Galerie |
| `public/images/podium-coupe.jpg` | Galerie |
| `public/images/rollin-greg-mma.jpg` | Section L'Equipe (cercle dore) |
| `public/images/icon-frappe.png` | Icone Frappe debout (section Discipline) |
| `public/images/icon-projection.png` | Icone Projections (section Discipline) |
| `public/images/icon-soumission.png` | Icone Soumissions (section Discipline) |

## Icones
- Logo FFK officiel (hero + section Discipline)
- Trophee (badge "2x Champion de France")
- Frappe debout, Projections, Soumissions : PNG custom fond transparent (section Discipline)
- Drapeau francais inline (3 spans colores) : badge portrait, palmares, titre parcours
- Silhouette combattant SVG avec zones placement logo (section Sponsors)
- Medailles SVG or/argent/bronze (section Palmares)

## Animations
- Scroll progress bar (haut de page)
- Parallax hero (image de fond)
- Gradient shimmer sur "ZAMBELLI"
- Fire sweep sur "UNE TRAJECTOIRE FULGURANTE" (gradient or/orange anime)
- Footer gradient anime
- Scroll reveal sur toutes les sections
- Animated numbers dans le Hero
- Carrousel galerie avec auto-rotate
- Slide-in carte flottante (cubic-bezier, disparait sur Hero et Contact)
- Banniere sponsors defilante (marquee infini)
- Timeline palmares avec slide-in progressif

## Rollback
```bash
git log --oneline           # voir les commits
git checkout 41c840e -- .   # restaurer l'etat avant reorg
```
