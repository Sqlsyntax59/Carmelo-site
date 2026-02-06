# Carmelo Zambelli — Site Vitrine

## Stack
- React 19 + Vite 7
- Inline CSS (pas de framework CSS)
- Google Fonts : Oswald + Inter
- FormSpree (contact)
- SVG inline (icones vectorielles)

## Commandes
```bash
npm run dev     # localhost:5173
npm run build   # dist/
```

---

## Structure du site

```
1. Hero           [nav: Accueil]      — Photo cage, stats, CTA
2. Karate Mix     [nav: Discipline]   — Explication du sport, 3 piliers SVG, lien FFK
3. Parcours       [nav: Parcours]     — Bio, stats (age/ville/club), methodes de victoire
4. Galerie        [nav: Galerie]      — Carrousel photos avec auto-rotate
5. Palmares       [nav: Palmares]     — Resultats + sous-section "Et ensuite" (ambitions)
6. Coach          [nav: L'Equipe]     — Maitre Philippe Rollin, APRAM
7. Sponsors       [nav: Sponsors]     — Offres partenariat Bronze/Argent/Or
8. Contact        [nav: Contact]      — Formulaire FormSpree
```

## Composants flottants
- **FloatingBio** : Carte fixe a droite avec portrait, drapeau FR, bio courte, stats, CTA "Devenir Partenaire" (masquee sur mobile <768px, reduite <1280px)
- **ScrollProgress** : Barre de progression doree en haut
- **ScrollToTop** : Bouton retour en haut apres 600px de scroll

## Assets

| Fichier | Usage |
|---------|-------|
| `public/images/portrait-carmelo.png` | Portrait dans la carte flottante |
| `public/images/logo-ffk.svg` | Logo Federation Francaise de Karate |
| `public/images/combat-cage.jpg` | Hero background |
| `public/images/podium-championnat.jpg` | Galerie |
| `public/images/soumission.jpg` | Galerie |
| `public/images/podium-coupe.jpg` | Galerie |
| `public/images/stage-apram.jpg` | Section L'Equipe |

## Icones
Toutes les icones sont en SVG inline (pas d'emoji) :
- Logo FFK officiel (hero + section Discipline)
- Trophee (badge "2x Champion de France")
- Frappe debout, Projections, Soumissions (section Discipline)
- Drapeau francais (badge sur portrait carte flottante)

## Animations
- Scroll progress bar (haut de page)
- Parallax hero (image de fond)
- Gradient shimmer sur "ZAMBELLI"
- Footer gradient anime
- Scroll reveal sur toutes les sections
- Animated numbers dans le Hero
- Carrousel galerie avec auto-rotate
- Slide-in carte flottante (cubic-bezier)

## Rollback
```bash
git log --oneline           # voir les commits
git checkout 41c840e -- .   # restaurer l'etat avant reorg
```
