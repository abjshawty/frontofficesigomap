// src/views/my-markets/MarketDocumentsPage.tsx
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
  File,
  Folder,
  Upload
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

const MarketDocumentsPage: React.FC = () => {
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Données simulées pour les documents contractuels
  const documentsData = [
    {
      id: 'MKT-001',
      title: 'Acquisition de véhicules administratifs',
      entity: 'Ministère de l\'Économie et des Finances',
      documents: [
        {
          id: 'DOC-001',
          name: 'Contrat d\'attribution',
          category: 'Contrat',
          type: 'PDF',
          size: '2.5 MB',
          uploadDate: '2024-12-15',
          status: 'Validé',
          url: '#'
        },
        {
          id: 'DOC-002',
          name: 'Cahier des charges',
          category: 'Spécifications',
          type: 'PDF',
          size: '1.8 MB',
          uploadDate: '2024-12-10',
          status: 'Validé',
          url: '#'
        },
        {
          id: 'DOC-003',
          name: 'Plan d\'exécution',
          category: 'Planification',
          type: 'PDF',
          size: '3.2 MB',
          uploadDate: '2024-12-20',
          status: 'En attente',
          url: '#'
        },
        {
          id: 'DOC-004',
          name: 'Bon de commande',
          category: 'Commande',
          type: 'PDF',
          size: '1.1 MB',
          uploadDate: '2025-01-05',
          status: 'Validé',
          url: '#'
        }
      ]
    },
    {
      id: 'MKT-002',
      title: 'Fourniture de matériel informatique',
      entity: 'Ministère de l\'Éducation',
      documents: [
        {
          id: 'DOC-005',
          name: 'Contrat d\'attribution',
          category: 'Contrat',
          type: 'PDF',
          size: '2.1 MB',
          uploadDate: '2024-11-20',
          status: 'Validé',
          url: '#'
        },
        {
          id: 'DOC-006',
          name: 'Spécifications techniques',
          category: 'Spécifications',
          type: 'PDF',
          size: '4.5 MB',
          uploadDate: '2024-11-15',
          status: 'Validé',
          url: '#'
        },
        {
          id: 'DOC-007',
          name: 'Rapport de réception',
          category: 'Réception',
          type: 'PDF',
          size: '1.3 MB',
          uploadDate: '2025-01-15',
          status: 'Validé',
          url: '#'
        }
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'Tous les documents' },
    { id: 'Contrat', name: 'Contrats' },
    { id: 'Spécifications', name: 'Spécifications' },
    { id: 'Planification', name: 'Planification' },
    { id: 'Commande', name: 'Commandes' },
    { id: 'Réception', name: 'Réceptions' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Validé': return 'bg-green-100 text-green-800';
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      case 'Rejeté': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Contrat': return <FileText className="w-4 h-4" />;
      case 'Spécifications': return <File className="w-4 h-4" />;
      case 'Planification': return <Calendar className="w-4 h-4" />;
      case 'Commande': return <TrendingUp className="w-4 h-4" />;
      case 'Réception': return <CheckCircle className="w-4 h-4" />;
      default: return <File className="w-4 h-4" />;
    }
  };

  const filteredDocuments = documentsData.flatMap(market => 
    market.documents.filter(doc => 
      selectedCategory === 'all' || doc.category === selectedCategory
    )
  );

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
            <Upload className="w-4 h-4" />
            Ajouter un document
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
          className="bg-gradient-to-r from-orange-600 via-orange-600/80 to-orange-600 border border-border/30 rounded-2xl p-6 mb-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-chart-2/5 opacity-50"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl md:rounded-3xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <div className="flex-1 min-w-0 space-y-2 md:space-y-3">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                Documents Contractuels
              </h2>
              <p className="text-orange-100 text-base md:text-lg leading-relaxed">
                Consultez et gérez tous les documents contractuels de vos marchés
              </p>
            </div>
            <div className="flex-shrink-0">
              <Badge variant="secondary" className="text-sm px-3 py-2 bg-white/20 text-white border-white/30">
                <FileText className="w-4 h-4 mr-2" />
                {filteredDocuments.length} documents
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
                <Label className="text-sm font-medium text-gray-700">Filtrer par catégorie:</Label>
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Liste des documents */}
        <div className="space-y-6">
          {documentsData.map((market, marketIndex) => (
            <motion.div
              key={market.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + marketIndex * 0.1 }}
            >
              <Card className="border border-gray-300 bg-white/80 backdrop-blur-sm overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-light-gray-1 to-light-gray-2 border-b border-gray-200">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-600/10 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-orange-600" />
                    </div>
                    {market.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground">{market.entity}</p>
                  </div>
                  
                  <div className="space-y-3">
                    {market.documents
                      .filter(doc => selectedCategory === 'all' || doc.category === selectedCategory)
                      .map((document, docIndex) => (
                        <motion.div
                          key={document.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.6 + docIndex * 0.1 }}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                              {getCategoryIcon(document.category)}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-800">{document.name}</h4>
                              <div className="flex items-center gap-4 mt-1">
                                <span className="text-xs text-muted-foreground">{document.category}</span>
                                <span className="text-xs text-muted-foreground">{document.type}</span>
                                <span className="text-xs text-muted-foreground">{document.size}</span>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(document.uploadDate).toLocaleDateString('fr-FR')}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Badge className={`text-xs ${getStatusColor(document.status)}`}>
                              {document.status}
                            </Badge>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="gap-2">
                                <Eye className="w-4 h-4" />
                                Voir
                              </Button>
                              <Button variant="outline" size="sm" className="gap-2">
                                <Download className="w-4 h-4" />
                                Télécharger
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
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
                <div className="w-10 h-10 bg-orange-600/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-orange-600" />
                </div>
                Statistiques des documents
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Documents validés</p>
                      <p className="text-lg font-bold text-green-600">
                        {filteredDocuments.filter(doc => doc.status === 'Validé').length}
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
                        {filteredDocuments.filter(doc => doc.status === 'En attente').length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Total documents</p>
                      <p className="text-lg font-bold text-blue-600">{filteredDocuments.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-3">
                    <Folder className="w-6 h-6 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Marchés</p>
                      <p className="text-lg font-bold text-purple-600">{documentsData.length}</p>
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

export default MarketDocumentsPage; 