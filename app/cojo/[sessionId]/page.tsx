"use client"

import Link from "next/link";
import { MainLayout } from "@/components/ui/MainLayout";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Check, Clock, FileText, Loader, ArrowLeft, AlertTriangle } from "lucide-react";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/Dialog"
import { Separator } from "@/components/ui/separator";
import { VueDetailsSessionCojo } from "@/components/cojo/VueDetailsSessionCojo";
import { VuePreValidationSessionCojo } from "@/components/cojo/VuePreValidationSessionCojo";

// --- Mock Data ---
const sessions: Record<string, any> = {
    "COJO-001": {
        id: "COJO-001",
        reference: "AO-2023-012",
        object: "Construction d'un nouveau bâtiment administratif",
        openingDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(), // Opens in 24 hours
        status: "À venir",
        soumissionnaires: []
    },
    "COJO-002": {
        id: "COJO-002",
        reference: "AO-2023-015",
        object: "Fourniture de matériel informatique pour les écoles",
        openingDate: new Date().toISOString(),
        status: "En cours",
        soumissionnaires: [
            { id: "OE-01", name: "Tech Solutions SARL", status: "Évalué", evaluation: { compliant: true, score: 85 } },
            { id: "OE-02", name: "Global Office Supplies", status: "En attente", evaluation: null },
            { id: "OE-03", name: "Info Distribution SA", status: "Évalué", evaluation: { compliant: false, reason: "Dossier incomplet" } },
            { id: "OE-04", name: "Le Fournisseur Local", status: "En cours", evaluation: null },
        ]
    }
};

// --- Helper Functions ---
function getStatusIcon(status: string) {
    switch (status) {
        case "Évalué": return <Check className="h-5 w-5 text-green-500" />;
        case "En attente": return <Clock className="h-5 w-5 text-gray-500" />;
        case "En cours": return <Loader className="h-5 w-5 text-blue-500 animate-spin" />;
        default: return null;
    }
}

// --- Main Page Component ---
export default function CojoSessionWorkspacePage({ params }: { params: { sessionId: string } }) {
    const [view, setView] = useState<'list' | 'pre-validation'>('list');
    
    // In a real app, you'd fetch this data.
    const sessionDetails = sessions[params.sessionId];
    
    if (!sessionDetails) {
        return (
            <MainLayout>
                <div className="text-center">
                    <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
                    <h2 className="mt-4 text-xl font-semibold">Session non trouvée</h2>
                    <p className="mt-2 text-muted-foreground">Impossible de trouver les détails pour la session ID: {params.sessionId}</p>
                    <Button asChild className="mt-6">
                        <Link href="/cojo">Retour au tableau de bord</Link>
                    </Button>
                </div>
            </MainLayout>
        );
    }

    const isSealed = new Date(sessionDetails.openingDate) > new Date();

    const isPresident = true; // This should be based on user role
    const allEvaluated = sessionDetails.soumissionnaires.every((s:any) => s.status === "Évalué");
    const handleConfirmCloture = () => {
        console.log("Session clôturée !");
        // Here you would trigger the API call to close the session
        // and likely redirect the user.
        alert("La session a été clôturée avec succès.");
    }

    return (
        <MainLayout>
            <div className="space-y-6">
                {/* Header and Back Button */}
                <div className="flex items-center space-x-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/cojo"><ArrowLeft className="h-4 w-4" /></Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">Espace de Travail: {sessionDetails.reference}</h1>
                        <p className="text-muted-foreground">{sessionDetails.object}</p>
                    </div>
                </div>

                {isSealed ? (
                    <div>Session scellée - Ouverture le: {new Date(sessionDetails.openingDate).toLocaleDateString()}</div>
                ) : sessionDetails.status === 'pre-validation' ? (
                    <div className="mt-8">
                        <VuePreValidationSessionCojo onConfirmCloture={handleConfirmCloture} />
                    </div>
                ) : (
                    <div className="mt-8">
                        <VueDetailsSessionCojo sessionDetails={sessionDetails} />
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
