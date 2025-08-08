import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { ArrowLeft, Download, Printer, Share2, FileText } from 'lucide-react';

const SoumissionDetailPage: React.FC = () => {
  const { id } = useParams();

  // Mock data basé sur la structure de l'image fournie
  const header = {
    refOffre: 'OFFR' + (id ?? 'XXXXXXXX'),
    statut: 'Ouverte',
  };

  const infoGenerales = {
    referenceAo: id ?? 'AOXXXXXXXXXXX',
    objet: "AMENAGEMENT D'UN CENTRE DE SANTE",
    nature: 'Travaux',
    autorite: 'PROJET DOUMBIA',
    ministere: 'Ministère des Finances et du Budget',
    etape: 'Consultation ouverte',
  };

  const infoAvis = {
    lieuSeance: 'TOUBA',
    contact: 'DOUMBIA FATIM',
    nbLots: 1,
    nbReunion: 1,
    dateVisite: '-',
    dateOuverture: '31/07/2025 15:16',
    dateLimite: '31/07/2025 15:16',
  };

  const infoOffre = {
    delaiValidite: 90,
  };

  const lots = [
    { num: 1, objet: "AMENAGEMENT D'UN CENTRE DE SANTE", variante: 'NON', lieuExec: 'TOUBA', delai: 100, garantie: 500000 },
  ];

  const financements = [
    { num: 1, source: 'Trésor', bailleur: "ETAT DE COTE D'IVOIRE" },
  ];

  return (
    <div className="space-y-6 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Barre de titre + retour (même logique que la page Détail d'opération) */}
      <div className="flex items-center gap-4">
        <Link to="/soumissions">
          <Button variant="outline" className="border-border hover:bg-green-pastel">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la liste
          </Button>
        </Link>
        <h2 className="text-xl font-bold text-foreground">Détail de l’opération</h2>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Colonne principale (2/3) */}
        <div className="xl:col-span-2 space-y-6">
          {/* Informations clés */}
          <Card className="border-border bg-white">
            <CardHeader className="bg-light-gray-1 border-b border-border">
              <CardTitle>Informations clés</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6 bg-almost-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Référence de l'offre</p>
                  <p className="font-mono font-semibold text-lg">{header.refOffre}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Statut de l'offre</p>
                  <p className="font-semibold">{header.statut}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informations concernant l'appel d'offres */}
          <Card className="border-border bg-white">
            <CardHeader className="bg-light-gray-1 border-b border-border">
              <CardTitle>Informations concernant l'appel d'offres</CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-almost-white text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-xs text-slate-500">Référence de l'appel d'offres</p>
                  <p className="font-mono">{infoGenerales.referenceAo}</p>
                  <p className="text-xs text-slate-500">Nature du marché</p>
                  <p>{infoGenerales.nature}</p>
                  <p className="text-xs text-slate-500">Autorité contractante</p>
                  <p>{infoGenerales.autorite}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-slate-500">Objet de l'appel d'offres</p>
                  <p>{infoGenerales.objet}</p>
                  <p className="text-xs text-slate-500">Ministère / Institution</p>
                  <p>{infoGenerales.ministere}</p>
                  <p className="text-xs text-slate-500">Étape de procédure</p>
                  <p>{infoGenerales.etape}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informations sur l'avis d'appel d'offres */}
          <Card className="border-border bg-white">
            <CardHeader className="bg-light-gray-1 border-b border-border">
              <CardTitle>Informations sur l'avis d'appel d'offres</CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-almost-white text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-xs text-slate-500">Lieu de la séance d'ouverture</p>
                  <p>{infoAvis.lieuSeance}</p>
                  <p className="text-xs text-slate-500">Nombre de lots</p>
                  <p>{infoAvis.nbLots}</p>
                  <p className="text-xs text-slate-500">Date d'ouverture technique</p>
                  <p>{infoAvis.dateOuverture}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-slate-500">Point de contact</p>
                  <p>{infoAvis.contact}</p>
                  <p className="text-xs text-slate-500">Nombre de réunion préparatoire</p>
                  <p>{infoAvis.nbReunion}</p>
                  <p className="text-xs text-slate-500">Date limite de réception</p>
                  <p>{infoAvis.dateLimite}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informations sur l'offre */}
          <Card className="border-border bg-white">
            <CardHeader className="bg-light-gray-1 border-b border-border">
              <CardTitle>Informations sur l'offre</CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-almost-white text-sm">
              <p><span className="text-xs text-slate-500">Délai de validité des offres en jours</span> : {infoOffre.delaiValidite}</p>
            </CardContent>
          </Card>

          {/* Tableau des lots */}
          <Card className="border-border bg-white">
            <CardHeader className="bg-light-gray-1 border-b border-border">
              <CardTitle>Tableau des lots de l'avis d'appel d'offres</CardTitle>
            </CardHeader>
            <CardContent className="p-0 bg-almost-white">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-light-gray-2 border-b border-border">
                      <TableHead className="w-24 font-semibold">NUMÉRO DU LOT</TableHead>
                      <TableHead className="font-semibold">OBJET DU LOT</TableHead>
                      <TableHead className="font-semibold">VARIANTE AUTORISÉE</TableHead>
                      <TableHead className="font-semibold">LIEU D'EXÉCUTION</TableHead>
                      <TableHead className="font-semibold">DÉLAI D'EXÉCUTION (JOURS)</TableHead>
                      <TableHead className="font-semibold">MONTANT DE LA GARANTIE DE SOUMISS.</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lots.map((l) => (
                      <TableRow key={l.num} className="border-b border-border hover:bg-green-pastel/20">
                        <TableCell> {l.num} </TableCell>
                        <TableCell> {l.objet} </TableCell>
                        <TableCell> {l.variante} </TableCell>
                        <TableCell> {l.lieuExec} </TableCell>
                        <TableCell> {l.delai} </TableCell>
                        <TableCell> {l.garantie.toLocaleString('fr-FR')} </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Tableau des sources de financement */}
          <Card className="border-border bg-white">
            <CardHeader className="bg-light-gray-1 border-b border-border">
              <CardTitle>Tableau des sources de financement</CardTitle>
            </CardHeader>
            <CardContent className="p-0 bg-almost-white">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-light-gray-2 border-b border-border">
                      <TableHead className="w-24 font-semibold">NUMÉRO DU LOT</TableHead>
                      <TableHead className="font-semibold">SOURCE DE FINANCEMENT</TableHead>
                      <TableHead className="font-semibold">BAILLEUR</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {financements.map((f) => (
                      <TableRow key={f.num} className="border-b border-border hover:bg-green-pastel/20">
                        <TableCell>{f.num}</TableCell>
                        <TableCell>{f.source}</TableCell>
                        <TableCell>{f.bailleur}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panneau d’actions (1/3) */}
        <div className="xl:col-span-1">
          <Card className="sticky top-8 border-border bg-white">
            <CardHeader className="bg-light-gray-1 border-b border-border">
              <CardTitle className="text-lg">Actions disponibles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6 bg-almost-white">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"><FileText className="w-4 h-4 mr-2" />Télécharger le dossier</Button>
              <Button variant="outline" className="w-full border-border hover:bg-green-pastel"><Download className="w-4 h-4 mr-2" />Exporter Excel</Button>
              <Button variant="outline" className="w-full border-border hover:bg-green-pastel"><Printer className="w-4 h-4 mr-2" />Imprimer</Button>
              <Button variant="outline" className="w-full border-border hover:bg-green-pastel"><Share2 className="w-4 h-4 mr-2" />Partager</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SoumissionDetailPage;


