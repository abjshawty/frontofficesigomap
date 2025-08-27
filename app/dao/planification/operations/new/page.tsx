
"use client";

import { useState } from 'react';
import { MainLayout } from "@/components/ui/MainLayout";
import OperationGeneralForm from '@/components/dao/OperationGeneralForm';
import OperationCalendarForm from '@/components/dao/OperationCalendarForm';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Dispositions, PassationMode } from "@/types/planification";

export default function NewOperationPage() {
    const [step, setStep] = useState(1);
    const router = useRouter();

    // Remontée d'état du formulaire pour gérer la logique de validation
    const [dispositions, setDispositions] = useState<Dispositions>("nationales");
    const [passationMode, setPassationMode] = useState<PassationMode | undefined>();

    const isInvalidCombination = passationMode === 'simplifiee' && dispositions === 'bailleurs';

    const handleNext = () => {
        if (!isInvalidCombination) {
            setStep(2);
        }
    };

    return (
        <MainLayout>
            <div className="p-8 max-w-4xl mx-auto">
                <div className="flex items-center mb-6">
                    <Button variant="outline" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div className="ml-4">
                        <h1 className="text-2xl font-bold">Création d'une nouvelle opération</h1>
                        <p className="text-muted-foreground">Étape {step} sur 2</p>
                    </div>
                </div>

                {step === 1 && (
                    <OperationGeneralForm 
                        dispositions={dispositions}
                        onDispositionsChange={setDispositions}
                        passationMode={passationMode}
                        onPassationModeChange={setPassationMode}
                        isInvalidCombination={isInvalidCombination}
                    />
                )}
                {step === 2 && <OperationCalendarForm />}

                <div className="mt-8 flex justify-end space-x-4">
                    {step === 2 && (
                        <Button variant="outline" onClick={() => setStep(1)}>
                            Précédent
                        </Button>
                    )}
                    {step === 1 && (
                        <Button onClick={handleNext} disabled={isInvalidCombination}>
                            Suivant
                        </Button>
                    )}
                     {step === 2 && (
                        <Button onClick={() => alert('Opération soumise pour validation !')}>
                            Soumettre l'opération
                        </Button>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
