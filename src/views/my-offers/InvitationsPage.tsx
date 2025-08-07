import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Search,
  Filter,
  Download,
  Eye,
  Grid3X3,
  RotateCcw,
  FileSpreadsheet,
  Info,
  FileText,
  Building2,
  Calendar,
  Settings
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

const InvitationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAuthority, setSelectedAuthority] = useState('');
  const [selectedStep, setSelectedStep] = useState('');
  const [startDate, setStartDate] = useState('01/10/2023 00:00');
  const [endDate, setEndDate] = useState('20/07/2025 00:00');

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
        {/* Titre de la page */}
        <motion.div
          className="bg-gradient-to-r from-green-600 via-green-600/80 to-green-600 border border-border/30 rounded-2xl p-6 mb-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-chart-2/5 opacity-50"></div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center">
              <FileSpreadsheet className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                Mes invitations à des appels d'offres restreints
                <Info className="w-5 h-5 text-white/80" />
              </h1>
            </div>
          </div>
        </motion.div>

                                   {/* Section Filtres de recherche */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <Card className="border border-border/20 bg-white/80 backdrop-blur-sm overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-light-gray-1 to-light-gray-2 border-b border-border/20">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-600/10 rounded-lg flex items-center justify-center">
                    <Filter className="w-5 h-5 text-orange-600" />
                  </div>
                  Filtres de recherche
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 bg-gradient-to-b from-almost-white to-white">
                <div className="space-y-4">
                  {/* Référence du dossier */}
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Référence du dossier d'appel à la concurrence
                    </Label>
                    <div className="relative mt-2">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Chercher une référence..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-light-gray-7 border-border focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600"
                      />
                    </div>
                  </div>

                  {/* Autorité contractante */}
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Autorité contractante
                    </Label>
                    <Select value={selectedAuthority} onValueChange={setSelectedAuthority}>
                      <SelectTrigger className="mt-2 bg-light-gray-7 border-border focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600">
                        <SelectValue placeholder="Sélectionner une autorité" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ministere-economie">Ministère de l'Économie</SelectItem>
                        <SelectItem value="ministere-sante">Ministère de la Santé</SelectItem>
                        <SelectItem value="ministere-education">Ministère de l'Éducation</SelectItem>
                        <SelectItem value="agence-informatique">Agence Nationale de l'Informatique</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Etape de procédure */}
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Etape de procédure
                    </Label>
                    <Select value={selectedStep} onValueChange={setSelectedStep}>
                      <SelectTrigger className="mt-2 bg-light-gray-7 border-border focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600">
                        <SelectValue placeholder="Sélectionner une étape" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en-cours">En cours</SelectItem>
                        <SelectItem value="terminee">Terminée</SelectItem>
                        <SelectItem value="annulee">Annulée</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date d'invitation */}
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Date d'invitation
                    </Label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <Input
                        type="datetime-local"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="bg-light-gray-7 border-border focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600"
                        placeholder="Date de début"
                      />
                      <Input
                        type="datetime-local"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="bg-light-gray-7 border-border focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600"
                        placeholder="Date de fin"
                      />
                    </div>
                  </div>

                  {/* Bouton Réinitialiser */}
                  <Button 
                    variant="outline" 
                    className="w-full border-orange-600/30 text-orange-600 hover:bg-orange-600/10"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Réinitialiser les filtres
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        {/* Zone de résultats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="border border-border bg-white">
            <CardContent className="p-6 bg-almost-white">
              {/* Contrôles supérieurs */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Afficher 0 éléments
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Grid3X3 className="w-4 h-4" />
                    Choix des colonnes
                  </span>
                </div>
                <Button variant="outline" className="border-border bg-green-600 text-white hover:bg-green-700">
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Export Excel
                </Button>
              </div>

              {/* Barre de recherche */}
              <div className="mb-4">
                <Input
                  placeholder="Q Rechercher"
                  className="w-full"
                />
              </div>

              {/* Zone de contenu vide */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-12 text-center">
                <Search className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-blue-800 mb-2">
                  Pas de données à afficher
                </p>
                <p className="text-sm text-blue-600">
                  Aucune invitation trouvée avec les critères de recherche actuels
                </p>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="border-border" disabled>
                    &lt;&lt;
                  </Button>
                  <Button variant="outline" size="sm" className="border-border" disabled>
                    &lt;
                  </Button>
                  <Button variant="outline" size="sm" className="border-border" disabled>
                    &gt;
                  </Button>
                  <Button variant="outline" size="sm" className="border-border" disabled>
                    &gt;&gt;
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Affichage de l'élément 0 à 0 sur 0 éléments
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default InvitationsPage; 