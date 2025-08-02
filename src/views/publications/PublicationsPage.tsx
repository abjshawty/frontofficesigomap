import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  DollarSign, 
 
  Eye,
  Download,
  Bookmark,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

const PublicationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Données simulées des publications
  const publications = [
    {
      id: 1,
      title: "Fourniture de matériel informatique pour l'administration",
      category: "Fournitures",
      location: "Abidjan",
      budget: "15 000 000 FCFA",
      deadline: "2024-02-15",
      status: "En cours",
      description: "Acquisition de matériel informatique pour moderniser les équipements administratifs."
    },
    {
      id: 2,
      title: "Construction d'un centre de santé communautaire",
      category: "Travaux",
      location: "Bouaké",
      budget: "45 000 000 FCFA",
      deadline: "2024-03-20",
      status: "Nouveau",
      description: "Construction et équipement d'un centre de santé pour améliorer l'accès aux soins."
    },
    {
      id: 3,
      title: "Services de maintenance des véhicules administratifs",
      category: "Services",
      location: "Yamoussoukro",
      budget: "8 500 000 FCFA",
      deadline: "2024-02-28",
      status: "En cours",
      description: "Contrat de maintenance préventive et curative pour la flotte de véhicules."
    },
    {
      id: 4,
      title: "Formation du personnel en gestion administrative",
      category: "Services",
      location: "San-Pédro",
      budget: "12 000 000 FCFA",
      deadline: "2024-03-10",
      status: "Nouveau",
      description: "Programme de formation continue pour renforcer les compétences du personnel."
    }
  ];

  const categories = [
    { id: 'all', name: 'Toutes les catégories' },
    { id: 'fournitures', name: 'Fournitures' },
    { id: 'travaux', name: 'Travaux' },
    { id: 'services', name: 'Services' }
  ];

  const filteredPublications = publications.filter(pub => {
    const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pub.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           pub.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Nouveau':
        return 'bg-green-100 text-green-800';
      case 'En cours':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-medium text-foreground">SIGOMAP</h1>
                <p className="text-xs text-muted-foreground">Publications des marchés publics</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="border-border hover:bg-green-pastel"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à l'accueil
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/adhesion')}
                className="border-primary text-primary hover:bg-accent"
              >
                Créez votre compte entreprise
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête de la page */}
        <div className="mb-8">
          <h2 className="text-3xl font-medium text-foreground mb-2">
            Publications des marchés publics
          </h2>
          <p className="text-muted-foreground">
            Consultez les derniers appels d'offres et opportunités d'affaires
          </p>
        </div>

        {/* Filtres et recherche */}
        <Card className="border border-border mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="search">Rechercher</Label>
                <div className="relative mt-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Rechercher par titre ou description..."
                    className="pl-10 bg-light-gray-7 border-border"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="category">Catégorie</Label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-border bg-light-gray-7 focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Sélectionner une catégorie"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-end">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des publications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPublications.map((publication) => (
            <Card key={publication.id} className="border border-border hover:border-primary/50 transition-colors">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{publication.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(publication.status)}`}>
                        {publication.status}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {publication.location}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {publication.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{publication.budget}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Échéance: {publication.deadline}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 pt-4 border-t border-border">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Eye className="w-4 h-4 mr-2" />
                    Voir les détails
                  </Button>
                  <Button size="sm" variant="outline" className="border-border">
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger
                  </Button>
                  <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-border">
              Précédent
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              1
            </Button>
            <Button variant="outline" size="sm" className="border-border">
              2
            </Button>
            <Button variant="outline" size="sm" className="border-border">
              3
            </Button>
            <Button variant="outline" size="sm" className="border-border">
              Suivant
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PublicationsPage; 