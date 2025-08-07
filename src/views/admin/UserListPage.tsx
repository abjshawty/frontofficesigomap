// src/views/admin/UserListPage.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Download, Eye, ArrowLeft, RefreshCw, XCircle, CheckCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Label } from "../../components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

interface Fonction {
  id: string;
  reference: string;
  libelle: string;
  statut: "Active" | "Inactive";
  dateDebut: string;
  dateFin?: string;
}

interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  statut: "Actif" | "Inactif";
  derniereConnexion: string;
  nombreFonctions: number;
  fonctions: Fonction[];
}

const mockUsers: User[] = [
  {
    id: "1",
    nom: "Doe",
    prenom: "John",
    email: "john.doe@example.com",
    statut: "Actif",
    derniereConnexion: "2024-01-15T10:30:00",
    nombreFonctions: 3,
    fonctions: [
      {
        id: "1",
        reference: "FUNC-001",
        libelle: "Administrateur système",
        statut: "Active",
        dateDebut: "2024-01-01",
        dateFin: undefined
      },
      {
        id: "2",
        reference: "FUNC-002",
        libelle: "Gestionnaire utilisateurs",
        statut: "Active",
        dateDebut: "2024-01-15",
        dateFin: undefined
      },
      {
        id: "3",
        reference: "FUNC-003",
        libelle: "Modérateur contenu",
        statut: "Inactive",
        dateDebut: "2024-01-10",
        dateFin: "2024-01-20"
      }
    ]
  },
  {
    id: "2",
    nom: "Smith",
    prenom: "Jane",
    email: "jane.smith@example.com",
    statut: "Actif",
    derniereConnexion: "2024-01-14T15:45:00",
    nombreFonctions: 2,
    fonctions: [
      {
        id: "4",
        reference: "FUNC-004",
        libelle: "Utilisateur standard",
        statut: "Active",
        dateDebut: "2024-01-01",
        dateFin: undefined
      },
      {
        id: "5",
        reference: "FUNC-005",
        libelle: "Lecteur rapports",
        statut: "Active",
        dateDebut: "2024-01-10",
        dateFin: undefined
      }
    ]
  },
  {
    id: "3",
    nom: "Johnson",
    prenom: "Bob",
    email: "bob.johnson@example.com",
    statut: "Inactif",
    derniereConnexion: "2024-01-10T09:20:00",
    nombreFonctions: 1,
    fonctions: [
      {
        id: "6",
        reference: "FUNC-006",
        libelle: "Utilisateur temporaire",
        statut: "Inactive",
        dateDebut: "2024-01-01",
        dateFin: "2024-01-15"
      }
    ]
  },
];

const fonctionsDisponibles = [
  { id: "1", libelle: "Administrateur système" },
  { id: "2", libelle: "Gestionnaire utilisateurs" },
  { id: "3", libelle: "Modérateur contenu" },
  { id: "4", libelle: "Utilisateur standard" },
  { id: "5", libelle: "Lecteur rapports" },
  { id: "6", libelle: "Utilisateur temporaire" },
];

