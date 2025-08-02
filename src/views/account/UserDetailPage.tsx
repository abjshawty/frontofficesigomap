import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Label } from '../../components/ui/label';

import { 
  ArrowLeft, 
  RefreshCw, 
  Search, 
  Download, 
  XCircle, 
  CheckCircle 
} from 'lucide-react';

interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  statut: 'Actif' | 'Inactif';
  dateCreation: string;
  derniereConnexion: string;
  fonctions: Array<{
    id: string;
    reference: string;
    libelle: string;
    statut: 'Active' | 'Inactive';
    dateDebut: string;
    dateFin?: string;
  }>;
}

const UserDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();

  // Données simulées
  const users: User[] = [
    {
      id: '1',
      nom: 'Koné',
      prenom: 'Fatou',
      email: 'fatou.kone@entreprise.ci',
      statut: 'Actif',
      dateCreation: '2024-01-15',
      derniereConnexion: '2024-07-29 14:30',
      fonctions: [
        {
          id: '1',
          reference: 'FUNC-001',
          libelle: 'Soumissionnaire',
          statut: 'Active',
          dateDebut: '2024-01-15'
        },
        {
          id: '2',
          reference: 'FUNC-002',
          libelle: 'Consultant',
          statut: 'Active',
          dateDebut: '2024-02-01'
        }
      ]
    },
    {
      id: '2',
      nom: 'Traoré',
      prenom: 'Moussa',
      email: 'moussa.traore@entreprise.ci',
      statut: 'Actif',
      dateCreation: '2024-02-20',
      derniereConnexion: '2024-07-28 09:15',
      fonctions: [
        {
          id: '3',
          reference: 'FUNC-003',
          libelle: 'Expert',
          statut: 'Active',
          dateDebut: '2024-02-20'
        }
      ]
    },
    {
      id: '3',
      nom: 'Ouattara',
      prenom: 'Aminata',
      email: 'aminata.ouattara@entreprise.ci',
      statut: 'Inactif',
      dateCreation: '2024-03-10',
      derniereConnexion: '2024-07-20 16:45',
      fonctions: []
    }
  ];

  const selectedUser = users.find(user => user.id === userId);

  const fonctionsDisponibles = [
    { id: '1', libelle: 'Soumissionnaire' },
    { id: '2', libelle: 'Consultant' },
    { id: '3', libelle: 'Expert' },
    { id: '4', libelle: 'Administrateur' }
  ];

  if (!selectedUser) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Utilisateur non trouvé</h2>
          <Link to="/account/users">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à la liste
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header avec navigation */}
      <header className="h-16 bg-light-gray-1 border-b border-border flex items-center justify-between px-6 header">
        <div className="flex items-center gap-4">
          <Link 
            to="/account/users"
            className="flex items-center gap-3 hover:bg-green-pastel/50 p-2 rounded-lg transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Retour à la liste</span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-lg font-bold text-primary-foreground">S</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">SIGOMAP.GOUV.CI</h1>
            <p className="text-xs text-muted-foreground">Détail utilisateur</p>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/account/users')}
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
                                               <select className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" aria-label="Sélectionner une fonction">
                         <option value="">Sélectionner une fonction</option>
                         {fonctionsDisponibles.map((fonction) => (
                           <option key={fonction.id} value={fonction.id}>
                             {fonction.libelle}
                           </option>
                         ))}
                       </select>
                     </div>
                    <div className="flex items-end">
                      <Button className="bg-green-600 hover:bg-green-700">
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

                                                        <div className="overflow-x-auto">
                     <table className="min-w-[800px] w-full border-collapse">
                       <thead>
                         <tr className="border-b">
                           <th className="text-left py-3 px-4 font-semibold min-w-[120px]">RÉFÉRENCE</th>
                           <th className="text-left py-3 px-4 font-semibold min-w-[150px]">LIBELLÉ</th>
                           <th className="text-left py-3 px-4 font-semibold min-w-[100px]">STATUT</th>
                           <th className="text-left py-3 px-4 font-semibold min-w-[120px]">DATE DÉBUT</th>
                           <th className="text-left py-3 px-4 font-semibold min-w-[120px]">DATE FIN</th>
                           <th className="text-left py-3 px-4 font-semibold min-w-[180px]">ACTIONS</th>
                         </tr>
                       </thead>
                       <tbody>
                         {selectedUser.fonctions.map((fonction: any) => (
                           <tr key={fonction.id} className="border-b hover:bg-gray-50">
                             <td className="py-3 px-4 font-mono text-sm">{fonction.reference}</td>
                             <td className="py-3 px-4">{fonction.libelle}</td>
                             <td className="py-3 px-4">
                               <Badge className={
                                 fonction.statut === 'Active' 
                                   ? 'bg-green-100 text-green-800' 
                                   : 'bg-red-100 text-red-800'
                               }>
                                 {fonction.statut}
                               </Badge>
                             </td>
                             <td className="py-3 px-4 text-sm">
                               {new Date(fonction.dateDebut).toLocaleDateString('fr-FR')}
                             </td>
                             <td className="py-3 px-4 text-sm">
                               {fonction.dateFin ? 
                                 new Date(fonction.dateFin).toLocaleDateString('fr-FR') : 
                                 '-'
                               }
                             </td>
                             <td className="py-3 px-4">
                               <Button 
                                 variant="outline" 
                                 size="sm"
                                 className="text-red-600 border-red-200 hover:bg-red-50"
                               >
                                 <XCircle className="w-4 h-4 mr-2" />
                                 Désactiver la fonction
                               </Button>
                             </td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   </div>
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
      </div>
    </div>
  );
};

export default UserDetailPage; 