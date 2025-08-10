# Refonte UI/UX — Consignes issues des échanges du 08/08/2025

> Source: échanges chat (à insérer ci-dessous pour traçabilité). Merci de coller le transcript pertinent ici.

## 1) Contexte et objectifs
- Conserver la cohérence visuelle actuelle (Poppins, surfaces blanches, bordures grises, primary #FB7129)
- Moderniser l’interface (corporate, premium, institutionnelle)
- Optimiser parcours utilisateurs, lisibilité et responsive
- Respecter l’accessibilité (focus visible, contrastes AA, cibles ≥ 44x44)

## 2) Modifications demandées (à partir des chats)

### 2.1 Header et identité
- [ ] Ajouter sous le logo le texte: « Plateforme des marchés publics » (dans `ModernLayout.tsx`)
- [ ] Aligner le menu utilisateur (clic sur « Sonec Devteam ») sur celui du Dashboard: afficher email, rôle, option de langue (icône `Globe`), liens Paramètres/Support/Déconnexion
- [ ] Préserver navigation fluide, cohérence des composants existants

### 2.2 Routing et navigation
- [ ] `/operations` doit rediriger vers `/operations/passation-plans`
- [ ] `/my-offers` doit afficher par défaut `my-offers/invitations` (rediriger si nécessaire)
- [ ] Remplacer l’ouverture en modale des détails « opérations » par une navigation vers une nouvelle page dédiée `OperationDetailsPage` (route + vue)

### 2.3 PassationPlansPage (Opérations)
- [ ] Implémenter la section « Filtres de recherche » sous forme de carte collapsible (comme l’extrait HTML fourni)
- [ ] Connecter 4 dropdowns (selon l’extrait):
  - « Ministère / Institution » (multi-sélection)
  - « Autorité contractante » (multi-sélection)
  - + 2 autres champs dropdown (cf. extrait HTML) — à reproduire à l’identique (placeholder "Sélectionner", rôles ARIA, etc.)
- [ ] Ajouter « Réinitialiser » et « Rechercher » avec état contrôlé et filtrage effectif du tableau
- [ ] Cliquer sur la flèche (détail) ouvre la page de détail (pas de modale)

### 2.4 TenderListPage (Avis d’Appel d’Offres)
- [ ] Harmoniser la présentation avec `PassationPlansPage`: carte filtres (4 selects), boutons Réinitialiser/Rechercher, barre de recherche en tête de liste
- [ ] Appliquer état contrôlé des champs et filtrage de la liste

### 2.5 InvitationsPage (Mes offres / Invitations restreintes)
- [ ] Harmoniser la section « Filtres de recherche » avec `PassationPlansPage` (card arrondie, grille, boutons Réinitialiser/Choix des filtres/Rechercher)
- [ ] Rendre fonctionnel le bouton « Choix des filtres »: menu proposant d’afficher/masquer chaque champ de filtre (cases à cocher)
- [ ] Adapter le style aux directives « corporate, premium et innovant » tout en gardant les composants/variables actuels
- [ ] Élargir légèrement la page (conteneur et zones de recherche)
- [ ] Supprimer le bandeau en dégradé vert du titre; afficher le titre en noir gras
- [ ] Accessibilité renforcée: formulaire avec submit/reset, labels explicites, `aria-live` sur l’état vide

### 2.6 Images et placeholders
- [ ] Remplacer l’image par défaut du composant `ImagePlaceholder` par l’image fournie dans `public`: `View_of_the_Plateau,_Abidjan.jpg` (vérifier l’extension exacte)

### 2.7 Rappels stylistiques et accessibilité (dirigeabilité)
- [ ] Style corporate/premium/innovant sans rompre l’identité existante
- [ ] Mise en page claire et hiérarchisée (titres, sous-titres, métadonnées)
- [ ] Parcours optimisés (actions visibles, feedback clair)
- [ ] Respect des bonnes pratiques d’accessibilité (contrastes AA, focus ring, navigation clavier)

## 3) Règles UI transverses (alignées avec le design system actuel)
- Grille: conteneur max 1280px, espaces en multiples de 8 (16/24/32)
- Typo: H1 28/32, H2 22/28, H3 18/24, body 14/20, boutons 14 medium
- Couleurs: variables CSS existantes (primary, accent, muted, border)
- Élévation: bordures subtiles, ombre légère pour menus/popovers
- États: hover doux, empty states pédagogiques, skeleton en chargement

## 4) Écrans impactés et gabarits attendus

### 4.1 Dashboard
- 4 cartes KPI `Card` (icône, libellé, métrique, delta)
- 2 aperçus: derniers AO (2/3) et activités/notifications (1/3)

### 4.2 Liste + filtres (ex: Tenders, Admin Users, Mes Offres, Mes Marchés)
- En-tête page: titre + description + actions (Nouveau, Export)
- Panneau filtres: `PageTemplateWithFilters` en grille responsive
- Tableau: entêtes collants, lignes hover, badges de statut, pagination
- Redirections par défaut: `/operations` → `passation-plans`, `/my-offers` → `invitations`

### 4.3 Détail avec onglets (ex: Tender Detail, Market Details, Operation Details)
- En-tête contextualisé: titre + méta clés + actions primaires
- `Tabs`: Informations, Documents, Échéances, Historique
- Accès depuis la liste par navigation (pas de modale)

### 4.4 Assistant (ex: Achat AO / Paiement)
- Étapes horizontales (progression), carte contenu centrale
- Résumé sticky à droite (desktop), full width (mobile)

### 4.5 Authentification
- Carte centrée, branding discret, aide/contact, feedback clair

## 5) Composants et fichiers concernés (réutilisation)
- `src/components/ui/button.tsx` — variantes: default/outline/ghost/link
- `src/components/ui/card.tsx` — conteneurs KPI, sections de page
- `src/components/ui/tabs.tsx` — navigation secondaire par sections
- `src/components/layout/PageTemplateWithFilters.tsx` — filtres collapsibles
- `src/components/layout/ModernLayout.tsx` — header + breadcrumbs
- `src/index.css` / `tailwind.config.js` — variables et tokens de thème

## 6) Règles responsive
- ≤ 640px: 1 colonne, boutons full width, filtres fermés par défaut
- 641–1024px: 2 colonnes si utile; tables scrollables horizontalement
- ≥ 1024px: grilles 12 colonnes; filtres ouverts par défaut

## 7) Accessibilité
- Focus ring via `--color-ring`; labels au-dessus des champs
- Contrastes vérifiés (AA), aria-label sur icônes seules
- Formulaires de filtres soumis au clavier (Enter) et reset (Esc/btn)
- Zones d’état vide avec `aria-live="polite"`

## 8) Check-list d’acceptation
- [ ] Header mis à jour (texte sous logo, menu utilisateur complet + langue)
- [ ] Redirections `/operations` et `/my-offers` opérationnelles
- [ ] `OperationDetailsPage` créée et reliée; suppression des modales de détail
- [ ] `PassationPlansPage`: 4 dropdowns, reset/recherche, filtrage effectif
- [ ] `TenderListPage`: filtres harmonisés + filtrage
- [ ] `InvitationsPage`: filtres harmonisés, bouton « Choix des filtres » fonctionnel, style premium, titre sans gradient vert, largeur ajustée, accessibilité OK
- [ ] `ImagePlaceholder`: image publique utilisée par défaut
- [ ] Tables: entêtes collants, hover, badges, pagination uniformisés
- [ ] Responsive vérifié (mobile / tablette / desktop)
- [ ] Accessibilité: focus, contrastes, navigation clavier basique

## 9) Régressions à surveiller (remplir selon constats)
- [ ] Navigation breadcrumb incorrecte sur certaines routes
- [ ] Décalage d’espacement dans `ModernLayout` sur mobile
- [ ] Incohérence de badges de statut dans les listes
- [ ] Styles de tables non uniformes entre modules

## 10) Historique d’application
- 2025-08-09 — Création du présent document, structure et sections prêtes
- 2025-08-08 — (à compléter) Application des consignes issues des chats

---

Note: ce document compile les consignes exactes des chats. Merci de coller le transcript dans la section 2) pour archivage et exécution fidèle.
