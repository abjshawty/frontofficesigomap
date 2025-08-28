"use client"

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { MainLayout } from "@/components/ui/MainLayout";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/checkbox";
import { Rocket, PenSquare, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


// TODO: Fetch real data
const marche = {
    reference: 'MAR-2023-001',
    objet: 'Fourniture de matériel informatique',
};


export default function FinaliserMarchePage({ params }: { params: { marcheId: string } }) {
    // Ideally, these dates would come from state managed by a form library
    const dateDebut = "2024-08-01"; 
    const dateFin = "2025-07-31";

    return (
        <MainLayout>
            <div className="space-y-8">
                 <div>
                    <h1 className="text-2xl font-bold tracking-tight">Finalisation du Marché</h1>
                    <p className="text-muted-foreground">{marche.reference} - {marche.objet}</p>
                </div>
                
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <PenSquare className="mr-2 h-5 w-5" />
                            Étape 1 : Confirmation des Signatures
                        </CardTitle>
                        <CardDescription>
                           Enregistrez les dates de signature du marché par les deux parties.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="date-signature-ac">Date de signature (Autorité Contractante)</Label>
                                <Input id="date-signature-ac" type="date" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="date-signature-oe">Date de signature (Attributaire)</Label>
                                <Input id="date-signature-oe" type="date" />
                            </div>
                        </div>
                         <div className="flex items-center space-x-2 pt-2">
                            <Checkbox id="garantie" />
                            <Label htmlFor="garantie">
                                Confirmer que la garantie de bonne exécution a été déposée par l'OE.
                            </Label>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                     <CardHeader>
                        <CardTitle className="flex items-center">
                            <Rocket className="mr-2 h-5 w-5" />
                           Étape 2 : Émission de l'Ordre de Service de Démarrage
                        </CardTitle>
                        <CardDescription>
                           Précisez les dates clés pour le démarrage effectif du marché.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="date-debut">Date de début d'exécution</Label>
                                <Input id="date-debut" type="date" defaultValue={dateDebut} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="date-fin">Date de fin d'exécution</Label>
                                <Input id="date-fin" type="date" defaultValue={dateFin} />
                            </div>
                        </div>
                        <div className="text-right pt-4">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button>Émettre l'OS de démarrage</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="flex items-center">
                                            <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
                                            Confirmer le Démarrage du Marché
                                        </AlertDialogTitle>
                                        <AlertDialogDescription asChild>
                                            <div className="space-y-4 pt-4 text-sm">
                                                <p>
                                                    Vous êtes sur le point d'émettre l'Ordre de Service pour le marché <strong className="font-medium text-foreground">{marche.reference}</strong>.
                                                </p>
                                                <div className="rounded-lg border bg-muted p-4">
                                                    <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2">
                                                        <dt className="text-muted-foreground">Date de début d'exécution:</dt>
                                                        <dd className="font-semibold text-foreground text-right">{dateDebut}</dd>
                                                        <dt className="text-muted-foreground">Date de fin d'exécution:</dt>
                                                        <dd className="font-semibold text-foreground text-right">{dateFin}</dd>
                                                    </dl>
                                                </div>
                                                <p className="text-amber-600">
                                                    Attention, cette action est irréversible. Le statut du marché deviendra <Badge variant="actif">Démarré</Badge>.
                                                </p>
                                            </div>
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                                        <AlertDialogAction>Confirmer et Émettre</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </MainLayout>
    )
}
