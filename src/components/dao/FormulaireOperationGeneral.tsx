
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react";
import { Dispositions, PassationMode } from "@/types/planification";

interface FormulaireOperationGeneralProps {
    onNext: () => void;
}

export default function FormulaireOperationGeneral({ onNext }: FormulaireOperationGeneralProps) {
  const [isPluriannuel, setIsPluriannuel] = useState(false);
  const [dispositions, setDispositions] = useState<Dispositions>("nationales");
  const [passationMode, setPassationMode] = useState<PassationMode>();

  const isInvalidCombination = dispositions === "bailleurs" && passationMode === "simplifiee";

  return (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
                <Label htmlFor="object">Objet de l'opération</Label>
                <Textarea id="object" placeholder="Ex: Construction d'un nouveau bâtiment..." />
            </div>

            <div>
                <Label htmlFor="marketType">Type de marché</Label>
                <Select>
                    <SelectTrigger id="marketType">
                        <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="travaux">Travaux</SelectItem>
                        <SelectItem value="fournitures">Fournitures</SelectItem>
                        <SelectItem value="prestations">Prestations</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label htmlFor="nature">Nature</Label>
                <Select>
                    <SelectTrigger id="nature">
                        <SelectValue placeholder="Sélectionner une nature" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="travaux">Travaux</SelectItem>
                        <SelectItem value="fournitures">Fournitures</SelectItem>
                        <SelectItem value="prestation-courante">Prestation courante</SelectItem>
                        <SelectItem value="prestation-intellectuelle">Prestation intellectuelle</SelectItem>
                        <SelectItem value="mixte">Mixte</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            
            <div>
                <Label>Dispositions appliquées</Label>
                    <RadioGroup 
                    value={dispositions} 
                    onValueChange={(val) => setDispositions(val as Dispositions)} 
                    className="flex items-center space-x-4 mt-2"
                    >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nationales" id="nationales" />
                        <Label htmlFor="nationales">Nationales</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bailleurs" id="bailleurs" />
                        <Label htmlFor="bailleurs">Non-nationales (Bailleurs)</Label>
                    </div>
                </RadioGroup>
            </div>

            <div>
                <Label>Périmètre de publication</Label>
                    <RadioGroup defaultValue="national" className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="national" id="pub-national" />
                        <Label htmlFor="pub-national">National</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="international" id="pub-international" />
                        <Label htmlFor="pub-international">International</Label>
                    </div>
                </RadioGroup>
            </div>
            
            <div>
                <Label htmlFor="passationMode">Mode de passation</Label>
                <Select value={passationMode} onValueChange={(val) => setPassationMode(val as PassationMode)}>
                    <SelectTrigger id="passationMode">
                        <SelectValue placeholder="Sélectionner un mode" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="aoo">Appel d'offres ouvert</SelectItem>
                        <SelectItem value="aor">Appel d'offres restreint</SelectItem>
                        <SelectItem value="gre-a-gre">Gré à gré</SelectItem>
                        <SelectItem value="simplifiee">Procédure simplifiée</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label htmlFor="envisagedMarketType">Type de marché envisagé</Label>
                <Select>
                    <SelectTrigger id="envisagedMarketType">
                        <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="classique">Marché classique</SelectItem>
                        <SelectItem value="commande">Marché à commande</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {isInvalidCombination && (
                <div className="md:col-span-2 flex items-start p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
                    <AlertTriangle className="h-5 w-5 mr-3 flex-shrink-0" />
                    <div>
                        <h4 className="font-semibold">Combinaison non autorisée</h4>
                        <p className="text-sm">
                            Une procédure simplifiée ne peut pas être financée par des bailleurs (dispositions non-nationales).
                            Veuillez modifier votre sélection pour continuer.
                        </p>
                    </div>
                </div>
            )}
            
            <div className="md:col-span-2">
                <Label htmlFor="estimatedCost">Coût estimatif de l'opération (FCFA)</Label>
                <Input id="estimatedCost" type="number" placeholder="Ex: 150000000" />
            </div>

            <div className="md:col-span-2">
                <Label htmlFor="budgetLines">Lignes budgétaires</Label>
                    <Select>
                    <SelectTrigger id="budgetLines">
                        <SelectValue placeholder="Sélectionner une ou plusieurs lignes" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="line-1">Ligne 22.1 - Budget Investissement 2024</SelectItem>
                        <SelectItem value="line-2">Ligne 45.3 - Budget Fonctionnement 2024</SelectItem>
                    </SelectContent>
                </Select>
            </div>


            <div className="md:col-span-2 flex items-center space-x-2 mt-4">
                <Checkbox id="pme" />
                <Label htmlFor="pme">Opération réservée aux PME</Label>
            </div>

            <div className="md:col-span-2 flex items-center space-x-2">
                <Checkbox id="pluriannuel" checked={isPluriannuel} onCheckedChange={setIsPluriannuel as any} />
                <Label htmlFor="pluriannuel">Opération pluriannuelle (PIP)</Label>
            </div>

            {isPluriannuel && (
                <div className="md:col-span-2 space-y-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <Label htmlFor="pip-document">Document justificatif (PIP)</Label>
                    <Input id="pip-document" type="file" />
                    <p className="text-xs text-muted-foreground">
                        Veuillez joindre le Programme d'Investissement Pluriannuel validé.
                    </p>
                </div>
            )}
        </div>
        <div className="flex justify-end">
            <Button onClick={onNext} disabled={isInvalidCombination}>
                Suivant
            </Button>
      </div>
    </div>
  );
}
