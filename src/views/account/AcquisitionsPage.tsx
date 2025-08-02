import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { ShoppingCartIcon, ArrowRightIcon, UserPlusIcon, UsersIcon } from '../../components/icons';
import { Building2, ArrowLeft, Sparkles, TrendingUp } from 'lucide-react';

interface Acquisition {
  id: string;
  reference: string;
  objet: string;
  cout: string;
  moyenPaiement: string;
  dateAcquisition: string;
}

const AcquisitionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [_selectedFilters] = useState(['reference', 'moyenPaiement', 'montant', 'date']);

  // Données simulées
  const acquisitions: Acquisition[] = [
    {
      id: '1',
      reference: 'REF-2024-001',
      objet: 'Fourniture de matériel informatique',
      cout: '15 000 000 FCFA',
      moyenPaiement: 'Virement bancaire',
      dateAcquisition: '2024-07-15'
    },
    {
      id: '2',
      reference: 'REF-2024-002',
      objet: 'Services de maintenance',
      cout: '8 500 000 FCFA',
      moyenPaiement: 'Chèque',
      dateAcquisition: '2024-07-20'
    },
    {
      id: '3',
      reference: 'REF-2024-003',
      objet: 'Formation du personnel',
      cout: '12 000 000 FCFA',
      moyenPaiement: 'Virement bancaire',
      dateAcquisition: '2024-07-25'
    }
  ];

  const filteredAcquisitions = acquisitions.filter(acquisition =>
    acquisition.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    acquisition.objet.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header avec navigation */}
      <header className="h-16 bg-light-gray-1 border-b border-border flex items-center justify-between px-6 header">
        <div className="flex items-center gap-4">
          <Link 
            to="/dashboard"
            className="flex items-center gap-3 hover:bg-green-pastel/50 p-2 rounded-lg transition-colors duration-300"
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
          className="bg-gradient-to-r from-green-pastel via-green-pastel/80 to-green-pastel border border-border/30 rounded-2xl p-6 mb-8 relative overflow-hidden"
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
              <h2 className="text-2xl font-bold text-foreground mb-2">Acquisitions réalisées</h2>
              <p className="text-muted-foreground text-base">
                Consultez l'historique de vos acquisitions et achats réalisés
              </p>
            </div>
            <Badge variant="active" className="text-sm px-3 py-2">
              <ShoppingCartIcon className="w-4 h-4 mr-2" />
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
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                Liste des acquisitions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-gradient-to-b from-almost-white to-white">
              {/* Section 1: Filtres de recherche */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Filtres de recherche</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Référence du dossier
                    </label>
                    <Input placeholder="Référence..." className="w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Moyen de paiement
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md" aria-label="Moyen de paiement">
                      <option value="">Tous</option>
                      <option value="virement">Virement bancaire</option>
                      <option value="cheque">Chèque</option>
                      <option value="especes">Espèces</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Montant de l'acquisition
                    </label>
                    <Input placeholder="Montant..." className="w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <Input type="date" className="w-full" />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline">Choix des filtres</Button>
                  <Button variant="outline">Réinitialiser</Button>
                </div>
              </div>

              {/* Section 2: Tableau des achats */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Tableau des achats</h3>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex-1 min-w-64">
                    <Input
                      placeholder="Rechercher..."
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

                {/* Tableau */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold">Référence du dossier</th>
                        <th className="text-left py-3 px-4 font-semibold">Objet du dossier</th>
                        <th className="text-left py-3 px-4 font-semibold">Coût de l'acquisition</th>
                        <th className="text-left py-3 px-4 font-semibold">Moyen de paiement utilisé</th>
                        <th className="text-left py-3 px-4 font-semibold">Date de l'acquisition</th>
                        <th className="text-left py-3 px-4 font-semibold">Détails</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAcquisitions.map((acquisition) => (
                        <tr key={acquisition.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{acquisition.reference}</td>
                          <td className="py-3 px-4">{acquisition.objet}</td>
                          <td className="py-3 px-4 font-semibold text-emerald-600">{acquisition.cout}</td>
                          <td className="py-3 px-4">
                            <Badge className="bg-blue-100 text-blue-800">{acquisition.moyenPaiement}</Badge>
                          </td>
                          <td className="py-3 px-4">{acquisition.dateAcquisition}</td>
                          <td className="py-3 px-4">
                            <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700">
                              <ArrowRightIcon className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-6">
                  <p className="text-sm text-gray-600">
                    Affichage de {filteredAcquisitions.length} acquisition(s)
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Précédent</Button>
                    <Button variant="outline" size="sm">Suivant</Button>
                  </div>
                </div>
              </div>

              {/* Navigation vers les autres pages SIGOMAP */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link 
                  to="/account/create-user"
                  className="p-4 bg-white border border-gray-200 rounded-lg transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <UserPlusIcon className="h-6 w-6 text-emerald-600" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Créer un utilisateur</h4>
                      <p className="text-sm text-gray-600">Ajouter un nouvel utilisateur</p>
                    </div>
                  </div>
                </Link>

                <Link 
                  to="/account/users"
                  className="p-4 bg-white border border-gray-200 rounded-lg transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <UsersIcon className="h-6 w-6 text-emerald-600" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Liste des utilisateurs</h4>
                      <p className="text-sm text-gray-600">Consulter tous les utilisateurs</p>
                    </div>
                  </div>
                </Link>

                <Link 
                  to="/dashboard"
                  className="p-4 bg-white border border-gray-200 rounded-lg transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingCartIcon className="h-6 w-6 text-emerald-600" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Retour au dashboard</h4>
                      <p className="text-sm text-gray-600">Accueil SIGOMAP</p>
                    </div>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AcquisitionsPage; 