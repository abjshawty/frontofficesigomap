"use client";

import { useState } from 'react';
import { MainLayout } from "@/components/ui/MainLayout";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { ArrowLeft } from "lucide-react";
import { useRouter, useParams } from 'next/navigation';

// Importer les composants de formulaire pour chaque section
import DAOGeneralParams from '@/components/dao/DAOGeneralParams';
import DaoCcapEditor from '@/components/dao/DaoCcapEditor';
import DaoAllotissement from '@/components/dao/DaoAllotissement';
import DaoCriteres from '@/components/dao/DaoCriteres';
import DaoCommission from '@/components/dao/DaoCommission';
import DaoDocuments from '@/components/dao/DaoDocuments';

const TABS = [
  "Paramètres Généraux",
  "CCAP",
  "Allotissement",
  "Critères d'Évaluation",
  "Commission (COJO)",
  "Pièces du Dossier",
];

export default function DaoEditPage() {
  const router = useRouter();
  const params = useParams();
  const { daoId } = params;
  const [activeTab, setActiveTab] = useState(TABS[0]);

  // Simuler la récupération des données du DAO pour l'édition
  const daoReference = `DAO/2025/${daoId}`;

  const renderContent = () => {
    switch (activeTab) {
      case "Paramètres Généraux":
        return <DAOGeneralParams daoId={daoId as string} />;
      case "CCAP":
        return <DaoCcapEditor daoId={daoId as string} />;
      case "Allotissement":
        return <DaoAllotissement daoId={daoId as string} />;
      case "Critères d'Évaluation":
        return <DaoCriteres daoId={daoId as string} />;
      case "Commission (COJO)":
        return <DaoCommission daoId={daoId as string} />;
      case "Pièces du Dossier":
        return <DaoDocuments daoId={daoId as string} />;
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.push(`/dao/${daoId}`)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Édition du DAO : {daoReference}</h1>
            <p className="text-muted-foreground">
              Modifiez les différentes sections du brouillon avant de le soumettre pour validation.
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`${
                      activeTab === tab
                        ? 'border-sigomap-bleu text-sigomap-bleu'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
          </CardHeader>
          <CardContent className="mt-6">
            {renderContent()}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
            <Button variant="outline">Sauvegarder en Brouillon</Button>
            <Button>Soumettre pour validation</Button>
        </div>
      </div>
    </MainLayout>
  );
}
