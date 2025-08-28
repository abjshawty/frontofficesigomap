"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function FormulaireDaoParametresGeneraux({ daoId }: { daoId: string | string[] }) {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Paramètres Généraux du DAO</CardTitle>
        <CardDescription>
          Configurez les règles et les garanties applicables à cet appel d'offres.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Rappel des infos de l'opération (non éditable) */}
        <div className="md:col-span-2 lg:col-span-3 bg-gray-50 p-4 rounded-md border">
            <h3 className="font-semibold text-sm mb-2">Rappel de l'Opération de Référence</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                <div>
                    <p className="text-gray-500">Objet</p>
                    <p className="font-medium">Construction d'un nouveau centre administratif</p>
                </div>
                 <div>
                    <p className="text-gray-500">Type de marché</p>
                    <p className="font-medium">Travaux</p>
                </div>
                 <div>
                    <p className="text-gray-500">Mode de passation</p>
                    <p className="font-medium">Appel d'offres ouvert</p>
                </div>
                 <div>
                    <p className="text-gray-500">Coût estimatif</p>
                    <p className="font-medium">150 000 000 FCFA</p>
                </div>
            </div>
        </div>

        <div>
          <Label htmlFor="validity">Durée de validité des offres (jours)</Label>
          <Input id="validity" type="number" defaultValue={90} />
        </div>

        <div>
          <Label htmlFor="cost">Coût d'acquisition du dossier (FCFA)</Label>
          <Input id="cost" type="number" placeholder="0 si gratuit" />
        </div>
        
        <div>
            <Label>Garantie d'offre exigée</Label>
             <RadioGroup defaultValue="oui" className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="oui" id="garantie-oui" />
                    <Label htmlFor="garantie-oui">Oui</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="non" id="garantie-non" />
                    <Label htmlFor="garantie-non">Non</Label>
                </div>
            </RadioGroup>
        </div>

        <div>
            <Label>Garantie de bonne exécution exigée</Label>
             <RadioGroup defaultValue="oui" className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="oui" id="execution-oui" />
                    <Label htmlFor="execution-oui">Oui</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="non" id="execution-non" />
                    <Label htmlFor="execution-non">Non</Label>
                </div>
            </RadioGroup>
        </div>
        
        <div>
          <Label htmlFor="evalMode">Mode d'évaluation</Label>
          <Select>
            <SelectTrigger id="evalMode">
              <SelectValue placeholder="Sélectionner un mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="combinaison">Combinaison (Qualité / Coût)</SelectItem>
              <SelectItem value="moins-disant">Moins disant</SelectItem>
              <SelectItem value="mieux-disant">Mieux disant (Qualité / Prix)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="lowOffer">Seuil offre anormalement basse (%)</Label>
          <Input id="lowOffer" type="number" placeholder="Ex: 15" />
        </div>

        <div>
            <Label htmlFor="prefSubcontract">Marge de préférence (Sous-traitance, %)</Label>
            <Input id="prefSubcontract" type="number" defaultValue={0} min={0} max={15} />
        </div>

        <div>
            <Label htmlFor="prefArtisan">Marge de préférence (Artisanale, %)</Label>
            <Input id="prefArtisan" type="number" defaultValue={0} min={0} max={5} />
        </div>

        <div>
            <Label htmlFor="maxLots">Nombre maximum de lots attribuables</Label>
            <Input id="maxLots" type="number" placeholder="Laisser vide si illimité" />
        </div>

      </CardContent>
    </Card>
  );
}
