import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Building2, ArrowLeft, Download, Printer, Share2, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
// import Breadcrumbs from '../../components/layout/Breadcrumbs';

type OperationDetails = {
  reference: string;
  objet: string;
  ministere: string;
  autorite: string;
  typeOperation: string;
  nature: string;
  detailNature: string;
  perimetrePublication: string;
  reservePME: string;
  budget: string;
  exercice: string;
  lieuVille: string;
  lieuPays: string;
  financementSource: string;
  bailleur: string;
  calendrier: Array<{ etape: string; date: string }>; 
};

// Données d'exemple; à remplacer par un fetch API ultérieurement
const mockDetails = (ref: string): OperationDetails => ({
  reference: ref,
  objet: 'TEST CRITERES',
  ministere: 'Ministère des Finances et du Budget',
  autorite: 'AEPE',
  typeOperation: 'Procédure simplifiée à compétition limitée',
  nature: 'Fournitures',
  detailNature: 'Fournitures informatiques',
  perimetrePublication: 'Nationale',
  reservePME: 'NON',
  budget: 'Budget projet 2025',
  exercice: '2025',
  lieuVille: 'Abidjan',
  lieuPays: "Côte d'Ivoire",
  financementSource: 'Trésor',
  bailleur: "État de Côte d'Ivoire",
  calendrier: [
    { etape: 'Transmission du dossier à la DCMP', date: '04/09/2025' },
    { etape: "Examen par la DCMP", date: '12/09/2025' },
    { etape: 'Prise en compte des observations', date: '20/09/2025' },
  ],
});

// Ancien composant Section (non utilisé); conservé ici si besoin futur

const DefinitionGrid: React.FC<{ items: { label: string; value: React.ReactNode }[] }> = ({ items }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {items.map((item, idx) => (
      <div key={idx} className="space-y-1">
        <p className="text-xs text-slate-500">{item.label}</p>
        <p className="font-medium break-words">{item.value}</p>
      </div>
    ))}
  </div>
);

const OperationDetailsPage: React.FC = () => {
  const { operationRef } = useParams();
  const details = React.useMemo(() => mockDetails(operationRef || ''), [operationRef]);

  return (
    <div className="space-y-6">
      {/* Barre de titre + retour */}
      <div className="flex items-center gap-4">
        <Link to="/operations/passation-plans">
          <Button variant="outline" className="border-border hover:bg-green-pastel">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la liste
          </Button>
        </Link>
        <h2 className="text-xl font-bold text-foreground">Détail de l’opération</h2>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Colonne principale */}
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
                  <p className="font-mono font-semibold text-lg">{details.reference}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Nature</p>
                  <Badge variant="outline" className="border-border bg-light-gray-7 text-base px-3 py-1">{details.nature}</Badge>
                </div>
                <div className="space-y-2 lg:col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Objet</p>
                  <p className="text-foreground leading-relaxed text-base">{details.objet}</p>
                </div>
                <div className="space-y-2 lg:col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Ministère / Institution</p>
                  <p className="text-sm flex items-center gap-2"><Building2 className="w-4 h-4 text-slate-500" />{details.ministere}</p>
                </div>
                <div className="space-y-2 lg:col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Autorité contractante</p>
                  <p className="font-semibold">{details.autorite}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-primary/10 text-primary border-primary/20">{details.typeOperation}</Badge>
                <Badge variant="secondary">{details.perimetrePublication}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Informations sur l’opération */}
          <Card className="border-border bg-white">
            <CardHeader className="bg-light-gray-1 border-b border-border">
              <CardTitle>Informations sur l’opération</CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-almost-white">
              <DefinitionGrid items={[
                { label: 'Détail de la nature du marché', value: details.detailNature },
                { label: 'Type de marché', value: details.nature },
                { label: 'Part réservée aux PME', value: details.reservePME },
                { label: 'Périmètre de publication', value: details.perimetrePublication },
              ]} />
            </CardContent>
          </Card>

          {/* Budget */}
          <Card className="border-border bg-white">
            <CardHeader className="bg-light-gray-1 border-b border-border">
              <CardTitle>Informations budgétaires</CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-almost-white">
              <DefinitionGrid items={[
                { label: 'Budget', value: details.budget },
                { label: 'Exercice', value: details.exercice },
              ]} />
            </CardContent>
          </Card>

          {/* Géographiques */}
          <Card className="border-border bg-white">
            <CardHeader className="bg-light-gray-1 border-b border-border">
              <CardTitle>Informations géographiques</CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-almost-white">
              <DefinitionGrid items={[
                { label: "Lieu d’exécution (Ville)", value: details.lieuVille },
                { label: "Lieu d’exécution (Pays)", value: details.lieuPays },
              ]} />
            </CardContent>
          </Card>

          {/* Calendrier */}
          <Card className="border-border bg-white">
            <CardHeader className="bg-light-gray-1 border-b border-border">
              <CardTitle>Calendrier prévisionnel de déroulement</CardTitle>
            </CardHeader>
            <CardContent className="p-0 bg-almost-white">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-light-gray-2 border-b border-border">
                      <TableHead className="font-semibold">ÉTAPE</TableHead>
                      <TableHead className="w-40 font-semibold">DATE ENVISAGÉE</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {details.calendrier.map((row, idx) => (
                      <TableRow key={idx} className="border-b border-border hover:bg-green-pastel/20">
                        <TableCell className="text-sm py-4">{row.etape}</TableCell>
                        <TableCell className="text-sm text-slate-600 py-4">{row.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Financement */}
          <Card className="border-border bg-white">
            <CardHeader className="bg-light-gray-1 border-b border-border">
              <CardTitle>Financement envisagé</CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-almost-white">
              <DefinitionGrid items={[
                { label: 'Source de financement', value: details.financementSource },
                { label: 'Bailleur', value: details.bailleur },
              ]} />
            </CardContent>
          </Card>
        </div>

        {/* Panneau d’actions */}
        <div className="xl:col-span-1">
          <Card className="sticky top-8 border-border bg-white">
            <CardHeader className="bg-light-gray-1 border-b border-border">
              <CardTitle className="text-lg">Actions disponibles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6 bg-almost-white">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"><FileText className="w-4 h-4 mr-2" />Exporter en PDF</Button>
              <Button variant="outline" className="w-full border-border hover:bg-green-pastel"><Download className="w-4 h-4 mr-2" />Exporter Excel</Button>
              <Button variant="outline" className="w-full border-border hover:bg-green-pastel"><Printer className="w-4 h-4 mr-2" />Imprimer</Button>
              <Button variant="outline" className="w-full border-border hover:bg-green-pastel"><Share2 className="w-4 h-4 mr-2" />Partager</Button>
              <div className="mt-4 text-sm space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Budget</span>
                  <span className="font-medium">{details.budget}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Exercice</span>
                  <span className="font-medium">{details.exercice}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OperationDetailsPage;


