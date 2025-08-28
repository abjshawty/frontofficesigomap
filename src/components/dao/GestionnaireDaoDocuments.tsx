"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Paperclip, Download, Trash2, FileText, UploadCloud } from 'lucide-react';

// Données de démonstration
type DocumentStatus = "Généré" | "Requis" | "Fourni" | "Optionnel";

const documents: {
    name: string;
    origin: string;
    status: DocumentStatus;
    file: string | null;
}[] = [
    {
        name: "Avis d'Appel d'Offres (AAO)",
        origin: "Système",
        status: "Généré",
        file: "AAO_DAO_2025_001.pdf",
    },
    {
        name: "Règlement Particulier de l'Appel d'Offres (RPAO)",
        origin: "Système",
        status: "Généré",
        file: "RPAO_DAO_2025_001.pdf",
    },
     {
        name: "Cahier des Clauses Administratives Particulières (CCAP)",
        origin: "Système",
        status: "Généré",
        file: "CCAP_DAO_2025_001.pdf",
    },
    {
        name: "Cahier des Clauses Techniques Particulières (CCTP)",
        origin: "AC",
        status: "Requis",
        file: null,
    },
    {
        name: "Bordereau des Prix Unitaires (BPU)",
        origin: "AC",
        status: "Requis",
        file: null,
    },
    {
        name: "Détail Quantitatif Estimatif (DQE)",
        origin: "AC",
        status: "Fourni",
        file: "DQE_DAO_2025_001.xlsx",
    },
    {
        name: "Plans et schémas techniques",
        origin: "AC",
        status: "Optionnel",
        file: null,
    }
];

const statusVariant: Record<DocumentStatus, string> = {
    "Généré": "actif",
    "Requis": "destructive",
    "Fourni": "en-attente",
    "Optionnel": "secondary",
}

export default function GestionnaireDaoDocuments({ daoId }: { daoId: string | string[] }) {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Pièces du Dossier d'Appel d'Offres</CardTitle>
        <CardDescription>
          Visualisez les documents générés par le système et joignez les pièces requises pour compléter le dossier.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nom du document</TableHead>
                    <TableHead>Origine</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {documents.map((doc) => (
                    <TableRow key={doc.name}>
                        <TableCell className="font-medium flex items-center">
                           <FileText className="h-4 w-4 mr-2 text-gray-500" /> 
                           {doc.name}
                        </TableCell>
                        <TableCell>{doc.origin}</TableCell>
                        <TableCell>
                            <Badge variant={statusVariant[doc.status] as any}>{doc.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                           {doc.status === "Généré" && (
                                <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4 mr-2" />
                                    Télécharger
                                </Button>
                           )}
                           {doc.origin === "AC" && !doc.file && (
                                <Button variant="default" size="sm">
                                    <UploadCloud className="h-4 w-4 mr-2" />
                                    Joindre
                                </Button>
                           )}
                           {doc.origin === "AC" && doc.file && (
                               <>
                                <span className="text-sm italic text-gray-500 mr-2">{doc.file}</span>
                                <Button variant="destructive" size="icon">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                               </>
                           )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
