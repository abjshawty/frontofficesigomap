import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { UsersIcon, UserPlusIcon, ShoppingCartIcon } from '../../components/icons';
import { Building2, ArrowLeft, Sparkles, Search, Filter } from 'lucide-react';

interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  statut: 'actif' | 'inactif';
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

const UserListPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [selectedColumns] = useState(['nom', 'prenom', 'email', 'statut', 'dateCreation', 'derniereConnexion']);

  // Données simulées
  const users: User[] = [
    {
      id: '1',
      nom: 'Koné',
      prenom: 'Fatou',
      email: 'fatou.kone@entreprise.ci',
      statut: 'actif',
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
      statut: 'actif',
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
      statut: 'inactif',
      dateCreation: '2024-03-10',
      derniereConnexion: '2024-07-20 16:45',
      fonctions: []
    }
  ];

  const filteredUsers = users.filter(user =>
    user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (statut: string) => {
    return statut === 'actif' 
      ? <Badge className="bg-primary/10 text-primary">Actif</Badge>
      : <Badge className="bg-gray-100 text-gray-800">Inactif</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header avec navigation */}
              <header className="h-16 bg-light-gray-1 border-b border-border flex items-center justify-between px-6 header">
        <div className="flex items-center gap-4">
          <Link 
            to="/dashboard"
            className="flex items-center gap-3 hover:bg-accent/50 p-2 rounded-lg transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Retour au dashboard</span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">SIGOMAP.GOUV.CI</h1>
            <p className="text-xs text-muted-foreground">Gestion du Compte</p>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Bandeau de titre */}
        <motion.div 
          className="bg-gradient-to-r from-accent via-accent/80 to-accent border border-border/30 rounded-2xl p-6 mb-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-chart-2/5 opacity-50"></div>
          <div className="relative z-10 flex items-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-chart-2 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-2">Liste des utilisateurs</h2>
              <p className="text-muted-foreground text-base">
                Gérez tous les utilisateurs associés à votre compte entreprise
              </p>
            </div>
            <Badge variant="active" className="text-sm px-3 py-2">
              <UsersIcon className="w-4 h-4 mr-2" />
              Gestion du Compte
            </Badge>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border border-border/20 bg-white/80 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-light-gray-1 to-light-gray-2 border-b border-border/20">
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <UsersIcon className="w-5 h-5 text-primary" />
                </div>
                Utilisateurs associés au compte
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-gradient-to-b from-almost-white to-white">
          {/* Filtres et contrôles */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-64">
              <Input
                placeholder="Rechercher par nom, prénom ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-md"
                aria-label="Nombre d'éléments par page"
              >
                <option value={15}>15</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
              </select>
              <Button variant="outline">Choix des colonnes</Button>
              <Button variant="outline">Export Excel</Button>
            </div>
          </div>

              {/* Filtres et contrôles */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Rechercher par nom, prénom ou email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 border-border/50 focus:border-primary focus:ring-primary/20"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="px-3 py-2 border border-border/50 rounded-md bg-white focus:border-primary focus:ring-primary/20"
                    aria-label="Nombre d'éléments par page"
                  >
                    <option value={15}>15</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={200}>200</option>
                  </select>
                  <Button variant="outline" className="border-border/50 hover:bg-accent/50">
                    <Filter className="w-4 h-4 mr-2" />
                    Choix des colonnes
                  </Button>
                  <Button variant="outline" className="border-border/50 hover:bg-accent/50">
                    Export Excel
                  </Button>
                </div>
              </div>

                             {/* Tableau */}
               <div className="overflow-x-auto border border-border/30 rounded-lg">
                 <table className="w-full border-collapse min-w-[1000px]">
                  <thead>
                                         <tr className="bg-light-gray-7 border-b border-border/30">
                       {selectedColumns.includes('nom') && <th className="text-left py-4 px-6 font-semibold text-foreground min-w-[100px]">Nom</th>}
                       {selectedColumns.includes('prenom') && <th className="text-left py-4 px-6 font-semibold text-foreground min-w-[120px]">Prénom</th>}
                       {selectedColumns.includes('email') && <th className="text-left py-4 px-6 font-semibold text-foreground min-w-[200px]">Email</th>}
                       {selectedColumns.includes('statut') && <th className="text-left py-4 px-6 font-semibold text-foreground min-w-[100px]">Statut</th>}
                       {selectedColumns.includes('dateCreation') && <th className="text-left py-4 px-6 font-semibold text-foreground min-w-[140px]">Date création</th>}
                       {selectedColumns.includes('derniereConnexion') && <th className="text-left py-4 px-6 font-semibold text-foreground min-w-[160px]">Dernière connexion</th>}
                       <th className="text-left py-4 px-6 font-semibold text-foreground min-w-[140px]">Nb. fonctions</th>
                       <th className="text-left py-4 px-6 font-semibold text-foreground min-w-[100px]">Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, index) => (
                      <motion.tr 
                        key={user.id} 
                        className="border-b border-border/20 hover:bg-accent/10 transition-colors duration-200"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        {selectedColumns.includes('nom') && <td className="py-4 px-6 font-medium">{user.nom}</td>}
                        {selectedColumns.includes('prenom') && <td className="py-4 px-6">{user.prenom}</td>}
                        {selectedColumns.includes('email') && <td className="py-4 px-6 text-muted-foreground">{user.email}</td>}
                        {selectedColumns.includes('statut') && <td className="py-4 px-6">{getStatusBadge(user.statut)}</td>}
                        {selectedColumns.includes('dateCreation') && <td className="py-4 px-6 text-muted-foreground">{user.dateCreation}</td>}
                                                 {selectedColumns.includes('derniereConnexion') && <td className="py-4 px-6 text-muted-foreground">{user.derniereConnexion}</td>}
                         <td className="py-4 px-6 text-center">
                           <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                             {user.fonctions.length}
                           </Badge>
                         </td>
                         <td className="py-4 px-6">
                           <Button 
                             variant="outline" 
                             size="sm" 
                             className="text-primary hover:text-primary/80 hover:bg-primary/10"
                             onClick={() => navigate(`/account/users/${user.id}`)}
                           >
                             Détails
                           </Button>
                         </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-border/30">
                <p className="text-sm text-muted-foreground">
                  Affichage de {filteredUsers.length} utilisateur(s)
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-border/50 hover:bg-accent/50">Précédent</Button>
                  <Button variant="outline" size="sm" className="border-border/50 hover:bg-accent/50">Suivant</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation vers les autres pages SIGOMAP */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              to="/account/create-user"
              className="p-6 bg-white/80 backdrop-blur-sm border border-border/20 rounded-xl transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <UserPlusIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Créer un utilisateur</h4>
                  <p className="text-sm text-muted-foreground">Ajouter un nouvel utilisateur</p>
                </div>
              </div>
            </Link>

            <Link 
              to="/account/acquisitions"
              className="p-6 bg-white/80 backdrop-blur-sm border border-border/20 rounded-xl transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-chart-2/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ShoppingCartIcon className="h-6 w-6 text-chart-2" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Acquisitions réalisées</h4>
                  <p className="text-sm text-muted-foreground">Voir les acquisitions</p>
                </div>
              </div>
            </Link>

            <Link 
              to="/dashboard"
              className="p-6 bg-white/80 backdrop-blur-sm border border-border/20 rounded-xl transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Retour au dashboard</h4>
                  <p className="text-sm text-muted-foreground">Accueil SIGOMAP</p>
                </div>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserListPage; 