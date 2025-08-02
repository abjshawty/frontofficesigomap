// src/views/my-markets/MarketReportsPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Calendar,
  TrendingUp,
  ArrowLeft,
  Clock,
  CheckCircle,
  FileText,
  Users,
  MapPin,
  DollarSign,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

const MarketReportsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMarket, setSelectedMarket] = useState('all');

  // Données simulées pour les rapports d'exécution
  const reportsData = [
    {
      id: 'RPT-001',
      marketId: 'MKT-001',
      marketTitle: 'Acquisition de véhicules administratifs',
      entity: 'Ministère de l\'Économie et des Finances',
      period: 'Janvier 2025',
      type: 'Rapport mensuel',
      status: 'Validé',
      progress: 65,
      budget: '150,000,000 FCFA',
      spent: '97,500,000 FCFA',
      remaining: '52,500,000 FCFA',
      completionDate: '2025-06-30',
      achievements: [
        'Commande des véhicules finalisée',
        'Livraison première tranche en cours',
        'Formation des chauffeurs prévue'
      ],
      challenges: [
        'Délai de livraison légèrement retardé',
        'Coordination avec les fournisseurs'
      ],
      nextSteps: [
        'Finaliser la livraison première tranche',
        'Planifier la livraison finale',
        'Préparer la réception'
      ]
    },
    {
      id: 'RPT-002',
      marketId: 'MKT-002',
      marketTitle: 'Fourniture de matériel informatique',
      entity: 'Ministère de l\'Éducation',
      period: 'Décembre 2024',
      type: 'Rapport final',
      status: 'Validé',
      progress: 100,
      budget: '75,000,000 FCFA',
      spent: '75,000,000 FCFA',
      remaining: '0 FCFA',
      completionDate: '2025-01-15',
      achievements: [
        'Livraison complète du matériel',
        'Installation dans tous les établissements',
        'Formation du personnel effectuée'
      ],
      challenges: [
        'Coordination avec plusieurs établissements',
        'Gestion des délais de livraison'
      ],
      nextSteps: [
        'Clôture du marché',
        'Archivage des documents',
        'Évaluation de satisfaction'
      ]
    },
    {
      id: 'RPT-003',
      marketId: 'MKT-003',
      marketTitle: 'Services de maintenance informatique',
      entity: 'Agence Nationale de l\'Informatique',
      period: 'Janvier 2025',
      type: 'Rapport mensuel',
      status: 'En attente',
      progress: 35,
      budget: '120,000,000 FCFA',
      spent: '42,000,000 FCFA',
      remaining: '78,000,000 FCFA',
      completionDate: '2025-08-30',
      achievements: [
        'Mise en place des équipes de maintenance',
        'Maintenance préventive en cours',
        'Formation initiale du personnel'
      ],
      challenges: [
        'Coordination avec plusieurs sites',
        'Gestion des priorités de maintenance'
      ],
      nextSteps: [
        'Intensifier la maintenance préventive',
        'Planifier la formation continue',
        'Préparer les rapports trimestriels'
      ]
    }
  ];

  const periods = [
    { id: 'all', name: 'Toutes les périodes' },
    { id: 'month', name: 'Mensuel' },
    { id: 'quarter', name: 'Trimestriel' },
    { id: 'year', name: 'Annuel' },
    { id: 'final', name: 'Final' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Validé': return 'bg-green-100 text-green-800';
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      case 'Rejeté': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 20) return 'bg-orange-500';
    return 'bg-gray-500';
  };

  const filteredReports = reportsData.filter(report => {
    const periodMatch = selectedPeriod === 'all' || report.type.toLowerCase().includes(selectedPeriod);
    const marketMatch = selectedMarket === 'all' || report.marketId === selectedMarket;
    return periodMatch && marketMatch;
  });

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
            <BarChart3 className="w-4 h-4" />
            Générer rapport
          </Button>
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
          className="bg-gradient-to-r from-indigo-600 via-indigo-600/80 to-indigo-600 border border-border/30 rounded-2xl p-6 mb-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-chart-2/5 opacity-50"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl md:rounded-3xl flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <div className="flex-1 min-w-0 space-y-2 md:space-y-3">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                Rapports d'Exécution
              </h2>
              <p className="text-indigo-100 text-base md:text-lg leading-relaxed">
                Consultez et gérez les rapports d'exécution de vos marchés
              </p>
            </div>
            <div className="flex-shrink-0">
              <Badge variant="secondary" className="text-sm px-3 py-2 bg-white/20 text-white border-white/30">
                <BarChart3 className="w-4 h-4 mr-2" />
                {filteredReports.length} rapports
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Label className="text-sm font-medium text-gray-700">Filtrer par type:</Label>
                <div className="flex gap-2 flex-wrap">
                  {periods.map((period) => (
                    <Button
                      key={period.id}
                      variant={selectedPeriod === period.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedPeriod(period.id)}
                    >
                      {period.name}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Liste des rapports */}
        <div className="space-y-6">
          {filteredReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-light-gray-1 to-light-gray-2 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-600/10 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-indigo-600" />
                      </div>
                      {report.marketTitle}
                    </CardTitle>
                    <Badge className={`text-xs ${getStatusColor(report.status)}`}>
                      {report.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Informations générales */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations générales</h3>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-800">Entité contractante</p>
                          <p className="text-sm text-muted-foreground">{report.entity}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-800">Période</p>
                          <p className="text-sm text-muted-foreground">{report.period}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-800">Type de rapport</p>
                          <p className="text-sm text-muted-foreground">{report.type}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-800">Date de fin prévue</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(report.completionDate).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Progression et budget */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Progression</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-800">Avancement global</span>
                            <span className="text-sm font-bold text-gray-800">{report.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(report.progress)}`}
                              style={{ width: `${report.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-3">
                          <div className="p-3 bg-green-50 rounded-lg">
                            <p className="text-sm font-medium text-gray-800">Budget total</p>
                            <p className="text-sm text-green-600 font-semibold">{report.budget}</p>
                          </div>
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm font-medium text-gray-800">Dépensé</p>
                            <p className="text-sm text-blue-600 font-semibold">{report.spent}</p>
                          </div>
                          <div className="p-3 bg-purple-50 rounded-lg">
                            <p className="text-sm font-medium text-gray-800">Restant</p>
                            <p className="text-sm text-purple-600 font-semibold">{report.remaining}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Réalisations et défis */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Analyse</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-800 mb-2">Réalisations</h4>
                          <ul className="space-y-1">
                            {report.achievements.map((achievement, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-800 mb-2">Défis rencontrés</h4>
                          <ul className="space-y-1">
                            {report.challenges.map((challenge, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                <Clock className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                                {challenge}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Prochaines étapes */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-800 mb-4">Prochaines étapes</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {report.nextSteps.map((step, idx) => (
                        <div key={idx} className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                          <div className="flex items-start gap-2">
                            <TrendingUp className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-800">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-6 border-t border-gray-200 flex items-center gap-3">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="w-4 h-4" />
                      Voir le rapport complet
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Générer graphiques
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      Télécharger PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8"
        >
          <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-light-gray-1 to-light-gray-2 border-b border-gray-200">
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-indigo-600" />
                </div>
                Statistiques des rapports
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Rapports validés</p>
                      <p className="text-lg font-bold text-green-600">
                        {filteredReports.filter(rpt => rpt.status === 'Validé').length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-yellow-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">En attente</p>
                      <p className="text-lg font-bold text-yellow-600">
                        {filteredReports.filter(rpt => rpt.status === 'En attente').length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Total rapports</p>
                      <p className="text-lg font-bold text-blue-600">{filteredReports.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-6 h-6 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Marchés couverts</p>
                      <p className="text-lg font-bold text-purple-600">
                        {new Set(filteredReports.map(rpt => rpt.marketId)).size}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default MarketReportsPage; 