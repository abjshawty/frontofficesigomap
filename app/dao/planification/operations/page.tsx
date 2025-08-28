"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PlusCircle, MoreHorizontal, Search } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/DropdownMenu";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import Link from "next/link";

// --- Mock Data ---
// In a real app, this would come from an API call
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
    "plan-001": "PPM 2024 - Procédures Classiques",
    "plan-002": "PPM 2024 - Procédures Simplifiées",
    "plan-003": "PPM 2023 - Procédures Classiques",
};

const allOperations = Object.entries(operationsData).flatMap(([planId, operations]) => 
    operations.map(op => ({
        ...op,
        planId: planId,
        planTitle: planTitles[planId]
    }))
);
// --- End Mock Data ---


export default function OperationsPage() {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [planFilter, setPlanFilter] = useState("all");

    useEffect(() => {
        setIsClient(true);
    }, []);

    const statuses = useMemo(() => ['all', ...Array.from(new Set(allOperations.map(op => op.status)))], []);
    const plans = useMemo(() => ['all', ...Array.from(new Set(allOperations.map(op => op.planTitle)))], []);

    const filteredOperations = useMemo(() => {
        return allOperations.filter(op => {
          const searchMatch = op.object.toLowerCase().includes(searchTerm.toLowerCase());
          const statusMatch = statusFilter === 'all' || op.status === statusFilter;
          const planMatch = planFilter === 'all' || op.planTitle === planFilter;
          return searchMatch && statusMatch && planMatch;
        });
    }, [searchTerm, statusFilter, planFilter]);

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
      <div className="w-full max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold md:text-2xl">
                Suivi Centralisé des Opérations
            </h1>
            <Button size="sm" onClick={() => router.push('/dao/planification/operations/new')}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Créer une opération
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
                <Select value={planFilter} onValueChange={setPlanFilter}>
                    <SelectTrigger>
                        <SelectValue placeholder="Filtrer par plan" />
                    </SelectTrigger>
                    <SelectContent>
                        {plans.map(plan => (
                            <SelectItem key={plan} value={plan}>
                                {plan === 'all' ? 'Tous les plans' : plan}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
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
                            <TableHead>Plan de Passation</TableHead>
                            <TableHead className="text-right">Coût estimatif (FCFA)</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredOperations.map((op) => (
                            <TableRow key={op.id}>
                                <TableCell className="font-medium max-w-xs truncate">{op.object}</TableCell>
                                <TableCell className="text-sm text-muted-foreground">{op.planTitle}</TableCell>
                                <TableCell className="text-right">{op.amount.toLocaleString('fr-FR')}</TableCell>
                                <TableCell>
                                    {isClient && (
                                        <Badge variant={getStatusVariant(op.status) as any}>
                                            {op.status}
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Ouvrir le menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>Voir les détails</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>Modifier</DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600 focus:text-red-600">Supprimer</DropdownMenuItem>
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
