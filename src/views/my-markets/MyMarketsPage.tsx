import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Download, 
  ArrowLeft,
  RotateCcw,
  FileSpreadsheet,
  Grid3X3
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

const MyMarketsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAuthority, setSelectedAuthority] = useState('');
  const [selectedMinistry, setSelectedMinistry] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Mes marchés</h1>
        </motion.div>

        {/* Section Filtres de recherche */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Filter className="w-5 h-5 text-primary" />
                <span>Filtres de recherche</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <Label className="text-sm" htmlFor="marches">Marchés</Label>
                <div className="relative mt-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" aria-hidden="true" />
                  <Input id="marches" placeholder="Chercher" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
                </div>
              </div>
              <div>
                <Label htmlFor="autorite">Autorité contractante</Label>
                <Select value={selectedAuthority} onValueChange={setSelectedAuthority}>
                  <SelectTrigger id="autorite" className="mt-1">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="autorite-1">Autorité Contractante 1</SelectItem>
                    <SelectItem value="autorite-2">Autorité Contractante 2</SelectItem>
                    <SelectItem value="autorite-3">Autorité Contractante 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="ministere">Ministère / Institution</Label>
                <Select value={selectedMinistry} onValueChange={setSelectedMinistry}>
                  <SelectTrigger id="ministere" className="mt-1">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ministere-economie">Ministère de l'Économie</SelectItem>
                    <SelectItem value="ministere-sante">Ministère de la Santé</SelectItem>
                    <SelectItem value="ministere-education">Ministère de l'Éducation</SelectItem>
                    <SelectItem value="agence-informatique">Agence Nationale de l'Informatique</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dates">Date de début d'exécution</Label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="Date début" />
                  <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="Date de fin" />
                </div>
              </div>
              <div className="flex items-end gap-2 col-span-full justify-end">
                <Button variant="ghost" onClick={() => { setSearchTerm(''); setSelectedAuthority(''); setSelectedMinistry(''); setStartDate(''); setEndDate(''); }}><RotateCcw className="w-4 h-4 mr-2" />Réinitialiser</Button>
                <Button className="bg-primary hover:bg-primary/90">Rechercher</Button>
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
          <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Mes marchés</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input placeholder="Rechercher" className="pl-10 w-80 xl:w-96" />
                </div>
                <Button variant="outline"><Grid3X3 className="w-4 h-4 mr-2" />Choix des colonnes</Button>
                <Button variant="outline"><FileSpreadsheet className="w-4 h-4 mr-2" />Export Excel</Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 bg-almost-white">
              {/* Barre de recherche */}
              <div className="mb-4">
                <Input
                  placeholder="Q Rechercher"
                  className="w-full"
                />
              </div>

              {/* Contrôles supérieurs */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Info className="w-4 h-4" />
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

              {/* Zone de contenu vide */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-12 text-center" aria-live="polite">
                <Search className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-blue-800 mb-2">
                  Pas de données à afficher
                </p>
                <p className="text-sm text-blue-600">
                  Aucun marché trouvé avec les critères de recherche actuels
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

export default MyMarketsPage; 