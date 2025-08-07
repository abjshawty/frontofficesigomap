// src/views/tenders/TenderListPage.tsx
import { useState } from "react";
import { 
  Filter, 
  Download, 
  Search, 
  Eye, 
  ArrowLeft, 
  Clock, 
  CreditCard, 
  Smartphone,
  ArrowLeft as ArrowLeftIcon
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../../components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../../components/ui/table";

interface AAOItem {
  id: string;
  reference: string;
  objet: string;
  autorite: string;
  nature: string;
  dateLimite: string;
  montantEstime?: number;
  lots?: Array<{
    numero: number;
    designation: string;
    quantite: string;
  }>;
}

const aaoData: AAOItem[] = [
  {
    id: "1",
    reference: "AO025052816564",
    objet: "Réhabilitation de six (06) bâtiments de trois (03) salles de classe dans la région du Bafing",
    autorite: "CONSEIL RÉGIONAL DU BAFING",
    nature: "Travaux",
    dateLimite: "2025-08-08T09:00:00",
    montantEstime: 25000000,
    lots: [
      { numero: 1, designation: "Lot 1 - Bâtiment A", quantite: "1" },
      { numero: 2, designation: "Lot 2 - Bâtiment B", quantite: "1" },
      { numero: 3, designation: "Lot 3 - Bâtiment C", quantite: "1" }
    ]
  },
  {
    id: "2",
    reference: "AO025091617239",
    objet: "Acquisition de photocopieuses, appareils électroménagers et matériel informatique",
    autorite: "COMMUNE D'ISSIA",
    nature: "Fournitures",
    dateLimite: "2025-08-01T10:00:00",
    montantEstime: 15000000
  },
  {
    id: "3",
    reference: "AO025091617240",
    objet: "Services de maintenance et entretien des équipements informatiques",
    autorite: "MINISTÈRE DE L'ÉDUCATION NATIONALE",
    nature: "Services",
    dateLimite: "2025-09-15T14:00:00",
    montantEstime: 8000000
  }
];

const TenderListPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [currentView, setCurrentView] = useState<'liste-aao' | 'detail-aao'>('liste-aao');
  const [selectedAAO, setSelectedAAO] = useState<AAOItem | null>(null);


  if (currentView === 'detail-aao' && selectedAAO) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => setCurrentView('liste-aao')}
            className="border-border hover:bg-green-pastel"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la liste
          </Button>
          <h2 className="text-xl font-bold text-foreground">
            Détail de l'Appel d'Offres
          </h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-6">
            {/* Informations clés */}
            <Card className="border-border bg-white">
              <CardHeader className="bg-light-gray-1 border-b border-border">
                <CardTitle>Informations clés</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6 bg-almost-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Référence</p>
                    <p className="font-mono font-semibold text-lg">{selectedAAO.reference}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Nature</p>
                    <Badge variant="outline" className="border-border bg-light-gray-7 text-base px-3 py-1">
                      {selectedAAO.nature}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Montant estimé</p>
                    <p className="font-bold text-xl text-primary">
                      {selectedAAO.montantEstime?.toLocaleString('fr-FR')} FCFA
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Date limite</p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-chart-4" />
                      <div>
                        <p className="font-semibold">
                          {new Date(selectedAAO.dateLimite).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          à {new Date(selectedAAO.dateLimite).toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Objet du marché */}
            <Card className="border-border bg-white">
              <CardHeader className="bg-light-gray-1 border-b border-border">
                <CardTitle>Informations sur l'avis d'appel d'offres</CardTitle>
              </CardHeader>
              <CardContent className="p-6 bg-almost-white space-y-6">
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">Objet du marché</p>
                  <p className="text-foreground leading-relaxed text-base">{selectedAAO.objet}</p>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">Autorité contractante</p>
                  <p className="font-semibold text-lg">{selectedAAO.autorite}</p>
                </div>
              </CardContent>
            </Card>

            {/* Lots */}
            {selectedAAO.lots && (
              <Card className="border-border bg-white">
                <CardHeader className="bg-light-gray-1 border-b border-border">
                  <CardTitle>Tableau des lots de l'avis d'appel d'offres</CardTitle>
                </CardHeader>
                <CardContent className="p-0 bg-almost-white">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-light-gray-2 border-b border-border">
                          <TableHead className="w-24 font-semibold">LOT</TableHead>
                          <TableHead className="min-w-80 font-semibold">DÉSIGNATION</TableHead>
                          <TableHead className="w-32 font-semibold">QUANTITÉ</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedAAO.lots.map((lot: any) => (
                          <TableRow key={lot.numero} className="border-b border-border hover:bg-green-pastel/20">
                            <TableCell className="font-semibold py-4">Lot {lot.numero}</TableCell>
                            <TableCell className="py-4">
                              <p className="leading-relaxed">{lot.designation}</p>
                            </TableCell>
                            <TableCell className="text-center font-medium py-4">{lot.quantite}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Documents */}
            <Card className="border-border bg-white">
              <CardHeader className="bg-light-gray-1 border-b border-border">
                <CardTitle>Liste des documents constitutifs du dossier d'appel à la concurrence</CardTitle>
              </CardHeader>
              <CardContent className="p-0 bg-almost-white">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-light-gray-2 border-b border-border">
                        <TableHead className="w-32 font-semibold">DATE</TableHead>
                        <TableHead className="min-w-64 font-semibold">DOCUMENT</TableHead>
                        <TableHead className="w-32 font-semibold">STATUT</TableHead>
                        <TableHead className="w-40 font-semibold">ACCÈS DÉTAILS</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-b border-border hover:bg-green-pastel/20">
                        <TableCell className="py-4">
                          {new Date().toLocaleDateString('fr-FR')}
                        </TableCell>
                        <TableCell className="py-4">
                          <p className="leading-relaxed">Dossier d'appel à la concurrence</p>
                        </TableCell>
                        <TableCell className="py-4">
                          <Badge className="bg-primary/10 text-primary border-primary/20">
                            Disponible
                          </Badge>
                        </TableCell>
                        <TableCell className="py-4">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-border hover:bg-green-pastel w-full"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Voir
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panel d'actions */}
          <div className="xl:col-span-1">
            <Card className="sticky top-8 border-border bg-white">
              <CardHeader className="bg-light-gray-1 border-b border-border">
                <CardTitle className="text-lg">Actions disponibles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6 bg-almost-white">
                <div className="p-6 bg-green-pastel/50 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-primary mb-3">Acquisition du dossier</h4>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Pour soumissionner, vous devez d'abord acquérir le dossier d'appel à la concurrence.
                  </p>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => {}}
                  >
                    Acquérir le dossier d'appel à la concurrence
                  </Button>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Prix du dossier:</span>
                    <span className="font-semibold text-lg">50 000 FCFA</span>
                  </div>
                  <div className="space-y-2">
                    <span className="text-muted-foreground font-medium">Modalités de paiement:</span>
                    <div className="space-y-1 pl-4">
                      <p className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-muted-foreground" />
                        Carte bancaire
                      </p>
                      <p className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-muted-foreground" />
                        Orange Money
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header avec navigation et export */}
      <header className="h-16 bg-light-gray-1 border-b border-border flex items-center justify-between px-6 header">
        <div className="flex items-center gap-4">
          <a 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300" 
            href="/dashboard"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Retour au tableau de bord</span>
          </a>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline"
            className="border-border hover:bg-green-pastel"
          >
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </header>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">
          Avis d'Appels d'Offres (AAO)
        </h2>
        <Button 
          variant="outline" 
          onClick={() => setShowFilters(!showFilters)}
          className="border-border hover:bg-green-pastel"
        >
          <Filter className="w-4 h-4 mr-2" />
          {showFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
        </Button>
      </div>

      {showFilters && (
        <Card className="border-border bg-white">
          <CardHeader className="bg-light-gray-1 border-b border-border">
            <CardTitle className="text-base">Filtres de recherche</CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-almost-white">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <Label>Référence</Label>
                <Input 
                  placeholder="AAO-..." 
                  className="mt-1 bg-light-gray-7 border-border" 
                />
              </div>
              <div>
                <Label>Étape</Label>
                <Select>
                  <SelectTrigger className="mt-1 bg-light-gray-7 border-border">
                    <SelectValue placeholder="Toutes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes</SelectItem>
                    <SelectItem value="ouvert">Ouvert</SelectItem>
                    <SelectItem value="ferme">Fermé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Nature</Label>
                <Select>
                  <SelectTrigger className="mt-1 bg-light-gray-7 border-border">
                    <SelectValue placeholder="Toutes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes</SelectItem>
                    <SelectItem value="travaux">Travaux</SelectItem>
                    <SelectItem value="fournitures">Fournitures</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Ministère</Label>
                <Select>
                  <SelectTrigger className="mt-1 bg-light-gray-7 border-border">
                    <SelectValue placeholder="Tous" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="mef">MEF</SelectItem>
                    <SelectItem value="ms">MS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Rechercher
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-border bg-white">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b border-border bg-light-gray-1">
            <div className="flex items-center gap-4">
              <Select defaultValue="10">
                <SelectTrigger className="w-32 bg-light-gray-7 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">Afficher 10</SelectItem>
                  <SelectItem value="25">Afficher 25</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                size="sm"
                className="border-border hover:bg-green-pastel"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Excel
              </Button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Rechercher..." 
                className="pl-10 w-full sm:w-64 bg-light-gray-7 border-border" 
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table className="bg-almost-white">
              <TableHeader>
                <TableRow className="bg-light-gray-2 border-b border-border">
                  <TableHead className="w-44 font-semibold">RÉFÉRENCE</TableHead>
                  <TableHead className="min-w-96 font-semibold">OBJET</TableHead>
                  <TableHead className="w-56 font-semibold">AUTORITÉ</TableHead>
                  <TableHead className="w-32 font-semibold">NATURE</TableHead>
                  <TableHead className="w-36 font-semibold">DATE LIMITE</TableHead>
                  <TableHead className="w-40 font-semibold">ACCÈS AUX DÉTAILS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {aaoData.map((item) => (
                  <TableRow key={item.id} className="border-b border-border hover:bg-green-pastel/20">
                    <TableCell className="font-mono text-sm py-4">{item.reference}</TableCell>
                    <TableCell className="py-4">
                      <div className="space-y-1">
                        <p className="text-sm leading-relaxed font-medium">{item.objet}</p>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <p className="text-sm leading-relaxed">{item.autorite}</p>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge variant="outline" className="border-border bg-light-gray-7 whitespace-nowrap">
                        {item.nature}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">
                          {new Date(item.dateLimite).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(item.dateLimite).toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedAAO(item);
                          setCurrentView('detail-aao');
                        }}
                        className="border-border hover:bg-green-pastel w-full"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Voir détails
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      </div>
  );
};

export default TenderListPage; 