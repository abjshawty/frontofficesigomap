"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

// Données de démonstration
const allFunctions = [
    { id: 'f1', name: 'Président', mandatory: true },
    { id: 'f2', name: 'Secrétaire', mandatory: true },
    { id: 'f3', name: "Représentant de l'Autorité Contractante", mandatory: true, defaultStructure: "Ministère de la Construction" },
    { id: 'f4', name: 'Contrôleur Financier', mandatory: true, defaultStructure: "Contrôle Financier du Ministère" },
    { id: 'f5', name: 'Expert Technique 1', mandatory: false },
    { id: 'f6', name: 'Maître d\'oeuvre', mandatory: false },
    { id: 'f7', name: 'Représentant des usagers', mandatory: false },
];

export default function FormulaireDaoCommission({ daoId }: { daoId: string | string[] }) {
    // Initialiser les fonctions sélectionnées avec celles qui sont obligatoires
    const [selectedFunctions, setSelectedFunctions] = useState(
        allFunctions.filter(f => f.mandatory).map(f => ({ ...f, structure: f.defaultStructure || '' }))
    );

    const handleFunctionToggle = (func: any, checked: boolean | string) => {
        if (checked) {
            setSelectedFunctions([...selectedFunctions, { ...func, structure: func.defaultStructure || '' }]);
        } else {
            // Empêcher la désélection des fonctions obligatoires
            if(func.mandatory) return;
            setSelectedFunctions(selectedFunctions.filter(f => f.id !== func.id));
        }
    };
    
    const handleStructureChange = (funcId: string, value: string) => {
        setSelectedFunctions(selectedFunctions.map(f => f.id === funcId ? { ...f, structure: value } : f));
    };

    return (
        <Card className="border-none shadow-none">
            <CardHeader>
                <CardTitle>Constitution de la Commission (COJO)</CardTitle>
                <CardDescription>
                    Sélectionnez les fonctions et renseignez les structures correspondantes pour former la commission d'ouverture et de jugement.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Volet de gauche: Sélection des fonctions */}
                <div className="space-y-4">
                    <h3 className="font-semibold">Fonctions disponibles pour la commission</h3>
                    <div className="border rounded-lg p-4 space-y-3">
                        {allFunctions.map(func => (
                            <div key={func.id} className="flex items-center space-x-3">
                                <Checkbox
                                    id={func.id}
                                    checked={selectedFunctions.some(f => f.id === func.id)}
                                    onCheckedChange={(checked) => handleFunctionToggle(func, checked)}
                                    disabled={func.mandatory}
                                />
                                <Label htmlFor={func.id} className={`${func.mandatory ? 'font-bold' : ''}`}>
                                    {func.name} {func.mandatory && <span className="text-red-500">*</span>}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Volet de droite: Structures à renseigner */}
                <div className="space-y-4">
                    <h3 className="font-semibold">Composition de la commission</h3>
                     <div className="border rounded-lg p-4 space-y-4">
                        {selectedFunctions.length === 0 ? (
                             <p className="text-sm text-gray-500 text-center py-8">
                                Aucune fonction sélectionnée.
                            </p>
                        ) : (
                            selectedFunctions
                                .sort((a,b) => a.name.localeCompare(b.name))
                                .map(func => (
                                <div key={func.id}>
                                    <Label htmlFor={`struct-${func.id}`}>{func.name}</Label>
                                    <Input 
                                        id={`struct-${func.id}`} 
                                        placeholder="Nom de la structure ou de la personne..." 
                                        value={func.structure}
                                        onChange={(e) => handleStructureChange(func.id, e.target.value)}
                                        disabled={!!func.defaultStructure}
                                        className="mt-1"
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
