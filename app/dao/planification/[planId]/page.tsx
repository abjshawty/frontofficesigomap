
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PlusCircle, MoreHorizontal, ArrowLeft, Search } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { useParams, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";

const operationsData: { [key: string]: any[] } = {
  "plan-001": [
    { id: "op-01", object: "Construction d'un nouveau bâtiment administratif", amount: 1_200_000_000, status: "Publiée" },
    { id: "op-02", object: "Acquisition de matériel informatique pour 2024", amount: 250_000_000, status: "Validée" },
    { id: "op-03", object: "Réhabilitation du réseau routier section A", amount: 750_000_000, status: "En contrôle" },
    { id: "op-04", object: "Prestation de services de nettoyage", amount: 50_000_000, status: "Brouillon" },
  ],
  "plan-002": [
    { id: "op-05", object: "Achat de fournitures de bureau", amount: 25_000_000, status: "Publiée" },
    { id: "op-06", object: "Maintenance du parc automobile", amount: 40_000_000, status: "Validée" },
  ],
  "plan-003": [
     { id: "op-07", object: "Étude d'impact environnemental projet Y", amount: 150_000_000, status: "Publiée" },
  ]
};

const planTitles: { [key: string]: string } = {
    "plan-001": "Plan de passation 2024 - Procédures Classiques",
    "plan-002": "Plan de passation 2024 - Procédures Simplifiées",
    "plan-003": "Plan de passation 2023 - Procédures Classiques",
};


export default function PlanOperationsPage() {
  const params = useParams();
  const router = useRouter();
  const planId = params.planId as string;
  const operations = operationsData[planId] || [];
  const planTitle = planTitles[planId] || "Plan inconnu";

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const statuses = useMemo(() => {
    const allStatuses = operations.map(op => op.status);
    return ['all', ...Array.from(new Set(allStatuses))];
  }, [operations]);

  const filteredOperations = useMemo(() => {
    return operations.filter(op => {
      const searchMatch = op.object.toLowerCase().includes(searchTerm.toLowerCase());
      const statusMatch = statusFilter === 'all' || op.status === statusFilter;
      return searchMatch && statusMatch;
    });
  }, [operations, searchTerm, statusFilter]);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Publiée": return "success";
      case "Validée": return "default";
      case "En contrôle": return "destructive";
      case "Brouillon": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
       <Button variant="outline" size="sm" onClick={() => router.push('/dao/planification')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux plans
        </Button>
        
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-lg font-semibold md:text-2xl">Opérations du Plan</h1>
                <p className="text-sm text-muted-foreground">{planTitle}</p>
            </div>
            <Button size="sm" onClick={() => router.push('/dao/planification/operations/new')}>
              <PlusCircle className="h-4 w-4 mr-2" /> Ajouter une opération
            </Button>
        </div>

        <Card>
            <CardHeader>
                <CardTitle className="text-base">Filtres</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Rechercher par objet..." 
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                        <SelectValue placeholder="Filtrer par statut" />
                    </SelectTrigger>
                    <SelectContent>
                        {statuses.map(status => (
                            <SelectItem key={status} value={status}>
                                {status === 'all' ? 'Tous les statuts' : status}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardContent>
        </Card>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Objet de l'opération</TableHead>
                <TableHead className="text-right">Coût estimatif (FCFA)</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOperations.map((op) => (
                <TableRow key={op.id}>
                  <TableCell className="font-medium">{op.object}</TableCell>
                  <TableCell className="text-right">{op.amount.toLocaleString('fr-FR')}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(op.status) as any}>
                      {op.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Modifier</DropdownMenuItem>
                        <DropdownMenuItem>Soumettre</DropdownMenuItem>
                        <DropdownMenuItem>Supprimer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
