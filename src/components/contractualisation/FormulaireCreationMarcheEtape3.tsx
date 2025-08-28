"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { Button } from "@/components/ui/Button"
import { PlusCircle } from "lucide-react"

export function FormulaireCreationMarcheEtape3() {
    const montantFinalDuMarche = 150000000;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Création du Marché - Étape 3/4</CardTitle>
                <CardDescription>Paramètres Financiers & Échéancier</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="retenue-garantie">Taux de retenue de garantie (%)</Label>
                        <Input id="retenue-garantie" type="number" placeholder="Optionnel" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="garantie-execution">Taux de garantie de bonne exécution (%)</Label>
                        <Input id="garantie-execution" type="number" defaultValue="5" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Montant final du marché</Label>
                    <Input readOnly disabled value={`${montantFinalDuMarche.toLocaleString()} XOF`} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="source-financement">Source de financement</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une source" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="tresor">Trésor</SelectItem>
                            <SelectItem value="bailleur-don">Bailleur (Don)</SelectItem>
                            <SelectItem value="bailleur-emprunt">Bailleur (Emprunt)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Separator />

                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Échéancier de Paiement</h3>
                        <Button variant="outline">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Ajouter un échéancier
                        </Button>
                    </div>
                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Exercice budgétaire</TableHead>
                                    <TableHead>Montant</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {/* Les données de l'échéancier seront mappées ici */}
                                <TableRow>
                                    <TableCell>2024</TableCell>
                                    <TableCell>100,000,000 XOF</TableCell>
                                    <TableCell className="text-right">...</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>2025</TableCell>
                                    <TableCell>50,000,000 XOF</TableCell>
                                    <TableCell className="text-right">...</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}
