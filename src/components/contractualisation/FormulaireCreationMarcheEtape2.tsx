"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/Badge"
import { Slider } from "@/components/ui/slider"
import { AlertCircle, Info } from "lucide-react"

export function FormulaireCreationMarcheEtape2() {
    const montantPrevisionnel = 160000000;
    const montantOffre = 150000000;
    const difference = montantOffre - montantPrevisionnel;
    const pourcentageDifference = (difference / montantPrevisionnel) * 100;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Création du Marché - Étape 2/4</CardTitle>
                <CardDescription>Ajustement des Quantités et des Prix</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6 p-4 border rounded-lg">
                    <div>
                        <Label>Montant prévisionnel (DAO)</Label>
                        <p className="text-2xl font-bold">{montantPrevisionnel.toLocaleString()} XOF</p>
                    </div>
                    <div>
                        <Label>Montant de l'offre retenue</Label>
                        <p className="text-2xl font-bold">{montantOffre.toLocaleString()} XOF</p>
                    </div>
                    <div className="col-span-2">
                         <Badge variant={difference <= 0 ? "default" : "destructive"}>
                            Différence: {difference.toLocaleString()} XOF ({pourcentageDifference.toFixed(2)}%)
                        </Badge>
                    </div>
                </div>

                {difference > 0 && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Offre supérieure au budget</AlertTitle>
                        <AlertDescription>
                            L'offre de l'attributaire est supérieure au montant prévisionnel. Vous pouvez réduire les quantités dans la limite de 25%.
                        </AlertDescription>
                    </Alert>
                )}

                {difference < 0 && (
                     <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Offre inférieure au budget</AlertTitle>
                        <AlertDescription>
                            L'offre de l'attributaire est inférieure au montant prévisionnel. Vous pouvez augmenter les quantités dans la limite de 15%.
                        </AlertDescription>
                    </Alert>
                )}

                 <div>
                    <Label htmlFor="ajustement">Ajustement des quantités (%)</Label>
                    <div className="flex items-center gap-4 mt-2">
                        <Slider
                            id="ajustement"
                            min={difference > 0 ? -25 : 0}
                            max={difference < 0 ? 15 : 0}
                            step={1}
                            defaultValue={[0]}
                         />
                        <Input type="number" className="w-24" defaultValue="0" />
                    </div>
                </div>

                <div className="p-4 bg-secondary rounded-lg text-center">
                    <Label>Nouveau montant du marché</Label>
                    <p className="text-3xl font-extrabold text-primary">{montantOffre.toLocaleString()} XOF</p>
                </div>


            </CardContent>
        </Card>
    )
}
