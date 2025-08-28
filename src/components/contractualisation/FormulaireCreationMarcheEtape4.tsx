"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/Button"
import { AlertCircle, PlusCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


export function FormulaireCreationMarcheEtape4() {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Création du Marché - Étape 4/4</CardTitle>
                <CardDescription>Financement de l'Échéancier</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div>
                    <Label htmlFor="echeancier-a-financer">Sélectionner l'échéancier à financer</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un échéancier" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ech1">Exercice 2024 - 100,000,000 XOF</SelectItem>
                            <SelectItem value="ech2">Exercice 2025 - 50,000,000 XOF</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Separator />

                <div className="space-y-4 p-4 border rounded-lg">
                    <h3 className="font-medium text-lg">Imputation budgétaire</h3>
                    <div className="space-y-2">
                        <Label htmlFor="ligne-budgetaire">Ligne budgétaire</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionner une ligne budgétaire" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ligne1">Ligne 1 - Trésor - Disponible: 250,000,000 XOF</SelectItem>
                                <SelectItem value="ligne2">Ligne 2 - Bailleur (Don) - Disponible: 80,000,000 XOF</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="montant-imputer">Montant à imputer</Label>
                        <Input id="montant-imputer" type="number" placeholder="Saisir le montant" />
                    </div>
                     <div className="text-right">
                        <Button variant="outline">
                            <PlusCircle className="mr-2 h-4 w-4"/>
                            Ajouter l'imputation
                        </Button>
                    </div>
                </div>
                
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Action Requise</AlertTitle>
                    <AlertDescription className="flex justify-between items-center">
                        <div>
                        La réservation des crédits est une action bloquante et obligatoire pour la suite du processus.
                        </div>
                        <Button>
                            <CheckCircle className="mr-2 h-4 w-4"/>
                            Réserver les crédits
                        </Button>
                    </AlertDescription>
                </Alert>

            </CardContent>
        </Card>
    )
}
