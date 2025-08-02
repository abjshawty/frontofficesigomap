import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Calendar,
  Building2,
  TrendingUp,
  ArrowLeft,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

const MyMarketsPage: React.FC = () => {
  const [_selectedFilters, setSelectedFilters] = useState({});
  const [currentPage, _setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Données simulées
  const markets = [
    {
      id: 'MKT-001',
      title: 'Acquisition de véhicules administratifs',
      entity: 'Ministère de l\'Économie et des Finances',
      awardDate: '2024-12-15',
      status: 'En cours d\'exécution',
      type: 'Fournitures',
      budget: '150,000,000 FCFA',
      progress: 65,
      completionDate: '2025-06-30'
    },
    {
      id: 'MKT-002',
      title: 'Fourniture de matériel informatique',
      entity: 'Ministère de l\'Éducation',
      awardDate: '2024-11-20',
      status: 'Terminé',
      type: 'Fournitures',
      budget: '75,000,000 FCFA',
      progress: 100,
      completionDate: '2025-01-15'
    },
    {
      id: 'MKT-003',
      title: 'Services de maintenance informatique',
      entity: 'Agence Nationale de l\'Informatique',
      awardDate: '2024-10-10',
      status: 'En cours d\'exécution',
      type: 'Services',
      budget: '120,000,000 FCFA',
      progress: 35,
      completionDate: '2025-08-30'
    },
    {
      id: 'MKT-004',
      title: 'Construction d\'un centre de santé',
      entity: 'Ministère de la Santé',
      awardDate: '2024-09-05',
      status: 'Planifié',
      type: 'Travaux',
      budget: '500,000,000 FCFA',
      progress: 0,
      completionDate: '2026-03-30'
    }
  ];

  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 20) return 'bg-orange-500';
    return 'bg-gray-500';
  };

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

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Bandeau de titre */}
        <motion.div
          className="bg-gradient-to-r from-green-600 via-green-600/80 to-green-600 border border-border/30 rounded-2xl p-6 mb-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-chart-2/5 opacity-50"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl md:rounded-3xl flex items-center justify-center flex-shrink-0">
              <Building2 className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <div className="flex-1 min-w-0 space-y-2 md:space-y-3">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                Mes Marchés
              </h2>
              <p className="text-green-100 text-base md:text-lg leading-relaxed">
                Suivez l'exécution de vos marchés attribués et consultez les documents contractuels
              </p>
            </div>
            <div className="flex-shrink-0">
              <Badge variant="secondary" className="text-sm px-3 py-2 bg-white/20 text-white border-white/30">
                <Building2 className="w-4 h-4 mr-2" />
                {markets.length} marchés
              </Badge>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filtres */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="border border-border/20 bg-white/80 backdrop-blur-sm overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-light-gray-1 to-light-gray-2 border-b border-border/20">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600/10 rounded-lg flex items-center justify-center">
                    <Filter className="w-5 h-5 text-green-600" />
                  </div>
                  Filtres
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 bg-gradient-to-b from-almost-white to-white">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="status-filter" className="text-sm font-medium text-muted-foreground">
                      Statut
                    </Label>
                    <select
                      id="status-filter"
                      aria-label="Filtrer par statut"
                      className="w-full mt-2 p-2 border border-border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600"
                      onChange={(e) => handleFilterChange('status', e.target.value)}
                    >
                      <option value="">Tous les statuts</option>
                      <option value="En cours d'exécution">En cours d'exécution</option>
                      <option value="Terminé">Terminé</option>
                      <option value="Planifié">Planifié</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="type-filter" className="text-sm font-medium text-muted-foreground">
                      Type de marché
                    </Label>
                    <select
                      id="type-filter"
                      aria-label="Filtrer par type de marché"
                      className="w-full mt-2 p-2 border border-border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600"
                      onChange={(e) => handleFilterChange('type', e.target.value)}
                    >
                      <option value="">Tous les types</option>
                      <option value="Fournitures">Fournitures</option>
                      <option value="Travaux">Travaux</option>
                      <option value="Services">Services</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="budget-filter" className="text-sm font-medium text-muted-foreground">
                      Budget minimum
                    </Label>
                    <Input
                      id="budget-filter"
                      type="number"
                      placeholder="Montant en FCFA"
                      className="mt-2"
                      onChange={(e) => handleFilterChange('budget', e.target.value)}
                    />
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full border-green-600/30 text-green-600 hover:bg-green-600/10"
                    onClick={() => setSelectedFilters({})}
                  >
                    Réinitialiser les filtres
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Liste des marchés */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <Card className="border border-border/20 bg-white/80 backdrop-blur-sm overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-light-gray-1 to-light-gray-2 border-b border-border/20">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-600/10 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-green-600" />
                    </div>
                    Mes marchés attribués
                  </CardTitle>
                  
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Rechercher un marché..."
                        className="pl-10 w-64"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 bg-gradient-to-b from-almost-white to-white">
                <div className="space-y-4">
                  {markets.map((market, index) => (
                    <motion.div
                      key={market.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="p-4 border border-border/30 rounded-xl transition-all duration-300 group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 bg-green-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Building2 className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-foreground group-hover:text-green-600 transition-colors duration-300">
                                {market.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {market.entity}
                              </p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm font-medium">{market.budget}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                Attribution: {new Date(market.awardDate).toLocaleDateString('fr-FR')}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                Fin prévue: {new Date(market.completionDate).toLocaleDateString('fr-FR')}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant={market.status === 'Terminé' ? 'default' : 
                                       market.status === 'En cours d\'exécution' ? 'secondary' : 'outline'}
                                className="text-xs"
                              >
                                {market.status === 'Terminé' && <CheckCircle className="w-3 h-3 mr-1" />}
                                {market.status}
                              </Badge>
                            </div>
                          </div>

                          {/* Barre de progression */}
                          <div className="mt-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-muted-foreground">Progression</span>
                              <span className="text-sm font-bold text-foreground">{market.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(market.progress)}`}
                                style={{ width: `${market.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 ml-4">
                          <Button variant="outline" size="sm" className="gap-2">
                            <Eye className="w-4 h-4" />
                            Détails
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/30">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Éléments par page:</span>
                    <select
                      value={itemsPerPage}
                      aria-label="Nombre d'éléments par page"
                      onChange={(e) => setItemsPerPage(Number(e.target.value))}
                      className="p-1 border border-border rounded text-sm"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled={currentPage === 1}>
                      Précédent
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Page {currentPage} sur 1
                    </span>
                    <Button variant="outline" size="sm" disabled>
                      Suivant
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Navigation vers les autres pages SIGOMAP */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8"
        >
          <Card className="border border-border/20 bg-white/80 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-light-gray-1 to-light-gray-2 border-b border-border/20">
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600/10 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-green-600" />
                </div>
                Navigation SIGOMAP
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-gradient-to-b from-almost-white to-white">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link 
                  to="/account/create-user"
                  className="p-4 border border-border/30 rounded-lg hover:bg-green-pastel/10 hover:border-green-pastel/30 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-pastel/20 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-green-pastel" />
                    </div>
                    <div>
                      <p className="font-medium text-sm group-hover:text-green-pastel transition-colors duration-300">
                        Gestion du Compte
                      </p>
                      <p className="text-xs text-muted-foreground">Créer des utilisateurs</p>
                    </div>
                  </div>
                </Link>

                <Link 
                  to="/operations/passation-plans"
                  className="p-4 border border-border/30 rounded-lg hover:bg-blue-600/10 hover:border-blue-600/30 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm group-hover:text-blue-600 transition-colors duration-300">
                        Opérations de Marché
                      </p>
                      <p className="text-xs text-muted-foreground">Voir les opérations</p>
                    </div>
                  </div>
                </Link>

                <Link 
                  to="/my-offers/invitations"
                  className="p-4 border border-border/30 rounded-lg hover:bg-orange-600/10 hover:border-orange-600/30 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm group-hover:text-orange-600 transition-colors duration-300">
                        Mes Offres
                      </p>
                      <p className="text-xs text-muted-foreground">Gérer mes offres</p>
                    </div>
                  </div>
                </Link>

                <Link 
                  to="/dashboard"
                  className="p-4 border border-border/30 rounded-lg hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm group-hover:text-primary transition-colors duration-300">
                        Tableau de Bord
                      </p>
                      <p className="text-xs text-muted-foreground">Retour au dashboard</p>
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

export default MyMarketsPage; 