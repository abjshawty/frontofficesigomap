# Analyse Fonctionnelle et Spécifications de l'Application SIGOMAP

Ce document détaille l'analyse fonctionnelle des modules et parcours utilisateurs de l'application SIGOMAP, basée sur la transcription de la session de travail. Il a pour objectif de servir de document de référence pour la conception des interfaces (UI), l'expérience utilisateur (UX) et le développement.

---

## Architecture de la Navigation (Module Commande Publique)

La navigation principale pour l'ensemble du processus de passation de marché de l'Autorité Contractante s'articule autour d'un module principal "Commande Publique", avec l'arborescence de sous-menus suivante :

-   **Tableau de bord** : Vue d'ensemble et accès rapides.
-   **Planification** (Section Dépliable)
    -   **Plans de Passation** : Gestion des plans annuels.
    -   **Opérations** : Suivi centralisé de toutes les opérations.
-   **Procédures de Passation** (Section Dépliable)
    -   **Dossiers d'Appel d'Offres (DAO)** : Gestion des DAO.
    -   **Procédures Dérogatoires** : Gestion des cas particuliers.

---

## Acteurs Principaux

| Acteur | Abréviation | Rôle |
|---|---|---|
| **Autorité Contractante** | AC | Gère la procédure de marché public, de la publication à la contractualisation et au suivi. |
| **Direction Générale des Marchés Publics** | DGMP | Organe de contrôle et de validation. Intervient à plusieurs niveaux hiérarchiques (Chargé d'études, Chef de Service, Sous-Directeur, Directeur, DG). |
| **Opérateur Économique** | OE | Entreprise qui soumissionne aux appels d'offres et exécute les marchés. |

---

## Glossaire

| Abréviation | Signification |
|---|---|
| AAO | Avis d'Appel d'Offres |
| AC | Autorité Contractante |
| CCAP | Cahier des Clauses Administratives Particulières |
| COJO | Commission d'Ouverture et de Jugement des Offres |
| DAO | Dossier d'Appel d'Offres |
| DGMP | Direction Générale des Marchés Publics |
| OE | Opérateur Économique |
| OS | Ordre de Service |
| OTP | One-Time Password (Mot de passe à usage unique) |
| RIB | Relevé d'Identité Bancaire |
| TVA | Taxe sur la Valeur Ajoutée |
| UI / UX | User Interface / User Experience (Interface Utilisateur / Expérience Utilisateur) |

---

## Module 1 : Planification et Préparation de la Commande

Ce module, qui se situe en amont de tout le processus, couvre la création du plan de passation des marchés, le paramétrage des opérations qui le composent, et la constitution du dossier de consultation par l'Autorité Contractante (AC), jusqu'à sa validation avant publication.

### 1.1 - Gestion des Plans de Passation

Le plan de passation est le contenant annuel des opérations de marché public d'une autorité contractante.

#### Parcours Utilisateur
1.  En début de gestion, l'AC crée un plan de passation pour l'exercice.
2.  Un plan distinct est créé pour chaque type de procédure (`classique` ou `simplifiée`).
3.  L'AC accède à la liste de ses plans et peut consulter les opérations qu'ils contiennent.

---

### 1.2 - Création et Paramétrage d'une Opération

L'opération est l'unité de base de la planification. Chaque opération doit être validée et publiée pour pouvoir être utilisée dans une procédure (DAO, procédure dérogatoire, etc.).

#### Parcours Utilisateur
1.  Depuis un plan de passation, l'AC clique sur "Ajouter une opération".
2.  L'AC remplit le formulaire de paramétrage de l'opération (informations générales).
3.  L'AC passe à l'étape suivante pour définir le calendrier prévisionnel de l'opération.
4.  L'AC soumet l'opération au circuit de validation de la DGMP.

#### Écran 1 : Formulaire de Paramétrage de l'Opération (Étape 1/2)
> *Implémentation Technique : Le formulaire est géré par le composant `src/components/dao/OperationGeneralForm.tsx` au sein de la page `app/dao/planification/operations/new/page.tsx`.*

| Nom du champ | Type de Donnée | Notes |
|---|---|---|
| Objet de l'opération | String | Deviendra l'objet par défaut du futur DAO. Non modifiable par la suite. |
| Type de marché | Dropdown | `Travaux`, `Fournitures`, `Prestations` |
| Nature | Dropdown | `Travaux`, `Fournitures`, `Prestation courante`, `Prestation intellectuelle`, `Mixte` |
| Dispositions appliquées | Radio Button | `Nationales`, `Non-nationales (Bailleurs)` |
| Mode de passation | Dropdown | `Appel d'offres ouvert`, `Appel d'offres restreint`, etc. |
| Type de marché envisagé | Dropdown | `Marché classique`, `Marché à commande`, etc. Impacte la numérotation finale du contrat. |
| Périmètre de publication | Radio Button | `National`, `International` |
| Réservé aux PME | Checkbox | |
| Coût estimatif de l'opération | Number | |
| Lignes budgétaires | Multi-select | Seules les lignes sélectionnées ici seront disponibles pour le DAO. |
| Opération pluriannuelle | Checkbox | **(Amélioration)** Si coché, un champ d'upload apparaît pour joindre le document justificatif (PIP). |

> **Règles de gestion clés** :
> 1.  Le couple `Procédure simplifiée` + `Dispositions non-nationales` est bloquant : le système ne doit pas afficher de calendrier, empêchant la soumission.
> 2.  Le système doit alerter l'AC si le `Coût estimatif` dépasse le montant disponible sur la/les `Lignes budgétaires` sélectionnées, sans toutefois bloquer (cas des opérations pluriannuelles).

---

### 1.3 - Définition du Calendrier Prévisionnel (Étape 2/2)

#### Parcours Utilisateur
1.  Après avoir validé les informations générales, l'AC accède à l'interface du calendrier.
2.  L'AC saisit la toute première date (ex: `Date de transmission du dossier à la DGMP`).
3.  Le système calcule et pré-remplit automatiquement toutes les dates suivantes en fonction des délais réglementaires.
4.  L'AC peut ajuster manuellement certaines dates. Le système recalcule alors les étapes dépendantes.
5.  Une fois le calendrier validé, l'opération est prête à être soumise.

> *Implémentation Technique : Le calendrier est géré par le composant `src/components/dao/OperationCalendarForm.tsx`.*
> 
> **Règles de gestion clés** :
> 1.  Le calcul doit prendre en compte les jours fériés et non ouvrables.
> 2.  Le système doit empêcher la saisie d'une date antérieure à celle de l'étape précédente.
> 3.  Certains délais (ex: publication) sont incompressibles.

---

### 1.4 - Workflow de Validation de l'Opération

#### Parcours Utilisateur
1.  L'AC soumet l'opération. Statut -> `Soumise pour contrôle`.
2.  Le **Chargé d'études** (DGMP) reçoit l'opération, l'examine et émet un avis (`Favorable` / `Défavorable`) avec ses observations.
3.  Le **Chef de Service** (DGMP) reçoit l'opération avec l'avis du chargé d'études. Il peut :
    -   **Valider** : L'opération est approuvée.
    -   **Modifier et Valider** : Changer l'avis et valider.
    -   **Renvoyer au chargé d'études** : Pour une nouvelle analyse.
    -   **Renvoyer à l'AC** : L'opération est rejetée et retourne à l'AC pour correction.
4.  Une fois l'opération validée, elle est transmise au **Service Publication** qui la rend publique.
5.  Une opération `Validée et Publiée` est désormais disponible pour la création d'un DAO ou d'une procédure dérogatoire.

> **Amélioration - Prévention des erreurs** :
> Avant chaque action finale du Chef de Service (Valider, Renvoyer), une modale de confirmation doit apparaître, résumant l'action sur le point d'être effectuée pour éviter les erreurs de clic. Exemple : "Vous êtes sur le point de VALIDER l'opération XYZ. Confirmez-vous ?".

---

### 1.6 - Procédures Dérogatoires

Ce parcours décrit la gestion des demandes qui dérogent aux procédures standards, comme le gré à gré ou la consultation restreinte.

#### Parcours Utilisateur
1.  L'AC sélectionne une opération `Validée et Publiée` et choisit "Initier une procédure dérogatoire".
2.  L'AC sélectionne le type de demande (ex: `Demande de gré à gré`, `Consultation restreinte`, `Autorisation d'anticipation`...).
3.  L'AC remplit le formulaire associé à la demande. Cela inclut généralement :
    -   Le motif réglementaire.
    -   La liste des entreprises à consulter (pour une consultation restreinte).
    -   Le montant envisagé.
4.  L'AC joint les pièces justificatives requises pour la requête.
5.  La demande est soumise à un circuit de validation spécifique au sein de la DGMP.
6.  Contrairement au DAO, ce workflow doit permettre un **retour pour complément de pièces** sans pour autant rejeter entièrement la demande.

#### Écran : Formulaire de Demande Dérogatoire
- **Vue**: Formulaire dynamique dont les champs s'adaptent au type de demande sélectionné.

| Nom du champ | Type de Donnée | Apparaît pour... |
|---|---|---|
| Type de demande | Dropdown | Toujours visible |
| Opération concernée | String (pré-rempli) | Toujours visible |
| Motif réglementaire | Dropdown | Gré à gré (`Urgence impérieuse`, `Monopole`, `Technique/Artistique`) |
| Liste des entreprises | Multi-select / Tag input | `Consultation restreinte` |
| Pièces justificatives | File Upload | Toujours visible, la liste des pièces attendues peut varier. |

---

### 1.5 - Création du Dossier d'Appel d'Offres (DAO)

Ce processus démarre à partir d'une opération préalablement validée et publiée.

#### Parcours Utilisateur
1.  L'AC sélectionne une opération publiée et clique sur "Créer un DAO".
2.  Il remplit les **Paramètres Généraux** du DAO (allotissement, garanties, etc.).
3.  Il complète les informations du **CCAP**.
4.  Il définit les **lots** de son marché.
5.  Il sélectionne et affecte les **critères d'évaluation** à chaque lot.
6.  Il constitue la **commission (COJO)**.
7.  Il joint les **pièces du dossier** non générées par le système.
8.  Il valide le DAO, qui est alors prêt à être soumis au circuit de validation.

#### Écran 1 : Paramètres Généraux du DAO
> *Implémentation Technique : Géré par le composant `src/components/dao/DAOGeneralParams.tsx`.*

- **Vue**: Formulaire principal. Les informations de l'opération (objet, type de marché...) sont rappelées mais non-éditables.

| Nom du champ | Type de Donnée | Notes |
|---|---|---|
| Durée de validité des offres (jours) | Number | |
| Coût d'acquisition du dossier | Number | 0 si gratuit |
| Garantie d'offre exigée | Radio Button (Oui/Non) | |
| Garantie de bonne exécution exigée | Radio Button (Oui/Non) | |
| Marges de préférence (Sous-traitance, %) | Number (0-15) | Obligatoire |
| Marges de préférence (Artisanale, %) | Number (0-5) | Obligatoire |
| Mode d'évaluation | Dropdown | Liste filtrée selon la nature du marché. |
| Seuil offre anormalement basse (%) | Number | |
| Nombre maximum de lots attribuables | Number | Nombre maximum de lots qu'un seul soumissionnaire peut remporter. |

#### Écran 2 : Éditeur du CCAP
> *Implémentation Technique : Géré par le composant `src/components/dao/DaoCcapEditor.tsx`.*

- **Vue**: Formulaire permettant de saisir les articles du CCAP. De nombreuses informations sont pré-remplies. L'utilisateur complète les champs vides.
> **Règle** : Pour les marchés financés par des bailleurs, le système ne génère pas de CCAP. L'AC doit uploader le document fourni par le bailleur.

#### Écran 3 : Gestion de l'Allotissement
> *Implémentation Technique : Géré par le composant `src/components/dao/DaoAllotissement.tsx`.*

- **Vue**: Interface pour créer et gérer les lots du marché.

| Champ / Colonne | Type de Donnée | Notes |
|---|---|---|
| Numéro de lot | String | |
| Libellé | String | |
| Montant estimatif | Number | **Champ masqué pour la DGMP**. Sert au calcul de la fourchette de la garantie d'offre. |
| Garantie d'offre | Number | Le système valide que le montant est dans la fourchette (ex: 1% à 1.5% du montant estimatif). |
| Délai d'exécution (jours) | Number | |

#### Écran 4 : Définition des Critères d'Évaluation
> *Implémentation Technique : Géré par le composant `src/components/dao/DaoCriteres.tsx`.*

- **Vue**: Interface en deux volets. À gauche, la liste des critères disponibles (filtrée par nature du marché). À droite, les critères sélectionnés pour le DAO.
- **Interactions**:
    1.  L'AC sélectionne les critères nécessaires depuis la liste de gauche.
    2.  Les critères apparaissent à droite, où ils peuvent être modifiés (libellé, détails).
    3.  L'AC sélectionne un ou plusieurs lots et affecte les critères.
> **Règle** : Des lots différents peuvent avoir des critères d'évaluation différents.

#### Écran 5 : Constitution de la Commission (COJO)
> *Implémentation Technique : Géré par le composant `src/components/dao/DaoCommission.tsx`.*

- **Vue**: Interface simplifiée pour définir la composition de la COJO.
- **Parcours amélioré**:
    1.  Le système affiche directement la liste des **fonctions** possibles pour la commission, pré-cochant celles qui sont obligatoires selon le statut juridique de l'AC.
    2.  L'AC ajuste la sélection (ajoute/retire des fonctions optionnelles comme "Maître d'oeuvre").
    3.  Le système affiche les fonctions sélectionnées et **pré-remplit automatiquement les structures** lorsque c'est possible (ex: la Cellule de Passation et le Contrôleur Financier rattachés au ministère de l'AC).
    4.  L'AC n'a plus qu'à renseigner les quelques structures restantes via un champ de recherche.

#### Écran 6 : Gestion des Pièces du Dossier
> *Implémentation Technique : Géré par le composant `src/components/dao/DaoDocuments.tsx`.*

- **Vue**: Interface listant les documents constitutifs du DAO.
- **Règle de gestion**:
    - Le système **génère automatiquement** les documents basés sur les saisies (CCAP, Données Particulières, etc.) et les met à disposition en lecture seule (PDF Brouillon).
    - L'utilisateur ne peut **uploader** que les documents que le système ne peut pas générer (ex: Cahier des Clauses Techniques Particulières (CCTP), Bordereau des Prix Unitaires (BPU), Détail Quantitatif Estimatif (DQE)).
    - Le système doit **interdire l'upload** d'un type de document qu'il génère lui-même pour éviter les conflits.

#### Écran 7 : Tableau de bord des DAO
- **Vue**: Tableau listant les DAO créés par l'AC.
- **Interaction**: Soumettre un DAO `Brouillon` au circuit de validation.

| Champ / Colonne | Type de Donnée |
|---|---|
| Référence DAO | String |
| Objet | String |
| Statut | String (`Brouillon`, `En validation`, `Validé`, `Rejeté`) |

***
**Opérations CRUD sur les données :**
*   **Plan de Passation**: Create, Read, Update.
*   **Opération**: Create, Read, Update, Delete (si statut `Brouillon`).
*   **DAO** : Create, Read, Update, Delete (uniquement si statut `Brouillon`).
*   **Critère d'Évaluation** : Create, Read, Update, Delete.
*   **Lot**: Create, Read, Update, Delete.
*   **Commission**: Create, Read, Update.
***

---

## Module 2 : Travaux de la Commission d'Ouverture et de Jugement (COJO)

Ce module décrit l'espace de travail sécurisé où les membres de la commission analysent les offres soumises par les OE. Il se situe chronologiquement après la clôture de la soumission des offres et avant la publication des résultats.

### Parcours Utilisateur

1.  Les membres de la commission sont notifiés et se connectent à la plateforme.
2.  Ils accèdent à un tableau de bord listant les sessions d'ouverture auxquelles ils sont conviés.
3.  Ils entrent dans l'espace de travail de la session concernée.
4.  À la date et l'heure prévues, le système déverrouille l'accès aux offres ("ouverture du coffre-fort").
5.  Les membres consultent les pièces techniques et financières de chaque soumissionnaire.
6.  Ils procèdent à l'évaluation via un formulaire structuré, en jugeant la recevabilité et la conformité de chaque pièce.
7.  Une fois l'analyse terminée, ils délibèrent et consignent le résultat final de l'attribution.
8.  La séance est officiellement clôturée dans le système, ce qui génère un procès-verbal et transmet le résultat à l'AC pour la prochaine étape (publication).

### Écrans, Champs et Interactions

#### Écran 1 : Tableau de bord du Membre de la Commission
- **Vue**: Tableau listant les sessions d'ouverture et de jugement.
- **Interaction**: Clic sur une session pour accéder à l'espace de travail.

| Champ / Colonne | Type de Donnée |
|---|---|
| Référence Appel d'Offres | String |
| Objet | String |
| Date d'ouverture | DateTime |
| Statut | String (`À venir`, `En cours`, `Clôturée`) |

#### Écran 2 : Espace de Travail de la Séance
- **Vue**: Interface principale de la commission. Affiche la liste des OE ayant soumissionné.
- **Interactions**:
    - Sélectionner un OE pour voir le détail de son offre (documents techniques, financiers).
    - Accéder au formulaire d'évaluation pour chaque OE.
    - Action de "Clôturer la séance" une fois toutes les évaluations terminées.

#### Écran 3 : Formulaire d'Évaluation des Offres
- **Vue**: Grille ou formulaire permettant de juger, critère par critère, l'offre d'un OE.
- **Champs possibles par critère**:
    - `Statut` (Dropdown : `Conforme`, `Non conforme`, `À vérifier`)
    - `Note` (Number)
    - `Avis / Commentaire` (Textarea)
- **Interaction**: "Enregistrer l'évaluation" pour chaque OE.

***
**Opérations CRUD sur les données :**
*   **Session COJO** : Read (liste), Update (changement de statut à la clôture).
*   **Offre OE** : Read.
*   **Évaluation d'Offre** : Create, Read, Update.
***

---

## Module 3 : Contractualisation du Marché (Perspective AC)

Ce module couvre le processus allant de la publication des résultats de l'appel d'offres jusqu'à la transmission du projet de marché pour validation.

### Parcours Utilisateur

1.  L'AC se connecte et navigue vers la section des attributions.
2.  L'AC publie les résultats d'une attribution finalisée.
3.  L'AC retrouve l'attribution publiée et initie la création du marché.
4.  L'AC remplit un formulaire en plusieurs étapes pour définir les détails du marché (informations générales, finances, échéancier).
5.  L'AC gère les documents contractuels, notamment la mise à jour du CCAP (Cahier des Clauses Administratives Particulières).
6.  L'AC génère une version "brouillon" de la page de garde du marché pour vérification.
7.  L'AC transmet le dossier complet à la DGMP pour validation.

### Écrans, Champs et Interactions

#### Écran 1 : Liste des Attributions en Attente de Publication
- **Vue**: Tableau listant les procédures dont les résultats peuvent être publiés.
- **Interaction**: Clic sur un bouton "Publier" pour une procédure donnée.

| Champ / Colonne | Type de Donnée |
|---|---|
| Référence Procédure | String |
| Objet | String |
| Statut | String (`Attribution en attente de publication`) |

***
**Opérations CRUD sur les données :**
*   **Attribution** : Read (liste), Update (via l'action "Publier" qui change son statut).
***

#### Écran 2 : Liste des Attributions Publiées
- **Vue**: Tableau listant les procédures dont les résultats ont été publiés.
- **Interaction**: Clic sur un bouton "Création du marché" pour initier la contractualisation.
> **Règle de gestion** : La publication des résultats est publique. Tous les OE inscrits sur la plateforme peuvent les consulter (voir Module 4, Écran 6), qu'ils aient participé ou non à la procédure.

| Champ / Colonne | Type de Donnée |
|---|---|
| Référence Procédure | String |
| Objet | String |
| Statut | String (`Attribution publiée`) |

***
**Opérations CRUD sur les données :**
*   **Attribution** : Read (liste).
*   **Marché** : Create (via l'action "Création du marché").
***

#### Écran 3 : Formulaire de Création du Marché (Multi-étapes)

##### Étape 1 : Informations Générales

| Nom du champ | Type de Donnée | Notes |
|---|---|---|
| Objet du marché | String | Pré-rempli, éditable |
| Description du marché | Textarea | |
| Taux de TVA (%) | Number | |
| Compte bancaire de l'OE | Dropdown / Select | Liste des comptes de l'OE. Inclut une action "Ajouter un nouveau compte". |
| Date d'attribution | Date Picker | |

**Popup (Formulaire) : Ajout d'un nouveau compte bancaire**

| Nom du champ | Type de Donnée | Notes |
|---|---|---|
| Libellé du compte | String | Ex: "Compte principal Biotop" |
| Pays | Dropdown / Select | |
| Banque | String | |
| Code Guichet | String | 5 chiffres |
| Numéro de compte | String | 12 chiffres |
| Clé RIB | String | 2 chiffres |

##### Étape 2 : Paramètres Financiers & Échéancier

| Nom du champ | Type de Donnée | Notes |
|---|---|---|
| Taux de retenue de garantie (%) | Number | Optionnel |
| Taux de garantie de bonne exécution (%) | Number | |
| Montant du marché | Number | |
| Source de financement | Dropdown / Select | Ex: "Trésor", "Bailleur (Don)", "Bailleur (Emprunt)" |

**Section : Liste des Échéanciers de Paiement**
- **Vue**: Tableau des échéanciers créés pour ce marché.
- **Interaction**: Bouton "Ajouter un nouvel échéancier".

| Champ / Colonne | Type de Donnée | Notes |
|---|---|---|
| Exercice budgétaire | String (Année) | Ex: 2025, 2026 |
| Montant | Number | |
| Actions | Buttons | "Financer", "Détails", "Modifier" |

**Popup (Formulaire) : Création/Modification d'un Échéancier**

| Nom du champ | Type de Donnée |
|---|---|
| Exercice budgétaire | Dropdown / Select (Années) |
| Montant | Number |

##### Étape 3 : Financement de l'Échéancier
- **Vue**: Accessible depuis la liste des échéanciers. Permet de lier un échéancier à une ou plusieurs lignes budgétaires.
> **Règle de gestion** : Le système doit bloquer toute tentative d'imputer un montant sur une ligne budgétaire si la source de financement de cette ligne (Trésor, Don, Emprunt) ne correspond pas à celle déclarée pour le marché.

| Nom du champ | Type de Donnée | Notes |
|---|---|---|
| Ligne budgétaire | Dropdown / Select | Pré-filtrée depuis la planification. |
| Montant à imputer | Number | Le système doit valider que le montant imputé ne dépasse pas le disponible sur la ligne. |

> **Règle de gestion (Action critique)** : La **réservation des crédits** est une action bloquante et obligatoire après le financement. Sans cette réservation validée, le processus de paiement du marché ne pourra pas être enclenché.

***
**Opérations CRUD sur les données :**
*   **Marché** : Create.
*   **Compte Bancaire (OE)** : Create, Read (dans la liste déroulante).
*   **Échéancier** : Create, Read (liste), Update (via l'action "Financer").
***

#### Écran 4 : Gestion des Documents du Marché
- **Vue**: Liste des documents liés au marché.
- **Interactions**:
    - "Joindre un document" (upload de fichier).
    - "Modification du CCAP".
    - "Génération brouillon de la page de garde".

> **Règles de gestion liées à la contractualisation** :
> 1.  **Format de numérotation** : La numérotation des marchés suit une codification stricte qui inclut année, rang (0 pour marché initial), type, mode, nature, séquentiel, type structure et ministère.
> 2.  **Plafonnement des avenants** : Le montant cumulé des avenants ne peut excéder 30% du marché initial. Le rang (1, 2, 3...) de l'avenant est incrémenté dans le numéro du marché pour assurer la traçabilité.

| Document | Origine | Actions possibles |
|---|---|---|
| Projet de marché | Upload par l'AC | Supprimer |
| CCAP | Auto-généré | Modifier, Visualiser (PDF) |
| Page de Garde | Auto-généré | Visualiser (PDF) |

***
**Opérations CRUD sur les données :**
*   **Document (Projet de marché)** : Create (Upload), Read, Delete.
*   **Document (CCAP / Page de Garde)** : Read, Update (implicite via les actions de modification et de génération).
***

#### Écran 5 : Formulaire de Modification du CCAP
- **Vue**: Formulaire pré-rempli avec les données du DAO, permettant de compléter les informations désormais disponibles.

| Nom du champ | Type de Donnée | Notes |
|---|---|---|
| Autorité Contractante | String | Doit être pré-rempli automatiquement. |
| Montant final du marché | Number | Champ qui n'était pas connu au stade du DAO. |
| Prix (fermes ou révisables) | Radio Button (Oui/Non) | |
| Modalité de révision des prix | Textarea | Conditionnel à la réponse précédente. |
| Pièces constitutives du marché | Textarea / Liste | |

***
**Opérations CRUD sur les données :**
*   **Marché (détails du CCAP)** : Update.
***

---

## Module 4 : Circuit de Validation du Marché (Perspective DGMP)

Ce module décrit le workflow d'approbation du projet de marché par les différents niveaux hiérarchiques de la DGMP.

### Parcours Utilisateur

1.  Le Chef de Service (DGMP) reçoit une notification et voit le dossier "à affecter".
2.  Il affecte le dossier à un Chargé d'études.
3.  Le Chargé d'études instruit le dossier, ajoute des documents internes et le transmet à son supérieur (Sous-Directeur).
4.  Le dossier remonte la chaîne hiérarchique (Sous-Directeur -> Directeur -> Directeur Général).
5.  Le Directeur Général prend la décision finale : Valider, Renvoyer (à l'AC ou à un niveau inférieur) ou Suspendre.

### États du Marché

- `Brouillon` (chez l'AC avant transmission)
- `Contrôle en cours` (dossier chez la DGMP)
- `Validé` (par le DG)
- `Signature en cours`
- `Marché approuvé`
- `Marché démarré`
- `Suspendu` / `Renvoyé`

### Écrans, Champs et Interactions

#### Écran 1 : Tableau de Bord DGMP - Dossiers à affecter
- **Acteur**: Chef de Service.
- **Vue**: Tableau des marchés en attente d'assignation.
- **Interaction**: Sélectionner un marché, sélectionner un "Chargé d'études" dans une liste et cliquer sur "Affecter".

#### Écran 2 : Vue détaillée du dossier Marché
- **Acteurs**: Tous les intervenants de la DGMP.
- **Vue**: Interface de consultation de toutes les informations et documents du marché.
- **Interactions**:
    - Visualiser tous les documents.
    - "Ajouter un document interne" (ex: justification).
    - "Transmettre au N+1".
    - "Renvoyer au N-1".

#### Écran 3 : Interface de Décision Finale
- **Acteur**: Directeur Général.
- **Vue**: Vue détaillée du dossier avec des boutons d'action spécifiques.
- **Interactions**:
    - Bouton "Valider le marché".
    - Bouton "Renvoyer à l'autorité contractante".
    - Bouton "Renvoyer au chargé d'études".
    - Bouton "Suspendre le marché".

---

## Module 5 : Finalisation et Démarrage du Marché (Perspective AC)

Après validation de la DGMP, ce module couvre les dernières étapes avant le début de l'exécution.

### Parcours Utilisateur

1.  L'AC reçoit le marché validé (statut `Signature en cours`).
2.  L'AC fait signer le marché par l'attributaire (OE) et par sa propre structure.
3.  L'AC renseigne les dates de signature dans le système.
4.  L'AC confirme que la garantie de bonne exécution a été déposée par l'OE.
5.  L'AC émet l'Ordre de Service (OS) de démarrage en précisant les dates clés.
6.  L'AC confirme la réception de l'accusé de réception de l'OS par l'OE. Le marché passe au statut `Marché démarré`.

### Écrans, Champs et Interactions

#### Écran 1 : Formulaire de Confirmation des Signatures
- **Vue**: Formulaire pour enregistrer les dates post-validation.
> **Règle de gestion** : Le processus de signature du marché par les parties (AC, OE) est actuellement déclaratif dans le système. Il n'intègre pas de mécanisme de signature électronique certifiée.

| Nom du champ | Type de Donnée |
|---|---|
| Date de signature Autorité Contractante | Date Picker |
| Date de signature Attributaire | Date Picker |

#### Écran 2 : Formulaire d'Émission de l'Ordre de Service de Démarrage
- **Interaction**: Accessible après confirmation de la garantie de bonne exécution, se présente sous forme de formulaire.

| Nom du champ | Type de Donnée |
|---|---|
| Date de début d'exécution | Date Picker |
| Date de fin d'exécution | Date Picker |

---

## Module 6 : Portail Opérateur Économique (Perspective OE)

Cet espace est dédié aux entreprises pour interagir avec la plateforme SIGOMAP.

### Parcours Utilisateur

1.  L'OE se connecte via une authentification (OTP mentionné).
2.  L'OE consulte les plans de passation de marchés et les avis d'appel d'offres (AAO).
3.  L'OE exprime son intérêt pour un AAO, ce qui peut nécessiter l'acquisition payante du dossier.
4.  Si le dossier est payant, l'OE est redirigé vers une plateforme de paiement (Carte Bancaire, Orange Money).
5.  Une fois l'intérêt confirmé, l'OE peut déposer ses offres (technique, financière) et poser des questions (demande d'éclaircissement).
6.  L'OE peut consulter les résultats des attributions.
7.  L'OE peut consulter la liste de ses propres marchés (`Mes marchés`).
8.  L'OE peut gérer les utilisateurs de son entreprise ayant accès à la plateforme.

### Écrans, Champs et Interactions

#### Écran 1 : Tableau de Bord
- **Vue**: Page d'accueil avec des tuiles ou un menu pour accéder aux 6 modules principaux (`Opérations`, `Avis d'Appel d'Offres`, `Invitation restreint`, `Opérations en cours`, `Mes marchés`, `Mes utilisateurs`).

#### Écran 2 : Liste des Avis d'Appel d'Offre
- **Vue**: Tableau de tous les AAO publiés. Filtres possibles.

| Champ / Colonne | Type de Donnée |
|---|---|
| Référence | String |
| Objet | String |
| Autorité Contractante | String |
| Montant de l'achat du dossier | Number / String | "Gratuit" ou un montant |

#### Écran 3 : Détail d'un Avis d'Appel d'Offre
- **Vue**: Page complète avec toutes les informations de l'AAO. Les interactions "Poser une question" et "Déposer une offre" ouvrent des formulaires dédiés.
- **Interactions**:
    - "Télécharger le dossier" (si gratuit).
    - "Acquérir le dossier" (si payant, redirige vers paiement).
    - "Confirmer l'intérêt" (après acquisition).
    - "Poser une question / Demande d'éclaircissement".
    - "Déposer une offre" (après confirmation de l'intérêt).
> **Règles de gestion clés pour l'OE** :
> 1.  **Acquisition de dossier** : Si un dossier d'appel d'offres (DAO) est payant, l'acquisition est une étape obligatoire avant de pouvoir soumissionner.
> 2.  **Coffre-fort numérique** : Les offres soumises sont inaccessibles à quiconque avant la date et l'heure exactes de l'ouverture de la séance.
> 3.  **Modification d'offre avant clôture** : Un OE peut librement retirer et remplacer les documents de son offre jusqu'à la date et l'heure de clôture. Passé ce délai, toute modification est impossible.
> 4.  **Transparence des échanges** : Toute question posée à l'AC, ainsi que la réponse, sont visibles par tous les autres OE ayant manifesté un intérêt pour ce même appel d'offres.

#### Écran 4 : Plateforme de Paiement (Intégration)
- **Vue**: Interface pour le paiement en ligne.

| Méthode | Champs Requis |
|---|---|
| **Carte Bancaire** | Nom sur la carte (String), Numéro de carte (String), Date d'expiration (Date), Code de sécurité CVV (String) |
| **Orange Money** | Numéro de téléphone (String), Code OTP reçu (String) |

#### Écran 5 : Mes Marchés
- **Vue**: Tableau listant tous les marchés remportés par l'OE.

| Champ / Colonne | Type de Donnée |
|---|---|
| Numéro du Marché | String |
| Objet | String |
| Autorité Contractante | String |
| Montant | Number |
| Statut | String (`Approuvé`, `Démarré`, `En exécution`, etc.) |

***
**Opérations CRUD sur les données :**
*   **Marché (de l'OE)** : Read (liste).
***

#### Écran 6 : Résultats des Appels d'Offres
- **Vue**: Tableau public de toutes les attributions finalisées sur la plateforme.
> **Règle de gestion** : La consultation des résultats est publique. Tous les OE inscrits peuvent voir les attributions, même s'ils n'ont pas participé à la procédure.

| Champ / Colonne | Type de Donnée |
|---|---|
| Référence | String |
| Objet | String |
| Autorité Contractante | String |
| Attributaire | String |
| Montant de l'attribution | Number |

***
**Opérations CRUD sur les données :**
*   **Attribution** : Read (liste publique).
***

#### Écran 7 : Gestion des Utilisateurs (Module "Mes Utilisateurs")
- **Vue** : Interface (tableau et formulaires) permettant à l'administrateur de l'OE de gérer les accès à la plateforme.
- **Interactions** : "Ajouter un utilisateur" (ouvre un formulaire), "Modifier" (ouvre un formulaire pré-rempli), "Supprimer/Désactiver un utilisateur".

***
**Opérations CRUD sur les données :**
*   **Utilisateur (de l'OE)** : Create, Read (liste), Update, Delete.
***

---

## Prochaines Étapes et Actions à Entreprendre

Ce document d'analyse fonctionnelle sert de fondation pour les phases suivantes du projet. Les actions recommandées sont :

1.  **Validation** : Faire valider ce document par l'ensemble des parties prenantes (métier et technique) pour s'assurer qu'il reflète fidèlement les besoins et les processus cibles.
2.  **Prototypage (UI/UX)** : Lancer la phase de conception des interfaces utilisateur et de l'expérience utilisateur (maquettes et prototypes interactifs) en se basant sur les écrans et parcours décrits ici.
3.  **Spécifications Techniques** : Rédiger le document d'architecture et les spécifications techniques détaillées (modèle de données, choix technologiques, API...).
4.  **Planification du Développement** : Découper le projet en lots fonctionnels ou en sprints (méthode Agile) et établir un planning de réalisation.

---

## Annexe : Suggestions d'Amélioration Stratégique (Points de douleur identifiés)

Cette section capitalise sur les retours d'expérience partagés durant la session.

1.  **Prévention des erreurs de validation (Workflow)**:
    - **Problème**: Un valideur (ex: Chef de Service) peut cliquer sur "Valider" par erreur alors qu'il souhaitait "Renvoyer". L'action est irréversible et bloque le processus.
    - **Proposition**: Mettre en place une **modale de confirmation** qui s'affiche avant toute action à fort impact. Cette modale doit résumer l'action et demander une confirmation explicite (ex: "Vous êtes sur le point de REJETER ce dossier. Confirmer ?").
    - **Proposition (Alternative)**: Prévoir une fonction "Annuler la dernière action" disponible pendant un temps limité (ex: 5 minutes) ou un mécanisme de "retour en arrière" pour les administrateurs.

2.  **Simplification de la Soumission pour les OE** :
    - **Problème**: Les OE chargent des documents qui peuvent être erronés, illisibles ou corrompus (ex: CNI au lieu de l'offre). L'analyse par la COJO est lourde.
    - **Proposition**: Remplacer le maximum de documents à charger par des formulaires structurés.
        - L'AC définit les critères d'évaluation sous forme de champs (texte, nombre, oui/non, date, etc.).
        - L'OE remplit directement ces champs dans son interface de soumission.
        - Le chargement de fichier reste possible mais uniquement pour des pièces justificatives spécifiques (ex: "Joindre le certificat de conformité").
    - **Bénéfice**: Moins d'erreurs, analyse semi-automatisée pour la COJO (qui n'a qu'à valider des réponses et non déchiffrer des documents), et traçabilité accrue.

3.  **Automatisation et Pré-remplissage** :
    - **Problème**: Des informations sont saisies plusieurs fois à différentes étapes (ex: nom de l'AC dans le CCAP, recherche manuelle de la Cellule de Passation).
    - **Proposition**: Le système doit réutiliser au maximum les données déjà saisies.
        - **Constitution de la commission**: Le système doit pré-remplir la composition (fonctions et structures) en se basant sur le profil de l'Autorité Contractante. L'utilisateur ne fait que valider ou ajuster.
        - **Imputation budgétaire**: Dans le DAO, seules les lignes budgétaires définies au niveau de l'opération parente doivent être proposées.

4.  **Amélioration des Notifications** :
    - **Problème**: L'invitation à une consultation restreinte ne génère pas de notification claire (email ou dans l'app).
    - **Proposition**: Mettre en place un système de notifications robuste pour tous les événements importants : invitation, réception d'une réponse à une question, changement de statut d'une offre, etc.

5.  **Flexibilité des Procédures Dérogatoires** :
    - **Problème**: Une demande de procédure dérogatoire (ex: gré à gré) bloque l'opération jusqu'à son traitement final (validation ou rejet). Il est impossible de demander des pièces complémentaires ou de lancer plusieurs demandes en parallèle.
    - **Proposition**:
        - Introduire un statut "En attente de complément" qui permet à la DGMP de renvoyer une demande à l'AC pour ajout de documents, sans la rejeter définitivement.
        - Permettre à une même opération d'être l'objet de plusieurs demandes d'autorisation simultanées (ex: une demande d'anticipation et une demande de composition spéciale de la commission).
        - Permettre de cocher plusieurs types de demandes dans un même formulaire pour regrouper les sollicitations.

6.  **Gestion des Pièces du Dossier (DAO)**:
    - **Problème**: Redondance et risque d'incohérence quand l'utilisateur peut à la fois saisir des informations (qui génèrent un document) et uploader sa propre version de ce même document.
    - **Proposition**: Clarifier les responsabilités. Le système génère les documents standards (CCAP, DPAO...) à partir des formulaires saisis. L'upload doit être réservé aux pièces que le système ne peut pas structurer (plans, CCTP, BPU...). Le système doit interdire l'upload d'un document qu'il génère déjà.
