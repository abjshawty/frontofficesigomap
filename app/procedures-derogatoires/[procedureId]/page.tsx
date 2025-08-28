"use client";

import { MainLayout } from "@/components/ui/MainLayout";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { ArrowLeft, FileText } from "lucide-react";
import { useRouter, useParams } from 'next/navigation';
import { Badge } from "@/components/ui/Badge";

// --- Mock Data ---
const getProcedureDetails = (procedureId: string) => {
  const allProcedures = {
    "PD001": {
      reference: "PD/2025/001",
      operationObjet: "Acquisition de logiciels spécifiques pour la DSI",
      type: "Gré à gré",
      statut: "Approuvée",
      createdAt: "12/07/2025",
      motif: "Monopole / Exclusivité technique",
      documents: [{ nom: "Rapport de justification de monopole.pdf", url: "#" }],
    },
    "PD002": {
      reference: "PD/2025/002",
      operationObjet: "Prestation de maintenance sur équipement lourd",
      type: "Consultation restreinte",
      statut: "En validation",
      createdAt: "18/07/2025",
      entreprises: "Société A, Entreprise B, Tech Corp",
      documents: [{ nom: "Note de présentation des entreprises.docx", url: "#" }],
    },
     "PD003": {
      reference: "PD/2025/003",
      operationObjet: "Réfection urgente de la toiture du bâtiment A",
      type: "Autorisation d'anticipation",
      statut: "Brouillon",
      createdAt: "22/07/2025",
      documents: [{ nom: "Rapport d'expertise urgence.pdf", url: "#" }, { nom: "Devis estimatif.xlsx", url: "#" }],
    },
  };
  // @ts-ignore
  return allProcedures[procedureId] || { ...allProcedures["PD003"], reference: `PD/2025/${procedureId}` };
};

// --- Helper Components ---
const DetailItem = ({ label, value }: { label: string; value: string | number | undefined }) => (
    value ? (
        <div className="grid grid-cols-3 gap-4 py-3 border-b">
            <dt className="text-sm font-medium text-gray-500">{label}</dt>
            <dd className="text-sm text-gray-900 col-span-2">{value}</dd>
        </div>
    ) : null
);

const statusVariants = {
    "Brouillon": "secondary",
    "En validation": "en-ente",
    "Approuvée": "actif",
    "Rejetée": "destructive",
} as const;


export default function ProcedureDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { procedureId } = params;

  const procedure = getProcedureDetails(procedureId as string);

  const renderDynamicDetails = () => {
      switch (procedure.type) {
          case "Gré à gré":
              return <DetailItem label="Motif réglementaire" value={procedure.motif} />;
          case "Consultation restreinte":
              return <DetailItem label="Entreprises consultées" value={procedure.entreprises} />;
          default:
              return null;
      }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => router.push('/procedures-derogatoires')}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold">Détails de la demande : {procedure.reference}</h1>
                        <Badge variant={statusVariants[procedure.statut as keyof typeof statusVariants] || "default"}>
                            {procedure.statut}
                        </Badge>
                    </div>
                    <p className="text-muted-foreground max-w-2xl">
                        Consultez les informations relatives à cette demande de procédure dérogatoire.
                    </p>
                </div>
            </div>
            {procedure.statut === "Brouillon" && (
                <Button onClick={() => alert("Redirection vers la page d'édition")}>
                    Modifier le Brouillon
                </Button>
            )}
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle>Informations sur la Demande</CardTitle>
            </CardHeader>
            <CardContent>
                <dl>
                    <DetailItem label="Opération concernée" value={procedure.operationObjet} />
                    <DetailItem label="Type de demande" value={procedure.type} />
                    <DetailItem label="Date de création" value={procedure.createdAt} />
                    {renderDynamicDetails()}
                </dl>
            </CardContent>
        </Card>

         <Card>
            <CardHeader>
                <CardTitle>Pièces Justificatives</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {procedure.documents.map((doc, index) => (
                        <a 
                            href={doc.url} 
                            key={index} 
                            className="flex items-center p-3 rounded-md border hover:bg-gray-50 transition-colors"
                            download
                        >
                            <FileText className="h-5 w-5 mr-3 text-sigomap-bleu" />
                            <span className="text-sm font-medium">{doc.nom}</span>
                        </a>
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
