"use client";

import { MainLayout } from "@/components/ui/MainLayout";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { ArrowLeft } from "lucide-react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useMemo } from 'react';

// Données simulées pour les opérations publiées
const publishedOperations = [
  {
    id: "OP-2025-01",
    objet: "Construction du nouveau siège de la DGMP",
    type: "Travaux",
    cout_estimatif: "1 200 000 000 FCFA",
    date_publication: "15/07/2025",
  },
  {
    id: "OP-2025-02",
    objet: "Acquisition de véhicules de fonction pour le ministère",
    type: "Fournitures",
    cout_estimatif: "350 000 000 FCFA",
    date_publication: "12/07/2025",
  },
  {
    id: "OP-2025-03",
    objet: "Étude d'impact environnemental pour le projet de barrage",
    type: "Prestation intellectuelle",
    cout_estimatif: "85 000 000 FCFA",
    date_publication: "10/07/2025",
  },
];

// Extraire les types uniques pour le filtre
const operationTypes = ["Tous les types", ...Array.from(new Set(publishedOperations.map(op => op.type)))];

export default function NewDaoSelectionPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("Tous les types");

  const filteredOperations = useMemo(() => {
    return publishedOperations.filter(op => {
      const searchMatch = searchTerm === "" ||
        op.objet.toLowerCase().includes(searchTerm.toLowerCase()) ||
        op.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const typeMatch = typeFilter === "Tous les types" || op.type === typeFilter;

      return searchMatch && typeMatch;
    });
  }, [searchTerm, typeFilter]);

  const handleSelectOperation = (operationId: string) => {
    // Logique de création de DAO en backend...
    // Pour la démo, on simule la création et on redirige directement
    // vers la page d'édition du nouveau brouillon.
    const newDaoId = `DAO-${operationId}-${Date.now()}`;
    router.push(`/dao/edit/${newDaoId}`);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Nouveau Dossier d'Appel d'Offres</h1>
            <p className="text-muted-foreground">
              Sélectionnez une opération validée et publiée pour démarrer.
            </p>
          </div>
        </div>

        <Card>
            <CardHeader>
                <CardTitle className="text-base">Filtres</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                    placeholder="Rechercher par référence, objet..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                        <SelectValue placeholder="Filtrer par type" />
                    </SelectTrigger>
                    <SelectContent>
                        {operationTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Opérations Éligibles</CardTitle>
            <CardDescription>
              Liste des opérations planifiées qui ont été validées et publiées par la DGMP.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Référence</TableHead>
                  <TableHead>Objet de l'opération</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Coût Estimatif</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOperations.length > 0 ? (
                  filteredOperations.map((op) => (
                    <TableRow key={op.id}>
                      <TableCell className="font-medium">{op.id}</TableCell>
                      <TableCell>{op.objet}</TableCell>
                      <TableCell>{op.type}</TableCell>
                      <TableCell className="text-right">{op.cout_estimatif}</TableCell>
                      <TableCell className="text-center">
                        <Button onClick={() => handleSelectOperation(op.id)}>
                          Créer le DAO
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Aucune opération ne correspond à vos critères.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
