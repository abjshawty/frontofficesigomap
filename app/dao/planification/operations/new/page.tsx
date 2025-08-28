
"use client";

import { useState } from 'react';
import FormulaireOperationGeneral from "@/components/dao/FormulaireOperationGeneral";
import FormulaireOperationCalendrier from '@/components/dao/FormulaireOperationCalendrier';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export default function NewOperationPage() {
    const [step, setStep] = useState(1);
    const router = useRouter();

    const stepInfo = {
        1: { title: "Informations Générales" },
        2: { title: "Calendrier Prévisionnel" }
    }

    return (
            <div className="space-y-6">
                <div className="flex items-center">
                    <Button variant="outline" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div className="ml-4">
                        <h1 className="text-2xl font-bold">Création d'une nouvelle opération</h1>
                        <p className="text-muted-foreground">
                            Étape {step} sur 2 : {stepInfo[step as keyof typeof stepInfo].title}
                        </p>
                    </div>
                </div>

                <Card>
                    <CardContent className="mt-6">
                        <div>
                            {step === 1 && <FormulaireOperationGeneral onNext={() => setStep(2)} />}
                            {step === 2 && <FormulaireOperationCalendrier />}
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end space-x-4">
                    {step === 2 && (
                        <Button variant="outline" onClick={() => setStep(1)}>
                            Précédent
                        </Button>
                    )}
                     {step === 2 && (
                        <Button onClick={() => alert('Opération soumise pour validation !')}>
                            Soumettre l'opération
                        </Button>
                    )}
                </div>
            </div>
    );
}
