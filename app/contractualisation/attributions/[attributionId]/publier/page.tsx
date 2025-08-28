"use client"

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { MainLayout } from "@/components/ui/MainLayout";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// This type is a placeholder
type AttributionDetails = {
    id: string;
    reference: string;
    objet: string;
    attributaire: string;
    montant: string;
};


// Mock data - in a real app, you'd fetch this based on the ID
const getAttributionDetails = (id: string): AttributionDetails | null => {
    if (id === "1") {
        return { id: "1", reference: 'DAO-2023-001', objet: 'Construction de bureaux', attributaire: "Entreprise BTP SARL", montant: "125,000,000 XOF" };
    }
    return null;
}

export default function PublierAttributionPage() {
    const params = useParams();
    const [attribution, setAttribution] = useState<AttributionDetails | null>(null);
    const [loading, setLoading] = useState(true);
    
    const attributionId = Array.isArray(params.attributionId) ? params.attributionId[0] : params.attributionId;

    useEffect(() => {
        if (attributionId) {
            const data = getAttributionDetails(attributionId);
            setAttribution(data);
        }
        setLoading(false);
    }, [attributionId]);

    if (loading) {
        return (
            <MainLayout>
                <div className="flex items-center justify-center h-full">
                    <p>Chargement...</p>
                </div>
            </MainLayout>
        )
    }

    if (!attribution) {
        return (
            <MainLayout>
                <div className="flex items-center justify-center h-full">
                    <p>Attribution non trouvée.</p>
                </div>
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>Publier les résultats de l'attribution</CardTitle>
                    <CardDescription>
                        Veuillez vérifier les informations ci-dessous avant de procéder à la publication des résultats. Cette action est publique et notifiera les soumissionnaires.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="font-semibold">Référence de la procédure:</div>
                        <div>{attribution.reference}</div>

                        <div className="font-semibold">Objet du marché:</div>
                        <div>{attribution.objet}</div>

                        <div className="font-semibold">Attributaire provisoire:</div>
                        <div>{attribution.attributaire}</div>
                        
                        <div className="font-semibold">Montant de l'offre retenue:</div>
                        <div>{attribution.montant}</div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                    <Button variant="outline" asChild>
                        <Link href="/contractualisation/attributions">Annuler</Link>
                    </Button>
                    <Button>
                        Confirmer et Publier
                    </Button>
                </CardFooter>
            </Card>
        </MainLayout>
    )
}
