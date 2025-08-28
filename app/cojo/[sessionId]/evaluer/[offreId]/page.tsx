"use client"

import Link from "next/link";
import { MainLayout } from "@/components/ui/MainLayout";
import { Separator } from "@/components/ui/separator"
import { VueDetailsOffre } from "@/components/cojo/VueDetailsOffre"
import { FormulaireEvaluationOffre } from "@/components/cojo/FormulaireEvaluationOffre";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

// Mock data to find the offer being evaluated
const soumissionnaires = {
    "OE-01": { name: "Tech Solutions SARL" },
    "OE-02": { name: "Global Office Supplies" },
    "OE-03": { name: "Info Distribution SA" },
    "OE-04": { name: "Le Fournisseur Local" },
};

export default function EvaluationPage({ params }: { params: { sessionId: string, offreId: string } }) {
    const soumissionnaire = soumissionnaires[params.offreId as keyof typeof soumissionnaires];

    if (!soumissionnaire) {
        return (
            <MainLayout>
                <div>Offre non trouvée</div>
                <Button asChild variant="outline">
                    <Link href={`/cojo/${params.sessionId}`}>Retour</Link>
                </Button>
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <div className="space-y-6">
                 {/* Header and Back Button */}
                 <div className="flex items-center space-x-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={`/cojo/${params.sessionId}`}><ArrowLeft className="h-4 w-4" /></Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">Évaluation de l'offre</h1>
                        <p className="text-muted-foreground">
                            Soumissionnaire: <span className="font-semibold">{soumissionnaire.name}</span>
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <FormulaireEvaluationOffre />
                    </div>
                    <div>
                        <VueDetailsOffre offre={{
                            documentsAdministratifs: [],
                            offreTechnique: [],
                            offreFinanciere: []
                        }} />
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
