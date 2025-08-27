"use client";

import { useState } from 'react';
import { MainLayout } from "@/components/ui/MainLayout";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { ArrowLeft, FileText, Users, List, Settings, CheckCircle } from "lucide-react";
import { useRouter, useParams } from 'next/navigation';
import { Badge } from "@/components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";

// --- Mock Data ---
const getDaoDetails = (daoId: string) => {
  const allDaos = {
    "DAO001": {
      reference: "DAO/2025/001",
      objet: "Construction d'un nouveau centre administratif",
      statut: "Validé",
      createdAt: "10/07/2025",
      validiteOffres: 90,
      garantieOffre: "Oui (2%)",
      garantieExecution: "Oui (5%)",
      lots: [
        { id: 1, libelle: "Lot 1: Gros œuvre", montant: "800 000 000 FCFA", delai: 120 },
        { id: 2, libelle: "Lot 2: Second œuvre", montant: "400 000 000 FCFA", delai: 90 },
      ],
      commission: ["Président (AC)", "Secrétaire (AC)", "Membre (DGMP)", "Membre (Budget)"],
      documents: [
        { nom: "Cahier des Clauses Administratives (CCAP)", type: "pdf", url: "#" },
        { nom: "Cahier des Clauses Techniques (CCTP)", type: "pdf", url: "#" },
        { nom: "Bordereau des Prix Unitaires (BPU)", type: "xls", url: "#" },
      ]
    },
    // ... Ajoutez d'autres DAO si nécessaire pour correspondre à la liste
  };
  // @ts-ignore
  return allDaos[daoId] || { ...allDaos["DAO001"], reference: `DAO/2025/${daoId}`, statut: "Brouillon" };
};


// --- Helper Components for Read-only View ---

const DetailItem = ({ label, value }: { label: string; value: string | number }) => (
  <>
    <dt className="text-sm font-medium text-gray-500 py-2 border-b">{label}</dt>
    <dd className="text-sm text-gray-900 py-2 border-b">{value}</dd>
  </>
);

const GeneralParamsView = ({ dao }: { dao: any }) => (
  <Card>
    <CardHeader>
      <CardTitle>Paramètres Généraux</CardTitle>
    </CardHeader>
    <CardContent>
      <dl className="grid grid-cols-2 gap-x-4">
        <DetailItem label="Référence" value={dao.reference} />
        <DetailItem label="Objet" value={dao.objet} />
        <DetailItem label="Durée de validité des offres" value={`${dao.validiteOffres} jours`} />
        <DetailItem label="Garantie d'offre exigée" value={dao.garantieOffre} />
        <DetailItem label="Garantie de bonne exécution exigée" value={dao.garantieExecution} />
      </dl>
    </CardContent>
  </Card>
);

const AllotissementView = ({ lots }: { lots: any[] }) => (
  <Card>
    <CardHeader>
      <CardTitle>Allotissement</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Lot</TableHead>
            <TableHead>Libellé</TableHead>
            <TableHead>Montant Estimatif</TableHead>
            <TableHead>Délai d'exécution (jours)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lots.map(lot => (
            <TableRow key={lot.id}>
              <TableCell>{lot.id}</TableCell>
              <TableCell>{lot.libelle}</TableCell>
              <TableCell>{lot.montant}</TableCell>
              <TableCell>{lot.delai}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

const CommissionView = ({ commission }: { commission: string[] }) => (
  <Card>
    <CardHeader>
      <CardTitle>Commission d'Ouverture et de Jugement (COJO)</CardTitle>
    </CardHeader>
    <CardContent>
       <ul className="list-disc pl-5 space-y-2">
            {commission.map((membre, index) => (
                <li key={index} className="text-sm">{membre}</li>
            ))}
        </ul>
    </CardContent>
  </Card>
);

const DocumentsView = ({ documents }: { documents: any[] }) => (
    <Card>
        <CardHeader>
            <CardTitle>Pièces du Dossier</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-2">
                {documents.map((doc, index) => (
                    <a 
                        href={doc.url} 
                        key={index} 
                        className="flex items-center p-3 rounded-md border hover:bg-gray-50 transition-colors"
                        download
                    >
                        <FileText className="h-5 w-5 mr-3 text-sigomap-bleu" />
                        <span className="text-sm font-medium">{doc.nom}</span>
                        <Badge variant="outline" className="ml-auto">{doc.type}</Badge>
                    </a>
                ))}
            </div>
        </CardContent>
    </Card>
);


const TABS = [
  "Paramètres Généraux",
  "Allotissement",
  "Commission (COJO)",
  "Pièces du Dossier",
];

export default function DaoDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { daoId } = params;
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const dao = getDaoDetails(daoId as string);

  const statusVariants = {
    "Brouillon": "secondary",
    "En validation": "en-attente",
    "Validé": "actif",
    "Rejeté": "destructive",
  } as const;

  const renderContent = () => {
    if (!dao) return <p>Chargement des détails du DAO...</p>;
    
    switch (activeTab) {
      case "Paramètres Généraux":
        return <GeneralParamsView dao={dao} />;
      case "Allotissement":
        return <AllotissementView lots={dao.lots} />;
      case "Commission (COJO)":
        return <CommissionView commission={dao.commission} />;
      case "Pièces du Dossier":
        return <DocumentsView documents={dao.documents} />;
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => router.push('/dao')}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold">Détails du DAO : {dao.reference}</h1>
                        <Badge variant={statusVariants[dao.statut as keyof typeof statusVariants] || "default"}>
                            {dao.statut}
                        </Badge>
                    </div>
                    <p className="text-muted-foreground max-w-2xl">
                        Consultez toutes les informations relatives à ce dossier d'appel d'offres.
                    </p>
                </div>
            </div>
            {dao.statut === "Brouillon" && (
                <Button onClick={() => router.push(`/dao/edit/${daoId}`)}>
                    Modifier le Brouillon
                </Button>
            )}
        </div>

        <Card>
          <CardHeader>
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`${
                      activeTab === tab
                        ? 'border-sigomap-bleu text-sigomap-bleu'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
          </CardHeader>
          <CardContent className="mt-6">
            {renderContent()}
          </CardContent>
        </Card>

      </div>
    </MainLayout>
  );
}
