"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, GripVertical } from 'lucide-react';

// Données de démonstration
const availableCriteria = [
    { id: 'crit-1', name: 'Capacité financière', category: 'Financier' },
    { id: 'crit-2', name: 'Expérience similaire', category: 'Technique' },
    { id: 'crit-3', name: 'Certification ISO 9001', category: 'Qualité' },
    { id: 'crit-4', name: 'Personnel clé qualifié', category: 'Technique' },
    { id: 'crit-5', name: 'Délai de livraison', category: 'Logistique' },
    { id: 'crit-6', name: 'Garantie du matériel', category: 'Technique' },
];

const demoLots = [
    { id: "LOT01", name: "Lot 1: Gros Œuvre" },
    { id: "LOT02", name: "Lot 2: Électricité & Plomberie" },
];

export default function FormulaireDaoCriteres({ daoId }: { daoId: string | string[] }) {
    const [selectedCriteria, setSelectedCriteria] = useState([
        { ...availableCriteria[1], lots: [demoLots[0].id] },
        { ...availableCriteria[3], lots: [demoLots[0].id, demoLots[1].id] },
    ]);
    
    const handleAddCriteria = (criteria: any) => {
        if (!selectedCriteria.find(c => c.id === criteria.id)) {
            setSelectedCriteria([...selectedCriteria, { ...criteria, lots: [] }]);
        }
    };
    
    const handleLotAssignment = (critId: string, lotId: string, checked: boolean | string) => {
        setSelectedCriteria(selectedCriteria.map(crit => {
            if (crit.id === critId) {
                const newLots = checked 
                    ? [...crit.lots, lotId] 
                    : crit.lots.filter(l => l !== lotId);
                return { ...crit, lots: newLots };
            }
            return crit;
        }));
    };

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Définition des Critères d'Évaluation</CardTitle>
        <CardDescription>
          Sélectionnez les critères requis et affectez-les à un ou plusieurs lots.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Volet de gauche: Liste des critères disponibles */}
        <div className="space-y-4">
            <h3 className="font-semibold">Bibliothèque de critères</h3>
             <div className="border rounded-lg p-4 space-y-3 max-h-96 overflow-y-auto">
                {availableCriteria.map(crit => (
                    <div key={crit.id} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50">
                        <div>
                            <p className="font-medium">{crit.name}</p>
                            <Badge variant="secondary">{crit.category}</Badge>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => handleAddCriteria(crit)}>
                            Ajouter <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>

        {/* Volet de droite: Critères sélectionnés pour le DAO */}
        <div className="space-y-4">
            <h3 className="font-semibold">Critères sélectionnés pour ce DAO</h3>
             <div className="border rounded-lg p-4 space-y-4 max-h-96 overflow-y-auto">
                {selectedCriteria.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-8">
                        Aucun critère sélectionné. Ajoutez des critères depuis la bibliothèque de gauche.
                    </p>
                ) : (
                    selectedCriteria.map(crit => (
                        <div key={crit.id} className="p-3 border rounded-md bg-white">
                           <div className="flex items-start justify-between">
                                <div>
                                    <p className="font-medium">{crit.name}</p>
                                    <Badge variant="outline">{crit.category}</Badge>
                                </div>
                                <Button size="icon" variant="ghost" className="cursor-grab">
                                    <GripVertical className="h-5 w-5 text-gray-400" />
                                </Button>
                           </div>
                           <div className="mt-4">
                                <Label className="text-xs font-semibold">Affecter aux lots :</Label>
                                <div className="flex items-center space-x-4 mt-2">
                                    {demoLots.map(lot => (
                                        <div key={lot.id} className="flex items-center space-x-2">
                                            <Checkbox 
                                                id={`${crit.id}-${lot.id}`} 
                                                checked={crit.lots.includes(lot.id)}
                                                onCheckedChange={(checked) => handleLotAssignment(crit.id, lot.id, checked)}
                                            />
                                            <Label htmlFor={`${crit.id}-${lot.id}`} className="text-sm font-normal">
                                                {lot.name}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                           </div>
                        </div>
                    ))
                )}
            </div>
        </div>

      </CardContent>
    </Card>
  );
}
