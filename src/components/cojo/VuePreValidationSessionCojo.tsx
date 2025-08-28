"use client"

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
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { Download, AlertTriangle } from "lucide-react"

// Mock data - replace with actual data from evaluation
const rapportSynthese = {
    attributaireSuggere: "Tech Solutions SARL",
    classement: [
        { rang: 1, nom: "Tech Solutions SARL", score: 85, statut: "Conforme" },
        { rang: 2, nom: "Le Fournisseur Local", score: 72, statut: "Conforme" },
        { rang: 3, nom: "Global Office Supplies", score: 68, statut: "Conforme" },
    ],
    offresRejetees: [
        { nom: "Info Distribution SA", motif: "Dossier incomplet" },
    ],
};

interface VuePreValidationSessionCojoProps {
    onConfirmCloture: () => void;
}

export function VuePreValidationSessionCojo({ onConfirmCloture }: VuePreValidationSessionCojoProps) {
    return (
        <Card className="border-yellow-500 border-2">
            <CardHeader>
                <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-6 w-6 text-yellow-500" />
                    <CardTitle>Pré-validation et Clôture de la Séance</CardTitle>
                </div>
                <CardDescription>
                    Veuillez vérifier le rapport de synthèse avant de clôturer définitivement la séance.
                    Cette action est irréversible.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="font-semibold text-lg mb-2">Classement Provisoire</h3>
                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Rang</TableHead>
                                    <TableHead>Soumissionnaire</TableHead>
                                    <TableHead>Score Final</TableHead>
                                    <TableHead>Statut</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rapportSynthese.classement.map(item => (
                                    <TableRow key={item.rang}>
                                        <TableCell>{item.rang}</TableCell>
                                        <TableCell>{item.nom}</TableCell>
                                        <TableCell>{item.score}</TableCell>
                                        <TableCell><span className="text-green-600 font-medium">{item.statut}</span></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-lg mb-2">Offres Rejetées</h3>
                     <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Soumissionnaire</TableHead>
                                    <TableHead>Motif du Rejet</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rapportSynthese.offresRejetees.map(item => (
                                    <TableRow key={item.nom}>
                                        <TableCell>{item.nom}</TableCell>
                                        <TableCell><span className="text-red-600">{item.motif}</span></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                    <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Télécharger le rapport provisoire (PDF)
                    </Button>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">Clôturer Définitivement la Séance</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Cette action est irréversible. Elle va clôturer la séance de jugement
                                    et générer le Procès-Verbal final. L'attributaire proposé est
                                    <strong className="mx-1">{rapportSynthese.attributaireSuggere}</strong>.
                                    Voulez-vous confirmer ?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction onClick={onConfirmCloture}>
                                    Oui, Confirmer la Clôture
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardContent>
        </Card>
    )
}
