"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { Button } from "@/components/ui/Button"
import { Download, FileText, Paperclip } from "lucide-react"

// Mock data for a bidder's offer
const offreDetails = {
    documentsAdministratifs: [
        { id: "doc-admin-1", nom: "Statuts de l'entreprise.pdf", url: "#" },
        { id: "doc-admin-2", nom: "Attestation fiscale.pdf", url: "#" },
        { id: "doc-admin-3", nom: "Garantie de soumission.pdf", url: "#" },
    ],
    offreTechnique: [
        { id: "doc-tech-1", nom: "Mémoire technique.pdf", url: "#" },
        { id: "doc-tech-2", nom: "Fiches techniques produits.pdf", url: "#" },
        { id: "doc-tech-3", nom: "Planning prévisionnel.xlsx", url: "#" },
    ],
    offreFinanciere: [
        { id: "doc-fin-1", nom: "Bordereau des Prix Unitaires (BPU).pdf", url: "#" },
        { id: "doc-fin-2", nom: "Détail Quantitatif Estimatif (DQE).pdf", url: "#" },
    ]
}

function DocumentList({ title, documents }: { title: string, documents: {id: string, nom: string, url: string}[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base flex items-center">
                    <Paperclip className="h-4 w-4 mr-2" /> {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    {documents.map(doc => (
                        <li key={doc.id} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                            <div className="flex items-center">
                                <FileText className="h-5 w-5 mr-3 text-muted-foreground" />
                                <span className="text-sm font-medium">{doc.nom}</span>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                                <a href={doc.url} download>
                                    <Download className="h-4 w-4 mr-2" />
                                    Télécharger
                                </a>
                            </Button>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}

interface VueDetailsOffreProps {
    offre: typeof offreDetails;
}

export function VueDetailsOffre({ offre }: VueDetailsOffreProps) {
  return (
    <Tabs defaultValue="administratif" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="administratif">Pièces Administratives</TabsTrigger>
            <TabsTrigger value="technique">Offre Technique</TabsTrigger>
            <TabsTrigger value="financiere">Offre Financière</TabsTrigger>
        </TabsList>
        <TabsContent value="administratif" className="mt-4">
            <DocumentList title="Documents Administratifs" documents={offre.documentsAdministratifs} />
        </TabsContent>
        <TabsContent value="technique" className="mt-4">
            <DocumentList title="Documents Techniques" documents={offre.offreTechnique} />
        </TabsContent>
        <TabsContent value="financiere" className="mt-4">
            <DocumentList title="Documents Financiers" documents={offre.offreFinanciere} />
        </TabsContent>
    </Tabs>
  )
}
