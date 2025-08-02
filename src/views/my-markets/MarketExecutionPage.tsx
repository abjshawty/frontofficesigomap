// src/views/my-markets/MarketExecutionPage.tsx
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
  Play,
  Pause,
  AlertCircle
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import './MarketExecutionPage.css';

const MarketExecutionPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Données simulées pour l'exécution des marchés
  const executionData = [
    {
      id: 'MKT-001',
      title: 'Acquisition de véhicules administratifs',
      entity: 'Ministère de l\'Économie et des Finances',
      status: 'En cours d\'exécution',
      progress: 65,
      startDate: '2024-12-15',
      endDate: '2025-06-30',
      budget: '150,000,000 FCFA',
      spent: '97,500,000 FCFA',
      remaining: '52,500,000 FCFA',
      tasks: [
        { id: 1, title: 'Commande des véhicules', status: 'Terminé', progress: 100 },
        { id: 2, title: 'Livraison première tranche', status: 'En cours', progress: 75 },
        { id: 3, title: 'Livraison finale', status: 'Planifié', progress: 0 }
      ],
      issues: [
        { id: 1, type: 'warning', message: 'Délai de livraison légèrement retardé', date: '2025-01-15' }
      ]
    },
    {
      id: 'MKT-002',
      title: 'Fourniture de matériel informatique',
      entity: 'Ministère de l\'Éducation',
      status: 'Terminé',
      progress: 100,
      startDate: '2024-11-20',
      endDate: '2025-01-15',
      budget: '75,000,000 FCFA',
      spent: '75,000,000 FCFA',
      remaining: '0 FCFA',
      tasks: [
        { id: 1, title: 'Commande du matériel', status: 'Terminé', progress: 100 },
        { id: 2, title: 'Livraison complète', status: 'Terminé', progress: 100 }
      ],
      issues: []
    },
    {
      id: 'MKT-003',
      title: 'Services de maintenance informatique',
      entity: 'Agence Nationale de l\'Informatique',
      status: 'En cours d\'exécution',
      progress: 35,
      startDate: '2024-10-10',
      endDate: '2025-08-30',
      budget: '120,000,000 FCFA',
      spent: '42,000,000 FCFA',
      remaining: '78,000,000 FCFA',
      tasks: [
        { id: 1, title: 'Mise en place des équipes', status: 'Terminé', progress: 100 },
        { id: 2, title: 'Maintenance préventive', status: 'En cours', progress: 60 },
        { id: 3, title: 'Maintenance corrective', status: 'En cours', progress: 20 },
        { id: 4, title: 'Formation du personnel', status: 'Planifié', progress: 0 }
      ],
      issues: [
        { id: 1, type: 'info', message: 'Formation du personnel prévue pour mars 2025', date: '2025-01-20' }
      ]
    }
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 20) return 'bg-orange-500';
    return 'bg-gray-500';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Terminé': return 'bg-green-100 text-green-800';
      case 'En cours d\'exécution': return 'bg-blue-100 text-blue-800';
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredData = selectedFilter === 'all' 
    ? executionData 
    : executionData.filter(item => item.status === selectedFilter);

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
          className="bg-gradient-to-r from-purple-600 via-purple-600/80 to-purple-600 border border-border/30 rounded-2xl p-6 mb-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-chart-2/5 opacity-50"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl md:rounded-3xl flex items-center justify-center flex-shrink-0">
              <Play className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <div className="flex-1 min-w-0 space-y-2 md:space-y-3">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                Exécution des Marchés
              </h2>
              <p className="text-purple-100 text-base md:text-lg leading-relaxed">
                Suivez l'avancement de l'exécution de vos marchés en temps réel
              </p>
            </div>
            <div className="flex-shrink-0">
              <Badge variant="secondary" className="text-sm px-3 py-2 bg-white/20 text-white border-white/30">
                <Building2 className="w-4 h-4 mr-2" />
                {filteredData.length} marchés
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
                <Label className="text-sm font-medium text-gray-700">Filtrer par statut:</Label>
                <div className="flex gap-2">
                  <Button
                    variant={selectedFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedFilter('all')}
                  >
                    Tous
                  </Button>
                  <Button
                    variant={selectedFilter === 'En cours d\'exécution' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedFilter('En cours d\'exécution')}
                  >
                    En cours
                  </Button>
                  <Button
                    variant={selectedFilter === 'Terminé' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedFilter('Terminé')}
                  >
                    Terminés
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Liste des exécutions */}
        <div className="space-y-6">
          {filteredData.map((execution, index) => (
            <motion.div
              key={execution.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-light-gray-1 to-light-gray-2 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-600/10 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-purple-600" />
                      </div>
                      {execution.title}
                    </CardTitle>
                    <Badge className={`text-xs ${getStatusColor(execution.status)}`}>
                      {execution.status}
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
                          <p className="text-sm text-muted-foreground">{execution.entity}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-800">Période d'exécution</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(execution.startDate).toLocaleDateString('fr-FR')} - {new Date(execution.endDate).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-800">Budget total</p>
                          <p className="text-sm text-muted-foreground">{execution.budget}</p>
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
                            <span className="text-sm font-bold text-gray-800">{execution.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className={`progress-bar h-3 rounded-full transition-all duration-300 ${getProgressColor(execution.progress)}`}
                              data-progress={execution.progress}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-3">
                          <div className="p-3 bg-green-50 rounded-lg">
                            <p className="text-sm font-medium text-gray-800">Dépensé</p>
                            <p className="text-sm text-green-600 font-semibold">{execution.spent}</p>
                          </div>
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm font-medium text-gray-800">Restant</p>
                            <p className="text-sm text-blue-600 font-semibold">{execution.remaining}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tâches */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Tâches</h3>
                      
                      <div className="space-y-3">
                        {execution.tasks.map((task) => (
                          <div key={task.id} className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-sm font-medium text-gray-800">{task.title}</p>
                              <Badge 
                                variant={task.status === 'Terminé' ? 'default' : 
                                       task.status === 'En cours' ? 'secondary' : 'outline'}
                                className="text-xs"
                              >
                                {task.status}
                              </Badge>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`progress-bar h-2 rounded-full transition-all duration-300 ${getProgressColor(task.progress)}`}
                                data-progress={task.progress}
                              ></div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{task.progress}%</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Problèmes et alertes */}
                  {execution.issues.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-800 mb-4">Problèmes et alertes</h4>
                      <div className="space-y-3">
                        {execution.issues.map((issue) => (
                          <div key={issue.id} className={`p-3 rounded-lg ${
                            issue.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                            issue.type === 'error' ? 'bg-red-50 border border-red-200' :
                            'bg-blue-50 border border-blue-200'
                          }`}>
                            <div className="flex items-start gap-3">
                              <AlertCircle className={`w-4 h-4 mt-0.5 ${
                                issue.type === 'warning' ? 'text-yellow-600' :
                                issue.type === 'error' ? 'text-red-600' :
                                'text-blue-600'
                              }`} />
                              <div className="flex-1">
                                <p className="text-sm text-gray-800">{issue.message}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {new Date(issue.date).toLocaleDateString('fr-FR')}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-6 pt-6 border-t border-gray-200 flex items-center gap-3">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="w-4 h-4" />
                      Voir les détails
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

export default MarketExecutionPage; 