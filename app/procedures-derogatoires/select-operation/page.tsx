"use client";

import { MainLayout } from "@/components/ui/MainLayout";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { ArrowLeft } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';

// Données simulées (partagées pour la démo)
const publishedOperations = [
  {
    id: "OP-2025-01",
    objet: "Construction du nouveau siège de la DGMP",
    type: "Travaux",
    cout_estimatif: "1 200 000 000 FCFA",
  },
  {
    id: "OP-2025-02",
    objet: "Acquisition de véhicules de fonction pour le ministère",
    type: "Fournitures",
    cout_estimatif: "350 000 000 FCFA",
  },
  {
    id: "OP-2025-03",
    objet: "Étude d'impact environnemental pour le projet de barrage",
    type: "Prestation intellectuelle",
    cout_estimatif: "85 000 000 FCFA",
  },
];

const operationTypes = ["Tous les types", ...Array.from(new Set(publishedOperations.map(op => op.type)))];

export default function SelectOperationForProcedurePage() {
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

  const handleSelectOperation = (operationId: string, operationObjet: string) => {
    // Redirige vers le formulaire de création en passant les infos de l'opération en paramètres
    const query = new URLSearchParams({ operationId, operationObjet }).toString();
    router.push(`/procedures-derogatoires/new?${query}`);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Nouvelle Procédure Dérogatoire</h1>
            <p className="text-muted-foreground">
              Étape 1: Sélectionnez une opération validée et publiée.
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
                        <Button onClick={() => handleSelectOperation(op.id, op.objet)}>
                          Sélectionner
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
