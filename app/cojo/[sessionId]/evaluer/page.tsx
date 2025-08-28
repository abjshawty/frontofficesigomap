"use client"

import { MainLayout } from "@/components/ui/MainLayout";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function SelectOffrePage({ params }: { params: { sessionId: string } }) {
  return (
    <MainLayout>
        <div className="flex items-center space-x-4 mb-6">
            <Button variant="outline" size="icon" asChild>
                <Link href={`/cojo/${params.sessionId}`}><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <div>
                <h1 className="text-2xl font-bold">Sélectionner une offre</h1>
                <p className="text-muted-foreground">
                    Vous devez choisir une offre spécifique à évaluer.
                </p>
            </div>
        </div>
        <Card className="max-w-md mx-auto mt-10 text-center">
            <CardHeader>
                <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500" />
                <CardTitle className="mt-4">Aucune offre sélectionnée</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-6 text-muted-foreground">
                    Pour continuer, veuillez retourner à la liste des soumissionnaires et cliquer sur le bouton "Évaluer" de l'offre de votre choix.
                </p>
                <Button asChild>
                    <Link href={`/cojo/${params.sessionId}`}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour à la session {params.sessionId}
                    </Link>
                </Button>
            </CardContent>
        </Card>
    </MainLayout>
  );
}
