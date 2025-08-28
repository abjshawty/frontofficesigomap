"use client"

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { MainLayout } from "@/components/ui/MainLayout";
import { Separator } from "@/components/ui/separator";
import { ArrowUp, ArrowDown, Ban, Check, FilePlus2, FileText, UserPlus, AlertTriangle } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"


// TODO: Fetch real data based on params.dossierId
const dossier = {
    reference: 'MAR-2023-002',
    objet: 'Entretien des locaux',
    autoriteContractante: 'Ministère de l\'Éducation',
    statut: 'Instruction en cours',
    assigneA: 'Jean Dupont',
    montant: '75,000,000 XOF'
};

type ActionType = "valider" | "transmettre" | "renvoyer" | "affecter" | "suspendre";

export default function DetailDossierValidationPage({ params }: { params: { dossierId: string } }) {
    const [actionToConfirm, setActionToConfirm] = useState<ActionType | null>(null);

    const actionDetails: Record<ActionType, { title: string; description: string; actionText: string; variant: "default" | "destructive" }> = {
        valider: {
            title: "Valider le marché",
            description: "Vous êtes sur le point de VALIDER ce marché. Cette action est irréversible et transmettra le dossier à l'Autorité Contractante. Confirmez-vous ?",
            actionText: "Confirmer la validation",
            variant: "default",
        },
        transmettre: {
            title: "Transmettre au N+1",
            description: "Vous êtes sur le point de transmettre ce dossier au niveau hiérarchique supérieur pour validation. Confirmez-vous ?",
            actionText: "Oui, transmettre",
            variant: "default",
        },
        renvoyer: {
            title: "Renvoyer le dossier",
            description: "Vous êtes sur le point de renvoyer ce dossier au niveau hiérarchique inférieur pour correction. Veuillez préciser les motifs dans une note jointe. Confirmez-vous ?",
            actionText: "Oui, renvoyer",
            variant: "default",
        },
        affecter: {
            title: "Affecter le dossier",
            description: "Vous êtes sur le point d'affecter ce dossier à un chargé d'études. Celui-ci sera notifié. Confirmez-vous ?",
            actionText: "Oui, affecter",
            variant: "default",
        },
        suspendre: {
            title: "Suspendre le marché",
            description: "Vous êtes sur le point de SUSPENDRE ce marché. Cette action bloquera temporairement le processus. Confirmez-vous ?",
            actionText: "Confirmer la suspension",
            variant: "destructive",
        }
    };
    
    const currentAction = actionToConfirm ? actionDetails[actionToConfirm] : null;

    return (
        <MainLayout>
            <AlertDialog open={!!actionToConfirm} onOpenChange={(isOpen) => !isOpen && setActionToConfirm(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center">
                            <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
                            Confirmation requise
                        </AlertDialogTitle>
                        <AlertDialogDescription className="pt-4">
                            <p className="font-bold text-lg">{currentAction?.title}</p>
                            <p className="mt-2">{currentAction?.description}</p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                             onClick={() => { /* TODO: handle action */ }}
                             className={currentAction?.variant === 'destructive' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}
                        >
                            {currentAction?.actionText}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>


            <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Détails du Marché</CardTitle>
                            <CardDescription>{dossier.reference} - {dossier.objet}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-semibold">Autorité Contractante</h3>
                                <p>{dossier.autoriteContractante}</p>
                            </div>
                             <div>
                                <h3 className="font-semibold">Montant</h3>
                                <p>{dossier.montant}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Statut Actuel</h3>
                                <p>{dossier.statut} (Assigné à: {dossier.assigneA})</p>
                            </div>
                            <Separator />
                             <div>
                                <h3 className="font-semibold mb-2">Pièces du dossier</h3>
                                <div className="space-y-2">
                                    <Button variant="outline" className="w-full justify-start">
                                        <FileText className="mr-2 h-4 w-4" /> Projet de marché.pdf
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        <FileText className="mr-2 h-4 w-4" /> CCAP_final.pdf
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        <FileText className="mr-2 h-4 w-4" /> Rapport_analyse_COJO.pdf
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button className="w-full" onClick={() => setActionToConfirm("valider")}>
                                <Check className="mr-2 h-4 w-4" /> Valider
                            </Button>
                             <Button className="w-full" variant="outline" onClick={() => setActionToConfirm("transmettre")}>
                                <ArrowUp className="mr-2 h-4 w-4" /> Transmettre au N+1
                            </Button>
                            <Button className="w-full" variant="outline" onClick={() => setActionToConfirm("renvoyer")}>
                                <ArrowDown className="mr-2 h-4 w-4" /> Renvoyer au N-1
                            </Button>
                             <Button className="w-full" variant="secondary" onClick={() => setActionToConfirm("affecter")}>
                                <UserPlus className="mr-2 h-4 w-4" /> Affecter / Réaffecter
                            </Button>
                             <Button className="w-full" variant="secondary">
                                <FilePlus2 className="mr-2 h-4 w-4" /> Ajouter un document interne
                            </Button>
                             <Button className="w-full" variant="destructive" onClick={() => setActionToConfirm("suspendre")}>
                                <Ban className="mr-2 h-4 w-4" /> Suspendre le marché
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </MainLayout>
    )
}
