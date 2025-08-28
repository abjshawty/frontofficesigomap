"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Textarea } from "@/components/ui/Textarea"

export function FormulaireCreationMarcheEtape1() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Création du Marché - Étape 1/4</CardTitle>
                <CardDescription>Informations Générales</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="objet">Objet du marché</Label>
                    <Input id="objet" defaultValue="Fourniture de matériel informatique" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Description du marché</Label>
                    <Textarea id="description" placeholder="Description détaillée..." />
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="tva">Taux de TVA (%)</Label>
                        <Input id="tva" type="number" defaultValue="18" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="date-attribution">Date d'attribution</Label>
                        {/* Note: Using Input type="date" for simplicity. A custom Calendar component would be better. */}
                        <Input id="date-attribution" type="date" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="compte-bancaire">Compte bancaire de l'OE</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un compte" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="compte1">CI001 01001 123456789012 01 - Tech Solutions SARL</SelectItem>
                            <SelectItem value="compte2">CI001 01002 987654321098 02 - Tech Solutions SARL</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    )
}
