# SIGOMAP - Système Intégré de Gestion des Opérations des Marchés Publics

## 🚀 Nouvelle Page d'Accueil

La page d'accueil a été entièrement refaite avec un design moderne et professionnel, incluant :

### ✨ Fonctionnalités principales

- **Header moderne** avec logo SIGOMAP et navigation
- **Section Hero** présentant les fonctionnalités clés
- **Guide interactif** expliquant le fonctionnement de l'espace entreprise
- **Panneau de connexion** avec mode démonstration
- **Design responsive** adapté à tous les écrans

### 🎨 Composants UI créés

- `Button` - Boutons avec variantes (default, outline, ghost, etc.)
- `Card` - Cartes avec header, content et footer
- `Input` - Champs de saisie stylisés
- `Label` - Labels pour les formulaires
- `Alert` - Alertes avec icônes

### 🎯 Fonctionnalités de la page

1. **Connexion sécurisée** avec validation des champs
2. **Mode démonstration** avec identifiants pré-remplis
3. **Récupération de mot de passe** avec formulaire dédié
4. **Navigation fluide** entre les sections
5. **Design cohérent** avec le système SIGOMAP

### 🛠️ Technologies utilisées

- **React 18** avec TypeScript
- **Tailwind CSS** pour le styling
- **Lucide React** pour les icônes
- **Class Variance Authority** pour les variantes de composants
- **Shadcn/ui** comme base pour les composants

### 📁 Structure des fichiers

```
src/
├── components/
│   └── ui/           # Composants UI réutilisables
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── alert.tsx
├── lib/
│   └── utils.ts      # Utilitaires (cn function)
└── views/
    └── auth/
        └── LoginPage.tsx  # Nouvelle page d'accueil
```

### 🎨 Variables CSS SIGOMAP

Le design system utilise des variables CSS personnalisées :
- `--green-pastel`: Couleur d'accent vert pastel
- `--light-gray-1`: Couleur de fond gris clair
- Variables de couleurs primaires, secondaires et d'accent

### 🚀 Démarrage

```bash
npm install
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### 📱 Responsive Design

La page s'adapte automatiquement aux différentes tailles d'écran :
- **Desktop** : Layout en 3 colonnes avec sidebar
- **Tablet** : Layout en 2 colonnes
- **Mobile** : Layout en 1 colonne empilé

---

**Développé avec ❤️ pour SIGOMAP - Marchés Publics de Côte d'Ivoire** 