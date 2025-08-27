
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";

// --- Helper Functions ---

// Fonction pour ajouter des jours ouvrés (ignore les week-ends)
function addBusinessDays(date: Date, days: number): Date {
  const newDate = new Date(date);
  let addedDays = 0;
  while (addedDays < days) {
    newDate.setDate(newDate.getDate() + 1);
    const dayOfWeek = newDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // 0 = Dimanche, 6 = Samedi
      addedDays++;
    }
  }
  return newDate;
}

// Fonction pour ajouter des jours calendaires
function addCalendarDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
}

// Format YYYY-MM-DD pour les inputs de type date
function formatDateForInput(date: Date): string {
    return date.toISOString().split('T')[0];
}

// --- Initial Data Structure ---

const initialStepsData = [
    {
        id: 1,
        description: "Transmission du dossier à la DGMP",
        delay: 0,
        delayType: 'calendar',
        isEditable: true,
    },
    {
        id: 2,
        description: "Contrôle de la DGMP",
        delay: 10,
        delayType: 'business',
        isEditable: false,
    },
    {
        id: 3,
        description: "Prise en compte des observations",
        delay: 5,
        delayType: 'business',
        isEditable: true,
    },
    {
        id: 4,
        description: "Publication de l'Avis d'Appel d'Offres (AAO)",
        delay: 1,
        delayType: 'business',
        isEditable: false,
    },
    {
        id: 5,
        description: "Date limite de réception des offres",
        delay: 30,
        delayType: 'calendar',
        isEditable: false,
    },
];


export default function OperationCalendarForm() {
  const [steps, setSteps] = useState(() => 
    initialStepsData.map(step => ({ ...step, date: new Date() }))
  );

  useEffect(() => {
    recalculateDates(0, steps[0].date);
  }, []); // Exécuter une fois au montage pour initialiser

  const recalculateDates = (fromStepId: number, startDate: Date) => {
    setSteps(currentSteps => {
        const newSteps = [...currentSteps];
        let lastDate = startDate;

        for (let i = fromStepId; i < newSteps.length; i++) {
            if (i > 0) {
                 const prevStepDate = new Date(newSteps[i - 1].date);
                 const { delay, delayType } = newSteps[i];
                 if (delayType === 'business') {
                     lastDate = addBusinessDays(prevStepDate, delay);
                 } else {
                     lastDate = addCalendarDays(prevStepDate, delay);
                 }
            } else {
                lastDate = startDate;
            }
             newSteps[i] = { ...newSteps[i], date: lastDate };
        }
        return newSteps;
    });
  };

  const handleDateChange = (stepId: number, newDateString: string) => {
    const newDate = new Date(newDateString);
     setSteps(currentSteps => 
        currentSteps.map(step => 
            step.id === stepId ? { ...step, date: newDate } : step
        )
    );
    recalculateDates(stepId, newDate);
  };
  
  const getMinDate = (stepId: number) => {
      if (stepId > 1) {
          const prevStep = steps.find(s => s.id === stepId - 1);
          if (prevStep) {
              return formatDateForInput(prevStep.date);
          }
      }
      return undefined;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendrier Prévisionnel</CardTitle>
        <CardDescription>
          Définissez la date de départ pour calculer automatiquement le calendrier prévisionnel de l'opération.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Étape</TableHead>
                    <TableHead>Date Planifiée</TableHead>
                    <TableHead>Délai Réglementaire</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {steps.map((step) => (
                    <TableRow key={step.id}>
                        <TableCell className="font-medium">{step.description}</TableCell>
                        <TableCell>
                           {step.isEditable ? (
                             <Input 
                                type="date" 
                                value={formatDateForInput(step.date)}
                                onChange={(e) => handleDateChange(step.id, e.target.value)}
                                min={getMinDate(step.id)}
                                className="w-auto" 
                             />
                           ) : (
                             formatDateForInput(step.date)
                           )}
                        </TableCell>
                        <TableCell>
                            {step.delay > 0 && <Badge variant="secondary">{`${step.delay} jours ${step.delayType === 'business' ? 'ouvrés' : 'calendaires'}`}</Badge>}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
