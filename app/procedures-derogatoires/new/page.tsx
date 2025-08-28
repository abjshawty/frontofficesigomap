"use client";

import { MainLayout } from "@/components/ui/MainLayout";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import FormulaireProcedureDerogatoire from "@/components/procedures-derogatoires/FormulaireProcedureDerogatoire";

export default function NewProcedureDerogatoirePage () {
  const router = useRouter();

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Nouvelle Demande Dérogatoire</h1>
              <p className="text-muted-foreground">
                Initiez une procédure dérogatoire pour une opération validée.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline">Sauvegarder en Brouillon</Button>
            <Button>Soumettre la demande</Button>
          </div>
        </div>

        <Suspense fallback={<div className="text-sm text-muted-foreground">Chargement du formulaire…</div>}>
          <FormulaireProcedureDerogatoire />
        </Suspense>

      </div>
    </MainLayout>
  );
}
