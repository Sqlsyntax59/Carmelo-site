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
1. Hero           [nav: Accueil]      — Photo cage, stats, CTA, badge FFK, medaille cocarde
2. Karate Mix     [nav: Discipline]   — Explication du sport, 3 piliers PNG custom, video YouTube FFK
3. Parcours       [nav: Parcours]     — Bio 3 paragraphes, pictogrammes titres, stats, methodes de victoire
4. Galerie        [nav: Galerie]      — Carrousel photos avec auto-rotate
5. Palmares       [nav: Palmares]     — Timeline doree, medailles, drapeaux FR, section "Et ensuite" avec objectifs
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
| `public/images/medaille-cocarde.png` | Medaille cocarde tricolore (badge Hero "2x Champion") |
| `public/images/picto-3ans.png` | Pictogramme calendrier (titre Parcours) |
| `public/images/picto-titres.png` | Pictogramme medaille tricolore (titre Parcours) |
| `public/images/picto-trajectoire.png` | Pictogramme fleche trajectoire (titre Parcours) |
| `public/images/picto-eclair.png` | Blason chronometre (objectif court terme) |
| `public/images/picto-eu.png` | Blason EU (objectif moyen terme) |
| `public/images/picto-fr.png` | Blason tricolore (objectif long terme) |
| `public/images/logo-mma.mp4` | Animation MMA (easter egg logo navbar) |

## Icones
- Logo FFK officiel (hero + section Discipline)
- Medaille cocarde tricolore (badge "2x Champion de France")
- Pictogrammes dores : calendrier, medaille, trajectoire (titre Parcours)
- Blasons objectifs : chronometre, EU, tricolore (section "Et ensuite")
- Frappe debout, Projections, Soumissions : PNG custom fond transparent (section Discipline)
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
- Easter egg : triple-clic sur logo "CZ" → animation MMA (video MP4, retour au logo apres lecture)

## Changelog (depuis commit 6e5fd6b)

### Pictogrammes Parcours
- Ajout de 3 pictogrammes dores dans le titre : calendrier "3" (3 ans de pratique), medaille tricolore (2 titres nationaux), fleche trajectoire (une trajectoire fulgurante)
- Remplacement du drapeau francais inline par le pictogramme medaille

### Lisibilite textes
- Augmentation globale des opacites de texte (+15-20%) sur tout le site
- Les textes secondaires, disclaimers et labels passent de quasi-invisibles a lisibles
- Hierarchie visuelle maintenue (titres > corps > labels)

### Section "Et ensuite" (Palmares)
- Nouveau titre : "L'objectif est clair : passer au niveau superieur."
- Texte d'intro reecrit en 2 paragraphes (oriente sponsoring)
- Timeline enrichie : sous-titres + descriptions (Professionnalisation / Scene europeenne FFK / Porter les couleurs de la France)
- Icones emoji remplacees par 3 blasons PNG custom (chronometre, EU, tricolore)
- Citation reecrite : "Mon style, c'est le controle. Mon objectif, c'est le sommet."

### Badge Hero
- Trophee SVG remplace par la medaille cocarde tricolore (PNG)
- Cocarde surdimensionnee (90px) depassant du bandeau pour effet premium
- Bandeau reduit et recentre sous "ZAMBELLI"

### Easter egg navbar
- Logo "CZ" conserve par defaut
- Triple-clic rapide (<800ms) lance l'animation MMA (video MP4)
- Retour automatique au logo "CZ" a la fin de la video

## Rollback
```bash
git log --oneline           # voir les commits
git checkout 6e5fd6b -- .   # restaurer l'etat avant cette mise a jour
git checkout 41c840e -- .   # restaurer l'etat avant reorg
```
