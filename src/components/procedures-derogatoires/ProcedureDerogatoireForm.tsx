"use client";

import { useState } from "react";
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { AlertTriangle, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type RequestType = "gre-a-gre" | "consultation-restreinte" | "anticipation";

export default function ProcedureDerogatoireForm() {
  const searchParams = useSearchParams();
  const operationId = searchParams.get('operationId');
  const operationObjet = searchParams.get('operationObjet');

  const [requestType, setRequestType] = useState<RequestType | undefined>();

  const renderDynamicFields = () => {
    switch (requestType) {
      case "gre-a-gre":
        return (
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="motif">Motif réglementaire</Label>
            <Select>
              <SelectTrigger id="motif">
                <SelectValue placeholder="Sélectionner un motif..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="urgence">Urgence impérieuse</SelectItem>
                <SelectItem value="monopole">Monopole / Exclusivité</SelectItem>
                <SelectItem value="technique-artistique">Technique / Artistique</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      case "consultation-restreinte":
        return (
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="entreprises">Liste des entreprises à consulter</Label>
            <Input id="entreprises" placeholder="Entrez les noms des entreprises, séparés par des virgules" />
             <p className="text-xs text-muted-foreground">
                Amélioration à prévoir : remplacer ce champ par un multi-select de la base de données OE.
            </p>
          </div>
        );
      case "anticipation":
         return (
             <div className="md:col-span-2 flex items-start p-4 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg">
                <Info className="h-5 w-5 mr-3 flex-shrink-0" />
                <p className="text-sm">
                    L'autorisation d'anticipation permet de lancer la procédure avant l'obtention de tous les financements.
                    Veuillez joindre les justificatifs appropriés.
                </p>
            </div>
         );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Formulaire de Demande Dérogatoire</CardTitle>
        <CardDescription>
          Remplissez les informations ci-dessous. Les champs marqués d'un * sont obligatoires.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">

        <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-800">1. Informations Primaires</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="operation">Opération concernée</Label>
                    <Input id="operation" value={`${operationId}: ${operationObjet}` || 'Aucune opération sélectionnée'} disabled />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="requestType">Type de demande *</Label>
                    <Select onValueChange={(value) => setRequestType(value as RequestType)}>
                        <SelectTrigger id="requestType">
                        <SelectValue placeholder="Sélectionner un type de demande" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="gre-a-gre">Demande de gré à gré</SelectItem>
                        <SelectItem value="consultation-restreinte">Consultation restreinte</SelectItem>
                        <SelectItem value="anticipation">Autorisation d'anticipation</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground pt-1">
                        La section 2 s'adaptera à votre sélection.
                    </p>
                </div>
            </div>
        </div>

        <Separator />
        
        {requestType && (
            <>
                <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-800">2. Détails de la demande</h3>
                    {renderDynamicFields()}
                </div>
                <Separator />
            </>
        )}

        <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-800">3. Pièces justificatives</h3>
            <div className="space-y-2">
                <Label htmlFor="justificatifs">Documents à joindre *</Label>
                <Input id="justificatifs" type="file" multiple />
                <p className="text-sm text-muted-foreground">
                    Joignez tous les documents nécessaires pour appuyer votre demande.
                </p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
