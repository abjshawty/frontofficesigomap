import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,

  ArrowRight,
  ArrowLeft,
  LayoutGrid,
  List,
  FileText,
  Building,
  Scale,
  Slash,
  Gavel
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { motion } from 'framer-motion';

// --- HEADER COMPONENT ---
const Header: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
    return (
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('/')}>
                <img src="/logo-sigomap.png" alt="Logo SIGOMAP" className="h-12 w-auto" />
                <div className="hidden sm:block">
                    <h1 className="text-xl font-bold text-slate-800 tracking-tight">SIGOMAP.GOUV.CI</h1>
                    <p className="text-xs text-slate-500 font-medium">Plateforme des marchés publics</p>
                </div>
            </div>
            <nav className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  onClick={() => onNavigate('/login')}
                  className="text-slate-600 font-medium hover:text-primary hover:bg-primary/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour à l'accueil
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => onNavigate('/adhesion')}
                  className="border-primary text-primary hover:bg-primary/10 hover:text-primary"
                >
                  Créer un compte entreprise
                </Button>
            </nav>
          </div>
        </div>
      </header>
    );
  };
  
// --- DATA ---
const publicationItems = [
    { id: 1, title: "Liste des attributions", description: "Accédez aux résultats des appels d'offres.", link: "/attributions", category: "resultats", icon: Scale },
    { id: 2, title: "Liste des marchés approuvés", description: "Consultez la liste des marchés qui ont été approuvés.", link: "/marches-approuves", category: "marches", icon: FileText },
    { id: 3, title: "Liste des marchés résiliés", description: "Visualisez la liste des marchés publics qui ont été résiliés.", link: "/marches-resilies", category: "marches", icon: FileText },
    { id: 4, title: "Marchés de gré à gré autorisés", description: "Accédez à la liste des marchés de gré à gré autorisés.", link: "/marches-gre-a-gre", category: "marches", icon: FileText },
    { id: 5, title: "Liste des entreprises sous sanctions", description: "Repérez les entreprises non autorisées à réaliser des marchés publics.", link: "/entreprises-sanctions", category: "entreprises", icon: Slash },
    { id: 6, title: "Liste des avenants autorisés", description: "Consultez la liste des avenants autorisés sur les marchés en cours.", link: "/avenants-autorises", category: "avenants", icon: Building },
    { id: 7, title: "Liste des décisions de l'ANRMP", description: "Retrouvez les décisions de l'Agence de régulation des marchés publics.", link: "/decisions-anrmp", category: "decisions", icon: Gavel },
];

const categories = [
    { id: 'all', name: 'Toutes les catégories' },
    { id: 'resultats', name: 'Résultats' },
    { id: 'marches', name: 'Marchés' },
    { id: 'entreprises', name: 'Entreprises' },
    { id: 'avenants', name: 'Avenants' },
    { id: 'decisions', name: 'Décisions' }
];

// --- COMPONENTS ---
const PublicationCard: React.FC<{ item: typeof publicationItems[0], onNavigate: (link: string) => void }> = ({ item, onNavigate }) => {
    return (
        <Card 
            onClick={() => onNavigate(item.link)}
            className="group h-full flex flex-col p-6 rounded-2xl border-slate-200 hover:border-primary/80 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer"
        >
            <CardContent className="p-0 flex flex-col flex-grow">
                <div className="flex-grow">
                    <item.icon className="w-8 h-8 text-slate-300 group-hover:text-primary transition-colors mb-4" />
                    <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
                    <p className="text-slate-600 text-sm mt-1 leading-relaxed">{item.description}</p>
                </div>
                <div className="mt-6">
                    <div className="flex items-center text-sm font-semibold text-primary">
                        <span>Consulter</span>
                        <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

// --- MAIN PAGE COMPONENT ---
const PublicationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleCardClick = (link: string) => navigate(link);

  const filteredItems = publicationItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={navigate} />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tighter">
            Publications Officielles
          </h2>
          <p className="mt-2 text-slate-600 max-w-2xl mx-auto">
            Accédez à l'ensemble des informations et décisions relatives aux marchés publics en Côte d'Ivoire.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4 md:p-6 mb-8 md:mb-12 sticky top-24 z-40">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="search" className="text-xs font-semibold text-slate-600">Rechercher</Label>
                <div className="relative mt-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Rechercher par mot-clé..."
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="category" className="text-xs font-semibold text-slate-600">Catégorie</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger id="category" className="w-full mt-1">
                        <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map(category => (
                            <SelectItem key={category.id} value={category.id}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              </div>
            </div>
        </div>

        {/* Grid/List Toggle and Results Count */}
        <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-slate-500">
                <span className="font-semibold text-slate-700">{filteredItems.length}</span>
                {filteredItems.length > 1 ? ' résultats trouvés' : ' résultat trouvé'}
            </p>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                <Button size="sm" variant={viewMode === 'grid' ? 'default' : 'ghost'} onClick={() => setViewMode('grid')}>
                    <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button size="sm" variant={viewMode === 'list' ? 'default' : 'ghost'} onClick={() => setViewMode('list')}>
                    <List className="w-4 h-4" />
                </Button>
            </div>
        </div>

        {/* Results Grid */}
        <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2}}
        >
          {filteredItems.map((item) => (
            <motion.div layout key={item.id}>
                <PublicationCard item={item} onNavigate={handleCardClick} />
            </motion.div>
          ))}
        </motion.div>

        {filteredItems.length === 0 && (
            <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-2xl">
                <p className="text-slate-500">Aucune publication ne correspond à vos critères de recherche.</p>
            </div>
        )}

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-2">
            <Button variant="outline">Précédent</Button>
            <Button variant="default">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">Suivant</Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PublicationsPage;
