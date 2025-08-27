# SIGOMAP - Système Intégré de Gestion des Opérations des Marchés Publics

Ce dépôt contient le code source du front-office de l'application SIGOMAP, une plateforme complète conçue pour dématérialiser et optimiser l'ensemble du processus de passation des marchés publics en Côte d'Ivoire.

## 🎯 Objectif du projet

SIGOMAP vise à moderniser la commande publique en offrant une solution intégrée, transparente et efficace pour les trois principaux acteurs du processus :

-   **Autorités Contractantes (AC)** : Pour la planification, la création des dossiers, le suivi des procédures et la contractualisation.
-   **Direction Générale des Marchés Publics (DGMP)** : Pour le contrôle, la validation et la régulation des procédures.
-   **Opérateurs Économiques (OE)** : Pour la consultation des offres, la soumission en ligne et le suivi de leurs marchés.

---

## ✨ Fonctionnalités Principales

L'application s'articule autour de plusieurs modules fonctionnels clés pour couvrir l'intégralité du cycle de vie d'un marché public :

-   **📈 Planification et Préparation** : Création des plans de passation annuels, paramétrage des opérations et workflows de validation.
-   **📑 Gestion des Dossiers** : Constitution des Dossiers d'Appel d'Offres (DAO) et gestion des procédures dérogatoires.
-   **⚖️ Évaluation des Offres** : Espace de travail sécurisé pour la Commission d'Ouverture et de Jugement des Offres (COJO).
-   **✍️ Contractualisation** : De la publication des résultats à la génération du projet de marché et sa validation.
-   **🚀 Portail Entreprise** : Espace dédié aux opérateurs économiques pour consulter, soumissionner et gérer leurs dossiers.
-   **✅ Circuits de Validation** : Workflows de validation hiérarchiques entièrement paramétrables au sein de la DGMP.

---

## 🛠️ Stack Technique

Ce projet est construit avec des technologies modernes, orientées performance et maintenabilité :

-   **Framework** : [Next.js](https://nextjs.org/) 14 (React 18)
-   **Langage** : [TypeScript](https://www.typescriptlang.org/)
-   **Styling** : [Tailwind CSS](https://tailwindcss.com/)
-   **Composants UI** : [Shadcn/ui](https://ui.shadcn.com/) basé sur Radix UI
-   **Icônes** : [Lucide React](https://lucide.dev/)
-   **Utilitaires** : `clsx` & `tailwind-merge` pour la gestion des classes CSS

---

## 🚀 Démarrage Rapide

Pour lancer le projet en local, suivez ces étapes :

1.  **Cloner le dépôt :**
    ```bash
    git clone https://github.com/abjshawty/frontofficesigomap.git
    cd frontofficesigomap
    ```

2.  **Installer les dépendances :**
    ```bash
    npm install
    ```

3.  **Lancer le serveur de développement :**
    ```bash
    npm run dev
    ```


### Commandes disponibles

-   `npm run dev`: Lance l'application en mode développement.
-   `npm run build`: Compile l'application pour la production.
-   `npm run start`: Démarre un serveur de production.
-   `npm run lint`: Lance l'analyse statique du code avec ESLint.

---

## 📁 Structure du Projet

La structure des fichiers est organisée pour favoriser la modularité et la scalabilité :

```
.
├── app/                  # Routage principal avec Next.js App Router
│   ├── (module)/         # Dossiers pour chaque module fonctionnel
│   │   └── page.tsx      # Pages et vues
│   ├── layout.tsx        # Layout principal de l'application
│   └── globals.css       # Styles globaux
├── src/
│   ├── components/       # Composants React réutilisables
│   │   ├── ui/           # Composants UI de base (boutons, cartes, etc.)
│   │   └── (feature)/    # Composants spécifiques à une fonctionnalité
│   ├── lib/              # Fonctions utilitaires
│   └── types/            # Définitions de types TypeScript
├── public/               # Fichiers statiques (images, logos)
└── ...                   # Fichiers de configuration (Next.js, Tailwind, etc.)
```


