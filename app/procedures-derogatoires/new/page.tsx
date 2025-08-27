"use client";

import { MainLayout } from "@/components/ui/MainLayout";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from 'next/navigation';
import ProcedureDerogatoireForm from "@/components/procedures-derogatoires/ProcedureDerogatoireForm";

export default function NewProcedureDerogatoirePage() {
  const router = useRouter();

  return (
    <MainLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
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

        <ProcedureDerogatoireForm />

        <div className="flex justify-end gap-2">
            <Button variant="outline">Sauvegarder en Brouillon</Button>
            <Button>Soumettre la demande</Button>
        </div>
      </div>
    </MainLayout>
  );
}
