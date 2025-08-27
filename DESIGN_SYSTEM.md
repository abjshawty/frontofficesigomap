# Design System SIGOMAP v1.0

Bienvenue dans la documentation du Design System de SIGOMAP. Ce guide a pour but de fournir aux développeurs tout ce dont ils ont besoin pour construire des interfaces utilisateur cohérentes, accessibles et modernes pour l'application SIGOMAP.

## Principes Fondamentaux

- **Modularité** : Chaque composant est conçu pour être autonome et réutilisable.
- **Accessibilité** : Nous suivons les meilleures pratiques (ARIA, navigation clavier) pour garantir une expérience utilisateur inclusive.
- **Cohérence** : Les Design Tokens (couleurs, typographie, espacements) sont la source de vérité unique pour garantir une identité visuelle unifiée.

---

## Section 1 : Design Tokens

Les tokens sont gérés via `tailwind.config.js`.

### Couleurs

Notre palette de couleurs personnalisée est directement intégrée dans Tailwind. Utilisez les classes `bg-sigomap-*`, `text-sigomap-*`, `border-sigomap-*`.

- `sigomap-vert`: `#059669` (Principal, succès)
- `sigomap-vert-dark`: `#047857`
- `sigomap-bleu`: `#2563eb` (Information)
- `sigomap-bleu-dark`: `#1d4ed8`
- `sigomap-orange`: `#f97316` (Actions primaires, avertissements)
- `sigomap-orange-dark`: `#ea580c`
- `sigomap-gris`: `#6b7280` (Texte secondaire)
- `sigomap-gris-light`: `#e5e7eb` (Bordures, fonds)
- `sigomap-gris-dark`: `#374151` (Texte principal)
- `sigomap-blanc`: `#ffffff`
- `sigomap-bg-primary`: `#ffffff` (Fond principal)
- `sigomap-bg-secondary`: `#f9fafb` (Fond alternatif)

### Typographie

La police par défaut est **Inter**. Les tailles de police sont gérées par les classes standard de Tailwind (`text-xs`, `text-sm`, `text-base`, etc.).

### Espacements et Rayons

Utilisez les classes d'espacement (`p-`, `m-`, `gap-`) et de rayon (`rounded-md`, `rounded-lg`) de Tailwind, qui sont configurées pour être cohérentes.

---

## Section 2 : Composants

Voici la liste des composants React disponibles.

### 1. Avatar

**Rôle** : Affiche une image d'avatar ou un fallback.

**Usage** :
```jsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";

<Avatar>
  <AvatarImage src="https://path/to/image.jpg" alt="Nom de l'utilisateur" />
  <AvatarFallback>NU</AvatarFallback>
</Avatar>
```

---

### 2. Badge

**Rôle** : Affiche un statut, un rôle ou une catégorie.

**Variantes** (`variant`):
- `actif`, `inactif`, `en-attente` (pour les statuts)
- `user`, `admin`, `super_admin` (pour les rôles)
- `default`, `secondary`, `destructive`, `outline`

**Usage** :
```jsx
import { Badge } from "@/components/ui/Badge";

<Badge variant="actif">Actif</Badge>
<Badge variant="super_admin">Super Admin</Badge>
```

---

### 3. Button

**Rôle** : Déclenche une action.

**Variantes** :
- `variant`: `default` (orange), `destructive`, `outline`, `secondary`, `ghost`, `link`.
- `size`: `default`, `sm`, `lg`, `icon`.

**Usage** :
```jsx
import { Button } from "@/components/ui/Button";
import { Mail } from "lucide-react";

// Bouton par défaut
<Button>Connexion</Button>

// Bouton avec icône
<Button variant="outline" size="icon">
  <Mail className="h-4 w-4" />
</Button>
```

---

### 4. Card

**Rôle** : Conteneur pour grouper des informations liées.

**Usage** :
```jsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/Card";

<Card>
  <CardHeader>
    <CardTitle>Total des utilisateurs</CardTitle>
    <CardDescription>3 utilisateurs enregistrés</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Contenu principal de la carte.</p>
  </CardContent>
  <CardFooter>
    <Button>Voir les détails</Button>
  </CardFooter>
</Card>
```

---

### 5. DataTable

**Rôle** : Affiche des données complexes sous forme de tableau avec tri, pagination et filtrage.

**Usage** : Ce composant nécessite une définition de colonnes et un tableau de données.

```jsx
// 1. Définir les colonnes
import { ColumnDef } from "@tanstack/react-table";
// ... (voir l'exemple de page ci-dessous pour une implémentation complète)

// 2. Utiliser le composant
import { DataTable } from "@/components/ui/DataTable";

<DataTable columns={columns} data={data} />
```

---

### 6. DropdownMenu

**Rôle** : Affiche un menu d'options contextuelles.

**Usage** :
```jsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui/Button";

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost">Ouvrir</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Modifier</DropdownMenuItem>
    <DropdownMenuItem>Supprimer</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

### 7. Input

**Rôle** : Champ de saisie standard.

**Usage** :
```jsx
import { Input } from "@/components/ui/Input";

<Input type="email" placeholder="Email" />
```

---

### 8. Select

**Rôle** : Permet de choisir une option dans une liste.

**Usage** :
```jsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Sélectionner un rôle" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="user">User</SelectItem>
    <SelectItem value="admin">Admin</SelectItem>
  </SelectContent>
</Select>
```

---
*Fin de la documentation v1.0*
