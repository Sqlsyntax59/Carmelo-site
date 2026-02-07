# Carmelo Zambelli — Site Officiel

Site vitrine / portfolio de **Carmelo Zambelli**, 18 ans, double Champion de France Karaté Mix FFK (-70kg).

**[carmelozambelli.netlify.app](https://carmelozambelli.netlify.app)**

## Objectif

Crédibiliser l'athlète et attirer des sponsors via un site moderne, performant et mobile-first.

## Stack

- React 19 + Vite 7
- Inline CSS (pas de framework CSS)
- Google Fonts : Oswald + Inter
- FormSpree (contact)
- SVG inline + PNG custom (icones)
- Hébergement **Netlify** (deploy auto depuis GitHub)

## Scores Lighthouse

| Catégorie | Score |
|-----------|-------|
| Performance | 86 |
| Accessibilité | 97 |
| Best Practices | 100 |
| SEO | 100 |

## Commandes

```bash
npm install
npm run dev     # localhost:5173
npm run build   # dist/
npm run preview
```

---

## Structure du site

```
1. Hero           [nav: Accueil]      — Photo cage, stats animées, CTA sponsor, badge FFK, médaille cocarde
2. Karaté Mix     [nav: Discipline]   — Explication du sport, 3 piliers PNG custom, vidéo YouTube FFK (lazy-loaded)
3. Parcours       [nav: Parcours]     — Bio, fiche technique, pictogrammes, méthodes de victoire
4. Galerie        [nav: Galerie]      — Carrousel crossfade avec lightbox plein écran + swipe tactile
5. Palmarès       [nav: Palmarès]     — Timeline dorée, médailles, 18V-3D (86% win rate), section "Et ensuite"
6. Événements     [nav: Événements]   — Calendrier compétitions FFK à venir
7. Coach          [nav: L'Équipe]     — Maître Philippe Rollin (photo cercle doré), APRAM, qualifications
8. Sponsors       [nav: Sponsors]     — Diagramme combattant SVG (zones placement logo), tiers Or/Argent/Bronze
9. Contact        [nav: Contact]      — Formulaire FormSpree
```

## Composants flottants

- **FloatingBio** : Carte fixe à droite avec portrait, drapeau FR, bio courte, stats, CTA "Devenir Partenaire" (masquée sur Hero et Contact, masquée sur mobile <768px, réduite <1280px)
- **FloatingSpotify** : Panneau playlists de Carmelo (onglet latéral réapparaissant après fermeture)
- **ScrollProgress** : Barre de progression dorée en haut
- **ScrollToTop** : Bouton retour en haut après 600px de scroll
- **SponsorMarquee** : Bannière défilante de logos sponsors dans le footer

## Fonctionnalités

- Responsive mobile-first (70%+ trafic mobile)
- YouTube facade (chargement iframe au clic uniquement — pas de cookies tiers)
- Galerie avec swipe tactile mobile + lightbox plein écran
- Animations scroll reveal + compteurs animés
- Parallax hero
- Easter egg : triple-clic sur logo "CZ" → animation MMA (vidéo MP4)
- SEO complet (OG tags, sitemap.xml, robots.txt)
- Accessibilité : aria-labels, rôles ARIA, contraste optimisé

## Assets

| Fichier | Usage |
|---------|-------|
| `public/images/portrait-carmelo.png` | Portrait carte flottante + silhouettes sponsors |
| `public/images/logo-ffk.svg` | Logo Fédération Française de Karaté |
| `public/images/combat-cage.jpg` | Hero background (LCP, fetchpriority="high") |
| `public/images/podium-championnat.jpg` | Galerie |
| `public/images/soumission.jpg` | Galerie |
| `public/images/podium-coupe.jpg` | Galerie |
| `public/images/rollin-greg-mma.jpg` | Section L'Équipe (cercle doré) |
| `public/images/icon-frappe.png` | Icône Frappe debout (section Discipline) |
| `public/images/icon-projection.png` | Icône Projections (section Discipline) |
| `public/images/icon-soumission.png` | Icône Soumissions (section Discipline) |
| `public/images/medaille-cocarde.png` | Médaille cocarde tricolore (badge Hero) |
| `public/images/picto-3ans.png` | Pictogramme calendrier (titre Parcours) |
| `public/images/picto-titres.png` | Pictogramme médaille tricolore (titre Parcours) |
| `public/images/picto-trajectoire.png` | Pictogramme flèche trajectoire (titre Parcours) |
| `public/images/picto-eclair.png` | Blason chronomètre (objectif court terme) |
| `public/images/picto-eu.png` | Blason EU (objectif moyen terme) |
| `public/images/picto-fr.png` | Blason tricolore (objectif long terme) |
| `public/images/yt-karate-mix.jpg` | Thumbnail YouTube locale (facade) |
| `public/images/logo-mma.mp4` | Animation MMA (easter egg logo navbar) |

## Animations

- Scroll progress bar (haut de page)
- Parallax hero (image de fond)
- Gradient shimmer sur "ZAMBELLI"
- Fire sweep sur "UNE TRAJECTOIRE FULGURANTE" (gradient or/orange animé)
- Footer gradient animé
- Scroll reveal sur toutes les sections
- Compteurs animés dans le Hero
- Carrousel galerie avec crossfade
- Slide-in carte flottante (cubic-bezier)
- Bannière sponsors défilante (marquee infini)
- Timeline palmarès avec slide-in progressif
- Easter egg : triple-clic logo → vidéo MMA → retour auto au logo

## Rollback

```bash
git log --oneline           # voir les commits
git checkout 6e5fd6b -- .   # restaurer l'état avant mise à jour pictogrammes
git checkout 41c840e -- .   # restaurer l'état avant réorg UX
```
