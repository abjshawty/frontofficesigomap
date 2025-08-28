"use client"

import { useState } from "react";
import { MainLayout } from "@/components/ui/MainLayout";
import { Button } from "@/components/ui/Button";
import { FormulaireCreationMarcheEtape1 } from "@/components/contractualisation/FormulaireCreationMarcheEtape1";
import { FormulaireCreationMarcheEtape2 } from "@/components/contractualisation/FormulaireCreationMarcheEtape2";
import { FormulaireCreationMarcheEtape3 } from "@/components/contractualisation/FormulaireCreationMarcheEtape3";
import { FormulaireCreationMarcheEtape4 } from "@/components/contractualisation/FormulaireCreationMarcheEtape4";
import { ChevronLeft, ChevronRight, PartyPopper } from "lucide-react";

export default function NouveauMarchePage() {
    const [step, setStep] = useState(1);

    const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto">
                {step === 1 && <FormulaireCreationMarcheEtape1 />}
                {step === 2 && <FormulaireCreationMarcheEtape2 />}
                {step === 3 && <FormulaireCreationMarcheEtape3 />}
                {step === 4 && <FormulaireCreationMarcheEtape4 />}

                <div className="mt-8 flex justify-between">
                    <Button onClick={prevStep} disabled={step === 1} variant="outline">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Précédent
                    </Button>
                    
                    {step === 4 ? (
                        <Button>
                            Terminer et soumettre
                            <PartyPopper className="ml-2 h-4 w-4" />
                        </Button>
                    ) : (
                        <Button onClick={nextStep}>
                            Suivant
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