const UserListPage = () => {
  const [utilisateurs] = useState<User[]>(mockUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<string>('list');

  return (
    <div className="min-h-screen bg-background">
      {/* Header avec navigation */}
      <header className="h-16 bg-light-gray-1 border-b border-border flex items-center justify-between px-6 header">
        <div className="flex items-center gap-4">
          <Link 
            to="/dashboard"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Retour au tableau de bord</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Exporter
          </Button>
        </div>
      </header>

    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {currentView === 'list' ? (
          <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestion des utilisateurs</h1>
        <Link
          to="/admin/users/create"
          className="inline-flex items-center px-4 py-2 bg-primary text-white border border-transparent rounded-md text-sm font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Ajouter un utilisateur
        </Link>
      </div>

            <Card>
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-4">
                <Select defaultValue="10">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">Afficher 10</SelectItem>
                    <SelectItem value="25">Afficher 25</SelectItem>
                    <SelectItem value="50">Afficher 50</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="sm">
                  Choix des colonnes
                </Button>
                
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Excel
                </Button>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Rechercher un utilisateur..." className="pl-10 w-64" />
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>NOM</TableHead>
                  <TableHead>PRÉNOM</TableHead>
                  <TableHead>EMAIL</TableHead>
                  <TableHead>STATUT</TableHead>
                  <TableHead>DATE DE DERNIÈRE CONNEXION</TableHead>
                  <TableHead>NOMBRE DE FONCTIONS</TableHead>
                  <TableHead>ACCÈS AUX DÉTAILS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {utilisateurs.map((utilisateur) => (
                  <TableRow key={utilisateur.id}>
                    <TableCell className="font-medium">{utilisateur.nom}</TableCell>
                    <TableCell>{utilisateur.prenom}</TableCell>
                    <TableCell>{utilisateur.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          utilisateur.statut === 'Actif' ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                        <span className={`text-sm ${
                          utilisateur.statut === 'Actif' ? 'text-green-700' : 'text-red-700'
                        }`}>
                          Utilisateur {utilisateur.statut.toLowerCase()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(utilisateur.derniereConnexion).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{utilisateur.nombreFonctions}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedUser(utilisateur);
                          setCurrentView('detail-user');
                        }}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Voir détails
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                          </TableBody>
          </Table>
        </CardContent>
      </Card>
          </>
        ) : currentView === 'detail-user' && selectedUser ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setCurrentView('list')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à la liste
              </Button>
              <h2 className="text-xl font-bold text-gray-900">
                Détail de l'utilisateur
              </h2>
              <Button variant="outline" className="ml-auto">
                <RefreshCw className="w-4 h-4 mr-2" />
                Réinitialiser le mot de passe
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Informations clés */}
                <Card>
                  <CardHeader>
                    <CardTitle>INFORMATIONS CLÉS</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Nom</p>
                        <p className="font-medium">{selectedUser.nom}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Prénom</p>
                        <p className="font-medium">{selectedUser.prenom}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{selectedUser.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Statut</p>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            selectedUser.statut === 'Actif' ? 'bg-green-500' : 'bg-red-500'
                          }`}></div>
                          <span className={`text-sm ${
                            selectedUser.statut === 'Actif' ? 'text-green-700' : 'text-red-700'
                          }`}>
                            {selectedUser.statut}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Nouvelle fonction */}
                <Card>
                  <CardHeader>
                    <CardTitle>Nouvelle fonction</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Label htmlFor="fonction">Fonction *</Label>
                        <Select>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Sélectionner une fonction" />
                          </SelectTrigger>
                          <SelectContent>
                            {fonctionsDisponibles.map((fonction) => (
                              <SelectItem key={fonction.id} value={fonction.id}>
                                {fonction.libelle}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-end">
                        <Button className="bg-primary hover:bg-primary/90">
                          Confirmer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Liste des fonctions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Liste des fonctions de cet utilisateur</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between p-4 border-b">
                      <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Export Excel
                        </Button>
                      </div>
                      
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input placeholder="Rechercher..." className="pl-10 w-48" />
                      </div>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>RÉFÉRENCE</TableHead>
                          <TableHead>LIBELLÉ</TableHead>
                          <TableHead>STATUT</TableHead>
                          <TableHead>DATE DÉBUT</TableHead>
                          <TableHead>DATE DE FIN</TableHead>
                          <TableHead>ACCÈS AUX DÉTAILS</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedUser.fonctions.map((fonction: any) => (
                          <TableRow key={fonction.id}>
                            <TableCell className="font-mono text-sm">{fonction.reference}</TableCell>
                            <TableCell>{fonction.libelle}</TableCell>
                            <TableCell>
                              <Badge className={
                                fonction.statut === 'Active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }>
                                {fonction.statut}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              {new Date(fonction.dateDebut).toLocaleDateString('fr-FR')}
                            </TableCell>
                            <TableCell className="text-sm">
                              {fonction.dateFin ? 
                                new Date(fonction.dateFin).toLocaleDateString('fr-FR') : 
                                '-'
                              }
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Désactiver la fonction
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              {/* Panel latéral */}
              <div>
                <Card className="sticky top-8">
                  <CardHeader>
                    <CardTitle className="text-lg">Actions rapides</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Réinitialiser le mot de passe
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className={`w-full ${
                        selectedUser.statut === 'Actif' 
                          ? 'text-red-600 border-red-200 hover:bg-red-50' 
                          : 'text-green-600 border-green-200 hover:bg-green-50'
                      }`}
                    >
                      {selectedUser.statut === 'Actif' ? (
                        <>
                          <XCircle className="w-4 h-4 mr-2" />
                          Désactiver l'utilisateur
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Activer l'utilisateur
                        </>
                      )}
                    </Button>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium text-gray-900 mb-3">Statistiques</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Fonctions actives:</span>
                          <span className="font-medium">{selectedUser.fonctions.filter((f: any) => f.statut === 'Active').length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Dernière connexion:</span>
                          <span className="font-medium">
                            {new Date(selectedUser.derniereConnexion).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
        </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserListPage; 