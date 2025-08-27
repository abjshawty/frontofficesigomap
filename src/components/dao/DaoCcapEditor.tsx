"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/Button";
import { UploadCloud } from 'lucide-react';

// Supposons que nous recevons cette information de l'opération parente
const isBailleurFunded = false; 

export default function DaoCcapEditor({ daoId }: { daoId: string | string[] }) {
  const [pricesRevisable, setPricesRevisable] = useState("non");

  if (isBailleurFunded) {
    return (
        <Card className="border-2 border-dashed bg-gray-50 text-center">
            <CardHeader>
                <CardTitle>Financement par Bailleurs de Fonds</CardTitle>
                <CardDescription>
                    Pour ce type de financement, le système ne génère pas de CCAP. Veuillez joindre le document fourni par le bailleur.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center space-y-4">
                    <UploadCloud className="h-12 w-12 text-gray-400" />
                    <p className="text-sm text-gray-600">Glissez-déposez le fichier ici, ou cliquez pour sélectionner.</p>
                    <Button variant="outline">
                        Joindre le CCAP du bailleur
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Éditeur du CCAP</CardTitle>
        <CardDescription>
          Complétez les articles du Cahier des Clauses Administratives Particulières.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <Label>Autorité Contractante</Label>
                <Input disabled value="Ministère de la Construction et de l'Urbanisme" />
            </div>
             <div>
                <Label>Prix fermes ou révisables ?</Label>
                <RadioGroup 
                    defaultValue={pricesRevisable} 
                    onValueChange={setPricesRevisable}
                    className="flex items-center space-x-4 mt-2"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="non" id="prix-fermes" />
                        <Label htmlFor="prix-fermes">Fermes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="oui" id="prix-revisables" />
                        <Label htmlFor="prix-revisables">Révisables</Label>
                    </div>
                </RadioGroup>
            </div>
        </div>

        {pricesRevisable === 'oui' && (
             <div>
                <Label htmlFor="revision-modalities">Modalités de révision des prix</Label>
                <Textarea 
                    id="revision-modalities" 
                    placeholder="Décrivez les modalités de révision des prix..." 
                />
            </div>
        )}

        <div>
            <Label htmlFor="constitutive-parts">Pièces constitutives du marché</Label>
            <Textarea 
                id="constitutive-parts" 
                placeholder="Listez les pièces constitutives du marché, par ordre de priorité..."
                rows={5}
                defaultValue={`- Le présent CCAP\n- Le Cahier des Clauses Techniques Particulières (CCTP)\n- Le Bordereau des Prix Unitaires (BPU)\n- Le Détail Quantitatif Estimatif (DQE)`}
            />
        </div>

      </CardContent>
    </Card>
  );
}
