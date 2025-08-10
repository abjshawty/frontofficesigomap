// src/views/my-markets/MarketDetailsPage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Download, 
  Eye, 
  ArrowLeft,
  CheckCircle,
  FileText,
  Users,
  MapPin,
  DollarSign
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
 

const MarketDetailsPage: React.FC = () => {
  

  // Données simulées pour les détails des marchés
  const marketDetails = [
    {
      id: 'MKT-001',
      title: 'Acquisition de véhicules administratifs',
      entity: 'Ministère de l\'Économie et des Finances',
      awardDate: '2024-12-15',
      status: 'En cours d\'exécution',
      type: 'Fournitures',
      budget: '150,000,000 FCFA',
      progress: 65,
      completionDate: '2025-06-30',
      description: 'Acquisition de véhicules administratifs pour les services du ministère',
      location: 'Abidjan, Côte d\'Ivoire',
      contractor: 'ETS FIRDAOUS',
      contractNumber: 'CONTRACT-2024-001',
      paymentTerms: '30 jours après réception',
      warranty: '12 mois',
      milestones: [
        { id: 1, title: 'Signature du contrat', date: '2024-12-15', status: 'Terminé' },
        { id: 2, title: 'Livraison première tranche', date: '2025-02-15', status: 'En cours' },
        { id: 3, title: 'Livraison finale', date: '2025-06-30', status: 'Planifié' }
      ]
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
      completionDate: '2025-01-15',
      description: 'Fourniture de matériel informatique pour les établissements scolaires',
      location: 'Toutes les régions',
      contractor: 'ETS FIRDAOUS',
      contractNumber: 'CONTRACT-2024-002',
      paymentTerms: '45 jours après réception',
      warranty: '24 mois',
      milestones: [
        { id: 1, title: 'Signature du contrat', date: '2024-11-20', status: 'Terminé' },
        { id: 2, title: 'Livraison complète', date: '2025-01-15', status: 'Terminé' }
      ]
    }
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 20) return 'bg-orange-500';
    return 'bg-gray-500';
  };

  const getWidthClassFromProgress = (progress: number) => {
    const clamped = Math.max(0, Math.min(100, progress));
    const roundedToFive = Math.round(clamped / 5) * 5;
    return `w-[${roundedToFive}%]`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header avec navigation */}
      <header className="h-16 bg-light-gray-1 border-b border-border flex items-center justify-between px-6 header">
        <div className="flex items-center gap-4">
          <Link 
            to="/my-markets"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Retour à mes marchés</span>
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
          className="bg-gradient-to-r from-blue-600 via-blue-600/80 to-blue-600 border border-border/30 rounded-2xl p-6 mb-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-chart-2/5 opacity-50"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl md:rounded-3xl flex items-center justify-center flex-shrink-0">
              <Building2 className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <div className="flex-1 min-w-0 space-y-2 md:space-y-3">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                Détails des Marchés
              </h2>
              <p className="text-blue-100 text-base md:text-lg leading-relaxed">
                Consultez les informations détaillées de vos marchés attribués
              </p>
            </div>
            <div className="flex-shrink-0">
              <Badge variant="secondary" className="text-sm px-3 py-2 bg-white/20 text-white border-white/30">
                <Building2 className="w-4 h-4 mr-2" />
                {marketDetails.length} marchés
              </Badge>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          {marketDetails.map((market, index) => (
            <motion.div
              key={market.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-light-gray-1 to-light-gray-2 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-blue-600" />
                      </div>
                      {market.title}
                    </CardTitle>
                    <Badge 
                      variant={market.status === 'Terminé' ? 'default' : 
                             market.status === 'En cours d\'exécution' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {market.status === 'Terminé' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {market.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Informations générales */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations générales</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium text-gray-800">Entité contractante</p>
                            <p className="text-sm text-muted-foreground">{market.entity}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium text-gray-800">Budget</p>
                            <p className="text-sm text-muted-foreground">{market.budget}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium text-gray-800">Localisation</p>
                            <p className="text-sm text-muted-foreground">{market.location}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium text-gray-800">Titulaire</p>
                            <p className="text-sm text-muted-foreground">{market.contractor}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Informations contractuelles */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations contractuelles</h3>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-800">Numéro de contrat</p>
                          <p className="text-sm text-muted-foreground">{market.contractNumber}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-800">Date d'attribution</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(market.awardDate).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-800">Date de fin prévue</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(market.completionDate).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-800">Conditions de paiement</p>
                          <p className="text-sm text-muted-foreground">{market.paymentTerms}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-800">Garantie</p>
                          <p className="text-sm text-muted-foreground">{market.warranty}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-800 mb-2">Description</h4>
                    <p className="text-sm text-muted-foreground">{market.description}</p>
                  </div>

                  {/* Progression */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-800">Progression</h4>
                      <span className="text-sm font-bold text-gray-800">{market.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(market.progress)} ${getWidthClassFromProgress(market.progress)}`}
                      ></div>
                    </div>
                  </div>

                  {/* Jalons */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-800 mb-4">Jalons du projet</h4>
                    <div className="space-y-3">
                      {market.milestones.map((milestone) => (
                        <div key={milestone.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-3 h-3 rounded-full ${
                            milestone.status === 'Terminé' ? 'bg-green-500' :
                            milestone.status === 'En cours' ? 'bg-blue-500' : 'bg-gray-400'
                          }`}></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">{milestone.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(milestone.date).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                          <Badge 
                            variant={milestone.status === 'Terminé' ? 'default' : 
                                   milestone.status === 'En cours' ? 'secondary' : 'outline'}
                            className="text-xs"
                          >
                            {milestone.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-6 border-t border-gray-200 flex items-center gap-3">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="w-4 h-4" />
                      Voir les documents
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <FileText className="w-4 h-4" />
                      Rapport d'exécution
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      Exporter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketDetailsPage; 