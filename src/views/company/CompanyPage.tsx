import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Info, Download, CheckSquare, ChevronRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

const CompanyPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Données simulées de l'entreprise
  const companyData = {
    ncc: 'CNT25072167570',
    raisonSociale: 'ETS FIRDAOUS',
    paysOrigine: 'France',
    adresse: 'FRANCE',
    telephone: '-',
    email: 'firdaous@test.ci',
    statut: 'Actif',
    dateDebut: '21/07/2025 10:46',
    dateModification: '21/07/2025 11:00'
  };

  // Fonction pour obtenir la couleur du badge de statut
  const getStatusBadge = (statut: string) => {
    switch (statut.toLowerCase()) {
      case 'actif':
      case 'valide':
        return <Badge className="bg-primary/10 text-primary">Actif</Badge>;
      case 'inactif':
        return <Badge className="bg-gray-100 text-gray-800">Inactif</Badge>;
      case 'en attente':
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      case 'rejeté':
        return <Badge className="bg-red-100 text-red-800">Rejeté</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{statut}</Badge>;
    }
  };

  // Données simulées des documents
  const documents = [
    {
      nature: 'Pièce jointe',
      libelle: 'img20250113_16114531.pdf',
      statut: 'Valide',
      date: '-',
      id: 1
    },
    {
      nature: 'Autorisation mandataire signée',
      libelle: 'img20250113_16114531.pdf',
      statut: 'Valide',
      date: '-',
      id: 2
    },
    {
      nature: 'Pièce d\'identité',
      libelle: 'img20250113_16114531.pdf',
      statut: 'Valide',
      date: '-',
      id: 3
    }
  ];

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="px-0">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" onClick={handleGoBack} className="border-border hover:bg-accent">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-foreground">Compte entreprise</h1>
          <Info className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      {/* Informations clés */}
      <Card className="border-border bg-white mb-6">
        <CardHeader className="bg-light-gray-1 border-b border-border">
          <CardTitle>Informations clés</CardTitle>
        </CardHeader>
        <CardContent className="p-6 bg-almost-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">NCC:</p>
                <p className="font-semibold">{companyData.ncc}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Raison sociale:</p>
                <p className="font-semibold">{companyData.raisonSociale}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pays d'origine:</p>
                <p className="font-semibold">{companyData.paysOrigine}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Adresse:</p>
                <p className="font-semibold">{companyData.adresse}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Téléphone:</p>
                <p className="font-semibold">{companyData.telephone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email:</p>
                <p className="font-semibold">{companyData.email}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informations générales */}
      <Card className="border-border bg-white mb-6">
        <CardHeader className="bg-light-gray-1 border-b border-border">
          <CardTitle>Informations générales</CardTitle>
        </CardHeader>
        <CardContent className="p-6 bg-almost-white">
                     <div>
             <p className="text-sm text-muted-foreground mb-2">Statut:</p>
             {getStatusBadge(companyData.statut)}
           </div>
        </CardContent>
      </Card>

      {/* Informations complémentaires */}
      <Card className="border-border bg-white mb-6">
        <CardHeader className="bg-light-gray-1 border-b border-border">
          <CardTitle>Informations complémentaires</CardTitle>
        </CardHeader>
        <CardContent className="p-6 bg-almost-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Date début:</p>
              <p className="font-semibold">{companyData.dateDebut}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date modification:</p>
              <p className="font-semibold">{companyData.dateModification}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Démarrer une procédure */}
      <Card className="border-border bg-white mb-6">
        <CardHeader className="bg-light-gray-1 border-b border-border">
          <CardTitle>Démarrer une procédure sur ce dossier</CardTitle>
        </CardHeader>
        <CardContent className="p-6 bg-almost-white">
          <p className="text-sm text-muted-foreground mb-4">
            Veuillez sélectionner la procédure que vous souhaitez initier grâce aux boutons ci-dessous.
          </p>
          <div className="p-4 border border-border rounded-lg hover:bg-light-gray-7 cursor-pointer transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Mise à jour d'un tiers</h3>
                <p className="text-sm text-muted-foreground">
                  Mise à jour des informations d'un tiers (raison sociale, blacklisting, etc.)
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des documents joints */}
      <Card className="border-border bg-white mb-6">
        <CardHeader className="bg-light-gray-1 border-b border-border">
          <CardTitle>LISTE DES DOCUMENTS JOINTS</CardTitle>
        </CardHeader>
        <CardContent className="p-6 bg-almost-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Afficher 3 éléments</span>
              <span className="text-sm text-muted-foreground">Choix des colonnes</span>
            </div>
            <Button variant="outline" className="border-border">
              Export Excel
            </Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow className="bg-primary/90 text-white font-semibold">
                <TableHead className="text-white">NATURE DE LA PIÈCE</TableHead>
                <TableHead className="text-white">LIBELLÉ DU DOCUMENT</TableHead>
                <TableHead className="text-white">STATUT</TableHead>
                <TableHead className="text-white">DATE DU DOCUMENT</TableHead>
                <TableHead className="text-white">ACCÈS AUX DÉTAILS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>{doc.nature}</TableCell>
                  <TableCell>{doc.libelle}</TableCell>
                                     <TableCell>
                     {getStatusBadge(doc.statut)}
                   </TableCell>
                  <TableCell>{doc.date}</TableCell>
                                     <TableCell>
                     <div className="flex items-center gap-2">
                       <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                         <Download className="w-4 h-4 text-gray-600" />
                       </Button>
                       <CheckSquare className="w-4 h-4 text-gray-400" />
                     </div>
                   </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="flex items-center justify-center gap-2 mt-4">
            <Button variant="outline" size="sm" className="border-border">
              &lt;&lt;
            </Button>
            <Button variant="outline" size="sm" className="border-border">
              &lt;
            </Button>
            <Button variant="outline" size="sm" className="border-border">
              &gt;
            </Button>
            <Button variant="outline" size="sm" className="border-border">
              &gt;&gt;
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pièces justificatives */}
      <Card className="border-border bg-white mb-6">
        <CardHeader className="bg-light-gray-1 border-b border-border">
          <CardTitle>Pièces justificatives</CardTitle>
        </CardHeader>
        <CardContent className="p-6 bg-almost-white">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">
                Nature du document (*)
              </label>
              <Select>
                <SelectTrigger className="w-full mt-2">
                  <SelectValue placeholder="Sélectionner une valeur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="piece-identite">Pièce d'identité</SelectItem>
                  <SelectItem value="autorisation">Autorisation mandataire</SelectItem>
                  <SelectItem value="piece-jointe">Pièce jointe</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bouton Confirmer */}
      <div className="flex justify-end">
        <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-2">
          Confirmer
        </Button>
      </div>
    </div>
  );
};

export default CompanyPage;